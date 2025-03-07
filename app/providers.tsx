"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import {
  split,
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import {
  getMainDefinition,
  relayStylePagination,
} from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import "@rainbow-me/rainbowkit/styles.css";
import { useSubscribeTask } from "@/app-hooks/useTask";
import { useSubscribeMission } from "@/app-hooks/useMission";

import {
  SuccessSnackbar,
  DefaultSnackbar,
  ErrorSnackbar,
  WarningSnackbar,
  InfoSnackbar,
} from "@/components/snackbars";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API}`,
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_WSS,
    retryAttempts: Infinity,
    onNonLazyError: (error) => {
      console.error("WebSocket connection failed:", error);
    },
    shouldRetry: () => true,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPnlSnapshots: relayStylePagination(["contractId", "kind"]),
        getBotsByStatus: relayStylePagination(["status"]),
        getPlansByStatus: relayStylePagination(["status"]),
        allLogs: relayStylePagination(["checked", "severity"]),
      },
    },
    TagCategory: { keyFields: ["id"] },
    Tag: {
      keyFields: ["tag"],
    },
    User: {
      keyFields: ["address"],
    },
    Follower: {
      keyFields: ["address"],
    },
    FollowerDetails: {
      keyFields: ["address", "contractId"],
    },
    Strategy: {
      keyFields: ["id"],
    },
    StrategyMetadata: {
      keyFields: ["key"],
    },
    Contract: {
      keyFields: ["id"],
    },
    Plan: {
      keyFields: ["id"],
    },
    PlanForwardShallowDetails: {
      keyFields: ["id"],
    },
    PlanForwardDetails: {
      keyFields: ["id"],
    },
    BotDetails: {
      keyFields: ["id"],
    },
    BotForwardShallowDetails: {
      keyFields: ["id"],
    },
    BotForwardDetails: {
      keyFields: ["id"],
    },
    BotBackwardDetails: {
      keyFields: ["id"],
    },
    BotEdge: {
      keyFields: ["cursor"],
    },
    Position: {
      keyFields: ["id"],
    },
    Mission: {
      keyFields: ["id"],
    },
    MissionDetails: {
      keyFields: ["id"],
    },
    MissionBackwardDetails: {
      keyFields: ["id"],
    },
    MissionForwardDetails: {
      keyFields: ["id"],
    },
    TaskBackwardDetails: {
      keyFields: ["id"],
    },
    TaskForwardDetails: {
      keyFields: ["id"],
    },
    Action: {
      keyFields: ["id"],
    },
    FollowerActionDetails: {
      keyFields: ["id"],
    },
    PnlSnapshotDetails: {
      keyFields: ["id"],
    },
    PnlSnapshotDetailsEdge: {
      keyFields: ["cursor"],
    },
    PnlSnapshotInitializedFlag: {
      keyFields: ["id"],
    },
    TradeHistory: {
      keyFields: ["id"],
    },
    Log: {
      keyFields: ["id"],
    },
    LogsEdge: {
      keyFields: ["cursor"],
    },
  },
});

export const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(splitLink),
});

export const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "LuckyPlan",
  projectId: "aa850d82c6ce67f82647ab0498e00c8a",
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#10b981",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "rounded",
            overlayBlur: "none",
          })}
        >
          <ApolloProvider client={apolloClient}>
            <NextUIProvider className="overflow-hidden">
              <SnackbarProvider
                Components={{
                  success: SuccessSnackbar,
                  warning: WarningSnackbar,
                  info: InfoSnackbar,
                  error: ErrorSnackbar,
                  default: DefaultSnackbar,
                }}
                autoHideDuration={30000}
                maxSnack={15}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <SubscriptionWrapper>{children}</SubscriptionWrapper>
              </SnackbarProvider>
            </NextUIProvider>
          </ApolloProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function SubscriptionWrapper({ children }: { children: ReactNode }) {
  useSubscribeTask();
  useSubscribeMission();

  return children;
}
