"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { Leaderboard } from "./Leaderboard";

export function LeaderboadWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeParams = (kind: PnlSnapshotKind) => {
    const kindQuery = kind ? `kind=${kind}` : null;

    router.push(`/leaderboards?${kindQuery || ""}`);
  };

  return (
    <Leaderboard
      endDate={new Date()}
      initialKind={
        (searchParams.get("kind") as PnlSnapshotKind) || PnlSnapshotKind.Month
      }
      onChangeParams={handleChangeParams}
      hideTags={false}
    />
  );
}
