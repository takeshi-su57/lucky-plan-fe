"use client";

import { useCallback, useMemo, useState } from "react";
import { getFragmentData } from "@/graphql/gql/fragment-masking";

import { getServerTimezone } from "@/utils";

import { Stepper } from "@/components/Stepper/Stepper";
import { PlanMetadata, PlanMetadataForm } from "./PlanMetadataForm";
import { SelectLeaders } from "@/app/_components/PlansWidget/SelectLeaders";
import { LeaderParams } from "@/types";

import { PlanSetupStep } from "./PlanSetupStep";
import { SaveStep } from "./SaveStep";

import { PersonalTradeHistory, VirtualBotParams } from "@/types";
import { PlanCreationOverview } from "./PlanCreationOverview";

import { PLAN_INFO_FRAGMENT_DOCUMENT } from "@/app-hooks/usePlan";
import { useGetAllContracts } from "@/app-hooks/useContract";

import { useBatchCreateBots } from "@/app-hooks/useAutomation";
import { useCreatePlan } from "@/app-hooks/usePlan";

export function PlanCreationPanel() {
  const { createPlan, loading: createPlanLoading } = useCreatePlan();
  const { batchCreateBots, loading: createBotsLoading } = useBatchCreateBots();
  const allContracts = useGetAllContracts();

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
    const { data: planData } = await createPlan({
      variables: {
        createPlanInput: {
          title: planMetadata!.title,
          description: planMetadata!.description,
          scheduledStart:
            planMetadata!.scheduleRange.start.toDate(getServerTimezone()),
          scheduledEnd:
            planMetadata!.scheduleRange.end.toDate(getServerTimezone()),
        },
      },
    });

    if (!planData || !planData.createPlan) {
      return;
    }

    const planId = getFragmentData(
      PLAN_INFO_FRAGMENT_DOCUMENT,
      planData.createPlan,
    ).id;

    const availableContracts = allContracts.filter(
      (item) => !item.isTestnet && item.id !== 4,
    );

    if (virtualBotParams.length > 0) {
      await batchCreateBots({
        variables: {
          input: virtualBotParams
            .map((item) => {
              return availableContracts.map((contract) => ({
                planId: +planId,
                followerContractId: item.followerContract!.contractId,
                leaderAddress: item.leaderAddress,
                leaderCollateralBaseline: 0,
                leaderContractId: contract.id,
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
              }));
            })
            .flat(),
        },
      });
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

  const { totalLeaderHistories } = useMemo(() => {
    const totalLeaderHistories = virtualBotParams
      .map((item) => leaderHistories[item.virtualId])
      .filter((item) => item && item.length > 0)
      .reduce((acc, curr) => [...acc, ...curr], []);

    return { totalLeaderHistories };
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
            isConfirmed: false,
          }))}
          hideTags={false}
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
          loading={createBotsLoading || createPlanLoading}
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
