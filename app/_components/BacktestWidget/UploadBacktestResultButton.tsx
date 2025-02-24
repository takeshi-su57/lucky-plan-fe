"use client";

import { useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { useSnackbar } from "notistack";

import {
  BacktestHistory,
  useGetBacktestHistories,
} from "@/app/_hooks/useGetBacktestHistories";

export function UploadBacktestResultButton() {
  const { handleMerge } = useGetBacktestHistories();
  const { enqueueSnackbar } = useSnackbar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const jsonData = JSON.parse(event.target?.result as string);

          const invalidItem = jsonData.find((item: any) => {
            return !item.pastDate || !item.leaders || !item.parameters;
          });

          if (invalidItem) {
            enqueueSnackbar("Invalid Json File", {
              variant: "error",
            });

            return;
          }

          handleMerge(
            (jsonData as BacktestHistory[]).map(
              (item: any) =>
                ({
                  virtualId: item.virtualId,
                  pastDate: new Date(item.pastDate),
                  leaders: item.leaders,
                  parameters: {
                    ...item.parameters,
                    futureDate: new Date(item.parameters.futureDate),
                  },
                }) as BacktestHistory,
            ),
          );

          // Reset input value so same file can be selected again
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        } catch (err) {
          enqueueSnackbar("Failed to parse JSON", {
            variant: "error",
          });

          console.log(err);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Button
      variant="solid"
      color="primary"
      size="sm"
      onClick={() => {
        inputRef.current?.click();
      }}
    >
      <MdOutlineFileUpload />
      Upload
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleUpload}
      />
    </Button>
  );
}
