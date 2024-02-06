"use client";

import { useAccount } from "wagmi";

const WalletStatus = () => {
  const account = useAccount();

  if (account.isConnected) {
    return (
      <button className="max-h-12 digital text-sm tracking-widest gap-1 w-full text-center border border-blue text-blue col-span-4 rounded-md p-2 flex items-center justify-center">
        Mint <div className="status bg-green-600 mb-1" />
      </button>
    );
  }

  return (
    <button className="max-h-12 digital text-sm tracking-widest gap-1 w-full text-center border border-blue text-blue col-span-4 rounded-md flex items-center justify-center">
      UP <div className="status bg-red-500 mb-1" />
    </button>
  );
};

export default WalletStatus;
