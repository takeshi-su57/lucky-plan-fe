"use client";

import { useMemo, useState } from "react";
import { Address } from "viem";
import {
  Button,
  Autocomplete,
  AutocompleteItem,
  Accordion,
  AccordionItem,
  Switch,
  Card,
  CardBody,
  useDisclosure,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { Virtuoso } from "react-virtuoso";
import { useRouter, useSearchParams } from "next/navigation";

import {
  useGenerateFollower,
  useGetAllFollowerDetails,
  useGetAllFollowers,
} from "@/app-hooks/useFollower";
import { useGetAllContracts } from "@/app-hooks/useContract";
import { shrinkAddress } from "@/utils";
import { FollowerInfoWidget } from "@/app-components/FollowerWidgets/FollowerInfoWidget";

import { FollowerDetails } from "@/app-components/FollowerWidgets/FollowerDetails";
import { getPriceStr } from "@/utils/price";
import { LabeledChip } from "@/components/chips/LabeledChip";
import { WithdrawModal } from "./WithdrawModal";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";

export function Followers() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allFollowers = useGetAllFollowers();
  const allContracts = useGetAllContracts();
  const generateFollower = useGenerateFollower();

  const [contractId, setContractId] = useState<string | null>(
    searchParams.get("contractId") || null,
  );

  const [isChatFirst, setIsChatFirst] = useState(true);
  const [showAllActivity, setShowAllActivity] = useState(false);

  const followerDetails = useGetAllFollowerDetails(contractId);

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

    return allFollowers.map((follower) => {
      const exist = followerDetails.find(
        (item) => item.address === follower.address,
      );

      if (exist) {
        return {
          address: exist.address,
          accountIndex: exist.accountIndex,
          publicKey: exist.publicKey,
          ethBalance: exist.ethBalance ? Number(exist.ethBalance) : 0,
          usdcBalance: exist.usdcBalance ? Number(exist.usdcBalance) : 0,
          contractId: exist.contractId,
          accUSDPnl:
            exist.pnlSnapshots.find(
              (item) => item.kind === PnlSnapshotKind.AllTime,
            )?.accUSDPnl || 0,
        };
      } else {
        return {
          address: follower.address,
          accountIndex: follower.accountIndex,
          publicKey: follower.publicKey,
          usdcBalance: 0,
          ethBalance: 0,
          contractId: +contractId,
          accUSDPnl: 0,
        };
      }
    });
  }, [allFollowers, contractId, followerDetails]);

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

          <Switch
            isSelected={isChatFirst}
            onValueChange={setIsChatFirst}
            size="sm"
          >
            Chat First
          </Switch>

          <Switch
            isSelected={showAllActivity}
            onValueChange={setShowAllActivity}
            size="sm"
          >
            {showAllActivity ? "Show All Activities" : "Show Valid Activities"}
          </Switch>
        </div>

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
      </div>

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
                  <FollowerDetails
                    follower={follower}
                    isChatFirst={isChatFirst}
                    mode={
                      showAllActivity
                        ? "show_all_activity"
                        : "show_only_valid_activity"
                    }
                  />
                </AccordionItem>
              </Accordion>
            )}
          />
        </CardBody>
      </Card>

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
