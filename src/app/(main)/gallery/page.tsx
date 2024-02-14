"use client";
import Link from "next/link";
import { getProfile, getTokens } from "@/actions/contract";
import GridItem from "@/components/layout/GridItem";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import ConnectButton from "@/components/ConnectButton";
import { Copy } from "@/utils/icons/copy";
import { toast } from "sonner";

export default function Page() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<Token[] | [any]>(Array(12).fill({}));
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    (async () => {
      if (address?.length) {
        const tokenReq = await getTokens(address);
        const profileReq = await getProfile(address);

        let blankTokens;
        if (tokenReq.length < 12) {
          blankTokens = Array(12 - tokenReq.length).fill({});
        } else {
          blankTokens = Array(3 - (tokenReq.length % 3)).fill({});
        }

        setTokens([...tokenReq, ...blankTokens]);
        setProfile(profileReq);
      }
    })();
  }, [address]);

  const grid = tokens.map((token, i) => (
    <GridItem token={token} key={`grid-item-${i}`} />
  ));

  return (
    <div className="flex gap-3 flex-1 flex-col px-6 w-full max-w-sm h-full">
      {address ? (
        <div className="gold p-[2px] w-full rounded-md">
          <div className="w-full bg-black rounded-md p-3 flex flex-row gap-3 items-center justify-start">
            <div className="aspect-square overflow-hidden rounded-full">
              <div className="gold p-[2px] rounded-full">
                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[50px] h-[50px]" />
                )}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="digital text-sm text-gold line-clamp-1">
                {profile.name ? profile.name : "Loading..."}
              </div>
              <div className="basker text-gold opacity-60 text-sm line-clamp-1">
                {address.slice(0, 6)}...{address.slice(-6)}
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.hoodiecartel.com/gallery/${address}`
                );
                toast("Share link copied!");
              }}
            >
              <Copy className="text-gold" />
            </button>
          </div>
        </div>
      ) : (
        <ConnectButton />
      )}
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
