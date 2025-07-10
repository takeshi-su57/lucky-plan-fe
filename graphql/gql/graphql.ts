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

export type AccPnl = {
  __typename?: 'AccPnl';
  date: Scalars['DateTime']['output'];
  in: Scalars['Float']['output'];
  inOut: Scalars['Float']['output'];
  out: Scalars['Float']['output'];
  pnl: Scalars['Float']['output'];
  positionCount: Scalars['Int']['output'];
  taskCount: Scalars['Int']['output'];
  traderCount: Scalars['Int']['output'];
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String']['output'];
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

export type BotBackwardDetails = {
  __typename?: 'BotBackwardDetails';
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
  plan: Plan;
  planId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: BotStatus;
  strategy: Strategy;
  strategyId: Scalars['Int']['output'];
};

export type BotConnection = {
  __typename?: 'BotConnection';
  edges: Array<BotEdge>;
  pageInfo: BotPageInfo;
};

export type BotCount = {
  __typename?: 'BotCount';
  botCount: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
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
  planId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: BotStatus;
  strategy: Strategy;
  strategyId: Scalars['Int']['output'];
};

export type BotEdge = {
  __typename?: 'BotEdge';
  cursor: Scalars['Int']['output'];
  node: BotForwardDetails;
};

export type BotForwardDetails = {
  __typename?: 'BotForwardDetails';
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
  missions: Array<MissionForwardDetails>;
  planId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: BotStatus;
  strategy: Strategy;
  strategyId: Scalars['Int']['output'];
};

export type BotPageInfo = {
  __typename?: 'BotPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export enum BotStatus {
  Created = 'Created',
  Dead = 'Dead',
  Live = 'Live',
  Stop = 'Stop'
}

export type CancelOrderAfterTimeoutInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
};

export type ChangeUserTagInput = {
  address: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type CloseTradeInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  pairIndex: Scalars['Int']['input'];
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String']['output'];
  backendUrl?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isTestnet: Scalars['Boolean']['output'];
  status: ContractStatus;
};

export type ContractExecutionResult = {
  __typename?: 'ContractExecutionResult';
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export enum ContractStatus {
  Dead = 'Dead',
  Live = 'Live'
}

export type CreateBotAndStrategyInput = {
  followerContractId: Scalars['Int']['input'];
  leaderAddress: Scalars['String']['input'];
  leaderCollateralBaseline: Scalars['Int']['input'];
  leaderContractId: Scalars['Int']['input'];
  planId: Scalars['Int']['input'];
  strategy: CreateStrategyInput;
};

export type CreateBotInput = {
  followerAddress: Scalars['String']['input'];
  followerContractId: Scalars['Int']['input'];
  leaderAddress: Scalars['String']['input'];
  leaderCollateralBaseline: Scalars['Int']['input'];
  leaderContractId: Scalars['Int']['input'];
  planId: Scalars['Int']['input'];
  strategyId: Scalars['Int']['input'];
};

export type CreatePlanInput = {
  description: Scalars['String']['input'];
  scheduledEnd: Scalars['DateTime']['input'];
  scheduledStart: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type CreateStrategyInput = {
  collateralBaseline: Scalars['Int']['input'];
  lifeTime: Scalars['Float']['input'];
  maxCollateral: Scalars['Float']['input'];
  maxLeverage: Scalars['Int']['input'];
  minCollateral: Scalars['Float']['input'];
  minLeverage: Scalars['Int']['input'];
  params: Scalars['String']['input'];
  ratio: Scalars['Float']['input'];
  strategyKey: Scalars['String']['input'];
};

export type ExpertPnlSnapshot = {
  __typename?: 'ExpertPnlSnapshot';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  avgDuration: Scalars['Float']['output'];
  avgPnlRatio: Scalars['Float']['output'];
  contractId: Scalars['Int']['output'];
  dateStr: Scalars['String']['output'];
  histories: Array<TradeHistory>;
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
  maxSize: Scalars['Float']['output'];
  openedPositions: Scalars['Int']['output'];
  ratio: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
};

export type ExportFilter = {
  closePositionCountsByPnlSnapshotKind: Scalars['String']['input'];
  maxR2: Scalars['Float']['input'];
  maxSlope: Scalars['Float']['input'];
  minR2: Scalars['Float']['input'];
  minSlope: Scalars['Float']['input'];
  recentTradedDays: Scalars['Int']['input'];
};

export type ExportFilterV2 = {
  maxSlope: Scalars['Float']['input'];
  minSlope: Scalars['Float']['input'];
  r2MinsByPnlSnapshotKind: Scalars['String']['input'];
};

export type ExportFilterV3 = {
  maxCount: Scalars['Float']['input'];
  maxSize: Scalars['Float']['input'];
  minCount: Scalars['Float']['input'];
  minR2: Scalars['Float']['input'];
  minSize: Scalars['Float']['input'];
};

export type ExportFilterV5 = {
  m: Scalars['Float']['input'];
  maxAvgSize: Scalars['Int']['input'];
  maxCount: Scalars['Int']['input'];
  minAvgSize: Scalars['Int']['input'];
  minCount: Scalars['Int']['input'];
  minR2: Scalars['Float']['input'];
  minScore: Scalars['Float']['input'];
  n: Scalars['Float']['input'];
  ratio: Scalars['Float']['input'];
  window: Scalars['Int']['input'];
};

export type Follower = {
  __typename?: 'Follower';
  accountIndex: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type FollowerActionDetails = {
  __typename?: 'FollowerActionDetails';
  action: Action;
  actionId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  taskId: Scalars['Int']['output'];
};

export type FollowerConnection = {
  __typename?: 'FollowerConnection';
  edges: Array<FollowerEdge>;
  pageInfo: FollowerPageInfo;
};

export type FollowerDetail = {
  __typename?: 'FollowerDetail';
  accountIndex: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  ethBalance?: Maybe<Scalars['String']['output']>;
  pendingOrders: Array<FollowerPendingOrder>;
  pnlSnapshots: Array<PnlSnapshot>;
  publicKey: Scalars['String']['output'];
  trades: Array<FollowerTrade>;
  usdcBalance?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type FollowerEdge = {
  __typename?: 'FollowerEdge';
  cursor: Scalars['Int']['output'];
  node: FollowerDetail;
};

export type FollowerPageInfo = {
  __typename?: 'FollowerPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type FollowerPendingOrder = {
  __typename?: 'FollowerPendingOrder';
  address: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  params: Scalars['String']['output'];
};

export type FollowerTrade = {
  __typename?: 'FollowerTrade';
  address: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  mission?: Maybe<Mission>;
  params: Scalars['String']['output'];
};

export type GetUserByAddressInput = {
  address: Scalars['String']['input'];
};

export type GetUserTransactionCountsInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  endedAt?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Log = {
  __typename?: 'Log';
  checked: Scalars['Boolean']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  severity: LogSeverity;
  summary: Scalars['String']['output'];
  timestamp: Scalars['DateTime']['output'];
};

export enum LogSeverity {
  Alert = 'Alert',
  Critical = 'Critical',
  Debug = 'Debug',
  Default = 'Default',
  Emergency = 'Emergency',
  Error = 'Error',
  Info = 'Info',
  Notice = 'Notice',
  Warning = 'Warning'
}

export type LogsConnection = {
  __typename?: 'LogsConnection';
  edges: Array<LogsEdge>;
  pageInfo: LogsPageInfo;
};

export type LogsEdge = {
  __typename?: 'LogsEdge';
  cursor: Scalars['Int']['output'];
  node: Log;
};

export type LogsPageInfo = {
  __typename?: 'LogsPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
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

export type MissionBackwardDetails = {
  __typename?: 'MissionBackwardDetails';
  achievePosition?: Maybe<Position>;
  achievePositionId?: Maybe<Scalars['Int']['output']>;
  bot: BotBackwardDetails;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  status: MissionStatus;
  targetPosition: Position;
  targetPositionId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MissionForwardDetails = {
  __typename?: 'MissionForwardDetails';
  achievePosition?: Maybe<Position>;
  achievePositionId?: Maybe<Scalars['Int']['output']>;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  status: MissionStatus;
  targetPosition: Position;
  targetPositionId: Scalars['Int']['output'];
  tasks: Array<TaskForwardDetails>;
  updatedAt: Scalars['DateTime']['output'];
};

export type MissionShallowBackwardDetails = {
  __typename?: 'MissionShallowBackwardDetails';
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

export enum MissionStatus {
  Closed = 'Closed',
  Closing = 'Closing',
  Created = 'Created',
  Ignored = 'Ignored',
  Opened = 'Opened',
  Opening = 'Opening'
}

export type Mutation = {
  __typename?: 'Mutation';
  addTagToWalletAccount: WalletAccount;
  addToBlacklist: Scalars['Boolean']['output'];
  addToWhitelist: Scalars['Boolean']['output'];
  addWalletAccount: WalletAccount;
  allowAuto: User;
  autoTestingV4: Scalars['Boolean']['output'];
  autoTestingV5: Scalars['Boolean']['output'];
  batchCreateBots: Array<BotBackwardDetails>;
  buildPnlSnapshots?: Maybe<PnlSnapshotInitializedFlag>;
  cancelOrderAfterTimeout: ContractExecutionResult;
  changePassword: Scalars['Boolean']['output'];
  changeUserPermission: User;
  checkLog: Log;
  cloneMission: Scalars['Boolean']['output'];
  closeMission: Scalars['Boolean']['output'];
  closeTradeMarket: ContractExecutionResult;
  createAutoPlan: Scalars['Boolean']['output'];
  createBot: BotBackwardDetails;
  createPlan: Plan;
  deleteBot: BotBackwardDetails;
  deleteCategory: TagCategory;
  deletePlan: Scalars['Int']['output'];
  deleteTag: Tag;
  dynamicSnapshotBuild?: Maybe<PnlSnapshotInitializedFlag>;
  endPlan: Scalars['Boolean']['output'];
  generateNewFollower: Follower;
  getToken: AccessToken;
  ignoreMission: Scalars['Boolean']['output'];
  initializePnlSnapshot: Scalars['Boolean']['output'];
  liveBot: Scalars['Boolean']['output'];
  makeSafeApp: Scalars['Boolean']['output'];
  pauseSystem: Scalars['Boolean']['output'];
  performTask: Scalars['Boolean']['output'];
  removeFromBlacklist: Scalars['Boolean']['output'];
  removeFromWhitelist: Scalars['Boolean']['output'];
  removeTagFromWalletAccount: WalletAccount;
  resumeSystem: Scalars['Boolean']['output'];
  startPlan: Scalars['Boolean']['output'];
  stopBot: Scalars['Boolean']['output'];
  stopTask: Scalars['Boolean']['output'];
  updatePlan: Plan;
  upgradeSystem: Scalars['Boolean']['output'];
  upsertCategory: TagCategory;
  upsertTag: Tag;
  withdrawAllETH: Scalars['Boolean']['output'];
  withdrawAllUSDC: Scalars['Boolean']['output'];
  withdrawETHToUser: Scalars['Boolean']['output'];
  withdrawUSDCToUser: Scalars['Boolean']['output'];
};


export type MutationAddTagToWalletAccountArgs = {
  input: ChangeUserTagInput;
};


export type MutationAddToBlacklistArgs = {
  address: Scalars['String']['input'];
};


export type MutationAddToWhitelistArgs = {
  params: Scalars['String']['input'];
};


export type MutationAddWalletAccountArgs = {
  input: AddUserInput;
};


export type MutationAllowAutoArgs = {
  address: Scalars['String']['input'];
  allowAuto: Scalars['Boolean']['input'];
  budget: Scalars['Float']['input'];
  followerContractId: Scalars['Int']['input'];
  ratio: Scalars['Float']['input'];
};


export type MutationAutoTestingV4Args = {
  startDate: Scalars['String']['input'];
};


export type MutationBatchCreateBotsArgs = {
  input: Array<CreateBotAndStrategyInput>;
};


export type MutationBuildPnlSnapshotsArgs = {
  dateStr: Scalars['String']['input'];
  isForceBuild: Scalars['Boolean']['input'];
};


export type MutationCancelOrderAfterTimeoutArgs = {
  input: CancelOrderAfterTimeoutInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationChangeUserPermissionArgs = {
  address: Scalars['String']['input'];
  permission: Scalars['String']['input'];
};


export type MutationCheckLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCloneMissionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCloseMissionArgs = {
  id: Scalars['Int']['input'];
  isForce: Scalars['Boolean']['input'];
};


export type MutationCloseTradeMarketArgs = {
  input: CloseTradeInput;
};


export type MutationCreateBotArgs = {
  input: CreateBotInput;
};


export type MutationCreatePlanArgs = {
  createPlanInput: CreatePlanInput;
};


export type MutationDeleteBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteTagArgs = {
  tag: Scalars['String']['input'];
};


export type MutationDynamicSnapshotBuildArgs = {
  dateStr: Scalars['String']['input'];
};


export type MutationEndPlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationGetTokenArgs = {
  signature: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
};


export type MutationIgnoreMissionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationInitializePnlSnapshotArgs = {
  beginingDate: Scalars['DateTime']['input'];
  isForceBuild: Scalars['Boolean']['input'];
};


export type MutationLiveBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationMakeSafeAppArgs = {
  password: Scalars['String']['input'];
};


export type MutationPerformTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveFromBlacklistArgs = {
  address: Scalars['String']['input'];
};


export type MutationRemoveFromWhitelistArgs = {
  address: Scalars['String']['input'];
};


export type MutationRemoveTagFromWalletAccountArgs = {
  input: ChangeUserTagInput;
};


export type MutationResumeSystemArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationStartPlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationStopBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationStopTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdatePlanArgs = {
  updatePlanInput: UpdatePlanInput;
};


export type MutationUpsertCategoryArgs = {
  input: TagCategoryInput;
};


export type MutationUpsertTagArgs = {
  input: TagInput;
};


export type MutationWithdrawAllEthArgs = {
  input: WithdrawAllInput;
};


export type MutationWithdrawAllUsdcArgs = {
  input: WithdrawAllInput;
};


export type MutationWithdrawEthToUserArgs = {
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};


export type MutationWithdrawUsdcToUserArgs = {
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};

export type Plan = {
  __typename?: 'Plan';
  description: Scalars['String']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  scheduledEnd: Scalars['DateTime']['output'];
  scheduledStart: Scalars['DateTime']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: PlanStatus;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type PlanConnection = {
  __typename?: 'PlanConnection';
  edges: Array<PlanEdge>;
  pageInfo: PlanPageInfo;
};

export type PlanEdge = {
  __typename?: 'PlanEdge';
  cursor: Scalars['Int']['output'];
  node: PlanForwardDetails;
};

export type PlanForwardDetails = {
  __typename?: 'PlanForwardDetails';
  bots: Array<BotForwardDetails>;
  description: Scalars['String']['output'];
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  scheduledEnd: Scalars['DateTime']['output'];
  scheduledStart: Scalars['DateTime']['output'];
  startedAt?: Maybe<Scalars['DateTime']['output']>;
  status: PlanStatus;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type PlanPageInfo = {
  __typename?: 'PlanPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export enum PlanStatus {
  Created = 'Created',
  Finished = 'Finished',
  Started = 'Started',
  Stopped = 'Stopped'
}

export type PnlSnapshot = {
  __typename?: 'PnlSnapshot';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  dateStr: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
};

export type PnlSnapshotDetails = {
  __typename?: 'PnlSnapshotDetails';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  dateStr: Scalars['String']['output'];
  histories: Array<TradeHistory>;
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
};

export type PnlSnapshotDetailsConnection = {
  __typename?: 'PnlSnapshotDetailsConnection';
  edges: Array<PnlSnapshotDetailsEdge>;
  pageInfo: PnlSnapshotDetailsPageInfo;
};

export type PnlSnapshotDetailsEdge = {
  __typename?: 'PnlSnapshotDetailsEdge';
  cursor: Scalars['Int']['output'];
  node: PnlSnapshotDetails;
};

export type PnlSnapshotDetailsPageInfo = {
  __typename?: 'PnlSnapshotDetailsPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type PnlSnapshotDevDetails = {
  __typename?: 'PnlSnapshotDevDetails';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  dateStr: Scalars['String']['output'];
  histories: Array<TradeHistory>;
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
  regression: Regression;
  statistic: Statistic;
};

export type PnlSnapshotDevDetailsV5 = {
  __typename?: 'PnlSnapshotDevDetailsV5';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  dateStr: Scalars['String']['output'];
  histories: Array<TradeHistory>;
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
  score: Scalars['Float']['output'];
};

export type PnlSnapshotInitializedFlag = {
  __typename?: 'PnlSnapshotInitializedFlag';
  dateStr: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isInit: Scalars['Boolean']['output'];
};

export enum PnlSnapshotKind {
  AllTime = 'ALL_TIME',
  Day = 'DAY',
  Month = 'MONTH',
  ThreeMonth = 'THREE_MONTH',
  Week = 'WEEK'
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
  allLogs: LogsConnection;
  findContract: Contract;
  findStrategy?: Maybe<Strategy>;
  findStrategyMetadata: StrategyMetadata;
  getActiveBots: Array<BotForwardDetails>;
  getAlertTasks: Array<TaskBackwardDetails>;
  getAllCategories: Array<TagCategory>;
  getAllContracts: Array<Contract>;
  getAllFollowerDetails: FollowerConnection;
  getAllFollowers: Array<Follower>;
  getAllStrategy: Array<Strategy>;
  getAllStrategyMetadata: Array<StrategyMetadata>;
  getAllTags: Array<Tag>;
  getAllUsers: Array<User>;
  getAllWalletAccounts: Array<WalletAccount>;
  getBlacklist?: Maybe<Array<Scalars['String']['output']>>;
  getBotsByStatus: BotConnection;
  getDevPnlSnapshots: Array<PnlSnapshotDevDetails>;
  getDevPnlSnapshotsV4: Array<PnlSnapshotDevDetails>;
  getDevPnlSnapshotsV5: Array<PnlSnapshotDevDetailsV5>;
  getExpertPnlSnapshots: Array<ExpertPnlSnapshot>;
  getLogsSeverityCounts: Array<SeverityCount>;
  getMonthlyDevPnlSnapshots: Array<TradeHistory>;
  getPlanById?: Maybe<PlanForwardDetails>;
  getPlansByStatus: PlanConnection;
  getPnlSnapshotInitializedFlag: Array<PnlSnapshotInitializedFlag>;
  getPnlSnapshots: PnlSnapshotDetailsConnection;
  getPnlSnapshotsByAddress: Array<PnlSnapshot>;
  getServerTime: ServerTime;
  getTestingReport: TestingReportConnection;
  getTestingReportV2: TestingReportV2Connection;
  getTestingReportV3: TestingReportV3Connection;
  getTestingReportV4: TestingReportV3Connection;
  getTestingReportV5: TestingReportV5Connection;
  getTradeCollaterals: Array<TradeCollateral>;
  getTradeHistories: Array<TradeHistory>;
  getTradePairs: Array<TradePair>;
  getTradeTransactionCounts: TradeTransactionCount;
  getUserTransactionCounts: Array<TradeTransactionCount>;
  getWalletAccountByAddress: WalletAccount;
  getWhitelist?: Maybe<Array<Scalars['String']['output']>>;
  getWholeCompressedHistories: WholeCompressedHistories;
  getWholeCompressedHistoriesV2: WholeCompressedHistories;
  getWholeCompressedHistoriesV3: WholeCompressedHistories;
  getWholeCompressedHistoriesV4: WholeCompressedHistories;
  getWholeCompressedHistoriesV5: WholeCompressedHistories;
  getWholeResultHistories: Array<TradeHistory>;
  isPnlSnapshotInitialized?: Maybe<PnlSnapshotInitializedFlag>;
  isSafeApp: Scalars['Boolean']['output'];
  systemStatus: Scalars['Boolean']['output'];
};


export type QueryAllLogsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  checked: Scalars['Boolean']['input'];
  first: Scalars['Int']['input'];
  severity?: InputMaybe<LogSeverity>;
};


export type QueryFindContractArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindStrategyArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindStrategyMetadataArgs = {
  key: Scalars['String']['input'];
};


export type QueryGetAllFollowerDetailsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  contractId: Scalars['Int']['input'];
  first: Scalars['Int']['input'];
};


export type QueryGetBotsByStatusArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  status: BotStatus;
};


export type QueryGetDevPnlSnapshotsArgs = {
  dateStr: Scalars['String']['input'];
  filterParams: ExportFilter;
};


export type QueryGetDevPnlSnapshotsV4Args = {
  dateStr: Scalars['String']['input'];
  filterParams: Array<ExportFilterV3>;
  ratio: Scalars['Float']['input'];
};


export type QueryGetDevPnlSnapshotsV5Args = {
  dateStr: Scalars['String']['input'];
  filterParams: Array<ExportFilterV5>;
};


export type QueryGetMonthlyDevPnlSnapshotsArgs = {
  dateStr: Scalars['String']['input'];
  filterParams: ExportFilter;
};


export type QueryGetPlanByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPlansByStatusArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  status: PlanStatus;
};


export type QueryGetPnlSnapshotsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  dateStr: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  kind: PnlSnapshotKind;
};


export type QueryGetPnlSnapshotsByAddressArgs = {
  address: Scalars['String']['input'];
  dateStr: Scalars['String']['input'];
};


export type QueryGetTestingReportArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryGetTestingReportV2Args = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryGetTestingReportV3Args = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryGetTestingReportV4Args = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryGetTestingReportV5Args = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryGetTradeCollateralsArgs = {
  contractId: Scalars['Int']['input'];
};


export type QueryGetTradeHistoriesArgs = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
};


export type QueryGetTradePairsArgs = {
  contractId: Array<Scalars['Int']['input']>;
};


export type QueryGetTradeTransactionCountsArgs = {
  addresses: Array<Scalars['String']['input']>;
  contractIds: Array<Scalars['Int']['input']>;
};


export type QueryGetUserTransactionCountsArgs = {
  inputs: Array<GetUserTransactionCountsInput>;
};


export type QueryGetWalletAccountByAddressArgs = {
  input: GetUserByAddressInput;
};


export type QueryGetWholeCompressedHistoriesArgs = {
  filterParams: ExportFilter;
};


export type QueryGetWholeCompressedHistoriesV2Args = {
  filterParams: Array<ExportFilterV2>;
};


export type QueryGetWholeCompressedHistoriesV3Args = {
  filterParams: Array<ExportFilterV3>;
};


export type QueryGetWholeCompressedHistoriesV4Args = {
  filterParams: Array<ExportFilterV3>;
  isTestnet: Scalars['Boolean']['input'];
  ratio: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
};


export type QueryGetWholeCompressedHistoriesV5Args = {
  filterParams: Array<ExportFilterV5>;
  isTestnet: Scalars['Boolean']['input'];
  startDate: Scalars['String']['input'];
};


export type QueryGetWholeResultHistoriesArgs = {
  filterParams: ExportFilter;
};


export type QueryIsPnlSnapshotInitializedArgs = {
  dateStr: Scalars['String']['input'];
};

export type Regression = {
  __typename?: 'Regression';
  chi2: Scalars['Float']['output'];
  intercept: Scalars['Float']['output'];
  r: Scalars['Float']['output'];
  r2: Scalars['Float']['output'];
  rmsd: Scalars['Float']['output'];
  slope: Scalars['Float']['output'];
};

export type ServerTime = {
  __typename?: 'ServerTime';
  timestamp: Scalars['Float']['output'];
  timezone: Scalars['String']['output'];
};

export type SeverityCount = {
  __typename?: 'SeverityCount';
  counts: Scalars['Int']['output'];
  severity: LogSeverity;
};

export type Statistic = {
  __typename?: 'Statistic';
  averageIn: Scalars['Float']['output'];
  countIn: Scalars['Int']['output'];
};

export type Strategy = {
  __typename?: 'Strategy';
  collateralBaseline: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lifeTime: Scalars['Int']['output'];
  maxCollateral: Scalars['Int']['output'];
  maxLeverage: Scalars['Int']['output'];
  minCollateral: Scalars['Int']['output'];
  minLeverage: Scalars['Int']['output'];
  params: Scalars['String']['output'];
  ratio: Scalars['Float']['output'];
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
  botCreated: Array<BotBackwardDetails>;
  botUpdated: Array<BotBackwardDetails>;
  missionCreated: Array<MissionBackwardDetails>;
  missionUpdated: Array<MissionBackwardDetails>;
  newLog: Log;
  planCreated: Plan;
  planUpdated: Plan;
  taskCreated: Array<TaskBackwardDetails>;
  taskUpdated: Array<TaskBackwardDetails>;
};


export type SubscriptionBotCreatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionBotUpdatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionMissionCreatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionMissionUpdatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionNewLogArgs = {
  checked: Scalars['Boolean']['input'];
  severity?: InputMaybe<LogSeverity>;
};


export type SubscriptionPlanCreatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionPlanUpdatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionTaskCreatedArgs = {
  userId: Scalars['String']['input'];
};


export type SubscriptionTaskUpdatedArgs = {
  userId: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  categoryId?: Maybe<Scalars['Int']['output']>;
  color: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  tag: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type TagCategory = {
  __typename?: 'TagCategory';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  userId: Scalars['String']['output'];
};

export type TagCategoryInput = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
};

export type TagInput = {
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  color: Scalars['String']['input'];
  description: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type TaskBackwardDetails = {
  __typename?: 'TaskBackwardDetails';
  action: Action;
  actionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  followerActions: Array<FollowerActionDetails>;
  id: Scalars['Int']['output'];
  logs: Array<Scalars['String']['output']>;
  mission: MissionBackwardDetails;
  missionId: Scalars['Int']['output'];
  status: TaskStatus;
};

export type TaskForwardDetails = {
  __typename?: 'TaskForwardDetails';
  action: Action;
  actionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  followerActions: Array<FollowerActionDetails>;
  id: Scalars['Int']['output'];
  logs: Array<Scalars['String']['output']>;
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

export type TestingReport = {
  __typename?: 'TestingReport';
  avgLoss: Scalars['Float']['output'];
  avgProfit: Scalars['Float']['output'];
  bottomAccProfit: Scalars['Float']['output'];
  calculatedR2: Scalars['Float']['output'];
  calculatedSlope: Scalars['Float']['output'];
  closePositionCountsByPnlSnapshotKind: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  investedUSD: Scalars['Float']['output'];
  lossCount: Scalars['Int']['output'];
  maxLoss: Scalars['Float']['output'];
  maxProfit: Scalars['Float']['output'];
  maxR2: Scalars['Float']['output'];
  maxSlope: Scalars['Int']['output'];
  minR2: Scalars['Float']['output'];
  minSlope: Scalars['Int']['output'];
  peakAccProfit: Scalars['Float']['output'];
  profitCount: Scalars['Int']['output'];
  recentTradedDays: Scalars['Int']['output'];
  totalPositions: Scalars['Int']['output'];
  totalTasks: Scalars['Int']['output'];
  totalTraders: Scalars['Int']['output'];
  totalUSDPnl: Scalars['Float']['output'];
  totalUniqueTraders: Scalars['Int']['output'];
  usdPnls: Array<Scalars['Float']['output']>;
};

export type TestingReportConnection = {
  __typename?: 'TestingReportConnection';
  edges: Array<TestingReportEdge>;
  pageInfo: TestingReportPageInfo;
};

export type TestingReportEdge = {
  __typename?: 'TestingReportEdge';
  cursor: Scalars['Int']['output'];
  node: TestingReport;
};

export type TestingReportPageInfo = {
  __typename?: 'TestingReportPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type TestingReportV2 = {
  __typename?: 'TestingReportV2';
  avgLoss: Scalars['Float']['output'];
  avgProfit: Scalars['Float']['output'];
  bottomAccProfit: Scalars['Float']['output'];
  calculatedR2: Scalars['Float']['output'];
  calculatedSlope: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  investedUSD: Scalars['Float']['output'];
  lossCount: Scalars['Int']['output'];
  maxLoss: Scalars['Float']['output'];
  maxProfit: Scalars['Float']['output'];
  maxSlope: Scalars['Int']['output'];
  minSlope: Scalars['Int']['output'];
  peakAccProfit: Scalars['Float']['output'];
  profitCount: Scalars['Int']['output'];
  r2MinsByPnlSnapshotKind: Scalars['String']['output'];
  totalPositions: Scalars['Int']['output'];
  totalTasks: Scalars['Int']['output'];
  totalTraders: Scalars['Int']['output'];
  totalUSDPnl: Scalars['Float']['output'];
  totalUniqueTraders: Scalars['Int']['output'];
  usdPnls: Array<Scalars['Float']['output']>;
};

export type TestingReportV2Connection = {
  __typename?: 'TestingReportV2Connection';
  edges: Array<TestingReportV2Edge>;
  pageInfo: TestingReportV2PageInfo;
};

export type TestingReportV2Edge = {
  __typename?: 'TestingReportV2Edge';
  cursor: Scalars['Int']['output'];
  node: TestingReportV2;
};

export type TestingReportV2PageInfo = {
  __typename?: 'TestingReportV2PageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type TestingReportV3 = {
  __typename?: 'TestingReportV3';
  avgLoss: Scalars['Float']['output'];
  avgProfit: Scalars['Float']['output'];
  bottomAccProfit: Scalars['Float']['output'];
  calculatedR2: Scalars['Float']['output'];
  calculatedSlope: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  investedUSD: Scalars['Float']['output'];
  lossCount: Scalars['Int']['output'];
  maxCount: Scalars['Int']['output'];
  maxLoss: Scalars['Float']['output'];
  maxProfit: Scalars['Float']['output'];
  maxSize: Scalars['Int']['output'];
  minCount: Scalars['Int']['output'];
  minR2: Scalars['String']['output'];
  minSize: Scalars['Int']['output'];
  peakAccProfit: Scalars['Float']['output'];
  profitCount: Scalars['Int']['output'];
  totalPositions: Scalars['Int']['output'];
  totalTasks: Scalars['Int']['output'];
  totalTraders: Scalars['Int']['output'];
  totalUSDPnl: Scalars['Float']['output'];
  totalUniqueTraders: Scalars['Int']['output'];
  usdPnls: Array<Scalars['Float']['output']>;
};

export type TestingReportV3Connection = {
  __typename?: 'TestingReportV3Connection';
  edges: Array<TestingReportV3Edge>;
  pageInfo: TestingReportV3PageInfo;
};

export type TestingReportV3Edge = {
  __typename?: 'TestingReportV3Edge';
  cursor: Scalars['Int']['output'];
  node: TestingReportV3;
};

export type TestingReportV3PageInfo = {
  __typename?: 'TestingReportV3PageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type TestingReportV5 = {
  __typename?: 'TestingReportV5';
  allTimeWeight: Scalars['Int']['output'];
  avgLoss: Scalars['Float']['output'];
  avgProfit: Scalars['Float']['output'];
  bottomAccProfit: Scalars['Float']['output'];
  calculatedR2: Scalars['Float']['output'];
  calculatedSlope: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  investedUSD: Scalars['Float']['output'];
  lossCount: Scalars['Int']['output'];
  m: Scalars['Int']['output'];
  maxAvgSize: Scalars['Int']['output'];
  maxCount: Scalars['Int']['output'];
  maxLoss: Scalars['Float']['output'];
  maxProfit: Scalars['Float']['output'];
  minAvgSize: Scalars['Int']['output'];
  minCount: Scalars['Int']['output'];
  minR2: Scalars['Float']['output'];
  minScore: Scalars['Float']['output'];
  monthWeight: Scalars['Int']['output'];
  n: Scalars['Int']['output'];
  peakAccProfit: Scalars['Float']['output'];
  profitCount: Scalars['Int']['output'];
  threeMonthWeight: Scalars['Int']['output'];
  totalPositions: Scalars['Int']['output'];
  totalTasks: Scalars['Int']['output'];
  totalTraders: Scalars['Int']['output'];
  totalUSDPnl: Scalars['Float']['output'];
  totalUniqueTraders: Scalars['Int']['output'];
  usdPnls: Array<Scalars['Float']['output']>;
  weekWeight: Scalars['Int']['output'];
  window: Scalars['Int']['output'];
};

export type TestingReportV5Connection = {
  __typename?: 'TestingReportV5Connection';
  edges: Array<TestingReportV5Edge>;
  pageInfo: TestingReportV5PageInfo;
};

export type TestingReportV5Edge = {
  __typename?: 'TestingReportV5Edge';
  cursor: Scalars['Int']['output'];
  node: TestingReportV5;
};

export type TestingReportV5PageInfo = {
  __typename?: 'TestingReportV5PageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type TotalBot = {
  __typename?: 'TotalBot';
  address: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  dateStr: Scalars['String']['output'];
};

export enum TradeActionType {
  TradeClosedLiq = 'TradeClosedLIQ',
  TradeClosedMarket = 'TradeClosedMarket',
  TradeClosedSl = 'TradeClosedSL',
  TradeClosedTp = 'TradeClosedTP',
  TradeLeverageUpdate = 'TradeLeverageUpdate',
  TradeOpenedLimit = 'TradeOpenedLimit',
  TradeOpenedMarket = 'TradeOpenedMarket',
  TradePosSizeDecrease = 'TradePosSizeDecrease',
  TradePosSizeIncrease = 'TradePosSizeIncrease'
}

export type TradeCollateral = {
  __typename?: 'TradeCollateral';
  collateral: Scalars['String']['output'];
  collateralIndex: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  precision: Scalars['String']['output'];
  precisionDelta: Scalars['String']['output'];
};

export type TradeHistory = {
  __typename?: 'TradeHistory';
  action: TradeActionType;
  address: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  collateralDelta?: Maybe<Scalars['String']['output']>;
  collateralIndex: Scalars['Int']['output'];
  collateralPriceUsd: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  date: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  leverage: Scalars['Int']['output'];
  leverageDelta?: Maybe<Scalars['Int']['output']>;
  long: Scalars['Int']['output'];
  marketPrice?: Maybe<Scalars['String']['output']>;
  pair: Scalars['String']['output'];
  pnl: Scalars['String']['output'];
  price: Scalars['String']['output'];
  size: Scalars['String']['output'];
  tradeId?: Maybe<Scalars['String']['output']>;
  tradeIndex: Scalars['Int']['output'];
};

export type TradePair = {
  __typename?: 'TradePair';
  contractId: Scalars['Int']['output'];
  from: Scalars['String']['output'];
  onePercentDepthAboveUsd: Scalars['String']['output'];
  onePercentDepthBelowUsd: Scalars['String']['output'];
  pairIndex: Scalars['Int']['output'];
  to: Scalars['String']['output'];
};

export type TradeTransactionCount = {
  __typename?: 'TradeTransactionCount';
  daily: Scalars['Int']['output'];
  monthly: Scalars['Int']['output'];
  weekly: Scalars['Int']['output'];
};

export type UpdatePlanInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endedAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Int']['input'];
  scheduledEnd?: InputMaybe<Scalars['DateTime']['input']>;
  scheduledStart?: InputMaybe<Scalars['DateTime']['input']>;
  startedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status: PlanStatus;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  allowAuto: Scalars['Boolean']['output'];
  budget: Scalars['Float']['output'];
  followerContractId: Scalars['Int']['output'];
  permission: UserPermission;
  ratio: Scalars['Float']['output'];
};

export enum UserPermission {
  Admin = 'Admin',
  Trader = 'Trader',
  Trial = 'Trial'
}

export type WalletAccount = {
  __typename?: 'WalletAccount';
  address: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  tags: Array<Tag>;
  userId: Scalars['String']['output'];
};

export type WholeCompressedHistories = {
  __typename?: 'WholeCompressedHistories';
  accPnls: Array<AccPnl>;
  actionTypeCount?: Maybe<Scalars['String']['output']>;
  botCounts: Array<BotCount>;
  maxInvested: Scalars['Float']['output'];
  totalBots: Array<TotalBot>;
  uniqueTraders?: Maybe<Array<Scalars['String']['output']>>;
};

export type WithdrawAllInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
};

export type BotDetailsInfoFragment = { __typename?: 'BotDetails', id: number, leaderAddress: string, followerAddress: string, strategyId: number, planId: number, leaderContractId: number, leaderCollateralBaseline: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus, followerContract: (
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

export type BotForwardDetailsInfoFragment = { __typename?: 'BotForwardDetails', id: number, leaderAddress: string, followerAddress: string, strategyId: number, planId: number, leaderContractId: number, leaderCollateralBaseline: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus, followerContract: (
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
  ), missions: Array<(
    { __typename?: 'MissionForwardDetails' }
    & { ' $fragmentRefs'?: { 'MissionForwardDetailsInfoFragment': MissionForwardDetailsInfoFragment } }
  )> } & { ' $fragmentName'?: 'BotForwardDetailsInfoFragment' };

export type BotBackwardDetailsInfoFragment = { __typename?: 'BotBackwardDetails', id: number, leaderAddress: string, followerAddress: string, strategyId: number, planId: number, leaderContractId: number, leaderCollateralBaseline: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus, followerContract: (
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
  ), plan: (
    { __typename?: 'Plan' }
    & { ' $fragmentRefs'?: { 'PlanInfoFragment': PlanInfoFragment } }
  ) } & { ' $fragmentName'?: 'BotBackwardDetailsInfoFragment' };

export type GetBotsByStatusQueryVariables = Exact<{
  status: BotStatus;
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetBotsByStatusQuery = { __typename?: 'Query', getBotsByStatus: { __typename?: 'BotConnection', edges: Array<{ __typename?: 'BotEdge', cursor: number, node: (
        { __typename?: 'BotForwardDetails' }
        & { ' $fragmentRefs'?: { 'BotForwardDetailsInfoFragment': BotForwardDetailsInfoFragment } }
      ) }>, pageInfo: { __typename?: 'BotPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetActiveBotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveBotsQuery = { __typename?: 'Query', getActiveBots: Array<(
    { __typename?: 'BotForwardDetails' }
    & { ' $fragmentRefs'?: { 'BotForwardDetailsInfoFragment': BotForwardDetailsInfoFragment } }
  )> };

export type CreateBotMutationVariables = Exact<{
  input: CreateBotInput;
}>;


export type CreateBotMutation = { __typename?: 'Mutation', createBot: (
    { __typename?: 'BotBackwardDetails' }
    & { ' $fragmentRefs'?: { 'BotBackwardDetailsInfoFragment': BotBackwardDetailsInfoFragment } }
  ) };

export type BatchCreateBotsMutationVariables = Exact<{
  input: Array<CreateBotAndStrategyInput> | CreateBotAndStrategyInput;
}>;


export type BatchCreateBotsMutation = { __typename?: 'Mutation', batchCreateBots: Array<(
    { __typename?: 'BotBackwardDetails' }
    & { ' $fragmentRefs'?: { 'BotBackwardDetailsInfoFragment': BotBackwardDetailsInfoFragment } }
  )> };

export type DeleteBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteBotMutation = { __typename?: 'Mutation', deleteBot: (
    { __typename?: 'BotBackwardDetails' }
    & { ' $fragmentRefs'?: { 'BotBackwardDetailsInfoFragment': BotBackwardDetailsInfoFragment } }
  ) };

export type LiveBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type LiveBotMutation = { __typename?: 'Mutation', liveBot: boolean };

export type StopBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type StopBotMutation = { __typename?: 'Mutation', stopBot: boolean };

export type BotCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type BotCreatedSubscription = { __typename?: 'Subscription', botCreated: Array<(
    { __typename?: 'BotBackwardDetails' }
    & { ' $fragmentRefs'?: { 'BotBackwardDetailsInfoFragment': BotBackwardDetailsInfoFragment } }
  )> };

export type BotUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type BotUpdatedSubscription = { __typename?: 'Subscription', botUpdated: Array<(
    { __typename?: 'BotBackwardDetails' }
    & { ' $fragmentRefs'?: { 'BotBackwardDetailsInfoFragment': BotBackwardDetailsInfoFragment } }
  )> };

export type ContractInfoFragment = { __typename?: 'Contract', id: number, chainId: number, address: string, backendUrl?: string | null, description: string, isTestnet: boolean, status: ContractStatus } & { ' $fragmentName'?: 'ContractInfoFragment' };

export type GetAllContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllContractsQuery = { __typename?: 'Query', getAllContracts: Array<(
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  )> };

export type GetAllTradePairsQueryVariables = Exact<{
  contractId: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type GetAllTradePairsQuery = { __typename?: 'Query', getTradePairs: Array<{ __typename?: 'TradePair', contractId: number, from: string, pairIndex: number, to: string, onePercentDepthAboveUsd: string, onePercentDepthBelowUsd: string }> };

export type GetTradeCollateralsQueryVariables = Exact<{
  contractId: Scalars['Int']['input'];
}>;


export type GetTradeCollateralsQuery = { __typename?: 'Query', getTradeCollaterals: Array<{ __typename?: 'TradeCollateral', collateral: string, collateralIndex: number, isActive: boolean, precision: string, precisionDelta: string }> };

export type FollowerInfoFragment = { __typename?: 'Follower', userId: string, address: string, accountIndex: number, publicKey: string } & { ' $fragmentName'?: 'FollowerInfoFragment' };

export type FollowerTradeInfoFragment = { __typename?: 'FollowerTrade', address: string, index: number, params: string, mission?: (
    { __typename?: 'Mission' }
    & { ' $fragmentRefs'?: { 'MissionInfoFragment': MissionInfoFragment } }
  ) | null } & { ' $fragmentName'?: 'FollowerTradeInfoFragment' };

export type FollowerPendingOrderInfoFragment = { __typename?: 'FollowerPendingOrder', params: string, address: string, index: number } & { ' $fragmentName'?: 'FollowerPendingOrderInfoFragment' };

export type FollowerDetailInfoFragment = { __typename?: 'FollowerDetail', address: string, accountIndex: number, publicKey: string, userId: string, ethBalance?: string | null, usdcBalance?: string | null, contractId: number, pnlSnapshots: Array<(
    { __typename?: 'PnlSnapshot' }
    & { ' $fragmentRefs'?: { 'PnlSnapshotInfoFragment': PnlSnapshotInfoFragment } }
  )>, trades: Array<(
    { __typename?: 'FollowerTrade' }
    & { ' $fragmentRefs'?: { 'FollowerTradeInfoFragment': FollowerTradeInfoFragment } }
  )>, pendingOrders: Array<(
    { __typename?: 'FollowerPendingOrder' }
    & { ' $fragmentRefs'?: { 'FollowerPendingOrderInfoFragment': FollowerPendingOrderInfoFragment } }
  )> } & { ' $fragmentName'?: 'FollowerDetailInfoFragment' };

export type GetAllFollowersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFollowersQuery = { __typename?: 'Query', getAllFollowers: Array<(
    { __typename?: 'Follower' }
    & { ' $fragmentRefs'?: { 'FollowerInfoFragment': FollowerInfoFragment } }
  )> };

export type GetAllFollowerDetailsQueryVariables = Exact<{
  contractId: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type GetAllFollowerDetailsQuery = { __typename?: 'Query', getAllFollowerDetails: { __typename?: 'FollowerConnection', edges: Array<{ __typename?: 'FollowerEdge', cursor: number, node: (
        { __typename?: 'FollowerDetail' }
        & { ' $fragmentRefs'?: { 'FollowerDetailInfoFragment': FollowerDetailInfoFragment } }
      ) }>, pageInfo: { __typename?: 'FollowerPageInfo', hasNextPage: boolean, endCursor?: number | null } } };

export type CloseTradeMarketMutationVariables = Exact<{
  input: CloseTradeInput;
}>;


export type CloseTradeMarketMutation = { __typename?: 'Mutation', closeTradeMarket: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type CancelOrderAfterTimeoutMutationVariables = Exact<{
  input: CancelOrderAfterTimeoutInput;
}>;


export type CancelOrderAfterTimeoutMutation = { __typename?: 'Mutation', cancelOrderAfterTimeout: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type GenerateNewFollowerMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateNewFollowerMutation = { __typename?: 'Mutation', generateNewFollower: (
    { __typename?: 'Follower' }
    & { ' $fragmentRefs'?: { 'FollowerInfoFragment': FollowerInfoFragment } }
  ) };

export type WithdrawAllUsdcMutationVariables = Exact<{
  input: WithdrawAllInput;
}>;


export type WithdrawAllUsdcMutation = { __typename?: 'Mutation', withdrawAllUSDC: boolean };

export type WithdrawAllEthMutationVariables = Exact<{
  input: WithdrawAllInput;
}>;


export type WithdrawAllEthMutation = { __typename?: 'Mutation', withdrawAllETH: boolean };

export type WithdrawEthToUserMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
}>;


export type WithdrawEthToUserMutation = { __typename?: 'Mutation', withdrawETHToUser: boolean };

export type WithdrawUsdcToUserMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
}>;


export type WithdrawUsdcToUserMutation = { __typename?: 'Mutation', withdrawUSDCToUser: boolean };

export type TradeHistoryInfoFragment = { __typename?: 'TradeHistory', action: TradeActionType, address: string, block: number, collateralDelta?: string | null, collateralIndex: number, collateralPriceUsd: string, contractId: number, date: any, id: number, leverage: number, leverageDelta?: number | null, long: number, marketPrice?: string | null, pair: string, pnl: string, price: string, size: string, tradeId?: string | null, tradeIndex: number } & { ' $fragmentName'?: 'TradeHistoryInfoFragment' };

export type PnlSnapshotInfoFragment = { __typename?: 'PnlSnapshot', accUSDPnl: number, address: string, contractId: number, dateStr: string, id: number, kind: PnlSnapshotKind } & { ' $fragmentName'?: 'PnlSnapshotInfoFragment' };

export type PnlSnapshotDetailsInfoFragment = { __typename?: 'PnlSnapshotDetails', accUSDPnl: number, address: string, contractId: number, dateStr: string, id: number, kind: PnlSnapshotKind, histories: Array<(
    { __typename?: 'TradeHistory' }
    & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
  )> } & { ' $fragmentName'?: 'PnlSnapshotDetailsInfoFragment' };

export type GetTradeTransactionCountsQueryVariables = Exact<{
  addresses: Array<Scalars['String']['input']> | Scalars['String']['input'];
  contractIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
}>;


export type GetTradeTransactionCountsQuery = { __typename?: 'Query', getTradeTransactionCounts: { __typename?: 'TradeTransactionCount', daily: number, weekly: number, monthly: number } };

export type GetUserTransactionCountsQueryVariables = Exact<{
  inputs: Array<GetUserTransactionCountsInput> | GetUserTransactionCountsInput;
}>;


export type GetUserTransactionCountsQuery = { __typename?: 'Query', getUserTransactionCounts: Array<{ __typename?: 'TradeTransactionCount', daily: number, weekly: number, monthly: number }> };

export type GetTradeHistoriesQueryVariables = Exact<{
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
}>;


export type GetTradeHistoriesQuery = { __typename?: 'Query', getTradeHistories: Array<(
    { __typename?: 'TradeHistory' }
    & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
  )> };

export type GetPnlSnapshotsQueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  kind: PnlSnapshotKind;
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPnlSnapshotsQuery = { __typename?: 'Query', getPnlSnapshots: { __typename?: 'PnlSnapshotDetailsConnection', edges: Array<{ __typename?: 'PnlSnapshotDetailsEdge', cursor: number, node: (
        { __typename?: 'PnlSnapshotDetails' }
        & { ' $fragmentRefs'?: { 'PnlSnapshotDetailsInfoFragment': PnlSnapshotDetailsInfoFragment } }
      ) }>, pageInfo: { __typename?: 'PnlSnapshotDetailsPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetDevPnlSnapshotsQueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  filterParams: ExportFilter;
}>;


export type GetDevPnlSnapshotsQuery = { __typename?: 'Query', getDevPnlSnapshots: Array<{ __typename?: 'PnlSnapshotDevDetails', accUSDPnl: number, address: string, contractId: number, dateStr: string, id: number, kind: PnlSnapshotKind, histories: Array<(
      { __typename?: 'TradeHistory' }
      & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
    )>, regression: { __typename?: 'Regression', chi2: number, intercept: number, r: number, r2: number, rmsd: number, slope: number }, statistic: { __typename?: 'Statistic', averageIn: number, countIn: number } }> };

export type GetMonthlyDevPnlSnapshotsQueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  filterParams: ExportFilter;
}>;


export type GetMonthlyDevPnlSnapshotsQuery = { __typename?: 'Query', getMonthlyDevPnlSnapshots: Array<(
    { __typename?: 'TradeHistory' }
    & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
  )> };

export type GetWholeResultHistoriesQueryVariables = Exact<{
  filterParams: ExportFilter;
}>;


export type GetWholeResultHistoriesQuery = { __typename?: 'Query', getWholeResultHistories: Array<(
    { __typename?: 'TradeHistory' }
    & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
  )> };

export type GetWholeCompressedHistoriesQueryVariables = Exact<{
  filterParams: ExportFilter;
}>;


export type GetWholeCompressedHistoriesQuery = { __typename?: 'Query', getWholeCompressedHistories: { __typename?: 'WholeCompressedHistories', maxInvested: number, accPnls: Array<{ __typename?: 'AccPnl', pnl: number, inOut: number, date: any, positionCount: number, taskCount: number, traderCount: number }>, botCounts: Array<{ __typename?: 'BotCount', botCount: number, date: any }> } };

export type GetWholeCompressedHistoriesV2QueryVariables = Exact<{
  filterParams: Array<ExportFilterV2> | ExportFilterV2;
}>;


export type GetWholeCompressedHistoriesV2Query = { __typename?: 'Query', getWholeCompressedHistoriesV2: { __typename?: 'WholeCompressedHistories', maxInvested: number, accPnls: Array<{ __typename?: 'AccPnl', pnl: number, inOut: number, date: any, positionCount: number, taskCount: number, traderCount: number }>, botCounts: Array<{ __typename?: 'BotCount', botCount: number, date: any }> } };

export type GetTestingReportQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTestingReportQuery = { __typename?: 'Query', getTestingReport: { __typename?: 'TestingReportConnection', edges: Array<{ __typename?: 'TestingReportEdge', cursor: number, node: { __typename?: 'TestingReport', avgLoss: number, avgProfit: number, bottomAccProfit: number, calculatedR2: number, calculatedSlope: number, closePositionCountsByPnlSnapshotKind: string, id: number, investedUSD: number, lossCount: number, maxLoss: number, maxProfit: number, maxR2: number, maxSlope: number, minR2: number, minSlope: number, peakAccProfit: number, profitCount: number, recentTradedDays: number, totalPositions: number, totalTasks: number, totalTraders: number, totalUSDPnl: number, totalUniqueTraders: number, usdPnls: Array<number> } }>, pageInfo: { __typename?: 'TestingReportPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetTestingReportV2QueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTestingReportV2Query = { __typename?: 'Query', getTestingReportV2: { __typename?: 'TestingReportV2Connection', edges: Array<{ __typename?: 'TestingReportV2Edge', cursor: number, node: { __typename?: 'TestingReportV2', avgLoss: number, avgProfit: number, bottomAccProfit: number, calculatedR2: number, calculatedSlope: number, id: number, investedUSD: number, lossCount: number, maxLoss: number, maxProfit: number, maxSlope: number, minSlope: number, peakAccProfit: number, profitCount: number, r2MinsByPnlSnapshotKind: string, totalPositions: number, totalTasks: number, totalTraders: number, totalUSDPnl: number, totalUniqueTraders: number, usdPnls: Array<number> } }>, pageInfo: { __typename?: 'TestingReportV2PageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetWholeCompressedHistoriesV3QueryVariables = Exact<{
  filterParams: Array<ExportFilterV3> | ExportFilterV3;
}>;


export type GetWholeCompressedHistoriesV3Query = { __typename?: 'Query', getWholeCompressedHistoriesV3: { __typename?: 'WholeCompressedHistories', maxInvested: number, actionTypeCount?: string | null, uniqueTraders?: Array<string> | null, accPnls: Array<{ __typename?: 'AccPnl', pnl: number, in: number, out: number, inOut: number, date: any, positionCount: number, taskCount: number, traderCount: number }>, botCounts: Array<{ __typename?: 'BotCount', botCount: number, date: any }> } };

export type GetTestingReportV3QueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTestingReportV3Query = { __typename?: 'Query', getTestingReportV3: { __typename?: 'TestingReportV3Connection', edges: Array<{ __typename?: 'TestingReportV3Edge', cursor: number, node: { __typename?: 'TestingReportV3', avgLoss: number, avgProfit: number, bottomAccProfit: number, calculatedR2: number, calculatedSlope: number, id: number, investedUSD: number, lossCount: number, maxCount: number, maxLoss: number, maxProfit: number, maxSize: number, minCount: number, minR2: string, minSize: number, peakAccProfit: number, profitCount: number, totalPositions: number, totalTasks: number, totalTraders: number, totalUSDPnl: number, totalUniqueTraders: number, usdPnls: Array<number> } }>, pageInfo: { __typename?: 'TestingReportV3PageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetWholeCompressedHistoriesV4QueryVariables = Exact<{
  filterParams: Array<ExportFilterV3> | ExportFilterV3;
  ratio: Scalars['Float']['input'];
  startDate: Scalars['String']['input'];
  isTestnet: Scalars['Boolean']['input'];
}>;


export type GetWholeCompressedHistoriesV4Query = { __typename?: 'Query', getWholeCompressedHistoriesV4: { __typename?: 'WholeCompressedHistories', maxInvested: number, actionTypeCount?: string | null, uniqueTraders?: Array<string> | null, accPnls: Array<{ __typename?: 'AccPnl', pnl: number, in: number, out: number, inOut: number, date: any, positionCount: number, taskCount: number, traderCount: number }>, botCounts: Array<{ __typename?: 'BotCount', botCount: number, date: any }>, totalBots: Array<{ __typename?: 'TotalBot', address: string, contractId: number, dateStr: string }> } };

export type GetDevPnlSnapshotsV4QueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  filterParams: Array<ExportFilterV3> | ExportFilterV3;
  ratio: Scalars['Float']['input'];
}>;


export type GetDevPnlSnapshotsV4Query = { __typename?: 'Query', getDevPnlSnapshotsV4: Array<{ __typename?: 'PnlSnapshotDevDetails', accUSDPnl: number, address: string, contractId: number, dateStr: string, id: number, kind: PnlSnapshotKind, histories: Array<(
      { __typename?: 'TradeHistory' }
      & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
    )>, regression: { __typename?: 'Regression', chi2: number, intercept: number, r: number, r2: number, rmsd: number, slope: number }, statistic: { __typename?: 'Statistic', averageIn: number, countIn: number } }> };

export type GetTestingReportV4QueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTestingReportV4Query = { __typename?: 'Query', getTestingReportV4: { __typename?: 'TestingReportV3Connection', edges: Array<{ __typename?: 'TestingReportV3Edge', cursor: number, node: { __typename?: 'TestingReportV3', avgLoss: number, avgProfit: number, bottomAccProfit: number, calculatedR2: number, calculatedSlope: number, id: number, investedUSD: number, lossCount: number, maxCount: number, maxLoss: number, maxProfit: number, maxSize: number, minCount: number, minR2: string, minSize: number, peakAccProfit: number, profitCount: number, totalPositions: number, totalTasks: number, totalTraders: number, totalUSDPnl: number, totalUniqueTraders: number, usdPnls: Array<number> } }>, pageInfo: { __typename?: 'TestingReportV3PageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetPnlSnapshotsByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
  dateStr: Scalars['String']['input'];
}>;


export type GetPnlSnapshotsByAddressQuery = { __typename?: 'Query', getPnlSnapshotsByAddress: Array<(
    { __typename?: 'PnlSnapshot' }
    & { ' $fragmentRefs'?: { 'PnlSnapshotInfoFragment': PnlSnapshotInfoFragment } }
  )> };

export type GetPnlSnapshotInitializedFlagQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPnlSnapshotInitializedFlagQuery = { __typename?: 'Query', getPnlSnapshotInitializedFlag: Array<{ __typename?: 'PnlSnapshotInitializedFlag', id: number, dateStr: string, isInit: boolean }> };

export type IsPnlSnapshotInitializedQueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
}>;


export type IsPnlSnapshotInitializedQuery = { __typename?: 'Query', isPnlSnapshotInitialized?: { __typename?: 'PnlSnapshotInitializedFlag', id: number, dateStr: string, isInit: boolean } | null };

export type BuildPnlSnapshotsMutationVariables = Exact<{
  dateStr: Scalars['String']['input'];
  isForceBuild: Scalars['Boolean']['input'];
}>;


export type BuildPnlSnapshotsMutation = { __typename?: 'Mutation', buildPnlSnapshots?: { __typename?: 'PnlSnapshotInitializedFlag', id: number, dateStr: string, isInit: boolean } | null };

export type AutoTestingV4MutationVariables = Exact<{
  startDate: Scalars['String']['input'];
}>;


export type AutoTestingV4Mutation = { __typename?: 'Mutation', autoTestingV4: boolean };

export type AutoTestingV5MutationVariables = Exact<{ [key: string]: never; }>;


export type AutoTestingV5Mutation = { __typename?: 'Mutation', autoTestingV5: boolean };

export type DynamicSnapshotBuildMutationVariables = Exact<{
  dateStr: Scalars['String']['input'];
}>;


export type DynamicSnapshotBuildMutation = { __typename?: 'Mutation', dynamicSnapshotBuild?: { __typename?: 'PnlSnapshotInitializedFlag', id: number, dateStr: string, isInit: boolean } | null };

export type InitializePnlSnapshotMutationVariables = Exact<{
  beginingDate: Scalars['DateTime']['input'];
  isForceBuild: Scalars['Boolean']['input'];
}>;


export type InitializePnlSnapshotMutation = { __typename?: 'Mutation', initializePnlSnapshot: boolean };

export type GetDevPnlSnapshotsV5QueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  filterParams: Array<ExportFilterV5> | ExportFilterV5;
}>;


export type GetDevPnlSnapshotsV5Query = { __typename?: 'Query', getDevPnlSnapshotsV5: Array<{ __typename?: 'PnlSnapshotDevDetailsV5', accUSDPnl: number, address: string, contractId: number, dateStr: string, id: number, kind: PnlSnapshotKind, score: number, histories: Array<(
      { __typename?: 'TradeHistory' }
      & { ' $fragmentRefs'?: { 'TradeHistoryInfoFragment': TradeHistoryInfoFragment } }
    )> }> };

export type GetWholeCompressedHistoriesV5QueryVariables = Exact<{
  startDate: Scalars['String']['input'];
  isTestnet: Scalars['Boolean']['input'];
  filterParams: Array<ExportFilterV5> | ExportFilterV5;
}>;


export type GetWholeCompressedHistoriesV5Query = { __typename?: 'Query', getWholeCompressedHistoriesV5: { __typename?: 'WholeCompressedHistories', maxInvested: number, actionTypeCount?: string | null, uniqueTraders?: Array<string> | null, accPnls: Array<{ __typename?: 'AccPnl', pnl: number, in: number, out: number, inOut: number, date: any, positionCount: number, taskCount: number, traderCount: number }>, botCounts: Array<{ __typename?: 'BotCount', botCount: number, date: any }>, totalBots: Array<{ __typename?: 'TotalBot', address: string, contractId: number, dateStr: string }> } };

export type GetTestingReportV5QueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetTestingReportV5Query = { __typename?: 'Query', getTestingReportV5: { __typename?: 'TestingReportV5Connection', edges: Array<{ __typename?: 'TestingReportV5Edge', cursor: number, node: { __typename?: 'TestingReportV5', maxAvgSize: number, minAvgSize: number, maxCount: number, minCount: number, avgLoss: number, monthWeight: number, threeMonthWeight: number, weekWeight: number, allTimeWeight: number, avgProfit: number, bottomAccProfit: number, calculatedR2: number, calculatedSlope: number, id: number, investedUSD: number, lossCount: number, m: number, maxLoss: number, maxProfit: number, minR2: number, minScore: number, n: number, peakAccProfit: number, profitCount: number, totalPositions: number, totalTasks: number, totalTraders: number, totalUSDPnl: number, totalUniqueTraders: number, usdPnls: Array<number>, window: number } }>, pageInfo: { __typename?: 'TestingReportV5PageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type LogInfoFragment = { __typename?: 'Log', id: number, severity: LogSeverity, summary: string, details?: string | null, timestamp: any, checked: boolean } & { ' $fragmentName'?: 'LogInfoFragment' };

export type AllLogsQueryVariables = Exact<{
  severity?: InputMaybe<LogSeverity>;
  checked: Scalars['Boolean']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AllLogsQuery = { __typename?: 'Query', allLogs: { __typename?: 'LogsConnection', edges: Array<{ __typename?: 'LogsEdge', cursor: number, node: (
        { __typename?: 'Log' }
        & { ' $fragmentRefs'?: { 'LogInfoFragment': LogInfoFragment } }
      ) }>, pageInfo: { __typename?: 'LogsPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetLogsSeverityCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLogsSeverityCountsQuery = { __typename?: 'Query', getLogsSeverityCounts: Array<{ __typename?: 'SeverityCount', severity: LogSeverity, counts: number }> };

export type CheckLogMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CheckLogMutation = { __typename?: 'Mutation', checkLog: (
    { __typename?: 'Log' }
    & { ' $fragmentRefs'?: { 'LogInfoFragment': LogInfoFragment } }
  ) };

export type NewLogSubscriptionVariables = Exact<{
  checked: Scalars['Boolean']['input'];
  severity?: InputMaybe<LogSeverity>;
}>;


export type NewLogSubscription = { __typename?: 'Subscription', newLog: (
    { __typename?: 'Log' }
    & { ' $fragmentRefs'?: { 'LogInfoFragment': LogInfoFragment } }
  ) };

export type PositionInfoFragment = { __typename?: 'Position', id: number, contractId: number, address: string, index: number } & { ' $fragmentName'?: 'PositionInfoFragment' };

export type MissionInfoFragment = { __typename?: 'Mission', id: number, botId: number, targetPositionId: number, achievePositionId?: number | null, status: MissionStatus, createdAt: any, updatedAt: any } & { ' $fragmentName'?: 'MissionInfoFragment' };

export type MissionBackwardDetailsInfoFragment = { __typename?: 'MissionBackwardDetails', id: number, botId: number, targetPositionId: number, achievePositionId?: number | null, createdAt: any, updatedAt: any, status: MissionStatus, achievePosition?: (
    { __typename?: 'Position' }
    & { ' $fragmentRefs'?: { 'PositionInfoFragment': PositionInfoFragment } }
  ) | null, targetPosition: (
    { __typename?: 'Position' }
    & { ' $fragmentRefs'?: { 'PositionInfoFragment': PositionInfoFragment } }
  ), bot: (
    { __typename?: 'BotBackwardDetails' }
    & { ' $fragmentRefs'?: { 'BotBackwardDetailsInfoFragment': BotBackwardDetailsInfoFragment } }
  ) } & { ' $fragmentName'?: 'MissionBackwardDetailsInfoFragment' };

export type MissionForwardDetailsInfoFragment = { __typename?: 'MissionForwardDetails', id: number, botId: number, targetPositionId: number, achievePositionId?: number | null, createdAt: any, updatedAt: any, status: MissionStatus, achievePosition?: (
    { __typename?: 'Position' }
    & { ' $fragmentRefs'?: { 'PositionInfoFragment': PositionInfoFragment } }
  ) | null, targetPosition: (
    { __typename?: 'Position' }
    & { ' $fragmentRefs'?: { 'PositionInfoFragment': PositionInfoFragment } }
  ), tasks: Array<(
    { __typename?: 'TaskForwardDetails' }
    & { ' $fragmentRefs'?: { 'TaskForwardDetailsInfoFragment': TaskForwardDetailsInfoFragment } }
  )> } & { ' $fragmentName'?: 'MissionForwardDetailsInfoFragment' };

export type CloneMissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CloneMissionMutation = { __typename?: 'Mutation', cloneMission: boolean };

export type CloseMissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  isForce: Scalars['Boolean']['input'];
}>;


export type CloseMissionMutation = { __typename?: 'Mutation', closeMission: boolean };

export type IgnoreMissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type IgnoreMissionMutation = { __typename?: 'Mutation', ignoreMission: boolean };

export type MissionCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type MissionCreatedSubscription = { __typename?: 'Subscription', missionCreated: Array<(
    { __typename?: 'MissionBackwardDetails' }
    & { ' $fragmentRefs'?: { 'MissionBackwardDetailsInfoFragment': MissionBackwardDetailsInfoFragment } }
  )> };

export type MissionUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type MissionUpdatedSubscription = { __typename?: 'Subscription', missionUpdated: Array<(
    { __typename?: 'MissionBackwardDetails' }
    & { ' $fragmentRefs'?: { 'MissionBackwardDetailsInfoFragment': MissionBackwardDetailsInfoFragment } }
  )> };

export type PlanInfoFragment = { __typename?: 'Plan', id: number, title: string, description: string, status: PlanStatus, scheduledStart: any, scheduledEnd: any, startedAt?: any | null, endedAt?: any | null, userId: string } & { ' $fragmentName'?: 'PlanInfoFragment' };

export type PlanForwardDetailsInfoFragment = { __typename?: 'PlanForwardDetails', id: number, title: string, description: string, status: PlanStatus, scheduledStart: any, scheduledEnd: any, startedAt?: any | null, endedAt?: any | null, userId: string, bots: Array<(
    { __typename?: 'BotForwardDetails' }
    & { ' $fragmentRefs'?: { 'BotForwardDetailsInfoFragment': BotForwardDetailsInfoFragment } }
  )> } & { ' $fragmentName'?: 'PlanForwardDetailsInfoFragment' };

export type GetPlansByStatusQueryVariables = Exact<{
  status: PlanStatus;
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type GetPlansByStatusQuery = { __typename?: 'Query', getPlansByStatus: { __typename?: 'PlanConnection', edges: Array<{ __typename?: 'PlanEdge', cursor: number, node: (
        { __typename?: 'PlanForwardDetails' }
        & { ' $fragmentRefs'?: { 'PlanForwardDetailsInfoFragment': PlanForwardDetailsInfoFragment } }
      ) }>, pageInfo: { __typename?: 'PlanPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetPlanByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPlanByIdQuery = { __typename?: 'Query', getPlanById?: (
    { __typename?: 'PlanForwardDetails' }
    & { ' $fragmentRefs'?: { 'PlanForwardDetailsInfoFragment': PlanForwardDetailsInfoFragment } }
  ) | null };

export type CreatePlanMutationVariables = Exact<{
  createPlanInput: CreatePlanInput;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: (
    { __typename?: 'Plan' }
    & { ' $fragmentRefs'?: { 'PlanInfoFragment': PlanInfoFragment } }
  ) };

export type CreateAutoPlanMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateAutoPlanMutation = { __typename?: 'Mutation', createAutoPlan: boolean };

export type UpdatePlanMutationVariables = Exact<{
  updatePlanInput: UpdatePlanInput;
}>;


export type UpdatePlanMutation = { __typename?: 'Mutation', updatePlan: (
    { __typename?: 'Plan' }
    & { ' $fragmentRefs'?: { 'PlanInfoFragment': PlanInfoFragment } }
  ) };

export type DeletePlanMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePlanMutation = { __typename?: 'Mutation', deletePlan: number };

export type StartPlanMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type StartPlanMutation = { __typename?: 'Mutation', startPlan: boolean };

export type EndPlanMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type EndPlanMutation = { __typename?: 'Mutation', endPlan: boolean };

export type PlanCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type PlanCreatedSubscription = { __typename?: 'Subscription', planCreated: (
    { __typename?: 'Plan' }
    & { ' $fragmentRefs'?: { 'PlanInfoFragment': PlanInfoFragment } }
  ) };

export type PlanUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type PlanUpdatedSubscription = { __typename?: 'Subscription', planUpdated: (
    { __typename?: 'Plan' }
    & { ' $fragmentRefs'?: { 'PlanInfoFragment': PlanInfoFragment } }
  ) };

export type GetBlacklistQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlacklistQuery = { __typename?: 'Query', getBlacklist?: Array<string> | null };

export type AddToBlacklistMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type AddToBlacklistMutation = { __typename?: 'Mutation', addToBlacklist: boolean };

export type RemoveFromBlacklistMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type RemoveFromBlacklistMutation = { __typename?: 'Mutation', removeFromBlacklist: boolean };

export type GetExpertPnlSnapshotsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetExpertPnlSnapshotsQuery = { __typename?: 'Query', getExpertPnlSnapshots: Array<{ __typename?: 'ExpertPnlSnapshot', accUSDPnl: number, address: string, contractId: number, dateStr: string, id: number, kind: PnlSnapshotKind, maxSize: number, ratio: number, score: number, openedPositions: number, avgPnlRatio: number, avgDuration: number }> };

export type GetWhitelistQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWhitelistQuery = { __typename?: 'Query', getWhitelist?: Array<string> | null };

export type AddToWhitelistMutationVariables = Exact<{
  params: Scalars['String']['input'];
}>;


export type AddToWhitelistMutation = { __typename?: 'Mutation', addToWhitelist: boolean };

export type RemoveFromWhitelistMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type RemoveFromWhitelistMutation = { __typename?: 'Mutation', removeFromWhitelist: boolean };

export type StrategyMetadataInfoFragment = { __typename?: 'StrategyMetadata', key: string, title: string, description: string } & { ' $fragmentName'?: 'StrategyMetadataInfoFragment' };

export type StrategyInfoFragment = { __typename?: 'Strategy', id: number, lifeTime: number, maxCollateral: number, minCollateral: number, maxLeverage: number, minLeverage: number, collateralBaseline: number, params: string, ratio: number, strategyKey: string } & { ' $fragmentName'?: 'StrategyInfoFragment' };

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

export type PauseSystemMutationVariables = Exact<{ [key: string]: never; }>;


export type PauseSystemMutation = { __typename?: 'Mutation', pauseSystem: boolean };

export type ResumeSystemMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type ResumeSystemMutation = { __typename?: 'Mutation', resumeSystem: boolean };

export type UpgradeSystemMutationVariables = Exact<{ [key: string]: never; }>;


export type UpgradeSystemMutation = { __typename?: 'Mutation', upgradeSystem: boolean };

export type MakeSafeAppMutationVariables = Exact<{
  password: Scalars['String']['input'];
}>;


export type MakeSafeAppMutation = { __typename?: 'Mutation', makeSafeApp: boolean };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: boolean };

export type GetSystemStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSystemStatusQuery = { __typename?: 'Query', systemStatus: boolean };

export type IsSafeAppQueryVariables = Exact<{ [key: string]: never; }>;


export type IsSafeAppQuery = { __typename?: 'Query', isSafeApp: boolean };

export type GetServerTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServerTimeQuery = { __typename?: 'Query', getServerTime: { __typename?: 'ServerTime', timestamp: number, timezone: string } };

export type TagCategoryInfoFragment = { __typename?: 'TagCategory', id: number, category: string, description: string, userId: string } & { ' $fragmentName'?: 'TagCategoryInfoFragment' };

export type TagInfoFragment = { __typename?: 'Tag', id: number, tag: string, description: string, color: string, categoryId?: number | null, userId: string } & { ' $fragmentName'?: 'TagInfoFragment' };

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

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<(
    { __typename?: 'TagCategory' }
    & { ' $fragmentRefs'?: { 'TagCategoryInfoFragment': TagCategoryInfoFragment } }
  )> };

export type UpsertCategoryMutationVariables = Exact<{
  input: TagCategoryInput;
}>;


export type UpsertCategoryMutation = { __typename?: 'Mutation', upsertCategory: (
    { __typename?: 'TagCategory' }
    & { ' $fragmentRefs'?: { 'TagCategoryInfoFragment': TagCategoryInfoFragment } }
  ) };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: (
    { __typename?: 'TagCategory' }
    & { ' $fragmentRefs'?: { 'TagCategoryInfoFragment': TagCategoryInfoFragment } }
  ) };

export type ActionInfoFragment = { __typename?: 'Action', id: number, name: string, positionId: number, args: string, blockNumber: number, orderInBlock: number, createdAt: any } & { ' $fragmentName'?: 'ActionInfoFragment' };

export type FollowerActionDetailsInfoFragment = { __typename?: 'FollowerActionDetails', id: number, taskId: number, actionId: number, action: (
    { __typename?: 'Action' }
    & { ' $fragmentRefs'?: { 'ActionInfoFragment': ActionInfoFragment } }
  ) } & { ' $fragmentName'?: 'FollowerActionDetailsInfoFragment' };

export type TaskForwardDetailsInfoFragment = { __typename?: 'TaskForwardDetails', id: number, missionId: number, actionId: number, logs: Array<string>, status: TaskStatus, createdAt: any, action: (
    { __typename?: 'Action' }
    & { ' $fragmentRefs'?: { 'ActionInfoFragment': ActionInfoFragment } }
  ), followerActions: Array<(
    { __typename?: 'FollowerActionDetails' }
    & { ' $fragmentRefs'?: { 'FollowerActionDetailsInfoFragment': FollowerActionDetailsInfoFragment } }
  )> } & { ' $fragmentName'?: 'TaskForwardDetailsInfoFragment' };

export type TaskBackwardDetailsInfoFragment = { __typename?: 'TaskBackwardDetails', id: number, missionId: number, actionId: number, logs: Array<string>, status: TaskStatus, createdAt: any, action: (
    { __typename?: 'Action' }
    & { ' $fragmentRefs'?: { 'ActionInfoFragment': ActionInfoFragment } }
  ), followerActions: Array<(
    { __typename?: 'FollowerActionDetails' }
    & { ' $fragmentRefs'?: { 'FollowerActionDetailsInfoFragment': FollowerActionDetailsInfoFragment } }
  )>, mission: (
    { __typename?: 'MissionBackwardDetails' }
    & { ' $fragmentRefs'?: { 'MissionBackwardDetailsInfoFragment': MissionBackwardDetailsInfoFragment } }
  ) } & { ' $fragmentName'?: 'TaskBackwardDetailsInfoFragment' };

export type GetAlertTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAlertTasksQuery = { __typename?: 'Query', getAlertTasks: Array<(
    { __typename?: 'TaskBackwardDetails' }
    & { ' $fragmentRefs'?: { 'TaskBackwardDetailsInfoFragment': TaskBackwardDetailsInfoFragment } }
  )> };

export type PerformTaskMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PerformTaskMutation = { __typename?: 'Mutation', performTask: boolean };

export type StopTaskMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type StopTaskMutation = { __typename?: 'Mutation', stopTask: boolean };

export type TaskCreatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type TaskCreatedSubscription = { __typename?: 'Subscription', taskCreated: Array<(
    { __typename?: 'TaskBackwardDetails' }
    & { ' $fragmentRefs'?: { 'TaskBackwardDetailsInfoFragment': TaskBackwardDetailsInfoFragment } }
  )> };

export type TaskUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type TaskUpdatedSubscription = { __typename?: 'Subscription', taskUpdated: Array<(
    { __typename?: 'TaskBackwardDetails' }
    & { ' $fragmentRefs'?: { 'TaskBackwardDetailsInfoFragment': TaskBackwardDetailsInfoFragment } }
  )> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', address: string, permission: UserPermission, allowAuto: boolean, budget: number, ratio: number, followerContractId: number }> };

export type GetTokenMutationVariables = Exact<{
  singature: Scalars['String']['input'];
  timestamp: Scalars['String']['input'];
  walletAddress: Scalars['String']['input'];
}>;


export type GetTokenMutation = { __typename?: 'Mutation', getToken: { __typename?: 'AccessToken', accessToken: string } };

export type ChangeUserPermissionMutationVariables = Exact<{
  address: Scalars['String']['input'];
  permission: Scalars['String']['input'];
}>;


export type ChangeUserPermissionMutation = { __typename?: 'Mutation', changeUserPermission: { __typename?: 'User', address: string, permission: UserPermission, allowAuto: boolean, budget: number, ratio: number, followerContractId: number } };

export type AllowAutoMutationVariables = Exact<{
  address: Scalars['String']['input'];
  allowAuto: Scalars['Boolean']['input'];
  budget: Scalars['Float']['input'];
  ratio: Scalars['Float']['input'];
  followerContractId: Scalars['Int']['input'];
}>;


export type AllowAutoMutation = { __typename?: 'Mutation', allowAuto: { __typename?: 'User', address: string, permission: UserPermission, allowAuto: boolean, budget: number, ratio: number, followerContractId: number } };

export type WalletAccountInfoFragment = { __typename?: 'WalletAccount', id: number, userId: string, address: string, tags: Array<(
    { __typename?: 'Tag' }
    & { ' $fragmentRefs'?: { 'TagInfoFragment': TagInfoFragment } }
  )> } & { ' $fragmentName'?: 'WalletAccountInfoFragment' };

export type GetAllWalletAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWalletAccountsQuery = { __typename?: 'Query', getAllWalletAccounts: Array<(
    { __typename?: 'WalletAccount' }
    & { ' $fragmentRefs'?: { 'WalletAccountInfoFragment': WalletAccountInfoFragment } }
  )> };

export type AddWalletAccountMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type AddWalletAccountMutation = { __typename?: 'Mutation', addWalletAccount: (
    { __typename?: 'WalletAccount' }
    & { ' $fragmentRefs'?: { 'WalletAccountInfoFragment': WalletAccountInfoFragment } }
  ) };

export type AddTagToWalletAccountMutationVariables = Exact<{
  input: ChangeUserTagInput;
}>;


export type AddTagToWalletAccountMutation = { __typename?: 'Mutation', addTagToWalletAccount: (
    { __typename?: 'WalletAccount' }
    & { ' $fragmentRefs'?: { 'WalletAccountInfoFragment': WalletAccountInfoFragment } }
  ) };

export type RemoveTagFromWalletAccountMutationVariables = Exact<{
  input: ChangeUserTagInput;
}>;


export type RemoveTagFromWalletAccountMutation = { __typename?: 'Mutation', removeTagFromWalletAccount: (
    { __typename?: 'WalletAccount' }
    & { ' $fragmentRefs'?: { 'WalletAccountInfoFragment': WalletAccountInfoFragment } }
  ) };

export const ContractInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<ContractInfoFragment, unknown>;
export const FollowerInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<FollowerInfoFragment, unknown>;
export const StrategyInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<StrategyInfoFragment, unknown>;
export const BotDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<BotDetailsInfoFragment, unknown>;
export const PnlSnapshotInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}}]} as unknown as DocumentNode<PnlSnapshotInfoFragment, unknown>;
export const MissionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<MissionInfoFragment, unknown>;
export const FollowerTradeInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<FollowerTradeInfoFragment, unknown>;
export const FollowerPendingOrderInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<FollowerPendingOrderInfoFragment, unknown>;
export const FollowerDetailInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcBalance"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"pnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerTradeInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerPendingOrderInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<FollowerDetailInfoFragment, unknown>;
export const TradeHistoryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<TradeHistoryInfoFragment, unknown>;
export const PnlSnapshotDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<PnlSnapshotDetailsInfoFragment, unknown>;
export const LogInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<LogInfoFragment, unknown>;
export const PositionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<PositionInfoFragment, unknown>;
export const ActionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ActionInfoFragment, unknown>;
export const FollowerActionDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<FollowerActionDetailsInfoFragment, unknown>;
export const TaskForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}}]} as unknown as DocumentNode<TaskForwardDetailsInfoFragment, unknown>;
export const MissionForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionForwardDetailsInfoFragment, unknown>;
export const BotForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<BotForwardDetailsInfoFragment, unknown>;
export const PlanForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<PlanForwardDetailsInfoFragment, unknown>;
export const StrategyMetadataInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyMetadataInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<StrategyMetadataInfoFragment, unknown>;
export const TagCategoryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagCategoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TagCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<TagCategoryInfoFragment, unknown>;
export const PlanInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<PlanInfoFragment, unknown>;
export const BotBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<BotBackwardDetailsInfoFragment, unknown>;
export const MissionBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<MissionBackwardDetailsInfoFragment, unknown>;
export const TaskBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskBackwardDetailsInfoFragment, unknown>;
export const TagInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<TagInfoFragment, unknown>;
export const WalletAccountInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<WalletAccountInfoFragment, unknown>;
export const GetBotsByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBotsByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BotStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotsByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetBotsByStatusQuery, GetBotsByStatusQueryVariables>;
export const GetActiveBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActiveBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getActiveBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetActiveBotsQuery, GetActiveBotsQueryVariables>;
export const CreateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<CreateBotMutation, CreateBotMutationVariables>;
export const BatchCreateBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"batchCreateBots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotAndStrategyInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchCreateBots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BatchCreateBotsMutation, BatchCreateBotsMutationVariables>;
export const DeleteBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<DeleteBotMutation, DeleteBotMutationVariables>;
export const LiveBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"liveBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<LiveBotMutation, LiveBotMutationVariables>;
export const StopBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StopBotMutation, StopBotMutationVariables>;
export const BotCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"botCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BotCreatedSubscription, BotCreatedSubscriptionVariables>;
export const BotUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"botUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BotUpdatedSubscription, BotUpdatedSubscriptionVariables>;
export const GetAllContractsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]} as unknown as DocumentNode<GetAllContractsQuery, GetAllContractsQueryVariables>;
export const GetAllTradePairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllTradePairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTradePairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"pairIndex"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"onePercentDepthAboveUsd"}},{"kind":"Field","name":{"kind":"Name","value":"onePercentDepthBelowUsd"}}]}}]}}]} as unknown as DocumentNode<GetAllTradePairsQuery, GetAllTradePairsQueryVariables>;
export const GetTradeCollateralsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTradeCollaterals"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTradeCollaterals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collateral"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"precision"}},{"kind":"Field","name":{"kind":"Name","value":"precisionDelta"}}]}}]}}]} as unknown as DocumentNode<GetTradeCollateralsQuery, GetTradeCollateralsQueryVariables>;
export const GetAllFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<GetAllFollowersQuery, GetAllFollowersQueryVariables>;
export const GetAllFollowerDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowerDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowerDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerDetailInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcBalance"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"pnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerTradeInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerPendingOrderInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllFollowerDetailsQuery, GetAllFollowerDetailsQueryVariables>;
export const CloseTradeMarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"closeTradeMarket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CloseTradeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeTradeMarket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<CloseTradeMarketMutation, CloseTradeMarketMutationVariables>;
export const CancelOrderAfterTimeoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cancelOrderAfterTimeout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CancelOrderAfterTimeoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelOrderAfterTimeout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<CancelOrderAfterTimeoutMutation, CancelOrderAfterTimeoutMutationVariables>;
export const GenerateNewFollowerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generateNewFollower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateNewFollower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<GenerateNewFollowerMutation, GenerateNewFollowerMutationVariables>;
export const WithdrawAllUsdcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAllUSDC"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAllUSDC"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAllUsdcMutation, WithdrawAllUsdcMutationVariables>;
export const WithdrawAllEthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAllETH"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAllETH"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAllEthMutation, WithdrawAllEthMutationVariables>;
export const WithdrawEthToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawETHToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawETHToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<WithdrawEthToUserMutation, WithdrawEthToUserMutationVariables>;
export const WithdrawUsdcToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawUSDCToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawUSDCToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<WithdrawUsdcToUserMutation, WithdrawUsdcToUserMutationVariables>;
export const GetTradeTransactionCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTradeTransactionCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTradeTransactionCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addresses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daily"}},{"kind":"Field","name":{"kind":"Name","value":"weekly"}},{"kind":"Field","name":{"kind":"Name","value":"monthly"}}]}}]}}]} as unknown as DocumentNode<GetTradeTransactionCountsQuery, GetTradeTransactionCountsQueryVariables>;
export const GetUserTransactionCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserTransactionCounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GetUserTransactionCountsInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserTransactionCounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daily"}},{"kind":"Field","name":{"kind":"Name","value":"weekly"}},{"kind":"Field","name":{"kind":"Name","value":"monthly"}}]}}]}}]} as unknown as DocumentNode<GetUserTransactionCountsQuery, GetUserTransactionCountsQueryVariables>;
export const GetTradeHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTradeHistories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTradeHistories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<GetTradeHistoriesQuery, GetTradeHistoriesQueryVariables>;
export const GetPnlSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"kind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kind"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}}]} as unknown as DocumentNode<GetPnlSnapshotsQuery, GetPnlSnapshotsQueryVariables>;
export const GetDevPnlSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDevPnlSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDevPnlSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"regression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chi2"}},{"kind":"Field","name":{"kind":"Name","value":"intercept"}},{"kind":"Field","name":{"kind":"Name","value":"r"}},{"kind":"Field","name":{"kind":"Name","value":"r2"}},{"kind":"Field","name":{"kind":"Name","value":"rmsd"}},{"kind":"Field","name":{"kind":"Name","value":"slope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageIn"}},{"kind":"Field","name":{"kind":"Name","value":"countIn"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<GetDevPnlSnapshotsQuery, GetDevPnlSnapshotsQueryVariables>;
export const GetMonthlyDevPnlSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMonthlyDevPnlSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMonthlyDevPnlSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<GetMonthlyDevPnlSnapshotsQuery, GetMonthlyDevPnlSnapshotsQueryVariables>;
export const GetWholeResultHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWholeResultHistories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWholeResultHistories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<GetWholeResultHistoriesQuery, GetWholeResultHistoriesQueryVariables>;
export const GetWholeCompressedHistoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWholeCompressedHistories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWholeCompressedHistories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPnls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"inOut"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"positionCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"traderCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"botCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxInvested"}}]}}]}}]} as unknown as DocumentNode<GetWholeCompressedHistoriesQuery, GetWholeCompressedHistoriesQueryVariables>;
export const GetWholeCompressedHistoriesV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWholeCompressedHistoriesV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilterV2"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWholeCompressedHistoriesV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPnls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"inOut"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"positionCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"traderCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"botCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxInvested"}}]}}]}}]} as unknown as DocumentNode<GetWholeCompressedHistoriesV2Query, GetWholeCompressedHistoriesV2QueryVariables>;
export const GetTestingReportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTestingReport"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestingReport"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgLoss"}},{"kind":"Field","name":{"kind":"Name","value":"avgProfit"}},{"kind":"Field","name":{"kind":"Name","value":"bottomAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedR2"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedSlope"}},{"kind":"Field","name":{"kind":"Name","value":"closePositionCountsByPnlSnapshotKind"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"investedUSD"}},{"kind":"Field","name":{"kind":"Name","value":"lossCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxLoss"}},{"kind":"Field","name":{"kind":"Name","value":"maxProfit"}},{"kind":"Field","name":{"kind":"Name","value":"maxR2"}},{"kind":"Field","name":{"kind":"Name","value":"maxSlope"}},{"kind":"Field","name":{"kind":"Name","value":"minR2"}},{"kind":"Field","name":{"kind":"Name","value":"minSlope"}},{"kind":"Field","name":{"kind":"Name","value":"peakAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"profitCount"}},{"kind":"Field","name":{"kind":"Name","value":"recentTradedDays"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"totalTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalUniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnls"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetTestingReportQuery, GetTestingReportQueryVariables>;
export const GetTestingReportV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTestingReportV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestingReportV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgLoss"}},{"kind":"Field","name":{"kind":"Name","value":"avgProfit"}},{"kind":"Field","name":{"kind":"Name","value":"bottomAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedR2"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedSlope"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"investedUSD"}},{"kind":"Field","name":{"kind":"Name","value":"lossCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxLoss"}},{"kind":"Field","name":{"kind":"Name","value":"maxProfit"}},{"kind":"Field","name":{"kind":"Name","value":"maxSlope"}},{"kind":"Field","name":{"kind":"Name","value":"minSlope"}},{"kind":"Field","name":{"kind":"Name","value":"peakAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"profitCount"}},{"kind":"Field","name":{"kind":"Name","value":"r2MinsByPnlSnapshotKind"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"totalTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalUniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnls"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetTestingReportV2Query, GetTestingReportV2QueryVariables>;
export const GetWholeCompressedHistoriesV3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWholeCompressedHistoriesV3"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilterV3"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWholeCompressedHistoriesV3"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPnls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"inOut"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"positionCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"traderCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"botCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxInvested"}},{"kind":"Field","name":{"kind":"Name","value":"actionTypeCount"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueTraders"}}]}}]}}]} as unknown as DocumentNode<GetWholeCompressedHistoriesV3Query, GetWholeCompressedHistoriesV3QueryVariables>;
export const GetTestingReportV3Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTestingReportV3"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestingReportV3"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgLoss"}},{"kind":"Field","name":{"kind":"Name","value":"avgProfit"}},{"kind":"Field","name":{"kind":"Name","value":"bottomAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedR2"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedSlope"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"investedUSD"}},{"kind":"Field","name":{"kind":"Name","value":"lossCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxLoss"}},{"kind":"Field","name":{"kind":"Name","value":"maxProfit"}},{"kind":"Field","name":{"kind":"Name","value":"maxSize"}},{"kind":"Field","name":{"kind":"Name","value":"minCount"}},{"kind":"Field","name":{"kind":"Name","value":"minR2"}},{"kind":"Field","name":{"kind":"Name","value":"minSize"}},{"kind":"Field","name":{"kind":"Name","value":"peakAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"profitCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"totalTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalUniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnls"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetTestingReportV3Query, GetTestingReportV3QueryVariables>;
export const GetWholeCompressedHistoriesV4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWholeCompressedHistoriesV4"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilterV3"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isTestnet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWholeCompressedHistoriesV4"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"isTestnet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isTestnet"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPnls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"inOut"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"positionCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"traderCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"botCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxInvested"}},{"kind":"Field","name":{"kind":"Name","value":"actionTypeCount"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}}]}}]}}]}}]} as unknown as DocumentNode<GetWholeCompressedHistoriesV4Query, GetWholeCompressedHistoriesV4QueryVariables>;
export const GetDevPnlSnapshotsV4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDevPnlSnapshotsV4"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilterV3"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDevPnlSnapshotsV4"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"regression"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chi2"}},{"kind":"Field","name":{"kind":"Name","value":"intercept"}},{"kind":"Field","name":{"kind":"Name","value":"r"}},{"kind":"Field","name":{"kind":"Name","value":"r2"}},{"kind":"Field","name":{"kind":"Name","value":"rmsd"}},{"kind":"Field","name":{"kind":"Name","value":"slope"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageIn"}},{"kind":"Field","name":{"kind":"Name","value":"countIn"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<GetDevPnlSnapshotsV4Query, GetDevPnlSnapshotsV4QueryVariables>;
export const GetTestingReportV4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTestingReportV4"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestingReportV4"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgLoss"}},{"kind":"Field","name":{"kind":"Name","value":"avgProfit"}},{"kind":"Field","name":{"kind":"Name","value":"bottomAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedR2"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedSlope"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"investedUSD"}},{"kind":"Field","name":{"kind":"Name","value":"lossCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxCount"}},{"kind":"Field","name":{"kind":"Name","value":"maxLoss"}},{"kind":"Field","name":{"kind":"Name","value":"maxProfit"}},{"kind":"Field","name":{"kind":"Name","value":"maxSize"}},{"kind":"Field","name":{"kind":"Name","value":"minCount"}},{"kind":"Field","name":{"kind":"Name","value":"minR2"}},{"kind":"Field","name":{"kind":"Name","value":"minSize"}},{"kind":"Field","name":{"kind":"Name","value":"peakAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"profitCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"totalTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalUniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnls"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetTestingReportV4Query, GetTestingReportV4QueryVariables>;
export const GetPnlSnapshotsByAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshotsByAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshotsByAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}}]}}]} as unknown as DocumentNode<GetPnlSnapshotsByAddressQuery, GetPnlSnapshotsByAddressQueryVariables>;
export const GetPnlSnapshotInitializedFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshotInitializedFlag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshotInitializedFlag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"isInit"}}]}}]}}]} as unknown as DocumentNode<GetPnlSnapshotInitializedFlagQuery, GetPnlSnapshotInitializedFlagQueryVariables>;
export const IsPnlSnapshotInitializedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isPnlSnapshotInitialized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isPnlSnapshotInitialized"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"isInit"}}]}}]}}]} as unknown as DocumentNode<IsPnlSnapshotInitializedQuery, IsPnlSnapshotInitializedQueryVariables>;
export const BuildPnlSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"buildPnlSnapshots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildPnlSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"isForceBuild"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"isInit"}}]}}]}}]} as unknown as DocumentNode<BuildPnlSnapshotsMutation, BuildPnlSnapshotsMutationVariables>;
export const AutoTestingV4Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"autoTestingV4"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoTestingV4"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}}]}]}}]} as unknown as DocumentNode<AutoTestingV4Mutation, AutoTestingV4MutationVariables>;
export const AutoTestingV5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"autoTestingV5"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"autoTestingV5"}}]}}]} as unknown as DocumentNode<AutoTestingV5Mutation, AutoTestingV5MutationVariables>;
export const DynamicSnapshotBuildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"dynamicSnapshotBuild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dynamicSnapshotBuild"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"isInit"}}]}}]}}]} as unknown as DocumentNode<DynamicSnapshotBuildMutation, DynamicSnapshotBuildMutationVariables>;
export const InitializePnlSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"initializePnlSnapshot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beginingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initializePnlSnapshot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"beginingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beginingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"isForceBuild"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}}}]}]}}]} as unknown as DocumentNode<InitializePnlSnapshotMutation, InitializePnlSnapshotMutationVariables>;
export const GetDevPnlSnapshotsV5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getDevPnlSnapshotsV5"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilterV5"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getDevPnlSnapshotsV5"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDelta"}},{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"collateralPriceUsd"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"long"}},{"kind":"Field","name":{"kind":"Name","value":"marketPrice"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"tradeId"}},{"kind":"Field","name":{"kind":"Name","value":"tradeIndex"}}]}}]} as unknown as DocumentNode<GetDevPnlSnapshotsV5Query, GetDevPnlSnapshotsV5QueryVariables>;
export const GetWholeCompressedHistoriesV5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWholeCompressedHistoriesV5"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isTestnet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilterV5"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWholeCompressedHistoriesV5"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"isTestnet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isTestnet"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPnls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"inOut"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"positionCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}},{"kind":"Field","name":{"kind":"Name","value":"traderCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"botCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxInvested"}},{"kind":"Field","name":{"kind":"Name","value":"actionTypeCount"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}}]}}]}}]}}]} as unknown as DocumentNode<GetWholeCompressedHistoriesV5Query, GetWholeCompressedHistoriesV5QueryVariables>;
export const GetTestingReportV5Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTestingReportV5"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestingReportV5"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maxAvgSize"}},{"kind":"Field","name":{"kind":"Name","value":"minAvgSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxCount"}},{"kind":"Field","name":{"kind":"Name","value":"minCount"}},{"kind":"Field","name":{"kind":"Name","value":"avgLoss"}},{"kind":"Field","name":{"kind":"Name","value":"monthWeight"}},{"kind":"Field","name":{"kind":"Name","value":"threeMonthWeight"}},{"kind":"Field","name":{"kind":"Name","value":"weekWeight"}},{"kind":"Field","name":{"kind":"Name","value":"allTimeWeight"}},{"kind":"Field","name":{"kind":"Name","value":"avgProfit"}},{"kind":"Field","name":{"kind":"Name","value":"bottomAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedR2"}},{"kind":"Field","name":{"kind":"Name","value":"calculatedSlope"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"investedUSD"}},{"kind":"Field","name":{"kind":"Name","value":"lossCount"}},{"kind":"Field","name":{"kind":"Name","value":"m"}},{"kind":"Field","name":{"kind":"Name","value":"maxLoss"}},{"kind":"Field","name":{"kind":"Name","value":"maxProfit"}},{"kind":"Field","name":{"kind":"Name","value":"minR2"}},{"kind":"Field","name":{"kind":"Name","value":"minScore"}},{"kind":"Field","name":{"kind":"Name","value":"n"}},{"kind":"Field","name":{"kind":"Name","value":"peakAccProfit"}},{"kind":"Field","name":{"kind":"Name","value":"profitCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}},{"kind":"Field","name":{"kind":"Name","value":"totalTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalUniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnls"}},{"kind":"Field","name":{"kind":"Name","value":"window"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetTestingReportV5Query, GetTestingReportV5QueryVariables>;
export const AllLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"severity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LogSeverity"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checked"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"severity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"severity"}}},{"kind":"Argument","name":{"kind":"Name","value":"checked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checked"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<AllLogsQuery, AllLogsQueryVariables>;
export const GetLogsSeverityCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLogsSeverityCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLogsSeverityCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"counts"}}]}}]}}]} as unknown as DocumentNode<GetLogsSeverityCountsQuery, GetLogsSeverityCountsQueryVariables>;
export const CheckLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"checkLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<CheckLogMutation, CheckLogMutationVariables>;
export const NewLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checked"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"severity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LogSeverity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checked"}}},{"kind":"Argument","name":{"kind":"Name","value":"severity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"severity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<NewLogSubscription, NewLogSubscriptionVariables>;
export const CloneMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cloneMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cloneMission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CloneMissionMutation, CloneMissionMutationVariables>;
export const CloseMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"closeMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isForce"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeMission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"isForce"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isForce"}}}]}]}}]} as unknown as DocumentNode<CloseMissionMutation, CloseMissionMutationVariables>;
export const IgnoreMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ignoreMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ignoreMission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<IgnoreMissionMutation, IgnoreMissionMutationVariables>;
export const MissionCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionCreatedSubscription, MissionCreatedSubscriptionVariables>;
export const MissionUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionUpdatedSubscription, MissionUpdatedSubscriptionVariables>;
export const GetPlansByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlansByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlansByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanForwardDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetPlansByStatusQuery, GetPlansByStatusQueryVariables>;
export const GetPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlanById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetPlanByIdQuery, GetPlanByIdQueryVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const CreateAutoPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAutoPlan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAutoPlan"}}]}}]} as unknown as DocumentNode<CreateAutoPlanMutation, CreateAutoPlanMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const DeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePlanMutation, DeletePlanMutationVariables>;
export const StartPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StartPlanMutation, StartPlanMutationVariables>;
export const EndPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<EndPlanMutation, EndPlanMutationVariables>;
export const PlanCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"planCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<PlanCreatedSubscription, PlanCreatedSubscriptionVariables>;
export const PlanUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"planUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<PlanUpdatedSubscription, PlanUpdatedSubscriptionVariables>;
export const GetBlacklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBlacklist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBlacklist"}}]}}]} as unknown as DocumentNode<GetBlacklistQuery, GetBlacklistQueryVariables>;
export const AddToBlacklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addToBlacklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToBlacklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}]}}]} as unknown as DocumentNode<AddToBlacklistMutation, AddToBlacklistMutationVariables>;
export const RemoveFromBlacklistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeFromBlacklist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromBlacklist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}]}}]} as unknown as DocumentNode<RemoveFromBlacklistMutation, RemoveFromBlacklistMutationVariables>;
export const GetExpertPnlSnapshotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getExpertPnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExpertPnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"maxSize"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlRatio"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}}]}}]}}]} as unknown as DocumentNode<GetExpertPnlSnapshotsQuery, GetExpertPnlSnapshotsQueryVariables>;
export const GetWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWhitelist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWhitelist"}}]}}]} as unknown as DocumentNode<GetWhitelistQuery, GetWhitelistQueryVariables>;
export const AddToWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addToWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}]}]}}]} as unknown as DocumentNode<AddToWhitelistMutation, AddToWhitelistMutationVariables>;
export const RemoveFromWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeFromWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}]}}]} as unknown as DocumentNode<RemoveFromWhitelistMutation, RemoveFromWhitelistMutationVariables>;
export const GetAllStrategyMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllStrategyMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStrategyMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyMetadataInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyMetadataInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetAllStrategyMetadataQuery, GetAllStrategyMetadataQueryVariables>;
export const GetAllStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<GetAllStrategyQuery, GetAllStrategyQueryVariables>;
export const PauseSystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"pauseSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseSystem"}}]}}]} as unknown as DocumentNode<PauseSystemMutation, PauseSystemMutationVariables>;
export const ResumeSystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resumeSystem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeSystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ResumeSystemMutation, ResumeSystemMutationVariables>;
export const UpgradeSystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upgradeSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upgradeSystem"}}]}}]} as unknown as DocumentNode<UpgradeSystemMutation, UpgradeSystemMutationVariables>;
export const MakeSafeAppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"makeSafeApp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeSafeApp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<MakeSafeAppMutation, MakeSafeAppMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GetSystemStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSystemStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"systemStatus"}}]}}]} as unknown as DocumentNode<GetSystemStatusQuery, GetSystemStatusQueryVariables>;
export const IsSafeAppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isSafeApp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSafeApp"}}]}}]} as unknown as DocumentNode<IsSafeAppQuery, IsSafeAppQueryVariables>;
export const GetServerTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServerTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<GetServerTimeQuery, GetServerTimeQueryVariables>;
export const GetAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const UpsertTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<UpsertTagMutation, UpsertTagMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const GetAllCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagCategoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagCategoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TagCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const UpsertCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"upsertCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagCategoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagCategoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TagCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<UpsertCategoryMutation, UpsertCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagCategoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagCategoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TagCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const GetAlertTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAlertTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAlertTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetAlertTasksQuery, GetAlertTasksQueryVariables>;
export const PerformTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"performTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<PerformTaskMutation, PerformTaskMutationVariables>;
export const StopTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StopTaskMutation, StopTaskMutationVariables>;
export const TaskCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskCreatedSubscription, TaskCreatedSubscriptionVariables>;
export const TaskUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionId"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Position"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionId"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"achievePosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"targetPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskUpdatedSubscription, TaskUpdatedSubscriptionVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"singature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"singature"}}},{"kind":"Argument","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}}},{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const ChangeUserPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeUserPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"permission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<ChangeUserPermissionMutation, ChangeUserPermissionMutationVariables>;
export const AllowAutoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"allowAuto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowAuto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budget"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerContractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowAuto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowAuto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowAuto"}}},{"kind":"Argument","name":{"kind":"Name","value":"budget"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budget"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerContractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerContractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<AllowAutoMutation, AllowAutoMutationVariables>;
export const GetAllWalletAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllWalletAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllWalletAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllWalletAccountsQuery, GetAllWalletAccountsQueryVariables>;
export const AddWalletAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addWalletAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addWalletAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<AddWalletAccountMutation, AddWalletAccountMutationVariables>;
export const AddTagToWalletAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTagToWalletAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeUserTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTagToWalletAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<AddTagToWalletAccountMutation, AddTagToWalletAccountMutationVariables>;
export const RemoveTagFromWalletAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeTagFromWalletAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeUserTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTagFromWalletAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<RemoveTagFromWalletAccountMutation, RemoveTagFromWalletAccountMutationVariables>;