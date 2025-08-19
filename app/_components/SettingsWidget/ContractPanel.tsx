"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Address } from "viem";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";
import {
  Contract,
  ContractStatus,
  Platform,
  UserPermission,
  Version,
} from "@/graphql/gql/graphql";
import {
  useDisableContract,
  useGetAdaptionStatus,
  useGetAllContracts,
  useLiveContract,
} from "@/app-hooks/useContract";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { ContractCircularProgress } from "./ContractCircularProgress";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { ServiceStatus } from "@/types";
import { ContractAdaptionButton } from "./ContractAdaptionButton";

const columns: TableColumnProps[] = [
  {
    id: "id",
    component: "ID",
    allowsSorting: true,
  },
  {
    id: "address",
    component: "Address",
    allowsSorting: true,
  },
  {
    id: "progress",
    component: "Progress",
  },
  {
    id: "status",
    component: "Status",
  },
  {
    id: "actions",
    component: "",
  },
];

export function ContractPanel() {
  const allContracts = useGetAllContracts();
  const { disableContract } = useDisableContract();
  const { liveContract } = useLiveContract();
  const adaptionStatus = useGetAdaptionStatus();

  const { userJwtQuery } = useUserJWT();

  const isAdmin = userJwtQuery?.data?.permission === UserPermission.Admin;

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platform.Gns,
  );
  const [selectedVersion, setSelectedVersion] = useState<Version>(Version.V9);

  const handleChangeStatus = useCallback(
    (contract: Contract) => () => {
      if (contract.status === ContractStatus.Live) {
        disableContract({ variables: { contractId: contract.id } });
      } else {
        liveContract({ variables: { contractId: contract.id } });
      }
    },
    [disableContract, liveContract],
  );

  const rows = useMemo(() => {
    if (allContracts.length === 0) {
      return [];
    }
    return allContracts
      .sort((a, b) => a.id - b.id)
      .filter(
        (contract) =>
          contract.platform === selectedPlatform &&
          contract.version === selectedVersion,
      )
      .map((contract) => ({
        id: `${contract.id}`,
        className: "group",
        data: {
          id: {
            sortableAmount: contract.id,
            component: `${contract.id}`,
          },
          address: {
            sortableAmount: contract.address,
            component: (
              <div className="flex flex-col">
                <AddressWidget address={contract.address as Address} />
                <span className="text-xs">{`Chain ID: ${contract.chainId} ${contract.isTestnet ? "(Testnet)" : ""}`}</span>
                <span className="text-xs text-gray-400/60">
                  {contract.description}
                </span>
              </div>
            ),
          },
          progress: {
            component: (
              <ContractCircularProgress
                chainId={contract.chainId}
                fromBlock={contract.fromBlock}
                toBlock={contract.toBlock ?? 0}
                currentBlock={
                  contract.lastLeaderboardBlockNumber ?? contract.fromBlock
                }
                status={adaptionStatus[contract.id] ?? ServiceStatus.READY}
              />
            ),
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
          actions: {
            component: isAdmin ? (
              <div className="flex items-center gap-6">
                <Button
                  size="sm"
                  variant="solid"
                  color={
                    contract.status === ContractStatus.Live
                      ? "danger"
                      : "success"
                  }
                  onClick={handleChangeStatus(contract)}
                >
                  {contract.status === ContractStatus.Live ? "Disable" : "Live"}
                </Button>

                {adaptionStatus[contract.id] !== ServiceStatus.PROCESS ? (
                  <ContractAdaptionButton contractId={contract.id} />
                ) : null}
              </div>
            ) : null,
          },
        },
      }));
  }, [
    adaptionStatus,
    allContracts,
    handleChangeStatus,
    isAdmin,
    selectedPlatform,
    selectedVersion,
  ]);

  return (
    <Card>
      <CardBody className="flex flex-col gap-8">
        <div className="flex items-center gap-6">
          <Select
            isRequired
            className="max-w-xs"
            label="Platform"
            placeholder="Select a platform"
            selectedKeys={[selectedPlatform]}
            onChange={(e) => setSelectedPlatform(e.target.value as Platform)}
            selectionMode="single"
          >
            {Object.values(Platform).map((platform) => (
              <SelectItem key={platform}>{platform}</SelectItem>
            ))}
          </Select>

          <Select
            isRequired
            className="max-w-xs"
            label="Version"
            placeholder="Select a version"
            selectedKeys={[selectedVersion]}
            onChange={(e) => setSelectedVersion(e.target.value as Version)}
            selectionMode="single"
          >
            {Object.values(Version).map((version) => (
              <SelectItem key={version}>{version}</SelectItem>
            ))}
          </Select>
        </div>

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
