"use client";

import { useState, useRef, ChangeEventHandler } from "react";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import { Address, isAddress } from "viem";

import { RightDrawer } from "@/components/modals/RightDrawer";

import { NumericInput } from "@/components/inputs/NumericInput";

import { Platform, SimulationPlanDetails } from "@/graphql/gql/graphql";
import {
  PerpEventLogPnlChart,
  PerpEventLogPnlChartHandle,
} from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";
import { BotMode } from "@/graphql/gql/graphql";
import { useBatchCreateSimulationBots } from "@/app/_hooks/useSimulations";
import dayjs from "dayjs";

export type CreateSimulationBotModalProps = {
  simulationPlan: SimulationPlanDetails;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateSimulationBotModal({
  simulationPlan,
  isOpen,
  onClose,
  onOpenChange,
}: CreateSimulationBotModalProps) {
  const { batchCreateSimulationBots, loading: createBotsLoading } =
    useBatchCreateSimulationBots();

  const chartRef = useRef<PerpEventLogPnlChartHandle | null>(null);

  const [platform, setPlatform] = useState<Platform>(Platform.Gns);
  const [direction, setDirection] = useState<BotMode>(BotMode.Default);

  const [leaderAddress, setLeaderAddress] = useState<string>("");

  const [ratio, setRatio] = useState("0.1");
  const [minCollateral, setMinCollateral] = useState("0");
  const [maxCollateral, setMaxCollateral] = useState("1000000000");
  const [minLeverage, setMinLeverage] = useState("0");
  const [maxLeverage, setMaxLeverage] = useState("40");

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);
    }
  };

  const handleChangeDirection: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setDirection(value as BotMode);
    }
  };

  let ratioHelper = "";
  let minCollateralHelper = "";
  let maxCollateralHelper = "";
  let minLeverageHelper = "";
  let maxLeverageHelper = "";

  if (Number.isNaN(+ratio)) {
    ratioHelper = "Invalid ratio";
  }

  if (Number.isNaN(+minCollateral)) {
    minCollateralHelper = "Invalid min collateral";
  }

  if (Number.isNaN(+maxCollateral)) {
    maxCollateralHelper = "Invalid max collateral";
  }

  if (
    minCollateralHelper === "" &&
    maxCollateralHelper === "" &&
    +minCollateral > +maxCollateral
  ) {
    minCollateralHelper = "Min collateral must be <= max collateral";
  }

  if (Number.isNaN(+minLeverage)) {
    minLeverageHelper = "Invalid min leverage";
  }

  if (Number.isNaN(+maxLeverage)) {
    maxLeverageHelper = "Invalid max leverage";
  }

  if (
    minLeverageHelper === "" &&
    maxLeverageHelper === "" &&
    +minLeverage > +maxLeverage
  ) {
    minLeverageHelper = "Min leverage must be <= max leverage";
  }

  const isDisabled =
    !isAddress(leaderAddress) ||
    createBotsLoading ||
    ratioHelper !== "" ||
    minCollateralHelper !== "" ||
    maxCollateralHelper !== "" ||
    minLeverageHelper !== "" ||
    maxLeverageHelper !== "";

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    if (
      ratio.trim() === "" ||
      minCollateral.trim() === "" ||
      maxCollateral.trim() === "" ||
      minLeverage.trim() === "" ||
      maxLeverage.trim() === ""
    ) {
      return;
    }

    batchCreateSimulationBots({
      variables: {
        inputs: [
          {
            leaderAddress,
            simulationPlanId: simulationPlan.id,
            leaderPlatform: platform,
            ratio: +ratio,
            minCollateral: +minCollateral,
            maxCollateral: +maxCollateral,
            minLeverage: +minLeverage,
            maxLeverage: +maxLeverage,
            mode: direction,
          },
        ],
      },
    });

    setLeaderAddress("");

    onClose();
  };

  return (
    <RightDrawer
      isOpen={isOpen}
      isDismissable={false}
      onOpenChange={onOpenChange}
      classNames={{ base: "w-[90vw] max-w-[90vw]" }}
    >
      <div className="flex h-full min-h-0 w-full flex-col gap-4">
        <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
          Create New Simulation Bot
        </h1>

        <div className="flex min-h-0 w-full flex-1 gap-4 overflow-hidden">
          <div className="flex w-50 flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <Select
                variant="underlined"
                label="Platform"
                selectedKeys={platform ? [platform] : undefined}
                onChange={handleChangePlatform}
                selectionMode="single"
                className="w-50 font-mono"
              >
                {Object.values(Platform).map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>

              <Input
                placeholder="Enter Leader Address"
                value={leaderAddress || ""}
                onChange={(e) => setLeaderAddress(e.target.value)}
              />

              <Select
                variant="underlined"
                label="Direction"
                selectedKeys={direction ? [direction] : undefined}
                onChange={handleChangeDirection}
                selectionMode="single"
                className="w-50 font-mono"
              >
                {Object.values(BotMode).map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>

              <NumericInput
                amount={ratio}
                onChange={setRatio}
                label="Ratio"
                errorMessage={ratioHelper}
                isInvalid={ratioHelper.trim() !== ""}
              />

              <NumericInput
                amount={minCollateral}
                onChange={setMinCollateral}
                label="Min Collateral"
                errorMessage={minCollateralHelper}
                isInvalid={minCollateralHelper.trim() !== ""}
              />

              <NumericInput
                amount={maxCollateral}
                onChange={setMaxCollateral}
                label="Max Collateral"
                errorMessage={maxCollateralHelper}
                isInvalid={maxCollateralHelper.trim() !== ""}
              />

              <NumericInput
                amount={minLeverage}
                onChange={setMinLeverage}
                label="Min Leverage"
                errorMessage={minLeverageHelper}
                isInvalid={minLeverageHelper.trim() !== ""}
              />

              <NumericInput
                amount={maxLeverage}
                onChange={setMaxLeverage}
                label="Max Leverage"
                errorMessage={maxLeverageHelper}
                isInvalid={maxLeverageHelper.trim() !== ""}
              />
            </div>

            <Button
              onPress={handleConfirm}
              color="primary"
              isDisabled={isDisabled}
              isLoading={createBotsLoading}
            >
              Save
            </Button>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-6 overflow-hidden">
            <PerpEventLogPnlChart
              ref={chartRef}
              address={leaderAddress as Address}
              platform={platform}
              cols={1}
              mode="expert"
              startedAt={null}
              stoppedAt={null}
              endedAt={dayjs(simulationPlan.cursor).subtract(1, "day").toDate()}
            />
          </div>
        </div>
      </div>
    </RightDrawer>
  );
}
