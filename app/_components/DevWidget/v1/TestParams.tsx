"use client";

import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { StandardModal } from "@/components/modals/StandardModal";
import { NumericInput } from "@/components/inputs/NumericInput";

export type TestParams = {
  recentTradedDays: number;
  closePositionCountsByPnlSnapshotKind: Record<PnlSnapshotKind, number>;
  minR2: number;
  maxR2: number;
  minSlope: number;
  maxSlope: number;
};

export const initialTestParams: TestParams = {
  recentTradedDays: 21,
  minR2: 0.9,
  maxR2: 1,
  minSlope: 0,
  maxSlope: 1000000,
  closePositionCountsByPnlSnapshotKind: {
    [PnlSnapshotKind.Day]: 3,
    [PnlSnapshotKind.Week]: 6,
    [PnlSnapshotKind.Month]: 8,
    [PnlSnapshotKind.ThreeMonth]: 9,
    [PnlSnapshotKind.AllTime]: 12,
  },
};

export function TestParamsView({
  params,
  onChangeParams,
}: {
  params: TestParams;
  onChangeParams: (params: TestParams) => void;
}) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const [recentTradedDays, setRecentTradedDays] = useState<string>(
    params.recentTradedDays.toString(),
  );
  const [minR2, setMinR2] = useState<string>(params.minR2.toString());
  const [maxR2, setMaxR2] = useState<string>(params.maxR2.toString());
  const [minSlope, setMinSlope] = useState<string>(params.minSlope.toString());
  const [maxSlope, setMaxSlope] = useState<string>(params.maxSlope.toString());
  const [
    closePositionCountsByPnlSnapshotKind,
    setClosePositionCountsByPnlSnapshotKind,
  ] = useState<Record<PnlSnapshotKind, number>>(
    params.closePositionCountsByPnlSnapshotKind,
  );

  useEffect(() => {
    setRecentTradedDays(params.recentTradedDays.toString());
    setMinR2(params.minR2.toString());
    setMaxR2(params.maxR2.toString());
    setMinSlope(params.minSlope.toString());
    setMaxSlope(params.maxSlope.toString());
    setClosePositionCountsByPnlSnapshotKind(
      params.closePositionCountsByPnlSnapshotKind,
    );
  }, [params]);

  const handleConfirm = () => {
    onChangeParams({
      recentTradedDays: +recentTradedDays,
      minR2: +minR2,
      maxR2: +maxR2,
      minSlope: +minSlope,
      maxSlope: +maxSlope,
      closePositionCountsByPnlSnapshotKind,
    });

    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>Set Test Params</Button>
      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <NumericInput
              min={1}
              max={60}
              step={1}
              amount={recentTradedDays}
              onChange={setRecentTradedDays}
              label="Recent Traded Days"
            />
            <NumericInput
              min={0}
              max={1}
              step={0.01}
              amount={minR2}
              onChange={setMinR2}
              label="Min R2"
            />
            <NumericInput
              min={minR2}
              max={1}
              step={0.01}
              amount={maxR2}
              onChange={setMaxR2}
              label="Max R2"
            />
            <NumericInput
              min={0}
              amount={minSlope}
              onChange={setMinSlope}
              label="Min Slope"
            />
            <NumericInput
              min={minSlope}
              amount={maxSlope}
              onChange={setMaxSlope}
              label="Max Slope"
            />
          </div>

          <div className="flex flex-col gap-4">
            {[PnlSnapshotKind.Day, PnlSnapshotKind.Week].map((kind) => (
              <div key={kind}>
                <NumericInput
                  min={0}
                  amount={`${closePositionCountsByPnlSnapshotKind[kind]}`}
                  onChange={(value) =>
                    setClosePositionCountsByPnlSnapshotKind((prev) => ({
                      ...prev,
                      [kind]: +value,
                    }))
                  }
                  label={`${kind} Counts`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {[
              PnlSnapshotKind.Month,
              PnlSnapshotKind.ThreeMonth,
              PnlSnapshotKind.AllTime,
            ].map((kind) => (
              <div key={kind}>
                <NumericInput
                  min={0}
                  amount={`${closePositionCountsByPnlSnapshotKind[kind]}`}
                  onChange={(value) =>
                    setClosePositionCountsByPnlSnapshotKind((prev) => ({
                      ...prev,
                      [kind]: +value,
                    }))
                  }
                  label={`${kind} Counts`}
                />
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleConfirm}>Confirm</Button>
      </StandardModal>
    </>
  );
}
