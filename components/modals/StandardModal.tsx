import {
  Modal,
  ModalContent,
  ModalBody,
  ModalProps,
  ModalSlots,
} from "@heroui/react";

import { mergeClassNames } from "@/utils/mergeClassNames";

export function StandardModal({ children, classNames, ...props }: ModalProps) {
  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      placement="center"
      {...props}
      classNames={mergeClassNames<ModalSlots>(
        {
          base: "max-w-147.5 max-h-115 gap-3 overflow-visible font-sans scale-100",
          body: "gap-3 rounded-lg border border-default-200 bg-content1 px-4 py-5 text-sm shadow-large [&_h1]:!text-base [&_h1]:!leading-snug [&_h2]:!text-sm md:p-5 md:[&_h1]:!text-lg",
          closeButton:
            "top-4 right-4 cursor-pointer z-30 text-neutral-500 text-lg hover:bg-content3 hover:text-neutral-100 active:bg-content4",
        },
        classNames,
      )}
    >
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
