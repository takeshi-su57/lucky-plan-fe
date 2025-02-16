import { Button } from "@nextui-org/react";

export type BacktestSaveProps = {
  onPrevStep: () => void;
};

export function BacktestSave({ onPrevStep }: BacktestSaveProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Button variant="solid" onClick={() => {}} color="primary" size="sm">
          Save
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>
      </div>
    </div>
  );
}
