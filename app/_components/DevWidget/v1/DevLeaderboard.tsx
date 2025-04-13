"use client";

import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { Address } from "viem";
import dayjs from "dayjs";

import { useGetDevPnlSnapshots } from "@/app-hooks/useHistory";

import { HistoriesWidget } from "@/app-components/LeaderboardWidgets/HistoriesWidget/HistoriesWidget";
import { useEffect, useState } from "react";
import { PersonalTradeHistory } from "@/types";
import { TestParams } from "./TestParams";

export type DevLeaderboardProps = {
  selectionLabel?: string;
  selectedAddresses?: {
    address: string;
    contractId: number;
    leaderCollateral: number;
  }[];
  onChangeSelection?: (
    address: string,
    contractId: number,
    leaderCollateral: number,
    histories: PersonalTradeHistory[],
    isSelected: boolean,
  ) => void;
  endDate: Date;
  hideTags: boolean;
  testParams: TestParams;
};

export function DevLeaderboard({
  endDate,
  hideTags,
  selectionLabel,
  selectedAddresses,
  onChangeSelection,
  testParams,
}: DevLeaderboardProps) {
  const { pnlSnapshots, loading } = useGetDevPnlSnapshots(
    dayjs(endDate).format("YYYY-MM-DD"),
    testParams,
  );

  const toDate = dayjs(dayjs(endDate).format("YYYY-MM-DD"))
    .add(1, "day")
    .toDate();

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    pnlSnapshots?.forEach((snapshot) => {
      onChangeSelection?.(
        snapshot.address as Address,
        snapshot.contractId,
        snapshot.statistic.averageIn,
        snapshot.histories,
        true,
      );
    });
  }, [onChangeSelection, pnlSnapshots]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-start">
        <Button variant="bordered" onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Past" : "Show All"}
        </Button>
      </div>
      <Card>
        <CardBody>
          <Virtuoso
            style={{ height: 700 }}
            data={pnlSnapshots || []}
            itemContent={(_, snapshot) => (
              <div>
                <HistoriesWidget
                  address={snapshot.address as Address}
                  histories={snapshot.histories}
                  contractId={snapshot.contractId}
                  hideTags={hideTags}
                  range={
                    showAll
                      ? undefined
                      : {
                          to: toDate,
                        }
                  }
                  label={selectionLabel}
                  isSelected={
                    selectedAddresses
                      ? !!selectedAddresses.find(
                          (item) =>
                            item.contractId === snapshot.contractId &&
                            item.address.toLowerCase() ===
                              snapshot.address.toLowerCase(),
                        )
                      : undefined
                  }
                  mode="show_all_activity"
                />

                <div>{snapshot.kind}</div>
                <div>{JSON.stringify(snapshot.regression, null, 2)}</div>
              </div>
            )}
            components={{
              Footer: () => (
                <div className="flex w-full items-center justify-center">
                  {loading ? <Spinner color="warning" size="lg" /> : null}
                </div>
              ),
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
