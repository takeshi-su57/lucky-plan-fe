"use client";

import { ChangeEventHandler, useState } from "react";
import { Button, Select, SelectItem, useDisclosure } from "@heroui/react";
import { StandardModal } from "@/components/modals/StandardModal";

import { NumericInput } from "@/components/inputs/NumericInput";

import { BotMode, SimulationBotDetails } from "@/graphql/gql/graphql";
import { useUpdateSimulationBot } from "@/app/_hooks/useSimulations";

export type EditSimulationBotProps = {
  simulationBot: SimulationBotDetails;
};

export function EditSimulationBot({ simulationBot }: EditSimulationBotProps) {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();

  const { updateSimulationBot, loading } = useUpdateSimulationBot();

  const [direction, setDirection] = useState<BotMode>(simulationBot.mode);

  const [ratio, setRatio] = useState(simulationBot.ratio.toString());
  const [minLeverage, setMinLeverage] = useState(
    simulationBot.minLeverage.toString(),
  );
  const [maxLeverage, setMaxLeverage] = useState(
    simulationBot.maxLeverage.toString(),
  );

  const handleChangeDirection: ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const value = event.target.value;

    if (value.trim() !== "") {
      setDirection(value as BotMode);
    }
  };

  let ratioHelper = "";
  let minLeverageHelper = "";
  let maxLeverageHelper = "";

  if (Number.isNaN(+ratio)) {
    ratioHelper = "Invalid ratio";
  }

  if (Number.isNaN(+minLeverage)) {
    minLeverageHelper = "Invalid min leverage";
  }

  if (Number.isNaN(+maxLeverage)) {
    maxLeverageHelper = "Invalid max leverage";
  }

  if (
    minLeverageHelper === "" &&
    maxLeverageHelper === "" &&
    +minLeverage > +maxLeverage
  ) {
    minLeverageHelper = "Min leverage must be <= max leverage";
  }

  const isDisabled =
    ratioHelper !== "" ||
    minLeverageHelper !== "" ||
    maxLeverageHelper !== "";

  const handleConfirm = () => {
    if (isDisabled) {
      return;
    }

    if (
      ratio.trim() === "" ||
      minLeverage.trim() === "" ||
      maxLeverage.trim() === ""
    ) {
      return;
    }

    updateSimulationBot({
      variables: {
        input: {
          id: simulationBot.id,
          ratio: +ratio,
          minLeverage: +minLeverage,
          maxLeverage: +maxLeverage,
          mode: direction,
        },
      },
    });

    onClose();
  };

  return (
    <>
      <Button onPress={onOpen} color="default">
        Edit
      </Button>
      <StandardModal
        isOpen={isOpen}
        isDismissable={false}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{ base: "max-w-87" }}
      >
        <div className="flex w-full flex-col gap-8">
          <h1 className="text-base leading-loose font-bold text-white md:text-2xl md:leading-none">
            Edit Simulation Bot
          </h1>

          <Select
            variant="underlined"
            label="Direction"
            selectedKeys={direction ? [direction] : undefined}
            onChange={handleChangeDirection}
            selectionMode="single"
            className="w-50 font-mono"
          >
            {Object.values(BotMode).map((item) => (
              <SelectItem key={item}>{item}</SelectItem>
            ))}
          </Select>

          <NumericInput
            amount={ratio}
            onChange={setRatio}
            label="Ratio"
            errorMessage={ratioHelper}
            isInvalid={ratioHelper.trim() !== ""}
          />

          <NumericInput
            amount={minLeverage}
            onChange={setMinLeverage}
            label="Min Leverage"
            errorMessage={minLeverageHelper}
            isInvalid={minLeverageHelper.trim() !== ""}
          />

          <NumericInput
            amount={maxLeverage}
            onChange={setMaxLeverage}
            label="Max Leverage"
            errorMessage={maxLeverageHelper}
            isInvalid={maxLeverageHelper.trim() !== ""}
          />

          <Button
            onPress={handleConfirm}
            color="primary"
            isDisabled={isDisabled}
            isLoading={loading}
          >
            Save
          </Button>
        </div>
      </StandardModal>
    </>
  );
}
