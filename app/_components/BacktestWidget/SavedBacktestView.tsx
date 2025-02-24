import { Accordion, AccordionItem, Button, Chip } from "@nextui-org/react";
import dayjs from "dayjs";

import { BacktestResult } from "./BacktestResult";
import { BacktestParameters } from "./BacktestParamtersForm";
import { LeaderParams } from "./LeaderItem";
import { getPriceStr } from "@/utils/price";
import { useGetBacktestHistories } from "@/app/_hooks/useGetBacktestHistories";

export type SavedBacktestViewProps = {
  backtest: {
    virtualId: string;
    pastDate: Date;
    leaders: LeaderParams[];
    parameters: BacktestParameters;
  };
};

export function SavedBacktestView({ backtest }: SavedBacktestViewProps) {
  return (
    <Accordion isCompact variant="splitted">
      <AccordionItem title={<BacktestSummary backtest={backtest} />}>
        <div className="flex flex-row gap-4 pb-2">
          {backtest.parameters.collateralBaselines
            .sort(
              (a, b) =>
                a.leaderCollateralUpperBound - b.leaderCollateralUpperBound,
            )
            .map((collateralBaseline) => (
              <div
                key={collateralBaseline.id}
                className="flex w-fit flex-col gap-0 rounded-md bg-white/5 p-2"
              >
                <div className="flex flex-row items-center gap-4">
                  <span className="text-xs text-neutral-400">Upper Bound:</span>
                  <span className="text-base">
                    $
                    {getPriceStr(collateralBaseline.leaderCollateralUpperBound)}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-4">
                  <span className="text-xs">Follower Baseline:</span>
                  <span className="text-base">
                    ${getPriceStr(collateralBaseline.followerCollaterals)}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <BacktestResult
          startDate={backtest.pastDate}
          leaders={backtest.leaders}
          parameters={backtest.parameters}
        />
      </AccordionItem>
    </Accordion>
  );
}

export function BacktestSummary({ backtest }: SavedBacktestViewProps) {
  const { handleRemove } = useGetBacktestHistories();

  return (
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Chip>Backtest {backtest.virtualId}</Chip>

        <div className="flex flex-row gap-4 text-xs text-neutral-400">
          <span>
            Past Date: {dayjs(backtest.pastDate).format("YYYY-MM-DD")}
          </span>
          <span>
            Future Date:{" "}
            {dayjs(backtest.parameters.futureDate).format("YYYY-MM-DD")}
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <Button
          variant="solid"
          color="danger"
          size="sm"
          onClick={() => handleRemove(backtest.virtualId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
