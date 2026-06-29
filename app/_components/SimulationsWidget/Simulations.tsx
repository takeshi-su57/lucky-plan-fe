"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Spinner, Tab, Tabs } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { Virtuoso } from "react-virtuoso";

import { SimulationPlanRow } from "./SimulationPlanRow";
import { SimulationResearchRow } from "./SimulationResearchRow";
import {
  useGetSimulationPlans,
  useGetSimulationResearches,
} from "@/app/_hooks/useSimulations";

type SimulationTab = "auto" | "manual";

export function Simulations() {
  const [selected, setSelected] = useState<SimulationTab>("auto");
  const {
    simulationResearches,
    hasMore: hasMoreResearches,
    loading: researchesLoading,
    fetchMore: fetchMoreResearches,
  } = useGetSimulationResearches();
  const { simultionPlans, hasMore, loading, fetchMore } =
    useGetSimulationPlans();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1>Simulations</h1>

        <div className="flex items-center gap-2">
          <Link href="/simulations/create-plan">
            <Button color="primary" variant="light" size="sm">
              Manual Plan
            </Button>
          </Link>

          <Link href="/simulations/create">
            <Button
              color="primary"
              variant="flat"
              size="sm"
              startContent={<FaPlus />}
            >
              Auto Simulation
            </Button>
          </Link>
        </div>
      </div>

      <Tabs
        aria-label="simulation-tabs"
        selectedKey={selected}
        onSelectionChange={(value) => setSelected(value as SimulationTab)}
      >
        <Tab key="auto" title="Auto Simulations" />
        <Tab key="manual" title="Manual Plans" />
      </Tabs>

      {selected === "auto" && researchesLoading ? (
        <div className="flex h-75 w-full items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      ) : selected === "auto" ? (
        <Virtuoso
          style={{ height: "calc(100vh - 300px)", minHeight: 520 }}
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
      ) : loading ? (
        <div className="flex h-75 w-full items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      ) : (
        <Virtuoso
          style={{ height: "calc(100vh - 300px)", minHeight: 520 }}
          data={simultionPlans}
          endReached={() => {
            if (hasMore && !loading) fetchMore();
          }}
          overscan={200}
          itemContent={(_index, item) => (
            <SimulationPlanRow simulationPlan={item} />
          )}
          components={{
            Footer: () => (
              <div className="flex w-full items-center justify-center py-4">
                {hasMore === false ? (
                  <span className="font-sans text-neutral-400/40">
                    No More Results Available
                  </span>
                ) : hasMore ? (
                  <Button
                    variant="flat"
                    color="primary"
                    isLoading={loading}
                    onPress={() => fetchMore()}
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
