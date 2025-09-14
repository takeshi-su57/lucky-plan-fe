import { Chip } from "@nextui-org/react";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { GoUnverified } from "react-icons/go";
import { VirtualBotParams } from "@/types";

export type VirtualBotItemProps = {
  virtualBot: VirtualBotParams;
};

export function VirtualBotItem({ virtualBot }: VirtualBotItemProps) {
  return (
    <div className="flex w-full justify-between gap-2 text-xs">
      <div className="flex flex-col gap-2">
        <span>Address: {virtualBot.leaderAddress}</span>
      </div>

      {virtualBot.strategy && virtualBot.followerContract ? (
        <Chip color="success">
          <div className="flex flex-row items-center gap-2">
            <RiVerifiedBadgeLine size={20} />
            <span>Valid Strategy</span>
          </div>
        </Chip>
      ) : (
        <Chip color="danger">
          <div className="flex flex-row items-center gap-2">
            <GoUnverified size={24} />
            <span>Invalid Strategy</span>
          </div>
        </Chip>
      )}
    </div>
  );
}
