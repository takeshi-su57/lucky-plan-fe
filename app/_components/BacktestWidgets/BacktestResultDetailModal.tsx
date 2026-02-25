"use client";

import { useState, useMemo } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Tabs,
  Tab,
  Button,
} from "@heroui/react";
import { FiDownload } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import pako from "pako";

import { useBacktestResultFile } from "@/app-hooks/useBacktest";
import { BacktestChartView } from "./BacktestChartView";
import { BacktestConfigView } from "./BacktestConfigView";
import { BacktestTradeTable } from "./BacktestTradeTable";
import { BacktestSummaryView } from "./BacktestSummaryView";

/**
 * Decompress gzip+base64 encoded content
 */
function decompressContent(content: string, isCompressed: boolean): string {
  if (!isCompressed) {
    return content;
  }
  try {
    // Content is base64 encoded gzip - decode then decompress
    const binaryString = atob(content);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const decompressed = pako.ungzip(bytes, { to: "string" });
    return decompressed;
  } catch (error) {
    console.error("Failed to decompress content:", error);
    return content;
  }
}

export type BacktestResultDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  result: {
    id: string;
    taskId: string;
    configId: string;
    runDate: string;
    totalTrades: number;
    winningTrades: number;
    losingTrades: number;
    winRate: number;
    totalPnlUsdt: number;
    totalPnlPercent: number;
    maxDrawdownUsdt: number;
    maxDrawdownPercent: number;
    sharpeRatio?: number | null;
    profitFactor?: number | null;
    strategyConfig: unknown;
  };
  taskId: string;
};

type TabType = "chart" | "trades" | "summary" | "config";

export function BacktestResultDetailModal({
  isOpen,
  onClose,
  result,
  taskId,
}: BacktestResultDetailModalProps) {
  const [selectedTab, setSelectedTab] = useState<TabType>("chart");

  const { file: chartFile } = useBacktestResultFile(
    taskId,
    result.runDate,
    result.configId,
    "pnl-chart.png",
  );

  const { file: tradeDetailsFile } = useBacktestResultFile(
    taskId,
    result.runDate,
    result.configId,
    "trade-details.csv",
  );

  const { file: tradeSummaryFile } = useBacktestResultFile(
    taskId,
    result.runDate,
    result.configId,
    "trade-summary.csv",
  );

  const { file: configFile } = useBacktestResultFile(
    taskId,
    result.runDate,
    result.configId,
    "config.json",
  );

  // Decompress text files if needed
  const tradeDetailsContent = useMemo(() => {
    if (!tradeDetailsFile) return undefined;
    return decompressContent(
      tradeDetailsFile.content,
      tradeDetailsFile.isCompressed ?? false,
    );
  }, [tradeDetailsFile]);

  const tradeSummaryContent = useMemo(() => {
    if (!tradeSummaryFile) return undefined;
    return decompressContent(
      tradeSummaryFile.content,
      tradeSummaryFile.isCompressed ?? false,
    );
  }, [tradeSummaryFile]);

  const configContent = useMemo(() => {
    if (!configFile) return undefined;
    return decompressContent(
      configFile.content,
      configFile.isCompressed ?? false,
    );
  }, [configFile]);

  const handleDownload = (
    content: string,
    filename: string,
    contentType: string,
    isCompressed?: boolean,
  ) => {
    let blob: Blob;
    if (contentType.startsWith("image/")) {
      // Base64 decode for images
      const byteCharacters = atob(content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: contentType });
    } else {
      // Decompress if needed before downloading
      const textContent = decompressContent(content, isCompressed ?? false);
      blob = new Blob([textContent], { type: contentType });
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const isProfitable = result.totalPnlUsdt >= 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[90vh] max-w-[80vw]",
        body: "p-0",
      }}
    >
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col gap-4 p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-white">
                  Result Details - #{result.configId.slice(0, 8)}
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <span
                    className={twMerge(
                      "font-semibold",
                      isProfitable ? "text-success-400" : "text-danger-400",
                    )}
                  >
                    PnL: {isProfitable ? "+" : ""}$
                    {result.totalPnlUsdt.toFixed(2)} ({isProfitable ? "+" : ""}
                    {result.totalPnlPercent.toFixed(2)}%)
                  </span>
                  <span className="text-neutral-400">
                    Win Rate: {result.winRate.toFixed(1)}%
                  </span>
                  <span className="text-neutral-400">
                    Trades: {result.totalTrades}
                  </span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex items-center gap-2">
                {chartFile && (
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<FiDownload className="h-3 w-3" />}
                    onPress={() =>
                      handleDownload(
                        chartFile.content,
                        `chart-${result.configId}.png`,
                        chartFile.contentType,
                      )
                    }
                  >
                    Chart
                  </Button>
                )}
                {tradeDetailsFile && (
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<FiDownload className="h-3 w-3" />}
                    onPress={() =>
                      handleDownload(
                        tradeDetailsFile.content,
                        `trades-${result.configId}.csv`,
                        tradeDetailsFile.contentType,
                        tradeDetailsFile.isCompressed,
                      )
                    }
                  >
                    Trades CSV
                  </Button>
                )}
                {configFile && (
                  <Button
                    size="sm"
                    variant="flat"
                    startContent={<FiDownload className="h-3 w-3" />}
                    onPress={() =>
                      handleDownload(
                        configFile.content,
                        `config-${result.configId}.json`,
                        configFile.contentType,
                        configFile.isCompressed,
                      )
                    }
                  >
                    Config
                  </Button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              selectedKey={selectedTab}
              onSelectionChange={(key) => setSelectedTab(key as TabType)}
              variant="underlined"
            >
              <Tab key="chart" title="Chart" />
              <Tab key="trades" title="Trade Details" />
              <Tab key="summary" title="Summary" />
              <Tab key="config" title="Config" />
            </Tabs>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {selectedTab === "chart" && (
                <BacktestChartView
                  chartContent={chartFile?.content}
                  loading={!chartFile}
                />
              )}

              {selectedTab === "trades" && (
                <BacktestTradeTable
                  csvContent={tradeDetailsContent}
                  loading={!tradeDetailsContent}
                />
              )}

              {selectedTab === "summary" && (
                <BacktestSummaryView
                  csvContent={tradeSummaryContent}
                  result={result}
                  loading={!tradeSummaryContent}
                />
              )}

              {selectedTab === "config" && (
                <BacktestConfigView
                  configContent={configContent}
                  strategyConfig={result.strategyConfig}
                  loading={!configContent}
                />
              )}
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
