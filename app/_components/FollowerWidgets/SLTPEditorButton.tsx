"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  useDisclosure,
  ButtonGroup,
  NumberInput,
} from "@heroui/react";
import { twMerge } from "tailwind-merge";

import { StandardModal } from "@/components/modals/StandardModal";

import { useCreateSLTP } from "@/app/_hooks/useFollower";
import { useGetPrices } from "@/app/_hooks/useGetPrices";

import { getPairName } from "@/web3/gns/v10/configs";
import { getPercentageStr, getPriceStr } from "@/utils/price";

export type SLTPEditorButtonProps = {
  address: string;
  contractId: number;
  positionKey: string;
  pairIndex: number;
  isLong: boolean;
  leverage: number;
  openPrice: number;
  collateralAmount: number;
};

type InputMode = "price" | "percentage" | "pnl";
type TrailingInputMode = "percentage" | "priceDrop" | "pnlDrop";
type ExceptionInputMode = "price" | "percentage" | "pnl";

// === Price Condition Conversions ===

// Convert trigger price to PnL percentage
function triggerToPnlPercent(
  triggerPrice: number,
  openPrice: number,
  leverage: number,
  isLong: boolean,
): number {
  if (openPrice === 0) return 0;
  const priceDiff = isLong
    ? triggerPrice - openPrice
    : openPrice - triggerPrice;
  return (priceDiff / openPrice) * leverage * 100;
}

// Convert PnL percentage to trigger price
function pnlPercentToTrigger(
  pnlPercent: number,
  openPrice: number,
  leverage: number,
  isLong: boolean,
): number {
  if (leverage === 0) return openPrice;
  const priceFactor = pnlPercent / leverage / 100;
  return isLong ? openPrice * (1 + priceFactor) : openPrice * (1 - priceFactor);
}

// Convert PnL USDC to PnL percentage
function pnlUsdcToPercent(pnlUsdc: number, collateralAmount: number): number {
  if (collateralAmount === 0) return 0;
  return (pnlUsdc / collateralAmount) * 100;
}

// Convert PnL percentage to PnL USDC
function pnlPercentToUsdc(
  pnlPercent: number,
  collateralAmount: number,
): number {
  return (collateralAmount * pnlPercent) / 100;
}

// === Trailing Stop Conversions ===
// Trailing stop formula: (maxPrice - currentPrice) / (maxPrice - initialPrice) * 100 > percentage
// This means: what % of gains (from initial to max) are we willing to give back

// Calculate trigger price given a simulated max price and trailing percentage
// triggerPrice = maxPrice - (percentage / 100) * (maxPrice - initialPrice)
function trailingTriggerPrice(
  maxPrice: number,
  initialPrice: number,
  percentage: number,
): number {
  return maxPrice - (percentage / 100) * (maxPrice - initialPrice);
}

// Calculate trailing percentage from price drop
// priceDrop = maxPrice - triggerPrice = (percentage / 100) * (maxPrice - initialPrice)
// percentage = priceDrop / (maxPrice - initialPrice) * 100
function priceDropToTrailingPercent(
  priceDrop: number,
  maxPrice: number,
  initialPrice: number,
): number {
  const gain = maxPrice - initialPrice;
  if (gain === 0) return 0;
  return (priceDrop / gain) * 100;
}

// Calculate price drop from trailing percentage
function trailingPercentToPriceDrop(
  percentage: number,
  maxPrice: number,
  initialPrice: number,
): number {
  return (percentage / 100) * (maxPrice - initialPrice);
}

// Convert exception price to PnL percentage (relative to position)
function exceptionPriceToPnlPercent(
  exceptionPrice: number,
  openPrice: number,
  leverage: number,
): number {
  if (openPrice === 0) return 0;
  return (exceptionPrice / openPrice) * leverage * 100;
}

// Convert PnL percentage to exception price
function pnlPercentToExceptionPrice(
  pnlPercent: number,
  openPrice: number,
  leverage: number,
): number {
  if (leverage === 0) return 0;
  return (pnlPercent / leverage / 100) * openPrice;
}

export function SLTPEditorButton({
  address,
  contractId,
  positionKey,
  pairIndex,
  isLong,
  leverage,
  openPrice,
  collateralAmount,
}: SLTPEditorButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const prices = useGetPrices();
  const currentPrice = prices?.[Number(pairIndex)] || 0;

  const { createSLTP, loading } = useCreateSLTP();

  const [conditionType, setConditionType] = useState<string>("price");
  const [kind, setKind] = useState<string>("sl");
  const [inputMode, setInputMode] = useState<InputMode>("price");

  // Core state: trigger price (all other values derived from this)
  const [trigger, setTrigger] = useState<string>("0");

  // Trailing stop states
  const [trailingInputMode, setTrailingInputMode] =
    useState<TrailingInputMode>("percentage");
  const [exceptionInputMode, setExceptionInputMode] =
    useState<ExceptionInputMode>("price");
  const [percentage, setPercentage] = useState<string>("0");
  const [initialPrice, setInitialPrice] = useState<string>("0");
  const [exceptionPrice, setExceptionPrice] = useState<string>("0");
  const [simulatedMaxPrice, setSimulatedMaxPrice] = useState<string>("0");

  // Calculated values from trigger price
  const triggerNum = Number(trigger) || 0;
  const { pnlPercent, pnlUsdc } = useMemo(() => {
    const percent = triggerToPnlPercent(
      triggerNum,
      openPrice,
      leverage,
      isLong,
    );
    const usdc = pnlPercentToUsdc(percent, collateralAmount);
    return { pnlPercent: percent, pnlUsdc: usdc };
  }, [triggerNum, openPrice, leverage, isLong, collateralAmount]);

  // Trailing stop calculated values
  const initialPriceNum = Number(initialPrice) || 0;
  const percentageNum = Number(percentage) || 0;
  const exceptionPriceNum = Number(exceptionPrice) || 0;
  const simulatedMaxNum = Number(simulatedMaxPrice) || 0;

  const trailingCalc = useMemo(() => {
    // Calculate simulated trigger price based on max and percentage
    const simTriggerPrice = trailingTriggerPrice(
      simulatedMaxNum,
      initialPriceNum,
      percentageNum,
    );
    // Calculate price drop from max
    const priceDrop = trailingPercentToPriceDrop(
      percentageNum,
      simulatedMaxNum,
      initialPriceNum,
    );
    // Calculate PnL at trigger (from open price)
    const pnlAtTrigger = triggerToPnlPercent(
      simTriggerPrice,
      openPrice,
      leverage,
      isLong,
    );
    const pnlUsdcAtTrigger = pnlPercentToUsdc(pnlAtTrigger, collateralAmount);
    // Exception price as percentage
    const exceptionPnlPercent = exceptionPriceToPnlPercent(
      exceptionPriceNum,
      openPrice,
      leverage,
    );
    const exceptionPnlUsdc = pnlPercentToUsdc(
      exceptionPnlPercent,
      collateralAmount,
    );

    return {
      simTriggerPrice,
      priceDrop,
      pnlAtTrigger,
      pnlUsdcAtTrigger,
      exceptionPnlPercent,
      exceptionPnlUsdc,
    };
  }, [
    simulatedMaxNum,
    initialPriceNum,
    percentageNum,
    exceptionPriceNum,
    openPrice,
    leverage,
    isLong,
    collateralAmount,
  ]);

  // Handler for price input
  const handlePriceChange = useCallback((value: string) => {
    setTrigger(value);
  }, []);

  // Handler for percentage input
  const handlePercentageChange = useCallback(
    (value: string) => {
      const percent = Number(value) || 0;
      console.log("adsd", value);

      const newTrigger = pnlPercentToTrigger(
        percent,
        openPrice,
        leverage,
        isLong,
      );
      setTrigger(newTrigger.toString());
    },
    [openPrice, leverage, isLong],
  );

  // Handler for PnL USDC input
  const handlePnlUsdcChange = useCallback(
    (value: string) => {
      const pnlUsdcValue = Number(value) || 0;
      const percent = pnlUsdcToPercent(pnlUsdcValue, collateralAmount);
      const newTrigger = pnlPercentToTrigger(
        percent,
        openPrice,
        leverage,
        isLong,
      );
      setTrigger(newTrigger.toString());
    },
    [collateralAmount, openPrice, leverage, isLong],
  );

  const handleGetTriggerPrice = () => {
    setTrigger(currentPrice.toString());
  };

  const handleGetInitialPrice = () => {
    setInitialPrice(currentPrice.toString());
    setSimulatedMaxPrice(currentPrice.toString());
  };

  // Trailing stop percentage handlers
  const handleTrailingPercentageChange = useCallback((value: string) => {
    setPercentage(value);
  }, []);

  const handleTrailingPriceDropChange = useCallback(
    (value: string) => {
      const priceDrop = Number(value) || 0;
      const newPercent = priceDropToTrailingPercent(
        priceDrop,
        simulatedMaxNum,
        initialPriceNum,
      );
      setPercentage(newPercent.toString());
    },
    [simulatedMaxNum, initialPriceNum],
  );

  const handleTrailingPnlDropChange = useCallback(
    (value: string) => {
      const pnlDrop = Number(value) || 0;
      // Convert PnL drop to price drop
      const pnlPercent = pnlUsdcToPercent(pnlDrop, collateralAmount);
      const priceDrop = pnlPercentToExceptionPrice(
        pnlPercent,
        openPrice,
        leverage,
      );
      const newPercent = priceDropToTrailingPercent(
        priceDrop,
        simulatedMaxNum,
        initialPriceNum,
      );
      setPercentage(newPercent.toString());
    },
    [collateralAmount, openPrice, leverage, simulatedMaxNum, initialPriceNum],
  );

  // Exception price handlers
  const handleExceptionPriceChange = useCallback((value: string) => {
    setExceptionPrice(value);
  }, []);

  const handleExceptionPercentChange = useCallback(
    (value: string) => {
      const percent = Number(value) || 0;
      const price = pnlPercentToExceptionPrice(percent, openPrice, leverage);
      setExceptionPrice(price.toString());
    },
    [openPrice, leverage],
  );

  const handleExceptionPnlChange = useCallback(
    (value: string) => {
      const pnlUsdc = Number(value) || 0;
      const percent = pnlUsdcToPercent(pnlUsdc, collateralAmount);
      const price = pnlPercentToExceptionPrice(percent, openPrice, leverage);
      setExceptionPrice(price.toString());
    },
    [collateralAmount, openPrice, leverage],
  );

  const handleAddSLTP = () => {
    if (conditionType === "price") {
      createSLTP({
        variables: {
          input: {
            address: address.toLowerCase(),
            contractId,
            positionKey,
            condition: JSON.stringify({
              type: conditionType,
              isLong,
              pair: getPairName(42161, pairIndex)?.toLowerCase() ?? "",
              params: {
                trigger: Number(trigger),
                kind,
              },
              updatedAt: new Date().toISOString(),
            }),
          },
        },
        onCompleted: () => {
          onClose();
        },
      });
    } else {
      createSLTP({
        variables: {
          input: {
            address: address.toLowerCase(),
            contractId,
            positionKey,
            condition: JSON.stringify({
              type: conditionType,
              isLong,
              pair: getPairName(42161, pairIndex)?.toLowerCase() ?? "",
              params: {
                percentage: Number(percentage),
                exceptionPrice: Number(exceptionPrice),
                highestPrice: Number(initialPrice),
                initialPrice: Number(initialPrice),
              },
              updatedAt: new Date().toISOString(),
            }),
          },
        },
        onCompleted: () => {
          onClose();
        },
      });
    }
  };

  return (
    <>
      <Button
        color="success"
        size="sm"
        className="w-fit"
        onPress={onOpen}
        isLoading={loading}
      >
        Add SLTP
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            SLTP Editor
          </h1>

          <div className="flex flex-col gap-4">
            <RadioGroup
              label="Condition Type"
              value={conditionType}
              onValueChange={setConditionType}
            >
              <Radio value="price">Price</Radio>
              <Radio value="percentage">Percentage</Radio>
            </RadioGroup>

            {conditionType === "price" ? (
              <>
                <RadioGroup label="Kind" value={kind} onValueChange={setKind}>
                  <Radio value="sl">SL</Radio>
                  <Radio value="tp">TP</Radio>
                </RadioGroup>

                {/* Input Mode Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-neutral-400">Input Mode</span>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      color={inputMode === "price" ? "primary" : "default"}
                      onPress={() => setInputMode("price")}
                    >
                      Price
                    </Button>
                    <Button
                      size="sm"
                      color={inputMode === "percentage" ? "primary" : "default"}
                      onPress={() => setInputMode("percentage")}
                    >
                      Percentage
                    </Button>
                    <Button
                      size="sm"
                      color={inputMode === "pnl" ? "primary" : "default"}
                      onPress={() => setInputMode("pnl")}
                    >
                      PnL USDC
                    </Button>
                  </ButtonGroup>
                </div>

                {/* Input based on mode */}
                <div className="flex items-center gap-2">
                  {inputMode === "price" && (
                    <NumberInput
                      value={Number(trigger)}
                      onValueChange={(value) =>
                        handlePriceChange(value.toString())
                      }
                      label="Trigger Price"
                    />
                  )}
                  {inputMode === "percentage" && (
                    <NumberInput
                      value={Number(pnlPercent.toFixed(4))}
                      onValueChange={(value) =>
                        handlePercentageChange(value.toString())
                      }
                      label="PnL Percentage (%)"
                    />
                  )}
                  {inputMode === "pnl" && (
                    <NumberInput
                      value={Number(pnlUsdc.toFixed(2))}
                      onValueChange={(value) =>
                        handlePnlUsdcChange(value.toString())
                      }
                      label="PnL USDC"
                    />
                  )}
                  <Button onPress={handleGetTriggerPrice}>Get</Button>
                </div>

                {/* Display All Values */}
                <div className="bg-content1 flex flex-col gap-2 rounded-lg p-3">
                  <span className="text-xs font-semibold text-neutral-400">
                    Calculated Values
                  </span>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Trigger Price:</span>
                    <span>${getPriceStr(triggerNum)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">PnL Percentage:</span>
                    <span
                      className={twMerge(
                        pnlPercent >= 0 ? "text-green-500" : "text-red-500",
                      )}
                    >
                      {getPercentageStr(pnlPercent)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">PnL USDC:</span>
                    <span
                      className={twMerge(
                        pnlUsdc >= 0 ? "text-green-500" : "text-red-500",
                      )}
                    >
                      {pnlUsdc >= 0 ? "+" : ""}${getPriceStr(pnlUsdc)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Position Info */}
                <div className="bg-content2 flex flex-col gap-1 rounded-lg p-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Open Price:</span>
                    <span>${getPriceStr(openPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Current Price:</span>
                    <span>${getPriceStr(currentPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Collateral:</span>
                    <span>${getPriceStr(collateralAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Leverage:</span>
                    <span>{leverage}x</span>
                  </div>
                </div>

                {/* Initial Price */}
                <div className="flex items-center gap-2">
                  <NumberInput
                    value={Number(initialPrice)}
                    onValueChange={(value) => setInitialPrice(value.toString())}
                    label="Initial Price (tracking starts from)"
                  />
                  <Button onPress={handleGetInitialPrice}>Get</Button>
                </div>

                {/* Simulated Max Price for preview */}
                <NumberInput
                  value={Number(simulatedMaxPrice)}
                  onValueChange={(value) =>
                    setSimulatedMaxPrice(value.toString())
                  }
                  label="Simulated Max Price (for preview)"
                />

                {/* Trailing Percentage Input Mode */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-neutral-400">
                    Trailing Stop Input Mode
                  </span>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      color={
                        trailingInputMode === "percentage"
                          ? "primary"
                          : "default"
                      }
                      onPress={() => setTrailingInputMode("percentage")}
                    >
                      Percentage
                    </Button>
                    <Button
                      size="sm"
                      color={
                        trailingInputMode === "priceDrop"
                          ? "primary"
                          : "default"
                      }
                      onPress={() => setTrailingInputMode("priceDrop")}
                    >
                      Price Drop
                    </Button>
                    <Button
                      size="sm"
                      color={
                        trailingInputMode === "pnlDrop" ? "primary" : "default"
                      }
                      onPress={() => setTrailingInputMode("pnlDrop")}
                    >
                      PnL Drop
                    </Button>
                  </ButtonGroup>
                </div>

                {/* Trailing Input */}
                {trailingInputMode === "percentage" && (
                  <NumberInput
                    value={percentageNum}
                    onValueChange={(value) =>
                      handleTrailingPercentageChange(value.toString())
                    }
                    label="Trailing % (% of gains to give back)"
                  />
                )}
                {trailingInputMode === "priceDrop" && (
                  <NumberInput
                    value={trailingCalc.priceDrop}
                    onValueChange={(value) =>
                      handleTrailingPriceDropChange(value.toString())
                    }
                    label="Price Drop from Max"
                  />
                )}
                {trailingInputMode === "pnlDrop" && (
                  <NumberInput
                    value={Math.abs(trailingCalc.pnlUsdcAtTrigger)}
                    onValueChange={(value) =>
                      handleTrailingPnlDropChange(value.toString())
                    }
                    label="PnL Drop (USDC)"
                  />
                )}

                {/* Exception Price Input Mode */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-neutral-400">
                    Exception Price Input Mode
                  </span>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      color={
                        exceptionInputMode === "price" ? "primary" : "default"
                      }
                      onPress={() => setExceptionInputMode("price")}
                    >
                      Price
                    </Button>
                    <Button
                      size="sm"
                      color={
                        exceptionInputMode === "percentage"
                          ? "primary"
                          : "default"
                      }
                      onPress={() => setExceptionInputMode("percentage")}
                    >
                      Percentage
                    </Button>
                    <Button
                      size="sm"
                      color={
                        exceptionInputMode === "pnl" ? "primary" : "default"
                      }
                      onPress={() => setExceptionInputMode("pnl")}
                    >
                      PnL USDC
                    </Button>
                  </ButtonGroup>
                </div>

                {/* Exception Input */}
                {exceptionInputMode === "price" && (
                  <NumberInput
                    value={exceptionPriceNum}
                    onValueChange={(value) =>
                      handleExceptionPriceChange(value.toString())
                    }
                    label="Exception Price (min drop to trigger)"
                  />
                )}
                {exceptionInputMode === "percentage" && (
                  <NumberInput
                    value={trailingCalc.exceptionPnlPercent}
                    onValueChange={(value) =>
                      handleExceptionPercentChange(value.toString())
                    }
                    label="Exception % (min PnL% drop)"
                  />
                )}
                {exceptionInputMode === "pnl" && (
                  <NumberInput
                    value={trailingCalc.exceptionPnlUsdc}
                    onValueChange={(value) =>
                      handleExceptionPnlChange(value.toString())
                    }
                    label="Exception PnL (min USDC drop)"
                  />
                )}

                {/* Simulation Preview */}
                <div className="bg-content1 flex flex-col gap-2 rounded-lg p-3">
                  <span className="text-xs font-semibold text-neutral-400">
                    Simulation Preview (if max reaches $
                    {getPriceStr(simulatedMaxNum)})
                  </span>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Trailing %:</span>
                    <span>{getPercentageStr(percentageNum)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Trigger Price:</span>
                    <span>${getPriceStr(trailingCalc.simTriggerPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">
                      Price Drop from Max:
                    </span>
                    <span>${getPriceStr(trailingCalc.priceDrop)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">PnL at Trigger:</span>
                    <span
                      className={twMerge(
                        trailingCalc.pnlAtTrigger >= 0
                          ? "text-green-500"
                          : "text-red-500",
                      )}
                    >
                      {getPercentageStr(trailingCalc.pnlAtTrigger)}% ($
                      {getPriceStr(trailingCalc.pnlUsdcAtTrigger)})
                    </span>
                  </div>
                  <div className="mt-2 border-t border-neutral-700 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">Exception Price:</span>
                      <span>${getPriceStr(exceptionPriceNum)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-400">Exception PnL:</span>
                      <span>
                        {getPercentageStr(trailingCalc.exceptionPnlPercent)}% ($
                        {getPriceStr(trailingCalc.exceptionPnlUsdc)})
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Button
              onPress={handleAddSLTP}
              isLoading={loading}
              className="w-45"
            >
              Add SLTP
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
