"use client";
import { ReactNode, useEffect } from "react";
import { HeroUIProvider } from "@heroui/react";
import { getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  arbitrum,
  base,
  apeChain,
  arbitrumSepolia,
} from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import {
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
} from "@apollo/client";
import { LocalState } from "@apollo/client/local-state";
import { ApolloProvider } from "@apollo/client/react";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { relayStylePagination } from "@apollo/client/utilities";
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
import { useSubscribeBot } from "@/app-hooks/useAutomation";
import { useSubscribePlan } from "@/app-hooks/usePlan";
import { LOCAL_USER_JWT_KEY } from "@/app-hooks/useUserJWT";
import dynamic from "next/dynamic";
import { OperationTypeNode } from "graphql";

const RainbowKitProvider = dynamic(
  () => import("@rainbow-me/rainbowkit").then((mod) => mod.RainbowKitProvider),
  { ssr: false },
);

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API}`,
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_WSS,
    keepAlive: 30_000, // send ping every 30s to prevent Nginx timeout
    connectionParams: () => {
      const userJWTStr = localStorage.getItem(LOCAL_USER_JWT_KEY);
      return {
        authToken: userJWTStr ? `${JSON.parse(userJWTStr)}` : "",
      };
    },
  }),
);

const splitLink = ApolloLink.split(
  ({ operationType }) => {
    return operationType === OperationTypeNode.SUBSCRIPTION;
  },
  wsLink,
  httpLink,
);

const authLink = new SetContextLink(({ headers }) => {
  // get the authentication token from local storage if it exists
  const userJWTStr = localStorage.getItem(LOCAL_USER_JWT_KEY);

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: userJWTStr ? `Bearer ${JSON.parse(userJWTStr)}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getPnlSnapshotsV2: relayStylePagination([
          "kind",
          "platform",
          "dateStr",
          "isDesc",
        ]),
        getBotsByStatus: relayStylePagination(["status"]),
        getPlansByStatus: relayStylePagination(["status"]),
        allLogs: relayStylePagination(["checked", "severity"]),
        getAllFollowerDetails: relayStylePagination(["contractId"]),
        getExpertPnlSnapshotsV2: relayStylePagination(["platform"]),
        getPlanBotGroups: relayStylePagination(["planId"]),
        getSimulationPlans: relayStylePagination([]),
      },
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
    FollowerDetailsEdge: {
      keyFields: ["cursor"],
    },
    FollowerTrade: {
      keyFields: ["address", "index"],
    },
    FollowerPendingOrder: {
      keyFields: ["address", "index"],
    },
    Strategy: {
      keyFields: ["id"],
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
    Log: {
      keyFields: ["id"],
    },
    LogsEdge: {
      keyFields: ["cursor"],
    },
    ExpertPnlSnapshotV2Edge: {
      keyFields: ["cursor"],
    },
    ExpertPnlSnapshotV2: {
      keyFields: ["id"],
    },
    ExpertPnlSnapshotV2Node: {
      keyFields: ["id"],
    },
  },
});

export const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(splitLink),

  /*
  Inserted by Apollo Client 3->4 migration codemod.
  If you are not using the `@client` directive in your application,
  you can safely remove this option.
  */
  localState: new LocalState({}),
});

export const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "LuckyPlan",
  projectId: "aa850d82c6ce67f82647ab0498e00c8a",
  chains: [mainnet, polygon, arbitrum, base, apeChain, arbitrumSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#2563eb",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "rounded",
            overlayBlur: "none",
          })}
        >
          <ApolloProvider client={apolloClient}>
            <HeroUIProvider className="overflow-hidden">
              <SnackbarProvider
                Components={{
                  success: SuccessSnackbar,
                  warning: WarningSnackbar,
                  info: InfoSnackbar,
                  error: ErrorSnackbar,
                  default: DefaultSnackbar,
                }}
                maxSnack={15}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <SubscriptionWrapper>{children}</SubscriptionWrapper>
              </SnackbarProvider>
            </HeroUIProvider>
          </ApolloProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
    return;
  }

  if (
    Notification.permission === "granted" ||
    Notification.permission === "denied"
  ) {
    // Permission already granted or denied, don't request again
    return;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permission denied.");
  }
}

export function SubscriptionWrapper({ children }: { children: ReactNode }) {
  useSubscribePlan();
  useSubscribeTask();
  useSubscribeMission();
  useSubscribeBot();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return children;
}
