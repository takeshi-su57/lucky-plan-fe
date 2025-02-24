import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import { BacktestParameters } from "../_components/BacktestWidget/BacktestParamtersForm";
import { LeaderParams } from "../_components/BacktestWidget/LeaderItem";
import { useSnackbar } from "notistack";

export type BacktestHistory = {
  virtualId: string;
  pastDate: Date;
  leaders: LeaderParams[];
  parameters: BacktestParameters;
};

export const GET_BACKTEST_HISTORIES = "GET_BACKTEST_HISTORIES";

export function useGetBacktestHistories() {
  const { enqueueSnackbar } = useSnackbar();

  const { data, refetch } = useQuery({
    queryKey: [GET_BACKTEST_HISTORIES],
    queryFn: () => {
      const str = localStorage.getItem("BACKTEST_HISTORIES");

      if (!str) {
        return [];
      }

      const jsonData = JSON.parse(str);

      return (jsonData as BacktestHistory[]).map(
        (item: any) =>
          ({
            virtualId: item.virtualId,
            pastDate: new Date(item.pastDate),
            leaders: item.leaders,
            parameters: {
              ...item.parameters,
              futureDate: new Date(item.parameters.futureDate),
            },
          }) as BacktestHistory,
      );
    },
  });

  const handleMerge = useCallback(
    (backtests: BacktestHistory[]) => {
      const mergedBacktests = [...(data ? data : [])];

      backtests.forEach((backtest) => {
        const existingBacktest = mergedBacktests.find(
          (item) => item.virtualId === backtest.virtualId,
        );

        if (!existingBacktest) {
          mergedBacktests.push(backtest);
        }
      });

      localStorage.setItem(
        "BACKTEST_HISTORIES",
        JSON.stringify(mergedBacktests),
      );

      enqueueSnackbar("Backtest histories merged", {
        variant: "success",
      });

      refetch();
    },
    [data, enqueueSnackbar, refetch],
  );

  const handleSave = useCallback(
    (
      pastDate: Date,
      leaders: LeaderParams[],
      parameters: BacktestParameters,
    ) => {
      localStorage.setItem(
        "BACKTEST_HISTORIES",
        JSON.stringify([
          ...(data ? data : []),
          { pastDate, leaders, parameters, virtualId: nanoid() },
        ]),
      );

      enqueueSnackbar("Backtest history saved", {
        variant: "success",
      });

      refetch();
    },
    [data, enqueueSnackbar, refetch],
  );

  const handleRemove = useCallback(
    (id: string) => {
      localStorage.setItem(
        "BACKTEST_HISTORIES",
        JSON.stringify([
          ...(data ? data : []).filter((item) => item.virtualId !== id),
        ]),
      );

      enqueueSnackbar("Backtest history removed", {
        variant: "success",
      });

      refetch();
    },
    [data, enqueueSnackbar, refetch],
  );

  return { data: data || [], handleSave, handleRemove, handleMerge };
}
