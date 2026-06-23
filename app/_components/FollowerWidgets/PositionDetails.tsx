"use client";

import { useState } from "react";
import { Button, Divider, useDisclosure } from "@heroui/react";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";

import { useCloseTradeMarket, useGetAllSLTPS } from "@/app-hooks/useFollower";
import { MissionForwardDetails, Platform } from "@/graphql/gql/graphql";
import { RightDrawer } from "@/components/modals/RightDrawer";
import { MissionDetails } from "../MissionWidgets/MissionDetails";
import { SlUpdateButton } from "./SlUpdateButton";
import { TpUpdateButton } from "./TpUpdateButton";
import { WithdrawPositivePnlButton } from "./WithdrawPositivePnlButton";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { UpdateLeverageButton } from "./UpdateLeverageButton";
import { IncreasePositionButton } from "./IncreasePositionButton";
import { DecreasePositionButton } from "./DecreasePositionButton";
import { SLTPEditorButton } from "./SLTPEditorButton";
import { SLTPCard } from "./SLTPCard";
import { PerpEventLogPnlChart } from "../LeaderboardWidgets/PerpEventLogPnlChart/PerpEventLogPnlChart";
import { getGnsPositionKey } from "@/web3/gns/utils";
import { getCollateral } from "@/web3/gns/v10/configs";
import { Address, isAddress } from "viem";

export type PositionDetailsProps = {
  address: string;
  index: number;
  contractId: number;
  params: string;
  mission: MissionForwardDetails | null;
  chainId: number | null;
  diamondAddress: string;
};

export function PositionDetails({
  address,
  index,
  contractId,
  params,
  mission,
  chainId,
  diamondAddress,
}: PositionDetailsProps) {
  const {
    isOpen: isMissionDrawerOpen,
    onOpenChange: onMissionDrawerOpenChange,
    onOpen: onMissionDrawerOpen,
  } = useDisclosure();
  const {
    isOpen: isEventLogsDrawerOpen,
    onOpenChange: onEventLogsDrawerOpenChange,
    onOpen: onEventLogsDrawerOpen,
  } = useDisclosure();
  const [eventLogsPlatform, setEventLogsPlatform] = useState<Platform>(
    Platform.Gns,
  );

  const sltps = useGetAllSLTPS(address, index);

  const { closeTradeMarket, loading } = useCloseTradeMarket();

  const trade = JSON.parse(params);

  const openPrice = trade?.openPrice ? Number(trade.openPrice) / 1e10 : 0;

  const tradeCollateral =
    chainId && trade?.collateralIndex
      ? getCollateral(chainId, trade.collateralIndex)
      : null;
  const tradePrecision = tradeCollateral
    ? Number(tradeCollateral.precision)
    : 1e6;

  const collateralAmount = trade?.collateralAmount
    ? Number(trade.collateralAmount) / tradePrecision
    : 0;

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

  const eventLogsAddress = mission?.tasks[0]?.action?.address;
  const isEventLogsAddressValid =
    !!eventLogsAddress && isAddress(eventLogsAddress);

  const handleOpenEventLogs = (platform: Platform) => {
    if (!isEventLogsAddressValid) {
      return;
    }

    setEventLogsPlatform(platform);
    onEventLogsDrawerOpen();
  };

  return (
    <div className="flex flex-col gap-2 border-t border-t-neutral-400/20 py-6">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <JsonView
            data={trade}
            shouldExpandNode={allExpanded}
            style={defaultStyles}
          />
        </div>

        <div className="flex flex-col gap-4">
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
              precision={tradePrecision}
              chainId={chainId}
              diamondAddress={diamondAddress}
              collateralIndex={trade.collateralIndex}
            />

            <DecreasePositionButton
              address={address}
              contractId={contractId}
              index={index}
              pairIndex={+trade.pairIndex}
              precision={tradePrecision}
              chainId={chainId}
              diamondAddress={diamondAddress}
              collateralIndex={trade.collateralIndex}
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
              pairIndex={+trade.pairIndex}
              long={Boolean(trade.long)}
            />

            <TpUpdateButton
              address={address}
              contractId={contractId}
              index={index}
              pairIndex={+trade.pairIndex}
              long={Boolean(trade.long)}
            />

            <WithdrawPositivePnlButton
              address={address}
              contractId={contractId}
              index={index}
            />
          </div>

          <Divider />

          {mission ? (
            <div className="flex flex-row items-center gap-4">
              <Button
                color="primary"
                size="sm"
                isDisabled={!isEventLogsAddressValid}
                onPress={() => handleOpenEventLogs(Platform.Gmx)}
              >
                GMX Event Logs
              </Button>
              <Button
                color="primary"
                size="sm"
                isDisabled={!isEventLogsAddressValid}
                onPress={() => handleOpenEventLogs(Platform.Gns)}
              >
                GNS Event Logs
              </Button>

              <Button onPress={onMissionDrawerOpen} color="primary" size="sm">
                Mission Details
              </Button>
            </div>
          ) : null}

          <Divider />

          <SLTPEditorButton
            address={address.toLowerCase()}
            contractId={contractId}
            positionKey={getGnsPositionKey(address.toLowerCase(), trade.index)}
            pairIndex={+trade.pairIndex}
            isLong={Boolean(trade.long)}
            leverage={+trade.leverage / 1000}
            openPrice={openPrice}
            collateralAmount={collateralAmount}
          />

          <div className="flex flex-wrap items-start gap-4">
            {sltps.map((item) => (
              <SLTPCard key={item.id} id={item.id} condition={item.condition} />
            ))}
          </div>
        </div>
      </div>

      <RightDrawer
        isOpen={isMissionDrawerOpen}
        isDismissable={false}
        onOpenChange={onMissionDrawerOpenChange}
        classNames={{ base: "max-w-[80%]" }}
      >
        <div className="flex w-full flex-col gap-6">
          {mission ? (
            <MissionDetails mission={mission} followerContractId={contractId} />
          ) : null}
        </div>
      </RightDrawer>

      <RightDrawer
        isOpen={isEventLogsDrawerOpen}
        isDismissable={false}
        onOpenChange={onEventLogsDrawerOpenChange}
        classNames={{ base: "max-w-[80%]" }}
      >
        <div className="flex w-full flex-col gap-6">
          {isEventLogsAddressValid ? (
            <PerpEventLogPnlChart
              address={eventLogsAddress as Address}
              platform={eventLogsPlatform}
              mode="expert"
              cols={1}
              startedAt={null}
              stoppedAt={null}
              endedAt={null}
            />
          ) : null}
        </div>
      </RightDrawer>
    </div>
  );
}
