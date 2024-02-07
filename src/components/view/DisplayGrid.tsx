"use client";
import React, { useState } from "react";
import WalletStatus from "../web3/WalletStatus";
import { AnimatePresence, motion } from "framer-motion";

export default function DisplayGrid() {
  const [state, setState] = useState<{
    count: string;
    error: boolean;
  }>({
    count: "0",
    error: false,
  });
  return (
    <div className="grid grid-cols-12 text-center text-gold gap-3 text-xs digital my-3">
      <Remaining />
      <input
        className="placeholder-[#cabd89] outline-none text-gold text-center border col-span-4 rounded-md p-2 bg-transparent"
        placeholder="---"
        type="text"
        value={state.count}
        onChange={(e) => {
          setState((x) => ({ ...x, count: e.target.value, error: false }));

          if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 0) {
            setState((x) => ({ ...x, error: true }));
          }
        }}
      />
      <WalletStatus />
      <AnimatePresence>
        {state.error && (
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="text-red-500 flex justify-center border-[2px] border-red-500 col-span-12 rounded-md text-right p-2"
          >
            Must be between 0 and 100
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

const Remaining = () => (
  <div className="border col-span-4 rounded-md text-right p-2">/4200</div>
);
