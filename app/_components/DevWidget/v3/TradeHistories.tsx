import { Virtuoso } from "react-virtuoso";
import { DevHistoriesWidget } from "./DevHistoriesWidget";
import { Card } from "@nextui-org/react";
import { CardBody } from "@nextui-org/react";

export function TradeHistories({
  walletAddresses,
}: {
  walletAddresses: string[];
}) {
  return (
    <Card>
      <CardBody>
        <Virtuoso
          style={{ height: 700 }}
          data={walletAddresses}
          itemContent={(_, walletAddress) => (
            <DevHistoriesWidget walletAddress={walletAddress.toLowerCase()} />
          )}
        />
      </CardBody>
    </Card>
  );
}
