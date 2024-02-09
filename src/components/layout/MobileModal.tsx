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
          <div className="px-6  text-center">
            <div className="p-6 border rounded-md">
              Sorry for the inconvenience this mint is only available on desktop
            </div>
          </div>
        </ModalBody>
        <div className="w-full text-center pb-12">
          <StayBundled />
        </div>
        <ModalFooter>
          <div className="pb-3 w-full ">
            <Button
              onPress={() => setOpen(false)}
              label="OK"
              classNames="max-w-lg"
            />
          </div>
        </ModalFooter>
      </ModalContent>
    </NextModal>
  );
}
