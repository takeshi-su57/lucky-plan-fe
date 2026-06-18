"use client";

import { useMemo, useState } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  Chip,
  Divider,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { Address } from "viem";

import { StandardModal } from "@/components/modals/StandardModal";
import {
  useBatchCloseTrade,
  BatchCloseTarget,
} from "@/app/_hooks/useBatchTrade";
import { useGetAllGnsContracts } from "@/app-hooks/useContract";
import { useGetAllFollowerDetails } from "@/app/_hooks/useFollower";
import { getPairName, getCollateral } from "@/web3/gns/v10/configs";
import { ContractStatus } from "@/graphql/gql/graphql";
import { shrinkAddress } from "@/utils";
import { PositionTradeStatus } from "./PositionTradeStatus";
import { PairChip } from "../LeaderboardWidgets/PairChip";
import { BatchResultsView } from "./BatchResultsView";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";

type CloseEntry = {
  id: string;
  address: string;
  contractId: number;
  chainId: number;
  pairIndex: number;
  index: number;
  long: boolean;
  leverage: number;
  collateralAmount: number;
  openPrice: number;
  pairName: string | null;
  followerLabel: string;
};

export function BatchCloseButton() {
  const contracts = useGetAllGnsContracts();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { executeBatchClose, results, isExecuting, resetResults } =
    useBatchCloseTrade();

  // Accumulated close list (cross-contract)
  const [closeList, setCloseList] = useState<CloseEntry[]>([]);

  // Picker state for adding positions
  const [showPicker, setShowPicker] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(
    null,
  );
  const [followerAddress, setFollowerAddress] = useState<string>("");
  const [pickerSelectedIds, setPickerSelectedIds] = useState<Set<string>>(
    new Set(),
  );

  const selectedContract = useMemo(
    () => contracts.find((c) => c.id === +(selectedContractId || 0)) || null,
    [contracts, selectedContractId],
  );

  const chainId = selectedContract?.chainId ?? null;

  const liveContracts = useMemo(
    () => contracts.filter((c) => c.status === ContractStatus.Live),
    [contracts],
  );

  const { details: followerDetails, loading: followerLoading } =
    useGetAllFollowerDetails(selectedContractId, false);

  const selectedFollower = useMemo(
    () => followerDetails.find((f) => f.address === followerAddress) || null,
    [followerDetails, followerAddress],
  );

  // Parse trades for the picker
  const parsedTrades = useMemo(
    () =>
      (selectedFollower?.trades || []).map((trade) => {
        const data = JSON.parse(trade.params);
        const pairIndex = Number(data.pairIndex);
        const long = Boolean(data.long);
        const leverage = data.leverage ? Number(data.leverage) / 1e3 : 0;
        const collateralIndex = data.collateralIndex;

        const tradeCollateral =
          chainId && collateralIndex != null
            ? getCollateral(chainId, collateralIndex)
            : null;
        const precision = tradeCollateral
          ? Number(tradeCollateral.precision)
          : 1e6;
        const collateralAmount = data.collateralAmount
          ? Number(data.collateralAmount) / precision
          : 0;
        const openPrice = data.openPrice ? Number(data.openPrice) / 1e10 : 0;

        const pairName = chainId
          ? getPairName(chainId, pairIndex)
          : `Pair ${pairIndex}`;

        const id = `${trade.address}-${trade.index}`;

        return {
          id,
          address: trade.address,
          index: trade.index,
          pairIndex,
          long,
          leverage,
          collateralAmount,
          openPrice,
          pairName,
        };
      }),
    [selectedFollower?.trades, chainId],
  );

  // IDs already in close list, so we can dim/disable them in the picker
  const alreadyAddedIds = useMemo(
    () => new Set(closeList.map((e) => e.id)),
    [closeList],
  );

  const togglePickerSelect = (id: string) => {
    setPickerSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllPicker = () => {
    const available = parsedTrades
      .filter((t) => !alreadyAddedIds.has(t.id))
      .map((t) => t.id);
    setPickerSelectedIds(new Set(available));
  };

  const deselectAllPicker = () => {
    setPickerSelectedIds(new Set());
  };

  const handleAddSelected = () => {
    if (!selectedContract || !chainId) return;
    const followerLabel = shrinkAddress(followerAddress as Address);

    const newEntries: CloseEntry[] = parsedTrades
      .filter((t) => pickerSelectedIds.has(t.id) && !alreadyAddedIds.has(t.id))
      .map((t) => ({
        id: t.id,
        address: t.address,
        contractId: selectedContract.id,
        chainId,
        pairIndex: t.pairIndex,
        index: t.index,
        long: t.long,
        leverage: t.leverage,
        collateralAmount: t.collateralAmount,
        openPrice: t.openPrice,
        pairName: t.pairName,
        followerLabel,
      }));

    setCloseList((prev) => [...prev, ...newEntries]);
    setPickerSelectedIds(new Set());
    setShowPicker(false);
  };

  const removeEntry = (id: string) => {
    setCloseList((prev) => prev.filter((e) => e.id !== id));
  };

  const clearAll = () => {
    setCloseList([]);
  };

  const handleExecute = () => {
    if (closeList.length === 0) return;

    const targets: BatchCloseTarget[] = closeList.map((e) => ({
      id: e.id,
      address: e.address,
      contractId: e.contractId,
      pairIndex: e.pairIndex,
      index: e.index,
    }));

    resetResults();
    executeBatchClose(targets);
  };

  const closeLabels = closeList.map(
    (e) => `#${e.index} ${e.pairName ?? "Unknown"}`,
  );

  const resetPicker = () => {
    setSelectedContractId(null);
    setFollowerAddress("");
    setPickerSelectedIds(new Set());
  };

  return (
    <>
      <Button onPress={onOpen}>Batch Close</Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={(open) => {
          onOpenChange();
          if (!open) {
            setShowPicker(false);
            resetPicker();
            resetResults();
          }
        }}
        backdrop="blur"
        classNames={{
          base: "max-w-225 max-h-[80vh]",
          body: "overflow-y-auto",
        }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Batch Close Positions
          </h1>

          <div className="flex items-center gap-2">
            {!showPicker && (
              <Button
                size="sm"
                color="primary"
                onPress={() => {
                  resetPicker();
                  setShowPicker(true);
                }}
                isDisabled={isExecuting}
              >
                + Add
              </Button>
            )}
            {closeList.length > 0 && (
              <Button
                size="sm"
                variant="flat"
                color="danger"
                onPress={clearAll}
                isDisabled={isExecuting}
              >
                Clear All
              </Button>
            )}
          </div>

          {/* Close list */}
          {closeList.length === 0 && !showPicker && (
            <p className="text-sm text-neutral-500">
              No positions queued. Click &quot;+ Add&quot; to pick positions
              from any contract/follower.
            </p>
          )}

          {closeList.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {closeList.map((entry, i) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-2 rounded-md bg-neutral-800/50 px-3 py-2"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Chip size="sm" variant="flat">
                      #{i + 1}
                    </Chip>
                    <span className="text-xs text-neutral-400">
                      {entry.followerLabel}
                    </span>
                    <span
                      className={twMerge(
                        "text-xs font-medium",
                        entry.long ? "text-green-500" : "text-red-500",
                      )}
                    >
                      {entry.long ? "Long" : "Short"}
                    </span>
                    <PairChip pairName={entry.pairName ?? "Unknown"} />
                    <PositionTradeStatus
                      collateralAmount={entry.collateralAmount}
                      leverage={entry.leverage}
                      long={entry.long}
                      pairIndex={entry.pairIndex}
                      openPrice={entry.openPrice}
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => removeEntry(entry.id)}
                    isDisabled={isExecuting}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Picker form */}
          {showPicker && (
            <>
              <Divider />
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
                    setPickerSelectedIds(new Set());
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
                          <span className="text-small">
                            Chain: {item.chainId}
                          </span>
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
                  <>
                    {followerLoading ? (
                      <Spinner size="sm" label="Loading followers..." />
                    ) : (
                      <Autocomplete
                        label="Follower"
                        variant="underlined"
                        defaultItems={followerDetails}
                        placeholder="Select follower"
                        selectedKey={followerAddress || null}
                        onSelectionChange={(key) => {
                          setFollowerAddress(key ? String(key) : "");
                          setPickerSelectedIds(new Set());
                        }}
                        size="sm"
                      >
                        {(item) => (
                          <AutocompleteItem
                            key={item.address}
                            className="font-mono"
                            textValue={shrinkAddress(item.address as Address)}
                          >
                            <span className="text-small">
                              #{item.accountIndex}{" "}
                              {shrinkAddress(item.address as Address)}
                            </span>
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  </>
                )}

                {/* Position selection */}
                {followerAddress && parsedTrades.length > 0 && (
                  <>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={selectAllPicker}
                      >
                        Select All
                      </Button>
                      <Button
                        size="sm"
                        variant="flat"
                        onPress={deselectAllPicker}
                      >
                        Deselect All
                      </Button>
                      <Chip size="sm" variant="flat">
                        {pickerSelectedIds.size} selected
                      </Chip>
                    </div>

                    <div className="flex flex-col gap-1">
                      {parsedTrades.map((trade) => {
                        const added = alreadyAddedIds.has(trade.id);
                        return (
                          <div
                            key={trade.id}
                            className={twMerge(
                              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                              added
                                ? "cursor-not-allowed opacity-40"
                                : "cursor-pointer",
                              !added && pickerSelectedIds.has(trade.id)
                                ? "bg-neutral-700/60"
                                : "bg-neutral-800/50 hover:bg-neutral-800",
                            )}
                            onClick={() =>
                              !added && togglePickerSelect(trade.id)
                            }
                          >
                            <Checkbox
                              isSelected={
                                added || pickerSelectedIds.has(trade.id)
                              }
                              onValueChange={() =>
                                !added && togglePickerSelect(trade.id)
                              }
                              isDisabled={added}
                              size="sm"
                            />
                            <Chip size="sm" variant="flat">
                              #{trade.index}
                            </Chip>
                            <span
                              className={twMerge(
                                "text-xs font-medium",
                                trade.long ? "text-green-500" : "text-red-500",
                              )}
                            >
                              {trade.long ? "Long" : "Short"}
                            </span>
                            <PairChip pairName={trade.pairName ?? "Unknown"} />
                            <PositionTradeStatus
                              collateralAmount={trade.collateralAmount}
                              leverage={trade.leverage}
                              long={trade.long}
                              pairIndex={trade.pairIndex}
                              openPrice={trade.openPrice}
                            />
                            {added && (
                              <Chip size="sm" color="success" variant="flat">
                                Added
                              </Chip>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {followerAddress && parsedTrades.length === 0 && (
                  <p className="text-sm text-neutral-500">
                    No open positions for this follower.
                  </p>
                )}

                {/* Picker actions */}
                <div className="flex items-center gap-2">
                  <Button
                    color="primary"
                    size="sm"
                    onPress={handleAddSelected}
                    isDisabled={pickerSelectedIds.size === 0}
                  >
                    Add Selected ({pickerSelectedIds.size})
                  </Button>
                  <Button
                    variant="flat"
                    size="sm"
                    onPress={() => {
                      setShowPicker(false);
                      resetPicker();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Execute button */}
          {closeList.length > 0 && !showPicker && (
            <>
              <Divider />
              <ButtonWithConfirm
                color="danger"
                size="lg"
                className="w-full font-bold"
                isDisabled={closeList.length === 0 || isExecuting}
                isLoading={isExecuting}
                onPress={handleExecute}
              >
                Close All ({closeList.length})
              </ButtonWithConfirm>
            </>
          )}

          {/* Results */}
          {results.length > 0 && (
            <>
              <Divider />
              <BatchResultsView results={results} labels={closeLabels} />
            </>
          )}
        </div>
      </StandardModal>
    </>
  );
}
