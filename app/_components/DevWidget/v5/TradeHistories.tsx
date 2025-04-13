import { Virtuoso } from "react-virtuoso";
import { DevHistoriesWidget } from "./DevHistoriesWidget";
import { Card } from "@nextui-org/react";
import { CardBody } from "@nextui-org/react";
import { TotalBot } from "@/graphql/gql/graphql";
import { useMemo } from "react";

export function TradeHistories({ totalBots }: { totalBots: TotalBot[] }) {
  const data = useMemo(() => {
    const mapObj: Record<string, TotalBot[]> = {};

    totalBots.forEach((bot) => {
      const key = JSON.stringify({
        address: bot.address,
        contractId: bot.contractId,
      });

      const arr = mapObj[key];

      if (arr) {
        arr.push(bot);
      } else {
        mapObj[key] = [bot];
      }
    });

    return Object.entries(mapObj).map(([key, value]) => {
      const { address, contractId } = JSON.parse(key) as {
        address: string;
        contractId: number;
      };

      return {
        address,
        contractId,
        bots: value,
      };
    });
  }, [totalBots]);

  return (
    <Card>
      <CardBody>
        <Virtuoso
          style={{ height: 700 }}
          data={data}
          itemContent={(_, item) => <DevHistoriesWidget item={item} />}
        />
      </CardBody>
    </Card>
  );
}
