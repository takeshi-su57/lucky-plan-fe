"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { graphql } from "@/gql/index";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

export const PAUSE_SYSTEM_DOCUMENT = graphql(`
  mutation pauseSystem {
    pauseSystem
  }
`);

export const RESUME_SYSTEM_DOCUMENT = graphql(`
  mutation resumeSystem {
    resumeSystem
  }
`);

export const INITALIZE_PNL_SNAPSHOT_DOCUMENT = graphql(`
  mutation initalizePnlSnapshot {
    initalizePnlSnapshot
  }
`);

export const GET_SYSTEM_STATUS_DOCUMENT = graphql(`
  query getSystemStatus {
    systemStatus
  }
`);

export function usePauseSystem() {
  const [pauseSystem, { data, error }] = useMutation(PAUSE_SYSTEM_DOCUMENT);

  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  useEffect(() => {
    if (data?.pauseSystem && !error) {
      enqueueSnackbar("Success at pausing system!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_SYSTEM_STATUS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data) {
            return {
              ...data,
              systemStatus: true,
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [data, error, enqueueSnackbar, client.cache]);

  return pauseSystem;
}

export function useResumeSystem() {
  const [resumeSystem, { data, error }] = useMutation(RESUME_SYSTEM_DOCUMENT);

  const { enqueueSnackbar } = useSnackbar();

  const client = useApolloClient();

  useEffect(() => {
    if (data?.resumeSystem && !error) {
      enqueueSnackbar("Success at resuming system!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_SYSTEM_STATUS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data) {
            return {
              ...data,
              systemStatus: false,
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [data, error, enqueueSnackbar, client.cache]);

  return resumeSystem;
}

export function useInitalizePnlSnapshot() {
  const [initalizePnlSnapshot, { data, error }] = useMutation(
    INITALIZE_PNL_SNAPSHOT_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.initalizePnlSnapshot && !error) {
      enqueueSnackbar("Success at initializing PNL snapshot!", {
        variant: "success",
      });
    }
  }, [data, error, enqueueSnackbar]);

  return initalizePnlSnapshot;
}

export function useGetSystemStatus() {
  return useQuery(GET_SYSTEM_STATUS_DOCUMENT);
}
