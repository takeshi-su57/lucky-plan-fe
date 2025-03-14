import {
  Modal,
  ModalContent,
  ModalBody,
  ModalProps,
  ModalSlots,
} from "@nextui-org/react";

import { mergeClassNames } from "@/utils/mergeClassNames";

export function RightDrawer({ children, classNames, ...props }: ModalProps) {
  return (
    <Modal
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
          base: "!m-0 max-w-[640px] h-screen gap-8 overflow-visible font-sans scale-100",
          body: "gap-6 bg-neutral-900 px-[34px] py-[38px]",
          closeButton:
            "top-4 right-4 bg-neutral-300 text-neutral-900 hover:bg-neutral-400",
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
