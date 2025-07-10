import { useGetAllTradeHistory } from "@/app/_hooks/useHistory";
import { Address } from "viem";
import { HistoriesWidget } from "../LeaderboardWidgets/HistoriesWidget/HistoriesWidget";
import { Spinner } from "@nextui-org/react";

export type AnalyzeWidgetProps = {
  address: string;
};

export function AnalyzeWidget({ address }: AnalyzeWidgetProps) {
  const { histories, loading } = useGetAllTradeHistory(address, "0");

  return (
    <div className="flex flex-col gap-4">
      <h6>Analyze User</h6>
      <span>Address: {address}</span>
      {loading ? (
        <Spinner color="warning" size="lg" />
      ) : (
        <HistoriesWidget
          address={address as Address}
          histories={histories}
          hideTags
          label={address}
          mode="show_all_activity"
        />
      )}
    </div>
  );
}
