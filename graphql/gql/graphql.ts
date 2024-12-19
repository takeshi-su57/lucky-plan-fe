/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Action = {
  __typename?: 'Action';
  args: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderInBlock: Scalars['Int']['output'];
  positionId: Scalars['Int']['output'];
};

export type AddUserInput = {
  address: Scalars['String']['input'];
};

export type Bot = {
  __typename?: 'Bot';
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  followerAddress: Scalars['String']['output'];
  followerContractId: Scalars['Int']['output'];
  followerEndedBlock?: Maybe<Scalars['Int']['output']>;
  followerStartedBlock?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  leaderCollateralBaseline: Scalars['Int']['output'];
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: BotStatus;
  strategyId: Scalars['Int']['output'];
};

export type BotDetails = {
  __typename?: 'BotDetails';
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  follower: Follower;
  followerAddress: Scalars['String']['output'];
  followerContract: Contract;
  followerContractId: Scalars['Int']['output'];
  followerEndedBlock?: Maybe<Scalars['Int']['output']>;
  followerStartedBlock?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  leaderCollateralBaseline: Scalars['Int']['output'];
  leaderContract: Contract;
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: BotStatus;
  strategy: Strategy;
  strategyId: Scalars['Int']['output'];
};

export enum BotStatus {
  Created = 'Created',
  Dead = 'Dead',
  Live = 'Live',
  Stop = 'Stop'
}

export type ChangeContractStatusInput = {
  id: Scalars['Int']['input'];
  status: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangeUserTagInput = {
  address: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  status: ContractStatus;
};

export enum ContractStatus {
  Dead = 'Dead',
  Live = 'Live'
}

export type CreateBotInput = {
  followerAddress: Scalars['String']['input'];
  followerContractId: Scalars['Int']['input'];
  leaderAddress: Scalars['String']['input'];
  leaderCollateralBaseline: Scalars['Int']['input'];
  leaderContractId: Scalars['Int']['input'];
  strategyId: Scalars['Int']['input'];
};

export type CreateContractInput = {
  address: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  lastBlockNumber: Scalars['Int']['input'];
};

export type CreateStrategyInput = {
  collateralBaseline: Scalars['Int']['input'];
  lifeTime: Scalars['Float']['input'];
  maxCapacity: Scalars['Float']['input'];
  maxCollateral: Scalars['Float']['input'];
  maxLeverage: Scalars['Int']['input'];
  minCapacity: Scalars['Float']['input'];
  minCollateral: Scalars['Float']['input'];
  minLeverage: Scalars['Int']['input'];
  params: Scalars['String']['input'];
  ratio: Scalars['Int']['input'];
  strategyKey: Scalars['String']['input'];
};

export type FindPositionInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
};

export type Follower = {
  __typename?: 'Follower';
  accountIndex: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
};

export type FollowerAction = {
  __typename?: 'FollowerAction';
  actionId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  taskId: Scalars['Int']['output'];
};

export type FollowerActionDetails = {
  __typename?: 'FollowerActionDetails';
  action: Action;
  actionId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  task: Task;
  taskId: Scalars['Int']['output'];
};

export type FollowerDetail = {
  __typename?: 'FollowerDetail';
  accountIndex: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  ethBalance?: Maybe<Scalars['String']['output']>;
  publicKey: Scalars['String']['output'];
  usdcBalance?: Maybe<Scalars['String']['output']>;
};

export type GetFollowerByAddressInput = {
  address: Scalars['String']['input'];
};

export type GetTokenInput = {
  password: Scalars['String']['input'];
};

export type GetTokenResponse = {
  __typename?: 'GetTokenResponse';
  accessToken: Scalars['String']['output'];
};

export type GetUserByAddressInput = {
  address: Scalars['String']['input'];
};

export type Mission = {
  __typename?: 'Mission';
  achievePositionId?: Maybe<Scalars['Int']['output']>;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  status: MissionStatus;
  targetPositionId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MissionDetails = {
  __typename?: 'MissionDetails';
  achievePosition?: Maybe<Position>;
  achievePositionId?: Maybe<Scalars['Int']['output']>;
  bot: BotDetails;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  status: MissionStatus;
  targetPosition: Position;
  targetPositionId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MissionShallowDetails = {
  __typename?: 'MissionShallowDetails';
  achievePosition?: Maybe<Position>;
  achievePositionId?: Maybe<Scalars['Int']['output']>;
  bot: Bot;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  status: MissionStatus;
  targetPosition: Position;
  targetPositionId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum MissionStatus {
  Closed = 'Closed',
  Closing = 'Closing',
  Created = 'Created',
  Opened = 'Opened',
  Opening = 'Opening'
}

export type Mutation = {
  __typename?: 'Mutation';
  addTagToUser: User;
  addUser: User;
  changeContractStatus: Contract;
  changePassword: Scalars['Boolean']['output'];
  closeMission: MissionShallowDetails;
  createBot: BotDetails;
  createContract: Contract;
  createStrategy: Strategy;
  deleteBot: Scalars['Int']['output'];
  deleteTag: Tag;
  generateNewFollower: Follower;
  getToken: GetTokenResponse;
  initalizePnlSnapshot: Scalars['Boolean']['output'];
  liveBot: BotDetails;
  performTask: TaskShallowDetails;
  removeStrategy: Strategy;
  removeTagFromUser: User;
  stopBot: BotDetails;
  updateStrategyMetadata: StrategyMetadata;
  upsertTag: Tag;
  withdrawAll: Scalars['Boolean']['output'];
};


export type MutationAddTagToUserArgs = {
  input: ChangeUserTagInput;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationChangeContractStatusArgs = {
  input: ChangeContractStatusInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationCloseMissionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCreateBotArgs = {
  input: CreateBotInput;
};


export type MutationCreateContractArgs = {
  input: CreateContractInput;
};


export type MutationCreateStrategyArgs = {
  input: CreateStrategyInput;
};


export type MutationDeleteBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTagArgs = {
  tag: Scalars['String']['input'];
};


export type MutationGetTokenArgs = {
  input: GetTokenInput;
};


export type MutationLiveBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPerformTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveStrategyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTagFromUserArgs = {
  input: ChangeUserTagInput;
};


export type MutationStopBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateStrategyMetadataArgs = {
  input: UpdateStrategyMetadataInput;
  key: Scalars['String']['input'];
};


export type MutationUpsertTagArgs = {
  input: TagInput;
};


export type MutationWithdrawAllArgs = {
  input: WithdrawAllInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type PnlSnapshotDetails = {
  __typename?: 'PnlSnapshotDetails';
  accUSDPnl: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  histories: Array<TradeHistory>;
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
};

export type PnlSnapshotDetailsConnection = {
  __typename?: 'PnlSnapshotDetailsConnection';
  edges: Array<PnlSnapshotDetailsEdge>;
  pageInfo: PageInfo;
};

export type PnlSnapshotDetailsEdge = {
  __typename?: 'PnlSnapshotDetailsEdge';
  cursor: Scalars['Int']['output'];
  node: PnlSnapshotDetails;
};

export enum PnlSnapshotKind {
  AllTime = 'ALL_TIME',
  Day = 'DAY',
  HalfYear = 'HALF_YEAR',
  Month = 'MONTH',
  ThreeDay = 'THREE_DAY',
  ThreeMonth = 'THREE_MONTH',
  TwoDay = 'TWO_DAY',
  TwoMonth = 'TWO_MONTH',
  TwoWeek = 'TWO_WEEK',
  TwoYear = 'TWO_YEAR',
  Week = 'WEEK',
  Year = 'YEAR'
}

export type Position = {
  __typename?: 'Position';
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
};

export type PositionInfo = {
  __typename?: 'PositionInfo';
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAction?: Maybe<Action>;
  findActionsByPosition: Array<Action>;
  findAllPositions: Array<Position>;
  findBot: BotDetails;
  findContract: Contract;
  findFollowerAction?: Maybe<FollowerActionDetails>;
  findPosition?: Maybe<Position>;
  findPositionById?: Maybe<Position>;
  findStrategy?: Maybe<Strategy>;
  findStrategyMetadata: StrategyMetadata;
  findTask: TaskShallowDetails;
  findTasksByMission: Array<TaskShallowDetails>;
  getAllActions: Array<Action>;
  getAllBots: Array<BotDetails>;
  getAllContracts: Array<Contract>;
  getAllFollowerActions: Array<FollowerAction>;
  getAllFollowerDetails: Array<FollowerDetail>;
  getAllFollowers: Array<Follower>;
  getAllMissions: Array<MissionShallowDetails>;
  getAllStrategy: Array<Strategy>;
  getAllStrategyMetadata: Array<StrategyMetadata>;
  getAllTags: Array<Tag>;
  getAllTasks: Array<TaskShallowDetails>;
  getAllUsers: Array<User>;
  getFollowerPrivateKey: Scalars['String']['output'];
  getPnlSnapshots: PnlSnapshotDetailsConnection;
  getTradeHistories: Array<TradeHistory>;
  getUserByAddress: User;
};


export type QueryFindActionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindActionsByPositionArgs = {
  positionId: Scalars['Float']['input'];
};


export type QueryFindBotArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindContractArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindFollowerActionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindPositionArgs = {
  input: FindPositionInput;
};


export type QueryFindPositionByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindStrategyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindStrategyMetadataArgs = {
  key: Scalars['String']['input'];
};


export type QueryFindTaskArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindTasksByMissionArgs = {
  missionId: Scalars['Int']['input'];
};


export type QueryGetAllFollowerDetailsArgs = {
  contractId: Scalars['Int']['input'];
};


export type QueryGetFollowerPrivateKeyArgs = {
  input: GetFollowerByAddressInput;
};


export type QueryGetPnlSnapshotsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  contractId: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
  kind: PnlSnapshotKind;
};


export type QueryGetTradeHistoriesArgs = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
};


export type QueryGetUserByAddressArgs = {
  input: GetUserByAddressInput;
};

export type Strategy = {
  __typename?: 'Strategy';
  collateralBaseline: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lifeTime: Scalars['Int']['output'];
  maxCapacity: Scalars['Int']['output'];
  maxCollateral: Scalars['Int']['output'];
  maxLeverage: Scalars['Int']['output'];
  minCapacity: Scalars['Int']['output'];
  minCollateral: Scalars['Int']['output'];
  minLeverage: Scalars['Int']['output'];
  params: Scalars['String']['output'];
  ratio: Scalars['Int']['output'];
  strategyKey: Scalars['String']['output'];
};

export type StrategyMetadata = {
  __typename?: 'StrategyMetadata';
  description: Scalars['String']['output'];
  key: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  actionAdded: Array<Action>;
  followerActionAdded: Array<FollowerAction>;
  followerDetailsUpdated: Array<FollowerDetail>;
  missionAdded: Array<MissionShallowDetails>;
  missionUpdated: Array<MissionShallowDetails>;
  taskAdded: Array<TaskShallowDetails>;
  taskUpdated: Array<TaskShallowDetails>;
};


export type SubscriptionFollowerDetailsUpdatedArgs = {
  contractId: Scalars['Int']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  color: Scalars['String']['output'];
  description: Scalars['String']['output'];
  tag: Scalars['String']['output'];
};

export type TagInput = {
  color: Scalars['String']['input'];
  description: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type Task = {
  __typename?: 'Task';
  actionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  logs: Array<Scalars['String']['output']>;
  missionId: Scalars['Int']['output'];
  status: TaskStatus;
};

export type TaskShallowDetails = {
  __typename?: 'TaskShallowDetails';
  action: Action;
  actionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  logs: Array<Scalars['String']['output']>;
  mission: Mission;
  missionId: Scalars['Int']['output'];
  status: TaskStatus;
};

export enum TaskStatus {
  Await = 'Await',
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Initiated = 'Initiated',
  Stopped = 'Stopped'
}

export type TradeHistory = {
  __typename?: 'TradeHistory';
  address: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  contractId: Scalars['Int']['output'];
  eventName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  in: Scalars['Int']['output'];
  out: Scalars['Int']['output'];
  pnl: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export type UpdateStrategyMetadataInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  tags: Array<Tag>;
};

export type WithdrawAllInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
};

export type ActionInfoFragment = { __typename?: 'Action', id: number, name: string, positionId: number, args: string, blockNumber: number, orderInBlock: number, createdAt: any } & { ' $fragmentName'?: 'ActionInfoFragment' };

export type GetAllActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllActionsQuery = { __typename?: 'Query', getAllActions: Array<(
    { __typename?: 'Action' }
    & { ' $fragmentRefs'?: { 'ActionInfoFragment': ActionInfoFragment } }
  )> };

export type ActionAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ActionAddedSubscription = { __typename?: 'Subscription', actionAdded: Array<(
    { __typename?: 'Action' }
    & { ' $fragmentRefs'?: { 'ActionInfoFragment': ActionInfoFragment } }
  )> };

export type BotInfoFragment = { __typename?: 'Bot', id: number, leaderAddress: string, followerAddress: string, strategyId: number, leaderContractId: number, leaderCollateralBaseline: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus } & { ' $fragmentName'?: 'BotInfoFragment' };

export type BotDetailsInfoFragment = { __typename?: 'BotDetails', id: number, leaderAddress: string, followerAddress: string, strategyId: number, leaderContractId: number, leaderCollateralBaseline: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus, followerContract: (
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  ), leaderContract: (
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  ), follower: (
    { __typename?: 'Follower' }
    & { ' $fragmentRefs'?: { 'FollowerInfoFragment': FollowerInfoFragment } }
  ), strategy: (
    { __typename?: 'Strategy' }
    & { ' $fragmentRefs'?: { 'StrategyInfoFragment': StrategyInfoFragment } }
  ) } & { ' $fragmentName'?: 'BotDetailsInfoFragment' };

export type GetAllBotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBotsQuery = { __typename?: 'Query', getAllBots: Array<(
    { __typename?: 'BotDetails' }
    & { ' $fragmentRefs'?: { 'BotDetailsInfoFragment': BotDetailsInfoFragment } }
  )> };

export type CreateBotMutationVariables = Exact<{
  input: CreateBotInput;
}>;


export type CreateBotMutation = { __typename?: 'Mutation', createBot: (
    { __typename?: 'BotDetails' }
    & { ' $fragmentRefs'?: { 'BotDetailsInfoFragment': BotDetailsInfoFragment } }
  ) };

export type DeleteBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteBotMutation = { __typename?: 'Mutation', deleteBot: number };

export type LiveBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type LiveBotMutation = { __typename?: 'Mutation', liveBot: (
    { __typename?: 'BotDetails' }
    & { ' $fragmentRefs'?: { 'BotDetailsInfoFragment': BotDetailsInfoFragment } }
  ) };

export type StopBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type StopBotMutation = { __typename?: 'Mutation', stopBot: (
    { __typename?: 'BotDetails' }
    & { ' $fragmentRefs'?: { 'BotDetailsInfoFragment': BotDetailsInfoFragment } }
  ) };

export type ContractInfoFragment = { __typename?: 'Contract', id: number, chainId: number, address: string, description: string, status: ContractStatus } & { ' $fragmentName'?: 'ContractInfoFragment' };

export type GetAllContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllContractsQuery = { __typename?: 'Query', getAllContracts: Array<(
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  )> };

export type CreateContractMutationVariables = Exact<{
  input: CreateContractInput;
}>;


export type CreateContractMutation = { __typename?: 'Mutation', createContract: (
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  ) };

export type ChangeContractStatusMutationVariables = Exact<{
  input: ChangeContractStatusInput;
}>;


export type ChangeContractStatusMutation = { __typename?: 'Mutation', changeContractStatus: (
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  ) };

export type FollowerInfoFragment = { __typename?: 'Follower', address: string, accountIndex: number, publicKey: string } & { ' $fragmentName'?: 'FollowerInfoFragment' };

export type FollowerDetailInfoFragment = { __typename?: 'FollowerDetail', address: string, accountIndex: number, publicKey: string, ethBalance?: string | null, usdcBalance?: string | null, contractId: number } & { ' $fragmentName'?: 'FollowerDetailInfoFragment' };

export type GetAllFollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFollowersQuery = { __typename?: 'Query', getAllFollowers: Array<(
    { __typename?: 'Follower' }
    & { ' $fragmentRefs'?: { 'FollowerInfoFragment': FollowerInfoFragment } }
  )> };

export type GetAllFollowerDetailsQueryVariables = Exact<{
  contractId: Scalars['Int']['input'];
}>;


export type GetAllFollowerDetailsQuery = { __typename?: 'Query', getAllFollowerDetails: Array<(
    { __typename?: 'FollowerDetail' }
    & { ' $fragmentRefs'?: { 'FollowerDetailInfoFragment': FollowerDetailInfoFragment } }
  )> };

export type GetFollowerPrivateKeyQueryVariables = Exact<{
  input: GetFollowerByAddressInput;
}>;


export type GetFollowerPrivateKeyQuery = { __typename?: 'Query', getFollowerPrivateKey: string };

export type GenerateNewFollowerMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateNewFollowerMutation = { __typename?: 'Mutation', generateNewFollower: (
    { __typename?: 'Follower' }
    & { ' $fragmentRefs'?: { 'FollowerInfoFragment': FollowerInfoFragment } }
  ) };

export type WithdrawAllMutationVariables = Exact<{
  input: WithdrawAllInput;
}>;


export type WithdrawAllMutation = { __typename?: 'Mutation', withdrawAll: boolean };

export type FollowerDetailsUpdatedSubscriptionVariables = Exact<{
  contractId: Scalars['Int']['input'];
}>;


export type FollowerDetailsUpdatedSubscription = { __typename?: 'Subscription', followerDetailsUpdated: Array<(
    { __typename?: 'FollowerDetail' }
    & { ' $fragmentRefs'?: { 'FollowerDetailInfoFragment': FollowerDetailInfoFragment } }
  )> };

export type FollowerActionInfoFragment = { __typename?: 'FollowerAction', id: number, taskId: number, actionId: number } & { ' $fragmentName'?: 'FollowerActionInfoFragment' };

export type GetAllFollowerActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFollowerActionsQuery = { __typename?: 'Query', getAllFollowerActions: Array<(
    { __typename?: 'FollowerAction' }
    & { ' $fragmentRefs'?: { 'FollowerActionInfoFragment': FollowerActionInfoFragment } }
  )> };

export type FollowerActionAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type FollowerActionAddedSubscription = { __typename?: 'Subscription', followerActionAdded: Array<(
    { __typename?: 'FollowerAction' }
    & { ' $fragmentRefs'?: { 'FollowerActionInfoFragment': FollowerActionInfoFragment } }
  )> };

export type TradeHistoryInfoFragment = { __typename?: 'TradeHistory', address: string, blockNumber: number, contractId: number, eventName: string, id: number, in: number, out: number, pnl: number, timestamp: any } & { ' $fragmentName'?: 'TradeHistoryInfoFragment' };

export type PnlSnapshotDetailsInfoFragment = { __typename?: 'PnlSnapshotDetails', accUSDPnl: number, address: string, contractId: number, id: number, kind: PnlSnapshotKind, histories: Array<(
    { __typename?: 'TradeHistory' }
    & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
  )> } & { ' $fragmentName'?: 'PnlSnapshotDetailsInfoFragment' };

export type GetTradeHistoriesQueryVariables = Exact<{
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
}>;


export type GetTradeHistoriesQuery = { __typename?: 'Query', getTradeHistories: Array<(
    { __typename?: 'TradeHistory' }
    & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
  )> };

export type GetPnlSnapshotsQueryVariables = Exact<{
  contractId: Scalars['Int']['input'];
  kind: PnlSnapshotKind;
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPnlSnapshotsQuery = { __typename?: 'Query', getPnlSnapshots: { __typename?: 'PnlSnapshotDetailsConnection', edges: Array<{ __typename?: 'PnlSnapshotDetailsEdge', cursor: number, node: (
        { __typename?: 'PnlSnapshotDetails' }
        & { ' $fragmentRefs'?: { 'PnlSnapshotDetailsInfoFragment': PnlSnapshotDetailsInfoFragment } }
      ) }>, pageInfo: { __typename?: 'PageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type InitalizePnlSnapshotMutationVariables = Exact<{ [key: string]: never; }>;


export type InitalizePnlSnapshotMutation = { __typename?: 'Mutation', initalizePnlSnapshot: boolean };

export type PositionInfoFragment = { __typename?: 'Position', id: number, contractId: number, address: string, index: number } & { ' $fragmentName'?: 'PositionInfoFragment' };

export type MissionInfoFragment = { __typename?: 'Mission', id: number, botId: number, targetPositionId: number, achievePositionId?: number | null, status: MissionStatus, createdAt: any, updatedAt: any } & { ' $fragmentName'?: 'MissionInfoFragment' };

export type MissionShallowDetailsInfoFragment = { __typename?: 'MissionShallowDetails', id: number, botId: number, targetPositionId: number, achievePositionId?: number | null, createdAt: any, updatedAt: any, status: MissionStatus, achievePosition?: (
    { __typename?: 'Position' }
    & { ' $fragmentRefs'?: { 'PositionInfoFragment': PositionInfoFragment } }
  ) | null, targetPosition: (
    { __typename?: 'Position' }
    & { ' $fragmentRefs'?: { 'PositionInfoFragment': PositionInfoFragment } }
  ), bot: (
    { __typename?: 'Bot' }
    & { ' $fragmentRefs'?: { 'BotInfoFragment': BotInfoFragment } }
  ) } & { ' $fragmentName'?: 'MissionShallowDetailsInfoFragment' };

export type GetAllMissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMissionsQuery = { __typename?: 'Query', getAllMissions: Array<(
    { __typename?: 'MissionShallowDetails' }
    & { ' $fragmentRefs'?: { 'MissionShallowDetailsInfoFragment': MissionShallowDetailsInfoFragment } }
  )> };

export type CloseMissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CloseMissionMutation = { __typename?: 'Mutation', closeMission: (
    { __typename?: 'MissionShallowDetails' }
    & { ' $fragmentRefs'?: { 'MissionShallowDetailsInfoFragment': MissionShallowDetailsInfoFragment } }
  ) };

export type MissionAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MissionAddedSubscription = { __typename?: 'Subscription', missionAdded: Array<(
    { __typename?: 'MissionShallowDetails' }
    & { ' $fragmentRefs'?: { 'MissionShallowDetailsInfoFragment': MissionShallowDetailsInfoFragment } }
  )> };

export type MissionUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type MissionUpdatedSubscription = { __typename?: 'Subscription', missionUpdated: Array<(
    { __typename?: 'MissionShallowDetails' }
    & { ' $fragmentRefs'?: { 'MissionShallowDetailsInfoFragment': MissionShallowDetailsInfoFragment } }
  )> };

export type StrategyMetadataInfoFragment = { __typename?: 'StrategyMetadata', key: string, title: string, description: string } & { ' $fragmentName'?: 'StrategyMetadataInfoFragment' };

export type StrategyInfoFragment = { __typename?: 'Strategy', id: number, lifeTime: number, maxCapacity: number, minCapacity: number, maxCollateral: number, minCollateral: number, maxLeverage: number, minLeverage: number, collateralBaseline: number, params: string, ratio: number, strategyKey: string } & { ' $fragmentName'?: 'StrategyInfoFragment' };

export type GetAllStrategyMetadataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStrategyMetadataQuery = { __typename?: 'Query', getAllStrategyMetadata: Array<(
    { __typename?: 'StrategyMetadata' }
    & { ' $fragmentRefs'?: { 'StrategyMetadataInfoFragment': StrategyMetadataInfoFragment } }
  )> };

export type GetAllStrategyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStrategyQuery = { __typename?: 'Query', getAllStrategy: Array<(
    { __typename?: 'Strategy' }
    & { ' $fragmentRefs'?: { 'StrategyInfoFragment': StrategyInfoFragment } }
  )> };

export type CreateStrategyMutationVariables = Exact<{
  input: CreateStrategyInput;
}>;


export type CreateStrategyMutation = { __typename?: 'Mutation', createStrategy: (
    { __typename?: 'Strategy' }
    & { ' $fragmentRefs'?: { 'StrategyInfoFragment': StrategyInfoFragment } }
  ) };

export type RemoveStrategyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveStrategyMutation = { __typename?: 'Mutation', removeStrategy: (
    { __typename?: 'Strategy' }
    & { ' $fragmentRefs'?: { 'StrategyInfoFragment': StrategyInfoFragment } }
  ) };

export type TagInfoFragment = { __typename?: 'Tag', tag: string, description: string, color: string } & { ' $fragmentName'?: 'TagInfoFragment' };

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsQuery = { __typename?: 'Query', getAllTags: Array<(
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagInfoFragment': TagInfoFragment } }
  )> };

export type UpsertTagMutationVariables = Exact<{
  input: TagInput;
}>;


export type UpsertTagMutation = { __typename?: 'Mutation', upsertTag: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagInfoFragment': TagInfoFragment } }
  ) };

export type DeleteTagMutationVariables = Exact<{
  tag: Scalars['String']['input'];
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', deleteTag: (
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagInfoFragment': TagInfoFragment } }
  ) };

export type TaskShallowDetailsInfoFragment = { __typename?: 'TaskShallowDetails', id: number, missionId: number, actionId: number, logs: Array<string>, status: TaskStatus, createdAt: any, action: (
    { __typename?: 'Action' }
    & { ' $fragmentRefs'?: { 'ActionInfoFragment': ActionInfoFragment } }
  ), mission: (
    { __typename?: 'Mission' }
    & { ' $fragmentRefs'?: { 'MissionInfoFragment': MissionInfoFragment } }
  ) } & { ' $fragmentName'?: 'TaskShallowDetailsInfoFragment' };

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', getAllTasks: Array<(
    { __typename?: 'TaskShallowDetails' }
    & { ' $fragmentRefs'?: { 'TaskShallowDetailsInfoFragment': TaskShallowDetailsInfoFragment } }
  )> };

export type PerformTaskMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PerformTaskMutation = { __typename?: 'Mutation', performTask: (
    { __typename?: 'TaskShallowDetails' }
    & { ' $fragmentRefs'?: { 'TaskShallowDetailsInfoFragment': TaskShallowDetailsInfoFragment } }
  ) };

export type TaskAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskAddedSubscription = { __typename?: 'Subscription', taskAdded: Array<(
    { __typename?: 'TaskShallowDetails' }
    & { ' $fragmentRefs'?: { 'TaskShallowDetailsInfoFragment': TaskShallowDetailsInfoFragment } }
  )> };

export type TaskUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TaskUpdatedSubscription = { __typename?: 'Subscription', taskUpdated: Array<(
    { __typename?: 'TaskShallowDetails' }
    & { ' $fragmentRefs'?: { 'TaskShallowDetailsInfoFragment': TaskShallowDetailsInfoFragment } }
  )> };

export type UserInfoFragment = { __typename?: 'User', address: string, tags: Array<(
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagInfoFragment': TagInfoFragment } }
  )> } & { ' $fragmentName'?: 'UserInfoFragment' };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserInfoFragment': UserInfoFragment } }
  )> };

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserInfoFragment': UserInfoFragment } }
  ) };

export type AddTagToUserMutationVariables = Exact<{
  input: ChangeUserTagInput;
}>;


export type AddTagToUserMutation = { __typename?: 'Mutation', addTagToUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserInfoFragment': UserInfoFragment } }
  ) };

export type RemoveTagFromUserMutationVariables = Exact<{
  input: ChangeUserTagInput;
}>;


export type RemoveTagFromUserMutation = { __typename?: 'Mutation', removeTagFromUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserInfoFragment': UserInfoFragment } }
  ) };

export const ContractInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ContractInfoFragment, unknown>;
export const FollowerInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<FollowerInfoFragment, unknown>;
export const StrategyInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<StrategyInfoFragment, unknown>;
export const BotDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<BotDetailsInfoFragment, unknown>;
export const FollowerDetailInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcBalance"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}}]}}]} as unknown as DocumentNode<FollowerDetailInfoFragment, unknown>;
export const FollowerActionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}}]}}]} as unknown as DocumentNode<FollowerActionInfoFragment, unknown>;
export const TradeHistoryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<TradeHistoryInfoFragment, unknown>;
export const PnlSnapshotDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<PnlSnapshotDetailsInfoFragment, unknown>;
export const PositionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<PositionInfoFragment, unknown>;
export const BotInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<BotInfoFragment, unknown>;
export const MissionShallowDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<MissionShallowDetailsInfoFragment, unknown>;
export const StrategyMetadataInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyMetadataInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<StrategyMetadataInfoFragment, unknown>;
export const ActionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ActionInfoFragment, unknown>;
export const MissionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MissionInfoFragment, unknown>;
export const TaskShallowDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<TaskShallowDetailsInfoFragment, unknown>;
export const TagInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<TagInfoFragment, unknown>;
export const UserInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<UserInfoFragment, unknown>;
export const GetAllActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<GetAllActionsQuery, GetAllActionsQueryVariables>;
export const ActionAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"actionAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actionAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ActionAddedSubscription, ActionAddedSubscriptionVariables>;
export const GetAllBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllBotsQuery, GetAllBotsQueryVariables>;
export const CreateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}}]} as unknown as DocumentNode<CreateBotMutation, CreateBotMutationVariables>;
export const DeleteBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteBotMutation, DeleteBotMutationVariables>;
export const LiveBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"liveBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}}]} as unknown as DocumentNode<LiveBotMutation, LiveBotMutationVariables>;
export const StopBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}}]} as unknown as DocumentNode<StopBotMutation, StopBotMutationVariables>;
export const GetAllContractsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<GetAllContractsQuery, GetAllContractsQueryVariables>;
export const CreateContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateContractInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<CreateContractMutation, CreateContractMutationVariables>;
export const ChangeContractStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeContractStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeContractStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeContractStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ChangeContractStatusMutation, ChangeContractStatusMutationVariables>;
export const GetAllFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<GetAllFollowersQuery, GetAllFollowersQueryVariables>;
export const GetAllFollowerDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowerDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowerDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerDetailInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcBalance"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}}]}}]} as unknown as DocumentNode<GetAllFollowerDetailsQuery, GetAllFollowerDetailsQueryVariables>;
export const GetFollowerPrivateKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getFollowerPrivateKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetFollowerByAddressInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowerPrivateKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<GetFollowerPrivateKeyQuery, GetFollowerPrivateKeyQueryVariables>;
export const GenerateNewFollowerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generateNewFollower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateNewFollower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<GenerateNewFollowerMutation, GenerateNewFollowerMutationVariables>;
export const WithdrawAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAll"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAll"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAllMutation, WithdrawAllMutationVariables>;
export const FollowerDetailsUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"followerDetailsUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followerDetailsUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerDetailInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcBalance"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}}]}}]} as unknown as DocumentNode<FollowerDetailsUpdatedSubscription, FollowerDetailsUpdatedSubscriptionVariables>;
export const GetAllFollowerActionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}}]}}]} as unknown as DocumentNode<GetAllFollowerActionsQuery, GetAllFollowerActionsQueryVariables>;
export const FollowerActionAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"followerActionAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followerActionAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerAction"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}}]}}]} as unknown as DocumentNode<FollowerActionAddedSubscription, FollowerActionAddedSubscriptionVariables>;
export const GetTradeHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTradeHistories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTradeHistories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<GetTradeHistoriesQuery, GetTradeHistoriesQueryVariables>;
export const GetPnlSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"kind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kind"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"eventName"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}}]} as unknown as DocumentNode<GetPnlSnapshotsQuery, GetPnlSnapshotsQueryVariables>;
export const InitalizePnlSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"initalizePnlSnapshot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initalizePnlSnapshot"}}]}}]} as unknown as DocumentNode<InitalizePnlSnapshotMutation, InitalizePnlSnapshotMutationVariables>;
export const GetAllMissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllMissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllMissionsQuery, GetAllMissionsQueryVariables>;
export const CloseMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"closeMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeMission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotInfo"}}]}}]}}]} as unknown as DocumentNode<CloseMissionMutation, CloseMissionMutationVariables>;
export const MissionAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotInfo"}}]}}]}}]} as unknown as DocumentNode<MissionAddedSubscription, MissionAddedSubscriptionVariables>;
export const MissionUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotInfo"}}]}}]}}]} as unknown as DocumentNode<MissionUpdatedSubscription, MissionUpdatedSubscriptionVariables>;
export const GetAllStrategyMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllStrategyMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStrategyMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyMetadataInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyMetadataInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetAllStrategyMetadataQuery, GetAllStrategyMetadataQueryVariables>;
export const GetAllStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<GetAllStrategyQuery, GetAllStrategyQueryVariables>;
export const CreateStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStrategyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<CreateStrategyMutation, CreateStrategyMutationVariables>;
export const RemoveStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"minCapacity"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<RemoveStrategyMutation, RemoveStrategyMutationVariables>;
export const GetAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const UpsertTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<UpsertTagMutation, UpsertTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const GetAllTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllTasksQuery, GetAllTasksQueryVariables>;
export const PerformTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"performTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}}]}}]} as unknown as DocumentNode<PerformTaskMutation, PerformTaskMutationVariables>;
export const TaskAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}}]}}]} as unknown as DocumentNode<TaskAddedSubscription, TaskAddedSubscriptionVariables>;
export const TaskUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskShallowDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskShallowDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskShallowDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}}]}}]} as unknown as DocumentNode<TaskUpdatedSubscription, TaskUpdatedSubscriptionVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const AddTagToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTagToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeUserTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTagToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<AddTagToUserMutation, AddTagToUserMutationVariables>;
export const RemoveTagFromUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeTagFromUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeUserTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTagFromUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<RemoveTagFromUserMutation, RemoveTagFromUserMutationVariables>;