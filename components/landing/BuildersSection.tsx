import { SectionContainer } from "./SectionContainer";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";

const resources = [
  {
    title: "Leaderboard API",
    description:
      "GraphQL API for querying trader rankings, PnL history, and performance metrics across protocols.",
    status: "In progress",
  },
  {
    title: "Backtest SDK",
    description:
      "TypeScript SDK for submitting strategies and running deterministic backtests against historical perp data.",
    status: "Planned",
  },
  {
    title: "Data Model",
    description:
      "Canonical types for traders, positions, strategies, backtests, and attestations across GNS, GMX, and AVNT.",
    status: "In progress",
  },
  {
    title: "Hashing Schema",
    description:
      "SHA-256 input format for strategy configs, data versions, and execution outputs.",
    status: "In progress",
  },
  {
    title: "Contract Spec",
    description:
      "Attestation contract interface for anchoring backtest results and performance proofs on-chain.",
    status: "Planned",
  },
  {
    title: "Architecture Guide",
    description:
      "System design: data ingestion pipeline, indexer architecture, and multi-chain deployment topology.",
    status: "Planned",
  },
];

export function BuildersSection() {
  return (
    <SectionContainer id="developers">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          For Builders
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          Everything needed to query, integrate, or extend the platform.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <div
            key={resource.title}
            className="flex flex-col justify-between rounded-lg border border-neutral-200 bg-white p-5"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-neutral-900">
                  {resource.title}
                </h3>
                <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-500">
                  {resource.status}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
                {resource.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <a
          href="https://github.com/takeshi-su57/lucky-plan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          <GitHubIcon size={16} />
          Browse the source
        </a>
        <a
          href="https://github.com/takeshi-su57/lucky-plan#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600 transition-colors hover:text-green-700"
        >
          Read the docs
          <ExternalLinkIcon size={14} />
        </a>
      </div>
    </SectionContainer>
  );
}
