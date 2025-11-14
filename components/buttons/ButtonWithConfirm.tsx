import { Button, useDisclosure } from "@heroui/react";

import type { ButtonProps } from "@heroui/react";
import { StandardModal } from "../modals/StandardModal";

export function ButtonWithConfirm(props: ButtonProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleConfirm = () => {
    props.onPress?.({} as any);
    onClose();
  };

  return (
    <>
      <Button {...props} onPress={onOpen} />

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        classNames={{ base: "max-w-[300px]" }}
      >
        <span className="text-sm text-white">Are you sure?</span>

        <div className="flex items-center gap-4">
          <Button color="danger" size="sm" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" size="sm" onPress={handleConfirm}>
            Confirm
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
