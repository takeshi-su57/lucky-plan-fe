"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Select,
  SelectItem,
} from "@heroui/react";
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
} from "@/app-hooks/useContract";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { ContractCircularProgress } from "./ContractCircularProgress";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { ServiceStatus } from "@/types";
import { ContractAdaptionButton } from "./ContractAdaptionButton";
import { ContractLiveButton } from "./ContractLiveButton";

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

const availableVersions = {
  [Platform.Gns]: [
    Version.V6V7,
    Version.V8V9_2,
    Version.V9,
    Version.V10,
  ],
  [Platform.Gmx]: [Version.V2],
  [Platform.Avnt]: [Version.V1],
};

function isHistoricalGnsContract(contract: Contract) {
  return (
    contract.platform === Platform.Gns &&
    (contract.version === Version.V6V7 ||
      contract.version === Version.V8V9_2)
  );
}

export function ContractPanel() {
  const allContracts = useGetAllContracts();
  const { disableContract } = useDisableContract();

  const adaptionStatus = useGetAdaptionStatus();

  const { userJwtQuery } = useUserJWT();

  const isAdmin = userJwtQuery?.data?.permission === UserPermission.Admin;

  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(
    Platform.Gns,
  );
  const [selectedVersion, setSelectedVersion] = useState<Version>(Version.V9);

  const handleDisableContract = useCallback(
    (contract: Contract) => () => {
      if (contract.status === ContractStatus.Live) {
        disableContract({ variables: { contractId: contract.id } });
      }
    },
    [disableContract],
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
      .map((contract) => {
        const isHistorical = isHistoricalGnsContract(contract);

        return {
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
                  <span className="text-xs">{`Chain ID: ${contract.chainId}`}</span>
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
                  {contract.status === ContractStatus.Live ? (
                    <Button
                      size="sm"
                      variant="solid"
                      color="danger"
                      onPress={handleDisableContract(contract)}
                    >
                      Disable
                    </Button>
                  ) : isHistorical ? null : (
                    <ContractLiveButton contract={contract} />
                  )}

                  {adaptionStatus[contract.id] !== ServiceStatus.PROCESS ? (
                    <ContractAdaptionButton
                      contract={contract}
                      isHistorical={isHistorical}
                    />
                  ) : null}
                </div>
              ) : null,
            },
          },
        };
      });
  }, [
    adaptionStatus,
    allContracts,
    handleDisableContract,
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
            {availableVersions[selectedPlatform].map((version) => (
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
