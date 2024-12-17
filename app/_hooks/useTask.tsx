"use client";

import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { GetAllTasksQuery } from "@/graphql/gql/graphql";
import { getFragmentData, graphql } from "@/gql/index";

import { MISSION_INFO_FRAGMENT_DOCUMENT } from "./useMission";
import { ACTION_INFO_FRAGMENT_DOCUMENT } from "./useAction";

export const TASK_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TaskShallowDetailsInfo on TaskShallowDetails {
    id
    missionId
    actionId
    logs
    status
    createdAt
    action {
      ...ActionInfo
    }
    mission {
      ...MissionInfo
    }
  }
`);

export const GET_ALL_TASKS_DOCUMENT = graphql(`
  query getAllTasks {
    getAllTasks {
      ...TaskShallowDetailsInfo
    }
  }
`);

export const PERFORM_TASK_DOCUMENT = graphql(`
  mutation performTask($id: Int!) {
    performTask(id: $id) {
      ...TaskShallowDetailsInfo
    }
  }
`);

export const TASK_ADDED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription taskAdded {
    taskAdded {
      ...TaskShallowDetailsInfo
    }
  }
`);

export const TASK_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription taskUpdated {
    taskUpdated {
      ...TaskShallowDetailsInfo
    }
  }
`);

function getTaskFragment(task: GetAllTasksQuery["getAllTasks"][number]) {
  const taskInfo = getFragmentData(
    TASK_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
    task,
  );

  return {
    ...taskInfo,
    action: {
      ...getFragmentData(ACTION_INFO_FRAGMENT_DOCUMENT, taskInfo.action),
    },
    mission: {
      ...getFragmentData(MISSION_INFO_FRAGMENT_DOCUMENT, taskInfo.mission),
    },
  };
}

export function useGetAllTasks() {
  const { data } = useQuery(GET_ALL_TASKS_DOCUMENT, { variables: {} });

  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getAllTasks.map(getTaskFragment);
  }, [data]);
}

export function useSubscribeTask() {
  const { data: newData, error: error1 } = useSubscription(
    TASK_ADDED_SUBSCRIPTION_DOCUMENT,
  );
  const { data: updatedData, error: error2 } = useSubscription(
    TASK_UPDATED_SUBSCRIPTION_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedData && !error2) {
      const taskInfos = updatedData.taskUpdated.map(getTaskFragment);

      enqueueSnackbar("Tasks Updated!", {
        variant: "info",
      });

      taskInfos.forEach((taskInfo) => {
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: taskInfo.__typename,
            id: taskInfo.id,
          }),
          fragment: TASK_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
          data: taskInfo,
        });
      });
    }
  }, [client.cache, enqueueSnackbar, error1, error2, newData, updatedData]);

  useEffect(() => {
    if (newData && !error1) {
      const taskInfos = newData.taskAdded.map(getTaskFragment);

      enqueueSnackbar("New Tasks Created!", {
        variant: "info",
      });

      taskInfos.forEach((taskInfo) => {
        client.cache.updateQuery(
          {
            query: GET_ALL_TASKS_DOCUMENT,
            variables: {},
          },
          (data) => {
            if (data && data.getAllTasks.length > 0) {
              const alreadyExists = data.getAllTasks.filter(
                (task) =>
                  taskInfo.id ===
                  getFragmentData(
                    TASK_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
                    task,
                  ).id,
              );

              if (alreadyExists.length > 0) {
                return data;
              }

              return {
                ...data,
                getAllTasks: [...data.getAllTasks, taskInfo],
              };
            } else {
              return {
                getAllTasks: [taskInfo],
              };
            }
          },
        );
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
      const taskInfo = getTaskFragment(newData.performTask);

      enqueueSnackbar("Success at perform task!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: taskInfo.__typename,
          id: taskInfo.id,
        }),
        fragment: TASK_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
        data: taskInfo,
      });
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return performTask;
}
