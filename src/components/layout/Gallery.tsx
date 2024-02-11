"use client";
import { contract_address, mainnet_rpc } from "@/config/consts";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import abi from "@/config/abi.json";
import Image from "next/image";
import ConnectButton from "../ConnectButton";
import { useDisclosure } from "@nextui-org/modal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Download } from "@/utils/icons/download";
import { Loader } from "@/utils/icons/loader";
interface GridItem {
  urlSmol?: string;
  urlLarge?: string;
  mintNumber?: number;
  itemName?: string;
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
          const urlSmol = `https://ipfs.io/ipfs/QmSKbCkmib8koVyYA2Xum3hngzNCLVijFkiQBg23VHjcMV/BurntPunX_${tokenNumber}.png`;
          const urlLarge = `https://ipfs.io/ipfs/QmP1MQ1d6UvNvzpfr5Brfuqfu6JDBj4Kq9kBKzaPPUZ2zA/BurntPunX_${tokenNumber}.png`;
          return {
            urlLarge,
            urlSmol,
            mintNumber: tokenNumber,
            itemName: `BurntPunX_${tokenNumber}`,
          };
        });

        setMintCollection([
          ...collection,
          ...Array(collection.length >= 12 ? 0 : 12 - collection.length).fill(
            {}
          ),
        ]);
      }
    };
    getMintCollection();
  }, [address, connector]);

  const GridItem = ({ item }: { item: any }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
      <>
        <button
          onClick={item.itemName ? onOpen : () => {}}
          className="border rounded-md text-white relative overflow-hidden aspect-square"
        >
          <div className="tv-static" />
          {item.itemName && (
            <Image
              src={item.urlSmol}
              alt={item.itemName}
              width={500}
              height={500}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute text-gold digital text-xs top-1 left-1">
            {item.mintNumber}
          </div>
        </button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          hideCloseButton
          classNames={{
            backdrop: "bg-black/70",
          }}
        >
          <ModalContent className="p-0 m-0 gold">
            {(onClose) => (
              <>
                <ModalBody className="p-[2px] m-0 relative">
                  <Loader className="absolute" />
                  <Image
                    src={item.urlLarge}
                    alt="item image"
                    width={1000}
                    height={1000}
                    className="z-10 rounded-xl w-full h-full object-cover"
                  />
                  <a
                    className="z-10 absolute p-[2px] rounded-full gold aspect-square bottom-3 left-3"
                    href={`${item.urlLarge}?filename=BurntPunX_${item.mintNumber}.png&download=true`}
                    download
                  >
                    <div className="w-full height-full aspect-square rounded-full p-2 bg-black ">
                      <Download className="text-gold" />
                    </div>
                  </a>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

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
