import hre from "hardhat";
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import LSP0Artifact from "@lukso/lsp-smart-contracts/artifacts/LSP0ERC725Account.json";
import lsp8Schema from "@erc725/erc725.js/schemas/LSP8IdentifiableDigitalAsset.json";
import lsp4Schema from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json";
import { ERC725, encodeData } from "@erc725/erc725.js";
import json from "../lsp4.json";

const myErc725 = new ERC725([...lsp8Schema, ...lsp4Schema]);
const baseuri_IPFS = "ipfs://QmRStegQmDfp9gXxLTTbbogtjcaac6S9Y5xbbbG9wSZwLw/";
const metadata_IPFS = "ipfs://QmXw3MtWYtnW1t9vmEKry1ooA2C6n7NP1amp62boyCjaMk";

// load env vars
dotenv.config();

async function deployToken() {
  // Load environment variables
  const PRIVATEKEY = process.env.PRIVATEKEY!;
  const UP_ADDRESS = process.env.UP_ADDRESS!;
  const network = hre.network.name;
  const RPC =
    network === "mainnet"
      ? "https://rpc.mainnet.lukso.network"
      : "https://rpc.testnet.lukso.network";

  // Encode the data for the ERC725
  const encodedData = myErc725.encodeData([
    {
      keyName: "LSP8TokenMetadataBaseURI",
      value: {
        verification: { method: "0x00000000", data: "0x" },
        url: baseuri_IPFS,
      },
    },
    {
      keyName: "LSP4Metadata",
      value: {
        json: json,
        url: metadata_IPFS,
      },
    },
    {
      keyName: "LSP4Creators[]",
      value: [UP_ADDRESS],
    },
    {
      keyName: "LSP4CreatorsMap:<address>",
      dynamicKeyParts: [UP_ADDRESS],
      value: ["0x01ffc9a7", "0x00000000000000000000000000000000"],
    },
  ]);

  // Setup the controller used to sign the deployment
  const provider = new ethers.JsonRpcProvider(RPC);
  const signer = new ethers.Wallet(PRIVATEKEY, provider);

  console.log(
    "Deploying contracts with Universal Profile Controller: ",
    signer.address
  );

  // Load the Universal Profile
  const universalProfile = await ethers.getContractAtFromArtifact(
    LSP0Artifact,
    UP_ADDRESS as string
  );

  const abiEncoder = new ethers.AbiCoder();

  // Create custom bytecode for the token deployment
  const CustomTokenBytecode =
    hre.artifacts.readArtifactSync("BurntPunX").bytecode;

  // Encode constructor params
  const encodedConstructorParams = abiEncoder.encode(
    ["bytes32[]", "bytes[]"],
    [encodedData.keys, encodedData.values]
  );

  // Add the constructor params to the Custom Token bytecode
  const CustomTokenBytecodeWithConstructor =
    CustomTokenBytecode + encodedConstructorParams.slice(2);

  // Get the address of the custom token contract that will be created
  const CustomTokenAddress = await universalProfile
    .connect(signer)
    .getFunction("execute")
    .staticCall(
      1, // Operation type: CREATE
      ethers.ZeroAddress,
      0, // Value is empty
      CustomTokenBytecodeWithConstructor,
      { gasLimit: 10000000 }
    );

  // Deploy the contract by the Universal Profile
  const tx = await universalProfile.connect(signer).getFunction("execute")(
    1, // Operation type: CREATE
    ethers.ZeroAddress,
    0, // Value is empty
    CustomTokenBytecodeWithConstructor,
    { gasLimit: 10000000 }
  );

  await tx.wait();

  console.log("Contract Deployed To: ", CustomTokenAddress);
}

deployToken()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
