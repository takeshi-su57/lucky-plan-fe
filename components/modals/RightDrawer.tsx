import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerProps,
  ModalSlots,
} from "@heroui/react";

import { mergeClassNames } from "@/utils/mergeClassNames";

export function RightDrawer({ children, classNames, ...props }: DrawerProps) {
  return (
    <Drawer
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      {...props}
      classNames={mergeClassNames<ModalSlots>(
        {
          wrapper: "justify-end",
          base: "m-0 max-w-160 gap-8 overflow-visible font-sans",
          body: "gap-5 border-l border-default-200 bg-content1 px-6 py-7 text-sm shadow-large [&_h1]:text-base! [&_h1]:leading-snug! [&_h2]:text-sm! md:[&_h1]:text-lg!",
          closeButton:
            "top-4 right-4 bg-content3 cursor-pointer text-neutral-200 hover:bg-content4",
        },
        classNames,
      )}
    >
      <DrawerContent>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
