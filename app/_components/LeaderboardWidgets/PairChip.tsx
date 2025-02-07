import { useGetAllTradePairs } from "@/app/_hooks/useContract";
import PairIcon from "./PairIcon";

export function PairChip({
  contractId,
  pairIndex,
  count,
}: {
  contractId: number;
  pairIndex: number;
  count: number;
}) {
  const pairs = useGetAllTradePairs(contractId);

  const pair = pairs.find((pair) => pair.pairIndex === pairIndex);

  if (!pair) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <PairIcon from={pair.from} to={pair.to} width={32} height={32} />

      <div className="flex flex-col text-xs text-neutral-400">
        <span className="text-sm">
          {pair.from}/{pair.to}
        </span>

        <span className="text-nowrap">
          {pairIndex} th - {count} times
        </span>
      </div>
    </div>
  );
}
