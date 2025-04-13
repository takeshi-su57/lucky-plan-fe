"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useGetAllContracts } from "@/app/_hooks/useContract";

import { useIsPnlSnapshotInitialized } from "@/app-hooks/useHistory";

import { InitializePnlSnapshotBoard } from "./InitializePnlSnapshotBoard";
import { PnlSnapshotKind, UserPermission } from "@/graphql/gql/graphql";
import { Leaderboard } from "../LeaderboardWidgets/Leaderboard";
import { LeaderParams } from "./LeaderItem";
import { useUserJWT } from "@/app/_hooks/useUserJWT";

export type SelectLeadersProps = {
  leaders: LeaderParams[];
  onChangeLeaders: (leaders: LeaderParams[]) => void;
  endDate: Date;
  hideTags: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function SelectLeaders({
  leaders,
  onChangeLeaders,
  endDate,
  hideTags,
  onNextStep,
  onPrevStep,
}: SelectLeadersProps) {
  const { data: isPnlSnapshotInitialized, loading } =
    useIsPnlSnapshotInitialized(dayjs(endDate).format("YYYY-MM-DD"));
  const { userJwtQuery } = useUserJWT();

  const isAdmin = userJwtQuery?.data?.permission === UserPermission.Admin;

  const allContracts = useGetAllContracts();

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
      <Leaderboard
        selectionLabel="Pick as a Leader"
        selectedAddresses={tempLeaders.map((leader) => ({
          address: leader.address,
          contractId: leader.contract.contractId,
          leaderCollateral: leader.leaderCollateral,
        }))}
        initialContractId={initialContractId}
        initialKind={initialKind}
        onChangeParams={(contractId, kind) => {
          setInitialContractId(contractId);
          setInitialKind(kind);
        }}
        onChangeSelection={handleChangeSelection}
        endDate={endDate}
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
