"use client";

import { useParams } from "next/navigation";

import { WorkerDetails } from "@/app/_components/SettingsWidget/WorkerDetails";

export default function WorkerDetailsPage() {
  const { workerId: rawId } = useParams<{ workerId: string }>();

  return <WorkerDetails workerId={decodeURIComponent(rawId)} />;
}
