"use client";

import { useRef, useEffect, useCallback } from "react";
import Chart from "chart.js/auto";
import { twMerge } from "tailwind-merge";
import { Button, useDisclosure } from "@nextui-org/react";
import { StandardModal } from "../modals/StandardModal";

export type BarChartProps = {
  title?: string;
  data: {
    value: number;
    label: string;
  }[];
  className?: string;
};

export default function BarChart({ title, data, className }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const modalChartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<Chart>();
  const modalRef = useRef<Chart>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const drawChart = useCallback(() => {
    if (ref.current) {
      ref.current.destroy();
    }

    if (data.length === 0) {
      data.push(
        ...[
          {
            value: 0,
            label: "",
          },
          {
            value: 0,
            label: "",
          },
        ],
      );
    }

    const chartContainer = chartRef.current!;

    ref.current = new Chart(chartContainer, {
      type: "bar",
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: "Amount",
            data: data.map((item) => item.value),
            backgroundColor: data.map((item) =>
              item.value > 0
                ? "oklch(0.448 0.119 151.328)"
                : "oklch(0.505 0.213 27.518)",
            ),
            borderWidth: 1,
            borderColor: data.map(() => "#fff"),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data]);

  useEffect(() => {
    if (!chartRef.current || !containerRef.current) {
      return;
    }

    drawChart();

    const observer = new ResizeObserver(() => {
      drawChart();
    });

    observer.observe(containerRef.current);

    return () => {
      ref.current?.destroy();
      observer.disconnect();
    };
  }, [drawChart]);

  const drawModalChart = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.destroy();
    }

    if (data.length === 0) {
      data.push(
        ...[
          {
            value: 0,
            label: "",
          },
          {
            value: 0,
            label: "",
          },
        ],
      );
    }

    const chartContainer = modalChartRef.current!;

    modalRef.current = new Chart(chartContainer, {
      type: "line",
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: "Amount",
            data: data.map((item) => item.value),
            pointRadius: 0,
            fill: {
              target: "origin",
              above: "#022c22", // Area will be red above the origin
              below: "#450a0a", // And blue below the origin
            },
            borderWidth: 1,
            borderColor: "#525252",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data]);

  useEffect(() => {
    if (!modalChartRef.current || !modalContainerRef.current || !isOpen) {
      return;
    }

    drawModalChart();

    const observer = new ResizeObserver(() => {
      drawModalChart();
    });

    observer.observe(modalContainerRef.current);

    return () => {
      modalRef.current?.destroy();
      observer.disconnect();
    };
  }, [drawModalChart, isOpen]);

  return (
    <div className="relative flex flex-col gap-3">
      <div className="absolute left-4 top-3 z-[1000] flex flex-row items-center gap-1">
        <span className="text-sm font-bold">{title || ""}</span>
        <Button size="sm" variant="ghost" onPress={onOpen}>
          Details
        </Button>
      </div>

      <div
        ref={containerRef}
        className={twMerge(
          "relative h-full w-full items-center justify-center gap-8 rounded-md p-3.5",
          className,
        )}
      >
        <canvas ref={chartRef} />
      </div>

      <StandardModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          base: "max-w-full max-h-full",
        }}
      >
        <div
          ref={modalContainerRef}
          className={twMerge(
            "relative h-full w-full items-center justify-center gap-8 rounded-md p-3.5",
            className,
          )}
        >
          <canvas ref={modalChartRef} />
        </div>
      </StandardModal>
    </div>
  );
}
