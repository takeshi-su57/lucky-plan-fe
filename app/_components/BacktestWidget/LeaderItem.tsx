export type LeaderParams = {
  contractId: number;
  address: string;
  leaderCollateral: number;
};

export function LeaderItem({ params }: { params: LeaderParams }) {
  const { address, contractId, leaderCollateral } = params;

  return (
    <div className="flex flex-col gap-2 text-xs">
      <span>Address: {address}</span>
      <span>Contract ID: {contractId}</span>
      <span>Leader Collateral: {leaderCollateral} USDC</span>
    </div>
  );
}
