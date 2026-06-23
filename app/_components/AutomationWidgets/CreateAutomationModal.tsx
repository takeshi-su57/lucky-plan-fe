"use client";

import { useState, useRef, ChangeEventHandler } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Address, isAddress } from "viem";

import { RightDrawer } from "@/components/modals/RightDrawer";

import { useGetAllContracts } from "@/app-hooks/useContract";
import { useBatchCreateBots } from "@/app-hooks/useAutomation";

import { shrinkAddress } from "@/utils";
import { NumericInput } from "@/components/inputs/NumericInput";

import { useGetPerpTradePositions } from "@/app/_hooks/useHistory";
import { ContractStatus, Platform } from "@/graphql/gql/graphql";
import {
  PerpEventLogPnlChart,
  PerpEventLogPnlChartHandle,
} from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";
import { BotMode, StrategyMode } from "@/graphql/gql/graphql";

const modes = [StrategyMode.Default, StrategyMode.Signal];

export type CreateAutomationModalProps = {
  planId: number;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (value: boolean) => void;
};

export function CreateAutomationModal({
  planId,
  isOpen,
  onClose,
  onOpenChange,
}: CreateAutomationModalProps) {
  const { batchCreateBots, loading: createBotsLoading } = useBatchCreateBots();

  const allContracts = useGetAllContracts();

  const chartRef = useRef<PerpEventLogPnlChartHandle | null>(null);

  const [platform, setPlatform] = useState<Platform>(Platform.Gns);

  const [leaderAddress, setLeaderAddress] = useState<string>("");

  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );

  const [maxCollateral, setMaxCollateral] = useState("100");
  const [minCollateral, setMinCollateral] = useState("50");
  const [ratio, setRatio] = useState("0.1");
  const [maxLeverage, setMaxLeverage] = useState("200");
  const [minLeverage, setMinLeverage] = useState("1.1");
  const [tpPercentage, setTpPercentage] = useState("0");
  const [slPercentage, setSlPercentage] = useState("0");
  const [maxOpenMissions, setMaxOpenMissions] = useState("10");
  const [mode, setMode] = useState<StrategyMode>(StrategyMode.Default);
  const [lifeTime, setLifeTime] = useState("0");

  const { data: positionsWithSummary } = useGetPerpTradePositions(
    leaderAddress,
    platform,
    null,
    null,
    null,
  );

  const handleChangePlatform: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setPlatform(value as Platform);
    }
  };

  const handleChangeMode: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setMode(value as StrategyMode);
    }
  };

  let maxCollateralHelper = "";
  let minCollateralHelper = "";
  let ratioHelper = "";
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

  if (Number.isNaN(+ratio)) {
    ratioHelper = "Invalid ratio";
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

  const isDisabledStrategy =
    maxCollateralHelper.trim() !== "" ||
    minCollateralHelper.trim() !== "" ||
    maxLeverageHelper.trim() !== "" ||
    minLeverageHelper.trim() !== "";

  const isDisabled =
    !isAddress(leaderAddress) ||
    !followerContractId ||
    isDisabledStrategy ||
    createBotsLoading;

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    if (
      maxCollateral.trim() === "" ||
      minCollateral.trim() === "" ||
      ratio.trim() === "" ||
      maxLeverage.trim() === "" ||
      minLeverage.trim() === ""
    ) {
      return;
    }

    const availableContracts = allContracts
      .filter((contract) => contract.status === ContractStatus.Live)
      .filter((contract) => contract.platform === platform);

    batchCreateBots({
      variables: {
        input: availableContracts.map((contract) => ({
          leaderAddress,
          planId,
          leaderContractId: contract.id,
          followerContractId: +followerContractId,
          strategy: {
            ratio: +ratio,
            lifeTime: +lifeTime,
            maxCollateral: +maxCollateral,
            minCollateral: +minCollateral,
            maxLeverage: Math.floor(+maxLeverage * 1000),
            minLeverage: Math.floor(+minLeverage * 1000),
            tpPercentage: +tpPercentage,
            slPercentage: +slPercentage,
            selectedPairs: JSON.stringify(
              chartRef.current?.getSelectedPairs() || [],
            ),
            maxOpenMissions: Math.floor(+maxOpenMissions),
            mode,
          },
          mode: BotMode.Default,
        })),
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
          Create New Automation
        </h1>

        <div className="flex min-h-0 w-full flex-1 gap-4 overflow-hidden">
          <div className="flex w-50 flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <Select
                variant="underlined"
                label="Mode"
                placeholder="Select mode"
                selectedKeys={mode ? [mode] : undefined}
                onChange={handleChangeMode}
                selectionMode="single"
                className="w-50 font-mono"
              >
                {modes.map((item) => (
                  <SelectItem key={item}>{item}</SelectItem>
                ))}
              </Select>

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

              <Autocomplete
                label="Follower Contract"
                variant="underlined"
                defaultItems={allContracts
                  .filter((contract) => contract.status === ContractStatus.Live)
                  .filter((contract) => contract.platform === Platform.Gns)}
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
                      <div className="flex items-center gap-2">
                        <span className="text-small">
                          Chain: {item.chainId}
                        </span>
                      </div>
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
                amount={ratio}
                onChange={setRatio}
                label="Ratio"
                errorMessage={ratioHelper}
                isInvalid={ratioHelper.trim() !== ""}
              />

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

              <NumericInput
                amount={tpPercentage}
                onChange={setTpPercentage}
                label="TP Percentage"
              />

              <NumericInput
                amount={slPercentage}
                onChange={setSlPercentage}
                label="SL Percentage"
              />

              <NumericInput
                amount={maxOpenMissions}
                onChange={setMaxOpenMissions}
                label="Max Open Missions"
              />

              <NumericInput
                amount={lifeTime}
                onChange={setLifeTime}
                label="LifeTime"
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
              positionsWithSummary={positionsWithSummary || undefined}
              cols={1}
              mode="expert"
              startedAt={null}
              stoppedAt={null}
              endedAt={null}
            />
          </div>
        </div>
      </div>
    </RightDrawer>
  );
}
