"use client";

import { Fragment } from "react";
import { Chip, Card, CardBody } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { FaLongArrowAltRight } from "react-icons/fa";

import { PersonalTradeHistory } from "@/types";
import { PairChip } from "../PairChip";
import { getPriceStr } from "@/utils/price";
import { useGetAllContracts } from "@/app/_hooks/useContract";
import { convertMillisToReadableTime } from "@/utils";

const collateralNamesMap: Record<number, Record<number, string>> = {
  [137]: {
    [1]: "DAI",
    [2]: "WETH",
    [3]: "USDC",
  },
  [42161]: {
    [1]: "DAI",
    [2]: "WETH",
    [3]: "USDC",
  },
  [421614]: {
    [1]: "DAI",
    [2]: "WETH",
    [3]: "USDC",
  },
  [8453]: {
    [1]: "USDC",
  },
  [33139]: {
    [1]: "APE",
  },
};

export type HistoriesPositionProps = {
  contractId: number;
  tradeIndex: number;
  collateralIndex: number;
  long: number;
  pair: string;
  actions: PersonalTradeHistory[];
};

export function HistoriesPosition({
  contractId,
  tradeIndex,
  collateralIndex,
  long,
  pair,
  actions,
}: HistoriesPositionProps) {
  const contracts = useGetAllContracts();

  const chainId = contracts.find((c) => c.id === contractId)?.chainId || 0;

  const collateralName = collateralNamesMap[chainId]?.[collateralIndex] || "";
  const pnl = actions.reduce((acc, action) => acc + action.pnl, 0);

  return (
    <div
      className="mb-6 flex w-full flex-col gap-4 overflow-x-auto"
      key={tradeIndex}
    >
      <div className="flex flex-row items-center gap-2">
        <Chip
          variant="flat"
          className={twMerge(long ? "bg-green-950" : "bg-red-950")}
        >
          {`${long ? "Long" : "Short"} Position - ${tradeIndex}`}
        </Chip>
        <PairChip contractId={contractId} pairName={pair} />

        <span
          className={twMerge(
            pnl > 0 && "text-green-700",
            pnl < 0 && "text-red-700",
            pnl === 0 && "text-neutral-400",
          )}
        >
          {`PnL: ${pnl} ${collateralName} ($${getPriceStr(pnl * actions[actions.length - 1].collateralPriceUsd)})`}
        </span>
      </div>

      <div className="flex w-full flex-row items-center gap-6 overflow-x-auto">
        {actions.map((action, index) => {
          return (
            <Fragment key={action.block}>
              {index > 0 && (
                <div className="flex shrink-0 flex-col items-center gap-1 text-xs">
                  <FaLongArrowAltRight size={32} />
                  <span>
                    {convertMillisToReadableTime(
                      dayjs(action.date).diff(dayjs(actions[index - 1].date)),
                    )}{" "}
                    later
                  </span>
                  <span>
                    {action.collateralDelta !== null &&
                    action.collateralDelta !== 0
                      ? `${action.collateralDelta !== null && action.collateralDelta >= 0 ? "Add" : "Remove"} ${action.collateralDelta !== null ? getPriceStr(action.collateralDelta) : ""} ${collateralName}`
                      : ""}
                  </span>
                  <span>
                    {action.leverageDelta !== null && action.leverageDelta !== 0
                      ? `${action.leverageDelta !== null && action.leverageDelta >= 0 ? "Increase" : "Decrease"} ${action.leverageDelta !== null ? action.leverageDelta : ""}x`
                      : ""}
                  </span>
                  <span
                    className={twMerge(
                      action.pnl > 0 ? "text-green-700" : "text-red-700",
                    )}
                  >
                    {action.pnl !== 0 ? `${action.pnl} ${collateralName}` : ""}
                  </span>
                </div>
              )}

              <Card
                className={twMerge(
                  "w-fit shrink-0",
                  action.long ? "bg-green-950/40" : "bg-red-950/40",
                )}
              >
                <CardBody>
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex flex-row items-center gap-2">
                      <span>{action.action}</span>
                      <Chip variant="flat" color="primary" className="text-xs">
                        {`${action.price} ${action.pair.split("/")[1]}`}
                      </Chip>
                    </div>

                    <span>
                      {`${action.size} ${collateralName} * ${action.leverage}x = ${getPriceStr(action.size * action.leverage)} ${collateralName}`}
                    </span>

                    <div className="flex flex-row gap-2">
                      <Chip variant="flat" className="text-xs">
                        {dayjs(action.date).format("YYYY, MMM DD HH:mm:ss")}
                      </Chip>
                      <Chip variant="flat" className="text-xs">
                        {action.block} Block
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
