"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { StandardModal } from "@/components/modals/StandardModal";
import { getPriceStr } from "@/utils/price";
import { getHistoriesChartData } from "@/utils/historiesV2Chart";

import { PerpEventLogPnlChartProps } from "./types";
import { PerpEventLogPnlChartExpert } from "./PerpEventLogPnlChartExpert";
import { SparklineChart } from "./SparklineChart";

type SummaryMetric = {
  id: string;
  label: string;
  value: ReactNode;
  tone?: "positive" | "negative";
};

function getTone(value: number) {
  return value >= 0 ? "positive" : "negative";
}

export function PerpEventLogPnlChartLightweight({
  address,
  platform,
  positionsWithSummary,
  cols,
  className,
  startedAt,
  stoppedAt,
  endedAt,
}: PerpEventLogPnlChartProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    missionHistories,
    pnlAccChartData,
    inOutChartData,
    inOutAccChartData,
    firstActivity,
    lastActivity,
    openedPositions,
    duration,
    pnl,
    pnlP,
    size,
    collateral,
    leverage,
    slope,
    r2,
  } = useMemo(() => {
    return getHistoriesChartData(positionsWithSummary || null, new Set(), null);
  }, [positionsWithSummary]);

  const totalInvested = inOutChartData.reduce(
    (acc, curr) => (acc > curr.value ? curr.value : acc),
    0,
  );
  const totalPnl =
    pnlAccChartData.length > 0
      ? pnlAccChartData[pnlAccChartData.length - 1].value
      : 0;

  const metrics: SummaryMetric[] = [
    {
      id: "address",
      label: "Address",
      value: <AddressWidget address={address} />,
    },
    {
      id: "totalPnl",
      label: "Total PnL",
      value: `$${getPriceStr(totalPnl)}`,
      tone: getTone(totalPnl),
    },
    {
      id: "totalInvested",
      label: "Invested",
      value: `$${getPriceStr(-totalInvested)}`,
    },
    {
      id: "positions",
      label: "Positions",
      value: missionHistories.length,
    },
    {
      id: "firstActivity",
      label: "First Activity",
      value: firstActivity ? dayjs(firstActivity).format("YYYY/MM/DD") : "",
    },
    {
      id: "lastActivity",
      label: "Last Activity",
      value: lastActivity ? dayjs(lastActivity).format("YYYY/MM/DD") : "",
    },
    {
      id: "openedHistories",
      label: "Opened Histories",
      value: openedPositions,
    },
    {
      id: "avgDuration",
      label: "Avg Duration",
      value: `${(duration.avg / 1000 / 60).toFixed(2)}mins`,
    },
    {
      id: "avgPnl",
      label: "Avg PnL",
      value: `$${pnl.avg.toFixed(2)}`,
      tone: getTone(pnl.avg),
    },
    {
      id: "avgPnlPBySize",
      label: "Avg PnL % By Size",
      value: `${pnlP.avgBySize.toFixed(2)}%`,
      tone: getTone(pnlP.avgBySize),
    },
    {
      id: "avgSize",
      label: "Avg Size",
      value: `$${getPriceStr(size.avg)}`,
    },
    {
      id: "avgCollateral",
      label: "Avg Collateral",
      value: `$${getPriceStr(collateral.avg)}`,
    },
    {
      id: "avgLeverage",
      label: "Avg Leverage",
      value: `${leverage.avg.toFixed(2)}x`,
    },
    {
      id: "slope",
      label: "Slope",
      value: slope ? slope.toFixed(2) : "CANT_CALCULATE",
      tone: slope ? getTone(slope) : undefined,
    },
    {
      id: "r2",
      label: "R2",
      value: r2 ? r2.toFixed(2) : "CANT_CALCULATE",
    },
  ];

  return (
    <>
      <Card
        shadow="none"
        className={twMerge(
          "border-default-200 bg-content1 mb-4 w-full shrink-0 rounded-lg border",
          className,
        )}
      >
        <CardBody className="p-0">
          <div className="grid min-h-68 grid-cols-1 gap-4 p-4 xl:grid-cols-3">
            <div className="flex min-w-0 flex-col justify-between gap-4 xl:col-span-1">
              <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                {metrics.map((item) => (
                  <div
                    className="bg-content2 flex min-w-0 items-center justify-between gap-3 rounded-md px-2 py-1.5"
                    key={item.id}
                  >
                    <span className="shrink-0 text-[11px] font-medium text-neutral-500">
                      {item.label}:
                    </span>
                    <span
                      className={twMerge(
                        "text-foreground truncate text-right font-mono text-xs font-semibold",
                        item.tone === "positive" && "text-emerald-400",
                        item.tone === "negative" && "text-rose-400",
                      )}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                color="primary"
                variant="flat"
                size="sm"
                className="h-8 w-28 shrink-0 rounded-lg text-xs font-semibold"
                onPress={onOpen}
              >
                Expert
              </Button>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-3 xl:col-span-2 2xl:grid-cols-2">
              <SparklineChart title="ACC PNL" data={pnlAccChartData} />
              <SparklineChart title="ACC In/Out" data={inOutAccChartData} />
            </div>
          </div>
        </CardBody>
      </Card>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          base: "max-h-[90vh] max-w-[90vw]",
          body: "max-h-[90vh] overflow-y-auto",
        }}
      >
        {isOpen ? (
          <PerpEventLogPnlChartExpert
            address={address}
            platform={platform}
            positionsWithSummary={positionsWithSummary}
            cols={cols}
            startedAt={startedAt}
            stoppedAt={stoppedAt}
            endedAt={endedAt}
          />
        ) : null}
      </StandardModal>
    </>
  );
}
