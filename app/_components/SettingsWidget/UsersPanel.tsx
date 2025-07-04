"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { useGetAllUsers } from "@/app-hooks/useUser";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ChangePermissionModal } from "./ChangePermissionModal";
import { User } from "@/graphql/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_TO_BLACKLIST_DOCUMENT,
  GET_BLACKLIST_DOCUMENT,
  REMOVE_FROM_BLACKLIST_DOCUMENT,
} from "@/app/_hooks/usePlan";

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

const blacklistColumns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "action",
    component: "",
  },
];

export function UsersPanel() {
  const { users, loading } = useGetAllUsers();

  const { data: blacklist, refetch } = useQuery(GET_BLACKLIST_DOCUMENT);

  const [addToBlacklist, { loading: addToBlacklistLoading }] = useMutation(
    ADD_TO_BLACKLIST_DOCUMENT,
  );
  const [removeFromBlacklist] = useMutation(REMOVE_FROM_BLACKLIST_DOCUMENT);

  const { onOpen, onOpenChange, isOpen } = useDisclosure();
  const [user, setUser] = useState<User | null>(null);
  const [blacklistAddress, setBlacklistAddress] = useState("");

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

  const blacklistRows = useMemo(() => {
    if (!blacklist) {
      return [];
    }
    return (blacklist.getBlacklist || []).map((blacklist) => ({
      id: `${blacklist}`,
      className: "group",
      data: {
        address: {
          component: blacklist,
        },
        action: {
          component: (
            <div className="flex items-center gap-4">
              <Button
                isIconOnly
                color="primary"
                variant="flat"
                onClick={() => {
                  removeFromBlacklist({
                    variables: {
                      address: blacklist,
                    },
                    onCompleted: () => {
                      refetch();
                    },
                  });
                }}
              >
                <FaTrash />
              </Button>
            </div>
          ),
        },
      },
    }));
  }, [blacklist, refetch, removeFromBlacklist]);

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

      <Card>
        <CardHeader>Blacklist</CardHeader>

        <div className="flex items-center justify-end gap-4">
          <Input
            placeholder="Enter blacklist address"
            value={blacklistAddress}
            onChange={(e) => setBlacklistAddress(e.target.value)}
          />
          <Button
            isDisabled={!blacklistAddress || blacklistAddress.trim() === ""}
            isLoading={addToBlacklistLoading}
            onClick={() => {
              addToBlacklist({
                variables: {
                  address: blacklistAddress.toLowerCase(),
                },
                onCompleted: () => {
                  setBlacklistAddress("");
                  refetch();
                },
              });
            }}
          >
            Add to Blacklist
          </Button>
        </div>

        <CardBody>
          <DataTable
            columns={blacklistColumns}
            rows={blacklistRows}
            classNames={{
              tr: "font-mono cursor-pointer",
              td: "py-3 ",
              th: "text-sm leading-tight tracking-widest font-normal text-neutral-4 00 uppercase",
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
