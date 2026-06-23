"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { AnalyzePanel } from "@/app-components/ExpertWidgets/AnalyzePanel";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="border-default-200 flex items-center border-b pb-4">
        <Button
          variant="bordered"
          size="sm"
          startContent={<FiArrowLeft />}
          onPress={() => router.push("/leaderboards")}
          className="h-9 rounded-lg px-4 text-xs font-semibold"
        >
          Back
        </Button>
      </div>

      <AnalyzePanel />
    </div>
  );
}
