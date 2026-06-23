"use client";

import { Accordion, AccordionItem, CardBody, Card, Chip } from "@heroui/react";
import { Address } from "viem";
import dayjs from "dayjs";

import { SimulationBotDetails } from "@/graphql/gql/graphql";

import { AddressWidget } from "@/components/AddressWidget/AddressWidget";
import { twMerge } from "tailwind-merge";
import { SimulationPositionView } from "./SimulationPositionView";
import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import { useStopSimulationBot } from "@/app/_hooks/useSimulations";
import { EditSimulationBot } from "./EditAutomationModal";

export type SimulationBotDetailsViewProps = {
  simulationBot: SimulationBotDetails;
};

export function SimulationBotDetailsView({
  simulationBot,
}: SimulationBotDetailsViewProps) {
  const { stopSimulationBot } = useStopSimulationBot();

  const handleStop = () => {
    stopSimulationBot({
      variables: {
        id: simulationBot.id,
      },
    });
  };

  const botStatus = simulationBot.stoppedAt ? "Stop" : "Live";

  return (
    <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6">
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-xs text-neutral-400/80">Leader:</span>
          <AddressWidget
            address={simulationBot.leaderAddress as Address}
            className="text-sm"
          />
          <span>{simulationBot.leaderContract.chainId}</span>
        </div>

        <div className="flex flex-col gap-2 font-mono">
          <span className="text-xs">
            Ratio:
            {`${simulationBot.ratio} x`}
          </span>
        </div>

        <div className="flex flex-col gap-2 font-mono">
          <span className="truncate">
            Start At {dayjs(simulationBot.startedAt).format("YYYY-MM-DD")}
          </span>
          {simulationBot.stoppedAt && (
            <span className="truncate">
              Stopped At {dayjs(simulationBot.stoppedAt).format("YYYY-MM-DD")}
            </span>
          )}
        </div>

        {botStatus === "Live" ? (
          <div className="flex items-center gap-2">
            <ButtonWithConfirm onPress={handleStop} color="primary">
              Stop
            </ButtonWithConfirm>
          </div>
        ) : null}

        <EditSimulationBot simulationBot={simulationBot} />
      </div>

      <Card className={twMerge("mb-4 w-full shrink-0")} isBlurred>
        <CardBody>
          <Accordion isCompact variant="splitted">
            {simulationBot.positions.map(({ histories }) => (
              <AccordionItem
                key={histories[0].leader.positionKey}
                title={<Chip>Position {histories[0].leader.positionKey}</Chip>}
              >
                <Accordion isCompact variant="splitted">
                  {histories.map(({ leader, follower }, index) => (
                    <AccordionItem
                      key={index}
                      title={
                        <span className="text-sm text-neutral-400">
                          {leader.operation}
                        </span>
                      }
                    >
                      <div className="flex flex-col gap-6 border-t border-t-neutral-400/20 py-6 text-neutral-400">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-2">
                            <span className="px-2 text-base">Leader</span>

                            <SimulationPositionView perpTradeHistory={leader} />
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="px-2 text-base">Follower</span>

                            <SimulationPositionView
                              perpTradeHistory={follower}
                            />
                          </div>
                        </div>
                      </div>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </div>
  );
}
