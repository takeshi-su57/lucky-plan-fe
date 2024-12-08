"use client";

import { useCallback, useMemo, useState } from "react";
import { Tab, Tabs, Card, Button, CardBody, Chip } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { ContractInfoFragment, ContractStatus } from "@/graphql/gql/graphql";
import {
  useChangeContractStatus,
  useGetAllContracts,
} from "@/app-hooks/useContract";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";

const columns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
    allowsSorting: true,
  },
  {
    id: "chainId",
    component: "Chain",
    allowsSorting: true,
  },
  {
    id: "address",
    component: "Address",
    allowsSorting: true,
  },
  {
    id: "description",
    component: "Description",
  },
  {
    id: "status",
    component: "Status",
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

type TabType = "all" | "live" | "dead";

export default function Page() {
  const allContracts = useGetAllContracts();
  const changeContractStatus = useChangeContractStatus();

  const [selected, setSelected] = useState<TabType>("all");

  const handleToggleStatus = useCallback(
    (contract: ContractInfoFragment) => {
      changeContractStatus({
        variables: {
          input: {
            id: contract.id,
            status:
              contract.status === ContractStatus.Live
                ? ContractStatus.Dead
                : ContractStatus.Live,
          },
        },
      });
    },
    [changeContractStatus],
  );

  const rows = useMemo(() => {
    if (allContracts.length === 0) {
      return [];
    }
    return allContracts
      .filter((contract) =>
        selected !== "all"
          ? selected === "live"
            ? contract.status === ContractStatus.Live
            : contract.status === ContractStatus.Dead
          : true,
      )
      .map((contract) => ({
        id: `${contract.id}`,
        className: "group",
        data: {
          id: {
            sortableAmount: contract.id,
            component: contract.id,
          },
          chainId: {
            sortableAmount: contract.chainId,
            component: contract.chainId,
          },
          address: {
            sortableAmount: contract.address,
            component: <AddressWidget address={contract.address as Address} />,
          },
          description: {
            component: contract.description,
          },
          status: {
            sortableAmount: contract.status,
            component: (
              <Chip
                color={
                  contract.status === ContractStatus.Live
                    ? "success"
                    : "default"
                }
              >
                {contract.status}
              </Chip>
            ),
          },
          action: {
            component: (
              <Button onClick={() => handleToggleStatus(contract)}>
                Change Status
              </Button>
            ),
            className: "w-[50px]",
          },
        },
      }));
  }, [allContracts, handleToggleStatus, selected]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Tabs
          aria-label="users-table-tabs"
          selectedKey={selected}
          onSelectionChange={(value) => value && setSelected(value as TabType)}
        >
          <Tab key="all" title="All" />
          <Tab key="live" title="Live" />
          <Tab key="dead" title="Dead" />
        </Tabs>
      </div>

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
      </Card>
    </div>
  );
}
