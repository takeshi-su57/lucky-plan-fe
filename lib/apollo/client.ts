import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { OperationTypeNode } from "graphql";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API,
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_WSS!,
        }),
      )
    : null;

const splitLink = wsLink
  ? ApolloLink.split(
      ({ operationType }) =>
        operationType === OperationTypeNode.SUBSCRIPTION,
      wsLink,
      httpLink,
    )
  : httpLink;

const authLink = new SetContextLink(({ headers }) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("user-jwt")
      : null;

  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${JSON.parse(token)}` } : {}),
    },
  };
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(splitLink),
});
