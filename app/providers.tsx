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
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

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
  },
});

export const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(splitLink),
});

(window as any).apolloClient = apolloClient;

export const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <NextUIProvider className="overflow-hidden">
          <SnackbarProvider autoHideDuration={5000} maxSnack={5}>
            {children}
          </SnackbarProvider>
        </NextUIProvider>
      </ApolloProvider>
    </QueryClientProvider>
  );
}
