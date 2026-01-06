"use client";

import React, { useMemo } from "react";
import { Spinner } from "@heroui/react";
import { TableVirtuoso } from "react-virtuoso";
import { twMerge } from "tailwind-merge";

export type BacktestTradeTableProps = {
  csvContent?: string;
  loading?: boolean;
};

export function BacktestTradeTable({
  csvContent,
  loading,
}: BacktestTradeTableProps) {
  const { headers, rows } = useMemo(() => {
    if (!csvContent) {
      return { headers: [], rows: [] };
    }

    try {
      const lines = csvContent.trim().split("\n");
      if (lines.length === 0) {
        return { headers: [], rows: [] };
      }

      const headers = lines[0].split(",").map((h) => h.trim());
      const rows: string[][] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim());
        if (values.length > 0) {
          rows.push(values);
        }
      }

      return { headers, rows };
    } catch {
      return { headers: [], rows: [] };
    }
  }, [csvContent]);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Spinner color="white" size="lg" />
      </div>
    );
  }

  if (rows.length === 0 || headers.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center text-neutral-400">
        No trade data available
      </div>
    );
  }

  // Helper to detect if a column contains numeric/PnL values for coloring
  const isPnlColumn = (header: string) => {
    const lowerHeader = header.toLowerCase();
    return (
      lowerHeader.includes("pnl") ||
      lowerHeader.includes("profit") ||
      lowerHeader.includes("loss")
    );
  };

  // Helper to detect if a column should be right-aligned (numeric)
  const isNumericColumn = (header: string) => {
    const lowerHeader = header.toLowerCase();
    return (
      lowerHeader.includes("price") ||
      lowerHeader.includes("size") ||
      lowerHeader.includes("pnl") ||
      lowerHeader.includes("profit") ||
      lowerHeader.includes("amount") ||
      lowerHeader.includes("qty") ||
      lowerHeader.includes("quantity") ||
      lowerHeader.includes("cum") ||
      lowerHeader.includes("drawdown")
    );
  };

  // Helper to detect side column for special styling
  const isSideColumn = (header: string) => {
    const lowerHeader = header.toLowerCase();
    return lowerHeader === "side" || lowerHeader === "direction";
  };

  const getPnlColor = (value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9.-]/g, ""));
    if (isNaN(numValue)) return "text-white";
    return numValue >= 0 ? "text-success-400" : "text-danger-400";
  };

  const renderCell = (value: string, headerIndex: number) => {
    const header = headers[headerIndex];

    // Side column - special badge styling
    if (isSideColumn(header)) {
      const isLong = value.toUpperCase() === "LONG" || value.toUpperCase() === "BUY";
      return (
        <span
          className={twMerge(
            "rounded px-2 py-0.5 text-xs font-semibold",
            isLong
              ? "bg-success-500/20 text-success-400"
              : "bg-danger-500/20 text-danger-400",
          )}
        >
          {value}
        </span>
      );
    }

    // PnL columns - colored based on value
    if (isPnlColumn(header)) {
      return (
        <span className={twMerge("font-semibold", getPnlColor(value))}>
          {value}
        </span>
      );
    }

    return value;
  };

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-800">
      <TableVirtuoso
        style={{ height: "450px" }}
        data={rows}
        fixedHeaderContent={() => (
          <tr className="bg-neutral-800">
            {headers.map((header, index) => (
              <th
                key={index}
                className={twMerge(
                  "px-3 py-2 text-xs font-semibold text-neutral-300 whitespace-nowrap",
                  isNumericColumn(header) ? "text-right" : "text-left",
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        )}
        itemContent={(_, row) => (
          <>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={twMerge(
                  "px-3 py-2 font-mono text-sm",
                  isNumericColumn(headers[cellIndex])
                    ? "text-right text-white"
                    : "text-left text-neutral-300",
                )}
              >
                {renderCell(cell, cellIndex)}
              </td>
            ))}
          </>
        )}
        components={{
          Table: ({ style, ...props }) => (
            <table
              {...props}
              style={style}
              className="w-full border-collapse"
            />
          ),
          TableRow: ({ style, ...props }) => (
            <tr
              {...props}
              style={style}
              className="border-b border-neutral-800 hover:bg-neutral-800/50"
            />
          ),
        }}
      />
      <div className="bg-neutral-800 px-3 py-2 text-xs text-neutral-400">
        Showing {rows.length} trades ({headers.length} columns)
      </div>
    </div>
  );
}
