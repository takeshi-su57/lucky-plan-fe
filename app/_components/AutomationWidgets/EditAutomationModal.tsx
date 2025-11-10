"use client";

import { useEffect, useState } from "react";
import { Button, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import { StandardModal } from "@/components/modals/StandardModal";

import { NumericInput } from "@/components/inputs/NumericInput";

import { Strategy } from "@/graphql/gql/graphql";
import { useUpdateStrategy } from "@/app/_hooks/useStrategy";
import { getPairs } from "@/web3/gns/v10/configs";
import {
  getPairKey,
  parsePairKey,
} from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";

export function getAdditionalParams(strParams: string): {
  maxOpenMissions: number;
  tpPercentage: number;
  slPercentage: number;
  selectedPairs: { pair: string; isLong: boolean }[];
} {
  try {
    const params = JSON.parse(strParams);

    return {
      maxOpenMissions: params.maxOpenMissions || 0,
      tpPercentage: params.tpPercentage || 0,
      slPercentage: params.slPercentage || 0,
      selectedPairs: (params.selectedPairs || [])
        .map((item: { pair: string; isLong: boolean } | string) =>
          typeof item === "string"
            ? [
                {
                  pair: item.toLowerCase(),
                  isLong: true,
                },
                {
                  pair: item.toLowerCase(),
                  isLong: false,
                },
              ]
            : [
                {
                  pair: item.pair.toLowerCase(),
                  isLong: item.isLong,
                },
              ],
        )
        .flat(),
    };
  } catch {
    return {
      maxOpenMissions: 0,
      tpPercentage: 0,
      slPercentage: 0,
      selectedPairs: [],
    };
  }
}

export type EditStrategyModalProps = {
  strategy: Strategy;
  chainId: number;
};

export function EditStrategyModal({
  strategy,
  chainId,
}: EditStrategyModalProps) {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  const { updateStrategy, loading } = useUpdateStrategy();

  const [maxCollateral, setMaxCollateral] = useState(
    strategy.maxCollateral.toString(),
  );
  const [minCollateral, setMinCollateral] = useState(
    strategy.minCollateral.toString(),
  );
  const [ratio, setRatio] = useState(strategy.ratio.toString());
  const [maxLeverage, setMaxLeverage] = useState(
    (strategy.maxLeverage / 1e3).toString(),
  );
  const [minLeverage, setMinLeverage] = useState(
    (strategy.minLeverage / 1e3).toString(),
  );
  const [tpPercentage, setTpPercentage] = useState("10");
  const [slPercentage, setSlPercentage] = useState("10");
  const [maxOpenMissions, setMaxOpenMissions] = useState("1");

  const [selectedPair, setSelectedPair] = useState<Selection>(
    new Set<string>([]),
  );

  useEffect(() => {
    const additionalParams = getAdditionalParams(strategy.params);
    setTpPercentage(additionalParams.tpPercentage.toString());
    setSlPercentage(additionalParams.slPercentage.toString());
    setMaxOpenMissions(additionalParams.maxOpenMissions.toString());
    setSelectedPair(
      new Set<string>(
        additionalParams.selectedPairs.map((item) =>
          getPairKey(item.pair, item.isLong),
        ),
      ),
    );
  }, [strategy.params]);

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
    minLeverageHelper.trim() !== "" ||
    ratioHelper.trim() !== "";

  const isDisabled = isDisabledStrategy || loading;

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

    updateStrategy({
      variables: {
        id: strategy.id,
        input: {
          ratio: +ratio,
          maxCollateral: +maxCollateral,
          minCollateral: +minCollateral,
          maxLeverage: Math.floor(+maxLeverage * 1000),
          minLeverage: Math.floor(+minLeverage * 1000),
          params: JSON.stringify({
            maxOpenMissions: +maxOpenMissions,
            tpPercentage: +tpPercentage,
            slPercentage: +slPercentage,
            selectedPairs: Array.from(selectedPair).map((item) =>
              parsePairKey(item as string),
            ),
          }),
        },
      },
    });

    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="default">
        Edit Strategy
      </Button>
      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{ base: "max-w-[350px]" }}
      >
        <div className="flex w-full flex-col gap-8">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Edit Strategy
          </h1>

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

          <Select
            variant="underlined"
            label="Pairs"
            placeholder="Select pairs"
            // selectedKeys={values}
            // onSelectionChange={setValues}
            selectedKeys={selectedPair}
            onSelectionChange={setSelectedPair}
            selectionMode="multiple"
            className="w-[200px] font-mono"
          >
            {getPairs(chainId)
              .map((pair) => [
                getPairKey(`${pair.from}/${pair.to}`, true),
                getPairKey(`${pair.from}/${pair.to}`, false),
              ])
              .flat()
              .map((pairKey) => (
                <SelectItem key={pairKey}>
                  {`${parsePairKey(pairKey).pair} - (${parsePairKey(pairKey).isLong ? "Long" : "Short"})`}
                </SelectItem>
              ))}
          </Select>

          <Button
            onPress={handleConfirm}
            color="primary"
            isDisabled={isDisabled}
            isLoading={loading}
          >
            Save
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
