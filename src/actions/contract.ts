// server side actions
"use server";
import { contract_address, mainnet_rpc } from "@/config/consts";
import { ethers } from "ethers";
import abi from "@/config/abi.json";
import { ERC725 } from "@erc725/erc725.js";
import lsp3ProfileSchema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";

// Get the count of tokens left to mint
export const getCount = async () => {
  const totalSupply = 6900;
  const provider = new ethers.JsonRpcProvider(mainnet_rpc);
  const contract = new ethers.Contract(
    contract_address,
    [
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    provider
  );

  const count = totalSupply - parseInt(await contract.totalSupply());
  return count;
};

// Get the tokens owned by an address
export const getTokens = async (address: string) => {
  const provider = new ethers.JsonRpcProvider(mainnet_rpc);
  const contract = new ethers.Contract(contract_address, abi.abi, provider);
  const tokens = await contract.tokenIdsOf(address);
  const formattedTokens = tokens.map((token: string) => {
    const id = parseInt(token);
    const name = `BurntPunX #${id}`;
    const largePhoto = `https://ipfs.filebase.io/ipfs/QmP1MQ1d6UvNvzpfr5Brfuqfu6JDBj4Kq9kBKzaPPUZ2zA/BurntPunX_${id}.png`;
    const smallPhoto = `https://ipfs.filebase.io/ipfs/QmSKbCkmib8koVyYA2Xum3hngzNCLVijFkiQBg23VHjcMV/BurntPunX_${id}.png`;

    return {
      id,
      name,
      largePhoto,
      smallPhoto,
    };
  });

  return formattedTokens as Token[];
};

// Get the LSP3Profile of an address
export const getProfile = async (address: string) => {
  const erc725js = new ERC725(lsp3ProfileSchema, address, mainnet_rpc, {});
  const profile = (await erc725js.fetchData("LSP3Profile")) as LSP3ProfileT;

  if (!profile) {
    return undefined;
  }

  const formattedProfile = {
    name: profile.value.LSP3Profile.name,
    description: profile.value.LSP3Profile.description,
    image: profile.value.LSP3Profile.profileImage[0].url.replace(
      "ipfs://",
      "https://api.universalprofile.cloud/ipfs/"
    ),
  };

  return formattedProfile;
};
