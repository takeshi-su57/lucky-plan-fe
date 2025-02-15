"use client";

import { useMemo } from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import { ContractStatus } from "@/graphql/gql/graphql";
import { useGetAllContracts } from "@/app-hooks/useContract";

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
];

export function ContractPanel() {
  const allContracts = useGetAllContracts();

  const rows = useMemo(() => {
    if (allContracts.length === 0) {
      return [];
    }
    return allContracts.map((contract) => ({
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
                contract.status === ContractStatus.Live ? "success" : "default"
              }
            >
              {contract.status}
            </Chip>
          ),
        },
      },
    }));
  }, [allContracts]);

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
    </Card>
  );
}
