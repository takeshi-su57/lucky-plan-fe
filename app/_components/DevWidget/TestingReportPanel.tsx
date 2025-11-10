// import { Button, Card, CardBody, Chip, Spinner } from "@nextui-org/react";
// import { TestingReport } from "@/graphql/gql/graphql";
// import { Virtuoso } from "react-virtuoso";

// import { useAutoTesting, useGetTestingReport } from "@/app-hooks/useHistory";

// import { getPriceStr } from "@/utils/price";
// import LineChart from "@/components/charts/LineChart";
// import BarChart from "@/components/charts/BarChart";

// export function TestingReportPanel() {
//   const { reports, loading, fetchMore, hasMore } = useGetTestingReport();

//   const { autoTesting } = useAutoTesting();

//   const handleAutoBacktest = () => {
//     if (window.confirm("Are you sure you want to auto backtest?")) {
//       autoTesting({
//         variables: {},
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex w-full items-center justify-center">
//         <Spinner color="warning" size="lg" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       <Button
//         isLoading={loading}
//         isDisabled={loading}
//         onClick={handleAutoBacktest}
//       >
//         Auto Backtest
//       </Button>

//       <Virtuoso
//         style={{ height: 700 }}
//         data={reports}
//         itemContent={(_, item) => <ReportView key={item.id} report={item} />}
//         endReached={() => hasMore && !loading && fetchMore()}
//         components={{
//           Footer: () => (
//             <div className="flex w-full items-center justify-center">
//               {hasMore === false ? (
//                 <span className="font-sans text-neutral-400/40">
//                   No More Results Available
//                 </span>
//               ) : loading ? (
//                 <Spinner color="warning" size="lg" />
//               ) : null}
//             </div>
//           ),
//         }}
//       />
//     </div>
//   );
// }

// export function ReportView({ report }: { report: TestingReport }) {
//   let usdPnl = 0;
//   let maxDailyPnl = 0;
//   let minDailyPnl = 0;

//   const accPnls = report.usdPnls.map((pnl) => {
//     usdPnl += pnl;
//     if (pnl > maxDailyPnl) {
//       maxDailyPnl = pnl;
//     }
//     if (pnl < minDailyPnl) {
//       minDailyPnl = pnl;
//     }
//     return usdPnl;
//   });

//   return (
//     <Card>
//       <CardBody className="flex flex-col gap-4">
//         <Chip color="primary">{report.id}</Chip>

//         <div className="flex items-center gap-3">
//           <span>Invested: {getPriceStr(-report.investedUSD)} USDC</span>
//           <span>Total Pnl: {getPriceStr(report.totalUSDPnl)} USDC</span>

//           {/* <span>Max Daily Pnl: {getPriceStr(maxDailyPnl)} USDC</span>
//           <span className="text-red-700">
//             Min Daily Pnl: {getPriceStr(minDailyPnl)} USDC
//           </span> */}

//           <span>Total Tasks: {report.totalTasks}</span>
//           <span>Total Positions: {report.totalPositions}</span>
//           <span>Total Traders: {report.totalTraders}</span>
//           <span className="text-red-700">
//             Total Unique Traders: {report.totalUniqueTraders}
//           </span>

//           <span>Week: {report.weekWeight}</span>
//           <span>Month: {report.monthWeight}</span>
//           <span>Three Month: {report.threeMonthWeight}</span>
//           <span>All Time: {report.allTimeWeight}</span>
//         </div>

//         <div className="flex items-center gap-3">
//           {/* <span>n: {report.n}</span>
//           <span>m: {report.m}</span>
//           <span>minScore: {report.minScore}</span>
//           <span>Window: {report.window}</span> */}

//           <span>Min R2: {report.minR2}</span>

//           <span>Min Avg Size: {report.minAvgSize}</span>
//           <span>Max Avg Size: {report.maxAvgSize}</span>
//           <span>Min Count: {report.minCount}</span>
//           <span>Max Count: {report.maxCount}</span>
//         </div>

//         <LineChart
//           title={`PnL`}
//           data={accPnls.map((pnl, index) => ({
//             label: index.toString(),
//             value: pnl,
//           }))}
//           className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
//           initialSelected={["x", "y"]}
//         />

//         <BarChart
//           title={`Daily PNL`}
//           data={report.usdPnls.map((pnl, index) => ({
//             label: index.toString(),
//             value: pnl,
//           }))}
//           className="h-[250px] rounded-2xl border border-neutral-800 bg-amber-950/5"
//           initialSelected={["x", "y"]}
//         />
//       </CardBody>
//     </Card>
//   );
// }
