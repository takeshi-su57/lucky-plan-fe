"use client";

import { useMemo } from "react";

import { StandardModal } from "@/components/modals/StandardModal";

import { useGetAllTradeHistory } from "@/app/_hooks/useHistory";
import LineChart from "@/components/charts/LineChart";

export type TradeHistoryModalProps = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  address: string;
  contractId: string;
};

export function TradeHistoryModal({
  isOpen,
  onOpenChange,
  address,
  contractId,
}: TradeHistoryModalProps) {
  const allTradeHistories = useGetAllTradeHistory(address, contractId);

  const { pnlChartData, inOutData } = useMemo(() => {
    const pnlChartData: {
      value: number;
      date: Date;
    }[] = [];
    const inOutData: {
      value: number;
      date: Date;
    }[] = [];

    let pnlSum = 0;
    let inOutSum = 0;

    allTradeHistories
      .sort((a, b) => {
        const first = new Date(a.timestamp);
        const second = new Date(b.timestamp);

        if (first > second) {
          return 1;
        } else if (first < second) {
          return -1;
        } else {
          return 0;
        }
      })
      .forEach((history) => {
        pnlSum += history.pnl;
        inOutSum += history.in - history.out;

        if (pnlChartData.length === 0) {
          pnlChartData.push({
            value: 0,
            date: new Date(history.timestamp),
          });
        }

        if (inOutData.length === 0) {
          inOutData.push({
            value: 0,
            date: new Date(history.timestamp),
          });
        }

        pnlChartData.push({
          value: pnlSum,
          date: new Date(history.timestamp),
        });

        inOutData.push({
          value: inOutSum,
          date: new Date(history.timestamp),
        });
      });

    return { pnlChartData, inOutData };
  }, [allTradeHistories]);

  return (
    <StandardModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{
        base: "max-w-[1024px] max-h-[460px]",
      }}
    >
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
          Details
        </h1>

        <h6 className="text-sm font-bold leading-loose text-neutral-400 md:text-2xl md:leading-none">
          PNL
        </h6>
        <LineChart data={pnlChartData} className="h-[300px] w-full" />

        <h6 className="text-sm font-bold leading-loose text-neutral-400 md:text-2xl md:leading-none">
          IN/OUT
        </h6>
        <LineChart data={inOutData} className="h-[300px] w-full" />
      </div>
    </StandardModal>
  );
}
