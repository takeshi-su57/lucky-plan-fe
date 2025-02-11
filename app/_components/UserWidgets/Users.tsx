"use client";

import { useState, useMemo } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Card,
  Button,
  CardBody,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { Address } from "viem";

import { useGetUsersByTags } from "@/app/_hooks/useUser";
import { UserTradeHistory } from "@/app-components/UserWidgets/UserTradeHistory";
import { useGetAllTags } from "@/app-hooks/useTag";
import { useGetAllContracts } from "@/app-hooks/useContract";

import { shrinkAddress } from "@/utils";
import { CreateUserModal } from "@/app-components/UserWidgets/CreateUserModal";
import { FaPlus } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

export function Users() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allTags = useGetAllTags();
  const allContracts = useGetAllContracts();

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [contractId, setContractId] = useState<string | null>(
    searchParams.get("contractId") || null,
  );
  const [selectedTags, setSelectedTags] = useState<Selection>(
    new Set((searchParams.get("tags") || "").split(",")),
  );

  const selectedValue = useMemo(() => Array.from(selectedTags), [selectedTags]);

  const allUsers = useGetUsersByTags(selectedValue as string[]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Autocomplete
            label="Follower Contract"
            variant="underlined"
            defaultItems={allContracts}
            placeholder="Search contract"
            selectedKey={contractId}
            className="w-[400px]"
            onSelectionChange={(key) => {
              setContractId(key as string | null);

              const contractQuery = key ? `contractId=${key}` : null;
              const tagsQuery = selectedTags
                ? `tags=${Array.from(selectedTags).join(",")}`
                : null;

              router.push(
                `/users?${contractQuery || ""}${contractQuery && tagsQuery ? `&` : ""}${tagsQuery || ""}`,
              );
            }}
          >
            {(item) => (
              <AutocompleteItem
                key={item.id}
                className="font-mono"
                textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
              >
                <div className="flex flex-col">
                  <span className="text-small">Chain: {item.chainId}</span>
                  <span className="text-small">Contract: {item.address}</span>
                  <span className="text-tiny text-default-400">
                    {item.description}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>

          <Dropdown>
            <DropdownTrigger>
              <Button className="capitalize" variant="bordered">
                {selectedValue.length > 0
                  ? selectedValue
                      .filter((item) => item.toString().trim() !== "")
                      .join(", ")
                  : "Select Tags"}
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              closeOnSelect={false}
              selectedKeys={selectedTags}
              selectionMode="multiple"
              variant="flat"
              onSelectionChange={(value) => {
                setSelectedTags(value);

                const contractQuery = contractId
                  ? `contractId=${contractId}`
                  : null;
                const tagsQuery = value
                  ? `tags=${Array.from(value).join(",")}`
                  : null;

                router.push(
                  `/users?${contractQuery || ""}${contractQuery && tagsQuery ? `&` : ""}${tagsQuery || ""}`,
                );

                value.toString();
              }}
            >
              {allTags.map((tag) => (
                <DropdownItem key={tag.tag}>
                  <div className="flex items-center gap-2">
                    {tag.tag}
                    <span
                      className="h-5 w-10"
                      style={{ background: tag.color }}
                    />
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Button isIconOnly color="primary" variant="flat" onClick={onOpen}>
          <FaPlus />
        </Button>
      </div>

      <Card>
        <CardBody>
          {contractId ? (
            <Virtuoso
              style={{ height: 700 }}
              data={allUsers}
              itemContent={(_, snapshot) => (
                <UserTradeHistory
                  address={snapshot.address as Address}
                  contractId={contractId}
                />
              )}
            />
          ) : null}
        </CardBody>
      </Card>

      <CreateUserModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
