import { Button } from "@nextui-org/react";

export type SaveStepProps = {
  loading: boolean;
  onPrevStep: () => void;
  onReset: () => void;
  onSave: () => void;
};

export function SaveStep({
  loading,
  onPrevStep,
  onReset,
  onSave,
}: SaveStepProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="solid"
          isLoading={loading}
          isDisabled={loading}
          onClick={onSave}
          color="primary"
          size="sm"
        >
          Save
        </Button>

        <Button
          variant="light"
          onClick={onPrevStep}
          isDisabled={loading}
          color="primary"
          size="sm"
        >
          Back
        </Button>

        <Button
          variant="solid"
          onClick={onReset}
          className="ml-[200px]"
          color="danger"
          size="sm"
          isDisabled={loading}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
