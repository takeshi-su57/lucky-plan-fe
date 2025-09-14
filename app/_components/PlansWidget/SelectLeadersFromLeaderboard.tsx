"use client";

import { ChangeEventHandler, useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

import { useIsPnlSnapshotInitialized } from "@/app-hooks/useHistory";

import { InitializePnlSnapshotBoard } from "./InitializePnlSnapshotBoard";
import { PnlSnapshotKind, UserPermission } from "@/graphql/gql/graphql";
import { LeaderboardV1 } from "../LeaderboardWidgets/LeaderboardV1";
import { LeaderParams } from "@/types";
import { useUserJWT } from "@/app/_hooks/useUserJWT";

const availableKind = [PnlSnapshotKind.Month, PnlSnapshotKind.AllTime];

export type SelectLeadersFromLeaderboardProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
  endDate: Date;
  hideTags: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function SelectLeadersFromLeaderboard({
  leaders,
  onChangeLeaders,
  endDate,
  hideTags,
  onNextStep,
  onPrevStep,
}: SelectLeadersFromLeaderboardProps) {
  const { data: isPnlSnapshotInitialized, loading } =
    useIsPnlSnapshotInitialized(dayjs(endDate).format("YYYY-MM-DD"));
  const { userJwtQuery } = useUserJWT();

  const isAdmin = userJwtQuery?.data?.permission === UserPermission.Admin;

  const [tempLeaders, setTempLeaders] = useState<LeaderParams[]>([]);

  const [initialKind, setInitialKind] = useState<PnlSnapshotKind>(
    PnlSnapshotKind.Week,
  );

  useEffect(() => {
    setTempLeaders(leaders);
  }, [leaders]);

  const handleConfirm = () => {
    onChangeLeaders(tempLeaders);
    onNextStep();
  };

  const handleChangeKind: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setInitialKind(value as PnlSnapshotKind);
    }
  };

  const handleChangeSelection = (address: string, isSelected: boolean) => {
    if (isSelected) {
      setTempLeaders((prev) => {
        const exists = prev.find(
          (item) => item.address.toLowerCase() === address.toLowerCase(),
        );

        if (exists) {
          return prev;
        }

        return [
          ...prev,
          {
            virtualId: nanoid(),
            address,
            isConfirmed: false,
          },
        ];
      });
    } else {
      setTempLeaders((prev) => {
        return prev.filter(
          (item) => item.address.toLowerCase() !== address.toLowerCase(),
        );
      });
    }
  };

  if (!isPnlSnapshotInitialized?.isPnlSnapshotInitialized) {
    if (isAdmin) {
      return (
        <div className="flex flex-col gap-2">
          <InitializePnlSnapshotBoard endDate={endDate} loading={loading} />

          <div className="flex flex-row items-center gap-2">
            <Button
              variant="light"
              onClick={onPrevStep}
              color="primary"
              size="sm"
            >
              Back
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 text-primary-400 hover:text-primary-300">
            <p className="text-lg font-bold text-red-400">
              PNL snapshot is not initialized
            </p>
            <p className="text-sm text-neutral-400">
              We kindly ask you to{" "}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}?subject=Initialize%20PNL%20Snapshot&body=Please%20initialize%20PNL%20snapshot%20for%20the%20leaderboard.`}
                className="text-primary"
              >
                reach out to our admin
              </a>{" "}
              for assistance in initializing the PNL snapshot. Thank you for
              your understanding!
            </p>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Button
              variant="light"
              onClick={onPrevStep}
              color="primary"
              size="sm"
            >
              Back
            </Button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Select
        variant="underlined"
        label="Before"
        selectedKeys={initialKind ? [initialKind] : undefined}
        onChange={handleChangeKind}
        selectionMode="single"
        className="w-[200px] font-mono"
      >
        {availableKind.map((item) => (
          <SelectItem key={item}>{item}</SelectItem>
        ))}
      </Select>

      <LeaderboardV1
        selectionLabel="Pick as a Leader"
        selectedAddresses={tempLeaders.map((leader) => ({
          address: leader.address,
        }))}
        kind={initialKind}
        onChangeSelection={handleChangeSelection}
        date={endDate}
        hideTags={hideTags}
      />

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="solid"
          onClick={handleConfirm}
          color="primary"
          size="sm"
        >
          Continue
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>
  );
}
