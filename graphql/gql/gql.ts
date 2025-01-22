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
    "\n  fragment BotInfo on Bot {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n  }\n": types.BotInfoFragmentDoc,
    "\n  fragment BotWithMissionsInfo on BotWithMissions {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    missions {\n      ...MissionInfo\n    }\n  }\n": types.BotWithMissionsInfoFragmentDoc,
    "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n": types.BotDetailsInfoFragmentDoc,
    "\n  query getAllBots {\n    getAllBots {\n      ...BotDetailsInfo\n    }\n  }\n": types.GetAllBotsDocument,
    "\n  query findBot($id: Int!) {\n    findBot(id: $id) {\n      ...BotWithMissionsInfo\n    }\n  }\n": types.FindBotDocument,
    "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotDetailsInfo\n    }\n  }\n": types.CreateBotDocument,
    "\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id)\n  }\n": types.DeleteBotDocument,
    "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n": types.LiveBotDocument,
    "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n": types.StopBotDocument,
    "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    description\n    status\n  }\n": types.ContractInfoFragmentDoc,
    "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n": types.GetAllContractsDocument,
    "\n  mutation createContract($input: CreateContractInput!) {\n    createContract(input: $input) {\n      ...ContractInfo\n    }\n  }\n": types.CreateContractDocument,
    "\n  mutation changeContractStatus($input: ChangeContractStatusInput!) {\n    changeContractStatus(input: $input) {\n      ...ContractInfo\n    }\n  }\n": types.ChangeContractStatusDocument,
    "\n  fragment FollowerInfo on Follower {\n    address\n    accountIndex\n    publicKey\n  }\n": types.FollowerInfoFragmentDoc,
    "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    ethBalance\n    usdcBalance\n    contractId\n  }\n": types.FollowerDetailInfoFragmentDoc,
    "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n": types.GetAllFollowersDocument,
    "\n  query getAllFollowerDetails($contractId: Int!) {\n    getAllFollowerDetails(contractId: $contractId) {\n      ...FollowerDetailInfo\n    }\n  }\n": types.GetAllFollowerDetailsDocument,
    "\n  query getFollowerPrivateKey($input: GetFollowerByAddressInput!) {\n    getFollowerPrivateKey(input: $input)\n  }\n": types.GetFollowerPrivateKeyDocument,
    "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n": types.GenerateNewFollowerDocument,
    "\n  mutation withdrawAll($input: WithdrawAllInput!) {\n    withdrawAll(input: $input)\n  }\n": types.WithdrawAllDocument,
    "\n  subscription followerDetailsUpdated($contractId: Int!) {\n    followerDetailsUpdated(contractId: $contractId) {\n      ...FollowerDetailInfo\n    }\n  }\n": types.FollowerDetailsUpdatedDocument,
    "\n  fragment TradeHistoryInfo on TradeHistory {\n    address\n    blockNumber\n    contractId\n    eventName\n    id\n    in\n    out\n    pnl\n    timestamp\n  }\n": types.TradeHistoryInfoFragmentDoc,
    "\n  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {\n    accUSDPnl\n    address\n    contractId\n    histories {\n      ...TradeHistoryInfo\n    }\n    id\n    kind\n  }\n": types.PnlSnapshotDetailsInfoFragmentDoc,
    "\n  query getTradeHistories($address: String!, $contractId: Int!) {\n    getTradeHistories(address: $address, contractId: $contractId) {\n      ...TradeHistoryInfo\n    }\n  }\n": types.GetTradeHistoriesDocument,
    "\n  query getPnlSnapshots(\n    $contractId: Int!\n    $kind: PnlSnapshotKind!\n    $first: Int!\n    $after: Int\n  ) {\n    getPnlSnapshots(\n      contractId: $contractId\n      kind: $kind\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.GetPnlSnapshotsDocument,
    "\n  mutation initalizePnlSnapshot {\n    initalizePnlSnapshot\n  }\n": types.InitalizePnlSnapshotDocument,
    "\n  fragment PositionInfo on Position {\n    id\n    contractId\n    address\n    index\n  }\n": types.PositionInfoFragmentDoc,
    "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n  }\n": types.MissionInfoFragmentDoc,
    "\n  fragment MissionWithTasksInfo on MissionWithTasks {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n    tasks {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.MissionWithTasksInfoFragmentDoc,
    "\n  fragment MissionShallowDetailsInfo on MissionShallowDetails {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    createdAt\n    updatedAt\n    status\n    achievePosition {\n      ...PositionInfo\n    }\n    targetPosition {\n      ...PositionInfo\n    }\n    bot {\n      ...BotInfo\n    }\n  }\n": types.MissionShallowDetailsInfoFragmentDoc,
    "\n  query getAllMissions {\n    getAllMissions {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.GetAllMissionsDocument,
    "\n  query findMission($id: Int!) {\n    findMission(id: $id) {\n      ...MissionWithTasksInfo\n    }\n  }\n": types.FindMissionDocument,
    "\n  mutation closeMission($id: Int!) {\n    closeMission(id: $id) {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.CloseMissionDocument,
    "\n  subscription missionAdded {\n    missionAdded {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.MissionAddedDocument,
    "\n  subscription missionUpdated {\n    missionUpdated {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.MissionUpdatedDocument,
    "\n  fragment StrategyMetadataInfo on StrategyMetadata {\n    key\n    title\n    description\n  }\n": types.StrategyMetadataInfoFragmentDoc,
    "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    minCollateral\n    maxLeverage\n    minLeverage\n    collateralBaseline\n    params\n    ratio\n    strategyKey\n  }\n": types.StrategyInfoFragmentDoc,
    "\n  query getAllStrategyMetadata {\n    getAllStrategyMetadata {\n      ...StrategyMetadataInfo\n    }\n  }\n": types.GetAllStrategyMetadataDocument,
    "\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n": types.GetAllStrategyDocument,
    "\n  mutation createStrategy($input: CreateStrategyInput!) {\n    createStrategy(input: $input) {\n      ...StrategyInfo\n    }\n  }\n": types.CreateStrategyDocument,
    "\n  mutation removeStrategy($id: Int!) {\n    removeStrategy(id: $id) {\n      ...StrategyInfo\n    }\n  }\n": types.RemoveStrategyDocument,
    "\n  fragment TagCategoryInfo on TagCategory {\n    id\n    category\n    description\n  }\n": types.TagCategoryInfoFragmentDoc,
    "\n  fragment TagInfo on Tag {\n    tag\n    description\n    color\n    categoryId\n  }\n": types.TagInfoFragmentDoc,
    "\n  query getAllTags {\n    getAllTags {\n      ...TagInfo\n    }\n  }\n": types.GetAllTagsDocument,
    "\n  mutation upsertTag($input: TagInput!) {\n    upsertTag(input: $input) {\n      ...TagInfo\n    }\n  }\n": types.UpsertTagDocument,
    "\n  mutation deleteTag($tag: String!) {\n    deleteTag(tag: $tag) {\n      ...TagInfo\n    }\n  }\n": types.DeleteTagDocument,
    "\n  query getAllCategories {\n    getAllCategories {\n      ...TagCategoryInfo\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  mutation upsertCategory($input: TagCategoryInput!) {\n    upsertCategory(input: $input) {\n      ...TagCategoryInfo\n    }\n  }\n": types.UpsertCategoryDocument,
    "\n  mutation deleteCategory($id: Int!) {\n    deleteCategory(id: $id) {\n      ...TagCategoryInfo\n    }\n  }\n": types.DeleteCategoryDocument,
    "\n  fragment ActionInfo on Action {\n    id\n    name\n    positionId\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n": types.ActionInfoFragmentDoc,
    "\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n": types.FollowerActionDetailsInfoFragmentDoc,
    "\n  fragment TaskWithActionsInfo on TaskWithActions {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n": types.TaskWithActionsInfoFragmentDoc,
    "\n  fragment TaskShallowDetailsInfo on TaskShallowDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    mission {\n      ...MissionInfo\n    }\n  }\n": types.TaskShallowDetailsInfoFragmentDoc,
    "\n  query getAllTasks {\n    getAllTasks {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.GetAllTasksDocument,
    "\n  query getTasksByStatus($status: TaskStatus!) {\n    getTasksByStatus(status: $status) {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.GetTasksByStatusDocument,
    "\n  query findTask($id: Int!) {\n    findTask(id: $id) {\n      ...TaskWithActionsInfo\n    }\n  }\n": types.FindTaskDocument,
    "\n  mutation performTask($id: Int!) {\n    performTask(id: $id) {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.PerformTaskDocument,
    "\n  subscription taskAdded {\n    taskAdded {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.TaskAddedDocument,
    "\n  subscription taskUpdated {\n    taskUpdated {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.TaskUpdatedDocument,
    "\n  fragment UserInfo on User {\n    address\n    tags {\n      ...TagInfo\n    }\n  }\n": types.UserInfoFragmentDoc,
    "\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  mutation addUser($input: AddUserInput!) {\n    addUser(input: $input) {\n      ...UserInfo\n    }\n  }\n": types.AddUserDocument,
    "\n  mutation addTagToUser($input: ChangeUserTagInput!) {\n    addTagToUser(input: $input) {\n      ...UserInfo\n    }\n  }\n": types.AddTagToUserDocument,
    "\n  mutation removeTagFromUser($input: ChangeUserTagInput!) {\n    removeTagFromUser(input: $input) {\n      ...UserInfo\n    }\n  }\n": types.RemoveTagFromUserDocument,
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
export function graphql(source: "\n  fragment BotInfo on Bot {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n  }\n"): (typeof documents)["\n  fragment BotInfo on Bot {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotWithMissionsInfo on BotWithMissions {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    missions {\n      ...MissionInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotWithMissionsInfo on BotWithMissions {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    missions {\n      ...MissionInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderCollateralBaseline\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    startedAt\n    endedAt\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllBots {\n    getAllBots {\n      ...BotDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllBots {\n    getAllBots {\n      ...BotDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findBot($id: Int!) {\n    findBot(id: $id) {\n      ...BotWithMissionsInfo\n    }\n  }\n"): (typeof documents)["\n  query findBot($id: Int!) {\n    findBot(id: $id) {\n      ...BotWithMissionsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteBot($id: Int!) {\n    deleteBot(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    description\n    status\n  }\n"): (typeof documents)["\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    description\n    status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createContract($input: CreateContractInput!) {\n    createContract(input: $input) {\n      ...ContractInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createContract($input: CreateContractInput!) {\n    createContract(input: $input) {\n      ...ContractInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changeContractStatus($input: ChangeContractStatusInput!) {\n    changeContractStatus(input: $input) {\n      ...ContractInfo\n    }\n  }\n"): (typeof documents)["\n  mutation changeContractStatus($input: ChangeContractStatusInput!) {\n    changeContractStatus(input: $input) {\n      ...ContractInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerInfo on Follower {\n    address\n    accountIndex\n    publicKey\n  }\n"): (typeof documents)["\n  fragment FollowerInfo on Follower {\n    address\n    accountIndex\n    publicKey\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    ethBalance\n    usdcBalance\n    contractId\n  }\n"): (typeof documents)["\n  fragment FollowerDetailInfo on FollowerDetail {\n    address\n    accountIndex\n    publicKey\n    ethBalance\n    usdcBalance\n    contractId\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllFollowerDetails($contractId: Int!) {\n    getAllFollowerDetails(contractId: $contractId) {\n      ...FollowerDetailInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllFollowerDetails($contractId: Int!) {\n    getAllFollowerDetails(contractId: $contractId) {\n      ...FollowerDetailInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFollowerPrivateKey($input: GetFollowerByAddressInput!) {\n    getFollowerPrivateKey(input: $input)\n  }\n"): (typeof documents)["\n  query getFollowerPrivateKey($input: GetFollowerByAddressInput!) {\n    getFollowerPrivateKey(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n"): (typeof documents)["\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation withdrawAll($input: WithdrawAllInput!) {\n    withdrawAll(input: $input)\n  }\n"): (typeof documents)["\n  mutation withdrawAll($input: WithdrawAllInput!) {\n    withdrawAll(input: $input)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription followerDetailsUpdated($contractId: Int!) {\n    followerDetailsUpdated(contractId: $contractId) {\n      ...FollowerDetailInfo\n    }\n  }\n"): (typeof documents)["\n  subscription followerDetailsUpdated($contractId: Int!) {\n    followerDetailsUpdated(contractId: $contractId) {\n      ...FollowerDetailInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TradeHistoryInfo on TradeHistory {\n    address\n    blockNumber\n    contractId\n    eventName\n    id\n    in\n    out\n    pnl\n    timestamp\n  }\n"): (typeof documents)["\n  fragment TradeHistoryInfo on TradeHistory {\n    address\n    blockNumber\n    contractId\n    eventName\n    id\n    in\n    out\n    pnl\n    timestamp\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {\n    accUSDPnl\n    address\n    contractId\n    histories {\n      ...TradeHistoryInfo\n    }\n    id\n    kind\n  }\n"): (typeof documents)["\n  fragment PnlSnapshotDetailsInfo on PnlSnapshotDetails {\n    accUSDPnl\n    address\n    contractId\n    histories {\n      ...TradeHistoryInfo\n    }\n    id\n    kind\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTradeHistories($address: String!, $contractId: Int!) {\n    getTradeHistories(address: $address, contractId: $contractId) {\n      ...TradeHistoryInfo\n    }\n  }\n"): (typeof documents)["\n  query getTradeHistories($address: String!, $contractId: Int!) {\n    getTradeHistories(address: $address, contractId: $contractId) {\n      ...TradeHistoryInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPnlSnapshots(\n    $contractId: Int!\n    $kind: PnlSnapshotKind!\n    $first: Int!\n    $after: Int\n  ) {\n    getPnlSnapshots(\n      contractId: $contractId\n      kind: $kind\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPnlSnapshots(\n    $contractId: Int!\n    $kind: PnlSnapshotKind!\n    $first: Int!\n    $after: Int\n  ) {\n    getPnlSnapshots(\n      contractId: $contractId\n      kind: $kind\n      first: $first\n      after: $after\n    ) {\n      edges {\n        cursor\n        node {\n          ...PnlSnapshotDetailsInfo\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation initalizePnlSnapshot {\n    initalizePnlSnapshot\n  }\n"): (typeof documents)["\n  mutation initalizePnlSnapshot {\n    initalizePnlSnapshot\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PositionInfo on Position {\n    id\n    contractId\n    address\n    index\n  }\n"): (typeof documents)["\n  fragment PositionInfo on Position {\n    id\n    contractId\n    address\n    index\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionWithTasksInfo on MissionWithTasks {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n    tasks {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment MissionWithTasksInfo on MissionWithTasks {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n    tasks {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionShallowDetailsInfo on MissionShallowDetails {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    createdAt\n    updatedAt\n    status\n    achievePosition {\n      ...PositionInfo\n    }\n    targetPosition {\n      ...PositionInfo\n    }\n    bot {\n      ...BotInfo\n    }\n  }\n"): (typeof documents)["\n  fragment MissionShallowDetailsInfo on MissionShallowDetails {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    createdAt\n    updatedAt\n    status\n    achievePosition {\n      ...PositionInfo\n    }\n    targetPosition {\n      ...PositionInfo\n    }\n    bot {\n      ...BotInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllMissions {\n    getAllMissions {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllMissions {\n    getAllMissions {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findMission($id: Int!) {\n    findMission(id: $id) {\n      ...MissionWithTasksInfo\n    }\n  }\n"): (typeof documents)["\n  query findMission($id: Int!) {\n    findMission(id: $id) {\n      ...MissionWithTasksInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation closeMission($id: Int!) {\n    closeMission(id: $id) {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation closeMission($id: Int!) {\n    closeMission(id: $id) {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription missionAdded {\n    missionAdded {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription missionAdded {\n    missionAdded {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription missionUpdated {\n    missionUpdated {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription missionUpdated {\n    missionUpdated {\n      ...MissionShallowDetailsInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation createStrategy($input: CreateStrategyInput!) {\n    createStrategy(input: $input) {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createStrategy($input: CreateStrategyInput!) {\n    createStrategy(input: $input) {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeStrategy($id: Int!) {\n    removeStrategy(id: $id) {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  mutation removeStrategy($id: Int!) {\n    removeStrategy(id: $id) {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TagCategoryInfo on TagCategory {\n    id\n    category\n    description\n  }\n"): (typeof documents)["\n  fragment TagCategoryInfo on TagCategory {\n    id\n    category\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TagInfo on Tag {\n    tag\n    description\n    color\n    categoryId\n  }\n"): (typeof documents)["\n  fragment TagInfo on Tag {\n    tag\n    description\n    color\n    categoryId\n  }\n"];
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
export function graphql(source: "\n  fragment ActionInfo on Action {\n    id\n    name\n    positionId\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n"): (typeof documents)["\n  fragment ActionInfo on Action {\n    id\n    name\n    positionId\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n"): (typeof documents)["\n  fragment FollowerActionDetailsInfo on FollowerActionDetails {\n    id\n    taskId\n    actionId\n    action {\n      ...ActionInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskWithActionsInfo on TaskWithActions {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  fragment TaskWithActionsInfo on TaskWithActions {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    followerActions {\n      ...FollowerActionDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment TaskShallowDetailsInfo on TaskShallowDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    mission {\n      ...MissionInfo\n    }\n  }\n"): (typeof documents)["\n  fragment TaskShallowDetailsInfo on TaskShallowDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    mission {\n      ...MissionInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllTasks {\n    getAllTasks {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllTasks {\n    getAllTasks {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getTasksByStatus($status: TaskStatus!) {\n    getTasksByStatus(status: $status) {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getTasksByStatus($status: TaskStatus!) {\n    getTasksByStatus(status: $status) {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query findTask($id: Int!) {\n    findTask(id: $id) {\n      ...TaskWithActionsInfo\n    }\n  }\n"): (typeof documents)["\n  query findTask($id: Int!) {\n    findTask(id: $id) {\n      ...TaskWithActionsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation performTask($id: Int!) {\n    performTask(id: $id) {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation performTask($id: Int!) {\n    performTask(id: $id) {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription taskAdded {\n    taskAdded {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription taskAdded {\n    taskAdded {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription taskUpdated {\n    taskUpdated {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  subscription taskUpdated {\n    taskUpdated {\n      ...TaskShallowDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserInfo on User {\n    address\n    tags {\n      ...TagInfo\n    }\n  }\n"): (typeof documents)["\n  fragment UserInfo on User {\n    address\n    tags {\n      ...TagInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addUser($input: AddUserInput!) {\n    addUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  mutation addUser($input: AddUserInput!) {\n    addUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addTagToUser($input: ChangeUserTagInput!) {\n    addTagToUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  mutation addTagToUser($input: ChangeUserTagInput!) {\n    addTagToUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeTagFromUser($input: ChangeUserTagInput!) {\n    removeTagFromUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  mutation removeTagFromUser($input: ChangeUserTagInput!) {\n    removeTagFromUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;