"use client";
import React, { useState } from "react";
import WalletStatus from "../web3/WalletStatus";
import { AnimatePresence, motion } from "framer-motion";

export default function DisplayGrid() {
  const [state, setState] = useState<{
    count: string;
    chill: boolean;
    error: boolean;
  }>({
    count: "0",
    chill: false,
    error: false,
  });
  return (
    <div className="flex flex-col text-gold digital">
      <div className="frame border rounded-md w-full aspect-square overflow-hidden relative">
        <div className="tv-static"></div>
        <div
          className="ml-auto pt-1"
          style={{
            textOrientation: "upright",
            writingMode: "vertical-rl",
          }}
        >
          6900
        </div>
      </div>
      <div className="flex gap-3 text-center text-goldtext-xs my-3 flex-wrap">
        <button
          onClick={() => {
            setState((x) => ({ ...x, chill: !x.chill }));
          }}
          className="shrink-0 flex grow justify-center items-center border col-span-4 rounded-md text-right p-2"
        >
          {state.chill ? "4.2k Chill" : "4.2 LYX"}
        </button>
        <input
          className="placeholder-[#cabd89] w-1/3 outline-none text-gold text-center border rounded-md p-2 bg-transparent"
          placeholder="---"
          type="text"
          value={state.count}
          onChange={(e) => {
            setState((x) => ({ ...x, count: e.target.value, error: false }));

            if (
              parseInt(e.target.value) > 100 ||
              parseInt(e.target.value) < 0
            ) {
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
              className="text-red-500 flex grow justify-center items-center border-[2px] border-red-500 col-span-12 rounded-md text-right p-2"
            >
              Max can only be 100
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
