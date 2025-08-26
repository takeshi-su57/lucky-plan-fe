"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Platform, PnlSnapshotKind } from "@/graphql/gql/graphql";

import { Leaderboard } from "./Leaderboard";

export function LeaderboadWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeParams = (kind: PnlSnapshotKind, platform: Platform) => {
    const kindQuery = kind ? `kind=${kind}` : null;
    const platformQuery = platform ? `platform=${platform}` : null;

    router.push(
      `/leaderboards?${kindQuery || ""}${kindQuery && platformQuery && "&"}${platformQuery || ""}}`,
    );
  };

  return (
    <Leaderboard
      endDate={new Date()}
      initialKind={
        (searchParams.get("kind") as PnlSnapshotKind) || PnlSnapshotKind.Month
      }
      initialPlatform={searchParams.get("platform") as Platform}
      onChangeParams={handleChangeParams}
      hideTags={false}
    />
  );
}
