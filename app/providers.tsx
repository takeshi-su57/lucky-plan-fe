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
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import "@rainbow-me/rainbowkit/styles.css";

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
    User: {
      keyFields: ["address"],
    },
    Follower: {
      keyFields: ["address"],
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
    Bot: {
      keyFields: ["id"],
    },
    Position: {
      keyFields: ["id"],
    },
    MissionShallowDetails: {
      keyFields: ["id"],
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
              <SnackbarProvider autoHideDuration={5000} maxSnack={5}>
                {children}
              </SnackbarProvider>
            </NextUIProvider>
          </ApolloProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
