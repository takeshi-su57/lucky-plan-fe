"use client";

import { memo } from "react";

import { ModaledItems } from "@/components/modals/ModaledItems";
import { SimulationBotDetails } from "@/graphql/gql/graphql";
import { SimulationBotSummary } from "./SimulationBotSummary";
import { SimulationBotDetailsView } from "./SimulationBotDetailsView";

export type SimulationBotModaledItemProps = {
  simulationBot: SimulationBotDetails;
};

export const SimulationBotModaledItem = memo(function SimulationBotModaledItem({
  simulationBot,
}: SimulationBotModaledItemProps) {
  return (
    <ModaledItems
      mode="rightDrawer"
      trigger={<SimulationBotSummary simulationBot={simulationBot} />}
      content={<SimulationBotDetailsView simulationBot={simulationBot} />}
      contentTitle={`Simulation Bot ${simulationBot.id}`}
      classNames={{
        trigger: "border border-neutral-700 rounded-lg bg-content2/50 p-2",
      }}
    />
  );
});
