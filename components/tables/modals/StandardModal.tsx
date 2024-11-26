import {
  Modal,
  ModalContent,
  ModalBody,
  ModalProps,
  ModalSlots,
} from "@nextui-org/react";

import { mergeClassNames } from "@/utils/mergeClassNames";

export function StandardModal({ children, classNames, ...props }: ModalProps) {
  return (
    <Modal
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
          base: "max-w-[590px] max-h-[460px] gap-3 overflow-visible font-sans scale-100",
          body: "gap-3 rounded-xl bg-neutral-900 border border-neutral-800 px-5 py-6 md:p-6",
          closeButton:
            "top-6 right-6 text-neutral-400 text-[24px] hover:bg-neutral-300 hover:text-neutral-900 active:bg-neutral-400",
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
