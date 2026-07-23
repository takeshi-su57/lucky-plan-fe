import { CircularProgress, Tooltip } from "@heroui/react";
import { useEffect, useState } from "react";
import { publicClients } from "@/utils/web3";
import { ServiceStatus } from "@/types";

export type ContractCircularProgressProps = {
  chainId: number;
  fromBlock: number;
  toBlock: number;
  currentBlock: number;
  status: ServiceStatus;
};

export function ContractCircularProgress({
  chainId,
  fromBlock,
  toBlock,
  currentBlock,
  status,
}: ContractCircularProgressProps) {
  const [lastBlock, setLastBlock] = useState(0);

  useEffect(() => {
    const fetchLastBlock = async () => {
      const block = await publicClients[chainId].getBlockNumber();
      setLastBlock(Number(block));
    };

    fetchLastBlock();

    const interval = setInterval(fetchLastBlock, 60_000);
    return () => clearInterval(interval);
  }, [chainId]);

  const endBlock = toBlock > 0 ? toBlock : lastBlock;
  const percentage =
    endBlock > fromBlock
      ? Math.min(
          100,
          Math.max(
            0,
            ((currentBlock - fromBlock) / (endBlock - fromBlock)) * 100,
          ),
        )
      : 0;

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-2 text-xs">
          <span>From: {fromBlock}</span>
          <span>To: {endBlock}</span>
          <span>Current: {currentBlock}</span>
          <span>Last: {lastBlock}</span>
        </div>
      }
    >
      <CircularProgress
        color={status === ServiceStatus.READY ? "success" : "warning"}
        label={status}
        classNames={{ label: "capitalize" }}
        showValueLabel={true}
        size="lg"
        value={percentage}
      />
    </Tooltip>
  );
}
