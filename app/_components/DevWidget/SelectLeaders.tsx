"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useGetAllContracts } from "@/app/_hooks/useContract";

import { useIsPnlSnapshotInitialized } from "@/app-hooks/useHistory";

import { InitializePnlSnapshotBoard } from "./InitializePnlSnapshotBoard";
import { ExportFilter, UserPermission } from "@/graphql/gql/graphql";
import { DevLeaderboard } from "./DevLeaderboard";
import { LeaderParams } from "./LeaderItem";
import { useUserJWT } from "@/app/_hooks/useUserJWT";
import { PersonalTradeHistory } from "@/types";

export type SelectLeadersProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
  endDate: Date;
  hideTags: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  testParams: ExportFilter[];
  ratio: number;
};

export function SelectLeaders({
  leaders,
  onChangeLeaders,
  endDate,
  hideTags,
  onNextStep,
  onPrevStep,
  testParams,
  ratio,
}: SelectLeadersProps) {
  const { data: isPnlSnapshotInitialized, loading } =
    useIsPnlSnapshotInitialized(dayjs(endDate).format("YYYY-MM-DD"));
  const { userJwtQuery } = useUserJWT();

  const isAdmin = userJwtQuery?.data?.permission === UserPermission.Admin;

  const allContracts = useGetAllContracts();

  const [tempLeaders, setTempLeaders] = useState<LeaderParams[]>([]);

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
    histories: PersonalTradeHistory[],
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setTempLeaders((prev) => {
        const exists = prev.find(
          (item) =>
            item.contract.contractId === contractId &&
            item.address.toLowerCase() === address.toLowerCase(),
        );

        if (exists) {
          return prev;
        }

        const contract = allContracts.find((item) => item.id === contractId);

        if (!contract) {
          return prev;
        }

        return [
          ...prev,
          {
            virtualId: nanoid(),
            address,
            leaderCollateral,
            contract: {
              contractId: contract.id,
              chainId: contract.chainId,
              address: contract.address,
              backendUrl: contract.backendUrl!,
            },
            isConfirmed: false,
            histories,
          },
        ];
      });
    } else {
      setTempLeaders((prev) => {
        return prev.filter(
          (item) =>
            item.contract.contractId !== contractId ||
            item.address.toLowerCase() !== address.toLowerCase(),
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
      <DevLeaderboard
        selectionLabel="Pick as a Leader"
        selectedAddresses={tempLeaders.map((leader) => ({
          address: leader.address,
          contractId: leader.contract.contractId,
          leaderCollateral: leader.leaderCollateral,
        }))}
        onChangeSelection={handleChangeSelection}
        endDate={endDate}
        hideTags={hideTags}
        testParams={testParams}
        ratio={ratio}
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
