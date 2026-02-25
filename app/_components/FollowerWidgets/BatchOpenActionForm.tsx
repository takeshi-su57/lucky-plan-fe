"use client";

import { useMemo, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Select,
  SelectItem,
} from "@heroui/react";
import { Address } from "viem";

import { NumericInput } from "@/components/inputs/NumericInput";
import { getPairs, getCollaterals, getCollateral } from "@/web3/gns/v10/configs";
import { useCollateralSymbols } from "@/app/_hooks/useCollateralSymbols";
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { useGetAllFollowerDetails } from "@/app/_hooks/useFollower";
import { getPriceStr } from "@/utils/price";
import { ContractStatus } from "@/graphql/gql/graphql";
import { shrinkAddress } from "@/utils";
import {
  BatchOpenAction,
  AmountMode,
  SlTpMode,
} from "@/app/_hooks/useBatchOpenStore";

type ContractItem = {
  id: number;
  chainId: number;
  address: string;
  description: string;
  isTestnet: boolean;
  status: ContractStatus;
};

export type BatchOpenActionFormProps = {
  contracts: ContractItem[];
  initialValues?: BatchOpenAction;
  onSave: (action: Omit<BatchOpenAction, "id">) => void;
  onCancel: () => void;
};

export function BatchOpenActionForm({
  contracts,
  initialValues,
  onSave,
  onCancel,
}: BatchOpenActionFormProps) {
  // Contract & follower selection
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    initialValues ? String(initialValues.contractId) : null,
  );
  const [followerAddress, setFollowerAddress] = useState<string>(
    initialValues?.followerAddress || "",
  );

  const selectedContract = useMemo(
    () => contracts.find((c) => c.id === +(selectedContractId || 0)) || null,
    [contracts, selectedContractId],
  );

  const chainId = selectedContract?.chainId ?? null;
  const diamondAddress = selectedContract?.address ?? "";

  // Load followers for the selected contract
  const { details: followerDetails } = useGetAllFollowerDetails(
    selectedContractId,
    false,
  );

  const collateralSymbols = useCollateralSymbols(chainId);
  const collateralUsdPrices = useCollateralUsdPrices(chainId, diamondAddress);

  const pairs = chainId ? getPairs(chainId) : [];
  const collaterals = chainId ? getCollaterals(chainId) : [];

  // Find selected follower's collateral balances
  const collateralBalances = useMemo(() => {
    const follower = followerDetails.find((f) => f.address === followerAddress);
    return follower?.collateralBalances || [];
  }, [followerDetails, followerAddress]);

  // Trade params
  const [pairIndex, setPairIndex] = useState<string | null>(
    initialValues ? String(initialValues.pairIndex) : null,
  );
  const [collateralIndex, setCollateralIndex] = useState<string>(
    initialValues ? String(initialValues.collateralIndex) : "",
  );
  const [collateralAmount, setCollateralAmount] = useState(
    initialValues?.collateralAmount || "0",
  );
  const [leverage, setLeverage] = useState(initialValues?.leverage || "0");
  const [sl, setSl] = useState(initialValues?.sl || "0");
  const [tp, setTp] = useState(initialValues?.tp || "0");
  const [amountMode, setAmountMode] = useState<AmountMode>(
    initialValues?.amountMode || "collateral",
  );
  const [slMode, setSlMode] = useState<SlTpMode>(
    initialValues?.slMode || "price",
  );
  const [tpMode, setTpMode] = useState<SlTpMode>(
    initialValues?.tpMode || "price",
  );
  const [slPercent, setSlPercent] = useState(initialValues?.slPercent || "0");
  const [tpPercent, setTpPercent] = useState(initialValues?.tpPercent || "0");
  const [maxSlippageP, setMaxSlippageP] = useState(
    initialValues?.maxSlippageP || "1",
  );

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

  const rawCollateralAmount = useMemo(() => {
    const val = Number(collateralAmount);
    if (Number.isNaN(val)) return 0;
    if (amountMode === "usd") {
      return collateralUsdPrice > 0 ? val / collateralUsdPrice : 0;
    }
    return val;
  }, [collateralAmount, amountMode, collateralUsdPrice]);

  const collateralSymbol = selectedCollateral
    ? collateralSymbols[selectedCollateral.collateralIndex] || ""
    : "";

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

  const isDisabled =
    !selectedContract ||
    !followerAddress ||
    pairIndex === null ||
    !selectedCollateral ||
    collateralAmount.trim() === "" ||
    leverage.trim() === "" ||
    (slMode === "price" ? sl.trim() === "" : slPercent.trim() === "") ||
    (tpMode === "price" ? tp.trim() === "" : tpPercent.trim() === "");

  const handleSave = () => {
    if (isDisabled || !selectedCollateral || !selectedContract) return;
    onSave({
      contractId: selectedContract.id,
      followerAddress,
      pairIndex: Number(pairIndex),
      collateralIndex: selectedCollateral.collateralIndex,
      collateralAmount,
      leverage,
      sl,
      tp,
      slMode,
      tpMode,
      slPercent,
      tpPercent,
      maxSlippageP,
      amountMode,
    });
  };

  const liveContracts = useMemo(
    () => contracts.filter((c) => c.status === ContractStatus.Live),
    [contracts],
  );

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-neutral-700 bg-neutral-800/50 p-4">
      {/* Contract picker */}
      <Autocomplete
        label="Contract"
        variant="underlined"
        defaultItems={liveContracts}
        placeholder="Select contract"
        selectedKey={selectedContractId}
        onSelectionChange={(key) => {
          setSelectedContractId(key as string | null);
          setFollowerAddress("");
          setPairIndex(null);
          setCollateralIndex("");
          setCollateralAmount("0");
        }}
        size="sm"
      >
        {(item) => (
          <AutocompleteItem
            key={item.id}
            className="font-mono"
            textValue={`${item.chainId}-${shrinkAddress(item.address as Address)}`}
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-small">Chain: {item.chainId}</span>
                {item.isTestnet && (
                  <span className="text-small">(Testnet)</span>
                )}
              </div>
              <span className="text-tiny text-default-400">
                {item.description}
              </span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>

      {/* Follower picker */}
      {selectedContract && (
        <Autocomplete
          label="Follower"
          variant="underlined"
          defaultItems={followerDetails}
          placeholder="Select follower"
          selectedKey={followerAddress || null}
          onSelectionChange={(key) =>
            setFollowerAddress(key ? String(key) : "")
          }
          size="sm"
        >
          {(item) => (
            <AutocompleteItem
              key={item.address}
              className="font-mono"
              textValue={shrinkAddress(item.address as Address)}
            >
              <span className="text-small">
                #{item.accountIndex} {shrinkAddress(item.address as Address)}
              </span>
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}

      {/* Pair picker - only show after contract is selected */}
      {chainId && (
        <Autocomplete
          label="Pair"
          variant="underlined"
          defaultItems={pairs}
          placeholder="Search pair"
          selectedKey={pairIndex}
          onSelectionChange={(key) => setPairIndex(key as string | null)}
          size="sm"
        >
          {(item) => (
            <AutocompleteItem key={item.pairIndex} className="font-mono">
              {`${item.from}/${item.to}`}
            </AutocompleteItem>
          )}
        </Autocomplete>
      )}

      {/* Collateral picker */}
      {chainId && (
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
          size="sm"
        >
          {collaterals.map((c) => (
            <SelectItem key={c.collateralIndex}>
              {collateralSymbols[c.collateralIndex] || `C${c.collateralIndex}`}
            </SelectItem>
          ))}
        </Select>
      )}

      {/* Amount */}
      {selectedCollateral && (
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
                  (${getPriceStr(selectedBalance.amount * collateralUsdPrice)})
                </span>
              )}
            </div>
          )}

          {amountMode === "usd" && collateralUsdPrice > 0 && (
            <span className="text-xs text-neutral-500">
              ={" "}
              {rawCollateralAmount.toFixed(
                selectedBalance?.precision && selectedBalance.precision >= 1e18
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
                = ${getPriceStr(Number(collateralAmount) * collateralUsdPrice)}
              </span>
            )}
        </div>
      )}

      <NumericInput
        amount={leverage}
        onChange={setLeverage}
        label="Leverage"
      />

      <NumericInput
        amount={maxSlippageP}
        onChange={setMaxSlippageP}
        label="Max Slippage %"
      />

      {/* SL */}
      <div className="flex flex-col gap-1">
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

        {slMode === "price" ? (
          <NumericInput amount={sl} onChange={setSl} label="SL Price (1e10)" />
        ) : (
          <NumericInput
            amount={slPercent}
            onChange={setSlPercent}
            label="SL % from current price"
          />
        )}
      </div>

      {/* TP */}
      <div className="flex flex-col gap-1">
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

        {tpMode === "price" ? (
          <NumericInput amount={tp} onChange={setTp} label="TP Price (1e10)" />
        ) : (
          <NumericInput
            amount={tpPercent}
            onChange={setTpPercent}
            label="TP % from current price"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="primary"
          size="sm"
          onPress={handleSave}
          isDisabled={isDisabled}
        >
          {initialValues ? "Update" : "Add"}
        </Button>
        <Button variant="flat" size="sm" onPress={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
