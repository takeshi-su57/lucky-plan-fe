"use client";

import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { GetAllMissionsQuery } from "@/graphql/gql/graphql";
import { BOT_INFO_FRAGMENT_DOCUMENT } from "./useAutomation";

export const POSITION_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment PositionInfo on Position {
    id
    contractId
    address
    index
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

export const CLOSE_MISSION_DOCUMENT = graphql(`
  mutation closeMission($id: Int!) {
    closeMission(id: $id) {
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
  bot: GetAllMissionsQuery["getAllMissions"][number],
) {
  const missionInfo = getFragmentData(
    MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
    bot,
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
      const missionInfo = getMissionFragment(updatedData.missionUpdated);

      enqueueSnackbar("Mission Updated!", {
        variant: "info",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: missionInfo.__typename,
          id: missionInfo.id,
        }),
        fragment: MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
        data: missionInfo,
      });
    }
  }, [client.cache, enqueueSnackbar, error1, error2, newData, updatedData]);

  useEffect(() => {
    if (newData && !error1) {
      const missionInfo = getMissionFragment(newData.missionAdded);

      enqueueSnackbar("New Mission Created!", {
        variant: "info",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: missionInfo.__typename,
          id: missionInfo.id,
        }),
        fragment: MISSION_SHALLOW_DETAILS_INFO_FRAGMENT_DOCUMENT,
        data: missionInfo,
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
