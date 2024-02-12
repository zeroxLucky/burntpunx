"use client";
import Link from "next/link";

export default function CollectionButton() {
  return (
    <Link
      href="/gallery"
      className="max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center text-gold"
    >
      VIEW Collection
    </Link>
  );
}
