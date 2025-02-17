import { Button } from "@nextui-org/react";

export type BacktestSaveProps = {
  onPrevStep: () => void;
  onReset: () => void;
  onSave: () => void;
};

export function BacktestSave({
  onPrevStep,
  onReset,
  onSave,
}: BacktestSaveProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Button variant="solid" onClick={onSave} color="primary" size="sm">
          Save
        </Button>

        <Button variant="light" onClick={onPrevStep} color="primary" size="sm">
          Back
        </Button>

        <Button
          variant="solid"
          onClick={onReset}
          className="ml-[200px]"
          color="danger"
          size="sm"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
