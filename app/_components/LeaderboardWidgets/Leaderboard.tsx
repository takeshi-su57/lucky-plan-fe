"use client";

import { ChangeEventHandler, useState } from "react";
import {
  Card,
  CardBody,
  Spinner,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { Virtuoso } from "react-virtuoso";
import { Address } from "viem";
import dayjs from "dayjs";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { useGetPnlSnapshots } from "@/app-hooks/useHistory";

import { HistoriesWidget } from "./HistoriesWidget/HistoriesWidget";

export type LeaderboardProps = {
  selectionLabel?: string;
  selectedAddresses?: {
    address: string;
  }[];
  onChangeSelection?: (address: string, isSelected: boolean) => void;
  endDate: Date;
  initialKind: PnlSnapshotKind;
  onChangeParams: (kind: PnlSnapshotKind) => void;
  hideTags: boolean;
};

export function Leaderboard({
  endDate,
  initialKind,
  onChangeParams,
  hideTags,
  selectionLabel,
  selectedAddresses,
  onChangeSelection,
}: LeaderboardProps) {
  const [kind, setKind] = useState<PnlSnapshotKind>(initialKind);
  const [showAllActivity, setShowAllActivity] = useState(true);
  const [showAllTraders, setShowAllTraders] = useState(true);

  const { pnlSnapshots, fetchMore, hasMore, loading } = useGetPnlSnapshots(
    dayjs(endDate).format("YYYY-MM-DD"),
    kind,
  );

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setKind(value as PnlSnapshotKind);

      onChangeParams(value as PnlSnapshotKind);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select
            variant="underlined"
            label="Before"
            selectedKeys={kind ? [kind] : undefined}
            onChange={handleChangeKind}
            selectionMode="single"
            className="w-[200px] font-mono"
          >
            {Object.values(PnlSnapshotKind).map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-8">
          <Switch
            isSelected={showAllActivity}
            onValueChange={setShowAllActivity}
            size="sm"
          >
            {showAllActivity ? "Show All Activities" : "Show Valid Activities"}
          </Switch>

          <Switch
            isSelected={showAllTraders}
            onValueChange={setShowAllTraders}
            size="sm"
          >
            {showAllTraders
              ? "Show All Traders"
              : "Show Last 2 Days Active Traders"}
          </Switch>
        </div>
      </div>

      <Card>
        <CardBody>
          <Virtuoso
            style={{ height: 700 }}
            data={pnlSnapshots}
            itemContent={(_, snapshot) => (
              <HistoriesWidget
                address={snapshot.address as Address}
                histories={snapshot.histories}
                hideTags={hideTags}
                range={{ to: endDate }}
                label={selectionLabel}
                isSelected={
                  selectedAddresses
                    ? !!selectedAddresses.find(
                        (item) =>
                          item.address.toLowerCase() ===
                          snapshot.address.toLowerCase(),
                      )
                    : undefined
                }
                mode={
                  showAllActivity
                    ? "show_all_activity"
                    : "show_only_valid_activity"
                }
                showLastTwoDaysTraders={!showAllTraders}
                onChangeSelection={onChangeSelection}
              />
            )}
            endReached={() => hasMore && !loading && fetchMore()}
            components={{
              Footer: () => (
                <div className="flex w-full items-center justify-center">
                  {hasMore === false ? (
                    <span className="font-sans text-neutral-400/40">
                      No More Results Available
                    </span>
                  ) : loading ? (
                    <Spinner color="warning" size="lg" />
                  ) : null}
                </div>
              ),
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
}
