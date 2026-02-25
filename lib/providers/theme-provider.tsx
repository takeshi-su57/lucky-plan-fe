"use client";

import { RouterProvider } from "@heroui/react";
import { useRouter } from "next/navigation";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <RouterProvider navigate={(href) => router.push(href)}>
      {children}
    </RouterProvider>
  );
}
