import { Accordion, AccordionItem, Chip } from "@nextui-org/react";
import dayjs from "dayjs";

export type TaskLogViewProps = {
  id: number;
  taskLog: string;
};

export function TaskLogView({ id, taskLog }: TaskLogViewProps) {
  const log = JSON.parse(taskLog);

  return (
    <Accordion isCompact variant="splitted">
      <AccordionItem
        key={id}
        title={
          <div className="flex items-center gap-6">
            <Chip>{`Log ${id}`}</Chip>{" "}
            <span className="text-xs">
              {dayjs(new Date(log.timestamp)).format("YYYY/MM/DD hh:mm:ss")}
            </span>{" "}
          </div>
        }
      >
        <span className="text-wrap break-words text-xs text-neutral-400">
          {log.message || "Unknown log"}
        </span>
      </AccordionItem>
    </Accordion>
  );
}
