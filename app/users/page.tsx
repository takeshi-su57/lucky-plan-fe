"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Tab,
  Tabs,
  Card,
  Input,
  Button,
  CardBody,
  useDisclosure,
} from "@nextui-org/react";
import { Address, isAddress } from "viem";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import {
  useAddNewUser,
  useChangeUserRole,
  useGetAllUsers,
} from "@/app/_hooks/useUser";
import { UserInfoFragment, UserRole } from "@/graphql/gql/graphql";
import { StandardModal } from "@/components/modals/StandardModal";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";

const columns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "role",
    component: "Role",
    allowsSorting: true,
  },
  {
    id: "changeRole",
    component: "",
    className: "flex-end",
  },
];

type TabType = "all" | "users" | "leaders";

export default function Page() {
  const allUsers = useGetAllUsers();
  const mutateUserRole = useChangeUserRole();
  const mutateByAddUser = useAddNewUser();

  const [selected, setSelected] = useState<TabType>("all");
  const [address, setAddress] = useState("");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleToggleRole = useCallback(
    (user: UserInfoFragment) => {
      mutateUserRole({
        variables: {
          input: {
            address: user.address,
            role: user.role === UserRole.User ? UserRole.Leader : UserRole.User,
          },
        },
      });
    },
    [mutateUserRole],
  );

  const handleConfirm = () => {
    if (!isAddress(address)) {
      return;
    }

    mutateByAddUser({
      variables: {
        input: {
          address,
        },
      },
    });

    onClose();
  };

  const rows = useMemo(() => {
    if (allUsers.length === 0) {
      return [];
    }
    return allUsers
      .filter((user) =>
        selected !== "all"
          ? selected === "users"
            ? user.role === UserRole.User
            : user.role === UserRole.Leader
          : true,
      )
      .map((user) => ({
        id: user.address,
        className: "group",
        data: {
          address: {
            component: <AddressWidget address={user.address as Address} />,
          },
          role: {
            sortableAmount: user.role,
            component: user.role,
          },
          changeRole: {
            component: (
              <Button onClick={() => handleToggleRole(user)}>
                Change Role
              </Button>
            ),
            className: "w-[50px]",
          },
        },
      }));
  }, [allUsers, handleToggleRole, selected]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="all" title="All" />
          <Tab key="leaders" title="Leaders" />
          <Tab key="users" title="Users" />
        </Tabs>

        <Button color="primary" onClick={onOpen}>
          Add New User
        </Button>
      </div>

      <Card>
        <CardBody>
          <DataTable
            columns={columns}
            rows={rows}
            classNames={{
              tr: "hover:bg-white/5 font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Add New User
          </h1>

          <Input
            variant="underlined"
            value={address}
            onValueChange={setAddress}
            label="Address"
          />

          <Button
            onClick={handleConfirm}
            color="primary"
            isDisabled={!isAddress(address)}
          >
            Confirm
          </Button>
        </div>
      </StandardModal>
    </div>
  );
}
