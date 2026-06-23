"use client";

import Link from "next/link";
import { Button, Spinner } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { Virtuoso } from "react-virtuoso";

import { SimulationPlanRow } from "./SimulationPlanRow";
import { useGetSimulationPlans } from "@/app/_hooks/useSimulations";

export function Simulations() {
  const { simultionPlans, hasMore, loading, fetchMore } =
    useGetSimulationPlans();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1>Simulations</h1>

        <Link href="/simulations/create">
          <Button isIconOnly color="primary" variant="flat">
            <FaPlus />
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex h-75 w-full items-center justify-center">
          <Spinner size="lg" color="warning" />
        </div>
      ) : (
        <Virtuoso
          style={{ height: "calc(100vh - 250px)", minHeight: 520 }}
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
