"use client";

import { useAccount, useWriteContract } from "wagmi";
import { useMinter } from "./contexts/MinterContext";
import { getEthersSigner } from "@/utils/client";
import { config } from "@/config/wagmi";
import { ethers } from "ethers";
import { contract_address } from "@/config/consts";
import abi from "@/config/abi.json";

const MintButton = () => {
  const account = useAccount();
  const { count, chill, setFrameImage } = useMinter();

  const mint = async () => {
    const provider = await getEthersSigner(config);
    const contract = new ethers.Contract(contract_address, abi.abi, provider);
    const rawTx = await contract.mint(
      ethers.toBigInt(parseInt(count)),
      account.address,
      {
        gasLimit: 300000,
        gasPrice: ethers.parseUnits("10", "gwei"),
        value: ethers.parseEther("4.2"),
      }
    );
    const tx = await provider.sendTransaction(rawTx);
    console.log("Minted", count, "tokens");
  };

  if (account.isConnected) {
    return (
      <>
        <button
          onClick={mint}
          className="max-h-12 digital text-sm tracking-widest gap-1 grow p-2 text-center border text-gold col-span-4 rounded-md flex items-center justify-center"
        >
          Mint <div className="status bg-green-600 mb-1" />
        </button>
      </>
    );
  }

  return (
    <div className="max-h-12 digital text-sm tracking-widest gap-1 grow p-2 text-center border border-blue text-blue col-span-4 rounded-md flex items-center justify-center">
      Mint <div className="status bg-red-500 mb-1" />
    </div>
  );
};

export default MintButton;
