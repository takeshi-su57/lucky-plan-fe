"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { JSONTree } from "react-json-tree";

import { useCloseTradeMarket } from "@/app-hooks/useFollower";
import { MissionForwardDetails, Platform } from "@/graphql/gql/graphql";
import { RightDrawer } from "@/components/modals/RightDrawer";
import { MissionDetails } from "../MissionWidgets/MissionDetails";
import { SlUpdateButton } from "./SlUpdateButton";
import { TpUpdateButton } from "./TpUpdateButton";
import { WithdrawPositivePnlButton } from "./WithdrawPositivePnlButton";
import { EventLogsModalButton } from "../LeaderboardWidgets/EventLogsModalButton";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { UpdateLeverageButton } from "./UpdateLeverageButton";
import { IncreasePositionButton } from "./IncreasePositionButton";
import { DecreasePositionButton } from "./DecreasePositionButton";

export type PositionDetailsProps = {
  address: string;
  index: number;
  contractId: number;
  params: string;
  mission: MissionForwardDetails | null;
};

export function PositionDetails({
  address,
  index,
  contractId,
  params,
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
          contractId,
          pairIndex,
          index,
        },
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 border-t border-t-neutral-400/20 py-6">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          <ButtonWithConfirm
            onPress={handleClosePosition}
            color="danger"
            className="w-fit"
            size="sm"
            isDisabled={loading}
            isLoading={loading}
          >
            Close Position
          </ButtonWithConfirm>

          <IncreasePositionButton
            address={address}
            contractId={contractId}
            index={index}
            pairIndex={+trade.pairIndex}
          />

          <DecreasePositionButton
            address={address}
            contractId={contractId}
            index={index}
            pairIndex={+trade.pairIndex}
          />

          <UpdateLeverageButton
            address={address}
            contractId={contractId}
            index={index}
          />

          <SlUpdateButton
            address={address}
            contractId={contractId}
            index={index}
          />

          <TpUpdateButton
            address={address}
            contractId={contractId}
            index={index}
          />

          <WithdrawPositivePnlButton
            address={address}
            contractId={contractId}
            index={index}
          />
        </div>

        {mission ? (
          <div className="flex flex-row items-center gap-4">
            <EventLogsModalButton
              address={mission.tasks[0]?.action?.address}
              platform={Platform.Gmx}
              label="GMX Event Logs"
            />
            <EventLogsModalButton
              address={mission.tasks[0]?.action?.address}
              platform={Platform.Gns}
              label="GNS Event Logs"
            />

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
            <MissionDetails mission={mission} followerContractId={contractId} />
          ) : null}
        </div>
      </RightDrawer>
    </div>
  );
}
