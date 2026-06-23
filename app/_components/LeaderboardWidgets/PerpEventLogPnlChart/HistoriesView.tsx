"use client";

import { Fragment } from "react";
import { Chip, Card, CardBody, useDisclosure } from "@heroui/react";
import { twMerge } from "tailwind-merge";
import { FaLongArrowAltRight } from "react-icons/fa";
import dayjs from "dayjs";

import { getPriceStr } from "@/utils/price";
import { convertMillisToReadableTime } from "@/utils";

import { StandardModal } from "@/components/modals/StandardModal";
import { PositionItem } from "./PositionItem";
import {
  PerpTradeHistoryOperation,
  PerpTradeHistory,
} from "@/graphql/gql/graphql";
import { PairChip } from "../PairChip";

export type HistoriesViewProps = {
  histories: PerpTradeHistory[];
};

export function HistoriesView({ histories }: HistoriesViewProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const latestHistory = histories[histories.length - 1];

  const pnl = histories.reduce((acc, history) => acc + history.usdPnl, 0);
  const isLong = latestHistory.isLong;
  const isClosed = histories.some(
    (history) => history.operation === PerpTradeHistoryOperation.Close,
  );
  const collateral = isClosed
    ? Math.max(...histories.map((history) => history.collateralInUsd))
    : latestHistory.collateralInUsd;
  const leverage = isClosed
    ? Math.max(...histories.map((history) => history.leverage))
    : latestHistory.leverage;

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer">
        <PositionItem
          pair={latestHistory.pair}
          openPrice={histories[0].price}
          price={latestHistory.price}
          collateral={collateral}
          leverage={leverage}
          date={latestHistory.date}
          pnl={pnl}
          isLong={isLong}
          isClosed={isClosed}
          actions={histories.length}
        />
      </div>

      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{ base: "max-w-5xl" }}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
              Position Activities
            </h1>

            <PairChip pairName={latestHistory.pair} />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {histories.map((history, index) => {
              return (
                <Fragment key={index}>
                  {index > 0 && (
                    <div className="flex shrink-0 flex-col items-center gap-1 text-xs">
                      <FaLongArrowAltRight size={32} />
                      <span>
                        {convertMillisToReadableTime(
                          dayjs(history.date).diff(
                            dayjs(histories[index - 1].date),
                          ),
                        )}{" "}
                        later
                      </span>
                      <span>
                        {`Delta: $${getPriceStr(history.collateralDeltaUsd)}`}
                      </span>
                      <span
                        className={twMerge(
                          history.usdPnl > 0
                            ? "text-green-700"
                            : "text-red-700",
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
                        </div>
                        <Chip
                          variant="flat"
                          color="primary"
                          className="text-xs"
                        >
                          {`${getPriceStr(history.price)} ${history.pair.split("/")[1]}`}
                        </Chip>

                        <span>
                          {`$${getPriceStr(history.collateralInUsd, 0)} x ${history.leverage}x`}
                        </span>

                        <div className="flex flex-row gap-2">
                          <Chip variant="flat" className="text-xs">
                            {dayjs(history.date).format("MMM DD HH:mm")}
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
      </StandardModal>
    </>
  );
}
