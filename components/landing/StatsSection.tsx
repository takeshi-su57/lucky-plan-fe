import {
  AGGREGATE_VOLUME,
  AGGREGATE_TRADERS,
  AGGREGATE_PAIRS,
  PROTOCOL_COUNT,
  CHAIN_COUNT,
} from "./data/protocols";

const stats = [
  { label: "Combined Volume", value: AGGREGATE_VOLUME, emphasis: true },
  { label: "Protocols", value: String(PROTOCOL_COUNT) },
  { label: "EVM Chains", value: String(CHAIN_COUNT) },
  { label: "Max Leverage", value: "500x" },
  { label: "Trading Pairs", value: AGGREGATE_PAIRS },
  { label: "Active Traders", value: AGGREGATE_TRADERS },
];

export function StatsSection() {
  return (
    <section className="border-y border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-neutral-200 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-neutral-50 px-4 py-8 text-center"
          >
            <span
              className={`text-2xl font-bold tracking-tight md:text-3xl ${
                stat.emphasis ? "text-green-600" : "text-neutral-900"
              }`}
            >
              {stat.value}
            </span>
            <span className="mt-1 text-xs font-medium text-neutral-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
