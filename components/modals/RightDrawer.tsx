import {
  Modal,
  ModalContent,
  ModalBody,
  ModalProps,
  ModalSlots,
} from "@heroui/react";

import { mergeClassNames } from "@/utils/mergeClassNames";

export function RightDrawer({ children, classNames, ...props }: ModalProps) {
  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      motionProps={{
        variants: {
          enter: {
            translateX: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            translateX: "100%",
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      {...props}
      classNames={mergeClassNames<ModalSlots>(
        {
          wrapper: "justify-end",
          base: "m-0 max-w-[640px] h-screen gap-8 overflow-visible font-sans scale-100",
          body: "gap-5 border-l border-default-200 bg-content1 px-6 py-7 text-sm shadow-large [&_h1]:!text-base [&_h1]:!leading-snug [&_h2]:!text-sm md:[&_h1]:!text-lg",
          closeButton:
            "top-4 right-4 bg-content3 text-neutral-200 hover:bg-content4",
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
