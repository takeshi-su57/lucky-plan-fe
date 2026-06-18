"use client";

import { useMemo, useState } from "react";
import { Button, Chip, Divider, useDisclosure } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { Address } from "viem";

import { StandardModal } from "@/components/modals/StandardModal";
import {
  useBatchOpenStore,
  BatchOpenAction,
} from "@/app/_hooks/useBatchOpenStore";
import { useBatchOpenTrade, ContractInfo } from "@/app/_hooks/useBatchTrade";
import { useCollateralUsdPrices } from "@/app/_hooks/useCollateralUsdPrices";
import { useGetPrices } from "@/app/_hooks/useGetPrices";
import { useGetAllGnsContracts } from "@/app-hooks/useContract";
import { getPairName } from "@/web3/gns/v10/configs";
import { shrinkAddress } from "@/utils";
import { BatchOpenActionForm } from "./BatchOpenActionForm";
import { BatchResultsView } from "./BatchResultsView";

export function BatchOpenButton() {
  const contracts = useGetAllGnsContracts();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { actions, addAction, removeAction, updateAction, clearAll } =
    useBatchOpenStore();

  const { executeBatchOpen, results, isExecuting, resetResults } =
    useBatchOpenTrade();

  const pairPrices = useGetPrices();

  // Build a contracts lookup map for execution
  const contractsMap = useMemo(() => {
    const map: Record<number, ContractInfo> = {};
    for (const c of contracts) {
      map[c.id] = { id: c.id, chainId: c.chainId, address: c.address };
    }
    return map;
  }, [contracts]);

  // For collateral USD prices, we need the chainId/diamondAddress of each unique contract used
  // We'll use the first action's contract for now - the execution hook resolves per-action
  const firstAction = actions[0];
  const firstContract = firstAction
    ? contractsMap[firstAction.contractId]
    : null;
  const collateralUsdPrices = useCollateralUsdPrices(
    firstContract?.chainId ?? null,
    firstContract?.address ?? "",
  );

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const editingAction = editingId
    ? actions.find((a) => a.id === editingId)
    : undefined;

  const handleSave = (action: Omit<BatchOpenAction, "id">) => {
    if (editingId) {
      updateAction(editingId, action);
      setEditingId(null);
    } else {
      addAction(action);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleExecute = (long: boolean) => {
    if (actions.length === 0) return;
    resetResults();
    executeBatchOpen(
      actions,
      long,
      contractsMap,
      collateralUsdPrices,
      pairPrices || {},
    );
  };

  const actionLabels = actions.map((a) => {
    const contract = contractsMap[a.contractId];
    const chainId = contract?.chainId;
    const pairName = chainId
      ? getPairName(chainId, a.pairIndex)
      : `Pair ${a.pairIndex}`;
    return `${pairName} ${a.leverage}x`;
  });

  return (
    <>
      <Button onPress={onOpen}>Batch Open</Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={(open) => {
          onOpenChange();
          if (!open) {
            setShowForm(false);
            setEditingId(null);
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
            Batch Open Positions
          </h1>

          <div className="flex items-center gap-2">
            {!showForm && (
              <Button
                size="sm"
                color="primary"
                onPress={() => {
                  setEditingId(null);
                  setShowForm(true);
                }}
                isDisabled={isExecuting}
              >
                + Add
              </Button>
            )}
            {actions.length > 0 && (
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

          {/* Action list */}
          {actions.length === 0 && !showForm && (
            <p className="text-sm text-neutral-500">
              No actions configured. Click &quot;+ Add&quot; to set up your
              first batch entry.
            </p>
          )}

          {actions.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {actions.map((action, i) => {
                const contract = contractsMap[action.contractId];
                const chainId = contract?.chainId;
                const pairName = chainId
                  ? getPairName(chainId, action.pairIndex)
                  : `Pair ${action.pairIndex}`;

                const amountLabel =
                  action.amountMode === "usd"
                    ? `$${action.collateralAmount}`
                    : `${action.collateralAmount}`;

                const slLabel =
                  action.slMode === "percent"
                    ? `SL:${action.slPercent}%`
                    : `SL:${action.sl}`;
                const tpLabel =
                  action.tpMode === "percent"
                    ? `TP:${action.tpPercent}%`
                    : `TP:${action.tp}`;

                return (
                  <div
                    key={action.id}
                    className="flex items-center justify-between gap-2 rounded-md bg-neutral-800/50 px-3 py-2"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Chip size="sm" variant="flat">
                        #{i + 1}
                      </Chip>
                      <span className="text-xs text-neutral-400">
                        {shrinkAddress(action.followerAddress as Address)}
                      </span>
                      <span className="text-sm font-medium text-white">
                        {pairName}
                      </span>
                      <span className="text-sm text-neutral-300">
                        {amountLabel}
                      </span>
                      <Chip size="sm" variant="flat" color="secondary">
                        {action.leverage}x
                      </Chip>
                      <span className="text-xs text-neutral-400">
                        {slLabel}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {tpLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="light"
                        onPress={() => handleEdit(action.id)}
                        isDisabled={isExecuting}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => removeAction(action.id)}
                        isDisabled={isExecuting}
                      >
                        X
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Inline form */}
          {showForm && (
            <>
              <Divider />
              <BatchOpenActionForm
                contracts={contracts}
                initialValues={editingAction}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </>
          )}

          {/* Execution buttons */}
          {actions.length > 0 && !showForm && (
            <>
              <Divider />
              <div className="flex items-center gap-4">
                <Button
                  className={twMerge("flex-1 font-bold")}
                  color="success"
                  size="lg"
                  onPress={() => handleExecute(true)}
                  isDisabled={isExecuting || actions.length === 0}
                  isLoading={isExecuting}
                >
                  LONG ({actions.length})
                </Button>
                <Button
                  className={twMerge("flex-1 font-bold")}
                  color="danger"
                  size="lg"
                  onPress={() => handleExecute(false)}
                  isDisabled={isExecuting || actions.length === 0}
                  isLoading={isExecuting}
                >
                  SHORT ({actions.length})
                </Button>
              </div>
            </>
          )}

          {/* Results */}
          {results.length > 0 && (
            <>
              <Divider />
              <BatchResultsView results={results} labels={actionLabels} />
            </>
          )}
        </div>
      </StandardModal>
    </>
  );
}
