"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";

import { useIsPnlSnapshotInitialized } from "@/app-hooks/useHistory";

import { InitializePnlSnapshotBoard } from "./InitializePnlSnapshotBoard";
import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { Leaderboard } from "../LeaderboardWidgets/Leaderboard";
import { LeaderParams } from "./LeaderItem";
import { BacktestParameters } from "./BacktestParamtersForm";

export type SelectLeadersProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
  endDate: Date;
  parameters: BacktestParameters;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function SelectLeaders({
  leaders,
  onChangeLeaders,
  endDate,
  onNextStep,
  onPrevStep,
}: SelectLeadersProps) {
  const { data: isPnlSnapshotInitialized, loading } =
    useIsPnlSnapshotInitialized(dayjs(endDate).format("YYYY-MM-DD"));

  const [tempLeaders, setTempLeaders] = useState<LeaderParams[]>([]);
  const [initialContractId, setInitialContractId] = useState<string | null>(
    null,
  );
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

  const handleChangeSelection = (
    address: string,
    contractId: number,
    leaderCollateral: number,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setTempLeaders((prev) => {
        const exists = prev.find(
          (item) =>
            item.contractId === contractId &&
            item.address.toLowerCase() === address.toLowerCase(),
        );

        if (exists) {
          return prev;
        }

        return [...prev, { address, contractId, leaderCollateral }];
      });
    } else {
      setTempLeaders((prev) => {
        return prev.filter(
          (item) =>
            item.contractId !== contractId ||
            item.address.toLowerCase() !== address.toLowerCase(),
        );
      });
    }
  };

  if (!isPnlSnapshotInitialized?.isPnlSnapshotInitialized) {
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
  }

  return (
    <div className="flex flex-col gap-2">
      <Leaderboard
        selectionLabel="Pick as a Leader"
        selectedAddresses={tempLeaders}
        initialContractId={initialContractId}
        initialKind={initialKind}
        onChangeParams={(contractId, kind) => {
          setInitialContractId(contractId);
          setInitialKind(kind);
        }}
        onChangeSelection={handleChangeSelection}
        endDate={endDate}
        hideTags={true}
      />

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="solid"
          onClick={handleConfirm}
          color="primary"
          isDisabled={tempLeaders.length === 0}
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
