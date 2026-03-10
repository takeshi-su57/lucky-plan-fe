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
type Documents = {
    "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n": typeof types.BotDetailsInfoFragmentDoc,
    "\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n": typeof types.BotForwardDetailsInfoFragmentDoc,
    "\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n": typeof types.BotBackwardDetailsInfoFragmentDoc,
    "\n  query getBotsByStatus($status: BotStatus!, $first: Int!, $after: Int) {\n    getBotsByStatus(status: $status, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...BotForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetBotsByStatusDocument,
    "\n  query getActiveBots {\n    getActiveBots {\n      ...BotForwardDetailsInfo\n    }\n  }\n": typeof types.GetActiveBotsDocument,
    "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.CreateBotDocument,
    "\n  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {\n    batchCreateBots(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.BatchCreateBotsDocument,
    "\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.DeleteBotDocument,
    "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id)\n  }\n": typeof types.LiveBotDocument,
    "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id)\n  }\n": typeof types.StopBotDocument,
    "\n  subscription botCreated($userId: String!) {\n    botCreated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.BotCreatedDocument,
    "\n  subscription botUpdated($userId: String!) {\n    botUpdated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.BotUpdatedDocument,
    "\n  fragment BacktestTaskInfo on BacktestTask {\n    id\n    name\n    symbol\n    status\n    totalConfigs\n    processedConfigs\n    currentConfig\n    startDate\n    endDate\n    interval\n    optimizationParams\n    searchStrategy\n    optimizationMetrics\n    trials\n    bestConfigIds\n    optimizerPid\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    templateId\n    templateSearchId\n  }\n": typeof types.BacktestTaskInfoFragmentDoc,
    "\n  fragment BacktestResultInfo on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    strategyConfig\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    resultFolder\n    createdAt\n  }\n": typeof types.BacktestResultInfoFragmentDoc,
    "\n  query BacktestComponents {\n    backtestComponents {\n      signals {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      filters {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      risk {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      exits {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      platforms {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n    }\n  }\n": typeof types.BacktestComponentsDocument,
    "\n  query BacktestTask($id: ID!) {\n    backtestTask(id: $id) {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.BacktestTaskDocument,
    "\n  query BacktestTasks(\n    $status: BacktestTaskStatus\n    $symbol: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestTasks(\n      status: $status\n      symbol: $symbol\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.BacktestTasksDocument,
    "\n  query BacktestTaskStats {\n    backtestTaskStats {\n      await\n      processing\n      done\n      failed\n    }\n  }\n": typeof types.BacktestTaskStatsDocument,
    "\n  query BacktestResults(\n    $taskId: ID!\n    $sortBy: String\n    $sortOrder: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestResults(\n      taskId: $taskId\n      sortBy: $sortBy\n      sortOrder: $sortOrder\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestResultInfo\n    }\n  }\n": typeof types.BacktestResultsDocument,
    "\n  query BacktestResultDates($taskId: ID!) {\n    backtestResultDates(taskId: $taskId)\n  }\n": typeof types.BacktestResultDatesDocument,
    "\n  query BacktestResultFolders($taskId: ID!, $date: String!) {\n    backtestResultFolders(taskId: $taskId, date: $date) {\n      taskId\n      date\n      configId\n      files\n    }\n  }\n": typeof types.BacktestResultFoldersDocument,
    "\n  query BacktestResultFile(\n    $taskId: ID!\n    $date: String!\n    $configId: String!\n    $fileName: String!\n  ) {\n    backtestResultFile(\n      taskId: $taskId\n      date: $date\n      configId: $configId\n      fileName: $fileName\n    ) {\n      name\n      content\n      contentType\n      size\n      originalSize\n      isCompressed\n    }\n  }\n": typeof types.BacktestResultFileDocument,
    "\n  query TopBacktestResults($taskId: ID!, $metric: String, $limit: Int) {\n    topBacktestResults(taskId: $taskId, metric: $metric, limit: $limit) {\n      ...BacktestResultInfo\n    }\n  }\n": typeof types.TopBacktestResultsDocument,
    "\n  query OptunaDashboardStatus {\n    optunaDashboardStatus {\n      running\n      url\n    }\n  }\n": typeof types.OptunaDashboardStatusDocument,
    "\n  mutation CreateBacktestTask($input: CreateBacktestTaskInput!) {\n    createBacktestTask(input: $input) {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.CreateBacktestTaskDocument,
    "\n  mutation CancelBacktestTask($taskId: ID!) {\n    cancelBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.CancelBacktestTaskDocument,
    "\n  mutation DeleteBacktestTask($taskId: ID!) {\n    deleteBacktestTask(taskId: $taskId)\n  }\n": typeof types.DeleteBacktestTaskDocument,
    "\n  mutation DeleteBacktestResult($resultId: ID!) {\n    deleteBacktestResult(resultId: $resultId)\n  }\n": typeof types.DeleteBacktestResultDocument,
    "\n  mutation RetryBacktestTask($taskId: ID!) {\n    retryBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.RetryBacktestTaskDocument,
    "\n  mutation StartOptunaDashboard($port: Int) {\n    startOptunaDashboard(port: $port) {\n      running\n      url\n    }\n  }\n": typeof types.StartOptunaDashboardDocument,
    "\n  mutation ResumeBacktestTask($taskId: ID!, $additionalTrials: Int) {\n    resumeBacktestTask(taskId: $taskId, additionalTrials: $additionalTrials) {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.ResumeBacktestTaskDocument,
    "\n  mutation StopOptunaDashboard {\n    stopOptunaDashboard\n  }\n": typeof types.StopOptunaDashboardDocument,
    "\n  subscription BacktestTaskUpdated {\n    backtestTaskUpdated {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.BacktestTaskUpdatedDocument,
    "\n  subscription BacktestResultCreated {\n    backtestResultCreated {\n      ...BacktestResultInfo\n    }\n  }\n": typeof types.BacktestResultCreatedDocument,
    "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    isTestnet\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n": typeof types.ContractInfoFragmentDoc,
    "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n": typeof types.GetAllContractsDocument,
    "\n  query getAdaptionStatus {\n    getAdaptionStatus\n  }\n": typeof types.GetAdaptionStatusDocument,
    "\n  mutation disableContract($contractId: Int!) {\n    disableContract(contractId: $contractId) {\n      ...ContractInfo\n    }\n  }\n": typeof types.DisableContractDocument,
    "\n  mutation liveContract($contractId: Int!, $fromBlock: Int) {\n    liveContract(contractId: $contractId, fromBlock: $fromBlock) {\n      ...ContractInfo\n    }\n  }\n": typeof types.LiveContractDocument,
    "\n  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {\n    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)\n  }\n": typeof types.StartAdaptionDocument,
    "\n  fragment FollowerInfo on Follower {\n    userId\n    address\n    accountIndex\n    publicKey\n  }\n": typeof types.FollowerInfoFragmentDoc,
    "\n  fragment FollowerTradeInfo on FollowerTrade {\n    address\n    index\n    mission {\n      ...MissionForwardDetailsInfo\n    }\n    params\n  }\n": typeof types.FollowerTradeInfoFragmentDoc,
    "\n  fragment FollowerPendingOrderInfo on FollowerPendingOrder {\n    params\n    address\n    index\n  }\n": typeof types.FollowerPendingOrderInfoFragmentDoc,
    "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      ...PnlSnapshotV2Info\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n": typeof types.FollowerDetailInfoFragmentDoc,
    "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n": typeof types.GetAllFollowersDocument,
    "\n  query getAllFollowerDetails($contractId: Int!, $after: Int, $first: Int!) {\n    getAllFollowerDetails(\n      contractId: $contractId\n      after: $after\n      first: $first\n    ) {\n      edges {\n        cursor\n        node {\n          ...FollowerDetailInfo\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.GetAllFollowerDetailsDocument,
    "\n  query getALLSLTPs {\n    getALLSLTPs {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n": typeof types.GetAllsltPsDocument,
    "\n  query getGnsPrices($pairName: String!, $fromDate: Date!, $toDate: Date!) {\n    getGnsPrices(pairName: $pairName, fromDate: $fromDate, toDate: $toDate) {\n      id\n      pair\n      price\n      date\n    }\n  }\n": typeof types.GetGnsPricesDocument,
    "\n  mutation closeTradeMarket($input: CloseTradeInput!) {\n    closeTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.CloseTradeMarketDocument,
    "\n  mutation openTradeMarket($input: OpenTradeInput!) {\n    openTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.OpenTradeMarketDocument,
    "\n  mutation increasePositionSize($input: IncreasePositionSizeInput!) {\n    increasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.IncreasePositionSizeDocument,
    "\n  mutation decreasePositionSize($input: DecreasePositionSizeInput!) {\n    decreasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.DecreasePositionSizeDocument,
    "\n  mutation updateLeverage($input: UpdateLeverageInput!) {\n    updateLeverage(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.UpdateLeverageDocument,
    "\n  mutation cancelOrderAfterTimeout($input: CancelOrderAfterTimeoutInput!) {\n    cancelOrderAfterTimeout(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.CancelOrderAfterTimeoutDocument,
    "\n  mutation updateSl($input: UpdateSlInput!) {\n    updateSl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.UpdateSlDocument,
    "\n  mutation updateTp($input: UpdateTpInput!) {\n    updateTp(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.UpdateTpDocument,
    "\n  mutation withdrawPositivePnl($input: WithdrawPositivePnlInput!) {\n    withdrawPositivePnl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": typeof types.WithdrawPositivePnlDocument,
    "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n": typeof types.GenerateNewFollowerDocument,
    "\n  mutation withdrawAllErc20($input: WithdrawAllInput!) {\n    withdrawAllErc20(input: $input)\n  }\n": typeof types.WithdrawAllErc20Document,
    "\n  mutation withdrawAsset($input: AssetInput!) {\n    withdrawAsset(input: $input)\n  }\n": typeof types.WithdrawAssetDocument,
    "\n  mutation depositAsset($input: AssetInput!) {\n    depositAsset(input: $input)\n  }\n": typeof types.DepositAssetDocument,
    "\n  mutation decreaseAllowanceToZero(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    decreaseAllowanceToZero(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n": typeof types.DecreaseAllowanceToZeroDocument,
    "\n  mutation increaseAllowanceToMax(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    increaseAllowanceToMax(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n": typeof types.IncreaseAllowanceToMaxDocument,
    "\n  mutation withdrawAllETH($input: WithdrawAllInput!) {\n    withdrawAllETH(input: $input)\n  }\n": typeof types.WithdrawAllEthDocument,
    "\n  mutation withdrawETHToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawETHToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n": typeof types.WithdrawEthToUserDocument,
    "\n  mutation withdrawErc20ToUser(\n    $amount: Float!\n    $collateralIndex: Int!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawErc20ToUser(\n      amount: $amount\n      collateralIndex: $collateralIndex\n      contractId: $contractId\n      password: $password\n    )\n  }\n": typeof types.WithdrawErc20ToUserDocument,
    "\n  mutation createSLTP($input: SLTPRequestInput!) {\n    createSLTP(input: $input) {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n": typeof types.CreateSltpDocument,
    "\n  mutation deleteSLTP($id: Int!) {\n    deleteSLTP(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteSltpDocument,
    "\n  fragment PnlSnapshotV2Info on PnlSnapshotV2 {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    platform\n  }\n": typeof types.PnlSnapshotV2InfoFragmentDoc,
    "\n  fragment PerpTradingEventLogInfo on PerpTradingEventLog {\n    address\n    block\n    contractId\n    date\n    id\n    jsonLog\n    logIndex\n    platform\n    usdPnl\n  }\n": typeof types.PerpTradingEventLogInfoFragmentDoc,
    "\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    perpTradingEventLogs {\n      ...PerpTradingEventLogInfo\n    }\n    platform\n  }\n": typeof types.PnlSnapshotV2DetailsInfoFragmentDoc,
    "\n  query getWholeCompressedHistoriesV2(\n    $platform: Platform!\n    $startDate: String!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistoriesV2(\n      platform: $platform\n      startDate: $startDate\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        date\n        in\n        inOut\n        out\n        pnl\n        positionCount\n        taskCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      uniqueTraders\n      totalBots {\n        address\n        platform\n        dateStr\n      }\n    }\n  }\n": typeof types.GetWholeCompressedHistoriesV2Document,
    "\n  query getPerpEventLogs(\n    $addresses: [String!]!\n    $platform: Platform!\n    $limit: Int\n  ) {\n    getPerpEventLogs(\n      addresses: $addresses\n      platform: $platform\n      limit: $limit\n    ) {\n      ...PerpTradingEventLogInfo\n    }\n  }\n": typeof types.GetPerpEventLogsDocument,
    "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": typeof types.GetPnlSnapshotV2InitializedFlagDocument,
    "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $first: Int!\n    $after: Int\n    $kind: PnlSnapshotKind!\n    $minR2: Float!\n    $minSlope: Float!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      first: $first\n      after: $after\n      kind: $kind\n      minR2: $minR2\n      minSlope: $minSlope\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotV2DetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetPnlSnapshotsV2Document,
    "\n  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {\n    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": typeof types.IsPnlSnapshotV2InitializedDocument,
    "\n  mutation buildPnlSnapshotsV2(\n    $dateStr: String!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    buildPnlSnapshotsV2(\n      dateStr: $dateStr\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n": typeof types.BuildPnlSnapshotsV2Document,
    "\n  mutation dynamicSnapshotBuildV2($dateStr: String!, $platform: Platform!) {\n    dynamicSnapshotBuildV2(dateStr: $dateStr, platform: $platform)\n  }\n": typeof types.DynamicSnapshotBuildV2Document,
    "\n  mutation initializePnlSnapshotV2(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    initializePnlSnapshotV2(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n": typeof types.InitializePnlSnapshotV2Document,
    "\n  fragment LogInfo on Log {\n    id\n    severity\n    summary\n    details\n    timestamp\n    checked\n  }\n": typeof types.LogInfoFragmentDoc,
    "\n  query allLogs(\n    $severity: LogSeverity\n    $checked: Boolean!\n    $first: Int!\n    $after: Int\n  ) {\n    allLogs(\n      severity: $severity\n      checked: $checked\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...LogInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.AllLogsDocument,
    "\n  query getLogsSeverityCounts {\n    getLogsSeverityCounts {\n      severity\n      counts\n    }\n  }\n": typeof types.GetLogsSeverityCountsDocument,
    "\n  mutation checkLog($id: Int!) {\n    checkLog(id: $id) {\n      ...LogInfo\n    }\n  }\n": typeof types.CheckLogDocument,
    "\n  subscription newLog($checked: Boolean!, $severity: LogSeverity) {\n    newLog(checked: $checked, severity: $severity) {\n      ...LogInfo\n    }\n  }\n": typeof types.NewLogDocument,
    "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    status\n    createdAt\n    updatedAt\n    mode\n  }\n": typeof types.MissionInfoFragmentDoc,
    "\n  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    bot {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.MissionBackwardDetailsInfoFragmentDoc,
    "\n  fragment MissionForwardDetailsInfo on MissionForwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    tasks {\n      ...TaskForwardDetailsInfo\n    }\n  }\n": typeof types.MissionForwardDetailsInfoFragmentDoc,
    "\n  query getMaxOpenMissions {\n    getMaxOpenMissions\n  }\n": typeof types.GetMaxOpenMissionsDocument,
    "\n  mutation updateMaxOpenMissions($maxCount: Int!) {\n    updateMaxOpenMissions(maxCount: $maxCount)\n  }\n": typeof types.UpdateMaxOpenMissionsDocument,
    "\n  mutation cloneMission($id: Int!, $manualParams: ManualParams) {\n    cloneMission(id: $id, manualParams: $manualParams)\n  }\n": typeof types.CloneMissionDocument,
    "\n  mutation closeMission($id: Int!, $isForce: Boolean!) {\n    closeMission(id: $id, isForce: $isForce)\n  }\n": typeof types.CloseMissionDocument,
    "\n  mutation ignoreMission($id: Int!) {\n    ignoreMission(id: $id)\n  }\n": typeof types.IgnoreMissionDocument,
    "\n  subscription missionCreated($userId: String!) {\n    missionCreated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": typeof types.MissionCreatedDocument,
    "\n  subscription missionUpdated($userId: String!) {\n    missionUpdated(userId: $userId) {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": typeof types.MissionUpdatedDocument,
    "\n  fragment PlanInfo on Plan {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n  }\n": typeof types.PlanInfoFragmentDoc,
    "\n  fragment PlanForwardDetailsInfo on PlanForwardDetails {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    bots {\n      ...BotForwardDetailsInfo\n    }\n  }\n": typeof types.PlanForwardDetailsInfoFragmentDoc,
    "\n  query getPlansByStatus($status: PlanStatus!, $after: Int, $first: Int!) {\n    getPlansByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetPlansByStatusDocument,
    "\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n    leaderPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n    followerPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n  }\n": typeof types.PlanSummaryInfoFragmentDoc,
    "\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetPlanSummariesByStatusDocument,
    "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanForwardDetailsInfo\n    }\n  }\n": typeof types.GetPlanByIdDocument,
    "\n  query getPlanBotGroups(\n    $planId: Int!\n    $page: Int!\n    $pageSize: Int!\n    $hideDead: Boolean!\n  ) {\n    getPlanBotGroups(\n      planId: $planId\n      page: $page\n      pageSize: $pageSize\n      hideDead: $hideDead\n    ) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n": typeof types.GetPlanBotGroupsDocument,
    "\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n": typeof types.CreatePlanDocument,
    "\n  mutation createAutoPlan {\n    createAutoPlan\n  }\n": typeof types.CreateAutoPlanDocument,
    "\n  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {\n    updatePlan(updatePlanInput: $updatePlanInput) {\n      ...PlanInfo\n    }\n  }\n": typeof types.UpdatePlanDocument,
    "\n  mutation deletePlan($id: Int!) {\n    deletePlan(id: $id)\n  }\n": typeof types.DeletePlanDocument,
    "\n  mutation startPlan($id: Int!) {\n    startPlan(id: $id)\n  }\n": typeof types.StartPlanDocument,
    "\n  mutation endPlan($id: Int!) {\n    endPlan(id: $id)\n  }\n": typeof types.EndPlanDocument,
    "\n  subscription planCreated($userId: String!) {\n    planCreated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": typeof types.PlanCreatedDocument,
    "\n  subscription planUpdated($userId: String!) {\n    planUpdated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": typeof types.PlanUpdatedDocument,
    "\n  query getBlacklist {\n    getBlacklist\n  }\n": typeof types.GetBlacklistDocument,
    "\n  mutation addToBlacklist($address: String!) {\n    addToBlacklist(address: $address)\n  }\n": typeof types.AddToBlacklistDocument,
    "\n  mutation removeFromBlacklist($address: String!) {\n    removeFromBlacklist(address: $address)\n  }\n": typeof types.RemoveFromBlacklistDocument,
    "\n  query getExpertPnlSnapshotsV2($platform: Platform!, $after: Int) {\n    getExpertPnlSnapshotsV2(platform: $platform, after: $after) {\n      edges {\n        cursor\n        node {\n          accUSDPnl\n          address\n          platform\n          dateStr\n          id\n          kind\n          maxSize\n          ratio\n          score\n          openedPositions\n          avgPnlRatio\n          avgDuration\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetExpertPnlSnapshotsV2Document,
    "\n  query getWhitelist {\n    getWhitelist\n  }\n": typeof types.GetWhitelistDocument,
    "\n  mutation addToWhitelist($params: String!) {\n    addToWhitelist(params: $params)\n  }\n": typeof types.AddToWhitelistDocument,
    "\n  mutation removeFromWhitelist($address: String!) {\n    removeFromWhitelist(address: $address)\n  }\n": typeof types.RemoveFromWhitelistDocument,
    "\n  fragment StrategyMetadataInfo on StrategyMetadata {\n    key\n    title\n    description\n  }\n": typeof types.StrategyMetadataInfoFragmentDoc,
    "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    collateralBaseline\n    params\n    ratio\n    strategyKey\n  }\n": typeof types.StrategyInfoFragmentDoc,
    "\n  query getAllStrategyMetadata {\n    getAllStrategyMetadata {\n      ...StrategyMetadataInfo\n    }\n  }\n": typeof types.GetAllStrategyMetadataDocument,
    "\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n": typeof types.GetAllStrategyDocument,
    "\n  mutation updateStrategy($id: Int!, $input: UpdateStrategyInput!) {\n    updateStrategy(id: $id, input: $input) {\n      ...StrategyInfo\n    }\n  }\n": typeof types.UpdateStrategyDocument,
    "\n  fragment StrategyTemplateInfo on StrategyTemplate {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n  }\n": typeof types.StrategyTemplateInfoFragmentDoc,
    "\n  fragment StrategyTemplateWithStatsInfo on StrategyTemplateWithStats {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n    totalSearches\n    totalTasks\n  }\n": typeof types.StrategyTemplateWithStatsInfoFragmentDoc,
    "\n  query StrategyTemplate($id: ID!) {\n    strategyTemplate(id: $id) {\n      ...StrategyTemplateInfo\n    }\n  }\n": typeof types.StrategyTemplateDocument,
    "\n  query StrategyTemplates(\n    $category: StrategyCategory\n    $isActive: Boolean\n    $limit: Int\n    $offset: Int\n  ) {\n    strategyTemplates(\n      category: $category\n      isActive: $isActive\n      limit: $limit\n      offset: $offset\n    ) {\n      ...StrategyTemplateInfo\n    }\n  }\n": typeof types.StrategyTemplatesDocument,
    "\n  query StrategyTemplateWithStats($id: ID!) {\n    strategyTemplateWithStats(id: $id) {\n      ...StrategyTemplateWithStatsInfo\n    }\n  }\n": typeof types.StrategyTemplateWithStatsDocument,
    "\n  mutation CreateStrategyTemplate($input: CreateStrategyTemplateInput!) {\n    createStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n": typeof types.CreateStrategyTemplateDocument,
    "\n  mutation UpdateStrategyTemplate($input: UpdateStrategyTemplateInput!) {\n    updateStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n": typeof types.UpdateStrategyTemplateDocument,
    "\n  mutation DeleteStrategyTemplate($id: ID!) {\n    deleteStrategyTemplate(id: $id)\n  }\n": typeof types.DeleteStrategyTemplateDocument,
    "\n  mutation pauseSystem {\n    pauseSystem\n  }\n": typeof types.PauseSystemDocument,
    "\n  mutation resumeSystem($password: String) {\n    resumeSystem(password: $password)\n  }\n": typeof types.ResumeSystemDocument,
    "\n  mutation killSubService($service: String!) {\n    killSubService(service: $service)\n  }\n": typeof types.KillSubServiceDocument,
    "\n  mutation startSubService($service: String!) {\n    startSubService(service: $service)\n  }\n": typeof types.StartSubServiceDocument,
    "\n  query getMicroserviceStatus {\n    getMicroserviceStatus {\n      pids\n      service\n    }\n  }\n": typeof types.GetMicroserviceStatusDocument,
    "\n  mutation makeSafeApp($password: String!) {\n    makeSafeApp(password: $password)\n  }\n": typeof types.MakeSafeAppDocument,
    "\n  mutation changePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n": typeof types.ChangePasswordDocument,
    "\n  query getSystemStatus {\n    systemStatus\n  }\n": typeof types.GetSystemStatusDocument,
    "\n  query isSafeApp {\n    isSafeApp\n  }\n": typeof types.IsSafeAppDocument,
    "\n  mutation cleanDB {\n    cleanDB\n  }\n": typeof types.CleanDbDocument,
    "\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n": typeof types.GetServerTimeDocument,
    "\n  fragment TagCategoryInfo on TagCategory {\n    id\n    category\n    description\n    userId\n  }\n": typeof types.TagCategoryInfoFragmentDoc,
    "\n  fragment TagInfo on Tag {\n    id\n    tag\n    description\n    color\n    categoryId\n    userId\n  }\n": typeof types.TagInfoFragmentDoc,
    "\n  query getAllTags {\n    getAllTags {\n      ...TagInfo\n    }\n  }\n": typeof types.GetAllTagsDocument,
    "\n  mutation upsertTag($input: TagInput!) {\n    upsertTag(input: $input) {\n      ...TagInfo\n    }\n  }\n": typeof types.UpsertTagDocument,
    "\n  mutation deleteTag($tag: String!) {\n    deleteTag(tag: $tag) {\n      ...TagInfo\n    }\n  }\n": typeof types.DeleteTagDocument,
    "\n  query getAllCategories {\n    getAllCategories {\n      ...TagCategoryInfo\n    }\n  }\n": typeof types.GetAllCategoriesDocument,
    "\n  mutation upsertCategory($input: TagCategoryInput!) {\n    upsertCategory(input: $input) {\n      ...TagCategoryInfo\n    }\n  }\n": typeof types.UpsertCategoryDocument,
    "\n  mutation deleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      ...TagCategoryInfo\n    }\n  }\n": typeof types.DeleteCategoryDocument,
    "\n  fragment ActionInfo on Action {\n    id\n    name\n    positionKey\n    address\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n": typeof types.ActionInfoFragmentDoc,
    "\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n": typeof types.FollowerActionDetailsInfoFragmentDoc,
    "\n  fragment TaskForwardDetailsInfo on TaskForwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n": typeof types.TaskForwardDetailsInfoFragmentDoc,
    "\n  fragment TaskBackwardDetailsInfo on TaskBackwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n    mission {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": typeof types.TaskBackwardDetailsInfoFragmentDoc,
    "\n  query getAlertTasks {\n    getAlertTasks {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": typeof types.GetAlertTasksDocument,
    "\n  mutation performTask($id: Int!) {\n    performTask(id: $id)\n  }\n": typeof types.PerformTaskDocument,
    "\n  mutation stopTask($id: Int!) {\n    stopTask(id: $id)\n  }\n": typeof types.StopTaskDocument,
    "\n  subscription taskCreated($userId: String!) {\n    taskCreated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": typeof types.TaskCreatedDocument,
    "\n  subscription taskUpdated($userId: String!) {\n    taskUpdated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": typeof types.TaskUpdatedDocument,
    "\n  fragment TemplateSearchInfo on TemplateSearch {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n": typeof types.TemplateSearchInfoFragmentDoc,
    "\n  fragment TemplateSearchWithTemplateInfo on TemplateSearchWithTemplate {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n  }\n": typeof types.TemplateSearchWithTemplateInfoFragmentDoc,
    "\n  fragment TemplateSearchWithTaskInfo on TemplateSearchWithTask {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n    task {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.TemplateSearchWithTaskInfoFragmentDoc,
    "\n  query TemplateSearch($id: ID!) {\n    templateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n": typeof types.TemplateSearchDocument,
    "\n  query TemplateSearchWithTask($id: ID!) {\n    templateSearchWithTask(id: $id) {\n      ...TemplateSearchWithTaskInfo\n    }\n  }\n": typeof types.TemplateSearchWithTaskDocument,
    "\n  query TemplateSearches($filter: TemplateSearchFilterInput) {\n    templateSearches(filter: $filter) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n": typeof types.TemplateSearchesDocument,
    "\n  query TemplateSearchStats {\n    templateSearchStats {\n      await\n      processing\n      done\n      failed\n      cancelled\n    }\n  }\n": typeof types.TemplateSearchStatsDocument,
    "\n  query TaskByTemplateSearch($searchId: ID!) {\n    taskByTemplateSearch(searchId: $searchId) {\n      ...BacktestTaskInfo\n    }\n  }\n": typeof types.TaskByTemplateSearchDocument,
    "\n  mutation CreateTemplateSearch($input: CreateTemplateSearchInput!) {\n    createTemplateSearch(input: $input) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n": typeof types.CreateTemplateSearchDocument,
    "\n  mutation CancelTemplateSearch($id: ID!) {\n    cancelTemplateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n": typeof types.CancelTemplateSearchDocument,
    "\n  mutation DeleteTemplateSearch($id: ID!) {\n    deleteTemplateSearch(id: $id)\n  }\n": typeof types.DeleteTemplateSearchDocument,
    "\n  subscription TemplateSearchUpdated {\n    templateSearchUpdated {\n      ...TemplateSearchInfo\n    }\n  }\n": typeof types.TemplateSearchUpdatedDocument,
    "\n  fragment TradingSignalLogInfo on TradingSignalLog {\n    id\n    address\n    platform\n    eventLogs {\n      ...PerpTradingEventLogInfo\n    }\n  }\n": typeof types.TradingSignalLogInfoFragmentDoc,
    "\n  query getTradingSignalLogs {\n    getTradingSignalLogs {\n      ...TradingSignalLogInfo\n    }\n  }\n": typeof types.GetTradingSignalLogsDocument,
    "\n  mutation registerTradingSignalLog($address: String!, $platform: Platform!) {\n    registerTradingSignalLog(address: $address, platform: $platform) {\n      ...TradingSignalLogInfo\n    }\n  }\n": typeof types.RegisterTradingSignalLogDocument,
    "\n  mutation unregisterTradingSignalLog($signalId: Int!) {\n    unregisterTradingSignalLog(signalId: $signalId) {\n      ...TradingSignalLogInfo\n    }\n  }\n": typeof types.UnregisterTradingSignalLogDocument,
    "\n    mutation removeEventLogsFromTradingSignalLog(\n      $eventLogIds: [Int!]!\n      $signalId: Int!\n    ) {\n      removeEventLogsFromTradingSignalLog(\n        eventLogIds: $eventLogIds\n        signalId: $signalId\n      ) {\n        ...TradingSignalLogInfo\n      }\n    }\n  ": typeof types.RemoveEventLogsFromTradingSignalLogDocument,
    "\n  subscription tradingSignalLogUpdated {\n    tradingSignalLogUpdated {\n      id\n      eventLogs {\n        ...PerpTradingEventLogInfo\n      }\n    }\n  }\n": typeof types.TradingSignalLogUpdatedDocument,
    "\n  query getAllUsers {\n    getAllUsers {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": typeof types.GetAllUsersDocument,
    "\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n": typeof types.GetTokenDocument,
    "\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": typeof types.ChangeUserPermissionDocument,
    "\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": typeof types.AllowAutoDocument,
    "\n  fragment ValidationPipelineInfo on ValidationPipeline {\n    id\n    name\n    backtestTaskId\n    status\n    currentStep\n    paretoConfig\n    wfaConfig\n    robustnessConfig\n    wfaCompletedWindows\n    robustnessCompletedSteps\n    totalCandidates\n    passedThreshold\n    paretoOptimal\n    passedWfa\n    userSelected\n    passedRobustness\n    finalApproved\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n": typeof types.ValidationPipelineInfoFragmentDoc,
    "\n  fragment ValidationCandidateInfo on ValidationCandidate {\n    id\n    pipelineId\n    resultId\n    configId\n    status\n    thresholdPassed\n    paretoRank\n    dominatedBy\n    wfaConsistency\n    wfaPassed\n    wfaWindowResults\n    userSelectedAt\n    userNotes\n    robustnessScore\n    robustnessPassed\n    robustnessStepResults\n    finalApprovedAt\n    finalNotes\n    createdAt\n    updatedAt\n  }\n": typeof types.ValidationCandidateInfoFragmentDoc,
    "\n  fragment BacktestResultSummary on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    strategyConfig\n  }\n": typeof types.BacktestResultSummaryFragmentDoc,
    "\n  query ValidationPipelines($filter: ValidationPipelineFilterInput) {\n    validationPipelines(filter: $filter) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.ValidationPipelinesDocument,
    "\n  query ValidationPipeline($id: ID!) {\n    validationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.ValidationPipelineDocument,
    "\n  query ValidationPipelineWithCandidates($id: ID!) {\n    validationPipelineWithCandidates(id: $id) {\n      id\n      name\n      backtestTaskId\n      status\n      currentStep\n      paretoConfig\n      wfaConfig\n      robustnessConfig\n      wfaCompletedWindows\n      robustnessCompletedSteps\n      totalCandidates\n      passedThreshold\n      paretoOptimal\n      passedWfa\n      userSelected\n      passedRobustness\n      finalApproved\n      createdAt\n      startedAt\n      completedAt\n      errorMessage\n      candidates {\n        ...ValidationCandidateInfo\n      }\n    }\n  }\n": typeof types.ValidationPipelineWithCandidatesDocument,
    "\n  query ValidationCandidatesByStatus($filter: ValidationCandidateFilterInput!) {\n    validationCandidatesByStatus(filter: $filter) {\n      totalCount\n      candidates {\n        id\n        pipelineId\n        resultId\n        configId\n        status\n        thresholdPassed\n        paretoRank\n        dominatedBy\n        wfaConsistency\n        wfaPassed\n        wfaWindowResults\n        userSelectedAt\n        userNotes\n        robustnessScore\n        robustnessPassed\n        robustnessStepResults\n        finalApprovedAt\n        finalNotes\n        createdAt\n        updatedAt\n        result {\n          ...BacktestResultSummary\n        }\n      }\n    }\n  }\n": typeof types.ValidationCandidatesByStatusDocument,
    "\n  query ValidationCandidate($id: ID!) {\n    validationCandidate(id: $id) {\n      id\n      pipelineId\n      resultId\n      configId\n      status\n      thresholdPassed\n      paretoRank\n      dominatedBy\n      wfaConsistency\n      wfaPassed\n      wfaWindowResults\n      userSelectedAt\n      userNotes\n      robustnessScore\n      robustnessPassed\n      robustnessStepResults\n      finalApprovedAt\n      finalNotes\n      createdAt\n      updatedAt\n      result {\n        ...BacktestResultSummary\n      }\n    }\n  }\n": typeof types.ValidationCandidateDocument,
    "\n  query ValidationPipelineStats {\n    validationPipelineStats {\n      created\n      inProgress\n      awaitingUser\n      completed\n      failed\n      cancelled\n    }\n  }\n": typeof types.ValidationPipelineStatsDocument,
    "\n  query ThresholdSteps($pipelineId: ID!) {\n    thresholdSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metricName\n      operator\n      value\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n": typeof types.ThresholdStepsDocument,
    "\n  query ParetoSteps($pipelineId: ID!) {\n    paretoSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metrics\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n": typeof types.ParetoStepsDocument,
    "\n  mutation CreateValidationPipeline($input: CreateValidationPipelineInput!) {\n    createValidationPipeline(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.CreateValidationPipelineDocument,
    "\n  mutation ApplyThresholdStep($input: ApplyThresholdStepInput!) {\n    applyThresholdStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.ApplyThresholdStepDocument,
    "\n  mutation PreviewThresholdStep($input: PreviewThresholdStepInput!) {\n    previewThresholdStep(input: $input) {\n      currentCount\n      survivingCount\n      eliminatedCount\n    }\n  }\n": typeof types.PreviewThresholdStepDocument,
    "\n  mutation RemoveThresholdStep($pipelineId: ID!, $stepId: ID!) {\n    removeThresholdStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.RemoveThresholdStepDocument,
    "\n  mutation CompleteThresholdStep($pipelineId: ID!) {\n    completeThresholdStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.CompleteThresholdStepDocument,
    "\n  mutation PreviewParetoStep($input: PreviewParetoStepInput!) {\n    previewParetoStep(input: $input) {\n      currentCount\n      optimalCount\n      dominatedCount\n    }\n  }\n": typeof types.PreviewParetoStepDocument,
    "\n  mutation ApplyParetoStep($input: ApplyParetoStepInput!) {\n    applyParetoStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.ApplyParetoStepDocument,
    "\n  mutation RemoveParetoStep($pipelineId: ID!, $stepId: ID!) {\n    removeParetoStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.RemoveParetoStepDocument,
    "\n  mutation CompleteParetoStep($pipelineId: ID!) {\n    completeParetoStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.CompleteParetoStepDocument,
    "\n  mutation StartWfa($input: StartWfaInput!) {\n    startWfa(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.StartWfaDocument,
    "\n  mutation PauseWfa($pipelineId: ID!) {\n    pauseWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.PauseWfaDocument,
    "\n  mutation ResumeWfa($pipelineId: ID!) {\n    resumeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.ResumeWfaDocument,
    "\n  mutation CompleteWfa($pipelineId: ID!) {\n    completeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.CompleteWfaDocument,
    "\n  mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {\n    submitUserSelection(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.SubmitUserSelectionDocument,
    "\n  mutation ConfigureRobustness($input: ConfigureRobustnessInput!) {\n    configureRobustness(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.ConfigureRobustnessDocument,
    "\n  mutation RunRobustnessStep($input: RunRobustnessStepInput!) {\n    runRobustnessStep(input: $input) {\n      candidateId\n      configId\n      stepIndex\n      sharpeRatio\n      totalPnl\n      maxDrawdown\n      status\n      errorMessage\n    }\n  }\n": typeof types.RunRobustnessStepDocument,
    "\n  mutation CompleteRobustness($pipelineId: ID!) {\n    completeRobustness(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.CompleteRobustnessDocument,
    "\n  mutation SubmitFinalApproval($pipelineId: ID!, $input: FinalApprovalInput!) {\n    submitFinalApproval(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.SubmitFinalApprovalDocument,
    "\n  mutation CancelValidationPipeline($id: ID!) {\n    cancelValidationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.CancelValidationPipelineDocument,
    "\n  mutation DeleteValidationPipeline($id: ID!) {\n    deleteValidationPipeline(id: $id)\n  }\n": typeof types.DeleteValidationPipelineDocument,
    "\n  subscription ValidationPipelineUpdated {\n    validationPipelineUpdated {\n      ...ValidationPipelineInfo\n    }\n  }\n": typeof types.ValidationPipelineUpdatedDocument,
    "\n  subscription ValidationCandidateUpdated {\n    validationCandidateUpdated {\n      ...ValidationCandidateInfo\n    }\n  }\n": typeof types.ValidationCandidateUpdatedDocument,
    "\n  fragment WalletAccountInfo on WalletAccount {\n    id\n    userId\n    address\n    tags {\n      ...TagInfo\n    }\n  }\n": typeof types.WalletAccountInfoFragmentDoc,
    "\n  query getAllWalletAccounts {\n    getAllWalletAccounts {\n      ...WalletAccountInfo\n    }\n  }\n": typeof types.GetAllWalletAccountsDocument,
    "\n  mutation addWalletAccount($input: AddUserInput!) {\n    addWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n": typeof types.AddWalletAccountDocument,
    "\n  mutation addTagToWalletAccount($input: ChangeUserTagInput!) {\n    addTagToWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n": typeof types.AddTagToWalletAccountDocument,
    "\n  mutation removeTagFromWalletAccount($input: ChangeUserTagInput!) {\n    removeTagFromWalletAccount(input: $input) {\n      ...WalletAccountInfo\n    }\n  }\n": typeof types.RemoveTagFromWalletAccountDocument,
};
const documents: Documents = {
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
    "\n  fragment BacktestTaskInfo on BacktestTask {\n    id\n    name\n    symbol\n    status\n    totalConfigs\n    processedConfigs\n    currentConfig\n    startDate\n    endDate\n    interval\n    optimizationParams\n    searchStrategy\n    optimizationMetrics\n    trials\n    bestConfigIds\n    optimizerPid\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    templateId\n    templateSearchId\n  }\n": types.BacktestTaskInfoFragmentDoc,
    "\n  fragment BacktestResultInfo on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    strategyConfig\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    resultFolder\n    createdAt\n  }\n": types.BacktestResultInfoFragmentDoc,
    "\n  query BacktestComponents {\n    backtestComponents {\n      signals {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      filters {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      risk {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      exits {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      platforms {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n    }\n  }\n": types.BacktestComponentsDocument,
    "\n  query BacktestTask($id: ID!) {\n    backtestTask(id: $id) {\n      ...BacktestTaskInfo\n    }\n  }\n": types.BacktestTaskDocument,
    "\n  query BacktestTasks(\n    $status: BacktestTaskStatus\n    $symbol: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestTasks(\n      status: $status\n      symbol: $symbol\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestTaskInfo\n    }\n  }\n": types.BacktestTasksDocument,
    "\n  query BacktestTaskStats {\n    backtestTaskStats {\n      await\n      processing\n      done\n      failed\n    }\n  }\n": types.BacktestTaskStatsDocument,
    "\n  query BacktestResults(\n    $taskId: ID!\n    $sortBy: String\n    $sortOrder: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestResults(\n      taskId: $taskId\n      sortBy: $sortBy\n      sortOrder: $sortOrder\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestResultInfo\n    }\n  }\n": types.BacktestResultsDocument,
    "\n  query BacktestResultDates($taskId: ID!) {\n    backtestResultDates(taskId: $taskId)\n  }\n": types.BacktestResultDatesDocument,
    "\n  query BacktestResultFolders($taskId: ID!, $date: String!) {\n    backtestResultFolders(taskId: $taskId, date: $date) {\n      taskId\n      date\n      configId\n      files\n    }\n  }\n": types.BacktestResultFoldersDocument,
    "\n  query BacktestResultFile(\n    $taskId: ID!\n    $date: String!\n    $configId: String!\n    $fileName: String!\n  ) {\n    backtestResultFile(\n      taskId: $taskId\n      date: $date\n      configId: $configId\n      fileName: $fileName\n    ) {\n      name\n      content\n      contentType\n      size\n      originalSize\n      isCompressed\n    }\n  }\n": types.BacktestResultFileDocument,
    "\n  query TopBacktestResults($taskId: ID!, $metric: String, $limit: Int) {\n    topBacktestResults(taskId: $taskId, metric: $metric, limit: $limit) {\n      ...BacktestResultInfo\n    }\n  }\n": types.TopBacktestResultsDocument,
    "\n  query OptunaDashboardStatus {\n    optunaDashboardStatus {\n      running\n      url\n    }\n  }\n": types.OptunaDashboardStatusDocument,
    "\n  mutation CreateBacktestTask($input: CreateBacktestTaskInput!) {\n    createBacktestTask(input: $input) {\n      ...BacktestTaskInfo\n    }\n  }\n": types.CreateBacktestTaskDocument,
    "\n  mutation CancelBacktestTask($taskId: ID!) {\n    cancelBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n": types.CancelBacktestTaskDocument,
    "\n  mutation DeleteBacktestTask($taskId: ID!) {\n    deleteBacktestTask(taskId: $taskId)\n  }\n": types.DeleteBacktestTaskDocument,
    "\n  mutation DeleteBacktestResult($resultId: ID!) {\n    deleteBacktestResult(resultId: $resultId)\n  }\n": types.DeleteBacktestResultDocument,
    "\n  mutation RetryBacktestTask($taskId: ID!) {\n    retryBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n": types.RetryBacktestTaskDocument,
    "\n  mutation StartOptunaDashboard($port: Int) {\n    startOptunaDashboard(port: $port) {\n      running\n      url\n    }\n  }\n": types.StartOptunaDashboardDocument,
    "\n  mutation ResumeBacktestTask($taskId: ID!, $additionalTrials: Int) {\n    resumeBacktestTask(taskId: $taskId, additionalTrials: $additionalTrials) {\n      ...BacktestTaskInfo\n    }\n  }\n": types.ResumeBacktestTaskDocument,
    "\n  mutation StopOptunaDashboard {\n    stopOptunaDashboard\n  }\n": types.StopOptunaDashboardDocument,
    "\n  subscription BacktestTaskUpdated {\n    backtestTaskUpdated {\n      ...BacktestTaskInfo\n    }\n  }\n": types.BacktestTaskUpdatedDocument,
    "\n  subscription BacktestResultCreated {\n    backtestResultCreated {\n      ...BacktestResultInfo\n    }\n  }\n": types.BacktestResultCreatedDocument,
    "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    isTestnet\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n": types.ContractInfoFragmentDoc,
    "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n": types.GetAllContractsDocument,
    "\n  query getAdaptionStatus {\n    getAdaptionStatus\n  }\n": types.GetAdaptionStatusDocument,
    "\n  mutation disableContract($contractId: Int!) {\n    disableContract(contractId: $contractId) {\n      ...ContractInfo\n    }\n  }\n": types.DisableContractDocument,
    "\n  mutation liveContract($contractId: Int!, $fromBlock: Int) {\n    liveContract(contractId: $contractId, fromBlock: $fromBlock) {\n      ...ContractInfo\n    }\n  }\n": types.LiveContractDocument,
    "\n  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {\n    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)\n  }\n": types.StartAdaptionDocument,
    "\n  fragment FollowerInfo on Follower {\n    userId\n    address\n    accountIndex\n    publicKey\n  }\n": types.FollowerInfoFragmentDoc,
    "\n  fragment FollowerTradeInfo on FollowerTrade {\n    address\n    index\n    mission {\n      ...MissionForwardDetailsInfo\n    }\n    params\n  }\n": types.FollowerTradeInfoFragmentDoc,
    "\n  fragment FollowerPendingOrderInfo on FollowerPendingOrder {\n    params\n    address\n    index\n  }\n": types.FollowerPendingOrderInfoFragmentDoc,
    "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      ...PnlSnapshotV2Info\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n": types.FollowerDetailInfoFragmentDoc,
    "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n": types.GetAllFollowersDocument,
    "\n  query getAllFollowerDetails($contractId: Int!, $after: Int, $first: Int!) {\n    getAllFollowerDetails(\n      contractId: $contractId\n      after: $after\n      first: $first\n    ) {\n      edges {\n        cursor\n        node {\n          ...FollowerDetailInfo\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.GetAllFollowerDetailsDocument,
    "\n  query getALLSLTPs {\n    getALLSLTPs {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n": types.GetAllsltPsDocument,
    "\n  query getGnsPrices($pairName: String!, $fromDate: Date!, $toDate: Date!) {\n    getGnsPrices(pairName: $pairName, fromDate: $fromDate, toDate: $toDate) {\n      id\n      pair\n      price\n      date\n    }\n  }\n": types.GetGnsPricesDocument,
    "\n  mutation closeTradeMarket($input: CloseTradeInput!) {\n    closeTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.CloseTradeMarketDocument,
    "\n  mutation openTradeMarket($input: OpenTradeInput!) {\n    openTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.OpenTradeMarketDocument,
    "\n  mutation increasePositionSize($input: IncreasePositionSizeInput!) {\n    increasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.IncreasePositionSizeDocument,
    "\n  mutation decreasePositionSize($input: DecreasePositionSizeInput!) {\n    decreasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.DecreasePositionSizeDocument,
    "\n  mutation updateLeverage($input: UpdateLeverageInput!) {\n    updateLeverage(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.UpdateLeverageDocument,
    "\n  mutation cancelOrderAfterTimeout($input: CancelOrderAfterTimeoutInput!) {\n    cancelOrderAfterTimeout(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.CancelOrderAfterTimeoutDocument,
    "\n  mutation updateSl($input: UpdateSlInput!) {\n    updateSl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.UpdateSlDocument,
    "\n  mutation updateTp($input: UpdateTpInput!) {\n    updateTp(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.UpdateTpDocument,
    "\n  mutation withdrawPositivePnl($input: WithdrawPositivePnlInput!) {\n    withdrawPositivePnl(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n": types.WithdrawPositivePnlDocument,
    "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n": types.GenerateNewFollowerDocument,
    "\n  mutation withdrawAllErc20($input: WithdrawAllInput!) {\n    withdrawAllErc20(input: $input)\n  }\n": types.WithdrawAllErc20Document,
    "\n  mutation withdrawAsset($input: AssetInput!) {\n    withdrawAsset(input: $input)\n  }\n": types.WithdrawAssetDocument,
    "\n  mutation depositAsset($input: AssetInput!) {\n    depositAsset(input: $input)\n  }\n": types.DepositAssetDocument,
    "\n  mutation decreaseAllowanceToZero(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    decreaseAllowanceToZero(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n": types.DecreaseAllowanceToZeroDocument,
    "\n  mutation increaseAllowanceToMax(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    increaseAllowanceToMax(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n": types.IncreaseAllowanceToMaxDocument,
    "\n  mutation withdrawAllETH($input: WithdrawAllInput!) {\n    withdrawAllETH(input: $input)\n  }\n": types.WithdrawAllEthDocument,
    "\n  mutation withdrawETHToUser(\n    $amount: Float!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawETHToUser(\n      amount: $amount\n      contractId: $contractId\n      password: $password\n    )\n  }\n": types.WithdrawEthToUserDocument,
    "\n  mutation withdrawErc20ToUser(\n    $amount: Float!\n    $collateralIndex: Int!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawErc20ToUser(\n      amount: $amount\n      collateralIndex: $collateralIndex\n      contractId: $contractId\n      password: $password\n    )\n  }\n": types.WithdrawErc20ToUserDocument,
    "\n  mutation createSLTP($input: SLTPRequestInput!) {\n    createSLTP(input: $input) {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n": types.CreateSltpDocument,
    "\n  mutation deleteSLTP($id: Int!) {\n    deleteSLTP(id: $id) {\n      id\n    }\n  }\n": types.DeleteSltpDocument,
    "\n  fragment PnlSnapshotV2Info on PnlSnapshotV2 {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    platform\n  }\n": types.PnlSnapshotV2InfoFragmentDoc,
    "\n  fragment PerpTradingEventLogInfo on PerpTradingEventLog {\n    address\n    block\n    contractId\n    date\n    id\n    jsonLog\n    logIndex\n    platform\n    usdPnl\n  }\n": types.PerpTradingEventLogInfoFragmentDoc,
    "\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    perpTradingEventLogs {\n      ...PerpTradingEventLogInfo\n    }\n    platform\n  }\n": types.PnlSnapshotV2DetailsInfoFragmentDoc,
    "\n  query getWholeCompressedHistoriesV2(\n    $platform: Platform!\n    $startDate: String!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistoriesV2(\n      platform: $platform\n      startDate: $startDate\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        date\n        in\n        inOut\n        out\n        pnl\n        positionCount\n        taskCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      uniqueTraders\n      totalBots {\n        address\n        platform\n        dateStr\n      }\n    }\n  }\n": types.GetWholeCompressedHistoriesV2Document,
    "\n  query getPerpEventLogs(\n    $addresses: [String!]!\n    $platform: Platform!\n    $limit: Int\n  ) {\n    getPerpEventLogs(\n      addresses: $addresses\n      platform: $platform\n      limit: $limit\n    ) {\n      ...PerpTradingEventLogInfo\n    }\n  }\n": types.GetPerpEventLogsDocument,
    "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": types.GetPnlSnapshotV2InitializedFlagDocument,
    "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $first: Int!\n    $after: Int\n    $kind: PnlSnapshotKind!\n    $minR2: Float!\n    $minSlope: Float!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      first: $first\n      after: $after\n      kind: $kind\n      minR2: $minR2\n      minSlope: $minSlope\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotV2DetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetPnlSnapshotsV2Document,
    "\n  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {\n    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": types.IsPnlSnapshotV2InitializedDocument,
    "\n  mutation buildPnlSnapshotsV2(\n    $dateStr: String!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    buildPnlSnapshotsV2(\n      dateStr: $dateStr\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n": types.BuildPnlSnapshotsV2Document,
    "\n  mutation dynamicSnapshotBuildV2($dateStr: String!, $platform: Platform!) {\n    dynamicSnapshotBuildV2(dateStr: $dateStr, platform: $platform)\n  }\n": types.DynamicSnapshotBuildV2Document,
    "\n  mutation initializePnlSnapshotV2(\n    $beginingDate: Date!\n    $isForceBuild: Boolean!\n    $platform: Platform!\n  ) {\n    initializePnlSnapshotV2(\n      beginingDate: $beginingDate\n      isForceBuild: $isForceBuild\n      platform: $platform\n    )\n  }\n": types.InitializePnlSnapshotV2Document,
    "\n  fragment LogInfo on Log {\n    id\n    severity\n    summary\n    details\n    timestamp\n    checked\n  }\n": types.LogInfoFragmentDoc,
    "\n  query allLogs(\n    $severity: LogSeverity\n    $checked: Boolean!\n    $first: Int!\n    $after: Int\n  ) {\n    allLogs(\n      severity: $severity\n      checked: $checked\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...LogInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.AllLogsDocument,
    "\n  query getLogsSeverityCounts {\n    getLogsSeverityCounts {\n      severity\n      counts\n    }\n  }\n": types.GetLogsSeverityCountsDocument,
    "\n  mutation checkLog($id: Int!) {\n    checkLog(id: $id) {\n      ...LogInfo\n    }\n  }\n": types.CheckLogDocument,
    "\n  subscription newLog($checked: Boolean!, $severity: LogSeverity) {\n    newLog(checked: $checked, severity: $severity) {\n      ...LogInfo\n    }\n  }\n": types.NewLogDocument,
    "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    status\n    createdAt\n    updatedAt\n    mode\n  }\n": types.MissionInfoFragmentDoc,
    "\n  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    bot {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.MissionBackwardDetailsInfoFragmentDoc,
    "\n  fragment MissionForwardDetailsInfo on MissionForwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    tasks {\n      ...TaskForwardDetailsInfo\n    }\n  }\n": types.MissionForwardDetailsInfoFragmentDoc,
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
    "\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n    leaderPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n    followerPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n  }\n": types.PlanSummaryInfoFragmentDoc,
    "\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetPlanSummariesByStatusDocument,
    "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanForwardDetailsInfo\n    }\n  }\n": types.GetPlanByIdDocument,
    "\n  query getPlanBotGroups(\n    $planId: Int!\n    $page: Int!\n    $pageSize: Int!\n    $hideDead: Boolean!\n  ) {\n    getPlanBotGroups(\n      planId: $planId\n      page: $page\n      pageSize: $pageSize\n      hideDead: $hideDead\n    ) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n": types.GetPlanBotGroupsDocument,
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
    "\n  query getExpertPnlSnapshotsV2($platform: Platform!, $after: Int) {\n    getExpertPnlSnapshotsV2(platform: $platform, after: $after) {\n      edges {\n        cursor\n        node {\n          accUSDPnl\n          address\n          platform\n          dateStr\n          id\n          kind\n          maxSize\n          ratio\n          score\n          openedPositions\n          avgPnlRatio\n          avgDuration\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetExpertPnlSnapshotsV2Document,
    "\n  query getWhitelist {\n    getWhitelist\n  }\n": types.GetWhitelistDocument,
    "\n  mutation addToWhitelist($params: String!) {\n    addToWhitelist(params: $params)\n  }\n": types.AddToWhitelistDocument,
    "\n  mutation removeFromWhitelist($address: String!) {\n    removeFromWhitelist(address: $address)\n  }\n": types.RemoveFromWhitelistDocument,
    "\n  fragment StrategyMetadataInfo on StrategyMetadata {\n    key\n    title\n    description\n  }\n": types.StrategyMetadataInfoFragmentDoc,
    "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    collateralBaseline\n    params\n    ratio\n    strategyKey\n  }\n": types.StrategyInfoFragmentDoc,
    "\n  query getAllStrategyMetadata {\n    getAllStrategyMetadata {\n      ...StrategyMetadataInfo\n    }\n  }\n": types.GetAllStrategyMetadataDocument,
    "\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n": types.GetAllStrategyDocument,
    "\n  mutation updateStrategy($id: Int!, $input: UpdateStrategyInput!) {\n    updateStrategy(id: $id, input: $input) {\n      ...StrategyInfo\n    }\n  }\n": types.UpdateStrategyDocument,
    "\n  fragment StrategyTemplateInfo on StrategyTemplate {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n  }\n": types.StrategyTemplateInfoFragmentDoc,
    "\n  fragment StrategyTemplateWithStatsInfo on StrategyTemplateWithStats {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n    totalSearches\n    totalTasks\n  }\n": types.StrategyTemplateWithStatsInfoFragmentDoc,
    "\n  query StrategyTemplate($id: ID!) {\n    strategyTemplate(id: $id) {\n      ...StrategyTemplateInfo\n    }\n  }\n": types.StrategyTemplateDocument,
    "\n  query StrategyTemplates(\n    $category: StrategyCategory\n    $isActive: Boolean\n    $limit: Int\n    $offset: Int\n  ) {\n    strategyTemplates(\n      category: $category\n      isActive: $isActive\n      limit: $limit\n      offset: $offset\n    ) {\n      ...StrategyTemplateInfo\n    }\n  }\n": types.StrategyTemplatesDocument,
    "\n  query StrategyTemplateWithStats($id: ID!) {\n    strategyTemplateWithStats(id: $id) {\n      ...StrategyTemplateWithStatsInfo\n    }\n  }\n": types.StrategyTemplateWithStatsDocument,
    "\n  mutation CreateStrategyTemplate($input: CreateStrategyTemplateInput!) {\n    createStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n": types.CreateStrategyTemplateDocument,
    "\n  mutation UpdateStrategyTemplate($input: UpdateStrategyTemplateInput!) {\n    updateStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n": types.UpdateStrategyTemplateDocument,
    "\n  mutation DeleteStrategyTemplate($id: ID!) {\n    deleteStrategyTemplate(id: $id)\n  }\n": types.DeleteStrategyTemplateDocument,
    "\n  mutation pauseSystem {\n    pauseSystem\n  }\n": types.PauseSystemDocument,
    "\n  mutation resumeSystem($password: String) {\n    resumeSystem(password: $password)\n  }\n": types.ResumeSystemDocument,
    "\n  mutation killSubService($service: String!) {\n    killSubService(service: $service)\n  }\n": types.KillSubServiceDocument,
    "\n  mutation startSubService($service: String!) {\n    startSubService(service: $service)\n  }\n": types.StartSubServiceDocument,
    "\n  query getMicroserviceStatus {\n    getMicroserviceStatus {\n      pids\n      service\n    }\n  }\n": types.GetMicroserviceStatusDocument,
    "\n  mutation makeSafeApp($password: String!) {\n    makeSafeApp(password: $password)\n  }\n": types.MakeSafeAppDocument,
    "\n  mutation changePassword($newPassword: String!, $oldPassword: String!) {\n    changePassword(newPassword: $newPassword, oldPassword: $oldPassword)\n  }\n": types.ChangePasswordDocument,
    "\n  query getSystemStatus {\n    systemStatus\n  }\n": types.GetSystemStatusDocument,
    "\n  query isSafeApp {\n    isSafeApp\n  }\n": types.IsSafeAppDocument,
    "\n  mutation cleanDB {\n    cleanDB\n  }\n": types.CleanDbDocument,
    "\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n": types.GetServerTimeDocument,
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
    "\n  fragment TemplateSearchInfo on TemplateSearch {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n": types.TemplateSearchInfoFragmentDoc,
    "\n  fragment TemplateSearchWithTemplateInfo on TemplateSearchWithTemplate {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n  }\n": types.TemplateSearchWithTemplateInfoFragmentDoc,
    "\n  fragment TemplateSearchWithTaskInfo on TemplateSearchWithTask {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n    task {\n      ...BacktestTaskInfo\n    }\n  }\n": types.TemplateSearchWithTaskInfoFragmentDoc,
    "\n  query TemplateSearch($id: ID!) {\n    templateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n": types.TemplateSearchDocument,
    "\n  query TemplateSearchWithTask($id: ID!) {\n    templateSearchWithTask(id: $id) {\n      ...TemplateSearchWithTaskInfo\n    }\n  }\n": types.TemplateSearchWithTaskDocument,
    "\n  query TemplateSearches($filter: TemplateSearchFilterInput) {\n    templateSearches(filter: $filter) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n": types.TemplateSearchesDocument,
    "\n  query TemplateSearchStats {\n    templateSearchStats {\n      await\n      processing\n      done\n      failed\n      cancelled\n    }\n  }\n": types.TemplateSearchStatsDocument,
    "\n  query TaskByTemplateSearch($searchId: ID!) {\n    taskByTemplateSearch(searchId: $searchId) {\n      ...BacktestTaskInfo\n    }\n  }\n": types.TaskByTemplateSearchDocument,
    "\n  mutation CreateTemplateSearch($input: CreateTemplateSearchInput!) {\n    createTemplateSearch(input: $input) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n": types.CreateTemplateSearchDocument,
    "\n  mutation CancelTemplateSearch($id: ID!) {\n    cancelTemplateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n": types.CancelTemplateSearchDocument,
    "\n  mutation DeleteTemplateSearch($id: ID!) {\n    deleteTemplateSearch(id: $id)\n  }\n": types.DeleteTemplateSearchDocument,
    "\n  subscription TemplateSearchUpdated {\n    templateSearchUpdated {\n      ...TemplateSearchInfo\n    }\n  }\n": types.TemplateSearchUpdatedDocument,
    "\n  fragment TradingSignalLogInfo on TradingSignalLog {\n    id\n    address\n    platform\n    eventLogs {\n      ...PerpTradingEventLogInfo\n    }\n  }\n": types.TradingSignalLogInfoFragmentDoc,
    "\n  query getTradingSignalLogs {\n    getTradingSignalLogs {\n      ...TradingSignalLogInfo\n    }\n  }\n": types.GetTradingSignalLogsDocument,
    "\n  mutation registerTradingSignalLog($address: String!, $platform: Platform!) {\n    registerTradingSignalLog(address: $address, platform: $platform) {\n      ...TradingSignalLogInfo\n    }\n  }\n": types.RegisterTradingSignalLogDocument,
    "\n  mutation unregisterTradingSignalLog($signalId: Int!) {\n    unregisterTradingSignalLog(signalId: $signalId) {\n      ...TradingSignalLogInfo\n    }\n  }\n": types.UnregisterTradingSignalLogDocument,
    "\n    mutation removeEventLogsFromTradingSignalLog(\n      $eventLogIds: [Int!]!\n      $signalId: Int!\n    ) {\n      removeEventLogsFromTradingSignalLog(\n        eventLogIds: $eventLogIds\n        signalId: $signalId\n      ) {\n        ...TradingSignalLogInfo\n      }\n    }\n  ": types.RemoveEventLogsFromTradingSignalLogDocument,
    "\n  subscription tradingSignalLogUpdated {\n    tradingSignalLogUpdated {\n      id\n      eventLogs {\n        ...PerpTradingEventLogInfo\n      }\n    }\n  }\n": types.TradingSignalLogUpdatedDocument,
    "\n  query getAllUsers {\n    getAllUsers {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n": types.GetTokenDocument,
    "\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.ChangeUserPermissionDocument,
    "\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.AllowAutoDocument,
    "\n  fragment ValidationPipelineInfo on ValidationPipeline {\n    id\n    name\n    backtestTaskId\n    status\n    currentStep\n    paretoConfig\n    wfaConfig\n    robustnessConfig\n    wfaCompletedWindows\n    robustnessCompletedSteps\n    totalCandidates\n    passedThreshold\n    paretoOptimal\n    passedWfa\n    userSelected\n    passedRobustness\n    finalApproved\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n": types.ValidationPipelineInfoFragmentDoc,
    "\n  fragment ValidationCandidateInfo on ValidationCandidate {\n    id\n    pipelineId\n    resultId\n    configId\n    status\n    thresholdPassed\n    paretoRank\n    dominatedBy\n    wfaConsistency\n    wfaPassed\n    wfaWindowResults\n    userSelectedAt\n    userNotes\n    robustnessScore\n    robustnessPassed\n    robustnessStepResults\n    finalApprovedAt\n    finalNotes\n    createdAt\n    updatedAt\n  }\n": types.ValidationCandidateInfoFragmentDoc,
    "\n  fragment BacktestResultSummary on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    strategyConfig\n  }\n": types.BacktestResultSummaryFragmentDoc,
    "\n  query ValidationPipelines($filter: ValidationPipelineFilterInput) {\n    validationPipelines(filter: $filter) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.ValidationPipelinesDocument,
    "\n  query ValidationPipeline($id: ID!) {\n    validationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.ValidationPipelineDocument,
    "\n  query ValidationPipelineWithCandidates($id: ID!) {\n    validationPipelineWithCandidates(id: $id) {\n      id\n      name\n      backtestTaskId\n      status\n      currentStep\n      paretoConfig\n      wfaConfig\n      robustnessConfig\n      wfaCompletedWindows\n      robustnessCompletedSteps\n      totalCandidates\n      passedThreshold\n      paretoOptimal\n      passedWfa\n      userSelected\n      passedRobustness\n      finalApproved\n      createdAt\n      startedAt\n      completedAt\n      errorMessage\n      candidates {\n        ...ValidationCandidateInfo\n      }\n    }\n  }\n": types.ValidationPipelineWithCandidatesDocument,
    "\n  query ValidationCandidatesByStatus($filter: ValidationCandidateFilterInput!) {\n    validationCandidatesByStatus(filter: $filter) {\n      totalCount\n      candidates {\n        id\n        pipelineId\n        resultId\n        configId\n        status\n        thresholdPassed\n        paretoRank\n        dominatedBy\n        wfaConsistency\n        wfaPassed\n        wfaWindowResults\n        userSelectedAt\n        userNotes\n        robustnessScore\n        robustnessPassed\n        robustnessStepResults\n        finalApprovedAt\n        finalNotes\n        createdAt\n        updatedAt\n        result {\n          ...BacktestResultSummary\n        }\n      }\n    }\n  }\n": types.ValidationCandidatesByStatusDocument,
    "\n  query ValidationCandidate($id: ID!) {\n    validationCandidate(id: $id) {\n      id\n      pipelineId\n      resultId\n      configId\n      status\n      thresholdPassed\n      paretoRank\n      dominatedBy\n      wfaConsistency\n      wfaPassed\n      wfaWindowResults\n      userSelectedAt\n      userNotes\n      robustnessScore\n      robustnessPassed\n      robustnessStepResults\n      finalApprovedAt\n      finalNotes\n      createdAt\n      updatedAt\n      result {\n        ...BacktestResultSummary\n      }\n    }\n  }\n": types.ValidationCandidateDocument,
    "\n  query ValidationPipelineStats {\n    validationPipelineStats {\n      created\n      inProgress\n      awaitingUser\n      completed\n      failed\n      cancelled\n    }\n  }\n": types.ValidationPipelineStatsDocument,
    "\n  query ThresholdSteps($pipelineId: ID!) {\n    thresholdSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metricName\n      operator\n      value\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n": types.ThresholdStepsDocument,
    "\n  query ParetoSteps($pipelineId: ID!) {\n    paretoSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metrics\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n": types.ParetoStepsDocument,
    "\n  mutation CreateValidationPipeline($input: CreateValidationPipelineInput!) {\n    createValidationPipeline(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.CreateValidationPipelineDocument,
    "\n  mutation ApplyThresholdStep($input: ApplyThresholdStepInput!) {\n    applyThresholdStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.ApplyThresholdStepDocument,
    "\n  mutation PreviewThresholdStep($input: PreviewThresholdStepInput!) {\n    previewThresholdStep(input: $input) {\n      currentCount\n      survivingCount\n      eliminatedCount\n    }\n  }\n": types.PreviewThresholdStepDocument,
    "\n  mutation RemoveThresholdStep($pipelineId: ID!, $stepId: ID!) {\n    removeThresholdStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.RemoveThresholdStepDocument,
    "\n  mutation CompleteThresholdStep($pipelineId: ID!) {\n    completeThresholdStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.CompleteThresholdStepDocument,
    "\n  mutation PreviewParetoStep($input: PreviewParetoStepInput!) {\n    previewParetoStep(input: $input) {\n      currentCount\n      optimalCount\n      dominatedCount\n    }\n  }\n": types.PreviewParetoStepDocument,
    "\n  mutation ApplyParetoStep($input: ApplyParetoStepInput!) {\n    applyParetoStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.ApplyParetoStepDocument,
    "\n  mutation RemoveParetoStep($pipelineId: ID!, $stepId: ID!) {\n    removeParetoStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.RemoveParetoStepDocument,
    "\n  mutation CompleteParetoStep($pipelineId: ID!) {\n    completeParetoStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.CompleteParetoStepDocument,
    "\n  mutation StartWfa($input: StartWfaInput!) {\n    startWfa(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.StartWfaDocument,
    "\n  mutation PauseWfa($pipelineId: ID!) {\n    pauseWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.PauseWfaDocument,
    "\n  mutation ResumeWfa($pipelineId: ID!) {\n    resumeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.ResumeWfaDocument,
    "\n  mutation CompleteWfa($pipelineId: ID!) {\n    completeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.CompleteWfaDocument,
    "\n  mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {\n    submitUserSelection(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.SubmitUserSelectionDocument,
    "\n  mutation ConfigureRobustness($input: ConfigureRobustnessInput!) {\n    configureRobustness(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.ConfigureRobustnessDocument,
    "\n  mutation RunRobustnessStep($input: RunRobustnessStepInput!) {\n    runRobustnessStep(input: $input) {\n      candidateId\n      configId\n      stepIndex\n      sharpeRatio\n      totalPnl\n      maxDrawdown\n      status\n      errorMessage\n    }\n  }\n": types.RunRobustnessStepDocument,
    "\n  mutation CompleteRobustness($pipelineId: ID!) {\n    completeRobustness(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.CompleteRobustnessDocument,
    "\n  mutation SubmitFinalApproval($pipelineId: ID!, $input: FinalApprovalInput!) {\n    submitFinalApproval(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.SubmitFinalApprovalDocument,
    "\n  mutation CancelValidationPipeline($id: ID!) {\n    cancelValidationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.CancelValidationPipelineDocument,
    "\n  mutation DeleteValidationPipeline($id: ID!) {\n    deleteValidationPipeline(id: $id)\n  }\n": types.DeleteValidationPipelineDocument,
    "\n  subscription ValidationPipelineUpdated {\n    validationPipelineUpdated {\n      ...ValidationPipelineInfo\n    }\n  }\n": types.ValidationPipelineUpdatedDocument,
    "\n  subscription ValidationCandidateUpdated {\n    validationCandidateUpdated {\n      ...ValidationCandidateInfo\n    }\n  }\n": types.ValidationCandidateUpdatedDocument,
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
export function graphql(source: "\n  fragment BacktestTaskInfo on BacktestTask {\n    id\n    name\n    symbol\n    status\n    totalConfigs\n    processedConfigs\n    currentConfig\n    startDate\n    endDate\n    interval\n    optimizationParams\n    searchStrategy\n    optimizationMetrics\n    trials\n    bestConfigIds\n    optimizerPid\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    templateId\n    templateSearchId\n  }\n"): (typeof documents)["\n  fragment BacktestTaskInfo on BacktestTask {\n    id\n    name\n    symbol\n    status\n    totalConfigs\n    processedConfigs\n    currentConfig\n    startDate\n    endDate\n    interval\n    optimizationParams\n    searchStrategy\n    optimizationMetrics\n    trials\n    bestConfigIds\n    optimizerPid\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    templateId\n    templateSearchId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BacktestResultInfo on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    strategyConfig\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    resultFolder\n    createdAt\n  }\n"): (typeof documents)["\n  fragment BacktestResultInfo on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    strategyConfig\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    resultFolder\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestComponents {\n    backtestComponents {\n      signals {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      filters {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      risk {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      exits {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      platforms {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query BacktestComponents {\n    backtestComponents {\n      signals {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      filters {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      risk {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      exits {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n      platforms {\n        name\n        description\n        params {\n          name\n          type\n          required\n          default\n          description\n          min\n          max\n          options {\n            label\n            value\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestTask($id: ID!) {\n    backtestTask(id: $id) {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  query BacktestTask($id: ID!) {\n    backtestTask(id: $id) {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestTasks(\n    $status: BacktestTaskStatus\n    $symbol: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestTasks(\n      status: $status\n      symbol: $symbol\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  query BacktestTasks(\n    $status: BacktestTaskStatus\n    $symbol: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestTasks(\n      status: $status\n      symbol: $symbol\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestTaskStats {\n    backtestTaskStats {\n      await\n      processing\n      done\n      failed\n    }\n  }\n"): (typeof documents)["\n  query BacktestTaskStats {\n    backtestTaskStats {\n      await\n      processing\n      done\n      failed\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestResults(\n    $taskId: ID!\n    $sortBy: String\n    $sortOrder: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestResults(\n      taskId: $taskId\n      sortBy: $sortBy\n      sortOrder: $sortOrder\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestResultInfo\n    }\n  }\n"): (typeof documents)["\n  query BacktestResults(\n    $taskId: ID!\n    $sortBy: String\n    $sortOrder: String\n    $limit: Int\n    $offset: Int\n  ) {\n    backtestResults(\n      taskId: $taskId\n      sortBy: $sortBy\n      sortOrder: $sortOrder\n      limit: $limit\n      offset: $offset\n    ) {\n      ...BacktestResultInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestResultDates($taskId: ID!) {\n    backtestResultDates(taskId: $taskId)\n  }\n"): (typeof documents)["\n  query BacktestResultDates($taskId: ID!) {\n    backtestResultDates(taskId: $taskId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestResultFolders($taskId: ID!, $date: String!) {\n    backtestResultFolders(taskId: $taskId, date: $date) {\n      taskId\n      date\n      configId\n      files\n    }\n  }\n"): (typeof documents)["\n  query BacktestResultFolders($taskId: ID!, $date: String!) {\n    backtestResultFolders(taskId: $taskId, date: $date) {\n      taskId\n      date\n      configId\n      files\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BacktestResultFile(\n    $taskId: ID!\n    $date: String!\n    $configId: String!\n    $fileName: String!\n  ) {\n    backtestResultFile(\n      taskId: $taskId\n      date: $date\n      configId: $configId\n      fileName: $fileName\n    ) {\n      name\n      content\n      contentType\n      size\n      originalSize\n      isCompressed\n    }\n  }\n"): (typeof documents)["\n  query BacktestResultFile(\n    $taskId: ID!\n    $date: String!\n    $configId: String!\n    $fileName: String!\n  ) {\n    backtestResultFile(\n      taskId: $taskId\n      date: $date\n      configId: $configId\n      fileName: $fileName\n    ) {\n      name\n      content\n      contentType\n      size\n      originalSize\n      isCompressed\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TopBacktestResults($taskId: ID!, $metric: String, $limit: Int) {\n    topBacktestResults(taskId: $taskId, metric: $metric, limit: $limit) {\n      ...BacktestResultInfo\n    }\n  }\n"): (typeof documents)["\n  query TopBacktestResults($taskId: ID!, $metric: String, $limit: Int) {\n    topBacktestResults(taskId: $taskId, metric: $metric, limit: $limit) {\n      ...BacktestResultInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query OptunaDashboardStatus {\n    optunaDashboardStatus {\n      running\n      url\n    }\n  }\n"): (typeof documents)["\n  query OptunaDashboardStatus {\n    optunaDashboardStatus {\n      running\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBacktestTask($input: CreateBacktestTaskInput!) {\n    createBacktestTask(input: $input) {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBacktestTask($input: CreateBacktestTaskInput!) {\n    createBacktestTask(input: $input) {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelBacktestTask($taskId: ID!) {\n    cancelBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CancelBacktestTask($taskId: ID!) {\n    cancelBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBacktestTask($taskId: ID!) {\n    deleteBacktestTask(taskId: $taskId)\n  }\n"): (typeof documents)["\n  mutation DeleteBacktestTask($taskId: ID!) {\n    deleteBacktestTask(taskId: $taskId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteBacktestResult($resultId: ID!) {\n    deleteBacktestResult(resultId: $resultId)\n  }\n"): (typeof documents)["\n  mutation DeleteBacktestResult($resultId: ID!) {\n    deleteBacktestResult(resultId: $resultId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RetryBacktestTask($taskId: ID!) {\n    retryBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  mutation RetryBacktestTask($taskId: ID!) {\n    retryBacktestTask(taskId: $taskId) {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartOptunaDashboard($port: Int) {\n    startOptunaDashboard(port: $port) {\n      running\n      url\n    }\n  }\n"): (typeof documents)["\n  mutation StartOptunaDashboard($port: Int) {\n    startOptunaDashboard(port: $port) {\n      running\n      url\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResumeBacktestTask($taskId: ID!, $additionalTrials: Int) {\n    resumeBacktestTask(taskId: $taskId, additionalTrials: $additionalTrials) {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  mutation ResumeBacktestTask($taskId: ID!, $additionalTrials: Int) {\n    resumeBacktestTask(taskId: $taskId, additionalTrials: $additionalTrials) {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StopOptunaDashboard {\n    stopOptunaDashboard\n  }\n"): (typeof documents)["\n  mutation StopOptunaDashboard {\n    stopOptunaDashboard\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription BacktestTaskUpdated {\n    backtestTaskUpdated {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  subscription BacktestTaskUpdated {\n    backtestTaskUpdated {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription BacktestResultCreated {\n    backtestResultCreated {\n      ...BacktestResultInfo\n    }\n  }\n"): (typeof documents)["\n  subscription BacktestResultCreated {\n    backtestResultCreated {\n      ...BacktestResultInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      ...PnlSnapshotV2Info\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n"): (typeof documents)["\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      ...PnlSnapshotV2Info\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  query getALLSLTPs {\n    getALLSLTPs {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getALLSLTPs {\n    getALLSLTPs {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGnsPrices($pairName: String!, $fromDate: Date!, $toDate: Date!) {\n    getGnsPrices(pairName: $pairName, fromDate: $fromDate, toDate: $toDate) {\n      id\n      pair\n      price\n      date\n    }\n  }\n"): (typeof documents)["\n  query getGnsPrices($pairName: String!, $fromDate: Date!, $toDate: Date!) {\n    getGnsPrices(pairName: $pairName, fromDate: $fromDate, toDate: $toDate) {\n      id\n      pair\n      price\n      date\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation closeTradeMarket($input: CloseTradeInput!) {\n    closeTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation closeTradeMarket($input: CloseTradeInput!) {\n    closeTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation openTradeMarket($input: OpenTradeInput!) {\n    openTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation openTradeMarket($input: OpenTradeInput!) {\n    openTradeMarket(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation increasePositionSize($input: IncreasePositionSizeInput!) {\n    increasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation increasePositionSize($input: IncreasePositionSizeInput!) {\n    increasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation decreasePositionSize($input: DecreasePositionSizeInput!) {\n    decreasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation decreasePositionSize($input: DecreasePositionSizeInput!) {\n    decreasePositionSize(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateLeverage($input: UpdateLeverageInput!) {\n    updateLeverage(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"): (typeof documents)["\n  mutation updateLeverage($input: UpdateLeverageInput!) {\n    updateLeverage(input: $input) {\n      message\n      success\n      address\n      contractId\n      index\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation withdrawAllErc20($input: WithdrawAllInput!) {\n    withdrawAllErc20(input: $input)\n  }\n"): (typeof documents)["\n  mutation withdrawAllErc20($input: WithdrawAllInput!) {\n    withdrawAllErc20(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation withdrawAsset($input: AssetInput!) {\n    withdrawAsset(input: $input)\n  }\n"): (typeof documents)["\n  mutation withdrawAsset($input: AssetInput!) {\n    withdrawAsset(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation depositAsset($input: AssetInput!) {\n    depositAsset(input: $input)\n  }\n"): (typeof documents)["\n  mutation depositAsset($input: AssetInput!) {\n    depositAsset(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation decreaseAllowanceToZero(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    decreaseAllowanceToZero(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n"): (typeof documents)["\n  mutation decreaseAllowanceToZero(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    decreaseAllowanceToZero(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation increaseAllowanceToMax(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    increaseAllowanceToMax(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n"): (typeof documents)["\n  mutation increaseAllowanceToMax(\n    $contractId: Int!\n    $followerAddress: String!\n    $password: String!\n    $collateralIndex: Int!\n  ) {\n    increaseAllowanceToMax(\n      contractId: $contractId\n      followerAddress: $followerAddress\n      password: $password\n      collateralIndex: $collateralIndex\n    )\n  }\n"];
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
export function graphql(source: "\n  mutation withdrawErc20ToUser(\n    $amount: Float!\n    $collateralIndex: Int!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawErc20ToUser(\n      amount: $amount\n      collateralIndex: $collateralIndex\n      contractId: $contractId\n      password: $password\n    )\n  }\n"): (typeof documents)["\n  mutation withdrawErc20ToUser(\n    $amount: Float!\n    $collateralIndex: Int!\n    $contractId: Int!\n    $password: String!\n  ) {\n    withdrawErc20ToUser(\n      amount: $amount\n      collateralIndex: $collateralIndex\n      contractId: $contractId\n      password: $password\n    )\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSLTP($input: SLTPRequestInput!) {\n    createSLTP(input: $input) {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createSLTP($input: SLTPRequestInput!) {\n    createSLTP(input: $input) {\n      id\n      address\n      contractId\n      positionKey\n      condition\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSLTP($id: Int!) {\n    deleteSLTP(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteSLTP($id: Int!) {\n    deleteSLTP(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PnlSnapshotV2Info on PnlSnapshotV2 {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    platform\n  }\n"): (typeof documents)["\n  fragment PnlSnapshotV2Info on PnlSnapshotV2 {\n    accUSDPnl\n    address\n    dateStr\n    id\n    kind\n    platform\n  }\n"];
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
export function graphql(source: "\n  query getWholeCompressedHistoriesV2(\n    $platform: Platform!\n    $startDate: String!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistoriesV2(\n      platform: $platform\n      startDate: $startDate\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        date\n        in\n        inOut\n        out\n        pnl\n        positionCount\n        taskCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      uniqueTraders\n      totalBots {\n        address\n        platform\n        dateStr\n      }\n    }\n  }\n"): (typeof documents)["\n  query getWholeCompressedHistoriesV2(\n    $platform: Platform!\n    $startDate: String!\n    $filterParams: [ExportFilter!]!\n  ) {\n    getWholeCompressedHistoriesV2(\n      platform: $platform\n      startDate: $startDate\n      filterParams: $filterParams\n    ) {\n      accPnls {\n        date\n        in\n        inOut\n        out\n        pnl\n        positionCount\n        taskCount\n      }\n      botCounts {\n        botCount\n        date\n      }\n      maxInvested\n      uniqueTraders\n      totalBots {\n        address\n        platform\n        dateStr\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPerpEventLogs(\n    $addresses: [String!]!\n    $platform: Platform!\n    $limit: Int\n  ) {\n    getPerpEventLogs(\n      addresses: $addresses\n      platform: $platform\n      limit: $limit\n    ) {\n      ...PerpTradingEventLogInfo\n    }\n  }\n"): (typeof documents)["\n  query getPerpEventLogs(\n    $addresses: [String!]!\n    $platform: Platform!\n    $limit: Int\n  ) {\n    getPerpEventLogs(\n      addresses: $addresses\n      platform: $platform\n      limit: $limit\n    ) {\n      ...PerpTradingEventLogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $first: Int!\n    $after: Int\n    $kind: PnlSnapshotKind!\n    $minR2: Float!\n    $minSlope: Float!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      first: $first\n      after: $after\n      kind: $kind\n      minR2: $minR2\n      minSlope: $minSlope\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotV2DetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $first: Int!\n    $after: Int\n    $kind: PnlSnapshotKind!\n    $minR2: Float!\n    $minSlope: Float!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      first: $first\n      after: $after\n      kind: $kind\n      minR2: $minR2\n      minSlope: $minSlope\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotV2DetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {\n    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"): (typeof documents)["\n  query isPnlSnapshotV2Initialized($dateStr: String!, $platform: Platform!) {\n    isPnlSnapshotV2Initialized(dateStr: $dateStr, platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    status\n    createdAt\n    updatedAt\n    mode\n  }\n"): (typeof documents)["\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    status\n    createdAt\n    updatedAt\n    mode\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    bot {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment MissionBackwardDetailsInfo on MissionBackwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    bot {\n      ...BotBackwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionForwardDetailsInfo on MissionForwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    tasks {\n      ...TaskForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment MissionForwardDetailsInfo on MissionForwardDetails {\n    id\n    botId\n    targetPositionKey\n    targetPositionBlockNumber\n    targetPositionLogIndex\n    achievePositionKey\n    achievePositionBlockNumber\n    achievePositionLogIndex\n    createdAt\n    updatedAt\n    status\n    mode\n    tasks {\n      ...TaskForwardDetailsInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n    leaderPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n    followerPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n    leaderPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n    followerPnl {\n      contractId\n      chainId\n      realizedPnl\n      realizedCount\n      openPositions {\n        openPrice\n        long\n        size\n        leverage\n        pairIndex\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanForwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlanBotGroups(\n    $planId: Int!\n    $page: Int!\n    $pageSize: Int!\n    $hideDead: Boolean!\n  ) {\n    getPlanBotGroups(\n      planId: $planId\n      page: $page\n      pageSize: $pageSize\n      hideDead: $hideDead\n    ) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getPlanBotGroups(\n    $planId: Int!\n    $page: Int!\n    $pageSize: Int!\n    $hideDead: Boolean!\n  ) {\n    getPlanBotGroups(\n      planId: $planId\n      page: $page\n      pageSize: $pageSize\n      hideDead: $hideDead\n    ) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment StrategyTemplateInfo on StrategyTemplate {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment StrategyTemplateInfo on StrategyTemplate {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StrategyTemplateWithStatsInfo on StrategyTemplateWithStats {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n    totalSearches\n    totalTasks\n  }\n"): (typeof documents)["\n  fragment StrategyTemplateWithStatsInfo on StrategyTemplateWithStats {\n    id\n    name\n    description\n    category\n    factoryConfig\n    isActive\n    createdAt\n    updatedAt\n    totalSearches\n    totalTasks\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StrategyTemplate($id: ID!) {\n    strategyTemplate(id: $id) {\n      ...StrategyTemplateInfo\n    }\n  }\n"): (typeof documents)["\n  query StrategyTemplate($id: ID!) {\n    strategyTemplate(id: $id) {\n      ...StrategyTemplateInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StrategyTemplates(\n    $category: StrategyCategory\n    $isActive: Boolean\n    $limit: Int\n    $offset: Int\n  ) {\n    strategyTemplates(\n      category: $category\n      isActive: $isActive\n      limit: $limit\n      offset: $offset\n    ) {\n      ...StrategyTemplateInfo\n    }\n  }\n"): (typeof documents)["\n  query StrategyTemplates(\n    $category: StrategyCategory\n    $isActive: Boolean\n    $limit: Int\n    $offset: Int\n  ) {\n    strategyTemplates(\n      category: $category\n      isActive: $isActive\n      limit: $limit\n      offset: $offset\n    ) {\n      ...StrategyTemplateInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StrategyTemplateWithStats($id: ID!) {\n    strategyTemplateWithStats(id: $id) {\n      ...StrategyTemplateWithStatsInfo\n    }\n  }\n"): (typeof documents)["\n  query StrategyTemplateWithStats($id: ID!) {\n    strategyTemplateWithStats(id: $id) {\n      ...StrategyTemplateWithStatsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStrategyTemplate($input: CreateStrategyTemplateInput!) {\n    createStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStrategyTemplate($input: CreateStrategyTemplateInput!) {\n    createStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStrategyTemplate($input: UpdateStrategyTemplateInput!) {\n    updateStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateStrategyTemplate($input: UpdateStrategyTemplateInput!) {\n    updateStrategyTemplate(input: $input) {\n      ...StrategyTemplateInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteStrategyTemplate($id: ID!) {\n    deleteStrategyTemplate(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteStrategyTemplate($id: ID!) {\n    deleteStrategyTemplate(id: $id)\n  }\n"];
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
export function graphql(source: "\n  mutation cleanDB {\n    cleanDB\n  }\n"): (typeof documents)["\n  mutation cleanDB {\n    cleanDB\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n"): (typeof documents)["\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment TemplateSearchInfo on TemplateSearch {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n"): (typeof documents)["\n  fragment TemplateSearchInfo on TemplateSearch {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TemplateSearchWithTemplateInfo on TemplateSearchWithTemplate {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n  }\n"): (typeof documents)["\n  fragment TemplateSearchWithTemplateInfo on TemplateSearchWithTemplate {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TemplateSearchWithTaskInfo on TemplateSearchWithTask {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n    task {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  fragment TemplateSearchWithTaskInfo on TemplateSearchWithTask {\n    id\n    name\n    templateId\n    symbol\n    startDate\n    endDate\n    interval\n    searchStrategy\n    status\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n    template {\n      ...StrategyTemplateInfo\n    }\n    task {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TemplateSearch($id: ID!) {\n    templateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n"): (typeof documents)["\n  query TemplateSearch($id: ID!) {\n    templateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TemplateSearchWithTask($id: ID!) {\n    templateSearchWithTask(id: $id) {\n      ...TemplateSearchWithTaskInfo\n    }\n  }\n"): (typeof documents)["\n  query TemplateSearchWithTask($id: ID!) {\n    templateSearchWithTask(id: $id) {\n      ...TemplateSearchWithTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TemplateSearches($filter: TemplateSearchFilterInput) {\n    templateSearches(filter: $filter) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n"): (typeof documents)["\n  query TemplateSearches($filter: TemplateSearchFilterInput) {\n    templateSearches(filter: $filter) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TemplateSearchStats {\n    templateSearchStats {\n      await\n      processing\n      done\n      failed\n      cancelled\n    }\n  }\n"): (typeof documents)["\n  query TemplateSearchStats {\n    templateSearchStats {\n      await\n      processing\n      done\n      failed\n      cancelled\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TaskByTemplateSearch($searchId: ID!) {\n    taskByTemplateSearch(searchId: $searchId) {\n      ...BacktestTaskInfo\n    }\n  }\n"): (typeof documents)["\n  query TaskByTemplateSearch($searchId: ID!) {\n    taskByTemplateSearch(searchId: $searchId) {\n      ...BacktestTaskInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTemplateSearch($input: CreateTemplateSearchInput!) {\n    createTemplateSearch(input: $input) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CreateTemplateSearch($input: CreateTemplateSearchInput!) {\n    createTemplateSearch(input: $input) {\n      ...TemplateSearchWithTemplateInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelTemplateSearch($id: ID!) {\n    cancelTemplateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CancelTemplateSearch($id: ID!) {\n    cancelTemplateSearch(id: $id) {\n      ...TemplateSearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteTemplateSearch($id: ID!) {\n    deleteTemplateSearch(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteTemplateSearch($id: ID!) {\n    deleteTemplateSearch(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription TemplateSearchUpdated {\n    templateSearchUpdated {\n      ...TemplateSearchInfo\n    }\n  }\n"): (typeof documents)["\n  subscription TemplateSearchUpdated {\n    templateSearchUpdated {\n      ...TemplateSearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TradingSignalLogInfo on TradingSignalLog {\n    id\n    address\n    platform\n    eventLogs {\n      ...PerpTradingEventLogInfo\n    }\n  }\n"): (typeof documents)["\n  fragment TradingSignalLogInfo on TradingSignalLog {\n    id\n    address\n    platform\n    eventLogs {\n      ...PerpTradingEventLogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTradingSignalLogs {\n    getTradingSignalLogs {\n      ...TradingSignalLogInfo\n    }\n  }\n"): (typeof documents)["\n  query getTradingSignalLogs {\n    getTradingSignalLogs {\n      ...TradingSignalLogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation registerTradingSignalLog($address: String!, $platform: Platform!) {\n    registerTradingSignalLog(address: $address, platform: $platform) {\n      ...TradingSignalLogInfo\n    }\n  }\n"): (typeof documents)["\n  mutation registerTradingSignalLog($address: String!, $platform: Platform!) {\n    registerTradingSignalLog(address: $address, platform: $platform) {\n      ...TradingSignalLogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation unregisterTradingSignalLog($signalId: Int!) {\n    unregisterTradingSignalLog(signalId: $signalId) {\n      ...TradingSignalLogInfo\n    }\n  }\n"): (typeof documents)["\n  mutation unregisterTradingSignalLog($signalId: Int!) {\n    unregisterTradingSignalLog(signalId: $signalId) {\n      ...TradingSignalLogInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation removeEventLogsFromTradingSignalLog(\n      $eventLogIds: [Int!]!\n      $signalId: Int!\n    ) {\n      removeEventLogsFromTradingSignalLog(\n        eventLogIds: $eventLogIds\n        signalId: $signalId\n      ) {\n        ...TradingSignalLogInfo\n      }\n    }\n  "): (typeof documents)["\n    mutation removeEventLogsFromTradingSignalLog(\n      $eventLogIds: [Int!]!\n      $signalId: Int!\n    ) {\n      removeEventLogsFromTradingSignalLog(\n        eventLogIds: $eventLogIds\n        signalId: $signalId\n      ) {\n        ...TradingSignalLogInfo\n      }\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription tradingSignalLogUpdated {\n    tradingSignalLogUpdated {\n      id\n      eventLogs {\n        ...PerpTradingEventLogInfo\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription tradingSignalLogUpdated {\n    tradingSignalLogUpdated {\n      id\n      eventLogs {\n        ...PerpTradingEventLogInfo\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment ValidationPipelineInfo on ValidationPipeline {\n    id\n    name\n    backtestTaskId\n    status\n    currentStep\n    paretoConfig\n    wfaConfig\n    robustnessConfig\n    wfaCompletedWindows\n    robustnessCompletedSteps\n    totalCandidates\n    passedThreshold\n    paretoOptimal\n    passedWfa\n    userSelected\n    passedRobustness\n    finalApproved\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n"): (typeof documents)["\n  fragment ValidationPipelineInfo on ValidationPipeline {\n    id\n    name\n    backtestTaskId\n    status\n    currentStep\n    paretoConfig\n    wfaConfig\n    robustnessConfig\n    wfaCompletedWindows\n    robustnessCompletedSteps\n    totalCandidates\n    passedThreshold\n    paretoOptimal\n    passedWfa\n    userSelected\n    passedRobustness\n    finalApproved\n    createdAt\n    startedAt\n    completedAt\n    errorMessage\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ValidationCandidateInfo on ValidationCandidate {\n    id\n    pipelineId\n    resultId\n    configId\n    status\n    thresholdPassed\n    paretoRank\n    dominatedBy\n    wfaConsistency\n    wfaPassed\n    wfaWindowResults\n    userSelectedAt\n    userNotes\n    robustnessScore\n    robustnessPassed\n    robustnessStepResults\n    finalApprovedAt\n    finalNotes\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment ValidationCandidateInfo on ValidationCandidate {\n    id\n    pipelineId\n    resultId\n    configId\n    status\n    thresholdPassed\n    paretoRank\n    dominatedBy\n    wfaConsistency\n    wfaPassed\n    wfaWindowResults\n    userSelectedAt\n    userNotes\n    robustnessScore\n    robustnessPassed\n    robustnessStepResults\n    finalApprovedAt\n    finalNotes\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BacktestResultSummary on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    strategyConfig\n  }\n"): (typeof documents)["\n  fragment BacktestResultSummary on BacktestResult {\n    id\n    taskId\n    configId\n    runDate\n    totalTrades\n    winningTrades\n    losingTrades\n    winRate\n    totalPnlUsdt\n    totalPnlPercent\n    maxDrawdownUsdt\n    maxDrawdownPercent\n    sharpeRatio\n    profitFactor\n    strategyConfig\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidationPipelines($filter: ValidationPipelineFilterInput) {\n    validationPipelines(filter: $filter) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  query ValidationPipelines($filter: ValidationPipelineFilterInput) {\n    validationPipelines(filter: $filter) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidationPipeline($id: ID!) {\n    validationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  query ValidationPipeline($id: ID!) {\n    validationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidationPipelineWithCandidates($id: ID!) {\n    validationPipelineWithCandidates(id: $id) {\n      id\n      name\n      backtestTaskId\n      status\n      currentStep\n      paretoConfig\n      wfaConfig\n      robustnessConfig\n      wfaCompletedWindows\n      robustnessCompletedSteps\n      totalCandidates\n      passedThreshold\n      paretoOptimal\n      passedWfa\n      userSelected\n      passedRobustness\n      finalApproved\n      createdAt\n      startedAt\n      completedAt\n      errorMessage\n      candidates {\n        ...ValidationCandidateInfo\n      }\n    }\n  }\n"): (typeof documents)["\n  query ValidationPipelineWithCandidates($id: ID!) {\n    validationPipelineWithCandidates(id: $id) {\n      id\n      name\n      backtestTaskId\n      status\n      currentStep\n      paretoConfig\n      wfaConfig\n      robustnessConfig\n      wfaCompletedWindows\n      robustnessCompletedSteps\n      totalCandidates\n      passedThreshold\n      paretoOptimal\n      passedWfa\n      userSelected\n      passedRobustness\n      finalApproved\n      createdAt\n      startedAt\n      completedAt\n      errorMessage\n      candidates {\n        ...ValidationCandidateInfo\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidationCandidatesByStatus($filter: ValidationCandidateFilterInput!) {\n    validationCandidatesByStatus(filter: $filter) {\n      totalCount\n      candidates {\n        id\n        pipelineId\n        resultId\n        configId\n        status\n        thresholdPassed\n        paretoRank\n        dominatedBy\n        wfaConsistency\n        wfaPassed\n        wfaWindowResults\n        userSelectedAt\n        userNotes\n        robustnessScore\n        robustnessPassed\n        robustnessStepResults\n        finalApprovedAt\n        finalNotes\n        createdAt\n        updatedAt\n        result {\n          ...BacktestResultSummary\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ValidationCandidatesByStatus($filter: ValidationCandidateFilterInput!) {\n    validationCandidatesByStatus(filter: $filter) {\n      totalCount\n      candidates {\n        id\n        pipelineId\n        resultId\n        configId\n        status\n        thresholdPassed\n        paretoRank\n        dominatedBy\n        wfaConsistency\n        wfaPassed\n        wfaWindowResults\n        userSelectedAt\n        userNotes\n        robustnessScore\n        robustnessPassed\n        robustnessStepResults\n        finalApprovedAt\n        finalNotes\n        createdAt\n        updatedAt\n        result {\n          ...BacktestResultSummary\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidationCandidate($id: ID!) {\n    validationCandidate(id: $id) {\n      id\n      pipelineId\n      resultId\n      configId\n      status\n      thresholdPassed\n      paretoRank\n      dominatedBy\n      wfaConsistency\n      wfaPassed\n      wfaWindowResults\n      userSelectedAt\n      userNotes\n      robustnessScore\n      robustnessPassed\n      robustnessStepResults\n      finalApprovedAt\n      finalNotes\n      createdAt\n      updatedAt\n      result {\n        ...BacktestResultSummary\n      }\n    }\n  }\n"): (typeof documents)["\n  query ValidationCandidate($id: ID!) {\n    validationCandidate(id: $id) {\n      id\n      pipelineId\n      resultId\n      configId\n      status\n      thresholdPassed\n      paretoRank\n      dominatedBy\n      wfaConsistency\n      wfaPassed\n      wfaWindowResults\n      userSelectedAt\n      userNotes\n      robustnessScore\n      robustnessPassed\n      robustnessStepResults\n      finalApprovedAt\n      finalNotes\n      createdAt\n      updatedAt\n      result {\n        ...BacktestResultSummary\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ValidationPipelineStats {\n    validationPipelineStats {\n      created\n      inProgress\n      awaitingUser\n      completed\n      failed\n      cancelled\n    }\n  }\n"): (typeof documents)["\n  query ValidationPipelineStats {\n    validationPipelineStats {\n      created\n      inProgress\n      awaitingUser\n      completed\n      failed\n      cancelled\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ThresholdSteps($pipelineId: ID!) {\n    thresholdSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metricName\n      operator\n      value\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query ThresholdSteps($pipelineId: ID!) {\n    thresholdSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metricName\n      operator\n      value\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ParetoSteps($pipelineId: ID!) {\n    paretoSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metrics\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query ParetoSteps($pipelineId: ID!) {\n    paretoSteps(pipelineId: $pipelineId) {\n      id\n      pipelineId\n      stepOrder\n      metrics\n      candidatesBefore\n      candidatesAfter\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateValidationPipeline($input: CreateValidationPipelineInput!) {\n    createValidationPipeline(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CreateValidationPipeline($input: CreateValidationPipelineInput!) {\n    createValidationPipeline(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ApplyThresholdStep($input: ApplyThresholdStepInput!) {\n    applyThresholdStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation ApplyThresholdStep($input: ApplyThresholdStepInput!) {\n    applyThresholdStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PreviewThresholdStep($input: PreviewThresholdStepInput!) {\n    previewThresholdStep(input: $input) {\n      currentCount\n      survivingCount\n      eliminatedCount\n    }\n  }\n"): (typeof documents)["\n  mutation PreviewThresholdStep($input: PreviewThresholdStepInput!) {\n    previewThresholdStep(input: $input) {\n      currentCount\n      survivingCount\n      eliminatedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveThresholdStep($pipelineId: ID!, $stepId: ID!) {\n    removeThresholdStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveThresholdStep($pipelineId: ID!, $stepId: ID!) {\n    removeThresholdStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CompleteThresholdStep($pipelineId: ID!) {\n    completeThresholdStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteThresholdStep($pipelineId: ID!) {\n    completeThresholdStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PreviewParetoStep($input: PreviewParetoStepInput!) {\n    previewParetoStep(input: $input) {\n      currentCount\n      optimalCount\n      dominatedCount\n    }\n  }\n"): (typeof documents)["\n  mutation PreviewParetoStep($input: PreviewParetoStepInput!) {\n    previewParetoStep(input: $input) {\n      currentCount\n      optimalCount\n      dominatedCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ApplyParetoStep($input: ApplyParetoStepInput!) {\n    applyParetoStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation ApplyParetoStep($input: ApplyParetoStepInput!) {\n    applyParetoStep(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveParetoStep($pipelineId: ID!, $stepId: ID!) {\n    removeParetoStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveParetoStep($pipelineId: ID!, $stepId: ID!) {\n    removeParetoStep(pipelineId: $pipelineId, stepId: $stepId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CompleteParetoStep($pipelineId: ID!) {\n    completeParetoStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteParetoStep($pipelineId: ID!) {\n    completeParetoStep(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation StartWfa($input: StartWfaInput!) {\n    startWfa(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation StartWfa($input: StartWfaInput!) {\n    startWfa(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation PauseWfa($pipelineId: ID!) {\n    pauseWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation PauseWfa($pipelineId: ID!) {\n    pauseWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ResumeWfa($pipelineId: ID!) {\n    resumeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation ResumeWfa($pipelineId: ID!) {\n    resumeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CompleteWfa($pipelineId: ID!) {\n    completeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteWfa($pipelineId: ID!) {\n    completeWfa(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {\n    submitUserSelection(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation SubmitUserSelection($pipelineId: ID!, $input: UserSelectionInput!) {\n    submitUserSelection(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ConfigureRobustness($input: ConfigureRobustnessInput!) {\n    configureRobustness(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation ConfigureRobustness($input: ConfigureRobustnessInput!) {\n    configureRobustness(input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RunRobustnessStep($input: RunRobustnessStepInput!) {\n    runRobustnessStep(input: $input) {\n      candidateId\n      configId\n      stepIndex\n      sharpeRatio\n      totalPnl\n      maxDrawdown\n      status\n      errorMessage\n    }\n  }\n"): (typeof documents)["\n  mutation RunRobustnessStep($input: RunRobustnessStepInput!) {\n    runRobustnessStep(input: $input) {\n      candidateId\n      configId\n      stepIndex\n      sharpeRatio\n      totalPnl\n      maxDrawdown\n      status\n      errorMessage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CompleteRobustness($pipelineId: ID!) {\n    completeRobustness(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteRobustness($pipelineId: ID!) {\n    completeRobustness(pipelineId: $pipelineId) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SubmitFinalApproval($pipelineId: ID!, $input: FinalApprovalInput!) {\n    submitFinalApproval(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation SubmitFinalApproval($pipelineId: ID!, $input: FinalApprovalInput!) {\n    submitFinalApproval(pipelineId: $pipelineId, input: $input) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelValidationPipeline($id: ID!) {\n    cancelValidationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  mutation CancelValidationPipeline($id: ID!) {\n    cancelValidationPipeline(id: $id) {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteValidationPipeline($id: ID!) {\n    deleteValidationPipeline(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteValidationPipeline($id: ID!) {\n    deleteValidationPipeline(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ValidationPipelineUpdated {\n    validationPipelineUpdated {\n      ...ValidationPipelineInfo\n    }\n  }\n"): (typeof documents)["\n  subscription ValidationPipelineUpdated {\n    validationPipelineUpdated {\n      ...ValidationPipelineInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription ValidationCandidateUpdated {\n    validationCandidateUpdated {\n      ...ValidationCandidateInfo\n    }\n  }\n"): (typeof documents)["\n  subscription ValidationCandidateUpdated {\n    validationCandidateUpdated {\n      ...ValidationCandidateInfo\n    }\n  }\n"];
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