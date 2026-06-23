import { PerpTradeHistory } from "@/graphql/gql/graphql";
import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import dayjs from "dayjs";

export type SimulationPositionViewProps = {
  perpTradeHistory: PerpTradeHistory;
};

export function SimulationPositionView({
  perpTradeHistory,
}: SimulationPositionViewProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-t-neutral-400/20 py-6">
      <span className="text-xs text-neutral-600">
        {dayjs(new Date(perpTradeHistory.date)).format("YYYY/MM/DD hh:mm:ss")}
      </span>

      <JsonView
        data={perpTradeHistory}
        shouldExpandNode={allExpanded}
        style={defaultStyles}
      />
    </div>
  );
}
