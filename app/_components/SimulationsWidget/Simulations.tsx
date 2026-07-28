"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";

import { SimulationResearchRow } from "./SimulationResearchRow";
import { BatchAiReportDownloadButton } from "./BatchAiReportDownloadButton";
import { useGetSimulationResearches } from "@/app/_hooks/useSimulations";
import { PaginatedViews } from "@/components/views/PaginatedViews";

const RESEARCHES_PER_PAGE = 10;

export function Simulations() {
  const [page, setPage] = useState(1);
  const {
    simulationResearches,
    loading: researchesLoading,
    total,
  } = useGetSimulationResearches(page, RESEARCHES_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(total / RESEARCHES_PER_PAGE));

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages));
  }, [totalPages]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1>Simulations</h1>

        <div className="flex items-center gap-2">
          <BatchAiReportDownloadButton />
          <Link href="/simulations/create">
            <Button
              color="primary"
              variant="flat"
              size="sm"
              startContent={<FaPlus />}
            >
              Create Simulation
            </Button>
          </Link>
        </div>
      </div>

      <PaginatedViews
        currentPage={page}
        totalPages={totalPages}
        loading={researchesLoading}
        onChangePage={setPage}
      >
        <div className="flex flex-col gap-4">
          {simulationResearches.map((simulationResearch) => (
            <SimulationResearchRow
              key={simulationResearch.id}
              simulationResearch={simulationResearch}
            />
          ))}
        </div>
      </PaginatedViews>
    </div>
  );
}
