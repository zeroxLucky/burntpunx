import GridItem from "@/components/layout/GridItem";
import Link from "next/link";

export default function GalleryLoader() {
  const blankTokens = Array(12).fill({});
  const grid = blankTokens.map((token, i) => (
    <GridItem token={token} key={`grid-item-${i}`} />
  ));

  return (
    <div className="flex gap-3 flex-1 flex-col px-6 w-full max-w-sm h-full">
      <div className="gold p-[2px] w-full rounded-md">
        <div className="w-full bg-black rounded-md p-3 flex flex-row gap-3 items-center justify-start">
          <div className="aspect-square overflow-hidden rounded-full">
            <div className="w-[52px] h-[52px] bg-[#cabd89]/60 animate-pulse" />
          </div>
          <div className="flex flex-col w-full gap-[2px]">
            <div className="h-6 w-2/3 rounded-md bg-[#cabd89]/60 animate-pulse" />
            <div className="h-4 w-1/3 rounded-md bg-[#cabd89]/60 animate-pulse" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 flex-1 w-full content-start">
        {grid}
      </div>
      <Link
        href="/"
        className="max-h-12 border rounded-md digital text-sm py-3 tracking-widest px-6 w-full text-center text-gold"
      >
        Home
      </Link>
    </div>
  );
}
