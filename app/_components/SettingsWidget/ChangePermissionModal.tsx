"use client";

import { useState } from "react";

import { StandardModal } from "@/components/modals/StandardModal";

import { Button, Select, SelectItem } from "@nextui-org/react";

import { useChangeUserPermission } from "@/app/_hooks/useUser";
import { UserPermission } from "@/graphql/gql/graphql";

export type ChangePermissionModalProps = {
  address: string;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function ChangePermissionModal({
  address,
  isOpen,
  onClose,
  onOpenChange,
}: ChangePermissionModalProps) {
  const changeUserPermission = useChangeUserPermission();

  const [permission, setPermission] = useState<UserPermission | null>(null);

  const handleChangeUserPermission = () => {
    if (!permission) {
      return;
    }

    changeUserPermission({
      variables: {
        address,
        permission,
      },
    });

    onClose();
  };

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPermission(e.target.value as UserPermission);
  };

  return (
    <StandardModal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
      <div className="flex flex-col gap-3.5">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Change Permission
        </h1>

        <Select
          className="max-w-xs"
          label="Permission"
          placeholder="Select an permission"
          selectedKeys={permission ? [permission] : undefined}
          variant="bordered"
          onChange={handleSelectionChange}
        >
          {Object.values(UserPermission).map((permission) => (
            <SelectItem key={permission}>{permission}</SelectItem>
          ))}
        </Select>

        <Button
          onClick={handleChangeUserPermission}
          color="primary"
          isDisabled={!permission}
        >
          Confirm
        </Button>
      </div>
    </StandardModal>
  );
}
