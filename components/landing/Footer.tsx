import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { protocols, chains } from "./data/protocols";
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

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-10 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="text-sm font-semibold text-neutral-700">
              Lucky<span className="text-green-600">Plans</span>
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Perp DEX Analytics &amp; Backtesting Infrastructure
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Protocols
            </h4>
            <ul className="mt-3 space-y-2">
              {protocols.map((p) => {
                const Icon = protocolIcons[p.id];
                return (
                  <li key={p.id}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                      {Icon && <Icon size={14} />}
                      {p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Chains
            </h4>
            <ul className="mt-3 space-y-2">
              {chains.map((c) => {
                const Icon = chainIcons[c.id];
                return (
                  <li key={c.id}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                    >
                      {Icon && <Icon size={14} />}
                      {c.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
              Project
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://github.com/takeshi-su57/lucky-plan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  <GitHubIcon size={14} />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#proof"
                  className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
                >
                  Artifacts
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400">
          MIT License &middot; 2026
        </div>
      </div>
    </footer>
  );
}
