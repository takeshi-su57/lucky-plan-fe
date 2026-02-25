"use client";

import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./client";

export function AppApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
