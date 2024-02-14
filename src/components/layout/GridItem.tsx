"use client";

import { Download } from "@/utils/icons/download";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";

export default function GridItem({ token }: { token: Token | any }) {
  // janky grid item will optomize later
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <button
        onClick={token.name ? onOpen : () => {}}
        className="gold p-[2px] rounded-md relative overflow-hidden aspect-square"
      >
        <div className="w-full h-full bg-black rounded-md relative">
          {token.name && (
            <Image
              src={token.smallPhoto}
              alt={token.name}
              width={500}
              height={500}
              className="absolute w-full h-full object-cover rounded-md"
            />
          )}
        </div>
        <div className="absolute text-gold digital text-xs top-1 left-1">
          {token.id}
        </div>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        placement="center"
        size="lg"
        backdrop="blur"
      >
        <ModalContent className="m-3 place-self-center p-0 gold min-h-[325px] min-w-[325px] aspect-square rounded-lg">
          {(onClose) => (
            <>
              <ModalBody className="p-[2px] m-0">
                <div className="bg-black w-full h-full rounded-md relative overflow-hidden">
                  {token.name && (
                    <Image
                      src={token.largePhoto}
                      alt={token.name}
                      width={500}
                      height={500}
                      className="absolute w-full h-full object-cover"
                    />
                  )}
                </div>
                <a
                  className="z-10 absolute p-[2px] rounded-full gold aspect-square bottom-3 left-3"
                  href={`${token.largePhoto}?filename=BurntPunX_${token.id}.png&download=true`}
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
}
