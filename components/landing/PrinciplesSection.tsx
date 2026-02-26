import { SectionContainer } from "./SectionContainer";

const principles = [
  {
    title: "Deterministic execution",
    description: "No hidden randomness. Same inputs, same outputs, every time.",
  },
  {
    title: "Version-pinned datasets",
    description:
      "Historical data is versioned and immutable. Backtest results are tied to a specific data snapshot.",
  },
  {
    title: "Idempotent pipeline",
    description:
      "Re-run any stage of the pipeline and get identical results. No side effects, no drift.",
  },
  {
    title: "Explicit parameter hashing",
    description:
      "Every strategy config is hashed before execution. The hash is the identity of the run.",
  },
  {
    title: "Contract-verified anchoring",
    description:
      "Result hashes are written to EVM smart contracts. Verification requires only a transaction hash.",
  },
  {
    title: "Zero trust by default",
    description:
      "No results are trusted without proof. Every claim is backed by reproducible artifacts.",
  },
];

export function PrinciplesSection() {
  return (
    <SectionContainer id="principles">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Engineering Principles
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          The constraints that shape every design decision in this system.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle) => (
          <div key={principle.title} className="rounded-lg border border-neutral-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-neutral-900">
              {principle.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
