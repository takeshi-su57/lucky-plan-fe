"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";

import { useCloseTradeMarket } from "@/app-hooks/useFollower";
import {
  MissionExtForwardDetails,
  MissionForwardDetails,
} from "@/graphql/gql/graphql";
import { RightDrawer } from "@/components/modals/RightDrawer";
import { MissionDetails } from "../MissionWidgets/MissionDetails";
import { AnalyzeButton } from "../ExpertWidgets/AnalyzeButton";
import { SlUpdateButton } from "./SlUpdateButton";
import { TpUpdateButton } from "./TpUpdateButton";
import { WithdrawPositivePnlButton } from "./WithdrawPositivePnlButton";

export type PositionDetailsProps = {
  address: string;
  index: number;
  params: string;
  followerContractId: number;
  mission: MissionExtForwardDetails | null;
};

export function PositionDetails({
  address,
  index,
  params,
  followerContractId,
  mission,
}: PositionDetailsProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const { closeTradeMarket, loading } = useCloseTradeMarket();

  const trade = JSON.parse(params);

  const handleClosePosition = () => {
    if (trade.pairIndex === undefined) {
      return;
    }

    const pairIndex = +trade.pairIndex;

    if (Number.isNaN(pairIndex)) {
      return;
    }

    closeTradeMarket({
      variables: {
        input: {
          address,
          contractId: followerContractId,
          pairIndex,
          index,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 border-t border-t-neutral-400/20 py-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <Button
          onClick={handleClosePosition}
          color="danger"
          className="w-fit"
          size="sm"
          isDisabled={loading}
          isLoading={loading}
        >
          Close Position
        </Button>

        <SlUpdateButton
          address={address}
          contractId={followerContractId}
          index={index}
        />

        <TpUpdateButton
          address={address}
          contractId={followerContractId}
          index={index}
        />

        <WithdrawPositivePnlButton
          address={address}
          contractId={followerContractId}
          index={index}
        />

        {mission ? (
          <div className="flex flex-row items-center gap-4">
            <AnalyzeButton address={mission.targetPosition.address} />

            <Button onClick={onOpen} color="primary" size="sm">
              Mission Details
            </Button>
          </div>
        ) : null}
      </div>

      <JSONTree data={trade} />

      <RightDrawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{ base: "max-w-[80%]" }}
      >
        <div className="flex w-full flex-col gap-6">
          {mission ? (
            <MissionDetails
              mission={mission as MissionForwardDetails}
              leaderContractId={mission.bot.leaderContractId}
              followerContractId={followerContractId}
            />
          ) : null}
        </div>
      </RightDrawer>
    </div>
  );
}
