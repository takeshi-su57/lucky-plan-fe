"use client";

import { useCallback, useMemo, useState } from "react";
import { getLocalTimeZone } from "@internationalized/date";
import { getFragmentData } from "@/graphql/gql/fragment-masking";

import { Stepper } from "@/components/Stepper/Stepper";
import { PlanMetadata, PlanMetadataForm } from "./PlanMetadataForm";
import { SelectLeaders } from "@/app-components/BacktestWidget/SelectLeaders";
import { LeaderParams } from "@/app-components/BacktestWidget/LeaderItem";

import { PlanSetupStep } from "./PlanSetupStep";
import { SaveStep } from "../BacktestWidget/SaveStep";

import { PersonalTradeHistory, VirtualBotParams } from "@/types";
import { PlanCreationOverview } from "./PlanCreationOverview";
import { transformHistories } from "@/utils/historiesChart";

import { BOTDETAILS_INFO_FRAGMENT_DOCUMENT } from "@/app-hooks/useAutomation";
import { PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT } from "@/app-hooks/usePlan";

import { useBatchCreateBots } from "@/app-hooks/useAutomation";
import { useAddBotsToPlan, useCreatePlan } from "@/app-hooks/usePlan";

export function PlanCreationPanel() {
  const { createPlan, loading: createPlanLoading } = useCreatePlan();
  const { batchCreateBots, loading: createBotsLoading } = useBatchCreateBots();
  const { addBotsToPlan, loading: addBotsLoading } = useAddBotsToPlan();

  const [currentStep, setCurrentStep] = useState(1);

  const [virtualBotParams, setVirtualBotParams] = useState<VirtualBotParams[]>(
    [],
  );

  const [planMetadata, setPlanMetadata] = useState<PlanMetadata | null>(null);

  const [leaderHistories, setLeaderHistories] = useState<
    Record<string, PersonalTradeHistory[]>
  >({});

  const handleInitialize = () => {
    setCurrentStep(1);
    setVirtualBotParams([]);
    setPlanMetadata(null);
  };

  const handleSaveVirtualBots = async () => {
    if (virtualBotParams.length > 0) {
      const { data: planData } = await createPlan({
        variables: {
          createPlanInput: {
            title: planMetadata!.title,
            description: planMetadata!.description,
            scheduledStart:
              planMetadata!.scheduleRange.start.toDate(getLocalTimeZone()),
            scheduledEnd:
              planMetadata!.scheduleRange.end.toDate(getLocalTimeZone()),
          },
        },
      });

      if (!planData || !planData.createPlan) {
        return;
      }

      const planId = getFragmentData(
        PLAN_DETAILS_INFO_FRAGMENT_DOCUMENT,
        planData.createPlan,
      ).id;

      const { data } = await batchCreateBots({
        variables: {
          input: virtualBotParams.map((item) => ({
            followerContractId: item.followerContract!.contractId,
            leaderAddress: item.leaderAddress,
            leaderCollateralBaseline: item.leaderCollateralBaseline,
            leaderContractId: item.leaderContract.contractId,
            strategy: {
              strategyKey: item.strategy!.strategyKey,
              ratio: item.strategy!.ratio,
              lifeTime: item.strategy!.lifeTime,
              maxCollateral: item.strategy!.maxCollateral,
              minCollateral: item.strategy!.minCollateral,
              collateralBaseline: item.strategy!.collateralBaseline,
              maxLeverage: Math.floor(+item.strategy!.maxLeverage * 1000),
              minLeverage: Math.floor(+item.strategy!.minLeverage * 1000),
              params: "{}",
            },
          })),
        },
      });

      if (!data || !data.batchCreateBots) {
        return;
      }

      const newBotIds = data?.batchCreateBots?.map(
        (bot) => getFragmentData(BOTDETAILS_INFO_FRAGMENT_DOCUMENT, bot).id,
      );

      if (newBotIds) {
        await addBotsToPlan({
          variables: {
            botIds: newBotIds,
            planId: +planId,
          },
        });
      }
    }
  };

  const handleChangeLeaders = (leaders: LeaderParams[]) => {
    setVirtualBotParams((prev) => {
      const leaderIds = leaders.map((item) => item.virtualId);
      const prevIds = prev.map((item) => item.virtualId);

      return [
        ...prev.filter((item) => leaderIds.includes(item.virtualId)),
        ...leaders
          .filter((item) => !prevIds.includes(item.virtualId))
          .map((item) => ({
            virtualId: item.virtualId,
            leaderAddress: item.address,
            leaderContract: item.contract,
            leaderCollateralBaseline: item.leaderCollateral,
          })),
      ];
    });
  };

  const handleChangeLeaderHistories = useCallback(
    (virtualId: string, histories: PersonalTradeHistory[]) => {
      setLeaderHistories((prev) => ({ ...prev, [virtualId]: histories }));
    },
    [],
  );

  const handleChangeVirtualBotParam = (virtualBotParams: VirtualBotParams) => {
    setVirtualBotParams((prev) => {
      return prev.map((item) =>
        item.virtualId === virtualBotParams.virtualId ? virtualBotParams : item,
      );
    });
  };

  const handleRemoveVirtualBotParam = (virtualId: string) => {
    setVirtualBotParams((prev) =>
      prev.filter((item) => item.virtualId !== virtualId),
    );
  };

  const { totalLeaderHistories, totalFollowerHistories } = useMemo(() => {
    const totalLeaderHistories = virtualBotParams
      .map((item) => leaderHistories[item.virtualId])
      .reduce((acc, curr) => [...acc, ...curr], []);

    const totalFollowerHistories = virtualBotParams
      .map((item) =>
        transformHistories(
          leaderHistories[item.virtualId],
          item.leaderCollateralBaseline,
          item.strategy!,
        ),
      )
      .reduce((acc, curr) => [...acc, ...curr], []);

    return { totalLeaderHistories, totalFollowerHistories };
  }, [leaderHistories, virtualBotParams]);

  const steps = [
    {
      step: 1,
      label: "Fill Plan Metadata",
      description: `Fill in the plan metadata for the system. This metadata will be used to create the plan.`,
      content: (
        <PlanMetadataForm
          planMetadata={planMetadata}
          onChangePlanMetadata={setPlanMetadata}
          onNextStep={() => setCurrentStep(2)}
        />
      ),
    },
    {
      step: 2,
      label: "Select Leaders",
      description:
        "Select the leaders that will be used to backtest the system.",
      content: (
        <SelectLeaders
          leaders={virtualBotParams.map((item) => ({
            virtualId: item.virtualId,
            address: item.leaderAddress,
            contract: item.leaderContract,
            leaderCollateral: item.leaderCollateralBaseline,
          }))}
          onChangeLeaders={handleChangeLeaders}
          endDate={new Date()}
          onNextStep={() => setCurrentStep(3)}
          onPrevStep={() => setCurrentStep(1)}
        />
      ),
    },
    {
      step: 3,
      label: "Setup Strategies",
      description:
        "Setup the strategies that will be used to backtest the system.",
      content: (
        <PlanSetupStep
          virtualBotParams={virtualBotParams}
          onChangeVirtualBotParam={handleChangeVirtualBotParam}
          onRemoveVirtualBotParam={handleRemoveVirtualBotParam}
          onChangeLeaderHistories={handleChangeLeaderHistories}
          onNextStep={() => setCurrentStep(4)}
          onPrevStep={() => setCurrentStep(2)}
        />
      ),
    },
    {
      step: 4,
      label: "Overview",
      description: `Overview of the plan.`,
      content: (
        <PlanCreationOverview
          leaderHistories={totalLeaderHistories}
          followerHistories={totalFollowerHistories}
          onNextStep={() => setCurrentStep(5)}
          onPrevStep={() => setCurrentStep(3)}
        />
      ),
    },
    {
      step: 5,
      label: "Create Plan",
      description: `Create the plan.`,
      content: (
        <SaveStep
          loading={createBotsLoading || addBotsLoading || createPlanLoading}
          onPrevStep={() => setCurrentStep(4)}
          onReset={handleInitialize}
          onSave={handleSaveVirtualBots}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-base font-bold leading-loose text-white md:text-2xl md:leading-none">
        Create A New Plan
      </h1>

      <Stepper steps={steps} currentStep={currentStep} />
    </div>
  );
}
