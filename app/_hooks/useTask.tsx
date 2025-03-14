"use client";

import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import {
  TaskBackwardDetails,
  TaskBackwardDetailsInfoFragment,
  TaskForwardDetails,
  TaskForwardDetailsInfoFragment,
} from "@/graphql/gql/graphql";
import { getFragmentData, graphql } from "@/gql/index";

import {
  getMissionBackwardDetails,
  MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
} from "./useMission";
import { TaskMessage } from "@/app-components/TaskWidgets/TaskMessage";

export const ACTION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment ActionInfo on Action {
    id
    name
    positionId
    args
    blockNumber
    orderInBlock
    createdAt
  }
`);

export const FOLLOWER_ACTION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment FollowerActionDetailsInfo on FollowerActionDetails {
    id
    taskId
    actionId
    action {
      ...ActionInfo
    }
  }
`);

export const TASK_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TaskForwardDetailsInfo on TaskForwardDetails {
    id
    missionId
    actionId
    logs
    status
    createdAt
    action {
      ...ActionInfo
    }
    followerActions {
      ...FollowerActionDetailsInfo
    }
  }
`);

export const TASK_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TaskBackwardDetailsInfo on TaskBackwardDetails {
    id
    missionId
    actionId
    logs
    status
    createdAt
    action {
      ...ActionInfo
    }
    followerActions {
      ...FollowerActionDetailsInfo
    }
    mission {
      ...MissionBackwardDetailsInfo
    }
  }
`);

export const GET_ALERT_TASKS_DOCUMENT = graphql(`
  query getAlertTasks {
    getAlertTasks {
      ...TaskBackwardDetailsInfo
    }
  }
`);

export const PERFORM_TASK_DOCUMENT = graphql(`
  mutation performTask($id: Int!) {
    performTask(id: $id)
  }
`);

export const STOP_TASK_DOCUMENT = graphql(`
  mutation stopTask($id: Int!) {
    stopTask(id: $id)
  }
`);

export const TASK_CREATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription taskCreated {
    taskCreated {
      ...TaskBackwardDetailsInfo
    }
  }
`);

export const TASK_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription taskUpdated {
    taskUpdated {
      ...TaskBackwardDetailsInfo
    }
  }
`);

export function getTaskBackwardDetails(
  task: {
    __typename?: "TaskBackwardDetails";
  } & {
    " $fragmentRefs"?: {
      TaskBackwardDetailsInfoFragment: TaskBackwardDetailsInfoFragment;
    };
  },
): TaskBackwardDetails {
  const taskInfo = getFragmentData(
    TASK_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
    task,
  );

  return {
    ...taskInfo,
    mission: getMissionBackwardDetails(taskInfo.mission),
    action: getFragmentData(ACTION_INFO_FRAGMENT_DOCUMENT, taskInfo.action),
    followerActions: taskInfo.followerActions
      .map((item) =>
        getFragmentData(FOLLOWER_ACTION_INFO_FRAGMENT_DOCUMENT, item),
      )
      .map((item) => ({
        ...item,
        action: getFragmentData(ACTION_INFO_FRAGMENT_DOCUMENT, item.action),
      })),
  };
}

export function getTaskForwardDetails(
  task: {
    __typename?: "TaskForwardDetails";
  } & {
    " $fragmentRefs"?: {
      TaskForwardDetailsInfoFragment: TaskForwardDetailsInfoFragment;
    };
  },
): TaskForwardDetails {
  const taskInfo = getFragmentData(
    TASK_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
    task,
  );

  return {
    ...taskInfo,
    action: {
      ...getFragmentData(ACTION_INFO_FRAGMENT_DOCUMENT, taskInfo.action),
    },
    followerActions: taskInfo.followerActions
      .map((item) =>
        getFragmentData(FOLLOWER_ACTION_INFO_FRAGMENT_DOCUMENT, item),
      )
      .map((item) => ({
        ...item,
        action: getFragmentData(ACTION_INFO_FRAGMENT_DOCUMENT, item.action),
      })),
  };
}

export function useGetAlertTasks() {
  const { data } = useQuery(GET_ALERT_TASKS_DOCUMENT, { pollInterval: 60_000 });

  return useMemo(() => {
    return (data?.getAlertTasks || []).map(getTaskBackwardDetails);
  }, [data]);
}

export function useSubscribeTask() {
  const { data: newData, error: error1 } = useSubscription(
    TASK_CREATED_SUBSCRIPTION_DOCUMENT,
  );
  const { data: updatedData, error: error2 } = useSubscription(
    TASK_UPDATED_SUBSCRIPTION_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedData && !error2) {
      const taskInfos = updatedData.taskUpdated.map(getTaskBackwardDetails);

      taskInfos.forEach((taskInfo) => {
        enqueueSnackbar(<TaskMessage task={taskInfo} />, {
          variant: "info",
        });
      });

      taskInfos.forEach((taskInfo) => {
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: "TaskForwardDetails",
            id: taskInfo.id,
          }),
          fragment: TASK_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "TaskForwardDetailsInfo",
          data: {
            __typename: "TaskForwardDetails",
            action: taskInfo.action,
            actionId: taskInfo.actionId,
            createdAt: taskInfo.createdAt,
            followerActions: taskInfo.followerActions,
            id: taskInfo.id,
            logs: taskInfo.logs,
            missionId: taskInfo.missionId,
            status: taskInfo.status,
          },
        });
      });
    }
  }, [client.cache, enqueueSnackbar, error1, error2, newData, updatedData]);

  useEffect(() => {
    if (newData && !error1) {
      const taskInfos = newData.taskCreated.map(getTaskBackwardDetails);

      taskInfos.forEach((taskInfo) => {
        enqueueSnackbar(<TaskMessage task={taskInfo} />, {
          variant: "info",
        });
      });

      taskInfos.forEach((taskInfo) => {
        const mission = client.cache.readFragment({
          id: client.cache.identify({
            __typename: "MissionForwardDetails",
            id: taskInfo.missionId,
          }),
          fragment: MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "MissionForwardDetailsInfo",
        });

        if (mission) {
          client.cache.writeFragment({
            id: client.cache.identify({
              __typename: "MissionForwardDetails",
              id: taskInfo.missionId,
            }),
            fragment: MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
            fragmentName: "MissionForwardDetailsInfo",
            data: {
              ...mission,
              tasks: [
                ...mission.tasks,
                {
                  __typename: "TaskForwardDetails",
                  action: taskInfo.action,
                  actionId: taskInfo.actionId,
                  createdAt: taskInfo.createdAt,
                  followerActions: taskInfo.followerActions,
                  id: taskInfo.id,
                  logs: taskInfo.logs,
                  missionId: taskInfo.missionId,
                  status: taskInfo.status,
                },
              ],
            },
          });
        }
      });
    }
  }, [client.cache, enqueueSnackbar, error1, newData]);
}

export function usePerformTask() {
  const [performTask, { data: newData, error }] = useMutation(
    PERFORM_TASK_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at perform task!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at perform task!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return performTask;
}

export function useStopTask() {
  const [stopTask, { data: newData, error }] = useMutation(STOP_TASK_DOCUMENT);
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData?.stopTask && !error) {
      enqueueSnackbar("Success at stop task!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Error at stop task!", {
        variant: "error",
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return stopTask;
}
