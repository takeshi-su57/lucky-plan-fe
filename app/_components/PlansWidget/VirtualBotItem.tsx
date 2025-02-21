import { MdOutlineVerifiedUser } from "react-icons/md";
import { getPriceStr } from "@/utils/price";
import { VirtualBotParams } from "@/types";

export type VirtualBotItemProps = {
  virtualBot: VirtualBotParams;
};

export function VirtualBotItem({ virtualBot }: VirtualBotItemProps) {
  return (
    <div className="flex flex-col gap-2 text-xs">
      <span>Address: {virtualBot.leaderAddress}</span>
      <span>Contract ID: {virtualBot.leaderContract.contractId}</span>
      <span>
        Leader Collateral: {getPriceStr(virtualBot.leaderCollateralBaseline)}{" "}
        USDC
      </span>

      {virtualBot.strategy && virtualBot.followerContract && (
        <div className="flex flex-row items-center gap-2">
          <MdOutlineVerifiedUser />
          <span>Valid</span>
        </div>
      )}
    </div>
  );
}
