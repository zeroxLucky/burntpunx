"use client";

import Counter from "@/components/Counter";
import { useMinter } from "../contexts/MinterContext";
import Image from "next/image";
export default function Frame() {
  const { frameImage } = useMinter();
  return (
    <div className="text-gold digital frame border rounded-md w-full aspect-square overflow-hidden relative">
      <Counter />
      {frameImage !== "" ? (
        <Image
          src={frameImage}
          alt="item image"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="tv-static" />
      )}
    </div>
  );
}
