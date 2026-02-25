"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Slider,
  Progress,
} from "@heroui/react";
import {
  FiBarChart2,
  FiPlay,
  FiCheck,
  FiPause,
  FiRefreshCw,
} from "react-icons/fi";
import {
  useStartWfa,
  usePauseWfa,
  useResumeWfa,
  useCompleteWfa,
} from "@/app-hooks/useValidationPipeline";
import { ValidationPipeline } from "@/graphql/gql/graphql";

export type WfaWizardProps = {
  pipelineId: string;
  pipeline: ValidationPipeline;
  onComplete: () => void;
};

type WfaStatus = "IDLE" | "RUNNING" | "PAUSED" | "DONE";

interface WfaConfigState {
  trainRatio: number;
  windows: number;
  minConsistency: number;
  status: WfaStatus;
  processedCandidates: number;
  totalCandidates: number;
}

export function WfaWizard({
  pipelineId,
  pipeline,
  onComplete,
}: WfaWizardProps) {
  const wfaConfig = pipeline.wfaConfig as WfaConfigState | null;

  const [trainRatio, setTrainRatio] = useState(wfaConfig?.trainRatio ?? 0.7);
  const [windows, setWindows] = useState(wfaConfig?.windows ?? 3);
  const [minConsistency, setMinConsistency] = useState(
    wfaConfig?.minConsistency ?? 0.6,
  );

  const { startWfa, loading: starting } = useStartWfa();
  const { pauseWfa, loading: pausing } = usePauseWfa();
  const { resumeWfa, loading: resuming } = useResumeWfa();
  const { completeWfa, loading: completing } = useCompleteWfa();
  const wfaStatus: WfaStatus = wfaConfig?.status ?? "IDLE";
  const processedCandidates = wfaConfig?.processedCandidates ?? 0;
  const totalCandidates = wfaConfig?.totalCandidates ?? 0;
  const progressPercent =
    totalCandidates > 0
      ? Math.round((processedCandidates / totalCandidates) * 100)
      : 0;

  const isRunning = wfaStatus === "RUNNING";
  const isPaused = wfaStatus === "PAUSED";
  const canApprove = wfaStatus === "DONE" || wfaStatus === "PAUSED";

  // Derive pass/fail from pipeline stats (passedWfa is updated via subscription)
  const passedWfa = pipeline.passedWfa ?? 0;
  const failedWfa = processedCandidates - passedWfa;

  const handleStart = async () => {
    await startWfa({
      variables: {
        input: { pipelineId, trainRatio, windows, minConsistency },
      },
    });
  };

  const handlePause = async () => {
    await pauseWfa({ variables: { pipelineId } });
  };

  const handleResume = async () => {
    await resumeWfa({ variables: { pipelineId } });
  };

  const handleComplete = async () => {
    await completeWfa({ variables: { pipelineId } });
    onComplete();
  };

  return (
    <Card className="border-primary-500/30 border-2">
      <CardHeader className="flex flex-col items-start gap-2 border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-2">
          <FiBarChart2 className="text-primary-400 h-5 w-5" />
          <h3 className="text-primary-300 text-lg font-semibold">
            Step 4: Walk-Forward Analysis
          </h3>
        </div>
        <p className="text-sm text-neutral-400">
          Configure WFA parameters and start the analysis. Track progress in
          real-time. Approve when satisfied.
        </p>
      </CardHeader>

      <CardBody className="flex flex-col gap-4 py-4">
        {/* Configuration form */}
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="mb-3 text-sm font-medium text-neutral-300">
            WFA Configuration
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <span className="mb-2 block text-sm text-neutral-400">
                Train Ratio: {(trainRatio * 100).toFixed(0)}%
              </span>
              <Slider
                step={0.05}
                minValue={0.5}
                maxValue={0.9}
                value={trainRatio}
                onChange={(v) => setTrainRatio(v as number)}
                className="max-w-md"
                isDisabled={isRunning}
              />
            </div>
            <Input
              label="Number of Windows"
              type="number"
              min={1}
              max={10}
              value={windows.toString()}
              onValueChange={(v) => setWindows(parseInt(v) || 3)}
              variant="bordered"
              size="sm"
              className="max-w-xs"
              isDisabled={isRunning}
            />
            <div>
              <span className="mb-2 block text-sm text-neutral-400">
                Min Consistency: {(minConsistency * 100).toFixed(0)}%
              </span>
              <Slider
                step={0.05}
                minValue={0.3}
                maxValue={0.9}
                value={minConsistency}
                onChange={(v) => setMinConsistency(v as number)}
                className="max-w-md"
                isDisabled={isRunning}
              />
            </div>
          </div>
        </div>

        {/* Progress section — visible when running or completed */}
        {wfaStatus !== "IDLE" && (
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-neutral-300">
                Progress
              </span>
              <span className="text-sm text-neutral-400">
                {processedCandidates}/{totalCandidates} candidates
              </span>
            </div>
            <Progress
              value={progressPercent}
              color={
                wfaStatus === "DONE"
                  ? "success"
                  : wfaStatus === "PAUSED"
                    ? "warning"
                    : "primary"
              }
              className="mb-3"
            />
            <div className="flex items-center gap-6 text-sm">
              <span className="text-neutral-400">
                Passed:{" "}
                <span className="text-success-400 font-medium">
                  {passedWfa}
                </span>
              </span>
              <span className="text-neutral-400">
                Failed:{" "}
                <span className="text-danger-400 font-medium">
                  {failedWfa > 0 ? failedWfa : 0}
                </span>
              </span>
              <span className="text-neutral-400">
                Status:{" "}
                <span
                  className={
                    wfaStatus === "RUNNING"
                      ? "text-primary-400"
                      : wfaStatus === "DONE"
                        ? "text-success-400"
                        : wfaStatus === "PAUSED"
                          ? "text-warning-400"
                          : "text-neutral-300"
                  }
                >
                  {wfaStatus}
                </span>
              </span>
            </div>
          </div>
        )}
      </CardBody>

      <CardFooter className="flex items-center gap-3 border-t border-neutral-800 pt-4">
        {/* Start button — shown when IDLE */}
        {wfaStatus === "IDLE" && (
          <Button
            color="primary"
            size="sm"
            startContent={<FiPlay className="h-4 w-4" />}
            onPress={handleStart}
            isLoading={starting}
          >
            Start WFA
          </Button>
        )}

        {/* Pause button — shown when RUNNING */}
        {isRunning && (
          <Button
            color="warning"
            variant="flat"
            size="sm"
            startContent={<FiPause className="h-4 w-4" />}
            onPress={handlePause}
            isLoading={pausing}
          >
            Pause
          </Button>
        )}

        {/* Resume button — shown when PAUSED */}
        {isPaused && (
          <Button
            color="primary"
            size="sm"
            startContent={<FiPlay className="h-4 w-4" />}
            onPress={handleResume}
            isLoading={resuming}
          >
            Resume
          </Button>
        )}

        {/* Restart button — shown when PAUSED or DONE */}
        {(isPaused || wfaStatus === "DONE") && (
          <Button
            color="primary"
            variant="flat"
            size="sm"
            startContent={<FiRefreshCw className="h-4 w-4" />}
            onPress={handleStart}
            isLoading={starting}
          >
            Restart
          </Button>
        )}

        {/* Approve button — shown when PAUSED or DONE */}
        {canApprove && (
          <Button
            color="success"
            size="sm"
            startContent={<FiCheck className="h-4 w-4" />}
            onPress={handleComplete}
            isLoading={completing}
          >
            Approve & Continue
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
