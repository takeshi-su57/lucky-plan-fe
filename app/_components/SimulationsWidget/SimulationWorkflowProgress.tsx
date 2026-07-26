"use client";

type SimulationWorkflowProgressProps = {
  totalPlans: number;
  evaluatedPlans: number;
  materializedPlans: number;
  finalizedPlans: number;
};

type Stage = {
  label: string;
  count: number;
  color: string;
  dotColor: string;
};

const clamp = (value: number, maximum: number) =>
  Math.min(Math.max(value, 0), maximum);

export function SimulationWorkflowProgress({
  totalPlans,
  evaluatedPlans,
  materializedPlans,
  finalizedPlans,
}: SimulationWorkflowProgressProps) {
  const total = Math.max(totalPlans, 0);
  const evaluated = clamp(evaluatedPlans, total);
  const materialized = clamp(materializedPlans, evaluated);
  const finalized = clamp(finalizedPlans, materialized);
  const pendingEvaluation = total - evaluated;
  const materializedOnly = materialized - finalized;
  const evaluatedOnly = evaluated - materialized;
  const finalizedPercent = total ? (finalized / total) * 100 : 0;
  const width = (count: number) => (total ? `${(count / total) * 100}%` : "0%");
  const stages: Stage[] = [
    {
      label: "Evaluator",
      count: evaluated,
      color: "text-cyan-300",
      dotColor: "bg-cyan-400",
    },
    {
      label: "Materializer",
      count: materialized,
      color: "text-blue-300",
      dotColor: "bg-blue-400",
    },
    {
      label: "Finalizer",
      count: finalized,
      color: "text-violet-300",
      dotColor: "bg-violet-400",
    },
  ];

  return (
    <section
      aria-label="Workflow progress"
      className="border-default-100 bg-content2/30 rounded-xl border p-4"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div>
          <h2 className="text-sm font-semibold text-neutral-200">Workflow progress</h2>
          <p className="mt-0.5 text-xs text-neutral-500">
            Evaluator → Materializer → Finalizer
          </p>
        </div>
        <span className="text-sm font-semibold text-neutral-200">
          {finalizedPercent.toFixed(0)}% <span className="text-xs font-normal text-neutral-500">complete</span>
        </span>
      </div>

      <div
        aria-label={`${finalized} of ${total} plans finalized; ${materialized} materialized; ${evaluated} evaluated`}
        className="bg-default-100 mt-4 flex h-3 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={finalized}
      >
        <div className="bg-violet-500 transition-[width] duration-700 ease-out" style={{ width: width(finalized) }} />
        <div className="bg-blue-500 transition-[width] duration-700 ease-out" style={{ width: width(materializedOnly) }} />
        <div className="bg-cyan-500 transition-[width] duration-700 ease-out" style={{ width: width(evaluatedOnly) }} />
        <div className="bg-default-200/70 transition-[width] duration-700 ease-out" style={{ width: width(pendingEvaluation) }} />
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {stages.map((stage) => (
          <div key={stage.label} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex items-center gap-2 text-neutral-400">
              <span className={`h-2 w-2 rounded-full ${stage.dotColor}`} />
              {stage.label}
            </span>
            <span className={`font-medium tabular-nums ${stage.color}`}>
              {stage.count.toLocaleString()} / {total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
