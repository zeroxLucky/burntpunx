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

export default function MobileModal() {
  const [open, setOpen] = useState(false);

  // check for mobile device on load
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
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
          onClick={() => setOpen(false)}
          className="self-center border justify-center text-center max-w-lg p-4 rounded-lg"
        >
          <div className="cursive text-4xl">A Note From The Hoodie Cartel</div>
          <div className="basker text-lg">
            Sorry for the inconvenience, but this mint is only available on
            desktop. Please visit us on a larger screen to mint.
          </div>
          <StayBundled />
        </ModalBody>
      </ModalContent>
    </NextModal>
  );
}
