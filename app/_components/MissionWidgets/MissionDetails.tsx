"use client";

import { useCallback } from "react";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { MissionStatus, MissionForwardDetails } from "@/graphql/gql/graphql";

import { useCloseMission, useIgnoreMission } from "@/app-hooks/useMission";
import { TaskSummary } from "../TaskWidgets/TaskSummary";
import { TaskDetails } from "../TaskWidgets/TaskDetails";
import { MissionCloneButton } from "./MissionCloneButton";

export type MissionDetailsProps = {
  mission: MissionForwardDetails;
  followerContractId: number;
};

export function MissionDetails({
  mission,
  followerContractId,
}: MissionDetailsProps) {
  const closeMission = useCloseMission();
  const ignoreMission = useIgnoreMission();

  const handleCloseMission = useCallback(() => {
    closeMission({
      variables: {
        id: mission.id,
        isForce: false,
      },
    });
  }, [closeMission, mission.id]);

  const handleIgnoreMission = useCallback(() => {
    ignoreMission({
      variables: {
        id: mission.id,
      },
    });
  }, [ignoreMission, mission.id]);

  const handleCloseForceMission = useCallback(() => {
    closeMission({
      variables: {
        id: mission.id,
        isForce: true,
      },
    });
  }, [closeMission, mission.id]);

  return (
    <div className="flex flex-col gap-2 border-t border-t-neutral-400/20 py-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          {mission.status !== MissionStatus.Closed ? (
            <Button
              onClick={handleCloseMission}
              color="primary"
              className="w-fit"
              size="sm"
            >
              Close
            </Button>
          ) : null}

          {mission.status !== MissionStatus.Closed ? (
            <Button
              onClick={handleCloseForceMission}
              color="danger"
              className="w-fit"
              size="sm"
            >
              Force Close
            </Button>
          ) : null}

          {mission.status !== MissionStatus.Closed ? (
            <Button
              onClick={handleIgnoreMission}
              color="warning"
              className="w-fit"
              size="sm"
            >
              Ignore
            </Button>
          ) : null}
        </div>

        <MissionCloneButton
          mission={mission}
          followerContractId={followerContractId}
        />
      </div>
      <span className="px-2 text-base">Tasks</span>

      <Accordion isCompact variant="splitted">
        {mission.tasks
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <AccordionItem key={task.id} title={<TaskSummary task={task} />}>
              <TaskDetails task={task} missionStatus={mission.status} />
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
