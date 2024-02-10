"use client";
import { contract_address, mainnet_rpc } from "@/config/consts";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import abi from "@/config/abi.json";
import Image from "next/image";
import ConnectButton from "../ConnectButton";
interface GridItem {
  url?: string;
  mintNumber?: number;
}

const Gallery = () => {
  const { address, connector } = useAccount();
  const placeholder: GridItem = {};
  const [mintCollection, setMintCollection] = useState<GridItem[]>([
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
    placeholder,
  ]);

  useEffect(() => {
    const getMintCollection = async () => {
      if (address) {
        const chainId = await connector?.getChainId();
        const provider = new ethers.JsonRpcProvider(mainnet_rpc);

        const contract = new ethers.Contract(
          contract_address,
          abi.abi,
          provider
        );
        const tokens = await contract.tokenIdsOf(address);
        const collection = tokens.map((token: string, i: number) => {
          const tokenNumber = parseInt(token);
          const url = `https://ipfs.io/ipfs/QmSKbCkmib8koVyYA2Xum3hngzNCLVijFkiQBg23VHjcMV/BurntPunX_${tokenNumber}.png`;
          return { url, mintNumber: tokenNumber };
        });

        setMintCollection([
          ...collection,
          ...Array(12 - collection.length).fill({}),
        ]);
      }
    };
    getMintCollection();
  }, [address, connector]);

  const GridItem = ({ item }: { item: any }) => (
    <div className="border rounded-md text-white relative overflow-hidden aspect-square">
      <div className="tv-static" />
      {item.url && (
        <Image
          src={item.url}
          alt="item image"
          width={500}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute text-gold digital text-xs p-1">
        {item.mintNumber}
      </div>
    </div>
  );

  const Grid = ({ data }: { data: Array<any> }) =>
    data.map((item, i) => <GridItem item={item} key={`grid-item-${i}`} />);

  return (
    <>
      <div className="grid grid-cols-3 gap-3 flex-1 w-full content-start overflow-y-auto">
        <Grid data={mintCollection} />
      </div>
      <ConnectButton />
    </>
  );
};

export default Gallery;
