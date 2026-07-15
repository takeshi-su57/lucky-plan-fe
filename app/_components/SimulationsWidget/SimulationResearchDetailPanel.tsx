"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Chip, Input, Spinner, Textarea } from "@heroui/react";

import {
  useCancelResearch,
  useDeleteSimulationResearch,
  useGetSimulationResearch,
  useGetSimulationsByResearch,
  usePauseResearch,
  usePlayAutoResearch,
  useUpdateSimulationResearch,
} from "@/app/_hooks/useSimulations";
import { SimulationRow } from "./SimulationRow";
import { getPriceStr } from "@/utils/price";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { SimulationStatus, UserPermission } from "@/graphql/gql/graphql";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { SimulationProgressBar } from "./SimulationProgressBar";
import { LOCAL_USER_JWT_KEY } from "@/app/_hooks/useUserJWT";
import { StandardModal } from "@/components/modals/StandardModal";

function RangeListStat({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
      <span className="text-[10px] font-semibold text-neutral-500 uppercase">
        {label}
      </span>
      <span className="mt-1 text-sm font-semibold text-neutral-300">
        {values.length > 0 ? values.join(", ") : "None"}
      </span>
    </div>
  );
}

type Range = { min: number; max: number };
type RangeOrGroup = Range | { ranges: Range[] };

function formatRangePairs(
  ranges: RangeOrGroup[],
  formatter: (value: number) => string = (value) => `${value}`,
) {
  return ranges
    .flatMap((range) => ("ranges" in range ? range.ranges : [range]))
    .map((range) => `${formatter(range.min)}-${formatter(range.max)}`);
}

export function SimulationResearchDetailPanel({
  researchId,
}: {
  researchId: string;
}) {
  const id = Number(researchId);
  const router = useRouter();
  const { simulationResearch, loading: researchLoading } =
    useGetSimulationResearch(id);
  const { simulations, loading: simulationsLoading } =
    useGetSimulationsByResearch(id);
  const { deleteSimulationResearch, loading: deleteLoading } =
    useDeleteSimulationResearch();
  const { playAutoResearch, loading: playLoading } = usePlayAutoResearch();
  const { pauseResearch, loading: pauseLoading } = usePauseResearch();
  const { cancelResearch, loading: cancelLoading } = useCancelResearch();
  const { updateSimulationResearch, loading: updateLoading } =
    useUpdateSimulationResearch();
  const { userJwtQuery } = useUserJWT();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (researchLoading) {
    return <Spinner size="sm" label="Loading Research..." />;
  }

  if (!simulationResearch) {
    return <div>There is no simulation research</div>;
  }

  const isAdmin = userJwtQuery.data?.permission === UserPermission.Admin;
  const canEdit =
    userJwtQuery.data?.permission === UserPermission.Admin ||
    userJwtQuery.data?.permission === UserPermission.Trader;
  const actionLoading =
    playLoading || pauseLoading || cancelLoading || deleteLoading;
  const canQueue =
    simulationResearch.status === SimulationStatus.Created ||
    simulationResearch.status === SimulationStatus.Paused;
  const canPause =
    simulationResearch.status === SimulationStatus.Queued ||
    simulationResearch.status === SimulationStatus.Running;
  const canCancel =
    simulationResearch.status !== SimulationStatus.Completed &&
    simulationResearch.status !== SimulationStatus.Cancelled;
  const canExport = simulationResearch.status === SimulationStatus.Completed;

  const openEditModal = () => {
    setTitle(simulationResearch.title);
    setDescription(simulationResearch.description);
    setIsEditOpen(true);
  };

  const downloadAiReport = async () => {
    const token = window.localStorage.getItem(LOCAL_USER_JWT_KEY);
    const apiBase = process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API.replace(
      /\/graphql$/,
      "",
    );
    const response = await fetch(
      `${apiBase}/simulation-researches/${simulationResearch.id}/reports/ai`,
      {
        headers: token ? { Authorization: `Bearer ${JSON.parse(token)}` } : {},
      },
    );
    if (!response.ok) throw new Error("Unable to export this research report");
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = `simulation-research-${simulationResearch.id}-ai-standard.zip`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="border-default-200 flex flex-col gap-4 border-b pb-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-bold text-neutral-200">
                {simulationResearch.title || "No Title"}
              </h1>
              <Chip variant="flat">Research {simulationResearch.id}</Chip>
              <Chip variant="flat" color="secondary">
                {simulationResearch.platform}
              </Chip>
              <Chip variant="flat">{simulationResearch.direction}</Chip>
              <Chip variant="flat">
                {simulationResearch.days}d / {simulationResearch.gapDays}g
              </Chip>
            </div>

            <p className="mt-2 max-w-4xl text-sm text-neutral-400">
              {simulationResearch.description || "No Description"}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <Button
              color="secondary"
              variant="flat"
              size="sm"
              isDisabled={!canExport}
              onPress={() => void downloadAiReport()}
            >
              Export AI Report
            </Button>

            {canEdit ? (
              <Button
                color="primary"
                variant="flat"
                size="sm"
                onPress={openEditModal}
              >
                Edit Research
              </Button>
            ) : null}
            {canQueue ? (
              <Button
                color="primary"
                variant="flat"
                size="sm"
                isLoading={playLoading}
                isDisabled={actionLoading}
                onPress={() =>
                  playAutoResearch({ variables: { id: simulationResearch.id } })
                }
              >
                Queue Research
              </Button>
            ) : null}

            {canPause ? (
              <Button
                color="warning"
                variant="flat"
                size="sm"
                isLoading={pauseLoading}
                isDisabled={actionLoading}
                onPress={() =>
                  pauseResearch({ variables: { id: simulationResearch.id } })
                }
              >
                Pause
              </Button>
            ) : null}

            {canCancel ? (
              <ButtonWithConfirm
                color="danger"
                variant="flat"
                size="sm"
                isLoading={cancelLoading}
                isDisabled={actionLoading}
                onPress={() =>
                  cancelResearch({ variables: { id: simulationResearch.id } })
                }
              >
                Cancel
              </ButtonWithConfirm>
            ) : null}

            {isAdmin ? (
              <ButtonWithConfirm
                color="danger"
                variant="solid"
                size="sm"
                isLoading={deleteLoading}
                isDisabled={actionLoading}
                onPress={async () => {
                  await deleteSimulationResearch({
                    variables: { id: simulationResearch.id },
                  });
                  router.push("/simulations");
                }}
              >
                Remove
              </ButtonWithConfirm>
            ) : null}

            <Link href="/simulations">
              <Button color="primary" variant="light" size="sm">
                Back to Researches
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <RangeListStat
            label="Trade Ranges"
            values={formatRangePairs(simulationResearch.trade)}
          />
          <RangeListStat
            label="R2 Ranges"
            values={formatRangePairs(simulationResearch.r2)}
          />
          <RangeListStat
            label="Slope Ranges"
            values={formatRangePairs(simulationResearch.slope)}
          />
          <RangeListStat
            label="Plan Cadence"
            values={[
              `${simulationResearch.days} days`,
              `${simulationResearch.gapDays} gap days`,
            ]}
          />
          <RangeListStat
            label="Leverage Ranges"
            values={formatRangePairs(
              simulationResearch.leverage,
              (value) => `${value}x`,
            )}
          />
          <RangeListStat
            label="Collateral Ranges"
            values={formatRangePairs(
              simulationResearch.collateral,
              getPriceStr,
            )}
          />
          <RangeListStat
            label="Size Ranges"
            values={formatRangePairs(simulationResearch.size, getPriceStr)}
          />
          <RangeListStat
            label="Score"
            values={formatRangePairs(simulationResearch.score, (value) =>
              value.toFixed(2),
            )}
          />
          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              Simulations
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {simulationResearch.completedSimulations} /{" "}
              {simulationResearch.totalSimulations}
            </span>
          </div>
          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              Ranges
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {simulationResearch.completedRanges} /{" "}
              {simulationResearch.totalRanges}
            </span>
          </div>
          <div className="border-default-100 bg-content2/40 flex min-h-16 flex-col justify-center rounded-lg border px-3 py-2">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase">
              Status
            </span>
            <span className="mt-1 text-sm font-semibold text-neutral-300">
              {simulationResearch.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SimulationProgressBar
            value={simulationResearch.progressPercent}
            color="primary"
            ariaLabel={`Simulation research ${simulationResearch.id} progress`}
            status={simulationResearch.status}
          />
          <div
            aria-live="polite"
            className="flex flex-wrap items-center gap-2 text-xs text-neutral-500"
          >
            <span>
              {simulationResearch.progressMessage || "Waiting to run"}
            </span>
            <span className="text-neutral-600">
              {simulationResearch.progressPhase || "created"}
            </span>
          </div>
          {simulationResearch.lastError ? (
            <div className="border-danger-500/30 bg-danger-500/10 text-danger-200 rounded-lg border px-3 py-2 text-xs">
              {simulationResearch.lastError}
            </div>
          ) : null}
        </div>
      </div>

      <StandardModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        classNames={{ base: "max-w-xl" }}
      >
        <h1>Edit Simulation Research</h1>
        <p className="text-sm text-neutral-400">
          This also updates the title and description of all child simulations
          and their generated plans, so future AI exports remain coherent.
        </p>
        <Input
          label="Title"
          value={title}
          onValueChange={setTitle}
          isRequired
        />
        <Textarea
          label="Description"
          value={description}
          onValueChange={setDescription}
          minRows={4}
          isRequired
        />
        <div className="flex justify-end gap-2">
          <Button variant="light" onPress={() => setIsEditOpen(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            isLoading={updateLoading}
            isDisabled={!title.trim() || !description.trim()}
            onPress={async () => {
              const result = await updateSimulationResearch({
                variables: {
                  input: {
                    id: simulationResearch.id,
                    title: title.trim(),
                    description: description.trim(),
                  },
                },
              });
              if (result.data?.updateSimulationResearch) {
                setIsEditOpen(false);
              }
            }}
          >
            Save Research Details
          </Button>
        </div>
      </StandardModal>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-neutral-200">
            Generated Simulations
          </h2>
          <Chip variant="flat" size="sm">
            {simulationResearch.totalSimulations}
          </Chip>
        </div>

        {simulationsLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            <Spinner size="lg" color="warning" />
          </div>
        ) : simulations.length > 0 ? (
          <div className="flex flex-col">
            {simulations.map((simulation) => (
              <SimulationRow key={simulation.id} simulation={simulation} />
            ))}
          </div>
        ) : (
          <div className="border-default-200 bg-content1 rounded-lg border p-6 text-sm text-neutral-400">
            No simulations were generated for this research yet.
          </div>
        )}
      </div>
    </div>
  );
}
