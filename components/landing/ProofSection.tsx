import { SectionContainer } from "./SectionContainer";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";

const artifacts = [
  {
    label: "Repository",
    value: "github.com/takeshi-su57/lucky-plan",
    href: "https://github.com/takeshi-su57/lucky-plan",
  },
  {
    label: "Documentation",
    value: "README.md in repo",
    href: "https://github.com/takeshi-su57/lucky-plan#readme",
  },
  {
    label: "Protocols",
    value: "GNS, GMX, AVNT",
    href: null,
  },
  {
    label: "Chains",
    value: "Arbitrum, Polygon, Base, Avalanche, MegaETH, Ethereum",
    href: null,
  },
  {
    label: "Version",
    value: "v0.1.0-alpha",
    href: null,
  },
  {
    label: "Last updated",
    value: "February 2026",
    href: null,
  },
];

export function ProofSection() {
  return (
    <SectionContainer id="proof">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Artifacts
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          Everything verifiable. Nothing behind a login wall.
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
        <dl className="space-y-5">
          {artifacts.map((artifact) => (
            <div
              key={artifact.label}
              className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4"
            >
              <dt className="text-sm font-medium text-neutral-500 sm:w-36 sm:shrink-0">
                {artifact.label}
              </dt>
              <dd className="text-sm text-neutral-900">
                {artifact.href ? (
                  <a
                    href={artifact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-green-600 transition-colors hover:text-green-700"
                  >
                    {artifact.value}
                    <ExternalLinkIcon size={14} />
                  </a>
                ) : (
                  <span className="font-mono">{artifact.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          Open Source
        </span>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
          MIT License
        </span>
        <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
          Multi-chain EVM
        </span>
      </div>
    </SectionContainer>
  );
}
