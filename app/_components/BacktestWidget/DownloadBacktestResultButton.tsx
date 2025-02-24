import { MdDownload } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { useGetBacktestHistories } from "@/app-hooks/useGetBacktestHistories";
import dayjs from "dayjs";

export function DownloadBacktestResultButton() {
  const { data: savedBacktests } = useGetBacktestHistories();

  const handleDownload = () => {
    if (savedBacktests.length > 0) {
      const content = JSON.stringify(savedBacktests);

      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backtest-results-${dayjs(new Date()).format(
        "YYYY-MM-DD hh:mm:ss",
      )}.json`;
      a.click();
    }
  };

  return (
    <Button variant="solid" color="primary" size="sm" onClick={handleDownload}>
      <MdDownload />
      Download
    </Button>
  );
}
