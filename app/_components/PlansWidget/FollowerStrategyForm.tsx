"use client";

import { useEffect, useState, ChangeEventHandler } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { Address } from "viem";
import { FaTrash } from "react-icons/fa";

import { useGetAllContracts } from "@/app-hooks/useContract";

import { shrinkAddress } from "@/utils";
import { PersonalTradeHistory, VirtualBotParams } from "@/types";

import { NumericInput } from "@/components/inputs/NumericInput";
import { FutureChart } from "./FutureChart";
import { useGetAllTradeHistory } from "@/app/_hooks/useHistory";
import { ContractStatus, Platform } from "@/graphql/gql/graphql";

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

  const [platform, setPlatform] = useState<Platform>(Platform.Gns);

  const [followerContractId, setFollowerContractId] = useState<string | null>(
    null,
  );
  const [leaderCollateralBaseline, setLeaderCollateralBaseline] =
    useState<string>("");

  const [maxCollateral, setMaxCollateral] = useState("200");
  const [minCollateral, setMinCollateral] = useState("5");
  const [ratio, setRatio] = useState("1");
  const [maxLeverage, setMaxLeverage] = useState("200");
  const [minLeverage, setMinLeverage] = useState("1.1");

  const { histories: originalHistories } = useGetAllTradeHistory(
    params.leaderAddress,
    "0",
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

    setRatio(params.strategy?.ratio.toString() || "1");
    setMaxCollateral(params.strategy?.maxCollateral.toString() || "200");
    setMinCollateral(params.strategy?.minCollateral.toString() || "5");
    setMaxLeverage(params.strategy?.maxLeverage.toString() || "200");
    setMinLeverage(params.strategy?.minLeverage.toString() || "1.1");
  }, [params]);

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
      ratio.trim() === "" ||
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
      platform,
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
        strategyKey: "ratioCopy",
        ratio: +ratio,
        collateralBaseline: 0,
        lifeTime: 365 * 24 * 60, // 1 year lifetime
        maxCollateral: +maxCollateral,
        maxLeverage: +maxLeverage,
        minCollateral: +minCollateral,
        minLeverage: +minLeverage,
      },
    });

    setLeaderCollateralBaseline("");
  };

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

            <Autocomplete
              label="Follower Contract"
              variant="underlined"
              // hide ape contract as a follower contract
              defaultItems={allContracts.filter(
                (item) =>
                  item.chainId !== 33139 && item.status === ContractStatus.Live,
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
          {originalHistories && (
            <FutureChart
              address={params.leaderAddress}
              leaderHistories={originalHistories || []}
              hideTags={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
