"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getFragmentData } from "@/graphql/gql/fragment-masking";

import { getServerTimezone } from "@/utils";

import { Stepper } from "@/components/Stepper/Stepper";
import { PlanMetadata, PlanMetadataForm } from "./PlanMetadataForm";
import { SaveStep } from "./SaveStep";

import {
  SIMULATION_PLAN_INFO_FRAGMENT_DOCUMENT,
  useCreateSimulationPlan,
} from "@/app/_hooks/useSimulations";

export function SimulationPlanCreationPanel() {
  const router = useRouter();
  const { createSimulationPlan, loading: createPlanLoading } =
    useCreateSimulationPlan();

  const [currentStep, setCurrentStep] = useState(1);

  const [planMetadata, setPlanMetadata] = useState<PlanMetadata | null>(null);

  const handleInitialize = () => {
    setCurrentStep(1);
    setPlanMetadata(null);
  };

  const handleSaveVirtualBots = async () => {
    const { data: planData } = await createSimulationPlan({
      variables: {
        input: {
          title: planMetadata!.title,
          description: planMetadata!.description,
          startAt:
            planMetadata!.scheduleRange.start.toDate(getServerTimezone()),
          endAt: planMetadata!.scheduleRange.end.toDate(getServerTimezone()),
        },
      },
    });

    if (!planData || !planData.createSimulationPlan) {
      return;
    }

    const simulationPlanId = getFragmentData(
      SIMULATION_PLAN_INFO_FRAGMENT_DOCUMENT,
      planData.createSimulationPlan,
    ).id;

    router.push(`/simulations/${simulationPlanId}`);
  };

  const steps = [
    {
      step: 1,
      label: "Fill Simulation Plan Metadata",
      description: `Fill in the simulation plan metadata for the system. This metadata will be used to create the plan.`,
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
      label: "Create Simulation Plan",
      description: `Create the simulation.`,
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
        Create A New Simulation Plan
      </h1>

      <Stepper steps={steps} currentStep={currentStep} />
    </div>
  );
}
