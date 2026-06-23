"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFragmentData } from "@/graphql/gql/fragment-masking";

import { getServerTimezone } from "@/utils";

import { Stepper } from "@/components/Stepper/Stepper";
import { PlanMetadata, PlanMetadataForm } from "./PlanMetadataForm";
import { SaveStep } from "./SaveStep";

import { PLAN_INFO_FRAGMENT_DOCUMENT } from "@/app-hooks/usePlan";

import { useCreatePlan } from "@/app-hooks/usePlan";

export function PlanCreationPanel() {
  const router = useRouter();
  const { createPlan, loading: createPlanLoading } = useCreatePlan();

  const [currentStep, setCurrentStep] = useState(1);

  const [planMetadata, setPlanMetadata] = useState<PlanMetadata | null>(null);

  const handleInitialize = () => {
    setCurrentStep(1);
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

    router.push(`/plans/${planId}`);
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
          loading={createPlanLoading}
          onPrevStep={() => setCurrentStep(1)}
          onReset={handleInitialize}
          onSave={handleSaveVirtualBots}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
        Create A New Plan
      </h1>

      <Stepper steps={steps} currentStep={currentStep} />
    </div>
  );
}
