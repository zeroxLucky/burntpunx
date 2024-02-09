"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import StayBundled from "@/components/Bundled";
import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";

export default function TOSModal() {
  const [open, setOpen] = useState(false);

  const setTos = () => {
    localStorage.setItem("accepted_tos", new Date().toISOString());
    setOpen(false);
  };

  useEffect(() => {
    const accepted_tos = localStorage.getItem("accepted_tos");
    if (!accepted_tos) {
      setOpen(true);
    }
  }, []);

  return (
    <NextModal
      className="h-full w-full fixed top-0 left-0 bg-black text-gold  text-center"
      isOpen={open}
      placement="center"
      isDismissable={false}
      hideCloseButton={true}
      size={"full"}
    >
      <ModalContent className="text-center bg-black flex ">
        <ModalHeader className="w-full align-center justify-center self-center text-center max-w-sm px-12 pt-12 pb-0 mt-6 text-4xl cursive">
          <div className="modal-title">
            <div className="text-xs mb-2 font-medium digital tracking-[.3em]">
              A Note From
            </div>
            <div className="cursive font-medium">The Hoodie Cartel</div>
          </div>
        </ModalHeader>
        <ModalBody className="font-serif self-center justify-center text-justify max-w-lg">
          <div className="border text-sm center rounded-md p-4 digital text-justify leading-loose">
            By minting this NFT you are agreeing to be contractually obligated
            to burn it at a later date. Each NFT will be redeemable for one
            limited edition gold trait (Gold Hoodies EXCLUDED) in the
            UniversalPunX decentralized application. You will have the choice to
            add above mentioned gold trait to individual UniversalPunX or
            multiple gold traits to one UniversalPunX. The Hoodie Cartel
            reserves the right to expire this offer at any time, the attached
            ipfs image may also be terminated at any time. We do not condone
            trading of this NFT and there should be no expectation that this NFT
            should increase in value, for that reason we have applied a contract
            enforced 6.9% royalty. Mint accordingly degens.
          </div>
        </ModalBody>
        <div className="w-full text-center pb-12">
          <StayBundled />
        </div>
        <ModalFooter>
          <div className="pb-3 w-full  ">
            <Button onPress={setTos} label="OK" classNames="max-w-lg" />
          </div>
        </ModalFooter>
      </ModalContent>
    </NextModal>
  );
}
