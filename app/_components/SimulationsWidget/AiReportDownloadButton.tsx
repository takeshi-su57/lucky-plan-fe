"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useSnackbar } from "notistack";

import { LOCAL_USER_JWT_KEY } from "@/app/_hooks/useUserJWT";

type AiReportDownloadButtonProps = {
  researchId: number;
  ready: boolean;
  generating: boolean;
  hasError: boolean;
};

export function AiReportDownloadButton({
  researchId,
  ready,
  generating,
  hasError,
}: AiReportDownloadButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const downloadAiReport = async () => {
    try {
      setDownloading(true);
      const token = window.localStorage.getItem(LOCAL_USER_JWT_KEY);
      const apiBase = process.env.NEXT_PUBLIC_LUCKY_PLAN_GRAPHQL_API.replace(
        /\/graphql$/,
        "",
      );
      const response = await fetch(
        `${apiBase}/simulation-researches/${researchId}/reports/ai`,
        {
          headers: token
            ? { Authorization: `Bearer ${JSON.parse(token)}` }
            : {},
        },
      );

      if (!response.ok) {
        throw new Error("Unable to export this research report");
      }

      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = `simulation-research-${researchId}-ai-standard.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
    } catch {
      enqueueSnackbar("Unable to download the AI report. Please try again.", {
        variant: "error",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button
      color="secondary"
      variant="flat"
      size="sm"
      isDisabled={!ready}
      isLoading={downloading || generating}
      onPress={() => void downloadAiReport()}
    >
      {ready
        ? "Download AI Report"
        : generating
          ? "AI report is generating"
          : hasError
            ? "AI report retry queued"
            : "AI report queued"}
    </Button>
  );
}
