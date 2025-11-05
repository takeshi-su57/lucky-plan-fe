"use client";

import { useEffect, useMemo } from "react";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { getFragmentData, graphql } from "@/gql/index";
import { TradingSignalLogInfoFragment } from "@/gql/graphql";

import { PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT } from "./useHistory";
import { useSnackbar } from "notistack";
import { SignalMessage } from "../_components/TradingSignalWidgets/SignalMessage";

export const TRADING_SIGNAL_LOG_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TradingSignalLogInfo on TradingSignalLog {
    id
    address
    platform
    eventLogs {
      ...PerpTradingEventLogInfo
    }
  }
`);

export const GET_TRADING_SIGNAL_LOGS_QUERY = graphql(`
  query getTradingSignalLogs {
    getTradingSignalLogs {
      ...TradingSignalLogInfo
    }
  }
`);

export const REGISTER_TRADING_SIGNAL_MUTATION_DOCUMENT = graphql(`
  mutation registerTradingSignalLog($address: String!, $platform: Platform!) {
    registerTradingSignalLog(address: $address, platform: $platform) {
      ...TradingSignalLogInfo
    }
  }
`);

export const UNREGISTER_TRADING_SIGNAL_MUTATION_DOCUMENT = graphql(`
  mutation unregisterTradingSignalLog($signalId: Int!) {
    unregisterTradingSignalLog(signalId: $signalId) {
      ...TradingSignalLogInfo
    }
  }
`);

export const REMOVE_EVENT_LOGS_FROM_TRADING_SIGNAL_LOG_MUTATION_DOCUMENT =
  graphql(`
    mutation removeEventLogsFromTradingSignalLog(
      $eventLogIds: [Int!]!
      $signalId: Int!
    ) {
      removeEventLogsFromTradingSignalLog(
        eventLogIds: $eventLogIds
        signalId: $signalId
      ) {
        ...TradingSignalLogInfo
      }
    }
  `);

export const TRADING_SIGNAL_LOG_UPDATED_SUBSCRIPTION_DOCUMENT = graphql(`
  subscription tradingSignalLogUpdated {
    tradingSignalLogUpdated {
      id
      eventLogs {
        ...PerpTradingEventLogInfo
      }
    }
  }
`);

export function getTradingSignalLogs(
  log: {
    __typename?: "TradingSignalLog";
  } & {
    " $fragmentRefs"?: {
      TradingSignalLogInfoFragment: TradingSignalLogInfoFragment;
    };
  },
) {
  const signals = getFragmentData(
    TRADING_SIGNAL_LOG_INFO_FRAGMENT_DOCUMENT,
    log,
  );

  const eventLogs = signals.eventLogs.map((eventLog) =>
    getFragmentData(PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT, eventLog),
  );

  return {
    ...signals,
    eventLogs,
  };
}

export function useRegisterTradingSignal() {
  const [registerTradingSignalLog, { error, loading }] = useMutation(
    REGISTER_TRADING_SIGNAL_MUTATION_DOCUMENT,
  );

  return {
    registerTradingSignalLog,
    loading,
    error,
  };
}

export function useUnregisterTradingSignal() {
  const [unregisterTradingSignalLog, { error, loading }] = useMutation(
    UNREGISTER_TRADING_SIGNAL_MUTATION_DOCUMENT,
  );

  return {
    unregisterTradingSignalLog,
    loading,
    error,
  };
}

export function useRemoveEventLogsFromTradingSignalLog() {
  const [removeEventLogsFromTradingSignalLog, { error, loading }] = useMutation(
    REMOVE_EVENT_LOGS_FROM_TRADING_SIGNAL_LOG_MUTATION_DOCUMENT,
  );

  return {
    removeEventLogsFromTradingSignalLog,
    loading,
    error,
  };
}

export function useGetTradingSignalLogs() {
  const { data, error, loading } = useQuery(GET_TRADING_SIGNAL_LOGS_QUERY);

  const tradingSignalLogs = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getTradingSignalLogs.map(getTradingSignalLogs);
  }, [data]);

  return { tradingSignalLogs, loading, error };
}

export function useSubscribeTradingSignalLogs() {
  const { data: newData, error } = useSubscription(
    TRADING_SIGNAL_LOG_UPDATED_SUBSCRIPTION_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (newData && !error) {
      const tradingSignalLogUpdated = newData.tradingSignalLogUpdated.map(
        (log) => ({
          id: log.id,
          eventLogs: log.eventLogs.map((eventLog) =>
            getFragmentData(PERP_EVENT_LOGS_INFO_FRAGMENT_DOCUMENT, eventLog),
          ),
        }),
      );

      enqueueSnackbar(<SignalMessage signals={tradingSignalLogUpdated} />, {
        variant: "default",
        autoHideDuration: 30000,
      });

      tradingSignalLogUpdated.forEach((tradingSignalLog) => {
        const old = client.cache.readFragment({
          id: client.cache.identify({
            __typename: "TradingSignalLog",
            id: tradingSignalLog.id,
          }),
          fragment: TRADING_SIGNAL_LOG_INFO_FRAGMENT_DOCUMENT,
          fragmentName: "TradingSignalLogInfo",
        });

        if (old) {
          const updated = {
            ...old,
            eventLogs: [...old.eventLogs, ...tradingSignalLog.eventLogs],
          };

          client.cache.writeFragment({
            id: client.cache.identify({
              __typename: "TradingSignalLog",
              id: tradingSignalLog.id,
            }),
            fragment: TRADING_SIGNAL_LOG_INFO_FRAGMENT_DOCUMENT,
            fragmentName: "TradingSignalLogInfo",
            data: updated,
          });
        }
      });
    }
  }, [client.cache, enqueueSnackbar, error, newData]);
}
