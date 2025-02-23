"use client";

import { useEffect, useState } from "react";
import { Button, DatePicker, Divider } from "@nextui-org/react";
import { parseDate, today } from "@internationalized/date";
import dayjs from "dayjs";

import { getServerTimezone } from "@/utils";
import { NumericInput } from "@/components/inputs/NumericInput";
import { nanoid } from "nanoid";
import { getPriceStr } from "@/utils/price";

export type CollateralBaselineItem = {
  id: string;
  leaderCollateralUpperBound: number;
  followerCollaterals: number;
};

export function getFollowerCollateralBaseline(
  items: CollateralBaselineItem[],
  leaderBaseline: number,
) {
  return (
    items
      .sort(
        (a, b) => b.leaderCollateralUpperBound - a.leaderCollateralUpperBound,
      )
      .find((item) => item.leaderCollateralUpperBound < leaderBaseline)
      ?.followerCollaterals || 0
  );
}

export const defaultCollateralBaselines: CollateralBaselineItem[] = [
  {
    id: "1",
    leaderCollateralUpperBound: 0,
    followerCollaterals: 5,
  },
  {
    id: "2",
    leaderCollateralUpperBound: 50,
    followerCollaterals: 25,
  },
  {
    id: "3",
    leaderCollateralUpperBound: 100,
    followerCollaterals: 25,
  },
  {
    id: "4",
    leaderCollateralUpperBound: 500,
    followerCollaterals: 50,
  },
  {
    id: "5",
    leaderCollateralUpperBound: 1000,
    followerCollaterals: 75,
  },
  {
    id: "6",
    leaderCollateralUpperBound: 5000,
    followerCollaterals: 100,
  },
  {
    id: "7",
    leaderCollateralUpperBound: 10000,
    followerCollaterals: 200,
  },
];

export type BacktestParameters = {
  futureDate: Date;
  collateralBaselines: CollateralBaselineItem[];
};

export type BacktestParametersProps = {
  parameters: BacktestParameters | null;
  setParameters: (parameters: BacktestParameters) => void;
  pastDate: Date;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function BacktestParametersForm({
  parameters,
  setParameters,
  pastDate,
  onNextStep,
  onPrevStep,
}: BacktestParametersProps) {
  const [collateralBaselines, setCollateralBaselines] = useState(
    defaultCollateralBaselines,
  );
  const [futureDate, setFutureDate] = useState<Date>(
    parseDate(dayjs(pastDate).format("YYYY-MM-DD"))
      .add({ days: 2 })
      .toDate(getServerTimezone()),
  );

  const [isEdit, setIsEdit] = useState(false);
  const [leaderCollateralUpperBound, setLeaderCollateralUpperBound] =
    useState("");
  const [followerCollaterals, setFollowerCollaterals] = useState("");

  useEffect(() => {
    setFutureDate(
      parseDate(dayjs(pastDate).format("YYYY-MM-DD"))
        .add({ days: 2 })
        .toDate(getServerTimezone()),
    );
  }, [pastDate]);

  useEffect(() => {
    if (parameters) {
      setCollateralBaselines(parameters.collateralBaselines);
      setFutureDate(parameters.futureDate);
    } else {
      setCollateralBaselines(defaultCollateralBaselines);
    }
  }, [parameters]);

  let leaderCollateralUpperBoundHelper = "";
  let followerCollateralsHelper = "";

  if (Number.isNaN(+leaderCollateralUpperBound)) {
    leaderCollateralUpperBoundHelper =
      "Leader Collateral Upper Bound must be a number";
  }

  if (Number.isNaN(+followerCollaterals)) {
    followerCollateralsHelper = "Follower Collaterals must be a number";
  }

  const isDisabledToAdd =
    leaderCollateralUpperBoundHelper.trim() !== "" ||
    followerCollateralsHelper.trim() !== "";

  const handleConfirm = () => {
    if (collateralBaselines.length === 0) {
      return;
    }

    setParameters({
      futureDate: futureDate,
      collateralBaselines: [...collateralBaselines],
    });

    onNextStep();
  };

  const handleDelete = (id: string) => () => {
    setCollateralBaselines(
      collateralBaselines.filter(
        (collateralBaseline) => collateralBaseline.id !== id,
      ),
    );
  };

  const handleOpenNewCollateralBaseline = () => {
    setIsEdit(true);
    setLeaderCollateralUpperBound("");
    setFollowerCollaterals("");
  };

  const handleAdd = () => {
    setCollateralBaselines([
      ...collateralBaselines,
      {
        id: nanoid(),
        leaderCollateralUpperBound: +leaderCollateralUpperBound,
        followerCollaterals: +followerCollaterals,
      },
    ]);
    setIsEdit(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        className="max-w-[284px]"
        label="Pick a future of date"
        value={parseDate(dayjs(futureDate).format("YYYY-MM-DD"))}
        onChange={(date) => setFutureDate(date.toDate(getServerTimezone()))}
        minValue={parseDate(dayjs(pastDate).format("YYYY-MM-DD"))}
        maxValue={today(getServerTimezone()).subtract({ days: 15 })}
      />

      <div>
        <Button
          variant="solid"
          onClick={handleOpenNewCollateralBaseline}
          color="secondary"
          size="sm"
        >
          Add New Collateral Baseline
        </Button>
      </div>

      {isEdit && (
        <div className="flex flex-row items-center gap-2">
          <NumericInput
            amount={leaderCollateralUpperBound}
            onChange={setLeaderCollateralUpperBound}
            label="Leader Collateral Upper Bound"
            errorMessage={leaderCollateralUpperBoundHelper}
            isInvalid={leaderCollateralUpperBoundHelper.trim() !== ""}
          />
          <NumericInput
            amount={followerCollaterals}
            onChange={setFollowerCollaterals}
            label="Follower Baseline"
            errorMessage={followerCollateralsHelper}
            isInvalid={followerCollateralsHelper.trim() !== ""}
          />

          <Button
            variant="solid"
            onClick={handleAdd}
            isDisabled={isDisabledToAdd}
            color="primary"
            size="sm"
          >
            Add
          </Button>
        </div>
      )}

      <Divider />

      {collateralBaselines
        .sort(
          (a, b) => a.leaderCollateralUpperBound - b.leaderCollateralUpperBound,
        )
        .map((collateralBaseline) => (
          <div
            key={collateralBaseline.id}
            className="flex items-center justify-between border-b border-neutral-400/40 text-neutral-400"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-4">
                <span className="text-xs text-neutral-400">
                  Leader Upper Bound:
                </span>
                <span className="text-base">
                  {getPriceStr(collateralBaseline.leaderCollateralUpperBound)}{" "}
                  USDC
                </span>
              </div>

              <div className="flex flex-row items-center gap-4">
                <span className="text-xs">Follower Baseline:</span>
                <span className="text-base">
                  {getPriceStr(collateralBaseline.followerCollaterals)} USDC
                </span>
              </div>
            </div>

            <div className="flex flex-row gap-2">
              <Button
                variant="solid"
                onClick={handleDelete(collateralBaseline.id)}
                color="danger"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}

      <div className="flex flex-row items-center gap-2">
        <Button
          variant="solid"
          onClick={handleConfirm}
          isDisabled={collateralBaselines.length === 0}
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
