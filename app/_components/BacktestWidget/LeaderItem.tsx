import { getPriceStr } from "@/utils/price";
import { ContractItem } from "@/types";

export type LeaderParams = {
  virtualId: string;
  leaderCollateral: number;
  address: string;
  contract: ContractItem;
};

export function LeaderItem({ params }: { params: LeaderParams }) {
  const { address, contract, leaderCollateral } = params;

  return (
    <div className="flex flex-col gap-2 text-xs">
      <span>Address: {address}</span>

      <div className="flex flex-row gap-2">
        <span>Contract ID: {contract.contractId}</span>
        <span>Chain ID: {contract.chainId}</span>
        <span>Leader Collateral: {getPriceStr(leaderCollateral)} USDC</span>
      </div>
    </div>
  );
}
