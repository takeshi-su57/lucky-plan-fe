"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";

import { Followers } from "@/app-components/FollowerWidgets/Followers";

export default function Page() {
  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <Followers />
    </Suspense>
  );
}
