import React from "react";
import WalletStatus from "../web3/WalletStatus";

export default function DisplayGrid() {
  return (
    <div
      className={`grid grid-cols-12 text-center text-gold gap-3 text-xs digital my-3`}
    >
      <Remaining />
      <Completed />
      <WalletStatus />
    </div>
  );
}

const Remaining = () => (
  <div className="border col-span-4 rounded-md text-right p-2">/4200</div>
);
const Completed = () => (
  <div className="border col-span-4 rounded-md p-2">---</div>
);
