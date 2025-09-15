"use client";

import { useState, useEffect } from "react";
import { Button, Switch, useDisclosure, Checkbox } from "@nextui-org/react";
import { MissionForwardDetails } from "@/graphql/gql/graphql";

import { StandardModal } from "@/components/modals/StandardModal";

import { useCloneMission } from "@/app-hooks/useMission";
import { NumericInput } from "@/components/inputs/NumericInput";
import { PendingOrderType } from "@/types";
import { useGetAllGnsContracts } from "@/app/_hooks/useContract";
import { bigIntSafeJsonParse } from "@/utils";
import { getCollaterals } from "@/web3/gns/v10/configs";

export type MissionCloneButtonProps = {
  mission: MissionForwardDetails;
  followerContractId: number;
};

export function MissionCloneButton({
  mission,
  followerContractId,
}: MissionCloneButtonProps) {
  const { cloneMission, loading: cloneMissionLoading } = useCloneMission();
  const gnsContracts = useGetAllGnsContracts();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isCustomParams, setIsCustomParams] = useState(false);
  const [collateralUsdAmount, setCollateralUsdAmount] = useState("0");
  const [leverage, setLeverage] = useState("0");
  const [isLong, setIsLong] = useState(true);

  useEffect(() => {
    const openAction = mission.tasks.find((task) => {
      const args = bigIntSafeJsonParse<any>(task.action.args);

      if (
        task.action.name === "LimitExecuted" &&
        [PendingOrderType.LIMIT_OPEN, PendingOrderType.STOP_OPEN].includes(
          args.orderType,
        )
      ) {
        return true;
      }

      if (task.action.name === "MarketExecuted" && args.open) {
        return true;
      }

      return false;
    });

    if (openAction) {
      const args = bigIntSafeJsonParse<any>(openAction.action.args);

      const contract = gnsContracts.find((c) => c.id === followerContractId);

      if (!contract) {
        return;
      }

      const collateral = getCollaterals(contract.chainId).find(
        (c) => c.collateralIndex === args.t.collateralIndex,
      );

      if (!collateral) {
        return;
      }

      setCollateralUsdAmount(
        (
          (Number(args.collateralPriceUsd) * Number(args.t.collateralAmount)) /
          Number(collateral.precision) /
          1e8
        ).toFixed(2),
      );
      setLeverage((Number(args.t.leverage) / 1e3).toString());
      setIsLong(args.t.long);
    }
  }, [followerContractId, gnsContracts, mission]);

  const isInvalidCollateralAmount =
    Number.isNaN(+collateralUsdAmount) || +collateralUsdAmount < 5;
  const isInvalidLeverage = Number.isNaN(+leverage) || +leverage < 1.1;

  const handleCloneMission = () => {
    if (isCustomParams) {
      if (isInvalidCollateralAmount || isInvalidLeverage) {
        return;
      }

      cloneMission({
        variables: {
          id: mission.id,
          manualParams: {
            collateralAmount: (+collateralUsdAmount * 1e6).toString(),
            leverage: Math.floor(+leverage * 1e3),
            long: isLong,
          },
        },
      });
    } else {
      cloneMission({
        variables: {
          id: mission.id,
        },
      });
    }
  };

  const isDisabled = isCustomParams
    ? isInvalidCollateralAmount || isInvalidLeverage
    : false;

  return (
    <>
      <Button onClick={onOpen} color="secondary" className="w-fit" size="sm">
        Clone
      </Button>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
      >
        <div className="flex flex-col items-center gap-3.5">
          <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
            Clone Mission
          </h1>

          <Checkbox
            isSelected={isCustomParams}
            onValueChange={setIsCustomParams}
          >
            Use Custom Params
          </Checkbox>

          {isCustomParams ? (
            <>
              <NumericInput
                amount={collateralUsdAmount}
                onChange={setCollateralUsdAmount}
                label="Collateral USDC Amount"
              />

              <NumericInput
                amount={leverage}
                onChange={setLeverage}
                label="Leverage"
              />

              <Switch
                isSelected={isLong}
                color={isLong ? "success" : "danger"}
                onValueChange={setIsLong}
              >
                {isLong ? "Long" : "Short"}
              </Switch>
            </>
          ) : null}

          <Button
            onClick={handleCloneMission}
            isDisabled={isDisabled}
            isLoading={cloneMissionLoading}
            color="warning"
            size="sm"
          >
            Clone
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
