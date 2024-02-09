"use server";
import { contract_address, testnet_rpc } from "@/config/consts";
import { ethers } from "ethers";

export const getCount = async () => {
  const totalSupply = 6900;
  const provider = new ethers.JsonRpcProvider(testnet_rpc);
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
