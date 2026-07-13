"use client";

import { useMemo, useState } from "react";
import type { Selection } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

import {
  PerpTradeHistoryOperation,
  SimulationPlanDetails,
} from "@/graphql/gql/graphql";
import { ExpertPositionsPanel } from "../LeaderboardWidgets/PerpEventLogPnlChart/ExpertPositionsPanel";
import { formatChartData } from "../LeaderboardWidgets/HistoryCharts";
import {
  getPairKey,
  getTradePairs,
} from "../LeaderboardWidgets/PerpEventLogPnlChart/utils";
import { HistoryExtremaChart } from "@/components/charts/HistoryExtremaChart";

export type SimulationAutoOverviewProps = {
  simulationPlans: SimulationPlanDetails[];
};

export function SimulationAutoOverview({
  simulationPlans,
}: SimulationAutoOverviewProps) {
  const [selectedPair, setSelectedPair] = useState<Selection>(
    new Set<string>([]),
  );

  const followerMissionHistories = useMemo(() => {
    return simulationPlans.flatMap((plan) =>
      plan.simulationBots.flatMap((bot) =>
        bot.positions.map((position) =>
          position.histories.map((history) => history.follower),
        ),
      ),
    );
  }, [simulationPlans]);

  const tradePairs = useMemo(() => {
    const sortedHistories = followerMissionHistories
      .flat()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return getTradePairs(sortedHistories || []);
  }, [followerMissionHistories]);

  const selectedPairKeys = useMemo(() => {
    return new Set(Array.from(selectedPair) as string[]);
  }, [selectedPair]);

  const {
    missionHistories,
    pnlChartData,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
  } = useMemo(() => {
    const pnlChartData: { value: number; date: Date }[] = [];
    const pnlAccChartData: { value: number; date: Date }[] = [];
    const inOutChartData: { value: number; date: Date }[] = [];
    const inOutAccChartData: { value: number; date: Date }[] = [];

    let pnlSum = 0;
    let inOutSum = 0;

    const missionHistories = followerMissionHistories.map((histories) =>
      histories.filter(
        (history) =>
          selectedPairKeys.size === 0 ||
          selectedPairKeys.has(getPairKey(history.pair, history.isLong)),
      ),
    );
    const sortedHistories = missionHistories
      .flat()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (sortedHistories.length > 0) {
      sortedHistories.forEach((history) => {
        const date = new Date(history.date);

        if (pnlChartData.length === 0) pnlChartData.push({ value: 0, date });
        if (pnlAccChartData.length === 0)
          pnlAccChartData.push({ value: 0, date });
        if (inOutChartData.length === 0)
          inOutChartData.push({ value: 0, date });
        if (inOutAccChartData.length === 0)
          inOutAccChartData.push({ value: 0, date });

        pnlSum += history.usdPnl;

        switch (history.operation) {
          case PerpTradeHistoryOperation.Open: {
            inOutSum -= history.collateralInUsd;
            inOutChartData.push({
              value: -history.collateralInUsd,
              date,
            });
            break;
          }
          case PerpTradeHistoryOperation.Close: {
            const value = history.usdPnl + history.collateralDeltaUsd;
            inOutSum += value;
            inOutChartData.push({ value, date });
            break;
          }
          case PerpTradeHistoryOperation.IncreaseLeverage: {
            inOutSum += history.collateralDeltaUsd;
            inOutChartData.push({
              value: history.collateralDeltaUsd,
              date,
            });
            break;
          }
          case PerpTradeHistoryOperation.DecreaseLeverage: {
            inOutSum -= history.collateralDeltaUsd;
            inOutChartData.push({
              value: -history.collateralDeltaUsd,
              date,
            });
            break;
          }
          case PerpTradeHistoryOperation.IncreaseSize: {
            inOutSum -= history.collateralDeltaUsd;
            inOutChartData.push({
              value: -history.collateralDeltaUsd,
              date,
            });
            break;
          }
          case PerpTradeHistoryOperation.DecreaseSize: {
            const value = history.collateralDeltaUsd + history.usdPnl;
            inOutSum += value;
            inOutChartData.push({ value, date });
            break;
          }
        }

        pnlChartData.push({ value: history.usdPnl, date });
        pnlAccChartData.push({ value: pnlSum, date });
        inOutAccChartData.push({ value: inOutSum, date });
      });
    }

    return {
      missionHistories,
      pnlChartData,
      pnlAccChartData,
      inOutChartData,
      inOutAccChartData,
    };
  }, [followerMissionHistories, selectedPairKeys]);

  const chartDataArr = useMemo(
    () => [
      {
        data: formatChartData(pnlAccChartData),
        title: "ACC PNL",
      },
      {
        data: formatChartData(inOutAccChartData),
        title: "ACC In/Out",
      },
      { data: formatChartData(pnlChartData), title: "PNL" },
      { data: formatChartData(inOutChartData), title: "In/Out" },
    ],
    [inOutAccChartData, inOutChartData, pnlAccChartData, pnlChartData],
  );

  if (followerMissionHistories.length === 0) {
    return (
      <div className="border-default-200 bg-content1 rounded-lg border p-6 text-sm text-neutral-400">
        No trade histories available yet.
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <Select
        variant="underlined"
        label="Pairs"
        placeholder="Select pairs"
        selectedKeys={selectedPair}
        onSelectionChange={setSelectedPair}
        selectionMode="multiple"
        className="w-50 font-mono"
      >
        {tradePairs.map((item) => (
          <SelectItem key={item.key}>
            {`${item.pair} - (${item.count} ${item.isLong ? "Long" : "Short"})`}
          </SelectItem>
        ))}
      </Select>

      <div className="grid h-full min-h-0 grid-cols-[260px_minmax(0,1fr)] items-start gap-4 p-3">
        <ExpertPositionsPanel missionHistories={missionHistories} />

        <div className="grid w-full grid-cols-1 gap-4">
          {chartDataArr.map((item) => (
            <div key={item.title} className="flex-1">
              <HistoryExtremaChart
                title={item.title}
                data={item.data}
                initialSelected={["y"]}
                className="border-default-200 bg-content1 h-50 rounded-lg border"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
