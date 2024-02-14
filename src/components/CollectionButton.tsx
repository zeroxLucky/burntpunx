"use client";
import Link from "next/link";

// Moved this to its own component
// incase we do anything
// fancy with it in the future
export default function CollectionButton() {
  return (
    <Link
      href="/gallery"
      className="max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center text-gold"
    >
      View Collection
    </Link>
  );
}
