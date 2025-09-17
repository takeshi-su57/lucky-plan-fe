import { Button, useDisclosure } from "@nextui-org/react";

import type { ButtonProps } from "@nextui-org/react";
import { StandardModal } from "../modals/StandardModal";

export function ButtonWithConfirm(props: ButtonProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button {...props} onClick={onOpen} />

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: "max-w-[300px]" }}
      >
        <span className="text-sm text-white">Are you sure?</span>

        <div className="flex items-center gap-4">
          <Button color="danger" size="sm" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" size="sm" onClick={props.onClick}>
            Confirm
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
