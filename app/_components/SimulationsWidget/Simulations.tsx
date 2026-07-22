"use client";

import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { Virtuoso } from "react-virtuoso";

import { SimulationResearchRow } from "./SimulationResearchRow";
import { useGetSimulationResearches } from "@/app/_hooks/useSimulations";

export function Simulations() {
  const {
    simulationResearches,
    hasMore: hasMoreResearches,
    loading: researchesLoading,
    fetchMore: fetchMoreResearches,
  } = useGetSimulationResearches();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1>Simulations</h1>

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

      {researchesLoading ? (
        <div className="flex h-75 w-full items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      ) : (
        <Virtuoso
          useWindowScroll
          data={simulationResearches}
          endReached={() => {
            if (hasMoreResearches && !researchesLoading) {
              fetchMoreResearches();
            }
          }}
          overscan={200}
          itemContent={(_index, item) => (
            <SimulationResearchRow simulationResearch={item} />
          )}
          components={{
            Footer: () => (
              <div className="flex w-full items-center justify-center py-4">
                {hasMoreResearches === false ? (
                  <span className="font-sans text-neutral-400/40">
                    No More Results Available
                  </span>
                ) : hasMoreResearches ? (
                  <Button
                    variant="flat"
                    color="primary"
                    isLoading={researchesLoading}
                    onPress={() => fetchMoreResearches()}
                  >
                    Load More
                  </Button>
                ) : null}
              </div>
            ),
          }}
        />
      )}
    </div>
  );
}
