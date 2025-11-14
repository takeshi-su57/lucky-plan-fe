"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Spinner,
  useDisclosure,
} from "@heroui/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { useGetAllUsers } from "@/app-hooks/useUser";
import { FaEdit } from "react-icons/fa";
import { ChangePermissionModal } from "./ChangePermissionModal";
import { User } from "@/graphql/gql/graphql";
import { BlacklistCard } from "./BlacklistCard";
import { WhitelistCard } from "./WhitelistCard";

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
    id: "allowAuto",
    component: "Allow Auto",
  },
  {
    id: "budget",
    component: "Budget",
  },
  {
    id: "ratio",
    component: "Ratio",
  },
  {
    id: "action",
    component: "",
  },
];

export function UsersPanel() {
  const { users, loading } = useGetAllUsers();

  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const [user, setUser] = useState<User | null>(null);

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
        allowAuto: {
          component: user.allowAuto ? "Allowed" : "Not Allowed",
        },
        budget: {
          component: user.budget,
        },
        ratio: {
          component: user.ratio,
        },
        action: {
          component: (
            <Button
              isIconOnly
              color="primary"
              variant="flat"
              onClick={() => {
                onOpen();
                setUser(user);
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
    <div className="flex flex-col gap-6">
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

        {user && (
          <ChangePermissionModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            user={user}
          />
        )}
      </Card>

      <BlacklistCard />

      <WhitelistCard />
    </div>
  );
}
