import { SectionContainer } from "./SectionContainer";
import {
  protocols,
  chains,
  type Protocol,
  type Chain,
} from "./data/protocols";
import { GnsIcon } from "@/components/icons/protocols/GnsIcon";
import { GmxIcon } from "@/components/icons/protocols/GmxIcon";
import { AvntIcon } from "@/components/icons/protocols/AvntIcon";
import { EthereumIcon } from "@/components/icons/chains/EthereumIcon";
import { ArbitrumIcon } from "@/components/icons/chains/ArbitrumIcon";
import { BaseIcon } from "@/components/icons/chains/BaseIcon";
import { PolygonIcon } from "@/components/icons/chains/PolygonIcon";
import { MegaEthIcon } from "@/components/icons/chains/MegaEthIcon";
import type { SVGProps } from "@/components/icons/types";

const protocolIcons: Record<string, (props: SVGProps) => React.ReactNode> = {
  gns: GnsIcon,
  gmx: GmxIcon,
  avnt: AvntIcon,
};

const chainIcons: Record<string, (props: SVGProps) => React.ReactNode> = {
  ethereum: EthereumIcon,
  arbitrum: ArbitrumIcon,
  base: BaseIcon,
  polygon: PolygonIcon,
  megaeth: MegaEthIcon,
};

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="text-neutral-400">{label}</span>
      <span className="font-semibold text-neutral-800">{value}</span>
    </div>
  );
}

function ProtocolCard({ protocol }: { protocol: Protocol }) {
  const Icon = protocolIcons[protocol.id];
  return (
    <div
      className="rounded-xl border border-neutral-200 bg-white p-5"
      style={{ borderTopColor: protocol.color, borderTopWidth: 3 }}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon size={28} />}
        <div>
          <span className="text-base font-bold text-neutral-900">
            {protocol.name}
          </span>
          <span className="ml-2 text-xs font-medium text-neutral-400">
            {protocol.ticker}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600">
        {protocol.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <StatPill label="Volume" value={protocol.stats.totalVolume} />
        <StatPill label="Leverage" value={protocol.stats.maxLeverage} />
        {protocol.stats.pairs && (
          <StatPill label="Pairs" value={protocol.stats.pairs} />
        )}
        {protocol.stats.users !== "—" && (
          <StatPill label="Users" value={protocol.stats.users} />
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {protocol.chains.map((chainId) => {
          const ChainIcon = chainIcons[chainId];
          const chain = chains.find((c) => c.id === chainId);
          if (!chain) return null;
          return (
            <span
              key={chainId}
              className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500"
            >
              {ChainIcon && <ChainIcon size={10} />}
              {chain.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function ChainCard({ chain }: { chain: Chain }) {
  const Icon = chainIcons[chain.id];
  return (
    <a
      href={chain.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-lg border border-neutral-200 bg-white p-4 transition-colors hover:border-neutral-300"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ backgroundColor: `${chain.color}15` }}
      >
        {Icon && <Icon size={18} />}
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-neutral-900">
            {chain.name}
          </span>
          <span className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-neutral-700">
            {chain.stat.value}
          </span>
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
          {chain.description}
        </p>
      </div>
    </a>
  );
}

export function ChainsSection() {
  return (
    <SectionContainer id="chains">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
          Supported Platforms
        </h2>
        <p className="max-w-2xl text-base text-neutral-600">
          Indexing trader activity across major perpetual DEX protocols and EVM
          chains. Real data. Real volume. Real infrastructure.
        </p>
      </div>

      <div className="mt-12 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Protocols
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {protocols.map((protocol) => (
            <ProtocolCard key={protocol.id} protocol={protocol} />
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Chains
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chains.map((chain) => (
            <ChainCard key={chain.id} chain={chain} />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
