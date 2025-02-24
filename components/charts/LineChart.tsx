"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Chart from "chart.js/auto";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { Button, Checkbox, useDisclosure } from "@nextui-org/react";
import { CheckboxGroup } from "@nextui-org/react";
import { StandardModal } from "../modals/StandardModal";

export type LineChartProps = {
  title?: string;
  data: {
    value: number;
    date: Date;
  }[];
  className?: string;
};

export default function LineChart({ title, data, className }: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const modalChartRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<Chart>();
  const modalRef = useRef<Chart>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selected, setSelected] = useState<string[]>([]);

  const drawChart = useCallback(() => {
    if (ref.current) {
      ref.current.destroy();
    }

    if (data.length === 0) {
      data.push(
        ...[
          {
            value: 0,
            date: new Date(),
          },
          {
            value: 0,
            date: new Date(),
          },
        ],
      );
    }

    const chartContainer = chartRef.current!;

    ref.current = new Chart(chartContainer, {
      type: "line",
      data: {
        labels: data.map((item) =>
          dayjs(new Date(item.date)).format("YYYY/MM/DD hh:mm:ss"),
        ),
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
            display: selected.includes("x"),
          },
          y: {
            display: selected.includes("y"),
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [data, selected]);

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
            date: new Date(),
          },
          {
            value: 0,
            date: new Date(),
          },
        ],
      );
    }

    const chartContainer = modalChartRef.current!;

    modalRef.current = new Chart(chartContainer, {
      type: "line",
      data: {
        labels: data.map((item) =>
          dayjs(new Date(item.date)).format("YYYY/MM/DD hh:mm:ss"),
        ),
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

      <div className="absolute bottom-4 right-4 z-[1000] flex flex-row items-center justify-between gap-0">
        <CheckboxGroup
          color="warning"
          value={selected}
          onValueChange={setSelected}
          orientation="horizontal"
        >
          <Checkbox value="x">X Scale</Checkbox>
          <Checkbox value="y">Y Scale</Checkbox>
        </CheckboxGroup>
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
