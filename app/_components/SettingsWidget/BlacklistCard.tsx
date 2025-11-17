"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, Input, Button, CardBody } from "@heroui/react";
import { useMutation, useQuery } from "@apollo/client";
import { FaTrash } from "react-icons/fa";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import {
  ADD_TO_BLACKLIST_DOCUMENT,
  GET_BLACKLIST_DOCUMENT,
  REMOVE_FROM_BLACKLIST_DOCUMENT,
} from "@/app/_hooks/usePlan";

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

export function BlacklistCard() {
  const { data: blacklist, refetch } = useQuery(GET_BLACKLIST_DOCUMENT);

  const [addToBlacklist, { loading: addToBlacklistLoading }] = useMutation(
    ADD_TO_BLACKLIST_DOCUMENT,
  );
  const [removeFromBlacklist] = useMutation(REMOVE_FROM_BLACKLIST_DOCUMENT);

  const [blacklistAddress, setBlacklistAddress] = useState("");

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

  return (
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
  );
}
