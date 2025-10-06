"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { getFragmentData, graphql } from "@/gql/index";
import {
  MissionBackwardDetailsInfoFragment,
  MissionBackwardDetails,
  MissionForwardDetailsInfoFragment,
  MissionForwardDetails,
} from "@/graphql/gql/graphql";
import {
  BOT_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
  getBotBackwardDetails,
} from "./useAutomation";
import { getTaskForwardDetails } from "./useTask";
import { MissionMessage } from "../_components/MissionWidgets/MissionMessage";
import { useAccount } from "wagmi";

export const MISSION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionInfo on Mission {
    id
    botId
    targetPositionKey
    targetPositionBlockNumber
    targetPositionLogIndex
    achievePositionKey
    achievePositionBlockNumber
    achievePositionLogIndex
    status
    createdAt
    updatedAt
  }
`);

export const MISSION_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {
    id
    botId
    targetPositionKey
    targetPositionBlockNumber
    targetPositionLogIndex
    achievePositionKey
    achievePositionBlockNumber
    achievePositionLogIndex
    createdAt
    updatedAt
    status
    bot {
      ...BotBackwardDetailsInfo
    }
  }
`);

export const MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionForwardDetailsInfo on MissionForwardDetails {
    id
    botId
    targetPositionKey
    targetPositionBlockNumber
    targetPositionLogIndex
    achievePositionKey
    achievePositionBlockNumber
    achievePositionLogIndex
    createdAt
    updatedAt
    status
    tasks {
      ...TaskForwardDetailsInfo
    }
  }
`);

export const GET_MAX_OPEN_MISSIONS_DOCUMENT = graphql(`
  query getMaxOpenMissions {
    getMaxOpenMissions
  }
`);

export const UPDATE_MAX_OPEN_MISSIONS_DOCUMENT = graphql(`
  mutation updateMaxOpenMissions($maxCount: Int!) {
    updateMaxOpenMissions(maxCount: $maxCount)
  }
`);

export const CLONE_MISSION_DOCUMENT = graphql(`
  mutation cloneMission($id: Int!, $manualParams: ManualParams) {
    cloneMission(id: $id, manualParams: $manualParams)
  }
`);

export const CLOSE_MISSION_DOCUMENT = graphql(`
  mutation closeMission($id: Int!, $isForce: Boolean!) {
    closeMission(id: $id, isForce: $isForce)
  }
`);

export const IGNORE_MISSION_DOCUMENT = graphql(`
  mutation ignoreMission($id: Int!) {
    ignoreMission(id: $id)
  }
`);

export const MISSION_CREATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription missionCreated($userId: String!) {
    missionCreated(userId: $userId) {
      ...MissionBackwardDetailsInfo
    }
  }
`);

export const MISSION_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription missionUpdated($userId: String!) {
    missionUpdated(userId: $userId) {
      ...MissionBackwardDetailsInfo
    }
  }
`);

export function getMissionBackwardDetails(
  mission: {
    __typename?: "MissionBackwardDetails";
  } & {
    " $fragmentRefs"?: {
      MissionBackwardDetailsInfoFragment: MissionBackwardDetailsInfoFragment;
    };
  },
): MissionBackwardDetails {
  const missionInfo = getFragmentData(
    MISSION_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
    mission,
  );

  return {
    ...missionInfo,
    bot: getBotBackwardDetails(missionInfo.bot),
  };
}

export function getMissionForwardDetails(
  mission: {
    __typename?: "MissionForwardDetails";
  } & {
    " $fragmentRefs"?: {
      MissionForwardDetailsInfoFragment: MissionForwardDetailsInfoFragment;
    };
  },
): MissionForwardDetails {
  const missionInfo = getFragmentData(
    MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
    mission,
  );

  return {
    ...missionInfo,
    tasks: missionInfo.tasks.map(getTaskForwardDetails),
  };
}

export function useSubscribeMission() {
  const { address } = useAccount();

  const { data: newData, error: error1 } = useSubscription(
    MISSION_CREATED_SUBSCRIPTION_DOCUMENT,
    {
      variables: {
        userId: address?.toLowerCase() ?? "",
      },
    },
  );
  const { data: updatedData, error: error2 } = useSubscription(
    MISSION_UPDATED_SUBSCRIPTION_DOCUMENT,
    {
      variables: {
        userId: address?.toLowerCase() ?? "",
      },
    },
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (updatedData && !error2) {
      const missionInfos = updatedData.missionUpdated.map(
        getMissionBackwardDetails,
      );

      missionInfos.forEach((missionInfo) => {
        enqueueSnackbar(<MissionMessage mission={missionInfo} />, {
          variant: "info",
        });
      });

      missionInfos.forEach((missionInfo) => {
        const missionForwardDetails = client.cache.readFragment({
          id: client.cache.identify({
            __typename: "MissionForwardDetails",
            id: missionInfo.id,
          }),
          fragment: MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "MissionForwardDetailsInfo",
        });

        if (missionForwardDetails) {
          client.cache.writeFragment({
            id: client.cache.identify({
              __typename: "MissionForwardDetails",
              id: missionInfo.id,
            }),
            fragment: MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
            fragmentName: "MissionForwardDetailsInfo",
            data: {
              ...missionForwardDetails,
              achievePositionKey: missionInfo.achievePositionKey,
              achievePositionBlockNumber:
                missionInfo.achievePositionBlockNumber,
              achievePositionLogIndex: missionInfo.achievePositionLogIndex,
              botId: missionInfo.botId,
              createdAt: missionInfo.createdAt,
              id: missionInfo.id,
              status: missionInfo.status,
              targetPositionKey: missionInfo.targetPositionKey,
              targetPositionBlockNumber: missionInfo.targetPositionBlockNumber,
              targetPositionLogIndex: missionInfo.targetPositionLogIndex,
              updatedAt: missionInfo.updatedAt,
            },
          });
        }
      });
    }
  }, [client.cache, enqueueSnackbar, error1, error2, newData, updatedData]);

  useEffect(() => {
    if (newData && !error1) {
      const missionInfos = newData.missionCreated.map(
        getMissionBackwardDetails,
      );

      missionInfos.forEach((missionInfo) => {
        enqueueSnackbar(<MissionMessage mission={missionInfo} />, {
          variant: "info",
        });
      });

      missionInfos.forEach((missionInfo) => {
        const bot = client.cache.readFragment({
          id: client.cache.identify({
            __typename: "BotForwardDetails",
            id: missionInfo.botId,
          }),
          fragment: BOT_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "BotForwardDetailsInfo",
        });

        if (bot) {
          client.cache.writeFragment({
            id: client.cache.identify({
              __typename: "BotForwardDetails",
              id: missionInfo.botId,
            }),
            fragment: BOT_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
            fragmentName: "BotForwardDetailsInfo",
            data: {
              ...bot,
              missions: [
                ...bot.missions,
                {
                  __typename: "MissionForwardDetails",
                  achievePositionKey: missionInfo.achievePositionKey,
                  achievePositionBlockNumber:
                    missionInfo.achievePositionBlockNumber,
                  achievePositionLogIndex: missionInfo.achievePositionLogIndex,
                  botId: missionInfo.botId,
                  createdAt: missionInfo.createdAt,
                  id: missionInfo.id,
                  status: missionInfo.status,
                  targetPositionKey: missionInfo.targetPositionKey,
                  targetPositionBlockNumber:
                    missionInfo.targetPositionBlockNumber,
                  targetPositionLogIndex: missionInfo.targetPositionLogIndex,
                  tasks: [],
                  updatedAt: missionInfo.updatedAt,
                },
              ],
            },
          });
        }
      });
    }
  }, [client.cache, enqueueSnackbar, error1, newData]);
}

export function useCloseMission() {
  const [closeMission, { data: newData, error }] = useMutation(
    CLOSE_MISSION_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at closing mission!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Failed to close mission!", {
        variant: "error",
      });
    }
  }, [newData, error, enqueueSnackbar]);

  return closeMission;
}

export function useCloneMission() {
  const [cloneMission, { data: newData, error, loading }] = useMutation(
    CLONE_MISSION_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at cloning mission!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Failed to clone mission!", {
        variant: "error",
      });
    }
  }, [newData, error, enqueueSnackbar]);

  return { cloneMission, loading };
}

export function useIgnoreMission() {
  const [ignoreMission, { data: newData, error }] = useMutation(
    IGNORE_MISSION_DOCUMENT,
  );
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      enqueueSnackbar("Success at ignoring mission!", {
        variant: "success",
      });
    }

    if (newData && error) {
      enqueueSnackbar("Failed to close mission!", {
        variant: "error",
      });
    }
  }, [newData, error, enqueueSnackbar]);

  return ignoreMission;
}

export function useGetMaxOpenMissions() {
  const { data, loading, error } = useQuery(GET_MAX_OPEN_MISSIONS_DOCUMENT);
  return { data, loading, error };
}

export function useUpdateMaxOpenMissions() {
  const [updateMaxOpenMissions, { data, loading, error }] = useMutation(
    UPDATE_MAX_OPEN_MISSIONS_DOCUMENT,
  );
  return { updateMaxOpenMissions, data, loading, error };
}
