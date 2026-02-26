import { SectionContainer } from "./SectionContainer";

const problems = [
  {
    title: "Perp DEX data is siloed",
    description:
      "GNS, GMX, and AVNT each have their own data formats, APIs, and leaderboards. No unified view across protocols or chains.",
  },
  {
    title: "Leaderboards are incomplete",
    description:
      "Existing leaderboards show PnL but hide risk metrics, drawdowns, and position history. Surface-level rankings mislead followers.",
  },
  {
    title: "Backtesting perp strategies is manual",
    description:
      "No standard tooling exists for backtesting algorithmic strategies against historical perp DEX data. Most traders rely on spreadsheets.",
  },
  {
    title: "Performance claims are unverifiable",
    description:
      "Strategy results live in screenshots. No reproducible proof. No on-chain attestation. No way to independently audit execution history.",
  },
];

export function ProblemSection() {
  return (
    <SectionContainer id="problems">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Perpetual DEX trading lacks infrastructure
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          Fragmented data. Incomplete analytics. No backtesting standard.
          Performance claims you cannot verify. This is the gap we are closing.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {problems.map((problem) => (
          <div
            key={problem.title}
            className="rounded-xl border border-neutral-200 border-l-2 border-l-green-600/60 bg-neutral-50 p-6"
          >
            <h3 className="text-lg font-semibold text-neutral-900">
              {problem.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {problem.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-neutral-100 pt-6">
        <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
          Protocols backed by
        </span>
        {["Pantera Capital", "Coinbase Ventures", "Chainlink"].map(
          (backer) => (
            <span
              key={backer}
              className="text-sm font-medium text-neutral-600"
            >
              {backer}
            </span>
          ),
        )}
      </div>
    </SectionContainer>
  );
}
