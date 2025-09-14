import PairIcon from "./PairIcon";

export function PairChip({ pairName }: { pairName: string }) {
  const [from, to] = pairName.split("/");

  return (
    <div className="flex items-center gap-2">
      <PairIcon from={from} to={to} width={32} height={32} />

      <div className="flex flex-col text-xs text-neutral-400">
        <span className="text-sm">{pairName}</span>
      </div>
    </div>
  );
}
