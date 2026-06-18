"use client";

import { useMemo, useState } from "react";
import { Button, ButtonGroup, useDisclosure } from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useDecreasePositionSize } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

import { useCollateralSymbols } from "@/app/_hooks/useCollateralSymbols";
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { getPriceStr } from "@/utils/price";

type AmountMode = "collateral" | "usd";

export type DecreasePositionButtonProps = {
  address: string;
  contractId: number;
  index: number;
  pairIndex: number;
  precision: number;
  chainId: number | null;
  diamondAddress: string;
  collateralIndex: number;
};

export function DecreasePositionButton({
  address,
  contractId,
  index,
  pairIndex,
  precision,
  chainId,
  diamondAddress,
  collateralIndex,
}: DecreasePositionButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { decreasePositionSize, loading } = useDecreasePositionSize();
  const collateralSymbols = useCollateralSymbols(chainId);
  const collateralUsdPrices = useCollateralUsdPrices(chainId, diamondAddress);

  const [leverageDelta, setLeverageDelta] = useState("0");
  const [collateralDelta, setCollateralDelta] = useState("0");
  const [amountMode, setAmountMode] = useState<AmountMode>("collateral");

  const collateralSymbol = collateralSymbols[collateralIndex] || "";
  const collateralUsdPrice = collateralUsdPrices[collateralIndex] || 0;

  const rawCollateralDelta = useMemo(() => {
    const val = Number(collateralDelta);
    if (Number.isNaN(val)) return 0;
    if (amountMode === "usd") {
      return collateralUsdPrice > 0 ? val / collateralUsdPrice : 0;
    }
    return val;
  }, [collateralDelta, amountMode, collateralUsdPrice]);

  const handleUpdate = () => {
    decreasePositionSize({
      variables: {
        input: {
          address,
          contractId,
          index,
          pairIndex,
          leverageDelta: Number(leverageDelta) * 1000,
          collateralDelta: Math.floor(
            rawCollateralDelta * precision,
          ).toString(),
        },
      },
      onCompleted: () => {
        setLeverageDelta("0");
        setCollateralDelta("0");
        onClose();
      },
    });
  };

  const isDisabledUpdate =
    leverageDelta.trim() === "" || collateralDelta.trim() === "";

  return (
    <>
      <Button color="secondary" size="sm" onPress={onOpen} isLoading={loading}>
        Decrease Position
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Decrease Position
          </h1>

          <div className="flex flex-col gap-4">
            <NumericInput
              amount={leverageDelta}
              onChange={setLeverageDelta}
              label="Leverage Delta"
            />

            {/* Collateral Delta */}
            <div className="flex flex-col gap-1">
              <ButtonGroup size="sm" variant="flat">
                <Button
                  color={amountMode === "collateral" ? "primary" : "default"}
                  onPress={() => {
                    setAmountMode("collateral");
                    setCollateralDelta("0");
                  }}
                >
                  {collateralSymbol || "Collateral"}
                </Button>
                <Button
                  color={amountMode === "usd" ? "primary" : "default"}
                  onPress={() => {
                    setAmountMode("usd");
                    setCollateralDelta("0");
                  }}
                >
                  USD
                </Button>
              </ButtonGroup>

              <NumericInput
                amount={collateralDelta}
                onChange={setCollateralDelta}
                label={
                  amountMode === "usd"
                    ? "Collateral Delta (USD)"
                    : `Collateral Delta (${collateralSymbol})`
                }
              />

              {amountMode === "usd" && collateralUsdPrice > 0 && (
                <span className="text-xs text-neutral-500">
                  = {rawCollateralDelta.toFixed(precision >= 1e18 ? 6 : 2)}{" "}
                  {collateralSymbol}
                </span>
              )}

              {amountMode === "collateral" &&
                collateralUsdPrice > 0 &&
                Number(collateralDelta) > 0 && (
                  <span className="text-xs text-neutral-500">
                    = $
                    {getPriceStr(Number(collateralDelta) * collateralUsdPrice)}
                  </span>
                )}
            </div>

            <Button
              onPress={handleUpdate}
              isDisabled={isDisabledUpdate}
              isLoading={loading}
              className="w-[180px]"
            >
              Decrease Position
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
