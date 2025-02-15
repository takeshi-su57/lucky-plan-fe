"use server";

import { PlanDetailPanel } from "@/app-components/PlansWidget/PlanDetailPanel";

export default async function Page({
  params,
}: {
  params: Promise<{ planId: string }>;
}) {
  const planId = (await params).planId;

  if (!planId) {
    return null;
  }

  return <PlanDetailPanel planId={planId} />;
}
