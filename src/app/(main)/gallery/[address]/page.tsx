import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfile, getTokens } from "@/actions/contract";
import GridItem from "@/components/layout/GridItem";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: {
    address: string;
  };
}) {
  const { address } = params;
  const profile = await getProfile(address);

  if (!profile) {
    notFound();
  }

  return {
    title: "Gallery | " + profile.name,
    description: "BurntPunX Gallery",
  };
}

export default async function Page({
  params,
}: {
  params: {
    address: string;
  };
}) {
  const { address } = params;
  const tokens = await getTokens(address);
  const profile = await getProfile(address);

  let blankTokens;

  if (!profile) {
    notFound();
  }

  if (tokens.length < 12) {
    blankTokens = Array(12 - tokens.length).fill({});
  } else {
    blankTokens = Array(3 - (tokens.length % 3)).fill({});
  }

  const grid = [...tokens, ...blankTokens].map((token, i) => (
    <GridItem token={token} key={`grid-item-${i}`} />
  ));

  return (
    <div className="flex gap-3 flex-1 flex-col px-6 w-full max-w-sm h-full">
      <Link
        href={`https://wallet.universalprofile.cloud/${address}?network=mainnet`}
        target="_blank"
        className="gold p-[2px] w-full rounded-md"
      >
        <div className="w-full bg-black rounded-md p-3 flex flex-row gap-3 items-center justify-start">
          <div className="aspect-square overflow-hidden rounded-full">
            <div className="gold p-[2px] rounded-full">
              <Image
                src={profile.image}
                alt={profile.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="digital text-sm text-gold line-clamp-1">
              {profile.name}
            </div>
            <div className="basker text-gold opacity-60 text-sm line-clamp-1">
              {address.slice(0, 6)}...{address.slice(-6)}
            </div>
          </div>
        </div>
      </Link>
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
