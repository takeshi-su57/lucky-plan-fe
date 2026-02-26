import { SectionContainer } from "./SectionContainer";
import { CpuIcon } from "@/components/icons/CpuIcon";
import { ZapIcon } from "@/components/icons/ZapIcon";
import { ChartBarIcon } from "@/components/icons/ChartBarIcon";
import { ShieldCheckIcon } from "@/components/icons/ShieldCheckIcon";
import { SVGProps } from "@/components/icons/types";

interface Module {
  title: string;
  description: string;
  icon: (props: SVGProps) => React.ReactNode;
}

const modules: Module[] = [
  {
    title: "Perp DEX Leaderboard",
    icon: ChartBarIcon,
    description:
      "Unified leaderboard across GNS, GMX, and AVNT. Full trader profiles with PnL, drawdown, Sharpe ratio, win rate, and position history. Multi-chain, real-time.",
  },
  {
    title: "Backtesting Engine",
    icon: CpuIcon,
    description:
      "Deterministic backtesting against version-pinned historical perp DEX data. Fixed random seeds, explicit parameter hashing, reproducible outputs across runs.",
  },
  {
    title: "Execution Analytics",
    icon: ZapIcon,
    description:
      "Full order lifecycle tracking across perpetual protocols. Every open, close, liquidation, and fee \u2014 indexed, normalized, and queryable via GraphQL.",
  },
  {
    title: "On-chain Attestation",
    icon: ShieldCheckIcon,
    description:
      "Strategy config and performance outputs are SHA-256 hashed and anchored to EVM chains. Independently verifiable by anyone with the transaction hash.",
  },
];

export function InfrastructureSection() {
  return (
    <SectionContainer id="infrastructure">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Core Platform
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          Two products. One data layer. Full coverage across perpetual DEX
          protocols on EVM chains.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {modules.map((mod) => (
          <div
            key={mod.title}
            className="rounded-xl border border-neutral-200 bg-neutral-50 p-6"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <mod.icon size={20} fill="#16a34a" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">
              {mod.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {mod.description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
