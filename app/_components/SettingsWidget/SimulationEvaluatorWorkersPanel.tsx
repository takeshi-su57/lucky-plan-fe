"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Spinner,
  useDisclosure,
} from "@heroui/react";

import { ButtonWithConfirm } from "@/components/buttons/ButtonWithConfirm";
import {
  DataTable,
  type TableColumnProps,
} from "@/components/tables/DataTable";
import {
  useApproveSimulationEvaluatorWorker,
  useRejectSimulationEvaluatorWorker,
  useRemoveRejectedSimulationEvaluatorWorker,
  useSimulationEvaluatorWorkers,
} from "@/app/_hooks/useSimulationEvaluatorWorkers";

import { PrebuildWorkerCacheModal } from "./PrebuildWorkerCacheModal";

const columns: TableColumnProps[] = [
  { id: "worker", component: "Worker" },
  { id: "status", component: "Status" },
  { id: "caches", component: "Platform caches" },
  { id: "action", component: "" },
];

export function SimulationEvaluatorWorkersPanel() {
  const { data, loading } = useSimulationEvaluatorWorkers();
  const [approve, { loading: approving }] =
    useApproveSimulationEvaluatorWorker();
  const [reject, { loading: rejecting }] = useRejectSimulationEvaluatorWorker();
  const [remove, { loading: removing }] =
    useRemoveRejectedSimulationEvaluatorWorker();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [prebuildWorker, setPrebuildWorker] = useState<{
    id: string;
    displayName: string;
  } | null>(null);

  const rows = useMemo(
    () =>
      (data?.simulationEvaluatorWorkers || []).map((worker) => ({
        id: worker.id,
        data: {
          worker: {
            component: (
              <div>
                <div>{worker.displayName}</div>
                <div className="text-default-400 text-xs">{worker.id}</div>
              </div>
            ),
          },
          status: {
            component: (
              <Chip
                size="sm"
                color={
                  worker.authorizationStatus === "Approved"
                    ? "success"
                    : worker.authorizationStatus === "Rejected"
                      ? "danger"
                      : "warning"
                }
              >
                {worker.authorizationStatus} / {worker.runtimeStatus}
              </Chip>
            ),
          },
          caches: {
            component: worker.platformCaches.length
              ? worker.platformCaches
                  .map((cache) => `${cache.platform}: ${cache.status}`)
                  .join(", ")
              : "No platform cache",
          },
          action: {
            component: (
              <div className="flex flex-wrap gap-2">
                {worker.authorizationStatus === "Pending" && (
                  <>
                    <Button
                      size="sm"
                      color="success"
                      isLoading={approving}
                      onPress={() =>
                        approve({ variables: { workerId: worker.id } })
                      }
                    >
                      Approve
                    </Button>
                    <ButtonWithConfirm
                      size="sm"
                      color="danger"
                      isLoading={rejecting}
                      onPress={() =>
                        reject({ variables: { workerId: worker.id } })
                      }
                    >
                      Reject
                    </ButtonWithConfirm>
                  </>
                )}
                {worker.authorizationStatus === "Approved" && (
                  <Button
                    size="sm"
                    color="primary"
                    onPress={() => {
                      setPrebuildWorker(worker);
                      onOpen();
                    }}
                  >
                    Prebuild cache
                  </Button>
                )}
                {worker.authorizationStatus === "Rejected" && (
                  <ButtonWithConfirm
                    size="sm"
                    color="danger"
                    variant="flat"
                    isLoading={removing}
                    onPress={() =>
                      remove({ variables: { workerId: worker.id } })
                    }
                  >
                    Remove
                  </ButtonWithConfirm>
                )}
              </div>
            ),
          },
        },
      })),
    [data, approve, approving, reject, rejecting, remove, removing, onOpen],
  );

  if (loading) return <Spinner />;

  return (
    <Card>
      <CardBody className="gap-4">
        <h6 className="text-lg">Simulation Evaluator Workers</h6>
        <DataTable
          columns={columns}
          rows={rows}
          EmptyContent="No worker enrollment requests"
        />
        {prebuildWorker && (
          <PrebuildWorkerCacheModal
            worker={prebuildWorker}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          />
        )}
      </CardBody>
    </Card>
  );
}
