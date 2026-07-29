"use client";

import { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { Button, Input, useDisclosure } from "@heroui/react";
import { useSnackbar } from "notistack";

import {
  DELETE_SIMULATION_RESEARCH_DOCUMENT,
  GET_SIMULATION_RESEARCHES_DOCUMENT,
} from "@/app/_hooks/useSimulations";
import { StandardModal } from "@/components/modals/StandardModal";

type BatchRemoveProgress = {
  current: number;
  total: number;
};

export function BatchSimulationResearchRemoveButton() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();
  const [deleteSimulationResearch] = useMutation(
    DELETE_SIMULATION_RESEARCH_DOCUMENT,
  );
  const [fromResearchId, setFromResearchId] = useState("");
  const [toResearchId, setToResearchId] = useState("");
  const [progress, setProgress] = useState<BatchRemoveProgress | null>(null);

  const fromId = Number(fromResearchId);
  const toId = Number(toResearchId);
  const isRangeValid =
    Number.isInteger(fromId) &&
    Number.isInteger(toId) &&
    fromId > 0 &&
    toId >= fromId;

  const removeResearches = async () => {
    if (!isRangeValid) {
      return;
    }

    const total = toId - fromId + 1;
    const failedIds: number[] = [];
    setProgress({ current: 0, total });

    for (let researchId = fromId; researchId <= toId; researchId += 1) {
      setProgress({ current: researchId - fromId + 1, total });

      try {
        await deleteSimulationResearch({ variables: { id: researchId } });
        client.cache.evict({ id: `SimulationResearch:${researchId}` });
      } catch {
        failedIds.push(researchId);
      }
    }

    client.cache.gc();
    await client.refetchQueries({
      include: [GET_SIMULATION_RESEARCHES_DOCUMENT],
    });
    setProgress(null);

    if (failedIds.length === 0) {
      enqueueSnackbar(`${total} simulation researches removed.`, {
        variant: "success",
      });
      onClose();
    } else {
      enqueueSnackbar(
        `${total - failedIds.length} removed; ${failedIds.length} could not be removed (${failedIds.join(", ")}).`,
        { variant: "warning" },
      );
    }
  };

  const removing = progress !== null;

  return (
    <>
      <Button color="danger" variant="flat" size="sm" onPress={onOpen}>
        Batch Remove
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={!removing}
        isKeyboardDismissDisabled={removing}
        onOpenChange={onOpenChange}
      >
        <div className="flex flex-col gap-5">
          <div>
            <h1>Batch Remove Simulation Researches</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Permanently removes every simulation research from the first
              research ID through the last research ID, inclusive.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              type="number"
              label="From research ID"
              min={1}
              value={fromResearchId}
              isDisabled={removing}
              onValueChange={setFromResearchId}
            />
            <Input
              type="number"
              label="To research ID"
              min={1}
              value={toResearchId}
              isDisabled={removing}
              onValueChange={setToResearchId}
            />
          </div>

          {!isRangeValid && (fromResearchId || toResearchId) ? (
            <p className="text-danger text-sm">
              Enter whole-number IDs where the ending ID is not before the
              starting ID.
            </p>
          ) : null}

          {progress ? (
            <p className="text-sm text-neutral-400">
              Removing research {progress.current} of {progress.total}...
            </p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button variant="flat" isDisabled={removing} onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              isDisabled={!isRangeValid || removing}
              isLoading={removing}
              onPress={() => void removeResearches()}
            >
              Remove {isRangeValid ? toId - fromId + 1 : ""} Researches
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
