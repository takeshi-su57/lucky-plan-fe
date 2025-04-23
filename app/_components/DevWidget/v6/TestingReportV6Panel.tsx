import { Card, CardBody, Chip, Spinner } from "@nextui-org/react";
import { TestingReportV5 } from "@/graphql/gql/graphql";
import { Virtuoso } from "react-virtuoso";

import { useGetTestingReportV5 } from "@/app-hooks/useHistory";

import { getPriceStr } from "@/utils/price";
import LineChart from "@/components/charts/LineChart";

export function TestingReportV6Panel() {
  const { reports, loading, fetchMore, hasMore } = useGetTestingReportV5();

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Virtuoso
        style={{ height: 700 }}
        data={reports}
        itemContent={(_, item) => <ReportView key={item.id} report={item} />}
        endReached={() => hasMore && !loading && fetchMore()}
        components={{
          Footer: () => (
            <div className="flex w-full items-center justify-center">
              {hasMore === false ? (
                <span className="font-sans text-neutral-400/40">
                  No More Results Available
                </span>
              ) : loading ? (
                <Spinner color="warning" size="lg" />
              ) : null}
            </div>
          ),
        }}
      />
    </div>
  );
}

export function ReportView({ report }: { report: TestingReportV5 }) {
  let usdPnl = 0;

  const accPnls = report.usdPnls.map((pnl) => {
    usdPnl += pnl;
    return usdPnl;
  });

  return (
    <Card>
      <CardBody className="flex flex-col gap-4">
        <Chip color="primary">{report.id}</Chip>

        <div className="flex items-center gap-3">
          <span>Invested: {getPriceStr(-report.investedUSD)} USDC</span>
          <span>Total Pnl: {getPriceStr(report.totalUSDPnl)} USDC</span>
          <span>Max Lost: {getPriceStr(report.maxLoss)} USDC</span>
          <span>Avg Lost: {getPriceStr(report.avgLoss)} USDC</span>
          <span>Max Profit: {getPriceStr(report.maxProfit)} USDC</span>
          <span>Avg Profit: {getPriceStr(report.avgProfit)} USDC</span>

          <span>Total Tasks: {report.totalTasks}</span>
          <span>Total Positions: {report.totalPositions}</span>
          <span>Total Traders: {report.totalTraders}</span>
          <span>Total Unique Traders: {report.totalUniqueTraders}</span>
        </div>

        <div className="flex items-center gap-3">
          <span>Loss Count: {report.lossCount}</span>
          <span>Profit Count: {report.profitCount}</span>

          <span>R2: {report.calculatedR2}</span>
          <span>Slope: {report.calculatedSlope}</span>
          <span>Peak Acc Profit: {report.peakAccProfit}</span>
          <span>Bottom Acc Profit: {report.bottomAccProfit}</span>
        </div>

        <div className="flex items-center gap-3">
          <span>n: {report.n}</span>
          <span>m: {report.m}</span>
          <span>minScore: {report.minScore}</span>
          <span>Window: {report.window}</span>
          <span>Min R2: {report.minR2}</span>
        </div>

        <LineChart
          title={`PnL`}
          data={accPnls.map((pnl, index) => ({
            label: index.toString(),
            value: pnl,
          }))}
          className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
        />
      </CardBody>
    </Card>
  );
}
