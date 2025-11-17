"use client";

import { useState, useRef, ChangeEventHandler } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Switch,
  Input,
  Select,
  SelectItem,
  Checkbox,
} from "@heroui/react";
import { Address, isAddress } from "viem";

import { RightDrawer } from "@/components/modals/RightDrawer";

import { useGetAllContracts } from "@/app-hooks/useContract";
import { useBatchCreateBots } from "@/app-hooks/useAutomation";

import { shrinkAddress } from "@/utils";
import { NumericInput } from "@/components/inputs/NumericInput";

import { useGetPerpEventLogs } from "@/app/_hooks/useHistory";
import { ContractStatus, Platform } from "@/graphql/gql/graphql";
import {
  PerpEventLogPnlChart,
  PerpEventLogPnlChartHandle,
} from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";

export enum BotMode {
  General = "general",
  BotCap = "botCap",
}

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

  const [showLatestStats, setShowLatestStats] = useState(false);
  const chartRef = useRef<PerpEventLogPnlChartHandle>(null);

  const [botMode, setBotMode] = useState(BotMode.General);
  const [platform, setPlatform] = useState<Platform>(Platform.Gns);

  const [leaderAddress, setLeaderAddress] = useState<string>("");
  const [followerAddress, setFollowerAddress] = useState<string>("");

  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );
  const [leaderContractId, setLeaderContractId] = useState<string | null>(null);

  const [maxCollateral, setMaxCollateral] = useState("");
  const [minCollateral, setMinCollateral] = useState("");
  const [ratio, setRatio] = useState("");
  const [maxLeverage, setMaxLeverage] = useState("200");
  const [minLeverage, setMinLeverage] = useState("1.1");
  const [tpPercentage, setTpPercentage] = useState("10");
  const [slPercentage, setSlPercentage] = useState("10");
  const [maxOpenMissions, setMaxOpenMissions] = useState("1");
  const [isSignalMode, setIsSignalMode] = useState(false);

  const { eventLogs: originalEventLogs } = useGetPerpEventLogs(
    isAddress(leaderAddress) ? [leaderAddress] : [],
    platform,
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

  const isDisabledByBotCapture =
    botMode === BotMode.BotCap ? !isAddress(followerAddress) : false;

  const isDisabled =
    !isAddress(leaderAddress) ||
    !followerContractId ||
    isDisabledStrategy ||
    isDisabledByBotCapture ||
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
      .filter((contract) => contract.platform === platform)
      .filter((contract) =>
        leaderContractId !== null ? contract.id === +leaderContractId : true,
      )
      .filter((contract) => !contract.isTestnet);

    batchCreateBots({
      variables: {
        input: availableContracts.map((contract) => ({
          leaderAddress,
          planId,
          leaderContractId: contract.id,
          followerContractId: +followerContractId,
          followerAddress: isAddress(followerAddress)
            ? followerAddress.toLowerCase()
            : undefined,
          leaderCollateralBaseline: 0,
          strategy: {
            strategyKey: "ratioCopy",
            ratio: +ratio,
            lifeTime: 365 * 24 * 60,
            maxCollateral: +maxCollateral,
            minCollateral: +minCollateral,
            collateralBaseline: 0,
            maxLeverage: Math.floor(+maxLeverage * 1000),
            minLeverage: Math.floor(+minLeverage * 1000),
            params: JSON.stringify({
              tpPercentage: +tpPercentage,
              slPercentage: +slPercentage,
              selectedPairs: chartRef.current?.getSelectedPairs() || [],
              maxOpenMissions: Math.floor(+maxOpenMissions),
              mode: isSignalMode ? "signal" : undefined,
            }),
          },
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
      classNames={{ base: "max-w-[80%]" }}
    >
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Create New Automation
        </h1>

        <div className="flex w-full gap-8">
          <div className="flex w-[200px] flex-shrink-0 flex-col gap-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Checkbox
                isSelected={botMode === BotMode.General}
                onValueChange={(value) =>
                  setBotMode(value ? BotMode.General : BotMode.BotCap)
                }
              >
                General Bot Mode
              </Checkbox>

              <Checkbox
                isSelected={isSignalMode}
                onValueChange={(value) => setIsSignalMode(value)}
              >
                Signal Only Bot
              </Checkbox>

              <Select
                variant="underlined"
                label="Platform"
                selectedKeys={platform ? [platform] : undefined}
                onChange={handleChangePlatform}
                selectionMode="single"
                className="w-[200px] font-mono"
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

              {botMode === BotMode.BotCap ? (
                <Autocomplete
                  label="Leader Contract"
                  variant="underlined"
                  defaultItems={allContracts
                    .filter(
                      (contract) => contract.status === ContractStatus.Live,
                    )
                    .filter((contract) => contract.platform === platform)}
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
                        <div className="flex items-center gap-2">
                          <span className="text-small">
                            Chain: {item.chainId}
                          </span>
                          <span className="text-small">
                            {item.isTestnet ? "(Testnet)" : ""}
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
              ) : null}

              {botMode === BotMode.BotCap ? (
                <Input
                  placeholder="Enter Follower Address"
                  value={followerAddress || ""}
                  onChange={(e) => setFollowerAddress(e.target.value)}
                />
              ) : null}

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
                        <span className="text-small">
                          {item.isTestnet ? "(Testnet)" : ""}
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

          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
              <Switch
                isSelected={showLatestStats}
                onValueChange={setShowLatestStats}
                size="sm"
              >
                {showLatestStats ? "Show All Activities" : "Show Latest Stats"}
              </Switch>
            </div>

            <PerpEventLogPnlChart
              ref={chartRef}
              address={leaderAddress as Address}
              platform={platform}
              perpTradingEventLogs={originalEventLogs[0] || []}
              hideTags={false}
              showLatestStats={showLatestStats}
              cols={1}
            />
          </div>
        </div>
      </div>
    </RightDrawer>
  );
}
