"use client";

import { useEffect, useState } from "react";
import { Button, useDisclosure } from "@nextui-org/react";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";
import { StandardModal } from "@/components/modals/StandardModal";
import { NumericInput } from "@/components/inputs/NumericInput";

export type TestParamsV2 = {
  r2MinsByPnlSnapshotKind: Record<PnlSnapshotKind, number>;
  minSlope: number;
  maxSlope: number;
};

export const initialTestParams: TestParamsV2 = {
  r2MinsByPnlSnapshotKind: {
    [PnlSnapshotKind.Day]: 0.9,
    [PnlSnapshotKind.TwoDay]: 0.9,
    [PnlSnapshotKind.ThreeDay]: 0.9,
    [PnlSnapshotKind.Week]: 0.9,
    [PnlSnapshotKind.TwoWeek]: 0.9,
    [PnlSnapshotKind.Month]: 0.9,
    [PnlSnapshotKind.ThreeMonth]: 0.9,
    [PnlSnapshotKind.HalfYear]: 0.9,
    [PnlSnapshotKind.Year]: 0.9,
    [PnlSnapshotKind.AllTime]: 0.9,
  },
  minSlope: 0,
  maxSlope: 0,
};

export function TestParamsV2View({
  params,
  onChangeParams,
}: {
  params: TestParamsV2;
  onChangeParams: (params: TestParamsV2) => void;
}) {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();

  const [minSlope, setMinSlope] = useState<string>(params.minSlope.toString());
  const [maxSlope, setMaxSlope] = useState<string>(params.maxSlope.toString());
  const [r2MinsByPnlSnapshotKind, setR2MinsByPnlSnapshotKind] = useState<
    Record<PnlSnapshotKind, number>
  >(params.r2MinsByPnlSnapshotKind);

  useEffect(() => {
    setR2MinsByPnlSnapshotKind(params.r2MinsByPnlSnapshotKind);
    setMinSlope(params.minSlope.toString());
    setMaxSlope(params.maxSlope.toString());
  }, [params]);

  const handleConfirm = () => {
    onChangeParams({
      r2MinsByPnlSnapshotKind,
      minSlope: +minSlope,
      maxSlope: +maxSlope,
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
            {[
              PnlSnapshotKind.Day,
              PnlSnapshotKind.TwoDay,
              PnlSnapshotKind.ThreeDay,
              PnlSnapshotKind.Week,
              PnlSnapshotKind.TwoWeek,
            ].map((kind) => (
              <div key={kind}>
                <NumericInput
                  min={0}
                  amount={`${r2MinsByPnlSnapshotKind[kind]}`}
                  onChange={(value) =>
                    setR2MinsByPnlSnapshotKind((prev) => ({
                      ...prev,
                      [kind]: +value,
                    }))
                  }
                  label={`${kind} R2 Min`}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {[
              PnlSnapshotKind.Month,
              PnlSnapshotKind.ThreeMonth,
              PnlSnapshotKind.HalfYear,
              PnlSnapshotKind.Year,
              PnlSnapshotKind.AllTime,
            ].map((kind) => (
              <div key={kind}>
                <NumericInput
                  min={0}
                  amount={`${r2MinsByPnlSnapshotKind[kind]}`}
                  onChange={(value) =>
                    setR2MinsByPnlSnapshotKind((prev) => ({
                      ...prev,
                      [kind]: +value,
                    }))
                  }
                  label={`${kind} R2 Min`}
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
