import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { GnsIcon } from "@/components/icons/protocols/GnsIcon";
import { GmxIcon } from "@/components/icons/protocols/GmxIcon";
import { AvntIcon } from "@/components/icons/protocols/AvntIcon";
import { EthereumIcon } from "@/components/icons/chains/EthereumIcon";
import { ArbitrumIcon } from "@/components/icons/chains/ArbitrumIcon";
import { BaseIcon } from "@/components/icons/chains/BaseIcon";
import { PolygonIcon } from "@/components/icons/chains/PolygonIcon";
import { MegaEthIcon } from "@/components/icons/chains/MegaEthIcon";
import { AGGREGATE_VOLUME, CHAIN_COUNT } from "./data/protocols";

const chainPills = [
  { name: "Arbitrum", Icon: ArbitrumIcon },
  { name: "Base", Icon: BaseIcon },
  { name: "Polygon", Icon: PolygonIcon },
  { name: "MegaETH", Icon: MegaEthIcon },
  { name: "Ethereum", Icon: EthereumIcon },
];

export function HeroSection() {
  return (
    <section className="flex flex-col items-center px-6 pb-20 pt-32 text-center md:pb-28 md:pt-40">
      <span className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-600">
        v0.1.0 &middot; Open Source &middot;
        <span className="inline-flex items-center gap-1.5">
          <GnsIcon size={14} /> GNS
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GmxIcon size={14} /> GMX
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AvntIcon size={14} /> AVNT
        </span>
      </span>

      <h1 className="mt-8 max-w-3xl text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
        The analytics layer for perpetual DEX trading
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
        Full leaderboard analytics and deterministic backtesting for algorithmic
        strategies across gTrade, GMX, and Avantis. Multi-chain. Verifiable.
        Open source.
      </p>

      <p className="mt-4 font-mono text-sm text-green-600">
        Tracking {AGGREGATE_VOLUME} in perp volume across {CHAIN_COUNT} chains
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <a
          href="https://github.com/takeshi-su57/lucky-plan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          <GitHubIcon size={18} />
          View on GitHub
        </a>
        <a
          href="#infrastructure"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900"
        >
          <ExternalLinkIcon size={18} />
          Explore the Platform
        </a>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
        {chainPills.map(({ name, Icon }) => (
          <span
            key={name}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600"
          >
            <Icon size={14} />
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
