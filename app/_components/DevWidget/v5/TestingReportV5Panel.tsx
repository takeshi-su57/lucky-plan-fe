import { useState } from "react";
import {
  Card,
  CardBody,
  Chip,
  Spinner,
  DatePicker,
  Button,
} from "@nextui-org/react";
import { TestingReportV3 } from "@/graphql/gql/graphql";
import { parseDate } from "@internationalized/date";
import dayjs from "dayjs";
import { Virtuoso } from "react-virtuoso";

import { useAutoTesting, useGetTestingReportV4 } from "@/app-hooks/useHistory";

import { getPriceStr } from "@/utils/price";
import { getServerTimezone } from "@/utils";
import LineChart from "@/components/charts/LineChart";

export function TestingReportV5Panel() {
  const { reports, loading, fetchMore, hasMore } = useGetTestingReportV4();

  const { autoTesting } = useAutoTesting();

  const [pastDate, setPastDate] = useState<Date>(
    parseDate("2024-11-01").toDate(getServerTimezone()),
  );

  const handleAutoBacktest = () => {
    autoTesting({
      variables: { startDate: dayjs(pastDate).format("YYYY-MM-DD") },
    });
  };

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner color="warning" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row items-center gap-4">
        <DatePicker
          className="max-w-[284px]"
          label="Pick a past date"
          value={parseDate(dayjs(pastDate).format("YYYY-MM-DD"))}
          onChange={(date) => setPastDate(date.toDate(getServerTimezone()))}
          minValue={parseDate("2024-11-01")}
          maxValue={parseDate(dayjs().format("YYYY-MM-DD"))}
        />

        <Button
          isLoading={loading}
          isDisabled={loading}
          onClick={handleAutoBacktest}
        >
          Auto Backtest
        </Button>
      </div>

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

export function ReportView({ report }: { report: TestingReportV3 }) {
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
          <span>
            Count: {report.minCount} - {report.maxCount}
          </span>
          <span>
            Size: {report.minSize} - {report.maxSize}
          </span>
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
