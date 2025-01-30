"use client";

import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { getFragmentData, graphql } from "@/gql/index";
import { GetAllMissionsQuery } from "@/graphql/gql/graphql";

import { BOT_INFO_FRAGMENT_DOCUMENT } from "./useAutomation";
import { getTaskFragment } from "./useTask";

export const POSITION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PositionInfo on Position {
    id
    contractId
    address
    index
  }
`);

export const MISSION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionInfo on Mission {
    id
    botId
    targetPositionId
    achievePositionId
    status
    createdAt
    updatedAt
  }
`);

export const MISSION_WITH_TASKS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionWithTasksInfo on MissionWithTasks {
    id
    botId
    targetPositionId
    achievePositionId
    status
    createdAt
    updatedAt
    tasks {
      ...TaskShallowDetailsInfo
    }
  }
`);

export const MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionShallowDetailsInfo on MissionShallowDetails {
    id
    botId
    targetPositionId
    achievePositionId
    createdAt
    updatedAt
    status
    achievePosition {
      ...PositionInfo
    }
    targetPosition {
      ...PositionInfo
    }
    bot {
      ...BotInfo
    }
  }
`);

export const GET_ALL_MISSIONS_DOCUMENT = graphql(`
  query getAllMissions {
    getAllMissions {
      ...MissionShallowDetailsInfo
    }
  }
`);

export const FIND_MISSION_DOCUMENT = graphql(`
  query findMission($id: Int!) {
    findMission(id: $id) {
      ...MissionWithTasksInfo
    }
  }
`);

export const CLOSE_MISSION_DOCUMENT = graphql(`
  mutation closeMission($id: Int!, $isForce: Boolean!) {
    closeMission(id: $id, isForce: $isForce) {
      ...MissionShallowDetailsInfo
    }
  }
`);

export const MISSION_ADDED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription missionAdded {
    missionAdded {
      ...MissionShallowDetailsInfo
    }
  }
`);

export const MISSION_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription missionUpdated {
    missionUpdated {
      ...MissionShallowDetailsInfo
    }
  }
`);

function getMissionFragment(
  mission: GetAllMissionsQuery["getAllMissions"][number],
) {
  const missionInfo = getFragmentData(
    MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
    mission,
  );

  return {
    ...missionInfo,
    targetPosition: {
      ...getFragmentData(
        POSITION_INFO_FRAGMENT_DOCUMENT,
        missionInfo.targetPosition,
      ),
    },
    achievePosition: missionInfo?.achievePosition
      ? {
          ...getFragmentData(
            POSITION_INFO_FRAGMENT_DOCUMENT,
            missionInfo.achievePosition,
          ),
        }
      : undefined,
    bot: {
      ...getFragmentData(BOT_INFO_FRAGMENT_DOCUMENT, missionInfo.bot),
    },
  };
}

export function useGetAllMissions() {
  const { data } = useQuery(GET_ALL_MISSIONS_DOCUMENT, { variables: {} });

  return useMemo(() => {
    if (!data) {
      return [];
    }
    return data.getAllMissions.map(getMissionFragment);
  }, [data]);
}

export function useGetMission(missionId: number) {
  const { data, loading, error } = useQuery(FIND_MISSION_DOCUMENT, {
    variables: { id: +missionId },
  });

  const missionInfo = getFragmentData(
    MISSION_WITH_TASKS_INFO_FRAGMENT_DOCUMENT,
    data?.findMission,
  );

  return {
    mission: missionInfo
      ? {
          ...missionInfo,
          tasks: missionInfo.tasks.map(getTaskFragment),
        }
      : undefined,
    loading,
    error,
  };
}

export function useSubscribeMission() {
  const { data: newData, error: error1 } = useSubscription(
    MISSION_ADDED_SUBSCRIPTION_DOCUMENT,
  );
  const { data: updatedData, error: error2 } = useSubscription(
    MISSION_UPDATED_SUBSCRIPTION_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedData && !error2) {
      const missionInfos = updatedData.missionUpdated.map(getMissionFragment);

      enqueueSnackbar("Missions Updated!", {
        variant: "info",
      });

      missionInfos.forEach((missionInfo) => {
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: missionInfo.__typename,
            id: missionInfo.id,
          }),
          fragment: MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
          data: missionInfo,
        });
      });
    }
  }, [client.cache, enqueueSnackbar, error1, error2, newData, updatedData]);

  useEffect(() => {
    if (newData && !error1) {
      const missionInfos = newData.missionAdded.map(getMissionFragment);

      enqueueSnackbar("New Missions Created!", {
        variant: "info",
      });

      missionInfos.forEach((missionInfo) => {
        client.cache.updateQuery(
          {
            query: GET_ALL_MISSIONS_DOCUMENT,
            variables: {},
          },
          (data) => {
            if (data && data.getAllMissions.length > 0) {
              const alreadyExists = data.getAllMissions.filter(
                (mission) =>
                  missionInfo.id ===
                  getFragmentData(
                    MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
                    mission,
                  ).id,
              );

              if (alreadyExists.length > 0) {
                return data;
              }

              return {
                ...data,
                getAllMissions: [...data.getAllMissions, missionInfo],
              };
            } else {
              return {
                getAllMissions: [missionInfo],
              };
            }
          },
        );
      });
    }
  }, [client.cache, enqueueSnackbar, error1, newData]);
}

export function useCloseMission() {
  const [closeMission, { data: newData, error }] = useMutation(
    CLOSE_MISSION_DOCUMENT,
  );
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const missionInfo = getMissionFragment(newData.closeMission);

      enqueueSnackbar("Success at closing mission!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_MISSIONS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllMissions.length > 0) {
            return {
              ...data,
              getAllMissions: data.getAllMissions.map((mission) =>
                missionInfo.id ===
                getFragmentData(
                  MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
                  mission,
                ).id
                  ? missionInfo
                  : mission,
              ),
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [client.cache, newData, error, enqueueSnackbar]);

  return closeMission;
}
