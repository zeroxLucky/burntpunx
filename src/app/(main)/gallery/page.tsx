import Link from "next/link";
import Gallery from "@/components/layout/Gallery";

export default function Page() {
  return (
    <div className="flex gap-3 flex-1 flex-col px-6 w-full max-w-sm h-full">
      <Gallery />
      <Link
        href="/"
        className="max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center text-gold"
      >
        BACK
      </Link>
    </div>
  );
}
