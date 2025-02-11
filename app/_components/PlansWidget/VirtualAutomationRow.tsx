import { VirtualBot } from "@/types";
import { shrinkAddress } from "@/utils";
import { Button, Checkbox, Chip, Divider } from "@nextui-org/react";
import { Address } from "viem";

export type VirtualAutomationRowProps = {
  bot: VirtualBot;
  isSelected: boolean;
  onChangeSelection: (virtualBot: VirtualBot, isSelected: boolean) => void;
  onEditAutomation: (virtualBot: VirtualBot) => void;
};

export function VirtualAutomationRow({
  bot,
  isSelected,
  onChangeSelection,
  onEditAutomation,
}: VirtualAutomationRowProps) {
  const strategy = bot.strategy;

  return (
    <div className="relative flex items-start justify-between">
      <Checkbox
        isSelected={isSelected}
        onValueChange={(value) => onChangeSelection(bot, value)}
        classNames={{
          base: "items-start",
          label: "flex flex-col",
        }}
      >
        <div className="flex flex-col gap-1">
          <Chip className="text-xs">{bot.virtualId}</Chip>

          <div className="flex items-center gap-1">
            <Chip className="text-xs">
              Contract: {bot.leaderContract.chainId}
            </Chip>
            <Chip className="text-xs">
              Leader: {shrinkAddress(bot.leaderAddress as Address)}
            </Chip>
          </div>

          <div className="flex items-center gap-1">
            <Chip className="text-xs">
              Contract: {bot.followerContract.chainId}
            </Chip>
            <Chip className="text-xs">
              Follower: {shrinkAddress(bot.followerAddress as Address)}
            </Chip>
          </div>

          <Divider />

          <div className="flex flex-col font-mono text-xs">
            <span>{`${strategy.strategyKey}, ${strategy.ratio}%)`}</span>

            <span>
              Collateral:
              {`(${Number(strategy.minCollateral)} ~ ${Number(strategy.maxCollateral)}) USDC`}
            </span>
            <span>
              Baseline:
              {`${Number(strategy.collateralBaseline)} USDC`}
            </span>
            <span>
              Leverage:
              {`(${strategy.minLeverage / 1000} ~ ${strategy.maxLeverage / 1000}) x`}
            </span>
          </div>
        </div>
      </Checkbox>

      <Button
        onClick={() => onEditAutomation(bot)}
        size="sm"
        className="absolute -top-1 right-2"
        variant="ghost"
      >
        Edit
      </Button>
    </div>
  );
}
