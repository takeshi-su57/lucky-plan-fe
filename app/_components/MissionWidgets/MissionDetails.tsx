"use client";

import { useCallback } from "react";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { MissionStatus, MissionForwardDetails } from "@/graphql/gql/graphql";

import { useCloseMission, useIgnoreMission } from "@/app-hooks/useMission";
import { TaskSummary } from "../TaskWidgets/TaskSummary";
import { TaskDetails } from "../TaskWidgets/TaskDetails";
import { MissionCloneButton } from "./MissionCloneButton";
import { MissionHeader } from "./MissionHeader";

export type MissionDetailsProps = {
  mission: MissionForwardDetails;
  leaderContractId: number;
  followerContractId: number;
};

export function MissionDetails({
  mission,
  leaderContractId,
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

  const task = mission.tasks.length > 0 ? mission.tasks[0] : null;

  return (
    <div className="flex flex-col gap-4 border-t border-t-neutral-400/20 py-6">
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

      {task ? (
        <MissionHeader task={task} contractId={leaderContractId} />
      ) : null}

      <Accordion isCompact variant="splitted">
        {mission.tasks
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <AccordionItem key={task.id} title={<TaskSummary task={task} />}>
              <TaskDetails
                task={task}
                leaderContractId={leaderContractId}
                followerContractId={followerContractId}
                missionStatus={mission.status}
              />
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
