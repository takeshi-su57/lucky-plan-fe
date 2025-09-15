"use client";

import { useMemo } from "react";

import { convertTradeActionToHistory } from "@/utils/convertTradeActionToHistory";
import { getPriceStr } from "@/utils/price";
import { TradeActionType } from "@/types";

import { LabeledChip } from "@/components/chips/LabeledChip";
import { Action } from "@/graphql/gql/graphql";
import { useGetPrices } from "@/app-hooks/useGetPrices";
import { Skeleton } from "@nextui-org/react";
import { getPNLPercentage } from "@/utils";
import { useGetAllGnsContracts } from "@/app/_hooks/useContract";
import { getCollaterals } from "@/web3/gns/v10/configs";

export type ContractPnlProps = {
  label: string;
  contractId: number;
  finishedMissionActions: Action[][];
  openedMissionActions: Action[][];
  finished: boolean;
};

export function ContractPnl({
  label,
  contractId,
  finishedMissionActions,
  openedMissionActions,
  finished,
}: ContractPnlProps) {
  const gnsContracts = useGetAllGnsContracts();

  const prices = useGetPrices();

  const { totalPnl, count, positions } = useMemo(() => {
    const contract = gnsContracts.find((c) => c.id === contractId);

    if (!contract) {
      return { totalPnl: 0, count: 0, positions: [] };
    }

    const collaterals = getCollaterals(contract.chainId);

    if (collaterals.length === 0) {
      return { totalPnl: 0, count: 0, positions: [] };
    }

    let totalPnl = 0;
    let count = 0;

    finishedMissionActions.forEach((missionActions) =>
      missionActions.forEach((action) => {
        const history = convertTradeActionToHistory(
          contractId,
          action,
          collaterals,
        );

        totalPnl =
          totalPnl + (history?.pnl || 0) * (history?.collateralPriceUsd || 0);

        if (history) {
          count++;
        }
      }),
    );

    const positions = openedMissionActions
      .map((missionActions) =>
        missionActions
          .map((action) =>
            convertTradeActionToHistory(contractId, action, collaterals),
          )
          .filter((item) => !!item),
      )
      .filter((missionHistories) => {
        const existsCloseHistory = missionHistories.find((history) =>
          [
            TradeActionType.TradeClosedMarket,
            TradeActionType.TradeClosedLIQ,
            TradeActionType.TradeClosedSL,
            TradeActionType.TradeClosedTP,
          ].includes(history.action),
        );

        return !existsCloseHistory;
      })
      .map((missionHistories) => {
        let openPrice = 0;
        let long = false;
        let size = 0;
        let leverage = 0;
        let pairIndex = 0;

        for (const history of missionHistories) {
          if (history.action !== TradeActionType.TradeLeverageUpdate) {
            openPrice = history.price;
            long = !!history.long;
          }

          size = history.size * history.collateralPriceUsd;
          leverage = history.leverage;
          pairIndex = history.pairIndex;
        }

        return {
          openPrice,
          long,
          size,
          leverage,
          pairIndex,
        };
      });

    return { positions: !finished ? positions : [], totalPnl, count };
  }, [
    gnsContracts,
    finishedMissionActions,
    openedMissionActions,
    finished,
    contractId,
  ]);

  if (prices === undefined) {
    return (
      <Skeleton className="rounded-lg">
        <div className="h-8 w-[100px] rounded-full bg-default-300" />
      </Skeleton>
    );
  }

  const sumOfnPnL = positions
    .map((position) => {
      const currentPrice = prices[position.pairIndex];

      if (currentPrice === undefined) {
        return 0;
      }

      const pnlPercentage = getPNLPercentage({
        closePrice: currentPrice,
        openPrice: position.openPrice,
        leverage: position.leverage,
        long: !!position.long,
      });

      return (position.size * pnlPercentage) / 100;
    })
    .reduce((acc, item) => acc + item, 0);

  if (positions.length === 0 && count === 0) {
    return null;
  }

  if (positions.length === 0) {
    return (
      <LabeledChip
        label={label}
        value={getPriceStr(totalPnl, 1)}
        unit="$"
        isPrefix={true}
        color={totalPnl > 0 ? "warning" : "danger"}
      />
    );
  }

  if (count === 0) {
    return (
      <LabeledChip
        label={label}
        value={getPriceStr(sumOfnPnL, 1)}
        unit="unrealized $"
        isPrefix={true}
        color={sumOfnPnL > 0 ? "warning" : "danger"}
      />
    );
  }

  return (
    <LabeledChip
      label={label}
      value={`${getPriceStr(totalPnl, 1)} + ${getPriceStr(sumOfnPnL, 1)} = ${getPriceStr(sumOfnPnL + totalPnl, 1)}`}
      unit="$"
      isPrefix={true}
      color={totalPnl + sumOfnPnL > 0 ? "warning" : "danger"}
    />
  );
}
