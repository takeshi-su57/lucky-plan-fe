"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DateRangePicker,
} from "@nextui-org/react";
import { Address } from "viem";
import type { RangeValue } from "@react-types/shared";
import type { DateValue } from "@react-types/datepicker";
import { now } from "@internationalized/date";
import { FaTrash } from "react-icons/fa";

import { getServerTimezone } from "@/utils";

import { useGetAllContracts } from "@/app-hooks/useContract";
import { useGetPersonalTradeHistories } from "@/app-hooks/useGetPersonalTradeHistories";

import { shrinkAddress } from "@/utils";
import { PersonalTradeHistory, VirtualBotParams } from "@/types";

import { NumericInput } from "@/components/inputs/NumericInput";
import { FutureChart } from "../BacktestWidget/FutureChart";
import { transformHistories } from "@/utils/historiesChart";

export type FollowerStrategyFormProps = {
  params: VirtualBotParams;
  onSave: (value: VirtualBotParams) => void;
  onRemove: (virtualId: string) => void;
  onChangeLeaderHistories: (
    virtualId: string,
    histories: PersonalTradeHistory[],
  ) => void;
};

export function FollowerStrategyForm({
  params,
  onSave,
  onRemove,
  onChangeLeaderHistories,
}: FollowerStrategyFormProps) {
  const allContracts = useGetAllContracts();

  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );
  const [leaderCollateralBaseline, setLeaderCollateralBaseline] =
    useState<string>("");

  const [maxCollateral, setMaxCollateral] = useState("200");
  const [minCollateral, setMinCollateral] = useState("5");
  const [collateralBaseline, setCollateralBaseline] = useState("100");
  const [maxLeverage, setMaxLeverage] = useState("200");
  const [minLeverage, setMinLeverage] = useState("1.1");

  const [range, setRange] = useState<RangeValue<DateValue> | null>({
    start: now(getServerTimezone()).subtract({ months: 3 }),
    end: now(getServerTimezone()),
  });

  const { data: originalHistories } = useGetPersonalTradeHistories(
    params.leaderContract.backendUrl || null,
    params.leaderAddress || null,
  );

  useEffect(() => {
    if (originalHistories) {
      onChangeLeaderHistories(params.virtualId, originalHistories);
    }
  }, [onChangeLeaderHistories, originalHistories, params.virtualId]);

  useEffect(() => {
    setFollowerContractId(
      params.followerContract?.contractId?.toString() || null,
    );
    setLeaderCollateralBaseline(params.leaderCollateralBaseline.toString());

    setCollateralBaseline(
      params.strategy?.collateralBaseline.toString() || "100",
    );
    setMaxCollateral(params.strategy?.maxCollateral.toString() || "200");
    setMinCollateral(params.strategy?.minCollateral.toString() || "5");
    setMaxLeverage(params.strategy?.maxLeverage.toString() || "200");
    setMinLeverage(params.strategy?.minLeverage.toString() || "1.1");
  }, [params]);

  let maxCollateralHelper = "";
  let minCollateralHelper = "";
  let collateralBaselineHelper = "";
  let maxLeverageHelper = "";
  let minLeverageHelper = "";

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

  const isDisabled = !followerContractId;

  const isDisabledStrategy =
    maxCollateralHelper.trim() !== "" ||
    minCollateralHelper.trim() !== "" ||
    maxLeverageHelper.trim() !== "" ||
    minLeverageHelper.trim() !== "";

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    if (
      maxCollateral.trim() === "" ||
      minCollateral.trim() === "" ||
      collateralBaseline.trim() === "" ||
      maxLeverage.trim() === "" ||
      minLeverage.trim() === ""
    ) {
      return;
    }

    const followerContract = allContracts.find(
      (item) => item.id === +followerContractId,
    );

    if (!followerContract) {
      return;
    }

    onSave({
      virtualId: params.virtualId,
      followerContract: {
        chainId: followerContract.chainId,
        address: followerContract.address,
        backendUrl: followerContract.backendUrl!,
        contractId: followerContract.id,
      },
      leaderAddress: params.leaderAddress,
      leaderContract: params.leaderContract,
      leaderCollateralBaseline: Math.floor(+leaderCollateralBaseline),
      strategy: {
        strategyKey: "scaleCopy",
        ratio: 100,
        collateralBaseline: +collateralBaseline,
        lifeTime: 365 * 24 * 60, // 1 year lifetime
        maxCollateral: +maxCollateral,
        maxLeverage: +maxLeverage,
        minCollateral: +minCollateral,
        minLeverage: +minLeverage,
      },
    });

    setLeaderCollateralBaseline("");
  };

  const followerHistories = useMemo(() => {
    const baseline = Math.floor(+collateralBaseline);
    const leaderBaseline = Math.floor(+leaderCollateralBaseline);

    if (
      !originalHistories ||
      Number.isNaN(baseline) ||
      Number.isNaN(leaderBaseline)
    ) {
      return [];
    }

    return transformHistories(originalHistories, leaderBaseline, {
      strategyKey: "scaleCopy",
      ratio: 100,
      collateralBaseline: baseline,
    });
  }, [collateralBaseline, leaderCollateralBaseline, originalHistories]);

  let rangeHelper = "";

  if (range === null) {
    rangeHelper = "Please select a valid date range";
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <Button
          size="sm"
          variant="ghost"
          color="danger"
          onClick={() => onRemove(params.virtualId)}
        >
          <FaTrash /> Cancel Selection
        </Button>
      </div>

      <div className="flex w-full gap-8">
        <div className="flex w-[200px] flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <NumericInput
              amount={leaderCollateralBaseline}
              onChange={setLeaderCollateralBaseline}
              label="Leader Collateral Baseline"
            />

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
            Set Strategy
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <DateRangePicker
            label="Back Test Duration"
            visibleMonths={2}
            value={range}
            onChange={setRange}
            maxValue={now(getServerTimezone())}
            errorMessage={rangeHelper}
            className="w-fit"
          />

          {range && originalHistories && (
            <FutureChart
              startDate={
                range?.start?.toDate(getServerTimezone()) || new Date()
              }
              endDate={range?.end?.toDate(getServerTimezone()) || new Date()}
              leaderContractId={params.leaderContract.contractId}
              followerContractId={
                followerContractId
                  ? +followerContractId
                  : +params.leaderContract.contractId
              }
              address={params.leaderAddress}
              followerHistories={followerHistories}
              leaderHistories={originalHistories || []}
              hideTags={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
