import { Button } from "@nextui-org/react";

export type BacktestResultProps = {
  onNextStep: () => void;
  onPrevStep: () => void;
};

export function BacktestResult({
  onNextStep,
  onPrevStep,
}: BacktestResultProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Button variant="solid" onClick={onNextStep} color="primary" size="sm">
          Continue
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>
  );
}
