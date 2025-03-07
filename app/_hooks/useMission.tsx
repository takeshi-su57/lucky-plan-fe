"use client";

import { useEffect } from "react";
import { useSnackbar } from "notistack";
import { useApolloClient, useMutation, useSubscription } from "@apollo/client";
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

export const MISSION_BACKWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {
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
      ...BotBackwardDetailsInfo
    }
  }
`);

export const MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment MissionForwardDetailsInfo on MissionForwardDetails {
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
    tasks {
      ...TaskForwardDetailsInfo
    }
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
  subscription missionCreated {
    missionCreated {
      ...MissionBackwardDetailsInfo
    }
  }
`);

export const MISSION_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription missionUpdated {
    missionUpdated {
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
    tasks: missionInfo.tasks.map(getTaskForwardDetails),
  };
}

export function useSubscribeMission() {
  const { data: newData, error: error1 } = useSubscription(
    MISSION_CREATED_SUBSCRIPTION_DOCUMENT,
  );
  const { data: updatedData, error: error2 } = useSubscription(
    MISSION_UPDATED_SUBSCRIPTION_DOCUMENT,
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
        client.cache.writeFragment({
          id: client.cache.identify({
            __typename: "MissionForwardDetails",
            id: missionInfo.id,
          }),
          fragment: MISSION_FORWARD_DETAILS_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "MissionForwardDetailsInfo",
          data: {
            __typename: "MissionForwardDetails",
            achievePosition: missionInfo.achievePosition,
            achievePositionId: missionInfo.achievePositionId,
            botId: missionInfo.botId,
            createdAt: missionInfo.createdAt,
            id: missionInfo.id,
            status: missionInfo.status,
            targetPosition: missionInfo.targetPosition,
            targetPositionId: missionInfo.targetPositionId,
            tasks: [],
            updatedAt: missionInfo.updatedAt,
          },
        });
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
            __typename: "MissionForwardDetails",
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
                  achievePosition: missionInfo.achievePosition,
                  achievePositionId: missionInfo.achievePositionId,
                  botId: missionInfo.botId,
                  createdAt: missionInfo.createdAt,
                  id: missionInfo.id,
                  status: missionInfo.status,
                  targetPosition: missionInfo.targetPosition,
                  targetPositionId: missionInfo.targetPositionId,
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
  const client = useApolloClient();
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
  }, [client.cache, newData, error, enqueueSnackbar]);

  return closeMission;
}

export function useIgnoreMission() {
  const [ignoreMission, { data: newData, error }] = useMutation(
    IGNORE_MISSION_DOCUMENT,
  );
  const client = useApolloClient();
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
  }, [client.cache, newData, error, enqueueSnackbar]);

  return ignoreMission;
}
