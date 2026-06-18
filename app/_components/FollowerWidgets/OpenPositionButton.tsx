"use client";

import { useMemo, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Chip,
  Select,
  SelectItem,
  Switch,
  useDisclosure,
} from "@heroui/react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useOpenTradeMarket } from "@/app/_hooks/useFollower";

import { NumericInput } from "@/components/inputs/NumericInput";

import {
  getPairs,
  getCollaterals,
  getCollateral,
} from "@/web3/gns/v10/configs";
import { useCollateralSymbols } from "@/app/_hooks/useCollateralSymbols";
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { getPriceStr } from "@/utils/price";
import { CollateralBalance } from "@/graphql/gql/graphql";

type AmountMode = "collateral" | "usd";
type SlTpMode = "price" | "percent";

export type OpenPositionButtonProps = {
  address: string;
  contractId: number;
  chainId: number | null;
  diamondAddress: string;
  collateralBalances: CollateralBalance[];
};

export function OpenPositionButton({
  address,
  contractId,
  chainId,
  diamondAddress,
  collateralBalances,
}: OpenPositionButtonProps) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const { openTradeMarket, loading } = useOpenTradeMarket();
  const collateralSymbols = useCollateralSymbols(chainId);
  const collateralUsdPrices = useCollateralUsdPrices(chainId, diamondAddress);
  const pairPrices = useGetPrices();

  const pairs = chainId ? getPairs(chainId) : [];
  const collaterals = chainId ? getCollaterals(chainId) : [];

  const [pairIndex, setPairIndex] = useState<string | null>(null);
  const [collateralIndex, setCollateralIndex] = useState<string>("");
  const [collateralAmount, setCollateralAmount] = useState("0");
  const [leverage, setLeverage] = useState("0");
  const [long, setLong] = useState(true);
  const [sl, setSl] = useState("0");
  const [tp, setTp] = useState("0");

  const [amountMode, setAmountMode] = useState<AmountMode>("collateral");
  const [slMode, setSlMode] = useState<SlTpMode>("price");
  const [tpMode, setTpMode] = useState<SlTpMode>("price");
  const [slPercent, setSlPercent] = useState("0");
  const [tpPercent, setTpPercent] = useState("0");
  const [maxSlippageP, setMaxSlippageP] = useState("1");

  const selectedCollateral = collaterals.find(
    (c) => c.collateralIndex === +collateralIndex,
  );

  const collateralUsdPrice = selectedCollateral
    ? collateralUsdPrices[selectedCollateral.collateralIndex] || 0
    : 0;

  const selectedBalance = useMemo(() => {
    if (!selectedCollateral) return null;
    const cb = collateralBalances.find(
      (b) => b.collateralIndex === selectedCollateral.collateralIndex,
    );
    if (!cb) return null;

    const collateralConfig = chainId
      ? getCollateral(chainId, selectedCollateral.collateralIndex)
      : null;
    const precision = collateralConfig
      ? Number(collateralConfig.precision)
      : 1e6;
    const amount = Number(cb.balance || 0) / precision;
    return { amount, precision };
  }, [selectedCollateral, collateralBalances, chainId]);

  const currentPairPrice =
    pairIndex !== null ? pairPrices?.[+pairIndex] : undefined;

  // Convert collateral input based on mode
  const rawCollateralAmount = useMemo(() => {
    const val = Number(collateralAmount);
    if (Number.isNaN(val)) return 0;
    if (amountMode === "usd") {
      return collateralUsdPrice > 0 ? val / collateralUsdPrice : 0;
    }
    return val;
  }, [collateralAmount, amountMode, collateralUsdPrice]);

  // Convert SL based on mode
  const rawSl = useMemo(() => {
    if (slMode === "price") return sl;
    if (!currentPairPrice) return "0";
    const pct = Number(slPercent);
    if (Number.isNaN(pct)) return "0";
    const slPrice = long
      ? currentPairPrice * (1 - pct / 100)
      : currentPairPrice * (1 + pct / 100);
    return Math.floor(slPrice * 1e10).toString();
  }, [slMode, sl, slPercent, currentPairPrice, long]);

  // Convert TP based on mode
  const rawTp = useMemo(() => {
    if (tpMode === "price") return tp;
    if (!currentPairPrice) return "0";
    const pct = Number(tpPercent);
    if (Number.isNaN(pct)) return "0";
    const tpPrice = long
      ? currentPairPrice * (1 + pct / 100)
      : currentPairPrice * (1 - pct / 100);
    return Math.floor(tpPrice * 1e10).toString();
  }, [tpMode, tp, tpPercent, currentPairPrice, long]);

  const handleOpen = () => {
    if (!selectedCollateral) return;

    openTradeMarket({
      variables: {
        input: {
          address,
          contractId,
          pairIndex: Number(pairIndex),
          leverage: Math.floor(Number(leverage) * 1e3),
          collateralAmount: Math.floor(
            rawCollateralAmount * Number(selectedCollateral.precision),
          ).toString(),
          collateralIndex: selectedCollateral.collateralIndex,
          long,
          sl: rawSl,
          tp: rawTp,
          maxSlippageP: Math.floor(Number(maxSlippageP) * 1e3),
        },
      },
      onCompleted: () => {
        setPairIndex("0");
        setCollateralAmount("0");
        setLeverage("0");
        setLong(true);
        setSl("0");
        setTp("0");
        setSlPercent("0");
        setTpPercent("0");
        onClose();
      },
    });
  };

  const handleFillMax = () => {
    if (!selectedBalance) return;
    if (amountMode === "usd") {
      setCollateralAmount(
        (selectedBalance.amount * collateralUsdPrice).toFixed(2),
      );
    } else {
      const decimals = selectedBalance.precision >= 1e18 ? 6 : 2;
      setCollateralAmount(selectedBalance.amount.toFixed(decimals));
    }
  };

  const handleFillCurrentPriceSl = () => {
    if (!currentPairPrice) return;
    setSl(Math.floor(currentPairPrice * 1e10).toString());
  };

  const handleFillCurrentPriceTp = () => {
    if (!currentPairPrice) return;
    setTp(Math.floor(currentPairPrice * 1e10).toString());
  };

  const collateralSymbol = selectedCollateral
    ? collateralSymbols[selectedCollateral.collateralIndex] || ""
    : "";

  const isDisabledOpen =
    pairIndex === null ||
    !selectedCollateral ||
    collateralAmount.trim() === "" ||
    leverage.trim() === "" ||
    (slMode === "price" ? sl.trim() === "" : slPercent.trim() === "") ||
    (tpMode === "price" ? tp.trim() === "" : tpPercent.trim() === "");

  return (
    <>
      <Button color="secondary" size="sm" onPress={onOpen} isLoading={loading}>
        Open Position
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col gap-3.5">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Open Position
          </h1>

          <div className="flex flex-col gap-4">
            <Autocomplete
              label="Pair"
              variant="underlined"
              defaultItems={pairs}
              placeholder="Search pair"
              selectedKey={pairIndex}
              onSelectionChange={(key) => setPairIndex(key as string | null)}
            >
              {(item) => (
                <AutocompleteItem key={item.pairIndex} className="font-mono">
                  {`${item.from}/${item.to}`}
                </AutocompleteItem>
              )}
            </Autocomplete>

            {currentPairPrice !== undefined && (
              <Chip variant="flat" size="sm">
                Current Price: {getPriceStr(currentPairPrice)}
              </Chip>
            )}

            <Select
              label="Collateral"
              variant="underlined"
              placeholder="Select collateral"
              selectedKeys={collateralIndex ? [collateralIndex] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                setCollateralIndex(selected ? String(selected) : "");
                setCollateralAmount("0");
              }}
            >
              {collaterals.map((c) => (
                <SelectItem key={c.collateralIndex}>
                  {collateralSymbols[c.collateralIndex] ||
                    `C${c.collateralIndex}`}
                </SelectItem>
              ))}
            </Select>

            {/* Collateral Amount */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <ButtonGroup size="sm" variant="flat">
                  <Button
                    color={amountMode === "collateral" ? "primary" : "default"}
                    onPress={() => {
                      setAmountMode("collateral");
                      setCollateralAmount("0");
                    }}
                  >
                    {collateralSymbol || "Collateral"}
                  </Button>
                  <Button
                    color={amountMode === "usd" ? "primary" : "default"}
                    onPress={() => {
                      setAmountMode("usd");
                      setCollateralAmount("0");
                    }}
                  >
                    USD
                  </Button>
                </ButtonGroup>

                {selectedBalance && (
                  <Button
                    size="sm"
                    variant="light"
                    onPress={handleFillMax}
                    className="text-xs"
                  >
                    Max
                  </Button>
                )}
              </div>

              <NumericInput
                amount={collateralAmount}
                onChange={setCollateralAmount}
                label={
                  amountMode === "usd"
                    ? "Amount (USD)"
                    : `Amount (${collateralSymbol})`
                }
              />

              {selectedBalance && (
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span>
                    Balance:{" "}
                    {selectedBalance.amount.toFixed(
                      selectedBalance.precision >= 1e18 ? 4 : 2,
                    )}{" "}
                    {collateralSymbol}
                  </span>
                  {collateralUsdPrice > 0 && (
                    <span>
                      ($
                      {getPriceStr(selectedBalance.amount * collateralUsdPrice)}
                      )
                    </span>
                  )}
                </div>
              )}

              {amountMode === "usd" && collateralUsdPrice > 0 && (
                <span className="text-xs text-neutral-500">
                  ={" "}
                  {rawCollateralAmount.toFixed(
                    selectedBalance?.precision &&
                      selectedBalance.precision >= 1e18
                      ? 6
                      : 2,
                  )}{" "}
                  {collateralSymbol}
                </span>
              )}

              {amountMode === "collateral" &&
                collateralUsdPrice > 0 &&
                Number(collateralAmount) > 0 && (
                  <span className="text-xs text-neutral-500">
                    = $
                    {getPriceStr(Number(collateralAmount) * collateralUsdPrice)}
                  </span>
                )}
            </div>

            <NumericInput
              amount={leverage}
              onChange={setLeverage}
              label="Leverage"
            />

            <Switch
              isSelected={long}
              color={long ? "success" : "danger"}
              onValueChange={setLong}
            >
              {long ? "Long" : "Short"}
            </Switch>

            <NumericInput
              amount={maxSlippageP}
              onChange={setMaxSlippageP}
              label="Max Slippage %"
            />

            {/* SL Input */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <ButtonGroup size="sm" variant="flat">
                  <Button
                    color={slMode === "price" ? "primary" : "default"}
                    onPress={() => setSlMode("price")}
                  >
                    Price
                  </Button>
                  <Button
                    color={slMode === "percent" ? "primary" : "default"}
                    onPress={() => setSlMode("percent")}
                  >
                    %
                  </Button>
                </ButtonGroup>

                {slMode === "price" && currentPairPrice !== undefined && (
                  <Button
                    size="sm"
                    variant="light"
                    onPress={handleFillCurrentPriceSl}
                    className="text-xs"
                  >
                    Current Price
                  </Button>
                )}
              </div>

              {slMode === "price" ? (
                <NumericInput
                  amount={sl}
                  onChange={setSl}
                  label="SL Price (1e10)"
                />
              ) : (
                <NumericInput
                  amount={slPercent}
                  onChange={setSlPercent}
                  label={`SL % (${long ? "below" : "above"} current price)`}
                />
              )}

              {slMode === "percent" &&
                currentPairPrice !== undefined &&
                Number(slPercent) > 0 && (
                  <span className="text-xs text-neutral-500">
                    ={" "}
                    {getPriceStr(
                      long
                        ? currentPairPrice * (1 - Number(slPercent) / 100)
                        : currentPairPrice * (1 + Number(slPercent) / 100),
                    )}{" "}
                    USD
                  </span>
                )}
            </div>

            {/* TP Input */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <ButtonGroup size="sm" variant="flat">
                  <Button
                    color={tpMode === "price" ? "primary" : "default"}
                    onPress={() => setTpMode("price")}
                  >
                    Price
                  </Button>
                  <Button
                    color={tpMode === "percent" ? "primary" : "default"}
                    onPress={() => setTpMode("percent")}
                  >
                    %
                  </Button>
                </ButtonGroup>

                {tpMode === "price" && currentPairPrice !== undefined && (
                  <Button
                    size="sm"
                    variant="light"
                    onPress={handleFillCurrentPriceTp}
                    className="text-xs"
                  >
                    Current Price
                  </Button>
                )}
              </div>

              {tpMode === "price" ? (
                <NumericInput
                  amount={tp}
                  onChange={setTp}
                  label="TP Price (1e10)"
                />
              ) : (
                <NumericInput
                  amount={tpPercent}
                  onChange={setTpPercent}
                  label={`TP % (${long ? "above" : "below"} current price)`}
                />
              )}

              {tpMode === "percent" &&
                currentPairPrice !== undefined &&
                Number(tpPercent) > 0 && (
                  <span className="text-xs text-neutral-500">
                    ={" "}
                    {getPriceStr(
                      long
                        ? currentPairPrice * (1 + Number(tpPercent) / 100)
                        : currentPairPrice * (1 - Number(tpPercent) / 100),
                    )}{" "}
                    USD
                  </span>
                )}
            </div>

            <Button
              onPress={handleOpen}
              isDisabled={isDisabledOpen}
              isLoading={loading}
              className="w-[180px]"
            >
              Open Position
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
