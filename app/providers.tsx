"use client";

import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SnackbarProvider } from "notistack";
import {
  split,
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

import { config } from "@/utils/wagmi";

import { predictionApi, predictionWss } from "@/utils/tizz";

import { UnixTime } from "@/utils/getUnixTime";

UnixTime.getGap();

const httpLink = new HttpLink({
  uri: `${predictionApi}/graphql`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: predictionWss,
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

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export type EventFeedData = {
  name: string;
  value: unknown;
};

export const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (

      <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloClient}>
            <NextUIProvider className="overflow-hidden">
              <SnackbarProvider
               
                autoHideDuration={5000}
                maxSnack={5}
              >
                {children}
              </SnackbarProvider>
            </NextUIProvider>
          </ApolloProvider>
      </QueryClientProvider>
  );
}
