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
  mutation resumeSystem($password: String) {
    resumeSystem(password: $password)
  }
`);

export const MAKE_SAFE_APP_DOCUMENT = graphql(`
  mutation makeSafeApp($password: String!) {
    makeSafeApp(password: $password)
  }
`);

export const CHANGE_PASSWORD_DOCUMENT = graphql(`
  mutation changePassword($newPassword: String!, $oldPassword: String!) {
    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)
  }
`);

export const GET_SYSTEM_STATUS_DOCUMENT = graphql(`
  query getSystemStatus {
    systemStatus
  }
`);

export const GET_IS_SAFE_APP_DOCUMENT = graphql(`
  query isSafeApp {
    isSafeApp
  }
`);

export const GET_SERVER_TIME_DOCUMENT = graphql(`
  query getServerTime {
    getServerTime {
      timestamp
      timezone
    }
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
  const [resumeSystem, { data, error, loading }] = useMutation(
    RESUME_SYSTEM_DOCUMENT,
  );

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

  return { resumeSystem, loading };
}

export function useGetSystemStatus() {
  return useQuery(GET_SYSTEM_STATUS_DOCUMENT);
}

export function useIsSafeApp() {
  return useQuery(GET_IS_SAFE_APP_DOCUMENT);
}

export function useMakeSafeApp() {
  const [makeSafeApp, { data, error, loading }] = useMutation(
    MAKE_SAFE_APP_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  useEffect(() => {
    if (data?.makeSafeApp && !error) {
      enqueueSnackbar("Success at turn safe app!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_IS_SAFE_APP_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data) {
            return {
              ...data,
              isSafeApp: true,
            };
          } else {
            return data;
          }
        },
      );
    }
  }, [data, error, enqueueSnackbar, client.cache]);

  return { makeSafeApp, loading };
}

export function useChangePassword() {
  const [changePassword, { data, error, loading }] = useMutation(
    CHANGE_PASSWORD_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();
  const client = useApolloClient();

  useEffect(() => {
    if (data?.changePassword && !error) {
      enqueueSnackbar("Success at changing password!", {
        variant: "success",
      });
    }
  }, [data, error, enqueueSnackbar, client.cache]);

  return { changePassword, loading };
}
