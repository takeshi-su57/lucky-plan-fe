"use client";

import { useCallback, useMemo, useState } from "react";
import { Card, Button, CardBody, Spinner } from "@nextui-org/react";

import { DataTable, TableColumnProps } from "@/components/tables/DataTable";

import { FollowerInfoFragment } from "@/graphql/gql/graphql";
import { StandardModal } from "@/components/tables/modals/StandardModal";
import {
  useGenerateFollower,
  useGetAllFollowers,
  useGetFollowerPrivateKey,
} from "@/app-hooks/useFollower";

const columns: TableColumnProps[] = [
  {
    id: "address",
    component: "Address",
  },
  {
    id: "ethBalance",
    component: "ETH",
    allowsSorting: true,
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
  const allFollowers = useGetAllFollowers();
  const { getPrivateKey, data } = useGetFollowerPrivateKey();
  const generateFollower = useGenerateFollower();

  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  const handleGetPrivateKey = useCallback(
    (follower: FollowerInfoFragment) => {
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
      id: follower.address,
      className: "group",
      data: {
        address: {
          component: follower.address,
        },
        ethBalance: {
          sortableAmount: follower.ethBalance,
          component: follower.ethBalance,
        },
        usdcBalance: {
          sortableAmount: follower.usdcBalance,
          component: follower.usdcBalance,
        },
        action: {
          component: (
            <Button onClick={() => handleGetPrivateKey(follower)}>
              Get Private Key
            </Button>
          ),
          className: "w-[50px]",
        },
      },
    }));
  }, [allFollowers, handleGetPrivateKey]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-end">
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
              tr: "hover:bg-white/5 cursor-pointer",
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
