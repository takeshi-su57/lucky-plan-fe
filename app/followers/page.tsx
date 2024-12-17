"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Card,
  Button,
  CardBody,
  Spinner,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { FollowerDetailInfoFragment } from "@/graphql/gql/graphql";
import { StandardModal } from "@/components/modals/StandardModal";
import {
  useGenerateFollower,
  useGetAllFollowerDetails,
  useGetFollowerPrivateKey,
  useSubscribeFollowerDetailUpdated,
  useWithdrawAll,
} from "@/app-hooks/useFollower";
import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { Address } from "viem";
import { useGetAllContracts } from "../_hooks/useContract";
import { shrinkAddress } from "@/utils";

const columns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "privateKey",
    component: "Private Key",
  },
  {
    id: "ethBalance",
    component: "ETH",
  },
  {
    id: "usdcBalance",
    component: "USDC",
  },
  {
    id: "action",
    component: "",
    className: "flex-end",
  },
];

export default function Page() {
  const { getPrivateKey, data } = useGetFollowerPrivateKey();
  const generateFollower = useGenerateFollower();
  const withdrawAll = useWithdrawAll();
  const allContracts = useGetAllContracts();

  const [contractId, setContractId] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const allFollowers = useGetAllFollowerDetails(contractId);
  useSubscribeFollowerDetailUpdated(contractId);

  const handleGetPrivateKey = useCallback(
    (follower: FollowerDetailInfoFragment) => {
      getPrivateKey({
        variables: {
          input: {
            address: follower.address,
          },
        },
      });

      setSelectedAddress(follower.address);
    },
    [getPrivateKey],
  );

  const handleWithdrawAll = useCallback(
    (follower: FollowerDetailInfoFragment) => {
      withdrawAll({
        variables: {
          input: {
            address: follower.address,
            contractId: follower.contractId,
          },
        },
      });
    },
    [withdrawAll],
  );

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedAddress(null);
    }
  };

  const handleGenerateFollower = () => {
    generateFollower({
      variables: {},
    });
  };

  const rows = useMemo(() => {
    if (allFollowers.length === 0) {
      return [];
    }
    return allFollowers.map((follower) => ({
      id: `${follower.address}-${follower.contractId}`,
      className: "group",
      data: {
        address: {
          component: <AddressWidget address={follower.address as Address} />,
        },
        privateKey: {
          component: (
            <Button onClick={() => handleGetPrivateKey(follower)}>
              Get Private Key
            </Button>
          ),
        },
        ethBalance: {
          component: (Number(follower.ethBalance) / 1e18).toFixed(9) || "",
        },
        usdcBalance: {
          component: Number(follower.usdcBalance) / 1e6,
        },
        action: {
          component: (
            <Button onClick={() => handleWithdrawAll(follower)}>
              Withdraw All
            </Button>
          ),
          className: "w-[50px]",
        },
      },
    }));
  }, [allFollowers, handleGetPrivateKey, handleWithdrawAll]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Autocomplete
          label="Follower Contract"
          variant="underlined"
          defaultItems={allContracts}
          placeholder="Search contract"
          selectedKey={contractId}
          className="w-[400px]"
          onSelectionChange={(key) => setContractId(key as string | null)}
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

        <Button color="primary" onClick={handleGenerateFollower}>
          Generate Follower
        </Button>
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

      <StandardModal
        isOpen={!!selectedAddress}
        onOpenChange={handleOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Follower Private Key
          </h1>

          {!data ? (
            <Spinner size="lg" />
          ) : (
            <span className="text-clip text-wrap break-words">
              {data.getFollowerPrivateKey}
            </span>
          )}
        </div>
      </StandardModal>
    </div>
  );
}
