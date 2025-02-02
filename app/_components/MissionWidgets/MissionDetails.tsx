"use client";

import { useCallback } from "react";
import { Accordion, AccordionItem, Progress, Button } from "@nextui-org/react";
import { MissionStatus } from "@/graphql/gql/graphql";

import {
  useCloseMission,
  useGetMission,
  useIgnoreMission,
} from "@/app-hooks/useMission";
import { TaskSummary } from "../TaskWidgets/TaskSummary";
import { TaskDetails } from "../TaskWidgets/TaskDetails";

export type MissionDetailsProps = {
  missionId: number;
};

export function MissionDetails({ missionId }: MissionDetailsProps) {
  const { mission, loading, error } = useGetMission(missionId);

  const closeMission = useCloseMission();
  const ignoreMission = useIgnoreMission();

  const handleCloseMission = useCallback(() => {
    closeMission({
      variables: {
        id: missionId,
        isForce: false,
      },
    });
  }, [closeMission, missionId]);

  const handleIgnoreMission = useCallback(() => {
    ignoreMission({
      variables: {
        id: missionId,
      },
    });
  }, [ignoreMission, missionId]);

  const handleCloseForceMission = useCallback(() => {
    closeMission({
      variables: {
        id: missionId,
        isForce: true,
      },
    });
  }, [closeMission, missionId]);

  if (loading) {
    return <Progress isIndeterminate className="w-full flex-1" size="sm" />;
  }

  if (error) {
    return (
      <span className="text-bold text-base text-red-400">
        Oops, There is an issue, Please check your network.
      </span>
    );
  }

  if (!mission) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 border-t border-t-neutral-400/20 py-6">
      <div className="flex flex-row items-center gap-4">
        {mission.status !== MissionStatus.Closed ? (
          <Button
            onClick={handleCloseMission}
            color="secondary"
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
      <span className="px-2 text-base">Tasks</span>

      <Accordion isCompact variant="splitted">
        {mission.tasks
          .sort((a, b) => a.id - b.id)
          .map((task) => (
            <AccordionItem key={task.id} title={<TaskSummary task={task} />}>
              <TaskDetails taskId={task.id} />
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
