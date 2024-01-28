import React from "react";
import Button from "./Button";
import StayBundled from "./Bundled";
import { Modal as NextModal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";

export default function Modal({ isOpen, title, body, onClose }: { isOpen: boolean, title: string, body: string, onClose: any })
{

  return (
    <>
      <NextModal isOpen={isOpen} className="bg-black h-full w-full">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <StayBundled />
            {onClose ? <Button onPress={onClose} label={'Close'} /> : null}
          </ModalFooter>
        </ModalContent>
      </NextModal>
    </>
  );
}