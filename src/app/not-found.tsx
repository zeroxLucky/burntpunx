"use client";

import StayBundled from "@/components/layout/Bundled";
import Link from "next/link";

export default function Error() {
  return (
    <div className="text-center text-gold h-screen w-full grid place-content-center">
      <div className="gold p-[2px] flex flex-col gap-3 items-center rounded-md">
        <div className="bg-black p-10 rounded-md">
          <h1 className="digital text-5xl">404</h1>
          <StayBundled />
        </div>
      </div>
      <Link
        className="mt-3 max-h-12 digital text-sm tracking-widest gap-1 grow p-2 text-center border text-gold col-span-4 rounded-md flex items-center justify-center"
        href="/"
      >
        Home
      </Link>
    </div>
  );
}
