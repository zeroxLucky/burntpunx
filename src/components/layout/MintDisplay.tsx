"use client";
import MintButton from "@/components/MintButton";
import { AnimatePresence, motion } from "framer-motion";
import { useMinter } from "../contexts/MinterContext";

export default function MintDisplay() {
  return (
    <div className="flex gap-3 text-center text-goldtext-xs flex-wrap">
      <LYXButton />
      <InputField />
      <MintButton />
      {/* need this to have react know 
      when the component leaves 
      the view area to animate in/out */}
      <AnimatePresence>
        <Error />
      </AnimatePresence>
    </div>
  );
}

// swap minting between LYX and Chill
const LYXButton = () => {
  const { chill, setChill } = useMinter();

  return (
    <button
      onClick={() => {
        setChill(!chill);
      }}
      className="digital text-gold shrink-0 flex grow justify-center items-center border col-span-4 rounded-md text-right p-2"
    >
      {chill ? "6,969 Chill" : "4.2 LYX"}
    </button>
  );
};

// input field for minting amount
const InputField = () => {
  const { count, setCount, setError } = useMinter();
  return (
    <input
      className="placeholder-[#cabd89] w-1/3 digital outline-none text-gold text-center border rounded-md p-2 bg-transparent"
      placeholder="---"
      type="text"
      value={count}
      onChange={(e) => {
        setCount(e.target.value);
        if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 1) {
          setError(true);
          console.log("error");
        } else {
          setError(false);
        }
      }}
    />
  );
};

// error message for minting *animated*
const Error = () => {
  const { error } = useMinter();

  if (!error) return null;

  return (
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
  );
};
