"use client";

import { ValidationPipelineStatus } from "@/graphql/gql/graphql";
import { getPipelineCurrentLayer } from "@/app-hooks/useValidationPipeline";

export type LayerProgressTrackerProps = {
  status: ValidationPipelineStatus;
  stats: {
    totalCandidates: number;
    passedThreshold: number;
    paretoOptimal: number;
    passedWfa: number;
    userSelected: number;
    passedRobustness: number;
    finalApproved: number;
  };
};

type LayerState = "completed" | "running" | "awaiting" | "pending" | "failed";

const layers = [
  { id: 1, name: "Threshold", shortName: "L1" },
  { id: 2, name: "Pareto", shortName: "L2" },
  { id: 3, name: "WFA", shortName: "L3" },
  { id: 4, name: "Selection", shortName: "L4" },
  { id: 5, name: "Robustness", shortName: "L5" },
  { id: 6, name: "Approval", shortName: "L6" },
];

function getLayerState(
  layerId: number,
  status: ValidationPipelineStatus,
  currentLayer: number,
): LayerState {
  if (status === ValidationPipelineStatus.Failed) {
    if (layerId <= currentLayer) return "failed";
    return "pending";
  }

  if (status === ValidationPipelineStatus.Cancelled) {
    if (layerId < currentLayer) return "completed";
    return "pending";
  }

  if (layerId < currentLayer) return "completed";
  if (layerId === currentLayer) {
    // Check if it's an awaiting status
    if (
      (layerId === 4 &&
        status === ValidationPipelineStatus.AwaitingUserSelection) ||
      (layerId === 6 &&
        status === ValidationPipelineStatus.AwaitingFinalApproval)
    ) {
      return "awaiting";
    }
    // Check if running
    const runningStatuses = [
      ValidationPipelineStatus.Layer_1Running,
      ValidationPipelineStatus.Layer_2Running,
      ValidationPipelineStatus.Layer_3Running,
      ValidationPipelineStatus.Layer_5Running,
    ];
    if (runningStatuses.includes(status)) {
      return "running";
    }
    // Layer is done, next hasn't started
    return "completed";
  }
  return "pending";
}

function getLayerCount(
  layerId: number,
  stats: LayerProgressTrackerProps["stats"],
): number | null {
  switch (layerId) {
    case 1:
      return stats.passedThreshold;
    case 2:
      return stats.paretoOptimal;
    case 3:
      return stats.passedWfa;
    case 4:
      return stats.userSelected;
    case 5:
      return stats.passedRobustness;
    case 6:
      return stats.finalApproved;
    default:
      return null;
  }
}

function LayerNode({
  layer,
  state,
  count,
}: {
  layer: (typeof layers)[0];
  state: LayerState;
  count: number | null;
}) {
  const stateStyles: Record<LayerState, string> = {
    completed: "bg-success-500 border-success-500 text-white",
    running: "bg-primary-500 border-primary-500 text-white animate-pulse",
    awaiting: "bg-warning-500 border-warning-500 text-white",
    pending: "bg-neutral-800 border-neutral-600 text-neutral-400",
    failed: "bg-danger-500 border-danger-500 text-white",
  };

  const stateIcons: Record<LayerState, string> = {
    completed: "\u2713", // checkmark
    running: "\u25CF", // filled circle
    awaiting: "\u23F8", // pause
    pending: "\u25CB", // empty circle
    failed: "\u2717", // x mark
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${stateStyles[state]}`}
        title={`${layer.name}: ${state}`}
      >
        {state === "running" ? (
          <span className="animate-spin">{stateIcons[state]}</span>
        ) : (
          stateIcons[state]
        )}
      </div>
      <span className="text-xs font-medium text-neutral-300">
        {layer.shortName}
      </span>
      <span className="text-xs text-neutral-500">
        {count !== null ? count : "-"}
      </span>
    </div>
  );
}

function Connector({
  leftState,
}: {
  leftState: LayerState;
  rightState: LayerState;
}) {
  const isActive = leftState === "completed" || leftState === "running";
  return (
    <div
      className={`h-0.5 flex-1 ${
        isActive ? "bg-success-500" : "bg-neutral-700"
      }`}
    />
  );
}

export function LayerProgressTracker({
  status,
  stats,
}: LayerProgressTrackerProps) {
  const currentLayer = getPipelineCurrentLayer(status);

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="mb-2 text-xs font-medium text-neutral-400">
        Pipeline Progress
      </div>
      <div className="flex items-center justify-between gap-2">
        {layers.map((layer, index) => {
          const state = getLayerState(layer.id, status, currentLayer);
          const count = getLayerCount(layer.id, stats);
          const nextLayer = layers[index + 1];

          return (
            <div key={layer.id} className="flex flex-1 items-center">
              <LayerNode layer={layer} state={state} count={count} />
              {nextLayer && (
                <Connector
                  leftState={state}
                  rightState={getLayerState(nextLayer.id, status, currentLayer)}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
        <span>Total: {stats.totalCandidates}</span>
        <span>
          {status === ValidationPipelineStatus.Completed
            ? `Final: ${stats.finalApproved} approved`
            : status === ValidationPipelineStatus.Failed
              ? "Pipeline failed"
              : status === ValidationPipelineStatus.Cancelled
                ? "Pipeline cancelled"
                : `Current: Layer ${currentLayer}`}
        </span>
      </div>
    </div>
  );
}
