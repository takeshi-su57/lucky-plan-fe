"use client";

import { ChangeEventHandler, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { Address } from "viem";
import { Virtuoso } from "react-virtuoso";
import { nanoid } from "nanoid";

import { StandardModal } from "@/components/modals/StandardModal";

import {
  useGetAllContracts,
  useGetAllTradePairs,
} from "@/app-hooks/useContract";
import { useGetAllBots } from "@/app/_hooks/useAutomation";
import { useGetUsersByTags } from "@/app/_hooks/useUser";
import { useGetAvailableFollowers } from "@/app/_hooks/useFollower";
import { useGetAllStrategyMetadata } from "@/app/_hooks/useStrategy";
import { shrinkAddress, lifeTimeItems } from "@/utils";
import { NumericInput } from "@/components/inputs/NumericInput";
import { BotStatus } from "@/graphql/gql/graphql";
import { useGetPersonalTradeHistories } from "@/app/_hooks/useGetPersonalTradeHistories";

import LineChart from "@/components/charts/LineChart";
import {
  getHistoriesChartData,
  transformHistories,
} from "@/utils/historiesChart";
import { PairChip } from "../LeaderboardWidgets/PairChip";

import { VirtualBot } from "@/types";

export type CreateVirtualAutomationModalProps = {
  virtualFollowers: string[];
  virtualBot: VirtualBot | null;
  onSave: (value: VirtualBot) => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateVirtualAutomationModal({
  virtualFollowers,
  virtualBot,
  isOpen,
  onClose,
  onOpenChange,
  onSave,
}: CreateVirtualAutomationModalProps) {
  const allLeaders = useGetUsersByTags(["LEADER"], false);

  const allFollowers = useGetAvailableFollowers(virtualFollowers);
  const allContracts = useGetAllContracts();
  const allBots = useGetAllBots();
  const allStrategyMetadata = useGetAllStrategyMetadata();

  const [leaderAddress, setLeaderAddress] = useState<string | null>(null);
  const [followerAddress, setFollowerAddress] = useState<string | null>(null);
  const [leaderContractId, setLeaderContractId] = useState<string | null>(null);
  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );
  const [leaderCollateralBaseline, setLeaderCollateralBaseline] =
    useState<string>("");

  const [strategy, setStrategy] = useState<string>();
  const [ratio, setRatio] = useState("100");
  const [lifeTimeScale, setLifeTimeScale] = useState("1m");
  const [maxCollateral, setMaxCollateral] = useState("");
  const [minCollateral, setMinCollateral] = useState("");
  const [collateralBaseline, setCollateralBaseline] = useState("");
  const [maxLeverage, setMaxLeverage] = useState("200");
  const [minLeverage, setMinLeverage] = useState("1.1");

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

  useEffect(() => {
    if (virtualBot) {
      setLeaderAddress(virtualBot.leaderAddress);
      setFollowerAddress(virtualBot.followerAddress);
      setLeaderContractId(virtualBot.leaderContract.contractId.toString());
      setFollowerContractId(virtualBot.followerContract.contractId.toString());
      setLeaderCollateralBaseline(
        virtualBot.leaderCollateralBaseline.toString(),
      );

      setStrategy(virtualBot.strategy.strategyKey);
      setRatio(virtualBot.strategy.ratio.toString());

      const lifeTime = lifeTimeItems.find(
        (item) => item.value === virtualBot.strategy.lifeTime,
      );

      if (lifeTime) {
        setLifeTimeScale(lifeTime.id);
      }

      setCollateralBaseline(virtualBot.strategy.collateralBaseline.toString());

      setMaxCollateral(virtualBot.strategy.maxCollateral.toString());
      setMinCollateral(virtualBot.strategy.minCollateral.toString());
      setMaxLeverage(virtualBot.strategy.maxLeverage.toString());
      setMinLeverage(virtualBot.strategy.minLeverage.toString());
    }
  }, [virtualBot]);

  const handleChangeStrategy: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      if (value === "equalCopy") {
        setRatio("100");
      }
      setStrategy(value);
    }
  };

  const handleChangeLifetime: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setLifeTimeScale(value);
    }
  };

  let strategyHelper = "";
  let ratioHelper = "";
  let maxCollateralHelper = "";
  let minCollateralHelper = "";
  let collateralBaselineHelper = "";
  let maxLeverageHelper = "";
  let minLeverageHelper = "";

  if (!strategy) {
    strategyHelper = "Please select strategy";
  }

  if (Number.isNaN(+ratio)) {
    ratioHelper = "Invalid ratio";
  } else {
    if (+ratio <= 0) {
      ratioHelper = "Invalid ratio";
    }
  }

  if (Number.isNaN(+maxCollateral)) {
    maxCollateralHelper = "Invalid max collateral";
  } else {
    if (+maxCollateral < 5) {
      maxCollateralHelper = "Too small max collateral";
    }
  }

  if (Number.isNaN(+minCollateral)) {
    minCollateralHelper = "Invalid min collateral";
  } else {
    if (+minCollateral > +maxCollateral) {
      minCollateralHelper = "Too big min collateral";
    }

    if (+minCollateral < 5) {
      minCollateralHelper = "Too small min collateral";
    }
  }

  if (Number.isNaN(+collateralBaseline)) {
    collateralBaselineHelper = "Invalid collateral baseline";
  } else {
    if (+collateralBaseline > +maxCollateral) {
      collateralBaselineHelper = "Too big collateral baseline";
    }

    if (+collateralBaseline < +minCollateral) {
      collateralBaselineHelper = "Too small collateral baseline";
    }
  }

  if (Number.isNaN(+maxLeverage)) {
    maxLeverageHelper = "Invalid max leverage";
  } else {
    if (+maxLeverage > 200) {
      maxLeverageHelper = "Too big max leverage";
    }

    if (+maxLeverage < 1.1) {
      maxLeverageHelper = "Too small max leverage";
    }
  }

  if (Number.isNaN(+minLeverage)) {
    minLeverageHelper = "Invalid min leverage";
  } else {
    if (+minLeverage > +maxLeverage) {
      minLeverageHelper = "Too big min leverage";
    }

    if (+minLeverage < 1.1) {
      minLeverageHelper = "Too small min leverage";
    }
  }

  const isDisabled =
    !leaderAddress ||
    !followerAddress ||
    !leaderContractId ||
    !followerContractId ||
    !collateralBaseline;

  const isDisabledStrategy =
    strategyHelper.trim() !== "" ||
    (strategy === "ratioCopy" && ratioHelper.trim() !== "") ||
    maxCollateralHelper.trim() !== "" ||
    minCollateralHelper.trim() !== "" ||
    maxLeverageHelper.trim() !== "" ||
    minLeverageHelper.trim() !== "";

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    if (
      !strategy ||
      (strategy === "ratioCopty" && ratio.trim() === "") ||
      lifeTimeScale.trim() === "" ||
      maxCollateral.trim() === "" ||
      minCollateral.trim() === "" ||
      collateralBaseline.trim() === "" ||
      maxLeverage.trim() === "" ||
      minLeverage.trim() === ""
    ) {
      return;
    }

    const lifeTime = lifeTimeItems.find((item) => item.id === lifeTimeScale);

    const followerContract = allContracts.find(
      (item) => item.id === +followerContractId,
    );

    const leaderContract = allContracts.find(
      (item) => item.id === +leaderContractId,
    );

    if (!lifeTime || !followerContract || !leaderContract) {
      return;
    }

    onSave({
      virtualId: virtualBot?.virtualId || nanoid(),
      followerAddress,
      followerContract: {
        chainId: followerContract.chainId,
        address: followerContract.address,
        backendUrl: followerContract.backendUrl!,
        contractId: followerContract.id,
      },
      leaderAddress,
      leaderContract: {
        chainId: leaderContract.chainId,
        address: leaderContract.address,
        backendUrl: leaderContract.backendUrl!,
        contractId: leaderContract.id,
      },
      leaderCollateralBaseline: Math.floor(+leaderCollateralBaseline),
      strategy: {
        strategyKey: strategy,
        ratio: +ratio,
        collateralBaseline: +collateralBaseline,
        lifeTime: lifeTime.value,
        maxCollateral: +maxCollateral,
        maxLeverage: +maxLeverage,
        minCollateral: +minCollateral,
        minLeverage: +minLeverage,
      },
    });

    setLeaderAddress(null);
    setFollowerAddress(null);
    setLeaderCollateralBaseline("");

    onClose();
  };

  const updatedLeaders = useMemo(() => {
    const countsMap = new Map<string, number>();

    allBots.forEach((bot) => {
      if (bot.status === BotStatus.Live) {
        countsMap.set(
          bot.leaderAddress,
          (countsMap.get(bot.leaderAddress) || 0) + 1,
        );
      }
    });
    return allLeaders.map((item) => ({
      ...item,
      count: countsMap.get(item.address) || 0,
    }));
  }, [allBots, allLeaders]);

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

    if (
      !originalHistories ||
      Number.isNaN(baseline) ||
      !strategy ||
      strategyHelper.trim() !== "" ||
      (strategy === "ratioCopy" && ratioHelper.trim() !== "") ||
      maxCollateralHelper.trim() !== "" ||
      minCollateralHelper.trim() !== "" ||
      maxLeverageHelper.trim() !== "" ||
      minLeverageHelper.trim() !== ""
    ) {
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
      {
        strategyKey: strategy,
        ratio: +ratio,
        collateralBaseline: +collateralBaseline,
        maxCollateral: +maxCollateral,
        minCollateral: +minCollateral,
        maxLeverage: +maxLeverage * 1000,
        minLeverage: +minLeverage * 1000,
      },
    );

    const availablePairNames = followerAvailableTradePairs.map((item) =>
      `${item.from}/${item.to}`.toLowerCase(),
    );

    const data = getHistoriesChartData(
      transformedHistories.filter((history) =>
        availablePairNames.includes(history.pair.toLowerCase()),
      ),
    );

    console.log(
      transformedHistories.filter((history) =>
        availablePairNames.includes(history.pair.toLowerCase()),
      ),
    );

    return data;
  }, [
    collateralBaseline,
    followerAvailableTradePairs,
    originalHistories,
    strategy,
    strategyHelper,
    ratioHelper,
    maxCollateralHelper,
    minCollateralHelper,
    collateralBaselineHelper,
    maxLeverageHelper,
    minLeverageHelper,
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
                amount={leaderCollateralBaseline}
                onChange={setLeaderCollateralBaseline}
                label="Leader Collateral Baseline"
              />

              <Select
                variant="underlined"
                label="Strategy"
                selectedKeys={strategy ? [strategy] : undefined}
                onChange={handleChangeStrategy}
                selectionMode="single"
                className="flex-1"
                errorMessage={strategyHelper}
                isInvalid={strategyHelper.trim() !== ""}
              >
                {allStrategyMetadata.map((metadata) => (
                  <SelectItem key={metadata.key}>{metadata.title}</SelectItem>
                ))}
              </Select>

              <NumericInput
                amount={ratio}
                onChange={setRatio}
                isDisabled={strategy !== "ratioCopy"}
                label="Ratio"
                errorMessage={strategy === "ratioCopy" && ratioHelper}
                isInvalid={
                  strategy === "ratioCopy" && ratioHelper.trim() !== ""
                }
              />

              <Select
                variant="underlined"
                label="Lifetime"
                selectedKeys={lifeTimeScale ? [lifeTimeScale] : undefined}
                onChange={handleChangeLifetime}
                selectionMode="single"
                className="flex-1"
                isDisabled={
                  strategy === "ratioCopy" && ratioHelper.trim() !== ""
                }
              >
                {lifeTimeItems.map((item) => (
                  <SelectItem key={item.id}>{item.label}</SelectItem>
                ))}
              </Select>

              <NumericInput
                amount={maxCollateral}
                onChange={setMaxCollateral}
                label="Max Collateral"
                errorMessage={maxCollateralHelper}
                isInvalid={maxCollateralHelper.trim() !== ""}
              />

              <NumericInput
                amount={minCollateral}
                onChange={setMinCollateral}
                label="Min Collateral"
                isDisabled={maxCollateralHelper.trim() !== ""}
                errorMessage={minCollateralHelper}
                isInvalid={minCollateralHelper.trim() !== ""}
              />

              <NumericInput
                amount={collateralBaseline}
                onChange={setCollateralBaseline}
                label="Collateral Baseline"
                isDisabled={minCollateralHelper.trim() !== ""}
                errorMessage={collateralBaselineHelper}
                isInvalid={collateralBaselineHelper.trim() !== ""}
              />

              <NumericInput
                amount={maxLeverage}
                onChange={setMaxLeverage}
                label="Max Leverage"
                isDisabled={ratioHelper.trim() !== ""}
                errorMessage={maxLeverageHelper}
                isInvalid={maxLeverageHelper.trim() !== ""}
              />

              <NumericInput
                amount={minLeverage}
                onChange={setMinLeverage}
                label="Min Leverage"
                isDisabled={maxLeverageHelper.trim() !== ""}
                errorMessage={minLeverageHelper}
                isInvalid={minLeverageHelper.trim() !== ""}
              />
            </div>

            <Button
              onClick={handleConfirm}
              color="primary"
              isDisabled={isDisabled || isDisabledStrategy}
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
