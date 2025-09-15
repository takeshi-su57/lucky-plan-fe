"use client";

import { Fragment } from "react";
import { Chip, Card, CardBody } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { FaLongArrowAltLeft } from "react-icons/fa";

import { PairChip } from "../PairChip";
import { getPriceStr } from "@/utils/price";
import { convertMillisToReadableTime } from "@/utils";
import { PerpTradeHistory } from "@/web3/types";

export type HistoriesViewProps = {
  histories: (PerpTradeHistory & { date: Date })[];
};

export function HistoriesView({ histories }: HistoriesViewProps) {
  const pnl = histories.reduce((acc, history) => acc + history.usdPnl, 0);
  const isLong = histories[0].isLong;

  return (
    <div className="mb-6 flex w-full flex-col gap-4 overflow-x-auto">
      <div className="flex flex-row items-center gap-2">
        <PairChip pairName={histories[0].pair} />

        <span
          className={twMerge(
            pnl > 0 && "text-green-700",
            pnl < 0 && "text-red-700",
            pnl === 0 && "text-neutral-400",
          )}
        >
          {`PnL: $${getPriceStr(pnl)}`}
        </span>

        <Chip
          variant="flat"
          className={twMerge(isLong ? "bg-green-950" : "bg-red-950")}
        >
          {`${isLong ? "Long" : "Short"} Position - ${histories[0].positionKey}`}
        </Chip>
      </div>

      <div className="flex w-full flex-row items-center gap-6 overflow-x-auto">
        {histories.map((history, index) => {
          return (
            <Fragment key={index}>
              {index > 0 && (
                <div className="flex shrink-0 flex-col items-center gap-1 text-xs">
                  <FaLongArrowAltLeft size={32} />
                  <span>
                    {convertMillisToReadableTime(
                      dayjs(history.date).diff(
                        dayjs(histories[index - 1].date),
                      ),
                    )}{" "}
                    later
                  </span>
                  <span>
                    {`${history.operation} $${getPriceStr(history.collateralDeltaUsd)}`}
                  </span>
                  <span
                    className={twMerge(
                      history.usdPnl > 0 ? "text-green-700" : "text-red-700",
                    )}
                  >
                    {history.usdPnl !== 0
                      ? `$${getPriceStr(history.usdPnl)}`
                      : ""}
                  </span>
                </div>
              )}

              <Card
                className={twMerge(
                  "w-fit shrink-0",
                  isLong ? "bg-green-950/40" : "bg-red-950/40",
                )}
              >
                <CardBody>
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex flex-row items-center gap-2">
                      <span>{history.operation}</span>
                      <Chip variant="flat" color="primary" className="text-xs">
                        {`${history.price} ${history.pair.split("/")[1]}`}
                      </Chip>
                    </div>

                    <span>
                      {`${history.collateralInUsd} * ${history.leverage}x = ${getPriceStr(history.sizeInUsd)}`}
                    </span>

                    <div className="flex flex-row gap-2">
                      <Chip variant="flat" className="text-xs">
                        {dayjs(history.date).format("YYYY, MMM DD HH:mm:ss")}
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
