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
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";

export type SimulationOverviewProps = {
  simulationPlan: SimulationPlanDetails;
};

export function SimulationOverview({
  simulationPlan,
}: SimulationOverviewProps) {
  const [selectedPair, setSelectedPair] = useState<Selection>(
    new Set<string>([]),
  );

  const followerMissionHistories = useMemo(() => {
    return simulationPlan.simulationBots
      .map((bot) =>
        bot.positions.map((position) =>
          position.histories.map((history) => history.follower),
        ),
      )
      .flat();
  }, [simulationPlan]);

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
    const pnlChartData: {
      value: number;
      date: Date;
    }[] = [];

    const pnlAccChartData: {
      value: number;
      date: Date;
    }[] = [];

    const inOutChartData: {
      value: number;
      date: Date;
    }[] = [];

    const inOutAccChartData: {
      value: number;
      date: Date;
    }[] = [];

    let pnlSum = 0;
    let inOutSum = 0;
    let minIn = 10000000;
    let maxIn = 0;

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
      [
        ...sortedHistories,
        {
          ...sortedHistories[sortedHistories.length - 1],
          action: PerpTradeHistoryOperation.Open,
          pnl: 0,
          pnl_net: 0,
          size: 0,
          collateralDelta: 0,
        },
        {
          ...sortedHistories[sortedHistories.length - 1],
          action: PerpTradeHistoryOperation.Close,
          pnl: 0,
          pnl_net: 0,
          size: 0,
          collateralDelta: 0,
        },
      ].forEach((history) => {
        if (pnlChartData.length === 0) {
          pnlChartData.push({
            value: 0,
            date: new Date(history.date),
          });
        }

        if (pnlAccChartData.length === 0) {
          pnlAccChartData.push({
            value: 0,
            date: new Date(history.date),
          });
        }

        if (inOutChartData.length === 0) {
          inOutChartData.push({
            value: 0,
            date: new Date(history.date),
          });
        }

        if (inOutAccChartData.length === 0) {
          inOutAccChartData.push({
            value: 0,
            date: new Date(history.date),
          });
        }

        pnlSum += history.usdPnl;

        switch (history.operation) {
          case PerpTradeHistoryOperation.Open: {
            inOutSum -= history.collateralInUsd;

            inOutChartData.push({
              value: -history.collateralInUsd,
              date: new Date(history.date),
            });

            minIn = Math.min(minIn, history.collateralInUsd);
            maxIn = Math.max(maxIn, history.collateralInUsd);

            break;
          }
          case PerpTradeHistoryOperation.Close: {
            inOutSum += history.usdPnl + history.collateralDeltaUsd;

            inOutChartData.push({
              value: history.usdPnl + history.collateralDeltaUsd,
              date: new Date(history.date),
            });

            break;
          }
          case PerpTradeHistoryOperation.IncreaseLeverage: {
            inOutSum += history.collateralDeltaUsd;

            inOutChartData.push({
              value: history.collateralDeltaUsd,
              date: new Date(history.date),
            });

            break;
          }
          case PerpTradeHistoryOperation.DecreaseLeverage: {
            inOutSum -= history.collateralDeltaUsd;

            inOutChartData.push({
              value: -history.collateralDeltaUsd,
              date: new Date(history.date),
            });
            break;
          }
          case PerpTradeHistoryOperation.IncreaseSize: {
            inOutSum -= history.collateralDeltaUsd;

            inOutChartData.push({
              value: -history.collateralDeltaUsd,
              date: new Date(history.date),
            });

            break;
          }
          case PerpTradeHistoryOperation.DecreaseSize: {
            const delta = history.collateralDeltaUsd + history.usdPnl;

            inOutSum += delta;

            inOutChartData.push({
              value: delta,
              date: new Date(history.date),
            });

            break;
          }
        }

        pnlChartData.push({
          value: history.usdPnl,
          date: new Date(history.date),
        });

        pnlAccChartData.push({
          value: pnlSum,
          date: new Date(history.date),
        });

        inOutAccChartData.push({
          value: inOutSum,
          date: new Date(history.date),
        });
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
        type: "line",
      },
      {
        data: formatChartData(inOutAccChartData),
        title: "ACC In/Out",
        type: "line",
      },
      { data: formatChartData(pnlChartData), title: "PNL", type: "bar" },
      { data: formatChartData(inOutChartData), title: "In/Out", type: "bar" },
    ],
    [inOutAccChartData, inOutChartData, pnlAccChartData, pnlChartData],
  );

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

        <div className={"grid w-full grid-cols-1 gap-4"}>
          {chartDataArr.map((item) => (
            <div key={item.title} className="flex-1">
              {item.type === "line" ? (
                <LineChart
                  title={item.title}
                  data={item.data}
                  initialSelected={["y"]}
                  className={
                    "border-default-200 bg-content1 h-50 rounded-lg border"
                  }
                />
              ) : null}

              {item.type === "bar" ? (
                <BarChart
                  title={item.title}
                  data={item.data}
                  initialSelected={["y"]}
                  className={
                    "border-default-200 bg-content1 h-50 rounded-lg border"
                  }
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
