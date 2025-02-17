export function LeaderItem({
  contractId,
  address,
}: {
  contractId: number;
  address: string;
}) {
  return (
    <div className="flex flex-col gap-2 text-xs">
      <span>Address: {address}</span>
      <span>Contract ID: {contractId}</span>
    </div>
  );
}
