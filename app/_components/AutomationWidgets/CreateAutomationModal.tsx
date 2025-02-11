"use client";

import { useMemo, useState } from "react";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { Address } from "viem";

import { StandardModal } from "@/components/modals/StandardModal";

import {
  useGetAllContracts,
  useGetAllTradePairs,
} from "@/app-hooks/useContract";
import { useCreateBot, useGetBotsByStatus } from "@/app/_hooks/useAutomation";
import { useGetUsersByTags } from "@/app/_hooks/useUser";
import { useGetAvailableFollowers } from "@/app/_hooks/useFollower";
import { useGetAllStrategy } from "@/app/_hooks/useStrategy";
import { shrinkAddress } from "@/utils";
import { NumericInput } from "@/components/inputs/NumericInput";
import { BotStatus } from "@/graphql/gql/graphql";
import { useGetPersonalTradeHistories } from "@/app/_hooks/useGetPersonalTradeHistories";

import LineChart from "@/components/charts/LineChart";
import {
  getHistoriesChartData,
  transformHistories,
} from "@/utils/historiesChart";
import { PairChip } from "../LeaderboardWidgets/PairChip";
import { Virtuoso } from "react-virtuoso";

export type CreateAutomationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateAutomationModal({
  isOpen,
  onClose,
  onOpenChange,
}: CreateAutomationModalProps) {
  const createBot = useCreateBot();

  const allLeaders = useGetUsersByTags(["LEADER"]);
  const allFollowers = useGetAvailableFollowers([]);
  const allContracts = useGetAllContracts();
  const allStrategies = useGetAllStrategy();

  const createdBots = useGetBotsByStatus(BotStatus.Created);
  const liveBots = useGetBotsByStatus(BotStatus.Live);
  const stopBots = useGetBotsByStatus(BotStatus.Stop);

  const [leaderAddress, setLeaderAddress] = useState<string | null>(null);
  const [followerAddress, setFollowerAddress] = useState<string | null>(null);
  const [leaderContractId, setLeaderContractId] = useState<string | null>(null);
  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );
  const [strategyId, setStrategyId] = useState<string | null>(null);
  const [collateralBaseline, setCollateralBaseline] = useState<string>("");

  const followerAvailableTradePairs = useGetAllTradePairs(
    followerContractId ? +followerContractId : undefined,
  );

  const leaderContract = leaderContractId
    ? allContracts.find((item) => item.id === +leaderContractId)
    : null;

  const { data: originalHistories } = useGetPersonalTradeHistories(
    leaderContract?.backendUrl || null,
    leaderAddress || null,
  );

  const isDisabled =
    !leaderAddress ||
    !followerAddress ||
    !leaderContractId ||
    !followerContractId ||
    !collateralBaseline ||
    !strategyId;

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    createBot({
      variables: {
        input: {
          leaderAddress,
          followerAddress,
          leaderContractId: +leaderContractId,
          followerContractId: +followerContractId,
          strategyId: +strategyId,
          leaderCollateralBaseline: Math.floor(+collateralBaseline),
        },
      },
    });

    onClose();
  };

  const updatedLeaders = useMemo(() => {
    const countsMap = new Map<string, number>();

    [...createdBots, ...liveBots, ...stopBots].forEach((bot) => {
      countsMap.set(
        bot.leaderAddress,
        (countsMap.get(bot.leaderAddress) || 0) + 1,
      );
    });
    return allLeaders.map((item) => ({
      ...item,
      count: countsMap.get(item.address) || 0,
    }));
  }, [createdBots, liveBots, stopBots, allLeaders]);

  const {
    tradePairs: originalTradePairs,
    pnlChartData: originalPNLChartData,
    inOutChartData: originalInOutChartData,
    inChartData: originalInChartData,
    outChartData: originalOutChartData,
    minIn: originalMinIn,
    maxIn: originalMaxIn,

    sumIn: originalSumIn,
    countIn: originalCountIn,
  } = useMemo(
    () => getHistoriesChartData(originalHistories || []),
    [originalHistories],
  );

  const {
    tradePairs: calculatedTradePairs,
    pnlChartData: calculatedPNLChartData,
    inOutChartData: calculatedInOutChartData,
    inChartData: calculatedInChartData,
    outChartData: calculatedOutChartData,
    minIn: calculatedMinIn,

    maxIn: calculatedMaxIn,
    sumIn: calculatedSumIn,
    countIn: calculatedCountIn,
  } = useMemo(() => {
    const baseline = Math.floor(+collateralBaseline);

    const strategy = strategyId
      ? allStrategies.find((item) => item.id === +strategyId)
      : null;

    if (!originalHistories || Number.isNaN(baseline) || !strategy) {
      return {
        pnlChartData: [],
        inOutChartData: [],
        inChartData: [],
        outChartData: [],
        minIn: 0,
        maxIn: 0,
        sumIn: 0,
        countIn: 0,
        tradePairs: [],
      };
    }

    const transformedHistories = transformHistories(
      originalHistories,
      baseline,
      strategy,
    );

    const availablePairNames = followerAvailableTradePairs.map((item) =>
      `${item.from}/${item.to}`.toLowerCase(),
    );

    return getHistoriesChartData(
      transformedHistories.filter((history) =>
        availablePairNames.includes(history.pair.toLowerCase()),
      ),
    );
  }, [
    allStrategies,
    collateralBaseline,
    followerAvailableTradePairs,
    originalHistories,
    strategyId,
  ]);

  return (
    <StandardModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{ base: "max-w-[1100px]" }}
    >
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Automation
        </h1>

        <div className="flex w-full gap-8">
          <div className="flex w-[200px] flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Autocomplete
                label="Leader"
                variant="underlined"
                defaultItems={updatedLeaders}
                placeholder="Search leader"
                selectedKey={leaderAddress}
                onSelectionChange={(key) =>
                  setLeaderAddress(key as string | null)
                }
              >
                {(item) => (
                  <AutocompleteItem
                    className="font-mono"
                    key={item.address}
                    textValue={shrinkAddress(item.address as Address)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{shrinkAddress(item.address as Address)}</span>
                      <span>{item.count}</span>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Autocomplete
                label="Leader Contract"
                variant="underlined"
                defaultItems={allContracts}
                placeholder="Search contract"
                selectedKey={leaderContractId}
                onSelectionChange={(key) =>
                  setLeaderContractId(key as string | null)
                }
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.id}
                    className="font-mono"
                    textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-small">Chain: {item.chainId}</span>
                      <span className="text-small">
                        Contract: {shrinkAddress(item.address as Address)}
                      </span>
                      <span className="text-tiny text-default-400">
                        {item.description}
                      </span>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Autocomplete
                label="Follower"
                variant="underlined"
                defaultItems={allFollowers}
                placeholder="Search follower"
                selectedKey={followerAddress}
                onSelectionChange={(key) =>
                  setFollowerAddress(key as string | null)
                }
              >
                {(item) => (
                  <AutocompleteItem
                    className="font-mono"
                    key={item.address}
                    textValue={shrinkAddress(item.address as Address)}
                  >
                    {shrinkAddress(item.address as Address)}
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <Autocomplete
                label="Follower Contract"
                variant="underlined"
                // hide ape contract as a follower contract
                defaultItems={allContracts.filter(
                  (item) => item.chainId !== 33139,
                )}
                placeholder="Search contract"
                selectedKey={followerContractId}
                onSelectionChange={(key) =>
                  setFollowerContractId(key as string | null)
                }
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.id}
                    className="font-mono"
                    textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-small">Chain: {item.chainId}</span>
                      <span className="text-small">
                        Contract: {shrinkAddress(item.address as Address)}
                      </span>
                      <span className="text-tiny text-default-400">
                        {item.description}
                      </span>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>

              <NumericInput
                amount={collateralBaseline}
                onChange={setCollateralBaseline}
                label="Collateral Baseline"
              />

              <Autocomplete
                label="Strategy"
                variant="underlined"
                defaultItems={allStrategies}
                placeholder="Search strategy"
                selectedKey={strategyId}
                onSelectionChange={(key) => setStrategyId(key as string | null)}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.id}
                    className="font-mono"
                    textValue={`${item.id}-${item.strategyKey}-${item.ratio}x`}
                  >
                    <div className="flex flex-col font-mono">
                      <span className="text-small">{`${item.strategyKey}(${item.id}, ${item.ratio}%)`}</span>
                      <span className="text-small">
                        Collateral:
                        {`(${Number(item.minCollateral)} ~ ${Number(item.maxCollateral)}) USDC`}
                      </span>
                      <span className="text-small">
                        Baseline:
                        {`${Number(item.collateralBaseline)} USDC`}
                      </span>
                      <span className="text-small">
                        Leverage:
                        {`(${item.minLeverage / 1000} ~ ${item.maxLeverage / 1000}) x`}
                      </span>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>
            </div>

            <Button
              onClick={handleConfirm}
              color="primary"
              isDisabled={isDisabled}
            >
              Save
            </Button>
          </div>

          <div className="flex flex-1 flex-col gap-6">
            {originalTradePairs.length > 0 && (
              <span className="text-xl font-bold">
                Leader - {originalTradePairs.length} Pairs
              </span>
            )}

            {leaderContractId && (
              <Virtuoso
                style={{ height: 55, width: 800, overflowY: "hidden" }}
                data={originalTradePairs}
                horizontalDirection
                itemContent={(_, data) => (
                  <div className="mr-4">
                    <PairChip
                      key={data[0]}
                      contractId={+leaderContractId}
                      pairName={data[0]}
                      count={data[1]}
                    />
                  </div>
                )}
              />
            )}

            {calculatedTradePairs.length > 0 && (
              <span className="text-xl font-bold">
                Follower - {calculatedTradePairs.length} Pairs
              </span>
            )}

            {followerContractId && (
              <Virtuoso
                style={{ height: 55, width: 800, overflowY: "hidden" }}
                data={calculatedTradePairs}
                horizontalDirection
                itemContent={(_, data) => (
                  <div className="mr-4">
                    <PairChip
                      key={data[0]}
                      contractId={+followerContractId}
                      pairName={data[0]}
                      count={data[1]}
                    />
                  </div>
                )}
              />
            )}

            <div className="flex w-full gap-6">
              <div className="flex flex-1 flex-col gap-4">
                <span className="text-xl font-bold">Original</span>

                <div className="flex flex-col gap-4 text-xs text-neutral-400">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex-1">
                      Min In: {originalMinIn.toFixed(2)}
                    </span>
                    <span className="flex-1">
                      Max In: {originalMaxIn.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex-1">
                      Avg In: {(originalSumIn / originalCountIn).toFixed(2)}
                    </span>
                    <span className="flex-1">Count In: {originalCountIn}</span>
                  </div>
                </div>

                <LineChart
                  title="PNL"
                  data={originalPNLChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />
                <LineChart
                  title="In/Out"
                  data={originalInOutChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />
                <LineChart
                  title="Out"
                  data={originalOutChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />
                <LineChart
                  title="In"
                  data={originalInChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <span className="text-xl font-bold">Calculated</span>

                <div className="flex flex-col gap-4 text-xs text-neutral-400">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex-1">
                      Min In: {calculatedMinIn.toFixed(2)}
                    </span>
                    <span className="flex-1">
                      Max In: {calculatedMaxIn.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="flex-1">
                      Avg In: {(calculatedSumIn / calculatedCountIn).toFixed(2)}
                    </span>
                    <span className="flex-1">
                      Count In: {calculatedCountIn}
                    </span>
                  </div>
                </div>

                <LineChart
                  title="PNL"
                  data={calculatedPNLChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />

                <LineChart
                  title="In/Out"
                  data={calculatedInOutChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />

                <LineChart
                  title="Out"
                  data={calculatedOutChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />

                <LineChart
                  title="In"
                  data={calculatedInChartData}
                  className="h-[200px] w-full rounded-2xl border border-neutral-800 bg-amber-950/5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StandardModal>
  );
}
