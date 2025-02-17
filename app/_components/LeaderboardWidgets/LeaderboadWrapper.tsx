"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { PnlSnapshotKind } from "@/graphql/gql/graphql";

import { Leaderboard } from "./Leaderboard";

export function LeaderboadWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeParams = (
    contractId: string | null,
    kind: PnlSnapshotKind,
  ) => {
    const contractQuery = contractId ? `contractId=${contractId}` : null;
    const kindQuery = kind ? `kind=${kind}` : null;

    router.push(
      `/leaderboards?${contractQuery || ""}${contractQuery && kindQuery ? `&` : ""}${kindQuery || ""}`,
    );
  };

  return (
    <Leaderboard
      endDate={new Date()}
      initialContractId={searchParams.get("contractId") || null}
      initialKind={
        (searchParams.get("kind") as PnlSnapshotKind) || PnlSnapshotKind.AllTime
      }
      onChangeParams={handleChangeParams}
      hideTags={false}
    />
  );
}
