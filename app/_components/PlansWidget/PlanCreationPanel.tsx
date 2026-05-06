"use client";

import { useState } from "react";
import { getFragmentData } from "@/graphql/gql/fragment-masking";

import { getServerTimezone } from "@/utils";

import { Stepper } from "@/components/Stepper/Stepper";
import { PlanMetadata, PlanMetadataForm } from "./PlanMetadataForm";
import { SaveStep } from "./SaveStep";

import { VirtualBotParams } from "@/types";
import { PLAN_INFO_FRAGMENT_DOCUMENT } from "@/app-hooks/usePlan";
import { useGetAllContracts } from "@/app-hooks/useContract";

import { useBatchCreateBots } from "@/app-hooks/useAutomation";
import { useCreatePlan } from "@/app-hooks/usePlan";
import { ContractStatus } from "@/graphql/gql/graphql";

export function PlanCreationPanel() {
  const { createPlan, loading: createPlanLoading } = useCreatePlan();
  const { batchCreateBots, loading: createBotsLoading } = useBatchCreateBots();
  const allContracts = useGetAllContracts();

  const [currentStep, setCurrentStep] = useState(1);

  const [virtualBotParams, setVirtualBotParams] = useState<VirtualBotParams[]>(
    [],
  );

  const [planMetadata, setPlanMetadata] = useState<PlanMetadata | null>(null);

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
      (item) => item.status === ContractStatus.Live,
    );

    if (virtualBotParams.length > 0) {
      await batchCreateBots({
        variables: {
          input: virtualBotParams
            .map((item) => {
              return availableContracts
                .filter((contract) => contract.platform === item.platform)
                .map((contract) => ({
                  planId: +planId,
                  followerContractId: item.followerContract!.contractId,
                  leaderAddress: item.leaderAddress,
                  leaderCollateralBaseline: 0,
                  leaderContractId: contract.id,
                  strategy: {
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
      label: "Create Plan",
      description: `Create the plan.`,
      content: (
        <SaveStep
          loading={createBotsLoading || createPlanLoading}
          onPrevStep={() => setCurrentStep(1)}
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
