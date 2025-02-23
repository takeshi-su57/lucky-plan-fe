import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import { BacktestParameters } from "../_components/BacktestWidget/BacktestParamtersForm";
import { LeaderParams } from "../_components/BacktestWidget/LeaderItem";

export const GET_BACKTEST_HISTORIES = "GET_BACKTEST_HISTORIES";

export function useGetBacktestHistories() {
  const { data, refetch } = useQuery({
    queryKey: [GET_BACKTEST_HISTORIES],
    queryFn: () => {
      const str = localStorage.getItem("BACKTEST_HISTORIES");

      if (!str) {
        return [];
      }

      const jsonData = JSON.parse(str);

      return (
        jsonData as {
          pastDate: Date;
          leaders: { address: string; contractId: number }[];
          parameters: BacktestParameters;
        }[]
      ).map(
        (item: any) =>
          ({
            pastDate: new Date(item.pastDate),
            leaders: item.leaders,
            parameters: {
              ...item.parameters,
              futureDate: new Date(item.parameters.futureDate),
            },
          }) as {
            virtualId: string;
            pastDate: Date;
            leaders: LeaderParams[];
            parameters: BacktestParameters;
          },
      );
    },
  });

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

      refetch();
    },
    [data, refetch],
  );

  return { data: data || [], handleSave };
}
