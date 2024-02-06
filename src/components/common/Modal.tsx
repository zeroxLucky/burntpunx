import React from "react";
import Button from "./Button";
import StayBundled from "./Bundled";
import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

export default function Modal({
  open,
  title,
  closeLabel,
  body,
  onClose,
}: {
  open: boolean;
  closeLabel?: string;
  title?: string | React.JSX.Element;
  body?: string | React.JSX.Element;
  onClose?: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          {title}
        </ModalHeader>
        <ModalBody className=" font-serif self-center justify-center text-justify max-w-lg">
          {body}
        </ModalBody>
        <div className="w-full text-center pb-12">
          <StayBundled />
        </div>
        <ModalFooter>
          <div className="pb-3 w-full ">
            {onClose ? (
              <Button
                onPress={onClose}
                label={closeLabel ?? "OK"}
                classNames="max-w-lg"
              />
            ) : null}
          </div>
        </ModalFooter>
      </ModalContent>
    </NextModal>
  );
}
