"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { useGetAllUsers } from "@/app-hooks/useUser";
import { FaEdit } from "react-icons/fa";
import { ChangePermissionModal } from "./ChangePermissionModal";

const columns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "permission",
    component: "Permission",
  },
  {
    id: "action",
    component: "",
  },
];

export function UsersPanel() {
  const { users, loading } = useGetAllUsers();

  const { onOpen, onClose, onOpenChange, isOpen } = useDisclosure();
  const [address, setAddress] = useState("");

  const rows = useMemo(() => {
    if (!users) {
      return [];
    }
    return users.map((user) => ({
      id: `${user.address}`,
      className: "group",
      data: {
        address: {
          component: user.address,
        },
        permission: {
          component: user.permission,
        },
        action: {
          component: (
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              onClick={() => {
                onOpen();
                setAddress(user.address);
              }}
            >
              <FaEdit />
            </Button>
          ),
        },
      },
    }));
  }, [users, onOpen]);

  if (loading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <Spinner size="lg" color="warning" />
      </div>
    );
  }

  return (
    <Card>
      <CardBody>
        <DataTable
          columns={columns}
          rows={rows}
          classNames={{
            tr: "font-mono cursor-pointer",
            td: "py-3 ",
            th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
          }}
        />
      </CardBody>

      <ChangePermissionModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        address={address}
      />
    </Card>
  );
}
