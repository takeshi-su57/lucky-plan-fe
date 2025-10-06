/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n": types.BotDetailsInfoFragmentDoc,
    "\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n": types.BotForwardDetailsInfoFragmentDoc,
    "\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n": types.BotBackwardDetailsInfoFragmentDoc,
    "\n  query getBotsByStatus($status: BotStatus!, $first: Int!, $after: Int) {\n    getBotsByStatus(status: $status, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...BotForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetBotsByStatusDocument,
    "\n  query getActiveBots {\n    getActiveBots {\n      ...BotForwardDetailsInfo\n    }\n  }\n": types.GetActiveBotsDocument,
    "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.CreateBotDocument,
    "\n  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {\n    batchCreateBots(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.BatchCreateBotsDocument,
    "\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.DeleteBotDocument,
    "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id)\n  }\n": types.LiveBotDocument,
    "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id)\n  }\n": types.StopBotDocument,
    "\n  subscription botCreated($userId: String!) {\n    botCreated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.BotCreatedDocument,
    "\n  subscription botUpdated($userId: String!) {\n    botUpdated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.BotUpdatedDocument,
    "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    isTestnet\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n": types.ContractInfoFragmentDoc,
    "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n": types.GetAllContractsDocument,
    "\n  query getAdaptionStatus {\n    getAdaptionStatus\n  }\n": types.GetAdaptionStatusDocument,
    "\n  mutation disableContract($contractId: Int!) {\n    disableContract(contractId: $contractId) {\n      ...ContractInfo\n    }\n  }\n": types.DisableContractDocument,
    "\n  mutation liveContract($contractId: Int!, $fromBlock: Int) {\n    liveContract(contractId: $contractId, fromBlock: $fromBlock) {\n      ...ContractInfo\n    }\n  }\n": types.LiveContractDocument,
    "\n  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {\n    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)\n  }\n": types.StartAdaptionDocument,
    "\n  fragment FollowerInfo on Follower {\n    userId\n    address\n    accountIndex\n    publicKey\n  }\n": types.FollowerInfoFragmentDoc,
    "\n  fragment FollowerTradeInfo on FollowerTrade {\n    address\n    index\n    mission {\n      ...MissionForwardDetailsInfo\n    }\n    params\n  }\n": types.FollowerTradeInfoFragmentDoc,
    "\n  fragment FollowerPendingOrderInfo on FollowerPendingOrder {\n    params\n    address\n    index\n  }\n": types.FollowerPendingOrderInfoFragmentDoc,
    "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    usdcBalance\n    contractId\n    pnlSnapshots {\n      ...PnlSnapshotInfo\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n": types.FollowerDetailInfoFragmentDoc,
    "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n": types.GetAllFollowersDocument,
    "\n  query getAllFollowerDetails($contractId: Int!, $after: Int, $first: Int!) {\n    getAllFollowerDetails(\n      contractId: $contractId\n      after: $after\n      first: $first\n    ) {\n      edges {\n        cursor\n        node {\n          ...FollowerDetailInfo\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.GetAllFollowerDetailsDocument,
    "\n  mutation closeTradeMarket($input: CloseTradeInput!) {\n    closeTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.CloseTradeMarketDocument,
    "\n  mutation cancelOrderAfterTimeout($input: CancelOrderAfterTimeoutInput!) {\n    cancelOrderAfterTimeout(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.CancelOrderAfterTimeoutDocument,
    "\n  mutation updateSl($input: UpdateSlInput!) {\n    updateSl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.UpdateSlDocument,
    "\n  mutation updateTp($input: UpdateTpInput!) {\n    updateTp(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.UpdateTpDocument,
    "\n  mutation withdrawPositivePnl($input: WithdrawPositivePnlInput!) {\n    withdrawPositivePnl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.WithdrawPositivePnlDocument,
    "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n": types.GenerateNewFollowerDocument,
    "\n  mutation withdrawAllUSDC($input: WithdrawAllInput!) {\n    withdrawAllUSDC(input: $input)\n  }\n": types.WithdrawAllUsdcDocument,
    "\n  mutation withdrawAllETH($input: WithdrawAllInput!) {\n    withdrawAllETH(input: $input)\n  }\n": types.WithdrawAllEthDocument,
    "\n  mutation withdrawETHToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawETHToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n": types.WithdrawEthToUserDocument,
    "\n  mutation withdrawUSDCToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawUSDCToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n": types.WithdrawUsdcToUserDocument,
    "\n  fragment TradeHistoryInfo on TradeHistory {\n    action\n    address\n    block\n    collateralDelta\n    collateralIndex\n    collateralPriceUsd\n    contractId\n    date\n    id\n    leverage\n    leverageDelta\n    long\n    marketPrice\n    pair\n    pnl\n    price\n    size\n    tradeId\n    tradeIndex\n    isCounterTrade\n    meta\n  }\n": types.TradeHistoryInfoFragmentDoc,
    "\n  fragment PnlSnapshotInfo on PnlSnapshot {\n    accUSDPnl\n    address\n    contractId\n    dateStr\n    id\n    kind\n  }\n": types.PnlSnapshotInfoFragmentDoc,
    "\n  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {\n    accUSDPnl\n    address\n    contractId\n    dateStr\n    histories {\n      ...TradeHistoryInfo\n    }\n    id\n    kind\n  }\n": types.PnlSnapshotDetailsInfoFragmentDoc,
    "\n  fragment PerpTradingEventLogInfo on PerpTradingEventLog {\n    address\n    block\n    contractId\n    date\n    id\n    jsonLog\n    logIndex\n    platform\n    usdPnl\n  }\n": types.PerpTradingEventLogInfoFragmentDoc,
    "\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    perpTradingEventLogs {\n      ...PerpTradingEventLogInfo\n    }\n    platform\n  }\n": types.PnlSnapshotV2DetailsInfoFragmentDoc,
    "\n  query getTradeTransactionCounts(\n    $addresses: [String!]!\n    $contractIds: [Int!]!\n  ) {\n    getTradeTransactionCounts(\n      addresses: $addresses\n      contractIds: $contractIds\n    ) {\n      daily\n      weekly\n      monthly\n    }\n  }\n": types.GetTradeTransactionCountsDocument,
    "\n  query getUserTransactionCounts($inputs: [GetUserTransactionCountsInput!]!) {\n    getUserTransactionCounts(inputs: $inputs) {\n      daily\n      weekly\n      monthly\n    }\n  }\n": types.GetUserTransactionCountsDocument,
    "\n  query getTradeHistories($address: String!, $contractId: Int!) {\n    getTradeHistories(address: $address, contractId: $contractId) {\n      ...TradeHistoryInfo\n    }\n  }\n": types.GetTradeHistoriesDocument,
    "\n  query getPnlSnapshots(\n    $dateStr: String!\n    $kind: PnlSnapshotKind!\n    $first: Int!\n    $after: Int\n  ) {\n    getPnlSnapshots(\n      dateStr: $dateStr\n      kind: $kind\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetPnlSnapshotsDocument,
    "\n  query getPnlSnapshotsByAddress($address: String!, $dateStr: String!) {\n    getPnlSnapshotsByAddress(address: $address, dateStr: $dateStr) {\n      ...PnlSnapshotInfo\n    }\n  }\n": types.GetPnlSnapshotsByAddressDocument,
    "\n  query getPnlSnapshotInitializedFlag {\n    getPnlSnapshotInitializedFlag {\n      id\n      dateStr\n      isInit\n    }\n  }\n": types.GetPnlSnapshotInitializedFlagDocument,
    "\n  query isPnlSnapshotInitialized($dateStr: String!) {\n    isPnlSnapshotInitialized(dateStr: $dateStr) {\n      id\n      dateStr\n      isInit\n    }\n  }\n": types.IsPnlSnapshotInitializedDocument,
    "\n  mutation buildPnlSnapshots($dateStr: String!, $isForceBuild: Boolean!) {\n    buildPnlSnapshots(dateStr: $dateStr, isForceBuild: $isForceBuild)\n  }\n": types.BuildPnlSnapshotsDocument,
    "\n  mutation dynamicSnapshotBuild($dateStr: String!) {\n    dynamicSnapshotBuild(dateStr: $dateStr)\n  }\n": types.DynamicSnapshotBuildDocument,
    "\n  mutation initializePnlSnapshot(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n  ) {\n    initializePnlSnapshot(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n    )\n  }\n": types.InitializePnlSnapshotDocument,
    "\n  mutation autoTesting {\n    autoTesting\n  }\n": types.AutoTestingDocument,
    "\n  query getDevPnlSnapshots($dateStr: String!, $filterParams: [ExportFilter!]!) {\n    getDevPnlSnapshots(dateStr: $dateStr, filterParams: $filterParams) {\n      accUSDPnl\n      address\n      contractId\n      dateStr\n      histories {\n        ...TradeHistoryInfo\n      }\n      id\n      kind\n      score\n    }\n  }\n": types.GetDevPnlSnapshotsDocument,
    "\n  query getWholeCompressedHistories(\n    $startDate: String!\n    $isTestnet: Boolean!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistories(\n      startDate: $startDate\n      isTestnet: $isTestnet\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        pnl\n        in\n        out\n        inOut\n        date\n        positionCount\n        taskCount\n        traderCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      actionTypeCount\n      uniqueTraders\n      totalBots {\n        address\n        contractId\n        dateStr\n      }\n    }\n  }\n": types.GetWholeCompressedHistoriesDocument,
    "\n  query getWholeCompressedHistoriesV2(\n    $platform: Platform!\n    $startDate: String!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistoriesV2(\n      platform: $platform\n      startDate: $startDate\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        date\n        in\n        inOut\n        out\n        pnl\n        positionCount\n        taskCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      uniqueTraders\n      totalBots {\n        address\n        platform\n        dateStr\n      }\n    }\n  }\n": types.GetWholeCompressedHistoriesV2Document,
    "\n  query getTestingReport($first: Int!, $after: Int) {\n    getTestingReport(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          maxAvgSize\n          minAvgSize\n          maxCount\n          minCount\n          avgLoss\n          monthWeight\n          threeMonthWeight\n          weekWeight\n          allTimeWeight\n          avgProfit\n          bottomAccProfit\n          calculatedR2\n          calculatedSlope\n          id\n          investedUSD\n          lossCount\n          m\n          maxLoss\n          maxProfit\n          minR2\n          minScore\n          n\n          peakAccProfit\n          profitCount\n          totalPositions\n          totalTasks\n          totalTraders\n          totalUSDPnl\n          totalUniqueTraders\n          usdPnls\n          window\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetTestingReportDocument,
    "\n  query getPerpEventLogs($addresses: [String!]!, $platform: Platform!) {\n    getPerpEventLogs(addresses: $addresses, platform: $platform) {\n      ...PerpTradingEventLogInfo\n    }\n  }\n": types.GetPerpEventLogsDocument,
    "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": types.GetPnlSnapshotV2InitializedFlagDocument,
    "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $first: Int!\n    $after: Int\n    $kind: PnlSnapshotKind!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      first: $first\n      after: $after\n      kind: $kind\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotV2DetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetPnlSnapshotsV2Document,
    "\n  query getPnlsnpashotsV2ByPagination(\n    $dateStr: String!\n    $kind: PnlSnapshotKind!\n    $limit: Int!\n    $page: Int!\n    $platform: Platform!\n  ) {\n    getPnlsnpashotsV2ByPagination(\n      dateStr: $dateStr\n      platform: $platform\n      kind: $kind\n      limit: $limit\n      page: $page\n    ) {\n      data {\n        ...PnlSnapshotV2DetailsInfo\n      }\n      pageInfo {\n        total\n        page\n        totalPages\n      }\n    }\n  }\n": types.GetPnlsnpashotsV2ByPaginationDocument,
    "\n  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {\n    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": types.IsPnlSnapshotV2InitializedDocument,
    "\n  query getStatisticData {\n    getStatisticData {\n      size\n      sumOfLost\n      sumOfWin\n      countOfLost\n      countOfWin\n    }\n  }\n": types.GetStatisticDataDocument,
    "\n  mutation buildPnlSnapshotsV2(\n    $dateStr: String!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    buildPnlSnapshotsV2(\n      dateStr: $dateStr\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n": types.BuildPnlSnapshotsV2Document,
    "\n  mutation dynamicSnapshotBuildV2($dateStr: String!, $platform: Platform!) {\n    dynamicSnapshotBuildV2(dateStr: $dateStr, platform: $platform)\n  }\n": types.DynamicSnapshotBuildV2Document,
    "\n  mutation initializePnlSnapshotV2(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    initializePnlSnapshotV2(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n": types.InitializePnlSnapshotV2Document,
    "\n  fragment LogInfo on Log {\n    id\n    severity\n    summary\n    details\n    timestamp\n    checked\n  }\n": types.LogInfoFragmentDoc,
    "\n  query allLogs(\n    $severity: LogSeverity\n    $checked: Boolean!\n    $first: Int!\n    $after: Int\n  ) {\n    allLogs(\n      severity: $severity\n      checked: $checked\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...LogInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllLogsDocument,
    "\n  query getLogsSeverityCounts {\n    getLogsSeverityCounts {\n      severity\n      counts\n    }\n  }\n": types.GetLogsSeverityCountsDocument,
    "\n  mutation checkLog($id: Int!) {\n    checkLog(id: $id) {\n      ...LogInfo\n    }\n  }\n": types.CheckLogDocument,
    "\n  subscription newLog($checked: Boolean!, $severity: LogSeverity) {\n    newLog(checked: $checked, severity: $severity) {\n      ...LogInfo\n    }\n  }\n": types.NewLogDocument,
    "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    status\n    createdAt\n    updatedAt\n  }\n": types.MissionInfoFragmentDoc,
    "\n  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    bot {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.MissionBackwardDetailsInfoFragmentDoc,
    "\n  fragment MissionForwardDetailsInfo on MissionForwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    tasks {\n      ...TaskForwardDetailsInfo\n    }\n  }\n": types.MissionForwardDetailsInfoFragmentDoc,
    "\n  query getMaxOpenMissions {\n    getMaxOpenMissions\n  }\n": types.GetMaxOpenMissionsDocument,
    "\n  mutation updateMaxOpenMissions($maxCount: Int!) {\n    updateMaxOpenMissions(maxCount: $maxCount)\n  }\n": types.UpdateMaxOpenMissionsDocument,
    "\n  mutation cloneMission($id: Int!, $manualParams: ManualParams) {\n    cloneMission(id: $id, manualParams: $manualParams)\n  }\n": types.CloneMissionDocument,
    "\n  mutation closeMission($id: Int!, $isForce: Boolean!) {\n    closeMission(id: $id, isForce: $isForce)\n  }\n": types.CloseMissionDocument,
    "\n  mutation ignoreMission($id: Int!) {\n    ignoreMission(id: $id)\n  }\n": types.IgnoreMissionDocument,
    "\n  subscription missionCreated($userId: String!) {\n    missionCreated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": types.MissionCreatedDocument,
    "\n  subscription missionUpdated($userId: String!) {\n    missionUpdated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": types.MissionUpdatedDocument,
    "\n  fragment PlanInfo on Plan {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n  }\n": types.PlanInfoFragmentDoc,
    "\n  fragment PlanForwardDetailsInfo on PlanForwardDetails {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    bots {\n      ...BotForwardDetailsInfo\n    }\n  }\n": types.PlanForwardDetailsInfoFragmentDoc,
    "\n  query getPlansByStatus($status: PlanStatus!, $after: Int, $first: Int!) {\n    getPlansByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetPlansByStatusDocument,
    "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanForwardDetailsInfo\n    }\n  }\n": types.GetPlanByIdDocument,
    "\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n": types.CreatePlanDocument,
    "\n  mutation createAutoPlan {\n    createAutoPlan\n  }\n": types.CreateAutoPlanDocument,
    "\n  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {\n    updatePlan(updatePlanInput: $updatePlanInput) {\n      ...PlanInfo\n    }\n  }\n": types.UpdatePlanDocument,
    "\n  mutation deletePlan($id: Int!) {\n    deletePlan(id: $id)\n  }\n": types.DeletePlanDocument,
    "\n  mutation startPlan($id: Int!) {\n    startPlan(id: $id)\n  }\n": types.StartPlanDocument,
    "\n  mutation endPlan($id: Int!) {\n    endPlan(id: $id)\n  }\n": types.EndPlanDocument,
    "\n  subscription planCreated($userId: String!) {\n    planCreated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": types.PlanCreatedDocument,
    "\n  subscription planUpdated($userId: String!) {\n    planUpdated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": types.PlanUpdatedDocument,
    "\n  query getBlacklist {\n    getBlacklist\n  }\n": types.GetBlacklistDocument,
    "\n  mutation addToBlacklist($address: String!) {\n    addToBlacklist(address: $address)\n  }\n": types.AddToBlacklistDocument,
    "\n  mutation removeFromBlacklist($address: String!) {\n    removeFromBlacklist(address: $address)\n  }\n": types.RemoveFromBlacklistDocument,
    "\n  query getExpertPnlSnapshots {\n    getExpertPnlSnapshots {\n      accUSDPnl\n      address\n      contractId\n      dateStr\n      id\n      kind\n      maxSize\n      ratio\n      score\n      openedPositions\n      avgPnlRatio\n      avgDuration\n    }\n  }\n": types.GetExpertPnlSnapshotsDocument,
    "\n  query getExpertPnlSnapshotsV2($platform: Platform!, $after: Int) {\n    getExpertPnlSnapshotsV2(platform: $platform, after: $after) {\n      edges {\n        cursor\n        node {\n          accUSDPnl\n          address\n          platform\n          dateStr\n          id\n          kind\n          maxSize\n          ratio\n          score\n          openedPositions\n          avgPnlRatio\n          avgDuration\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetExpertPnlSnapshotsV2Document,
    "\n  query getWhitelist {\n    getWhitelist\n  }\n": types.GetWhitelistDocument,
    "\n  mutation addToWhitelist($params: String!) {\n    addToWhitelist(params: $params)\n  }\n": types.AddToWhitelistDocument,
    "\n  mutation removeFromWhitelist($address: String!) {\n    removeFromWhitelist(address: $address)\n  }\n": types.RemoveFromWhitelistDocument,
    "\n  fragment StrategyMetadataInfo on StrategyMetadata {\n    key\n    title\n    description\n  }\n": types.StrategyMetadataInfoFragmentDoc,
    "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    collateralBaseline\n    params\n    ratio\n    strategyKey\n  }\n": types.StrategyInfoFragmentDoc,
    "\n  query getAllStrategyMetadata {\n    getAllStrategyMetadata {\n      ...StrategyMetadataInfo\n    }\n  }\n": types.GetAllStrategyMetadataDocument,
    "\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n": types.GetAllStrategyDocument,
    "\n  mutation updateStrategy($id: Int!, $input: UpdateStrategyInput!) {\n    updateStrategy(id: $id, input: $input) {\n      ...StrategyInfo\n    }\n  }\n": types.UpdateStrategyDocument,
    "\n  mutation pauseSystem {\n    pauseSystem\n  }\n": types.PauseSystemDocument,
    "\n  mutation resumeSystem($password: String) {\n    resumeSystem(password: $password)\n  }\n": types.ResumeSystemDocument,
    "\n  mutation killSubService($service: String!) {\n    killSubService(service: $service)\n  }\n": types.KillSubServiceDocument,
    "\n  mutation startSubService($service: String!) {\n    startSubService(service: $service)\n  }\n": types.StartSubServiceDocument,
    "\n  query getMicroserviceStatus {\n    getMicroserviceStatus {\n      pids\n      service\n    }\n  }\n": types.GetMicroserviceStatusDocument,
    "\n  mutation makeSafeApp($password: String!) {\n    makeSafeApp(password: $password)\n  }\n": types.MakeSafeAppDocument,
    "\n  mutation changePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n": types.ChangePasswordDocument,
    "\n  query getSystemStatus {\n    systemStatus\n  }\n": types.GetSystemStatusDocument,
    "\n  query isSafeApp {\n    isSafeApp\n  }\n": types.IsSafeAppDocument,
    "\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n": types.GetServerTimeDocument,
    "\n  query getIsBotHookRunning {\n    isBotHookRunning\n  }\n": types.GetIsBotHookRunningDocument,
    "\n  fragment TagCategoryInfo on TagCategory {\n    id\n    category\n    description\n    userId\n  }\n": types.TagCategoryInfoFragmentDoc,
    "\n  fragment TagInfo on Tag {\n    id\n    tag\n    description\n    color\n    categoryId\n    userId\n  }\n": types.TagInfoFragmentDoc,
    "\n  query getAllTags {\n    getAllTags {\n      ...TagInfo\n    }\n  }\n": types.GetAllTagsDocument,
    "\n  mutation upsertTag($input: TagInput!) {\n    upsertTag(input: $input) {\n      ...TagInfo\n    }\n  }\n": types.UpsertTagDocument,
    "\n  mutation deleteTag($tag: String!) {\n    deleteTag(tag: $tag) {\n      ...TagInfo\n    }\n  }\n": types.DeleteTagDocument,
    "\n  query getAllCategories {\n    getAllCategories {\n      ...TagCategoryInfo\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  mutation upsertCategory($input: TagCategoryInput!) {\n    upsertCategory(input: $input) {\n      ...TagCategoryInfo\n    }\n  }\n": types.UpsertCategoryDocument,
    "\n  mutation deleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      ...TagCategoryInfo\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  fragment ActionInfo on Action {\n    id\n    name\n    positionKey\n    address\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n": types.ActionInfoFragmentDoc,
    "\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n": types.FollowerActionDetailsInfoFragmentDoc,
    "\n  fragment TaskForwardDetailsInfo on TaskForwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n": types.TaskForwardDetailsInfoFragmentDoc,
    "\n  fragment TaskBackwardDetailsInfo on TaskBackwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n    mission {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": types.TaskBackwardDetailsInfoFragmentDoc,
    "\n  query getAlertTasks {\n    getAlertTasks {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": types.GetAlertTasksDocument,
    "\n  mutation performTask($id: Int!) {\n    performTask(id: $id)\n  }\n": types.PerformTaskDocument,
    "\n  mutation stopTask($id: Int!) {\n    stopTask(id: $id)\n  }\n": types.StopTaskDocument,
    "\n  subscription taskCreated($userId: String!) {\n    taskCreated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": types.TaskCreatedDocument,
    "\n  subscription taskUpdated($userId: String!) {\n    taskUpdated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": types.TaskUpdatedDocument,
    "\n  query getAllUsers {\n    getAllUsers {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n": types.GetTokenDocument,
    "\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.ChangeUserPermissionDocument,
    "\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.AllowAutoDocument,
    "\n  fragment WalletAccountInfo on WalletAccount {\n    id\n    userId\n    address\n    tags {\n      ...TagInfo\n    }\n  }\n": types.WalletAccountInfoFragmentDoc,
    "\n  query getAllWalletAccounts {\n    getAllWalletAccounts {\n      ...WalletAccountInfo\n    }\n  }\n": types.GetAllWalletAccountsDocument,
    "\n  mutation addWalletAccount($input: AddUserInput!) {\n    addWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n": types.AddWalletAccountDocument,
    "\n  mutation addTagToWalletAccount($input: ChangeUserTagInput!) {\n    addTagToWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n": types.AddTagToWalletAccountDocument,
    "\n  mutation removeTagFromWalletAccount($input: ChangeUserTagInput!) {\n    removeTagFromWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n": types.RemoveTagFromWalletAccountDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBotsByStatus($status: BotStatus!, $first: Int!, $after: Int) {\n    getBotsByStatus(status: $status, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...BotForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getBotsByStatus($status: BotStatus!, $first: Int!, $after: Int) {\n    getBotsByStatus(status: $status, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...BotForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getActiveBots {\n    getActiveBots {\n      ...BotForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getActiveBots {\n    getActiveBots {\n      ...BotForwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {\n    batchCreateBots(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {\n    batchCreateBots(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id)\n  }\n"): (typeof documents)["\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id)\n  }\n"): (typeof documents)["\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription botCreated($userId: String!) {\n    botCreated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription botCreated($userId: String!) {\n    botCreated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription botUpdated($userId: String!) {\n    botUpdated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription botUpdated($userId: String!) {\n    botUpdated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    isTestnet\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n"): (typeof documents)["\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    isTestnet\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAdaptionStatus {\n    getAdaptionStatus\n  }\n"): (typeof documents)["\n  query getAdaptionStatus {\n    getAdaptionStatus\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation disableContract($contractId: Int!) {\n    disableContract(contractId: $contractId) {\n      ...ContractInfo\n    }\n  }\n"): (typeof documents)["\n  mutation disableContract($contractId: Int!) {\n    disableContract(contractId: $contractId) {\n      ...ContractInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation liveContract($contractId: Int!, $fromBlock: Int) {\n    liveContract(contractId: $contractId, fromBlock: $fromBlock) {\n      ...ContractInfo\n    }\n  }\n"): (typeof documents)["\n  mutation liveContract($contractId: Int!, $fromBlock: Int) {\n    liveContract(contractId: $contractId, fromBlock: $fromBlock) {\n      ...ContractInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {\n    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)\n  }\n"): (typeof documents)["\n  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {\n    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerInfo on Follower {\n    userId\n    address\n    accountIndex\n    publicKey\n  }\n"): (typeof documents)["\n  fragment FollowerInfo on Follower {\n    userId\n    address\n    accountIndex\n    publicKey\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerTradeInfo on FollowerTrade {\n    address\n    index\n    mission {\n      ...MissionForwardDetailsInfo\n    }\n    params\n  }\n"): (typeof documents)["\n  fragment FollowerTradeInfo on FollowerTrade {\n    address\n    index\n    mission {\n      ...MissionForwardDetailsInfo\n    }\n    params\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerPendingOrderInfo on FollowerPendingOrder {\n    params\n    address\n    index\n  }\n"): (typeof documents)["\n  fragment FollowerPendingOrderInfo on FollowerPendingOrder {\n    params\n    address\n    index\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    usdcBalance\n    contractId\n    pnlSnapshots {\n      ...PnlSnapshotInfo\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n"): (typeof documents)["\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    usdcBalance\n    contractId\n    pnlSnapshots {\n      ...PnlSnapshotInfo\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllFollowerDetails($contractId: Int!, $after: Int, $first: Int!) {\n    getAllFollowerDetails(\n      contractId: $contractId\n      after: $after\n      first: $first\n    ) {\n      edges {\n        cursor\n        node {\n          ...FollowerDetailInfo\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query getAllFollowerDetails($contractId: Int!, $after: Int, $first: Int!) {\n    getAllFollowerDetails(\n      contractId: $contractId\n      after: $after\n      first: $first\n    ) {\n      edges {\n        cursor\n        node {\n          ...FollowerDetailInfo\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation closeTradeMarket($input: CloseTradeInput!) {\n    closeTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation closeTradeMarket($input: CloseTradeInput!) {\n    closeTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation cancelOrderAfterTimeout($input: CancelOrderAfterTimeoutInput!) {\n    cancelOrderAfterTimeout(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation cancelOrderAfterTimeout($input: CancelOrderAfterTimeoutInput!) {\n    cancelOrderAfterTimeout(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSl($input: UpdateSlInput!) {\n    updateSl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation updateSl($input: UpdateSlInput!) {\n    updateSl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTp($input: UpdateTpInput!) {\n    updateTp(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation updateTp($input: UpdateTpInput!) {\n    updateTp(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation withdrawPositivePnl($input: WithdrawPositivePnlInput!) {\n    withdrawPositivePnl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation withdrawPositivePnl($input: WithdrawPositivePnlInput!) {\n    withdrawPositivePnl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n"): (typeof documents)["\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation withdrawAllUSDC($input: WithdrawAllInput!) {\n    withdrawAllUSDC(input: $input)\n  }\n"): (typeof documents)["\n  mutation withdrawAllUSDC($input: WithdrawAllInput!) {\n    withdrawAllUSDC(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation withdrawAllETH($input: WithdrawAllInput!) {\n    withdrawAllETH(input: $input)\n  }\n"): (typeof documents)["\n  mutation withdrawAllETH($input: WithdrawAllInput!) {\n    withdrawAllETH(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation withdrawETHToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawETHToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n"): (typeof documents)["\n  mutation withdrawETHToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawETHToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation withdrawUSDCToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawUSDCToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n"): (typeof documents)["\n  mutation withdrawUSDCToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawUSDCToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TradeHistoryInfo on TradeHistory {\n    action\n    address\n    block\n    collateralDelta\n    collateralIndex\n    collateralPriceUsd\n    contractId\n    date\n    id\n    leverage\n    leverageDelta\n    long\n    marketPrice\n    pair\n    pnl\n    price\n    size\n    tradeId\n    tradeIndex\n    isCounterTrade\n    meta\n  }\n"): (typeof documents)["\n  fragment TradeHistoryInfo on TradeHistory {\n    action\n    address\n    block\n    collateralDelta\n    collateralIndex\n    collateralPriceUsd\n    contractId\n    date\n    id\n    leverage\n    leverageDelta\n    long\n    marketPrice\n    pair\n    pnl\n    price\n    size\n    tradeId\n    tradeIndex\n    isCounterTrade\n    meta\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PnlSnapshotInfo on PnlSnapshot {\n    accUSDPnl\n    address\n    contractId\n    dateStr\n    id\n    kind\n  }\n"): (typeof documents)["\n  fragment PnlSnapshotInfo on PnlSnapshot {\n    accUSDPnl\n    address\n    contractId\n    dateStr\n    id\n    kind\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {\n    accUSDPnl\n    address\n    contractId\n    dateStr\n    histories {\n      ...TradeHistoryInfo\n    }\n    id\n    kind\n  }\n"): (typeof documents)["\n  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {\n    accUSDPnl\n    address\n    contractId\n    dateStr\n    histories {\n      ...TradeHistoryInfo\n    }\n    id\n    kind\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PerpTradingEventLogInfo on PerpTradingEventLog {\n    address\n    block\n    contractId\n    date\n    id\n    jsonLog\n    logIndex\n    platform\n    usdPnl\n  }\n"): (typeof documents)["\n  fragment PerpTradingEventLogInfo on PerpTradingEventLog {\n    address\n    block\n    contractId\n    date\n    id\n    jsonLog\n    logIndex\n    platform\n    usdPnl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    perpTradingEventLogs {\n      ...PerpTradingEventLogInfo\n    }\n    platform\n  }\n"): (typeof documents)["\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    perpTradingEventLogs {\n      ...PerpTradingEventLogInfo\n    }\n    platform\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTradeTransactionCounts(\n    $addresses: [String!]!\n    $contractIds: [Int!]!\n  ) {\n    getTradeTransactionCounts(\n      addresses: $addresses\n      contractIds: $contractIds\n    ) {\n      daily\n      weekly\n      monthly\n    }\n  }\n"): (typeof documents)["\n  query getTradeTransactionCounts(\n    $addresses: [String!]!\n    $contractIds: [Int!]!\n  ) {\n    getTradeTransactionCounts(\n      addresses: $addresses\n      contractIds: $contractIds\n    ) {\n      daily\n      weekly\n      monthly\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserTransactionCounts($inputs: [GetUserTransactionCountsInput!]!) {\n    getUserTransactionCounts(inputs: $inputs) {\n      daily\n      weekly\n      monthly\n    }\n  }\n"): (typeof documents)["\n  query getUserTransactionCounts($inputs: [GetUserTransactionCountsInput!]!) {\n    getUserTransactionCounts(inputs: $inputs) {\n      daily\n      weekly\n      monthly\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTradeHistories($address: String!, $contractId: Int!) {\n    getTradeHistories(address: $address, contractId: $contractId) {\n      ...TradeHistoryInfo\n    }\n  }\n"): (typeof documents)["\n  query getTradeHistories($address: String!, $contractId: Int!) {\n    getTradeHistories(address: $address, contractId: $contractId) {\n      ...TradeHistoryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshots(\n    $dateStr: String!\n    $kind: PnlSnapshotKind!\n    $first: Int!\n    $after: Int\n  ) {\n    getPnlSnapshots(\n      dateStr: $dateStr\n      kind: $kind\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshots(\n    $dateStr: String!\n    $kind: PnlSnapshotKind!\n    $first: Int!\n    $after: Int\n  ) {\n    getPnlSnapshots(\n      dateStr: $dateStr\n      kind: $kind\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotsByAddress($address: String!, $dateStr: String!) {\n    getPnlSnapshotsByAddress(address: $address, dateStr: $dateStr) {\n      ...PnlSnapshotInfo\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotsByAddress($address: String!, $dateStr: String!) {\n    getPnlSnapshotsByAddress(address: $address, dateStr: $dateStr) {\n      ...PnlSnapshotInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotInitializedFlag {\n    getPnlSnapshotInitializedFlag {\n      id\n      dateStr\n      isInit\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotInitializedFlag {\n    getPnlSnapshotInitializedFlag {\n      id\n      dateStr\n      isInit\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query isPnlSnapshotInitialized($dateStr: String!) {\n    isPnlSnapshotInitialized(dateStr: $dateStr) {\n      id\n      dateStr\n      isInit\n    }\n  }\n"): (typeof documents)["\n  query isPnlSnapshotInitialized($dateStr: String!) {\n    isPnlSnapshotInitialized(dateStr: $dateStr) {\n      id\n      dateStr\n      isInit\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation buildPnlSnapshots($dateStr: String!, $isForceBuild: Boolean!) {\n    buildPnlSnapshots(dateStr: $dateStr, isForceBuild: $isForceBuild)\n  }\n"): (typeof documents)["\n  mutation buildPnlSnapshots($dateStr: String!, $isForceBuild: Boolean!) {\n    buildPnlSnapshots(dateStr: $dateStr, isForceBuild: $isForceBuild)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dynamicSnapshotBuild($dateStr: String!) {\n    dynamicSnapshotBuild(dateStr: $dateStr)\n  }\n"): (typeof documents)["\n  mutation dynamicSnapshotBuild($dateStr: String!) {\n    dynamicSnapshotBuild(dateStr: $dateStr)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation initializePnlSnapshot(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n  ) {\n    initializePnlSnapshot(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n    )\n  }\n"): (typeof documents)["\n  mutation initializePnlSnapshot(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n  ) {\n    initializePnlSnapshot(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation autoTesting {\n    autoTesting\n  }\n"): (typeof documents)["\n  mutation autoTesting {\n    autoTesting\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getDevPnlSnapshots($dateStr: String!, $filterParams: [ExportFilter!]!) {\n    getDevPnlSnapshots(dateStr: $dateStr, filterParams: $filterParams) {\n      accUSDPnl\n      address\n      contractId\n      dateStr\n      histories {\n        ...TradeHistoryInfo\n      }\n      id\n      kind\n      score\n    }\n  }\n"): (typeof documents)["\n  query getDevPnlSnapshots($dateStr: String!, $filterParams: [ExportFilter!]!) {\n    getDevPnlSnapshots(dateStr: $dateStr, filterParams: $filterParams) {\n      accUSDPnl\n      address\n      contractId\n      dateStr\n      histories {\n        ...TradeHistoryInfo\n      }\n      id\n      kind\n      score\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getWholeCompressedHistories(\n    $startDate: String!\n    $isTestnet: Boolean!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistories(\n      startDate: $startDate\n      isTestnet: $isTestnet\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        pnl\n        in\n        out\n        inOut\n        date\n        positionCount\n        taskCount\n        traderCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      actionTypeCount\n      uniqueTraders\n      totalBots {\n        address\n        contractId\n        dateStr\n      }\n    }\n  }\n"): (typeof documents)["\n  query getWholeCompressedHistories(\n    $startDate: String!\n    $isTestnet: Boolean!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistories(\n      startDate: $startDate\n      isTestnet: $isTestnet\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        pnl\n        in\n        out\n        inOut\n        date\n        positionCount\n        taskCount\n        traderCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      actionTypeCount\n      uniqueTraders\n      totalBots {\n        address\n        contractId\n        dateStr\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getWholeCompressedHistoriesV2(\n    $platform: Platform!\n    $startDate: String!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistoriesV2(\n      platform: $platform\n      startDate: $startDate\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        date\n        in\n        inOut\n        out\n        pnl\n        positionCount\n        taskCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      uniqueTraders\n      totalBots {\n        address\n        platform\n        dateStr\n      }\n    }\n  }\n"): (typeof documents)["\n  query getWholeCompressedHistoriesV2(\n    $platform: Platform!\n    $startDate: String!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistoriesV2(\n      platform: $platform\n      startDate: $startDate\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        date\n        in\n        inOut\n        out\n        pnl\n        positionCount\n        taskCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      uniqueTraders\n      totalBots {\n        address\n        platform\n        dateStr\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTestingReport($first: Int!, $after: Int) {\n    getTestingReport(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          maxAvgSize\n          minAvgSize\n          maxCount\n          minCount\n          avgLoss\n          monthWeight\n          threeMonthWeight\n          weekWeight\n          allTimeWeight\n          avgProfit\n          bottomAccProfit\n          calculatedR2\n          calculatedSlope\n          id\n          investedUSD\n          lossCount\n          m\n          maxLoss\n          maxProfit\n          minR2\n          minScore\n          n\n          peakAccProfit\n          profitCount\n          totalPositions\n          totalTasks\n          totalTraders\n          totalUSDPnl\n          totalUniqueTraders\n          usdPnls\n          window\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getTestingReport($first: Int!, $after: Int) {\n    getTestingReport(first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          maxAvgSize\n          minAvgSize\n          maxCount\n          minCount\n          avgLoss\n          monthWeight\n          threeMonthWeight\n          weekWeight\n          allTimeWeight\n          avgProfit\n          bottomAccProfit\n          calculatedR2\n          calculatedSlope\n          id\n          investedUSD\n          lossCount\n          m\n          maxLoss\n          maxProfit\n          minR2\n          minScore\n          n\n          peakAccProfit\n          profitCount\n          totalPositions\n          totalTasks\n          totalTraders\n          totalUSDPnl\n          totalUniqueTraders\n          usdPnls\n          window\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPerpEventLogs($addresses: [String!]!, $platform: Platform!) {\n    getPerpEventLogs(addresses: $addresses, platform: $platform) {\n      ...PerpTradingEventLogInfo\n    }\n  }\n"): (typeof documents)["\n  query getPerpEventLogs($addresses: [String!]!, $platform: Platform!) {\n    getPerpEventLogs(addresses: $addresses, platform: $platform) {\n      ...PerpTradingEventLogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $first: Int!\n    $after: Int\n    $kind: PnlSnapshotKind!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      first: $first\n      after: $after\n      kind: $kind\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotV2DetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $first: Int!\n    $after: Int\n    $kind: PnlSnapshotKind!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      first: $first\n      after: $after\n      kind: $kind\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotV2DetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlsnpashotsV2ByPagination(\n    $dateStr: String!\n    $kind: PnlSnapshotKind!\n    $limit: Int!\n    $page: Int!\n    $platform: Platform!\n  ) {\n    getPnlsnpashotsV2ByPagination(\n      dateStr: $dateStr\n      platform: $platform\n      kind: $kind\n      limit: $limit\n      page: $page\n    ) {\n      data {\n        ...PnlSnapshotV2DetailsInfo\n      }\n      pageInfo {\n        total\n        page\n        totalPages\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPnlsnpashotsV2ByPagination(\n    $dateStr: String!\n    $kind: PnlSnapshotKind!\n    $limit: Int!\n    $page: Int!\n    $platform: Platform!\n  ) {\n    getPnlsnpashotsV2ByPagination(\n      dateStr: $dateStr\n      platform: $platform\n      kind: $kind\n      limit: $limit\n      page: $page\n    ) {\n      data {\n        ...PnlSnapshotV2DetailsInfo\n      }\n      pageInfo {\n        total\n        page\n        totalPages\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {\n    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"): (typeof documents)["\n  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {\n    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getStatisticData {\n    getStatisticData {\n      size\n      sumOfLost\n      sumOfWin\n      countOfLost\n      countOfWin\n    }\n  }\n"): (typeof documents)["\n  query getStatisticData {\n    getStatisticData {\n      size\n      sumOfLost\n      sumOfWin\n      countOfLost\n      countOfWin\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation buildPnlSnapshotsV2(\n    $dateStr: String!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    buildPnlSnapshotsV2(\n      dateStr: $dateStr\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n"): (typeof documents)["\n  mutation buildPnlSnapshotsV2(\n    $dateStr: String!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    buildPnlSnapshotsV2(\n      dateStr: $dateStr\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dynamicSnapshotBuildV2($dateStr: String!, $platform: Platform!) {\n    dynamicSnapshotBuildV2(dateStr: $dateStr, platform: $platform)\n  }\n"): (typeof documents)["\n  mutation dynamicSnapshotBuildV2($dateStr: String!, $platform: Platform!) {\n    dynamicSnapshotBuildV2(dateStr: $dateStr, platform: $platform)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation initializePnlSnapshotV2(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    initializePnlSnapshotV2(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n"): (typeof documents)["\n  mutation initializePnlSnapshotV2(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    initializePnlSnapshotV2(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment LogInfo on Log {\n    id\n    severity\n    summary\n    details\n    timestamp\n    checked\n  }\n"): (typeof documents)["\n  fragment LogInfo on Log {\n    id\n    severity\n    summary\n    details\n    timestamp\n    checked\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query allLogs(\n    $severity: LogSeverity\n    $checked: Boolean!\n    $first: Int!\n    $after: Int\n  ) {\n    allLogs(\n      severity: $severity\n      checked: $checked\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...LogInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query allLogs(\n    $severity: LogSeverity\n    $checked: Boolean!\n    $first: Int!\n    $after: Int\n  ) {\n    allLogs(\n      severity: $severity\n      checked: $checked\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...LogInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getLogsSeverityCounts {\n    getLogsSeverityCounts {\n      severity\n      counts\n    }\n  }\n"): (typeof documents)["\n  query getLogsSeverityCounts {\n    getLogsSeverityCounts {\n      severity\n      counts\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation checkLog($id: Int!) {\n    checkLog(id: $id) {\n      ...LogInfo\n    }\n  }\n"): (typeof documents)["\n  mutation checkLog($id: Int!) {\n    checkLog(id: $id) {\n      ...LogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription newLog($checked: Boolean!, $severity: LogSeverity) {\n    newLog(checked: $checked, severity: $severity) {\n      ...LogInfo\n    }\n  }\n"): (typeof documents)["\n  subscription newLog($checked: Boolean!, $severity: LogSeverity) {\n    newLog(checked: $checked, severity: $severity) {\n      ...LogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    status\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    status\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    bot {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    bot {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionForwardDetailsInfo on MissionForwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    tasks {\n      ...TaskForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment MissionForwardDetailsInfo on MissionForwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    tasks {\n      ...TaskForwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMaxOpenMissions {\n    getMaxOpenMissions\n  }\n"): (typeof documents)["\n  query getMaxOpenMissions {\n    getMaxOpenMissions\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMaxOpenMissions($maxCount: Int!) {\n    updateMaxOpenMissions(maxCount: $maxCount)\n  }\n"): (typeof documents)["\n  mutation updateMaxOpenMissions($maxCount: Int!) {\n    updateMaxOpenMissions(maxCount: $maxCount)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation cloneMission($id: Int!, $manualParams: ManualParams) {\n    cloneMission(id: $id, manualParams: $manualParams)\n  }\n"): (typeof documents)["\n  mutation cloneMission($id: Int!, $manualParams: ManualParams) {\n    cloneMission(id: $id, manualParams: $manualParams)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation closeMission($id: Int!, $isForce: Boolean!) {\n    closeMission(id: $id, isForce: $isForce)\n  }\n"): (typeof documents)["\n  mutation closeMission($id: Int!, $isForce: Boolean!) {\n    closeMission(id: $id, isForce: $isForce)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ignoreMission($id: Int!) {\n    ignoreMission(id: $id)\n  }\n"): (typeof documents)["\n  mutation ignoreMission($id: Int!) {\n    ignoreMission(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription missionCreated($userId: String!) {\n    missionCreated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription missionCreated($userId: String!) {\n    missionCreated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription missionUpdated($userId: String!) {\n    missionUpdated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription missionUpdated($userId: String!) {\n    missionUpdated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PlanInfo on Plan {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n  }\n"): (typeof documents)["\n  fragment PlanInfo on Plan {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PlanForwardDetailsInfo on PlanForwardDetails {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    bots {\n      ...BotForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment PlanForwardDetailsInfo on PlanForwardDetails {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    bots {\n      ...BotForwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlansByStatus($status: PlanStatus!, $after: Int, $first: Int!) {\n    getPlansByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPlansByStatus($status: PlanStatus!, $after: Int, $first: Int!) {\n    getPlansByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanForwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAutoPlan {\n    createAutoPlan\n  }\n"): (typeof documents)["\n  mutation createAutoPlan {\n    createAutoPlan\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {\n    updatePlan(updatePlanInput: $updatePlanInput) {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {\n    updatePlan(updatePlanInput: $updatePlanInput) {\n      ...PlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePlan($id: Int!) {\n    deletePlan(id: $id)\n  }\n"): (typeof documents)["\n  mutation deletePlan($id: Int!) {\n    deletePlan(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation startPlan($id: Int!) {\n    startPlan(id: $id)\n  }\n"): (typeof documents)["\n  mutation startPlan($id: Int!) {\n    startPlan(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation endPlan($id: Int!) {\n    endPlan(id: $id)\n  }\n"): (typeof documents)["\n  mutation endPlan($id: Int!) {\n    endPlan(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription planCreated($userId: String!) {\n    planCreated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  subscription planCreated($userId: String!) {\n    planCreated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription planUpdated($userId: String!) {\n    planUpdated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  subscription planUpdated($userId: String!) {\n    planUpdated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getBlacklist {\n    getBlacklist\n  }\n"): (typeof documents)["\n  query getBlacklist {\n    getBlacklist\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addToBlacklist($address: String!) {\n    addToBlacklist(address: $address)\n  }\n"): (typeof documents)["\n  mutation addToBlacklist($address: String!) {\n    addToBlacklist(address: $address)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeFromBlacklist($address: String!) {\n    removeFromBlacklist(address: $address)\n  }\n"): (typeof documents)["\n  mutation removeFromBlacklist($address: String!) {\n    removeFromBlacklist(address: $address)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getExpertPnlSnapshots {\n    getExpertPnlSnapshots {\n      accUSDPnl\n      address\n      contractId\n      dateStr\n      id\n      kind\n      maxSize\n      ratio\n      score\n      openedPositions\n      avgPnlRatio\n      avgDuration\n    }\n  }\n"): (typeof documents)["\n  query getExpertPnlSnapshots {\n    getExpertPnlSnapshots {\n      accUSDPnl\n      address\n      contractId\n      dateStr\n      id\n      kind\n      maxSize\n      ratio\n      score\n      openedPositions\n      avgPnlRatio\n      avgDuration\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getExpertPnlSnapshotsV2($platform: Platform!, $after: Int) {\n    getExpertPnlSnapshotsV2(platform: $platform, after: $after) {\n      edges {\n        cursor\n        node {\n          accUSDPnl\n          address\n          platform\n          dateStr\n          id\n          kind\n          maxSize\n          ratio\n          score\n          openedPositions\n          avgPnlRatio\n          avgDuration\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getExpertPnlSnapshotsV2($platform: Platform!, $after: Int) {\n    getExpertPnlSnapshotsV2(platform: $platform, after: $after) {\n      edges {\n        cursor\n        node {\n          accUSDPnl\n          address\n          platform\n          dateStr\n          id\n          kind\n          maxSize\n          ratio\n          score\n          openedPositions\n          avgPnlRatio\n          avgDuration\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getWhitelist {\n    getWhitelist\n  }\n"): (typeof documents)["\n  query getWhitelist {\n    getWhitelist\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addToWhitelist($params: String!) {\n    addToWhitelist(params: $params)\n  }\n"): (typeof documents)["\n  mutation addToWhitelist($params: String!) {\n    addToWhitelist(params: $params)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeFromWhitelist($address: String!) {\n    removeFromWhitelist(address: $address)\n  }\n"): (typeof documents)["\n  mutation removeFromWhitelist($address: String!) {\n    removeFromWhitelist(address: $address)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StrategyMetadataInfo on StrategyMetadata {\n    key\n    title\n    description\n  }\n"): (typeof documents)["\n  fragment StrategyMetadataInfo on StrategyMetadata {\n    key\n    title\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    collateralBaseline\n    params\n    ratio\n    strategyKey\n  }\n"): (typeof documents)["\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    collateralBaseline\n    params\n    ratio\n    strategyKey\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllStrategyMetadata {\n    getAllStrategyMetadata {\n      ...StrategyMetadataInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllStrategyMetadata {\n    getAllStrategyMetadata {\n      ...StrategyMetadataInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateStrategy($id: Int!, $input: UpdateStrategyInput!) {\n    updateStrategy(id: $id, input: $input) {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  mutation updateStrategy($id: Int!, $input: UpdateStrategyInput!) {\n    updateStrategy(id: $id, input: $input) {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation pauseSystem {\n    pauseSystem\n  }\n"): (typeof documents)["\n  mutation pauseSystem {\n    pauseSystem\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation resumeSystem($password: String) {\n    resumeSystem(password: $password)\n  }\n"): (typeof documents)["\n  mutation resumeSystem($password: String) {\n    resumeSystem(password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation killSubService($service: String!) {\n    killSubService(service: $service)\n  }\n"): (typeof documents)["\n  mutation killSubService($service: String!) {\n    killSubService(service: $service)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation startSubService($service: String!) {\n    startSubService(service: $service)\n  }\n"): (typeof documents)["\n  mutation startSubService($service: String!) {\n    startSubService(service: $service)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getMicroserviceStatus {\n    getMicroserviceStatus {\n      pids\n      service\n    }\n  }\n"): (typeof documents)["\n  query getMicroserviceStatus {\n    getMicroserviceStatus {\n      pids\n      service\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation makeSafeApp($password: String!) {\n    makeSafeApp(password: $password)\n  }\n"): (typeof documents)["\n  mutation makeSafeApp($password: String!) {\n    makeSafeApp(password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n"): (typeof documents)["\n  mutation changePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSystemStatus {\n    systemStatus\n  }\n"): (typeof documents)["\n  query getSystemStatus {\n    systemStatus\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query isSafeApp {\n    isSafeApp\n  }\n"): (typeof documents)["\n  query isSafeApp {\n    isSafeApp\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n"): (typeof documents)["\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getIsBotHookRunning {\n    isBotHookRunning\n  }\n"): (typeof documents)["\n  query getIsBotHookRunning {\n    isBotHookRunning\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TagCategoryInfo on TagCategory {\n    id\n    category\n    description\n    userId\n  }\n"): (typeof documents)["\n  fragment TagCategoryInfo on TagCategory {\n    id\n    category\n    description\n    userId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TagInfo on Tag {\n    id\n    tag\n    description\n    color\n    categoryId\n    userId\n  }\n"): (typeof documents)["\n  fragment TagInfo on Tag {\n    id\n    tag\n    description\n    color\n    categoryId\n    userId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllTags {\n    getAllTags {\n      ...TagInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllTags {\n    getAllTags {\n      ...TagInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation upsertTag($input: TagInput!) {\n    upsertTag(input: $input) {\n      ...TagInfo\n    }\n  }\n"): (typeof documents)["\n  mutation upsertTag($input: TagInput!) {\n    upsertTag(input: $input) {\n      ...TagInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteTag($tag: String!) {\n    deleteTag(tag: $tag) {\n      ...TagInfo\n    }\n  }\n"): (typeof documents)["\n  mutation deleteTag($tag: String!) {\n    deleteTag(tag: $tag) {\n      ...TagInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllCategories {\n    getAllCategories {\n      ...TagCategoryInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllCategories {\n    getAllCategories {\n      ...TagCategoryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation upsertCategory($input: TagCategoryInput!) {\n    upsertCategory(input: $input) {\n      ...TagCategoryInfo\n    }\n  }\n"): (typeof documents)["\n  mutation upsertCategory($input: TagCategoryInput!) {\n    upsertCategory(input: $input) {\n      ...TagCategoryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      ...TagCategoryInfo\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      ...TagCategoryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ActionInfo on Action {\n    id\n    name\n    positionKey\n    address\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n"): (typeof documents)["\n  fragment ActionInfo on Action {\n    id\n    name\n    positionKey\n    address\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n"): (typeof documents)["\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskForwardDetailsInfo on TaskForwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment TaskForwardDetailsInfo on TaskForwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskBackwardDetailsInfo on TaskBackwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n    mission {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment TaskBackwardDetailsInfo on TaskBackwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n    mission {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAlertTasks {\n    getAlertTasks {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getAlertTasks {\n    getAlertTasks {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation performTask($id: Int!) {\n    performTask(id: $id)\n  }\n"): (typeof documents)["\n  mutation performTask($id: Int!) {\n    performTask(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation stopTask($id: Int!) {\n    stopTask(id: $id)\n  }\n"): (typeof documents)["\n  mutation stopTask($id: Int!) {\n    stopTask(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription taskCreated($userId: String!) {\n    taskCreated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription taskCreated($userId: String!) {\n    taskCreated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription taskUpdated($userId: String!) {\n    taskUpdated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription taskUpdated($userId: String!) {\n    taskUpdated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllUsers {\n    getAllUsers {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers {\n    getAllUsers {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"): (typeof documents)["\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"): (typeof documents)["\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment WalletAccountInfo on WalletAccount {\n    id\n    userId\n    address\n    tags {\n      ...TagInfo\n    }\n  }\n"): (typeof documents)["\n  fragment WalletAccountInfo on WalletAccount {\n    id\n    userId\n    address\n    tags {\n      ...TagInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllWalletAccounts {\n    getAllWalletAccounts {\n      ...WalletAccountInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllWalletAccounts {\n    getAllWalletAccounts {\n      ...WalletAccountInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addWalletAccount($input: AddUserInput!) {\n    addWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n"): (typeof documents)["\n  mutation addWalletAccount($input: AddUserInput!) {\n    addWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addTagToWalletAccount($input: ChangeUserTagInput!) {\n    addTagToWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n"): (typeof documents)["\n  mutation addTagToWalletAccount($input: ChangeUserTagInput!) {\n    addTagToWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeTagFromWalletAccount($input: ChangeUserTagInput!) {\n    removeTagFromWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n"): (typeof documents)["\n  mutation removeTagFromWalletAccount($input: ChangeUserTagInput!) {\n    removeTagFromWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;