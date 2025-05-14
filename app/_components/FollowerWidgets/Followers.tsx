"use client";

import { useMemo, useState } from "react";
import { Address } from "viem";
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  useDisclosure,
  Spinner,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { Virtuoso } from "react-virtuoso";
import { useRouter, useSearchParams } from "next/navigation";

import {
  useGenerateFollower,
  useGetAllFollowerDetails,
} from "@/app-hooks/useFollower";
import { useGetAllContracts } from "@/app-hooks/useContract";
import { getPNLPercentage, shrinkAddress } from "@/utils";
import { FollowerInfoWidget } from "@/app-components/FollowerWidgets/FollowerInfoWidget";

import { FollowerDetails } from "@/app-components/FollowerWidgets/FollowerDetails";
import { getPriceStr } from "@/utils/price";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { WithdrawModal } from "./WithdrawModal";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { useGetPrices } from "@/app/_hooks/useGetPrices";

export function Followers() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allContracts = useGetAllContracts();
  const generateFollower = useGenerateFollower();
  const prices = useGetPrices();

  const [contractId, setContractId] = useState<string | null>(
    searchParams.get("contractId") || null,
  );

  const { details: followerDetails, loading: followerLoading } =
    useGetAllFollowerDetails(contractId);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleGenerateFollower = () => {
    generateFollower({
      variables: {},
    });
  };

  const followers = useMemo(() => {
    if (contractId === null) {
      return [];
    }

    return followerDetails.map((follower) => {
      return {
        address: follower.address,
        accountIndex: follower.accountIndex,
        publicKey: follower.publicKey,
        ethBalance: follower.ethBalance ? Number(follower.ethBalance) : 0,
        usdcBalance: follower.usdcBalance ? Number(follower.usdcBalance) : 0,
        contractId: follower.contractId,
        accUSDPnl:
          follower.pnlSnapshots.find(
            (item) => item.kind === PnlSnapshotKind.AllTime,
          )?.accUSDPnl || 0,
        trades: follower.trades,
        pendingOrders: follower.pendingOrders,
      };
    });
  }, [contractId, followerDetails]);

  const summary = followerDetails
    .flatMap((follower) => follower.trades)
    .map((trade) => {
      const data = JSON.parse(trade.params);

      const currentPrice = prices?.[data?.pairIndex || 0];
      const openPrice = data?.openPrice ? Number(data.openPrice) / 1e10 : 0;
      const collateralAmount = data?.collateralAmount
        ? Number(data.collateralAmount) / 1e6
        : 0;

      const pnlPercentage = currentPrice
        ? getPNLPercentage({
            closePrice: currentPrice,
            openPrice,
            leverage: data.leverage / 1000,
            long: data.long,
          })
        : 0;

      return {
        pnls: (collateralAmount * pnlPercentage) / 100,
        size: collateralAmount,
      };
    })
    .reduce(
      (acc, item) => {
        return {
          pnls: acc.pnls + item.pnls,
          size: acc.size + item.size,
        };
      },
      { pnls: 0, size: 0 },
    );

  const { totalEarned, totalLost } = useMemo(() => {
    return followerDetails.reduce(
      (acc, item) => {
        const accUSDPnl =
          item.pnlSnapshots.find(
            (item) => item.kind === PnlSnapshotKind.AllTime,
          )?.accUSDPnl || 0;

        return {
          totalEarned: acc.totalEarned + (accUSDPnl > 0 ? accUSDPnl : 0),
          totalLost: acc.totalLost + (accUSDPnl < 0 ? accUSDPnl : 0),
        };
      },
      { totalEarned: 0, totalLost: 0 },
    );
  }, [followerDetails]);

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

              router.push(`/followers?${contractQuery || ""}`);
            }}
          >
            {(item) => (
              <AutocompleteItem
                key={item.id}
                className="font-mono"
                textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-small">Chain: {item.chainId}</span>
                    <span className="text-small">
                      {item.isTestnet ? "(Testnet)" : ""}
                    </span>
                  </div>
                  <span className="text-small">Contract: {item.address}</span>
                  <span className="text-tiny text-default-400">
                    {item.description}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>

        {contractId ? (
          <div className="flex items-center gap-4">
            <LabeledChip
              label="Gas"
              value={(
                followers
                  .map((item) => item.ethBalance)
                  .reduce((acc, item) => acc + item, 0) / 1e18
              ).toFixed(2)}
              unit="ETH"
            />

            <LabeledChip
              label="Collateral"
              value={(
                followers
                  .map((item) => item.usdcBalance)
                  .reduce((acc, item) => acc + item, 0) / 1e6
              ).toFixed(2)}
              unit="USDC"
            />

            <LabeledChip
              label="Earned"
              value={getPriceStr(totalEarned)}
              unit="USDC"
              color="warning"
            />

            <LabeledChip
              label="Lost"
              value={getPriceStr(totalLost)}
              unit="USDC"
              color="danger"
            />

            <LabeledChip
              label="Unrealized PNL"
              value={getPriceStr(summary.pnls)}
              unit="USDC"
              color={summary.pnls >= 0 ? "warning" : "danger"}
            />

            <LabeledChip
              label="Locked at Gains"
              value={getPriceStr(summary.size)}
              unit="USDC"
              color="default"
            />

            {contractId ? (
              <Button color="primary" variant="flat" onClick={onOpen}>
                Withdraw
              </Button>
            ) : null}

            <Button
              isIconOnly
              color="primary"
              variant="flat"
              onClick={handleGenerateFollower}
            >
              <FaPlus />
            </Button>
          </div>
        ) : null}
      </div>
      {followerLoading ? (
        <Spinner label="Loading..." size="lg" className="mt-[100px]" />
      ) : (
        <Card>
          <CardBody>
            <Virtuoso
              style={{ height: 700 }}
              data={followers}
              itemContent={(_, follower) => (
                <Accordion
                  key={follower.address}
                  isCompact
                  variant="splitted"
                  className="!mb-2"
                >
                  <AccordionItem
                    title={<FollowerInfoWidget follower={follower} />}
                  >
                    <FollowerDetails follower={follower} isChatFirst={false} />
                  </AccordionItem>
                </Accordion>
              )}
            />
          </CardBody>
        </Card>
      )}

      {contractId ? (
        <WithdrawModal
          contractId={+contractId}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      ) : null}
    </div>
  );
}
