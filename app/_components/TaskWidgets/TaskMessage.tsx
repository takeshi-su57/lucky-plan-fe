import { Chip } from "@nextui-org/react";

import { TaskBackwardDetails, TaskStatus } from "@/graphql/gql/graphql";

import { ContractPnl } from "../MissionWidgets/ContractPnl";
import { useGetAllGnsContracts } from "@/app/_hooks/useContract";

const statusColors: Record<
  TaskStatus,
  "default" | "warning" | "secondary" | "danger" | "default" | "success"
> = {
  [TaskStatus.Created]: "default",
  [TaskStatus.Await]: "warning",
  [TaskStatus.Initiated]: "secondary",
  [TaskStatus.Failed]: "danger",
  [TaskStatus.Stopped]: "default",
  [TaskStatus.Completed]: "success",
};

export function TaskMessage({
  task,
  contractId,
}: {
  task: TaskBackwardDetails;
  contractId: number;
}) {
  const gnsContracts = useGetAllGnsContracts();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm">Task #{task.id}</span>

        <Chip variant="flat" color={statusColors[task.status]}>
          {task.status}
        </Chip>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-base">{task.action.name}</span>
        {task.followerActions.length > 0 &&
        gnsContracts.find((contract) => contract.id === contractId) ? (
          <ContractPnl
            label="PnL"
            contractId={contractId}
            finishedMissionActions={[
              [task.followerActions[task.followerActions.length - 1].action],
            ]}
            openedMissionActions={[]}
            finished={false}
          />
        ) : null}
      </div>
    </div>
  );
}
