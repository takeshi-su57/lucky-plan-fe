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
    "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n": typeof types.BotDetailsInfoFragmentDoc,
    "\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n": typeof types.BotForwardDetailsInfoFragmentDoc,
    "\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n": typeof types.BotBackwardDetailsInfoFragmentDoc,
    "\n  query getBotsByStatus($status: BotStatus!, $first: Int!, $after: Int) {\n    getBotsByStatus(status: $status, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...BotForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetBotsByStatusDocument,
    "\n  query getActiveBots {\n    getActiveBots {\n      ...BotForwardDetailsInfo\n    }\n  }\n": typeof types.GetActiveBotsDocument,
    "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.CreateBotDocument,
    "\n  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {\n    batchCreateBots(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.BatchCreateBotsDocument,
    "\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.DeleteBotDocument,
    "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id)\n  }\n": typeof types.LiveBotDocument,
    "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id)\n  }\n": typeof types.StopBotDocument,
    "\n  subscription botCreated($userId: String!) {\n    botCreated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.BotCreatedDocument,
    "\n  subscription botUpdated($userId: String!) {\n    botUpdated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": typeof types.BotUpdatedDocument,
    "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n": typeof types.ContractInfoFragmentDoc,
    "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n": typeof types.GetAllContractsDocument,
    "\n  query getAdaptionStatus {\n    getAdaptionStatus\n  }\n": typeof types.GetAdaptionStatusDocument,
    "\n  mutation disableContract($contractId: Int!) {\n    disableContract(contractId: $contractId) {\n      ...ContractInfo\n    }\n  }\n": typeof types.DisableContractDocument,
    "\n  mutation liveContract($contractId: Int!, $fromBlock: Int) {\n    liveContract(contractId: $contractId, fromBlock: $fromBlock) {\n      ...ContractInfo\n    }\n  }\n": typeof types.LiveContractDocument,
    "\n  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {\n    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)\n  }\n": typeof types.StartAdaptionDocument,
    "\n  fragment FollowerInfo on Follower {\n    userId\n    address\n    accountIndex\n    publicKey\n  }\n": typeof types.FollowerInfoFragmentDoc,
    "\n  fragment FollowerTradeInfo on FollowerTrade {\n    address\n    index\n    mission {\n      ...MissionForwardDetailsInfo\n    }\n    params\n  }\n": typeof types.FollowerTradeInfoFragmentDoc,
    "\n  fragment FollowerPendingOrderInfo on FollowerPendingOrder {\n    params\n    address\n    index\n  }\n": typeof types.FollowerPendingOrderInfoFragmentDoc,
    "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      accUSDPnl\n      address\n      dateStr\n      platform\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n": typeof types.FollowerDetailInfoFragmentDoc,
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
    "\n  fragment PerpTradeHistoryInfo on PerpTradeHistory {\n    id\n    address\n    collateralDeltaUsd\n    collateralInUsd\n    isLong\n    leverage\n    leverageDelta\n    operation\n    pair\n    positionKey\n    price\n    sizeDeltaUsd\n    sizeInUsd\n    usdPnl\n    usdBasePnl\n    usdFee\n    date\n    contractId\n    chainId\n    platform\n    collateralUsdPrice\n  }\n": typeof types.PerpTradeHistoryInfoFragmentDoc,
    "\n  fragment PerpTradePositionInfo on PerpTradePosition {\n    histories {\n      ...PerpTradeHistoryInfo\n    }\n  }\n": typeof types.PerpTradePositionInfoFragmentDoc,
    "\n    fragment PerpTradePositionsWithSummaryInfo on PerpTradePositionsWithSummary {\n      positions {\n        ...PerpTradePositionInfo\n      }\n      avgCollateral\n      avgDuration\n      avgLeverage\n      avgNegativePnl\n      avgPnl\n      avgPnlPercentageByCollateral\n      avgPnlPercentageBySize\n      avgPositivePnl\n      avgSize\n      maxDuration\n      openedPositions\n      totalPnl\n      totalPositions\n    }\n  ": typeof types.PerpTradePositionsWithSummaryInfoFragmentDoc,
    "\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    positionsWithSummary {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n    platform\n  }\n": typeof types.PnlSnapshotV2DetailsInfoFragmentDoc,
    "\n  query getPerpTradePositions(\n    $address: String!\n    $platform: Platform!\n    $maxLeverage: Float\n    $startedAt: Date\n    $stoppedAt: Date\n    $endedAt: Date\n  ) {\n    getPerpTradePositions(\n      address: $address\n      platform: $platform\n      maxLeverage: $maxLeverage\n      startedAt: $startedAt\n      stoppedAt: $stoppedAt\n      endedAt: $endedAt\n    ) {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n  }\n": typeof types.GetPerpTradePositionsDocument,
    "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": typeof types.GetPnlSnapshotV2InitializedFlagDocument,
    "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $isDesc: Boolean!\n    $maxLeverage: Float\n    $page: Int!\n    $pageSize: Int!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      isDesc: $isDesc\n      maxLeverage: $maxLeverage\n      page: $page\n      pageSize: $pageSize\n    ) {\n      items {\n        ...PnlSnapshotV2DetailsInfo\n      }\n      total\n      totalPages\n      currentPage\n    }\n  }\n": typeof types.GetPnlSnapshotsV2Document,
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
    "\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n  }\n": typeof types.PlanSummaryInfoFragmentDoc,
    "\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetPlanSummariesByStatusDocument,
    "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanInfo\n    }\n  }\n": typeof types.GetPlanByIdDocument,
    "\n  query getPlanBotGroups($planId: Int!, $page: Int!, $pageSize: Int!) {\n    getPlanBotGroups(planId: $planId, page: $page, pageSize: $pageSize) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n": typeof types.GetPlanBotGroupsDocument,
    "\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n": typeof types.CreatePlanDocument,
    "\n  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {\n    updatePlan(updatePlanInput: $updatePlanInput) {\n      ...PlanInfo\n    }\n  }\n": typeof types.UpdatePlanDocument,
    "\n  mutation deletePlan($id: Int!) {\n    deletePlan(id: $id)\n  }\n": typeof types.DeletePlanDocument,
    "\n  mutation startPlan($id: Int!) {\n    startPlan(id: $id)\n  }\n": typeof types.StartPlanDocument,
    "\n  mutation endPlan($id: Int!) {\n    endPlan(id: $id)\n  }\n": typeof types.EndPlanDocument,
    "\n  subscription planCreated($userId: String!) {\n    planCreated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": typeof types.PlanCreatedDocument,
    "\n  subscription planUpdated($userId: String!) {\n    planUpdated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": typeof types.PlanUpdatedDocument,
    "\n  fragment SimulationBotInfo on SimulationBot {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    minLeverage\n    maxLeverage\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n  }\n": typeof types.SimulationBotInfoFragmentDoc,
    "\n  fragment SimulationPlanInfo on SimulationPlan {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotInfo\n    }\n  }\n": typeof types.SimulationPlanInfoFragmentDoc,
    "\n  fragment SimulationInfo on Simulation {\n    completedPlans\n    createdAt\n    cursor\n    days\n    description\n    direction\n    endAt\n    error\n    gapDays\n    id\n    maxDrawdownUsd\n    collateral {\n      max\n      min\n    }\n    leverage {\n      max\n      min\n    }\n    platform\n    profitFactor\n    progressMessage\n    progressPercent\n    progressPhase\n    r2 {\n      max\n      min\n    }\n    researchId\n    score {\n      max\n      min\n    }\n    scoreFormular\n    selectedLeaderCount\n    sizingFormular\n    slope {\n      max\n      min\n    }\n    standardCollateralUsd\n    startAt\n    status\n    title\n    totalCostUsd\n    totalFollowerPnl\n    totalLeaderPnl\n    totalNetPnlUsd\n    totalSimulationPlans\n    tradeCount\n    trade {\n      max\n      min\n    }\n    updatedAt\n    winRate\n  }\n": typeof types.SimulationInfoFragmentDoc,
    "\n  fragment SimulationResearchInfo on SimulationResearch {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n  }\n": typeof types.SimulationResearchInfoFragmentDoc,
    "\n  fragment SimulationResearchDetailsInfo on SimulationResearchDetails {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n    simulations {\n      ...SimulationInfo\n    }\n  }\n": typeof types.SimulationResearchDetailsInfoFragmentDoc,
    "\n  fragment SimulationTradeHistoryInfo on SimulationTradeHistory {\n    follower {\n      ...PerpTradeHistoryInfo\n    }\n    leader {\n      ...PerpTradeHistoryInfo\n    }\n  }\n": typeof types.SimulationTradeHistoryInfoFragmentDoc,
    "\n  fragment SimulationTradePositionInfo on SimulationTradePosition {\n    histories {\n      ...SimulationTradeHistoryInfo\n    }\n    followerPnl\n    leaderPnl\n  }\n": typeof types.SimulationTradePositionInfoFragmentDoc,
    "\n  fragment SimulationBotDetailsInfo on SimulationBotDetails {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n    minLeverage\n    maxLeverage\n    cacheState {\n      completed\n      lastError\n      lastFetchedAt\n      rebuildRequested\n      rebuilding\n    }\n    positions {\n      ...SimulationTradePositionInfo\n    }\n  }\n": typeof types.SimulationBotDetailsInfoFragmentDoc,
    "\n  fragment SimulationPlanDetailsInfo on SimulationPlanDetails {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotDetailsInfo\n    }\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n  }\n": typeof types.SimulationPlanDetailsInfoFragmentDoc,
    "\n  query getSimulationPlans($after: Int, $first: Int!) {\n    getSimulationPlans(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationPlanInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.GetSimulationPlansDocument,
    "\n  query simulations($after: Int, $first: Int!) {\n    simulations(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.SimulationsDocument,
    "\n  query simulationResearches($after: Int, $first: Int!) {\n    simulationResearches(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationResearchInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.SimulationResearchesDocument,
    "\n  query simulation($id: Int!) {\n    simulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n": typeof types.SimulationDocument,
    "\n  query simulationResearch($id: Int!) {\n    simulationResearch(id: $id) {\n      ...SimulationResearchDetailsInfo\n    }\n  }\n": typeof types.SimulationResearchDocument,
    "\n  query simulationsByResearch($researchId: Int!) {\n    simulationsByResearch(researchId: $researchId) {\n      ...SimulationInfo\n    }\n  }\n": typeof types.SimulationsByResearchDocument,
    "\n  query simulationPlansBySimulation($simulationId: Int!) {\n    simulationPlansBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanInfo\n    }\n  }\n": typeof types.SimulationPlansBySimulationDocument,
    "\n  query simulationPlanDetailsBySimulation($simulationId: Int!) {\n    simulationPlanDetailsBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n": typeof types.SimulationPlanDetailsBySimulationDocument,
    "\n  query getSimulationPlanById($id: Int!) {\n    getSimulationPlanById(id: $id) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n": typeof types.GetSimulationPlanByIdDocument,
    "\n  mutation createSimulationPlan($input: CreateSimulationPlanInput!) {\n    createSimulationPlan(input: $input) {\n      ...SimulationPlanInfo\n    }\n  }\n": typeof types.CreateSimulationPlanDocument,
    "\n  mutation createSimulationResearch($input: CreateSimulationResearchInput!) {\n    createSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n": typeof types.CreateSimulationResearchDocument,
    "\n  mutation updateSimulationResearch($input: UpdateSimulationResearchInput!) {\n    updateSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n": typeof types.UpdateSimulationResearchDocument,
    "\n  mutation updateSimulationBot($input: UpdateSimulationBotInput!) {\n    updateSimulationBot(input: $input) {\n      ...SimulationBotInfo\n    }\n  }\n": typeof types.UpdateSimulationBotDocument,
    "\n  mutation batchCreateSimulationBots($inputs: [CreateSimulationBotInput!]!) {\n    batchCreateSimulationBots(inputs: $inputs) {\n      ...SimulationBotInfo\n    }\n  }\n": typeof types.BatchCreateSimulationBotsDocument,
    "\n  mutation playSimulationPlan($id: Int!) {\n    playSimulationPlan(id: $id) {\n      ...SimulationPlanInfo\n    }\n  }\n": typeof types.PlaySimulationPlanDocument,
    "\n  mutation cancelSimulation($id: Int!) {\n    cancelSimulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n": typeof types.CancelSimulationDocument,
    "\n  mutation playAutoResearch($id: Int!) {\n    playAutoResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n": typeof types.PlayAutoResearchDocument,
    "\n  mutation pauseResearch($id: Int!) {\n    pauseResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n": typeof types.PauseResearchDocument,
    "\n  mutation cancelResearch($id: Int!) {\n    cancelResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n": typeof types.CancelResearchDocument,
    "\n  mutation deleteSimulation($id: Int!) {\n    deleteSimulation(id: $id)\n  }\n": typeof types.DeleteSimulationDocument,
    "\n  mutation deleteSimulationResearch($id: Int!) {\n    deleteSimulationResearch(id: $id)\n  }\n": typeof types.DeleteSimulationResearchDocument,
    "\n  mutation deleteSimulationPlan($id: Int!) {\n    deleteSimulationPlan(id: $id)\n  }\n": typeof types.DeleteSimulationPlanDocument,
    "\n  mutation deleteSimulationBot($id: Int!) {\n    deleteSimulationBot(id: $id)\n  }\n": typeof types.DeleteSimulationBotDocument,
    "\n  mutation stopSimulationBot($id: Int!) {\n    stopSimulationBot(id: $id) {\n      ...SimulationBotInfo\n    }\n  }\n": typeof types.StopSimulationBotDocument,
    "\n  subscription simulationResearchUpdated {\n    simulationResearchUpdated {\n      ...SimulationResearchInfo\n    }\n  }\n": typeof types.SimulationResearchUpdatedDocument,
    "\n  subscription simulationUpdated {\n    simulationUpdated {\n      ...SimulationInfo\n    }\n  }\n": typeof types.SimulationUpdatedDocument,
    "\n  subscription simulationPlanUpdated {\n    simulationPlanUpdated {\n      ...SimulationPlanInfo\n    }\n  }\n": typeof types.SimulationPlanUpdatedDocument,
    "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    tpPercentage\n    slPercentage\n    maxOpenMissions\n    selectedPairs\n    mode\n    ratio\n  }\n": typeof types.StrategyInfoFragmentDoc,
    "\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n": typeof types.GetAllStrategyDocument,
    "\n  mutation updateStrategy($id: Int!, $input: UpdateStrategyInput!) {\n    updateStrategy(id: $id, input: $input) {\n      ...StrategyInfo\n    }\n  }\n": typeof types.UpdateStrategyDocument,
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
    "\n  fragment ActionInfo on Action {\n    address\n    args\n    blockHash\n    blockNumber\n    contractId\n    createdAt\n    dedupeKey\n    id\n    name\n    orderInBlock\n    origin\n    positionKey\n    status\n    txHash\n  }\n": typeof types.ActionInfoFragmentDoc,
    "\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n": typeof types.FollowerActionDetailsInfoFragmentDoc,
    "\n  fragment TaskForwardDetailsInfo on TaskForwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n": typeof types.TaskForwardDetailsInfoFragmentDoc,
    "\n  fragment TaskBackwardDetailsInfo on TaskBackwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n    mission {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": typeof types.TaskBackwardDetailsInfoFragmentDoc,
    "\n  query getAlertTasks {\n    getAlertTasks {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": typeof types.GetAlertTasksDocument,
    "\n  mutation stopTask($id: Int!) {\n    stopTask(id: $id)\n  }\n": typeof types.StopTaskDocument,
    "\n  subscription taskCreated($userId: String!) {\n    taskCreated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": typeof types.TaskCreatedDocument,
    "\n  subscription taskUpdated($userId: String!) {\n    taskUpdated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": typeof types.TaskUpdatedDocument,
    "\n  query getAllUsers {\n    getAllUsers {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": typeof types.GetAllUsersDocument,
    "\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n": typeof types.GetTokenDocument,
    "\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": typeof types.ChangeUserPermissionDocument,
    "\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": typeof types.AllowAutoDocument,
};
const documents: Documents = {
    "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n": types.BotDetailsInfoFragmentDoc,
    "\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n": types.BotForwardDetailsInfoFragmentDoc,
    "\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n": types.BotBackwardDetailsInfoFragmentDoc,
    "\n  query getBotsByStatus($status: BotStatus!, $first: Int!, $after: Int) {\n    getBotsByStatus(status: $status, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          ...BotForwardDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetBotsByStatusDocument,
    "\n  query getActiveBots {\n    getActiveBots {\n      ...BotForwardDetailsInfo\n    }\n  }\n": types.GetActiveBotsDocument,
    "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.CreateBotDocument,
    "\n  mutation batchCreateBots($input: [CreateBotAndStrategyInput!]!) {\n    batchCreateBots(input: $input) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.BatchCreateBotsDocument,
    "\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.DeleteBotDocument,
    "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id)\n  }\n": types.LiveBotDocument,
    "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id)\n  }\n": types.StopBotDocument,
    "\n  subscription botCreated($userId: String!) {\n    botCreated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.BotCreatedDocument,
    "\n  subscription botUpdated($userId: String!) {\n    botUpdated(userId: $userId) {\n      ...BotBackwardDetailsInfo\n    }\n  }\n": types.BotUpdatedDocument,
    "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n": types.ContractInfoFragmentDoc,
    "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n": types.GetAllContractsDocument,
    "\n  query getAdaptionStatus {\n    getAdaptionStatus\n  }\n": types.GetAdaptionStatusDocument,
    "\n  mutation disableContract($contractId: Int!) {\n    disableContract(contractId: $contractId) {\n      ...ContractInfo\n    }\n  }\n": types.DisableContractDocument,
    "\n  mutation liveContract($contractId: Int!, $fromBlock: Int) {\n    liveContract(contractId: $contractId, fromBlock: $fromBlock) {\n      ...ContractInfo\n    }\n  }\n": types.LiveContractDocument,
    "\n  mutation startAdaption($contractId: Int!, $shouldRestart: Boolean!) {\n    startAdaption(contractId: $contractId, shouldRestart: $shouldRestart)\n  }\n": types.StartAdaptionDocument,
    "\n  fragment FollowerInfo on Follower {\n    userId\n    address\n    accountIndex\n    publicKey\n  }\n": types.FollowerInfoFragmentDoc,
    "\n  fragment FollowerTradeInfo on FollowerTrade {\n    address\n    index\n    mission {\n      ...MissionForwardDetailsInfo\n    }\n    params\n  }\n": types.FollowerTradeInfoFragmentDoc,
    "\n  fragment FollowerPendingOrderInfo on FollowerPendingOrder {\n    params\n    address\n    index\n  }\n": types.FollowerPendingOrderInfoFragmentDoc,
    "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      accUSDPnl\n      address\n      dateStr\n      platform\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n": types.FollowerDetailInfoFragmentDoc,
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
    "\n  fragment PerpTradeHistoryInfo on PerpTradeHistory {\n    id\n    address\n    collateralDeltaUsd\n    collateralInUsd\n    isLong\n    leverage\n    leverageDelta\n    operation\n    pair\n    positionKey\n    price\n    sizeDeltaUsd\n    sizeInUsd\n    usdPnl\n    usdBasePnl\n    usdFee\n    date\n    contractId\n    chainId\n    platform\n    collateralUsdPrice\n  }\n": types.PerpTradeHistoryInfoFragmentDoc,
    "\n  fragment PerpTradePositionInfo on PerpTradePosition {\n    histories {\n      ...PerpTradeHistoryInfo\n    }\n  }\n": types.PerpTradePositionInfoFragmentDoc,
    "\n    fragment PerpTradePositionsWithSummaryInfo on PerpTradePositionsWithSummary {\n      positions {\n        ...PerpTradePositionInfo\n      }\n      avgCollateral\n      avgDuration\n      avgLeverage\n      avgNegativePnl\n      avgPnl\n      avgPnlPercentageByCollateral\n      avgPnlPercentageBySize\n      avgPositivePnl\n      avgSize\n      maxDuration\n      openedPositions\n      totalPnl\n      totalPositions\n    }\n  ": types.PerpTradePositionsWithSummaryInfoFragmentDoc,
    "\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    positionsWithSummary {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n    platform\n  }\n": types.PnlSnapshotV2DetailsInfoFragmentDoc,
    "\n  query getPerpTradePositions(\n    $address: String!\n    $platform: Platform!\n    $maxLeverage: Float\n    $startedAt: Date\n    $stoppedAt: Date\n    $endedAt: Date\n  ) {\n    getPerpTradePositions(\n      address: $address\n      platform: $platform\n      maxLeverage: $maxLeverage\n      startedAt: $startedAt\n      stoppedAt: $stoppedAt\n      endedAt: $endedAt\n    ) {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n  }\n": types.GetPerpTradePositionsDocument,
    "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n": types.GetPnlSnapshotV2InitializedFlagDocument,
    "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $isDesc: Boolean!\n    $maxLeverage: Float\n    $page: Int!\n    $pageSize: Int!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      isDesc: $isDesc\n      maxLeverage: $maxLeverage\n      page: $page\n      pageSize: $pageSize\n    ) {\n      items {\n        ...PnlSnapshotV2DetailsInfo\n      }\n      total\n      totalPages\n      currentPage\n    }\n  }\n": types.GetPnlSnapshotsV2Document,
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
    "\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n  }\n": types.PlanSummaryInfoFragmentDoc,
    "\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetPlanSummariesByStatusDocument,
    "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanInfo\n    }\n  }\n": types.GetPlanByIdDocument,
    "\n  query getPlanBotGroups($planId: Int!, $page: Int!, $pageSize: Int!) {\n    getPlanBotGroups(planId: $planId, page: $page, pageSize: $pageSize) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n": types.GetPlanBotGroupsDocument,
    "\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n": types.CreatePlanDocument,
    "\n  mutation updatePlan($updatePlanInput: UpdatePlanInput!) {\n    updatePlan(updatePlanInput: $updatePlanInput) {\n      ...PlanInfo\n    }\n  }\n": types.UpdatePlanDocument,
    "\n  mutation deletePlan($id: Int!) {\n    deletePlan(id: $id)\n  }\n": types.DeletePlanDocument,
    "\n  mutation startPlan($id: Int!) {\n    startPlan(id: $id)\n  }\n": types.StartPlanDocument,
    "\n  mutation endPlan($id: Int!) {\n    endPlan(id: $id)\n  }\n": types.EndPlanDocument,
    "\n  subscription planCreated($userId: String!) {\n    planCreated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": types.PlanCreatedDocument,
    "\n  subscription planUpdated($userId: String!) {\n    planUpdated(userId: $userId) {\n      ...PlanInfo\n    }\n  }\n": types.PlanUpdatedDocument,
    "\n  fragment SimulationBotInfo on SimulationBot {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    minLeverage\n    maxLeverage\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n  }\n": types.SimulationBotInfoFragmentDoc,
    "\n  fragment SimulationPlanInfo on SimulationPlan {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotInfo\n    }\n  }\n": types.SimulationPlanInfoFragmentDoc,
    "\n  fragment SimulationInfo on Simulation {\n    completedPlans\n    createdAt\n    cursor\n    days\n    description\n    direction\n    endAt\n    error\n    gapDays\n    id\n    maxDrawdownUsd\n    collateral {\n      max\n      min\n    }\n    leverage {\n      max\n      min\n    }\n    platform\n    profitFactor\n    progressMessage\n    progressPercent\n    progressPhase\n    r2 {\n      max\n      min\n    }\n    researchId\n    score {\n      max\n      min\n    }\n    scoreFormular\n    selectedLeaderCount\n    sizingFormular\n    slope {\n      max\n      min\n    }\n    standardCollateralUsd\n    startAt\n    status\n    title\n    totalCostUsd\n    totalFollowerPnl\n    totalLeaderPnl\n    totalNetPnlUsd\n    totalSimulationPlans\n    tradeCount\n    trade {\n      max\n      min\n    }\n    updatedAt\n    winRate\n  }\n": types.SimulationInfoFragmentDoc,
    "\n  fragment SimulationResearchInfo on SimulationResearch {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n  }\n": types.SimulationResearchInfoFragmentDoc,
    "\n  fragment SimulationResearchDetailsInfo on SimulationResearchDetails {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n    simulations {\n      ...SimulationInfo\n    }\n  }\n": types.SimulationResearchDetailsInfoFragmentDoc,
    "\n  fragment SimulationTradeHistoryInfo on SimulationTradeHistory {\n    follower {\n      ...PerpTradeHistoryInfo\n    }\n    leader {\n      ...PerpTradeHistoryInfo\n    }\n  }\n": types.SimulationTradeHistoryInfoFragmentDoc,
    "\n  fragment SimulationTradePositionInfo on SimulationTradePosition {\n    histories {\n      ...SimulationTradeHistoryInfo\n    }\n    followerPnl\n    leaderPnl\n  }\n": types.SimulationTradePositionInfoFragmentDoc,
    "\n  fragment SimulationBotDetailsInfo on SimulationBotDetails {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n    minLeverage\n    maxLeverage\n    cacheState {\n      completed\n      lastError\n      lastFetchedAt\n      rebuildRequested\n      rebuilding\n    }\n    positions {\n      ...SimulationTradePositionInfo\n    }\n  }\n": types.SimulationBotDetailsInfoFragmentDoc,
    "\n  fragment SimulationPlanDetailsInfo on SimulationPlanDetails {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotDetailsInfo\n    }\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n  }\n": types.SimulationPlanDetailsInfoFragmentDoc,
    "\n  query getSimulationPlans($after: Int, $first: Int!) {\n    getSimulationPlans(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationPlanInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetSimulationPlansDocument,
    "\n  query simulations($after: Int, $first: Int!) {\n    simulations(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.SimulationsDocument,
    "\n  query simulationResearches($after: Int, $first: Int!) {\n    simulationResearches(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationResearchInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.SimulationResearchesDocument,
    "\n  query simulation($id: Int!) {\n    simulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n": types.SimulationDocument,
    "\n  query simulationResearch($id: Int!) {\n    simulationResearch(id: $id) {\n      ...SimulationResearchDetailsInfo\n    }\n  }\n": types.SimulationResearchDocument,
    "\n  query simulationsByResearch($researchId: Int!) {\n    simulationsByResearch(researchId: $researchId) {\n      ...SimulationInfo\n    }\n  }\n": types.SimulationsByResearchDocument,
    "\n  query simulationPlansBySimulation($simulationId: Int!) {\n    simulationPlansBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanInfo\n    }\n  }\n": types.SimulationPlansBySimulationDocument,
    "\n  query simulationPlanDetailsBySimulation($simulationId: Int!) {\n    simulationPlanDetailsBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n": types.SimulationPlanDetailsBySimulationDocument,
    "\n  query getSimulationPlanById($id: Int!) {\n    getSimulationPlanById(id: $id) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n": types.GetSimulationPlanByIdDocument,
    "\n  mutation createSimulationPlan($input: CreateSimulationPlanInput!) {\n    createSimulationPlan(input: $input) {\n      ...SimulationPlanInfo\n    }\n  }\n": types.CreateSimulationPlanDocument,
    "\n  mutation createSimulationResearch($input: CreateSimulationResearchInput!) {\n    createSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n": types.CreateSimulationResearchDocument,
    "\n  mutation updateSimulationResearch($input: UpdateSimulationResearchInput!) {\n    updateSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n": types.UpdateSimulationResearchDocument,
    "\n  mutation updateSimulationBot($input: UpdateSimulationBotInput!) {\n    updateSimulationBot(input: $input) {\n      ...SimulationBotInfo\n    }\n  }\n": types.UpdateSimulationBotDocument,
    "\n  mutation batchCreateSimulationBots($inputs: [CreateSimulationBotInput!]!) {\n    batchCreateSimulationBots(inputs: $inputs) {\n      ...SimulationBotInfo\n    }\n  }\n": types.BatchCreateSimulationBotsDocument,
    "\n  mutation playSimulationPlan($id: Int!) {\n    playSimulationPlan(id: $id) {\n      ...SimulationPlanInfo\n    }\n  }\n": types.PlaySimulationPlanDocument,
    "\n  mutation cancelSimulation($id: Int!) {\n    cancelSimulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n": types.CancelSimulationDocument,
    "\n  mutation playAutoResearch($id: Int!) {\n    playAutoResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n": types.PlayAutoResearchDocument,
    "\n  mutation pauseResearch($id: Int!) {\n    pauseResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n": types.PauseResearchDocument,
    "\n  mutation cancelResearch($id: Int!) {\n    cancelResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n": types.CancelResearchDocument,
    "\n  mutation deleteSimulation($id: Int!) {\n    deleteSimulation(id: $id)\n  }\n": types.DeleteSimulationDocument,
    "\n  mutation deleteSimulationResearch($id: Int!) {\n    deleteSimulationResearch(id: $id)\n  }\n": types.DeleteSimulationResearchDocument,
    "\n  mutation deleteSimulationPlan($id: Int!) {\n    deleteSimulationPlan(id: $id)\n  }\n": types.DeleteSimulationPlanDocument,
    "\n  mutation deleteSimulationBot($id: Int!) {\n    deleteSimulationBot(id: $id)\n  }\n": types.DeleteSimulationBotDocument,
    "\n  mutation stopSimulationBot($id: Int!) {\n    stopSimulationBot(id: $id) {\n      ...SimulationBotInfo\n    }\n  }\n": types.StopSimulationBotDocument,
    "\n  subscription simulationResearchUpdated {\n    simulationResearchUpdated {\n      ...SimulationResearchInfo\n    }\n  }\n": types.SimulationResearchUpdatedDocument,
    "\n  subscription simulationUpdated {\n    simulationUpdated {\n      ...SimulationInfo\n    }\n  }\n": types.SimulationUpdatedDocument,
    "\n  subscription simulationPlanUpdated {\n    simulationPlanUpdated {\n      ...SimulationPlanInfo\n    }\n  }\n": types.SimulationPlanUpdatedDocument,
    "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    tpPercentage\n    slPercentage\n    maxOpenMissions\n    selectedPairs\n    mode\n    ratio\n  }\n": types.StrategyInfoFragmentDoc,
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
    "\n  mutation cleanDB {\n    cleanDB\n  }\n": types.CleanDbDocument,
    "\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n": types.GetServerTimeDocument,
    "\n  fragment ActionInfo on Action {\n    address\n    args\n    blockHash\n    blockNumber\n    contractId\n    createdAt\n    dedupeKey\n    id\n    name\n    orderInBlock\n    origin\n    positionKey\n    status\n    txHash\n  }\n": types.ActionInfoFragmentDoc,
    "\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n": types.FollowerActionDetailsInfoFragmentDoc,
    "\n  fragment TaskForwardDetailsInfo on TaskForwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n": types.TaskForwardDetailsInfoFragmentDoc,
    "\n  fragment TaskBackwardDetailsInfo on TaskBackwardDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n    mission {\n      ...MissionBackwardDetailsInfo\n    }\n  }\n": types.TaskBackwardDetailsInfoFragmentDoc,
    "\n  query getAlertTasks {\n    getAlertTasks {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": types.GetAlertTasksDocument,
    "\n  mutation stopTask($id: Int!) {\n    stopTask(id: $id)\n  }\n": types.StopTaskDocument,
    "\n  subscription taskCreated($userId: String!) {\n    taskCreated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": types.TaskCreatedDocument,
    "\n  subscription taskUpdated($userId: String!) {\n    taskUpdated(userId: $userId) {\n      ...TaskBackwardDetailsInfo\n    }\n  }\n": types.TaskUpdatedDocument,
    "\n  query getAllUsers {\n    getAllUsers {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n": types.GetTokenDocument,
    "\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.ChangeUserPermissionDocument,
    "\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n": types.AllowAutoDocument,
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
export function graphql(source: "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotForwardDetailsInfo on BotForwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    missions {\n      ...MissionForwardDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotBackwardDetailsInfo on BotBackwardDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    planId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    mode\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n    plan {\n      ...PlanInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n"): (typeof documents)["\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    backendUrl\n    description\n    status\n    fromBlock\n    lastBlockNumber\n    lastLeaderboardBlockNumber\n    platform\n    toBlock\n    version\n  }\n"];
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
export function graphql(source: "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      accUSDPnl\n      address\n      dateStr\n      platform\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n"): (typeof documents)["\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    userId\n    ethBalance\n    collateralBalances {\n      collateralIndex\n      balance\n      allowance\n    }\n    contractId\n    pnlSnapshots {\n      accUSDPnl\n      address\n      dateStr\n      platform\n    }\n    trades {\n      ...FollowerTradeInfo\n    }\n    pendingOrders {\n      ...FollowerPendingOrderInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment PerpTradeHistoryInfo on PerpTradeHistory {\n    id\n    address\n    collateralDeltaUsd\n    collateralInUsd\n    isLong\n    leverage\n    leverageDelta\n    operation\n    pair\n    positionKey\n    price\n    sizeDeltaUsd\n    sizeInUsd\n    usdPnl\n    usdBasePnl\n    usdFee\n    date\n    contractId\n    chainId\n    platform\n    collateralUsdPrice\n  }\n"): (typeof documents)["\n  fragment PerpTradeHistoryInfo on PerpTradeHistory {\n    id\n    address\n    collateralDeltaUsd\n    collateralInUsd\n    isLong\n    leverage\n    leverageDelta\n    operation\n    pair\n    positionKey\n    price\n    sizeDeltaUsd\n    sizeInUsd\n    usdPnl\n    usdBasePnl\n    usdFee\n    date\n    contractId\n    chainId\n    platform\n    collateralUsdPrice\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PerpTradePositionInfo on PerpTradePosition {\n    histories {\n      ...PerpTradeHistoryInfo\n    }\n  }\n"): (typeof documents)["\n  fragment PerpTradePositionInfo on PerpTradePosition {\n    histories {\n      ...PerpTradeHistoryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment PerpTradePositionsWithSummaryInfo on PerpTradePositionsWithSummary {\n      positions {\n        ...PerpTradePositionInfo\n      }\n      avgCollateral\n      avgDuration\n      avgLeverage\n      avgNegativePnl\n      avgPnl\n      avgPnlPercentageByCollateral\n      avgPnlPercentageBySize\n      avgPositivePnl\n      avgSize\n      maxDuration\n      openedPositions\n      totalPnl\n      totalPositions\n    }\n  "): (typeof documents)["\n    fragment PerpTradePositionsWithSummaryInfo on PerpTradePositionsWithSummary {\n      positions {\n        ...PerpTradePositionInfo\n      }\n      avgCollateral\n      avgDuration\n      avgLeverage\n      avgNegativePnl\n      avgPnl\n      avgPnlPercentageByCollateral\n      avgPnlPercentageBySize\n      avgPositivePnl\n      avgSize\n      maxDuration\n      openedPositions\n      totalPnl\n      totalPositions\n    }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    positionsWithSummary {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n    platform\n  }\n"): (typeof documents)["\n  fragment PnlSnapshotV2DetailsInfo on PnlSnapshotV2Details {\n    accUSDPnl\n    address\n    dateStr\n    positionsWithSummary {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n    platform\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPerpTradePositions(\n    $address: String!\n    $platform: Platform!\n    $maxLeverage: Float\n    $startedAt: Date\n    $stoppedAt: Date\n    $endedAt: Date\n  ) {\n    getPerpTradePositions(\n      address: $address\n      platform: $platform\n      maxLeverage: $maxLeverage\n      startedAt: $startedAt\n      stoppedAt: $stoppedAt\n      endedAt: $endedAt\n    ) {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n  }\n"): (typeof documents)["\n  query getPerpTradePositions(\n    $address: String!\n    $platform: Platform!\n    $maxLeverage: Float\n    $startedAt: Date\n    $stoppedAt: Date\n    $endedAt: Date\n  ) {\n    getPerpTradePositions(\n      address: $address\n      platform: $platform\n      maxLeverage: $maxLeverage\n      startedAt: $startedAt\n      stoppedAt: $stoppedAt\n      endedAt: $endedAt\n    ) {\n      ...PerpTradePositionsWithSummaryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotV2InitializedFlag($platform: Platform!) {\n    getPnlSnapshotV2InitializedFlag(platform: $platform) {\n      id\n      dateStr\n      isInit\n      platform\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $isDesc: Boolean!\n    $maxLeverage: Float\n    $page: Int!\n    $pageSize: Int!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      isDesc: $isDesc\n      maxLeverage: $maxLeverage\n      page: $page\n      pageSize: $pageSize\n    ) {\n      items {\n        ...PnlSnapshotV2DetailsInfo\n      }\n      total\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshotsV2(\n    $dateStr: String!\n    $platform: Platform!\n    $isDesc: Boolean!\n    $maxLeverage: Float\n    $page: Int!\n    $pageSize: Int!\n  ) {\n    getPnlSnapshotsV2(\n      dateStr: $dateStr\n      platform: $platform\n      isDesc: $isDesc\n      maxLeverage: $maxLeverage\n      page: $page\n      pageSize: $pageSize\n    ) {\n      items {\n        ...PnlSnapshotV2DetailsInfo\n      }\n      total\n      totalPages\n      currentPage\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n  }\n"): (typeof documents)["\n  fragment PlanSummaryInfo on PlanSummary {\n    id\n    title\n    description\n    status\n    scheduledStart\n    scheduledEnd\n    startedAt\n    endedAt\n    userId\n    botCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPlanSummariesByStatus(\n    $status: PlanStatus!\n    $after: Int\n    $first: Int!\n  ) {\n    getPlanSummariesByStatus(status: $status, after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...PlanSummaryInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  query getPlanById($id: Int!) {\n    getPlanById(id: $id) {\n      ...PlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPlanBotGroups($planId: Int!, $page: Int!, $pageSize: Int!) {\n    getPlanBotGroups(planId: $planId, page: $page, pageSize: $pageSize) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n"): (typeof documents)["\n  query getPlanBotGroups($planId: Int!, $page: Int!, $pageSize: Int!) {\n    getPlanBotGroups(planId: $planId, page: $page, pageSize: $pageSize) {\n      items {\n        leaderAddress\n        platform\n        hasDefault\n        bots {\n          ...BotForwardDetailsInfo\n        }\n      }\n      totalGroups\n      totalPages\n      currentPage\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createPlan($createPlanInput: CreatePlanInput!) {\n    createPlan(createPlanInput: $createPlanInput) {\n      ...PlanInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment SimulationBotInfo on SimulationBot {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    minLeverage\n    maxLeverage\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n  }\n"): (typeof documents)["\n  fragment SimulationBotInfo on SimulationBot {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    minLeverage\n    maxLeverage\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationPlanInfo on SimulationPlan {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotInfo\n    }\n  }\n"): (typeof documents)["\n  fragment SimulationPlanInfo on SimulationPlan {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationInfo on Simulation {\n    completedPlans\n    createdAt\n    cursor\n    days\n    description\n    direction\n    endAt\n    error\n    gapDays\n    id\n    maxDrawdownUsd\n    collateral {\n      max\n      min\n    }\n    leverage {\n      max\n      min\n    }\n    platform\n    profitFactor\n    progressMessage\n    progressPercent\n    progressPhase\n    r2 {\n      max\n      min\n    }\n    researchId\n    score {\n      max\n      min\n    }\n    scoreFormular\n    selectedLeaderCount\n    sizingFormular\n    slope {\n      max\n      min\n    }\n    standardCollateralUsd\n    startAt\n    status\n    title\n    totalCostUsd\n    totalFollowerPnl\n    totalLeaderPnl\n    totalNetPnlUsd\n    totalSimulationPlans\n    tradeCount\n    trade {\n      max\n      min\n    }\n    updatedAt\n    winRate\n  }\n"): (typeof documents)["\n  fragment SimulationInfo on Simulation {\n    completedPlans\n    createdAt\n    cursor\n    days\n    description\n    direction\n    endAt\n    error\n    gapDays\n    id\n    maxDrawdownUsd\n    collateral {\n      max\n      min\n    }\n    leverage {\n      max\n      min\n    }\n    platform\n    profitFactor\n    progressMessage\n    progressPercent\n    progressPhase\n    r2 {\n      max\n      min\n    }\n    researchId\n    score {\n      max\n      min\n    }\n    scoreFormular\n    selectedLeaderCount\n    sizingFormular\n    slope {\n      max\n      min\n    }\n    standardCollateralUsd\n    startAt\n    status\n    title\n    totalCostUsd\n    totalFollowerPnl\n    totalLeaderPnl\n    totalNetPnlUsd\n    totalSimulationPlans\n    tradeCount\n    trade {\n      max\n      min\n    }\n    updatedAt\n    winRate\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationResearchInfo on SimulationResearch {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment SimulationResearchInfo on SimulationResearch {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationResearchDetailsInfo on SimulationResearchDetails {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n    simulations {\n      ...SimulationInfo\n    }\n  }\n"): (typeof documents)["\n  fragment SimulationResearchDetailsInfo on SimulationResearchDetails {\n    completedSimulations\n    createdAt\n    days\n    description\n    direction\n    endAt\n    gapDays\n    id\n    collateral {\n      ranges {\n        max\n        min\n      }\n    }\n    leverage {\n      ranges {\n        max\n        min\n      }\n    }\n    score {\n      ranges {\n        max\n        min\n      }\n    }\n    scoreFormular\n    sizingFormular\n    status\n    cursor\n    progressPhase\n    progressMessage\n    progressPercent\n    totalRanges\n    completedRanges\n    startedAt\n    finishedAt\n    lastError\n    r2 {\n      ranges {\n        max\n        min\n      }\n    }\n    slope {\n      ranges {\n        max\n        min\n      }\n    }\n    platform\n    startAt\n    title\n    totalSimulations\n    trade {\n      ranges {\n        max\n        min\n      }\n    }\n    updatedAt\n    simulations {\n      ...SimulationInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationTradeHistoryInfo on SimulationTradeHistory {\n    follower {\n      ...PerpTradeHistoryInfo\n    }\n    leader {\n      ...PerpTradeHistoryInfo\n    }\n  }\n"): (typeof documents)["\n  fragment SimulationTradeHistoryInfo on SimulationTradeHistory {\n    follower {\n      ...PerpTradeHistoryInfo\n    }\n    leader {\n      ...PerpTradeHistoryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationTradePositionInfo on SimulationTradePosition {\n    histories {\n      ...SimulationTradeHistoryInfo\n    }\n    followerPnl\n    leaderPnl\n  }\n"): (typeof documents)["\n  fragment SimulationTradePositionInfo on SimulationTradePosition {\n    histories {\n      ...SimulationTradeHistoryInfo\n    }\n    followerPnl\n    leaderPnl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationBotDetailsInfo on SimulationBotDetails {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n    minLeverage\n    maxLeverage\n    cacheState {\n      completed\n      lastError\n      lastFetchedAt\n      rebuildRequested\n      rebuilding\n    }\n    positions {\n      ...SimulationTradePositionInfo\n    }\n  }\n"): (typeof documents)["\n  fragment SimulationBotDetailsInfo on SimulationBotDetails {\n    avgCollateral\n    avgDuration\n    avgLeverage\n    avgNegativePnl\n    avgPnl\n    avgPnlPercentageByCollateral\n    avgPnlPercentageBySize\n    avgPositivePnl\n    avgSize\n    id\n    leaderAddress\n    leaderPlatform\n    minCollateral\n    maxCollateral\n    maxDuration\n    mode\n    openedPositions\n    ratio\n    score\n    simulationPlanId\n    startedAt\n    stoppedAt\n    totalPnl\n    totalPositions\n    minLeverage\n    maxLeverage\n    cacheState {\n      completed\n      lastError\n      lastFetchedAt\n      rebuildRequested\n      rebuilding\n    }\n    positions {\n      ...SimulationTradePositionInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SimulationPlanDetailsInfo on SimulationPlanDetails {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotDetailsInfo\n    }\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n  }\n"): (typeof documents)["\n  fragment SimulationPlanDetailsInfo on SimulationPlanDetails {\n    cursor\n    description\n    endAt\n    id\n    openedPositions\n    simulationId\n    simulationBots {\n      ...SimulationBotDetailsInfo\n    }\n    startAt\n    title\n    totalFollowerPnl\n    totalLeaderPnl\n    totalPositions\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSimulationPlans($after: Int, $first: Int!) {\n    getSimulationPlans(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationPlanInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getSimulationPlans($after: Int, $first: Int!) {\n    getSimulationPlans(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationPlanInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query simulations($after: Int, $first: Int!) {\n    simulations(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query simulations($after: Int, $first: Int!) {\n    simulations(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query simulationResearches($after: Int, $first: Int!) {\n    simulationResearches(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationResearchInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query simulationResearches($after: Int, $first: Int!) {\n    simulationResearches(after: $after, first: $first) {\n      edges {\n        cursor\n        node {\n          ...SimulationResearchInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query simulation($id: Int!) {\n    simulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n"): (typeof documents)["\n  query simulation($id: Int!) {\n    simulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query simulationResearch($id: Int!) {\n    simulationResearch(id: $id) {\n      ...SimulationResearchDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query simulationResearch($id: Int!) {\n    simulationResearch(id: $id) {\n      ...SimulationResearchDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query simulationsByResearch($researchId: Int!) {\n    simulationsByResearch(researchId: $researchId) {\n      ...SimulationInfo\n    }\n  }\n"): (typeof documents)["\n  query simulationsByResearch($researchId: Int!) {\n    simulationsByResearch(researchId: $researchId) {\n      ...SimulationInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query simulationPlansBySimulation($simulationId: Int!) {\n    simulationPlansBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanInfo\n    }\n  }\n"): (typeof documents)["\n  query simulationPlansBySimulation($simulationId: Int!) {\n    simulationPlansBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query simulationPlanDetailsBySimulation($simulationId: Int!) {\n    simulationPlanDetailsBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query simulationPlanDetailsBySimulation($simulationId: Int!) {\n    simulationPlanDetailsBySimulation(simulationId: $simulationId) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getSimulationPlanById($id: Int!) {\n    getSimulationPlanById(id: $id) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getSimulationPlanById($id: Int!) {\n    getSimulationPlanById(id: $id) {\n      ...SimulationPlanDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSimulationPlan($input: CreateSimulationPlanInput!) {\n    createSimulationPlan(input: $input) {\n      ...SimulationPlanInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createSimulationPlan($input: CreateSimulationPlanInput!) {\n    createSimulationPlan(input: $input) {\n      ...SimulationPlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSimulationResearch($input: CreateSimulationResearchInput!) {\n    createSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createSimulationResearch($input: CreateSimulationResearchInput!) {\n    createSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSimulationResearch($input: UpdateSimulationResearchInput!) {\n    updateSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n"): (typeof documents)["\n  mutation updateSimulationResearch($input: UpdateSimulationResearchInput!) {\n    updateSimulationResearch(input: $input) {\n      ...SimulationResearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSimulationBot($input: UpdateSimulationBotInput!) {\n    updateSimulationBot(input: $input) {\n      ...SimulationBotInfo\n    }\n  }\n"): (typeof documents)["\n  mutation updateSimulationBot($input: UpdateSimulationBotInput!) {\n    updateSimulationBot(input: $input) {\n      ...SimulationBotInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation batchCreateSimulationBots($inputs: [CreateSimulationBotInput!]!) {\n    batchCreateSimulationBots(inputs: $inputs) {\n      ...SimulationBotInfo\n    }\n  }\n"): (typeof documents)["\n  mutation batchCreateSimulationBots($inputs: [CreateSimulationBotInput!]!) {\n    batchCreateSimulationBots(inputs: $inputs) {\n      ...SimulationBotInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation playSimulationPlan($id: Int!) {\n    playSimulationPlan(id: $id) {\n      ...SimulationPlanInfo\n    }\n  }\n"): (typeof documents)["\n  mutation playSimulationPlan($id: Int!) {\n    playSimulationPlan(id: $id) {\n      ...SimulationPlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation cancelSimulation($id: Int!) {\n    cancelSimulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n"): (typeof documents)["\n  mutation cancelSimulation($id: Int!) {\n    cancelSimulation(id: $id) {\n      ...SimulationInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation playAutoResearch($id: Int!) {\n    playAutoResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n"): (typeof documents)["\n  mutation playAutoResearch($id: Int!) {\n    playAutoResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation pauseResearch($id: Int!) {\n    pauseResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n"): (typeof documents)["\n  mutation pauseResearch($id: Int!) {\n    pauseResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation cancelResearch($id: Int!) {\n    cancelResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n"): (typeof documents)["\n  mutation cancelResearch($id: Int!) {\n    cancelResearch(id: $id) {\n      ...SimulationResearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSimulation($id: Int!) {\n    deleteSimulation(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteSimulation($id: Int!) {\n    deleteSimulation(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSimulationResearch($id: Int!) {\n    deleteSimulationResearch(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteSimulationResearch($id: Int!) {\n    deleteSimulationResearch(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSimulationPlan($id: Int!) {\n    deleteSimulationPlan(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteSimulationPlan($id: Int!) {\n    deleteSimulationPlan(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSimulationBot($id: Int!) {\n    deleteSimulationBot(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteSimulationBot($id: Int!) {\n    deleteSimulationBot(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation stopSimulationBot($id: Int!) {\n    stopSimulationBot(id: $id) {\n      ...SimulationBotInfo\n    }\n  }\n"): (typeof documents)["\n  mutation stopSimulationBot($id: Int!) {\n    stopSimulationBot(id: $id) {\n      ...SimulationBotInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription simulationResearchUpdated {\n    simulationResearchUpdated {\n      ...SimulationResearchInfo\n    }\n  }\n"): (typeof documents)["\n  subscription simulationResearchUpdated {\n    simulationResearchUpdated {\n      ...SimulationResearchInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription simulationUpdated {\n    simulationUpdated {\n      ...SimulationInfo\n    }\n  }\n"): (typeof documents)["\n  subscription simulationUpdated {\n    simulationUpdated {\n      ...SimulationInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription simulationPlanUpdated {\n    simulationPlanUpdated {\n      ...SimulationPlanInfo\n    }\n  }\n"): (typeof documents)["\n  subscription simulationPlanUpdated {\n    simulationPlanUpdated {\n      ...SimulationPlanInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    tpPercentage\n    slPercentage\n    maxOpenMissions\n    selectedPairs\n    mode\n    ratio\n  }\n"): (typeof documents)["\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    tpPercentage\n    slPercentage\n    maxOpenMissions\n    selectedPairs\n    mode\n    ratio\n  }\n"];
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
export function graphql(source: "\n  mutation cleanDB {\n    cleanDB\n  }\n"): (typeof documents)["\n  mutation cleanDB {\n    cleanDB\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n"): (typeof documents)["\n  query getServerTime {\n    getServerTime {\n      timestamp\n      timezone\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ActionInfo on Action {\n    address\n    args\n    blockHash\n    blockNumber\n    contractId\n    createdAt\n    dedupeKey\n    id\n    name\n    orderInBlock\n    origin\n    positionKey\n    status\n    txHash\n  }\n"): (typeof documents)["\n  fragment ActionInfo on Action {\n    address\n    args\n    blockHash\n    blockNumber\n    contractId\n    createdAt\n    dedupeKey\n    id\n    name\n    orderInBlock\n    origin\n    positionKey\n    status\n    txHash\n  }\n"];
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
export function graphql(source: "\n  query getAllUsers {\n    getAllUsers {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers {\n    getAllUsers {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation getToken(\n    $singature: String!\n    $timestamp: String!\n    $walletAddress: String!\n  ) {\n    getToken(\n      signature: $singature\n      timestamp: $timestamp\n      walletAddress: $walletAddress\n    ) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"): (typeof documents)["\n  mutation changeUserPermission($address: String!, $permission: String!) {\n    changeUserPermission(address: $address, permission: $permission) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"): (typeof documents)["\n  mutation allowAuto(\n    $address: String!\n    $allowAuto: Boolean!\n    $budget: Float!\n    $ratio: Float!\n    $followerContractId: Int!\n  ) {\n    allowAuto(\n      address: $address\n      allowAuto: $allowAuto\n      budget: $budget\n      ratio: $ratio\n      followerContractId: $followerContractId\n    ) {\n      address\n      secondAddress\n      permission\n      allowAuto\n      budget\n      ratio\n      followerContractId\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;