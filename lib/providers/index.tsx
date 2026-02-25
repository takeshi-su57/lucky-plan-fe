"use client";

import { AppQueryProvider } from "@/lib/query/query-provider";
import { AppApolloProvider } from "@/lib/apollo/apollo-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppQueryProvider>
      <AppApolloProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AppApolloProvider>
    </AppQueryProvider>
  );
}
