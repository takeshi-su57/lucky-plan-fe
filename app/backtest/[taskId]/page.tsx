"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { useParams, useRouter } from "next/navigation";

import { BacktestTaskDetail } from "../../_components/BacktestWidgets/BacktestTaskDetail";

export default function BacktestTaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.taskId as string;

  const handleBack = () => {
    router.push("/backtest");
  };

  return (
    <Suspense fallback={<Spinner color="white" size="sm" />}>
      <BacktestTaskDetail taskId={taskId} onBack={handleBack} />
    </Suspense>
  );
}
