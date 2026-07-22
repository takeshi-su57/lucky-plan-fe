type WorkerRuntimeStatusIndicatorProps = {
  runtimeStatus: string;
  className?: string;
};

export function WorkerRuntimeStatusIndicator({
  runtimeStatus,
  className = "",
}: WorkerRuntimeStatusIndicatorProps) {
  const isOffline = runtimeStatus === "Offline";
  const isBusy = runtimeStatus === "Busy";

  return (
    <span
      aria-label={`Worker is ${runtimeStatus.toLowerCase()}`}
      className={`h-2.5 w-2.5 shrink-0 rounded-full ${
        isOffline ? "bg-default-300" : "bg-success"
      } ${isBusy ? "animate-bounce" : ""} ${className}`}
      role="img"
      title={isBusy ? "Worker is busy" : `Worker is ${runtimeStatus}`}
    />
  );
}
