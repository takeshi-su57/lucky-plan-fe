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
    "\n  fragment BotInfo on Bot {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    status\n  }\n": types.BotInfoFragmentDoc,
    "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    leader {\n      ...UserInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n": types.BotDetailsInfoFragmentDoc,
    "\n  query getAllBots {\n    getAllBots {\n      ...BotDetailsInfo\n    }\n  }\n": types.GetAllBotsDocument,
    "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotDetailsInfo\n    }\n  }\n": types.CreateBotDocument,
    "\n  mutation liveBot($id: Int!) {\n    liveBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n": types.LiveBotDocument,
    "\n  mutation stopBot($id: Int!) {\n    stopBot(id: $id) {\n      ...BotDetailsInfo\n    }\n  }\n": types.StopBotDocument,
    "\n  fragment ContractInfo on Contract {\n    id\n    chainId\n    address\n    description\n    status\n  }\n": types.ContractInfoFragmentDoc,
    "\n  query getAllContracts {\n    getAllContracts {\n      ...ContractInfo\n    }\n  }\n": types.GetAllContractsDocument,
    "\n  mutation createContract($input: CreateContractInput!) {\n    createContract(input: $input) {\n      ...ContractInfo\n    }\n  }\n": types.CreateContractDocument,
    "\n  mutation changeContractStatus($input: ChangeContractStatusInput!) {\n    changeContractStatus(input: $input) {\n      ...ContractInfo\n    }\n  }\n": types.ChangeContractStatusDocument,
    "\n  fragment FollowerInfo on Follower {\n    address\n    accountIndex\n    publicKey\n    ethBalance\n    usdcBalance\n  }\n": types.FollowerInfoFragmentDoc,
    "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n": types.GetAllFollowersDocument,
    "\n  query getFollowerPrivateKey($input: GetFollowerByAddressInput!) {\n    getFollowerPrivateKey(input: $input)\n  }\n": types.GetFollowerPrivateKeyDocument,
    "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n": types.GenerateNewFollowerDocument,
    "\n  fragment PositionInfo on Position {\n    id\n    contractId\n    address\n    index\n  }\n": types.PositionInfoFragmentDoc,
    "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n  }\n": types.MissionInfoFragmentDoc,
    "\n  fragment MissionShallowDetailsInfo on MissionShallowDetails {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    createdAt\n    updatedAt\n    status\n    achievePosition {\n      ...PositionInfo\n    }\n    targetPosition {\n      ...PositionInfo\n    }\n    bot {\n      ...BotInfo\n    }\n  }\n": types.MissionShallowDetailsInfoFragmentDoc,
    "\n  query getAllMissions {\n    getAllMissions {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.GetAllMissionsDocument,
    "\n  mutation closeMission($id: Int!) {\n    closeMission(id: $id) {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.CloseMissionDocument,
    "\n  subscription missionAdded {\n    missionAdded {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.MissionAddedDocument,
    "\n  subscription missionUpdated {\n    missionUpdated {\n      ...MissionShallowDetailsInfo\n    }\n  }\n": types.MissionUpdatedDocument,
    "\n  fragment StrategyMetadataInfo on StrategyMetadata {\n    key\n    title\n    description\n  }\n": types.StrategyMetadataInfoFragmentDoc,
    "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    maxGas\n    maxLeverage\n    minCollateral\n    minGas\n    minLeverage\n    params\n    ratio\n    strategyKey\n  }\n": types.StrategyInfoFragmentDoc,
    "\n  query getAllStrategyMetadata {\n    getAllStrategyMetadata {\n      ...StrategyMetadataInfo\n    }\n  }\n": types.GetAllStrategyMetadataDocument,
    "\n  query getAllStrategy {\n    getAllStrategy {\n      ...StrategyInfo\n    }\n  }\n": types.GetAllStrategyDocument,
    "\n  mutation createStrategy($input: CreateStrategyInput!) {\n    createStrategy(input: $input) {\n      ...StrategyInfo\n    }\n  }\n": types.CreateStrategyDocument,
    "\n  mutation removeStrategy($id: Int!) {\n    removeStrategy(id: $id) {\n      ...StrategyInfo\n    }\n  }\n": types.RemoveStrategyDocument,
    "\n  fragment ActionInfo on Action {\n    id\n    name\n    positionId\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n": types.ActionInfoFragmentDoc,
    "\n  fragment TaskShallowDetailsInfo on TaskShallowDetails {\n    id\n    missionId\n    actionId\n    logs\n    status\n    createdAt\n    action {\n      ...ActionInfo\n    }\n    mission {\n      ...MissionInfo\n    }\n  }\n": types.TaskShallowDetailsInfoFragmentDoc,
    "\n  query getAllTasks {\n    getAllTasks {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.GetAllTasksDocument,
    "\n  mutation performTask($id: Int!) {\n    performTask(id: $id) {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.PerformTaskDocument,
    "\n  subscription taskAdded {\n    taskAdded {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.TaskAddedDocument,
    "\n  subscription taskUpdated {\n    taskUpdated {\n      ...TaskShallowDetailsInfo\n    }\n  }\n": types.TaskUpdatedDocument,
    "\n  fragment UserInfo on User {\n    address\n    role\n  }\n": types.UserInfoFragmentDoc,
    "\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n": types.GetAllUsersDocument,
    "\n  query getAllLeaders {\n    getAllLeaders {\n      ...UserInfo\n    }\n  }\n": types.GetAllLeadersDocument,
    "\n  mutation changeUserRole($input: ChangeUserRoleInput!) {\n    changeUserRole(input: $input) {\n      ...UserInfo\n    }\n  }\n": types.ChangeUserRoleDocument,
    "\n  mutation addUser($input: AddUserInput!) {\n    addUser(input: $input) {\n      ...UserInfo\n    }\n  }\n": types.AddUserDocument,
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
export function graphql(source: "\n  fragment BotInfo on Bot {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    status\n  }\n"): (typeof documents)["\n  fragment BotInfo on Bot {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    status\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    leader {\n      ...UserInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"): (typeof documents)["\n  fragment BotDetailsInfo on BotDetails {\n    id\n    leaderAddress\n    followerAddress\n    strategyId\n    leaderContractId\n    leaderStartedBlock\n    leaderEndedBlock\n    followerContractId\n    followerStartedBlock\n    followerEndedBlock\n    status\n    followerContract {\n      ...ContractInfo\n    }\n    leaderContract {\n      ...ContractInfo\n    }\n    follower {\n      ...FollowerInfo\n    }\n    leader {\n      ...UserInfo\n    }\n    strategy {\n      ...StrategyInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllBots {\n    getAllBots {\n      ...BotDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllBots {\n    getAllBots {\n      ...BotDetailsInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotDetailsInfo\n    }\n  }\n"): (typeof documents)["\n  mutation createBot($input: CreateBotInput!) {\n    createBot(input: $input) {\n      ...BotDetailsInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment FollowerInfo on Follower {\n    address\n    accountIndex\n    publicKey\n    ethBalance\n    usdcBalance\n  }\n"): (typeof documents)["\n  fragment FollowerInfo on Follower {\n    address\n    accountIndex\n    publicKey\n    ethBalance\n    usdcBalance\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n"];
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
export function graphql(source: "\n  fragment PositionInfo on Position {\n    id\n    contractId\n    address\n    index\n  }\n"): (typeof documents)["\n  fragment PositionInfo on Position {\n    id\n    contractId\n    address\n    index\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment MissionInfo on Mission {\n    id\n    botId\n    targetPositionId\n    achievePositionId\n    status\n    createdAt\n    updatedAt\n  }\n"];
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
export function graphql(source: "\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    maxGas\n    maxLeverage\n    minCollateral\n    minGas\n    minLeverage\n    params\n    ratio\n    strategyKey\n  }\n"): (typeof documents)["\n  fragment StrategyInfo on Strategy {\n    id\n    lifeTime\n    maxCollateral\n    maxGas\n    maxLeverage\n    minCollateral\n    minGas\n    minLeverage\n    params\n    ratio\n    strategyKey\n  }\n"];
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
export function graphql(source: "\n  fragment ActionInfo on Action {\n    id\n    name\n    positionId\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n"): (typeof documents)["\n  fragment ActionInfo on Action {\n    id\n    name\n    positionId\n    args\n    blockNumber\n    orderInBlock\n    createdAt\n  }\n"];
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
export function graphql(source: "\n  fragment UserInfo on User {\n    address\n    role\n  }\n"): (typeof documents)["\n  fragment UserInfo on User {\n    address\n    role\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllLeaders {\n    getAllLeaders {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllLeaders {\n    getAllLeaders {\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation changeUserRole($input: ChangeUserRoleInput!) {\n    changeUserRole(input: $input) {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  mutation changeUserRole($input: ChangeUserRoleInput!) {\n    changeUserRole(input: $input) {\n      ...UserInfo\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addUser($input: AddUserInput!) {\n    addUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  mutation addUser($input: AddUserInput!) {\n    addUser(input: $input) {\n      ...UserInfo\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;