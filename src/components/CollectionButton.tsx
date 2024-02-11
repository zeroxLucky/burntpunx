"use client";

import Link from "next/link";
import { useAccount } from "wagmi";

export default function CollectionButton() {
  const { address } = useAccount();

  if (!address)
    return (
      <div className="max-h-12 digital text-sm tracking-widest gap-1 grow p-2 text-center border border-blue text-blue col-span-4 rounded-md flex items-center justify-center">
        View Collection
      </div>
    );
  return (
    <Link
      href={`/gallery?address=${address}`}
      className="max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center text-gold"
    >
      VIEW Collection
    </Link>
  );
}
