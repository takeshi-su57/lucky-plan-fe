"use client";

import { useState } from "react";
import { Button, Input, useDisclosure } from "@heroui/react";
import { useSnackbar } from "notistack";

import { LOCAL_USER_JWT_KEY } from "@/app/_hooks/useUserJWT";
import { StandardModal } from "@/components/modals/StandardModal";

type BatchDownloadProgress = {
  current: number;
  total: number;
};

function triggerDownload(blob: Blob, researchId: number) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `simulation-research-${researchId}-ai-standard.zip`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

export function BatchAiReportDownloadButton() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const { enqueueSnackbar } = useSnackbar();
  const [fromResearchId, setFromResearchId] = useState("");
  const [toResearchId, setToResearchId] = useState("");
  const [progress, setProgress] = useState<BatchDownloadProgress | null>(null);

  const fromId = Number(fromResearchId);
  const toId = Number(toResearchId);
  const isRangeValid =
    Number.isInteger(fromId) &&
    Number.isInteger(toId) &&
    fromId > 0 &&
    toId >= fromId;

  const downloadReports = async () => {
    if (!isRangeValid) {
      return;
    }

    const total = toId - fromId + 1;
    const failedIds: number[] = [];
    setProgress({ current: 0, total });

    try {
      const token = window.localStorage.getItem(LOCAL_USER_JWT_KEY);
      const apiBase = process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API?.replace(
        /\/graphql$/,
        "",
      );

      if (!apiBase) {
        throw new Error("Simulation API URL is not configured");
      }

      for (let researchId = fromId; researchId <= toId; researchId += 1) {
        setProgress({ current: researchId - fromId + 1, total });

        try {
          const response = await fetch(
            `${apiBase}/simulation-researches/${researchId}/reports/ai`,
            {
              headers: token
                ? { Authorization: `Bearer ${JSON.parse(token)}` }
                : {},
            },
          );

          if (!response.ok) {
            failedIds.push(researchId);
            continue;
          }

          triggerDownload(await response.blob(), researchId);
        } catch {
          failedIds.push(researchId);
        }
      }

      if (failedIds.length === 0) {
        enqueueSnackbar(`${total} AI reports downloaded.`, {
          variant: "success",
        });
        onClose();
      } else {
        enqueueSnackbar(
          `${total - failedIds.length} downloaded; ${failedIds.length} unavailable or not ready (${failedIds.join(", ")}).`,
          { variant: "warning" },
        );
      }
    } catch {
      enqueueSnackbar("Unable to start the batch AI report download.", {
        variant: "error",
      });
    } finally {
      setProgress(null);
    }
  };

  const downloading = progress !== null;

  return (
    <>
      <Button color="secondary" variant="flat" size="sm" onPress={onOpen}>
        Batch Download
      </Button>

      <StandardModal
        isOpen={isOpen}
        isDismissable={!downloading}
        isKeyboardDismissDisabled={downloading}
        onOpenChange={onOpenChange}
      >
        <div className="flex flex-col gap-5">
          <div>
            <h1>Batch Download AI Reports</h1>
            <p className="mt-1 text-sm text-neutral-500">
              Downloads every ready AI report from the first research ID through
              the last research ID, inclusive.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              type="number"
              label="From research ID"
              min={1}
              value={fromResearchId}
              isDisabled={downloading}
              onValueChange={setFromResearchId}
            />
            <Input
              type="number"
              label="To research ID"
              min={1}
              value={toResearchId}
              isDisabled={downloading}
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
              Downloading report {progress.current} of {progress.total}...
            </p>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button variant="flat" isDisabled={downloading} onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="secondary"
              isDisabled={!isRangeValid || downloading}
              isLoading={downloading}
              onPress={() => void downloadReports()}
            >
              Download {isRangeValid ? toId - fromId + 1 : ""} Reports
            </Button>
          </div>
        </div>
      </StandardModal>
    </>
  );
}
