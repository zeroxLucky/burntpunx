"use client";
import { useEffect, useState } from "react";
import StayBundled from "@/components/layout/Bundled";
import { Modal as NextModal, ModalContent, ModalBody } from "@nextui-org/modal";

export default function TOSModal() {
  const [open, setOpen] = useState(false);

  // check for localstorage tos acceptance
  const setTos = () => {
    localStorage.setItem("accepted_tos", new Date().toISOString());
    setOpen(false);
  };

  // toggle modal on first visit
  useEffect(() => {
    const accepted_tos = localStorage.getItem("accepted_tos");
    if (!accepted_tos) {
      setOpen(true);
    }
  }, []);

  return (
    <NextModal
      className="h-full w-full fixed top-0 left-0 bg-black grid place-content-center text-gold p-4"
      isOpen={open}
      placement="center"
      isDismissable={false}
      hideCloseButton={true}
      size={"full"}
    >
      <ModalContent className="">
        <ModalBody
          onClick={setTos}
          className="self-center border justify-center text-center max-w-lg p-4 rounded-lg overflow-y-auto"
        >
          <div className="cursive text-4xl">A Note From The Hoodie Cartel</div>
          <div className="basker text-lg">
            By minting this NFT you are agreeing to be contractually obligated
            to burn it at a later date. Each NFT will be redeemable for one (1)
            limited edition trait (Gold Hoodies EXCLUDED) in the Universal PunX
            decentralized application. You will have the choice to add above
            mentioned trait(s) to individual Universal PunX or multiple traits
            to one Universal PunX. The Hoodie Cartel reserves the right to
            expire this offer at any time, the attached ipfs image may also be
            terminated at any time. We do not condone trading of this NFT and
            there should be no expectation that this NFT should increase in
            value, for that reason we have applied a 6.9% royalty. WARNING This
            mint is only available on a Universale Profile. Mint accordingly
            degens.
          </div>
          <StayBundled />
        </ModalBody>
      </ModalContent>
    </NextModal>
  );
}
