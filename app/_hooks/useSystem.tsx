"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { useQuery as useTanstackQuery } from "@tanstack/react-query";

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

export const KILL_SUB_SERVICE_DOCUMENT = graphql(`
  mutation killSubService($service: String!) {
    killSubService(service: $service)
  }
`);

export const START_SUB_SERVICE_DOCUMENT = graphql(`
  mutation startSubService($service: String!) {
    startSubService(service: $service)
  }
`);

export const GET_MICROSERVICE_STATUS_DOCUMENT = graphql(`
  query getMicroserviceStatus {
    getMicroserviceStatus {
      pids
      service
    }
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

export const GET_IS_BOT_HOOK_RUNNING_DOCUMENT = graphql(`
  query getIsBotHookRunning {
    isBotHookRunning
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
    } else if (error) {
      enqueueSnackbar("Failed at pausing system!", {
        variant: "error",
      });
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
    } else if (error) {
      enqueueSnackbar("Failed at resuming system!", {
        variant: "error",
      });
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

export function useIsBotHookRunning() {
  return useQuery(GET_IS_BOT_HOOK_RUNNING_DOCUMENT);
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
    } else if (error) {
      enqueueSnackbar("Failed at turn safe app!", {
        variant: "error",
      });
    }
  }, [data, error, enqueueSnackbar, client.cache]);

  return { makeSafeApp, loading };
}

export function useChangePassword() {
  const [changePassword, { data, error, loading }] = useMutation(
    CHANGE_PASSWORD_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.changePassword && !error) {
      enqueueSnackbar("Success at changing password!", {
        variant: "success",
      });
    } else if (error) {
      enqueueSnackbar("Failed at changing password!", {
        variant: "error",
      });
    }
  }, [data, error, enqueueSnackbar]);

  return { changePassword, loading };
}

export function useGetMicroserviceStatus() {
  const client = useApolloClient();

  const query = useTanstackQuery({
    queryKey: ["GET_MICROSERVICE_STATUS_DOCUMENT"],
    queryFn: async () => {
      const result = await client.query({
        query: GET_MICROSERVICE_STATUS_DOCUMENT,
        fetchPolicy: "network-only", // always fresh
      });
      return result.data?.getMicroserviceStatus || [{
        __typename: "MicroserviceStatus" as const,
        pids: [],
        service: "",
      }];
    },
    refetchInterval: 10_000, // ⏳ auto refresh every 10s
    enabled: !!client,
  });

  return query.data || [];
}

export function useKillSubService() {
  const [killSubService, { data, error, loading }] = useMutation(
    KILL_SUB_SERVICE_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.killSubService && !error) {
      enqueueSnackbar("Success at killing sub service!", {
        variant: "success",
      });
    } else if (error) {
      enqueueSnackbar("Failed at killing sub service!", {
        variant: "error",
      });
    }
  }, [data, error, enqueueSnackbar]);

  return { killSubService, loading };
}

export function useStartSubService() {
  const [startSubService, { data, error, loading }] = useMutation(
    START_SUB_SERVICE_DOCUMENT,
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data?.startSubService && !error) {
      enqueueSnackbar("Success at starting sub service!", {
        variant: "success",
      });
    } else if (error) {
      enqueueSnackbar("Failed at starting sub service!", {
        variant: "error",
      });
    }
  }, [data, error, enqueueSnackbar]);

  return { startSubService, loading };
}
