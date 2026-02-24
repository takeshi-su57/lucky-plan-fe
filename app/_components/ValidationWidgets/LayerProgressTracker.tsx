"use client";

import { ValidationPipelineStatus } from "@/graphql/gql/graphql";
import { getPipelineCurrentStep } from "@/app-hooks/useValidationPipeline";

export type StepProgressTrackerProps = {
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

export type LayerProgressTrackerProps = StepProgressTrackerProps;

type StepState = "completed" | "active" | "awaiting" | "pending" | "failed";

const steps = [
  { id: 1, name: "Task", shortName: "S1" },
  { id: 2, name: "Threshold", shortName: "S2" },
  { id: 3, name: "Pareto", shortName: "S3" },
  { id: 4, name: "WFA", shortName: "S4" },
  { id: 5, name: "Selection", shortName: "S5" },
  { id: 6, name: "Robustness", shortName: "S6" },
  { id: 7, name: "Approval", shortName: "S7" },
];

function getStepState(
  stepId: number,
  status: ValidationPipelineStatus,
  currentStep: number,
): StepState {
  if (status === ValidationPipelineStatus.Failed) {
    if (stepId <= currentStep) return "failed";
    return "pending";
  }

  if (status === ValidationPipelineStatus.Cancelled) {
    if (stepId < currentStep) return "completed";
    return "pending";
  }

  if (stepId < currentStep) return "completed";
  if (stepId === currentStep) {
    if (
      (stepId === 5 &&
        status === ValidationPipelineStatus.StepUserSelection) ||
      (stepId === 7 &&
        status === ValidationPipelineStatus.StepFinalApproval)
    ) {
      return "awaiting";
    }
    return "active";
  }
  return "pending";
}

function getStepCount(
  stepId: number,
  stats: StepProgressTrackerProps["stats"],
): number | null {
  switch (stepId) {
    case 1:
      return stats.totalCandidates;
    case 2:
      return stats.passedThreshold;
    case 3:
      return stats.paretoOptimal;
    case 4:
      return stats.passedWfa;
    case 5:
      return stats.userSelected;
    case 6:
      return stats.passedRobustness;
    case 7:
      return stats.finalApproved;
    default:
      return null;
  }
}

function StepNode({
  step,
  state,
  count,
}: {
  step: (typeof steps)[0];
  state: StepState;
  count: number | null;
}) {
  const stateStyles: Record<StepState, string> = {
    completed: "bg-success-500 border-success-500 text-white",
    active: "bg-primary-500 border-primary-500 text-white animate-pulse",
    awaiting: "bg-warning-500 border-warning-500 text-white",
    pending: "bg-neutral-800 border-neutral-600 text-neutral-400",
    failed: "bg-danger-500 border-danger-500 text-white",
  };

  const stateIcons: Record<StepState, string> = {
    completed: "\u2713",
    active: "\u25CF",
    awaiting: "\u23F8",
    pending: "\u25CB",
    failed: "\u2717",
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${stateStyles[state]}`}
        title={`${step.name}: ${state}`}
      >
        {state === "active" ? (
          <span className="animate-spin">{stateIcons[state]}</span>
        ) : (
          stateIcons[state]
        )}
      </div>
      <span className="text-xs font-medium text-neutral-300">
        {step.shortName}
      </span>
      <span className="text-xs text-neutral-500">
        {count !== null ? count : "-"}
      </span>
    </div>
  );
}

function Connector({ leftState }: { leftState: StepState }) {
  const isActive = leftState === "completed" || leftState === "active";
  return (
    <div
      className={`h-0.5 flex-1 ${
        isActive ? "bg-success-500" : "bg-neutral-700"
      }`}
    />
  );
}

export function StepProgressTracker({
  status,
  stats,
}: StepProgressTrackerProps) {
  const currentStep = getPipelineCurrentStep(status);

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="mb-2 text-xs font-medium text-neutral-400">
        Pipeline Progress
      </div>
      <div className="flex items-center justify-between gap-1">
        {steps.map((step, index) => {
          const state = getStepState(step.id, status, currentStep);
          const count = getStepCount(step.id, stats);
          const nextStep = steps[index + 1];

          return (
            <div key={step.id} className="flex flex-1 items-center">
              <StepNode step={step} state={state} count={count} />
              {nextStep && <Connector leftState={state} />}
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
                : `Current: Step ${currentStep}`}
        </span>
      </div>
    </div>
  );
}

export const LayerProgressTracker = StepProgressTracker;
