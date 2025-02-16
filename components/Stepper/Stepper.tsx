import { ReactNode } from "react";
import { FaCheck } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export type StepperProps = {
  steps: {
    step: number;
    label: string;
    description: string;
    content: ReactNode;
  }[];
  currentStep: number;
};

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      {steps.map((step) => (
        <div key={step.label} className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <div
              className={twMerge(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs text-primary-foreground",
                step.step <= currentStep ? "bg-primary" : "bg-neutral-500",
              )}
            >
              {step.step < currentStep ? <FaCheck /> : step.step}
            </div>
            <div className="text-base font-bold">{step.label}</div>
          </div>

          <div className="flex flex-row items-center gap-2">
            <div className="ml-3 w-[1px] self-stretch bg-white/40" />
            <div className="flex flex-col gap-2">
              <div className="text-sm text-neutral-400/80">
                {step.description}
              </div>

              {step.step === currentStep ? step.content : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
