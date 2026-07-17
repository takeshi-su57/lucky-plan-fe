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
  /** Date custom scalar type */
  Date: { input: any; output: any; }
  /** JSON custom scalar type */
  JSON: { input: any; output: any; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String']['output'];
};

export type Action = {
  __typename?: 'Action';
  address: Scalars['String']['output'];
  args: Scalars['String']['output'];
  blockHash?: Maybe<Scalars['String']['output']>;
  blockNumber: Scalars['Int']['output'];
  contractId?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['Date']['output'];
  dedupeKey?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderInBlock: Scalars['Int']['output'];
  origin: Scalars['String']['output'];
  positionKey: Scalars['String']['output'];
  status: Scalars['String']['output'];
  txHash?: Maybe<Scalars['String']['output']>;
};

export type AssetInput = {
  address: Scalars['String']['input'];
  amount: Scalars['String']['input'];
  collateralIndex: Scalars['Int']['input'];
  contractId: Scalars['Int']['input'];
  kind: Scalars['String']['input'];
};

export type BotBackwardDetails = {
  __typename?: 'BotBackwardDetails';
  endedAt?: Maybe<Scalars['Date']['output']>;
  follower: Follower;
  followerAddress: Scalars['String']['output'];
  followerContract: Contract;
  followerContractId: Scalars['Int']['output'];
  followerEndedBlock?: Maybe<Scalars['Int']['output']>;
  followerStartedBlock?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  leaderContract: Contract;
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
  mode: BotMode;
  plan: Plan;
  planId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: BotStatus;
  strategy: Strategy;
  strategyId: Scalars['Int']['output'];
};

export type BotConnection = {
  __typename?: 'BotConnection';
  edges: Array<BotEdge>;
  pageInfo: BotPageInfo;
};

export type BotDetails = {
  __typename?: 'BotDetails';
  endedAt?: Maybe<Scalars['Date']['output']>;
  follower: Follower;
  followerAddress: Scalars['String']['output'];
  followerContract: Contract;
  followerContractId: Scalars['Int']['output'];
  followerEndedBlock?: Maybe<Scalars['Int']['output']>;
  followerStartedBlock?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  leaderContract: Contract;
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
  mode: BotMode;
  planId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
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
  endedAt?: Maybe<Scalars['Date']['output']>;
  follower: Follower;
  followerAddress: Scalars['String']['output'];
  followerContract: Contract;
  followerContractId: Scalars['Int']['output'];
  followerEndedBlock?: Maybe<Scalars['Int']['output']>;
  followerStartedBlock?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  leaderContract: Contract;
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
  missions: Array<MissionForwardDetails>;
  mode: BotMode;
  planId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: BotStatus;
  strategy: Strategy;
  strategyId: Scalars['Int']['output'];
};

export type BotGroup = {
  __typename?: 'BotGroup';
  bots: Array<BotForwardDetails>;
  hasDefault: Scalars['Boolean']['output'];
  leaderAddress: Scalars['String']['output'];
  platform: Platform;
};

export type BotGroupPaginatedResponse = {
  __typename?: 'BotGroupPaginatedResponse';
  currentPage: Scalars['Int']['output'];
  items: Array<BotGroup>;
  totalGroups: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export enum BotMode {
  Default = 'Default',
  Reversed = 'Reversed'
}

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

export type CloseTradeInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  pairIndex: Scalars['Int']['input'];
};

export type CollateralBalance = {
  __typename?: 'CollateralBalance';
  allowance?: Maybe<Scalars['String']['output']>;
  balance?: Maybe<Scalars['String']['output']>;
  collateralIndex: Scalars['Int']['output'];
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String']['output'];
  backendUrl?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  fromBlock: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastBlockNumber: Scalars['Int']['output'];
  lastLeaderboardBlockNumber: Scalars['Int']['output'];
  platform: Platform;
  status: ContractStatus;
  toBlock?: Maybe<Scalars['Int']['output']>;
  version: Version;
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
  followerAddress?: InputMaybe<Scalars['String']['input']>;
  followerContractId: Scalars['Int']['input'];
  leaderAddress: Scalars['String']['input'];
  leaderContractId: Scalars['Int']['input'];
  mode: BotMode;
  planId: Scalars['Int']['input'];
  strategy: CreateStrategyInput;
};

export type CreateBotInput = {
  followerAddress: Scalars['String']['input'];
  followerContractId: Scalars['Int']['input'];
  leaderAddress: Scalars['String']['input'];
  leaderContractId: Scalars['Int']['input'];
  mode: BotMode;
  planId: Scalars['Int']['input'];
  strategyId: Scalars['Int']['input'];
};

export type CreatePlanInput = {
  description: Scalars['String']['input'];
  scheduledEnd: Scalars['Date']['input'];
  scheduledStart: Scalars['Date']['input'];
  title: Scalars['String']['input'];
};

export type CreateSimulationBotInput = {
  leaderAddress: Scalars['String']['input'];
  leaderPlatform: Platform;
  maxCollateral?: Scalars['Float']['input'];
  maxLeverage: Scalars['Float']['input'];
  minCollateral?: Scalars['Float']['input'];
  minLeverage?: Scalars['Float']['input'];
  mode: BotMode;
  ratio: Scalars['Float']['input'];
  simulationPlanId: Scalars['Int']['input'];
};

export type CreateSimulationPlanInput = {
  description: Scalars['String']['input'];
  endAt: Scalars['Date']['input'];
  startAt: Scalars['Date']['input'];
  title: Scalars['String']['input'];
};

export type CreateSimulationResearchInput = {
  collateral: Array<FloatRangeGroupInput>;
  days?: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  direction: BotMode;
  endAt: Scalars['Date']['input'];
  executionFlow?: SimulationResearchExecutionFlow;
  gapDays?: Scalars['Int']['input'];
  leverage: Array<FloatRangeGroupInput>;
  platform: Platform;
  r2: Array<FloatRangeGroupInput>;
  score: Array<FloatRangeGroupInput>;
  scoreFormular?: SimulationScoreFormular;
  size: Array<FloatRangeGroupInput>;
  sizingFormular?: SimulationSizingFormular;
  slope: Array<FloatRangeGroupInput>;
  startAt: Scalars['Date']['input'];
  title: Scalars['String']['input'];
  trade: Array<IntRangeGroupInput>;
};

export type CreateStrategyInput = {
  lifeTime: Scalars['Int']['input'];
  maxCollateral: Scalars['Int']['input'];
  maxLeverage: Scalars['Int']['input'];
  maxOpenMissions?: Scalars['Int']['input'];
  minCollateral: Scalars['Int']['input'];
  minLeverage: Scalars['Int']['input'];
  mode?: StrategyMode;
  ratio: Scalars['Float']['input'];
  selectedPairs?: Scalars['String']['input'];
  slPercentage?: Scalars['Float']['input'];
  tpPercentage?: Scalars['Float']['input'];
};

export type DecreasePositionSizeInput = {
  address: Scalars['String']['input'];
  collateralDelta: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  leverageDelta: Scalars['Int']['input'];
  pairIndex: Scalars['Int']['input'];
};

export type FloatMinMaxInput = {
  max: Scalars['Float']['input'];
  min: Scalars['Float']['input'];
};

export type FloatRangeGroupInput = {
  ranges: Array<FloatMinMaxInput>;
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
  collateralBalances?: Maybe<Array<CollateralBalance>>;
  contractId: Scalars['Int']['output'];
  ethBalance?: Maybe<Scalars['String']['output']>;
  pendingOrders: Array<FollowerPendingOrder>;
  pnlSnapshots: Array<PnlSnapshotV2>;
  publicKey: Scalars['String']['output'];
  trades: Array<FollowerTrade>;
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
  mission?: Maybe<MissionForwardDetails>;
  params: Scalars['String']['output'];
};

export type GnsPricingRecord = {
  __typename?: 'GnsPricingRecord';
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  pair: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type IncreasePositionSizeInput = {
  address: Scalars['String']['input'];
  collateralDelta: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  leverageDelta: Scalars['Int']['input'];
  pairIndex: Scalars['Int']['input'];
};

export type IntMinMaxInput = {
  max: Scalars['Int']['input'];
  min: Scalars['Int']['input'];
};

export type IntRangeGroupInput = {
  ranges: Array<IntMinMaxInput>;
};

export type Log = {
  __typename?: 'Log';
  checked: Scalars['Boolean']['output'];
  details?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  severity: LogSeverity;
  summary: Scalars['String']['output'];
  timestamp: Scalars['Date']['output'];
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

export type ManualParams = {
  collateralAmount: Scalars['String']['input'];
  leverage: Scalars['Float']['input'];
  long: Scalars['Boolean']['input'];
};

export type MicroserviceStatus = {
  __typename?: 'MicroserviceStatus';
  pids: Array<Scalars['Int']['output']>;
  service: Scalars['String']['output'];
};

export type Mission = {
  __typename?: 'Mission';
  achievePositionBlockNumber?: Maybe<Scalars['Int']['output']>;
  achievePositionKey?: Maybe<Scalars['String']['output']>;
  achievePositionLogIndex?: Maybe<Scalars['Int']['output']>;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  mode: MissionMode;
  status: MissionStatus;
  targetPositionBlockNumber: Scalars['Int']['output'];
  targetPositionKey: Scalars['String']['output'];
  targetPositionLogIndex: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type MissionBackwardDetails = {
  __typename?: 'MissionBackwardDetails';
  achievePositionBlockNumber?: Maybe<Scalars['Int']['output']>;
  achievePositionKey?: Maybe<Scalars['String']['output']>;
  achievePositionLogIndex?: Maybe<Scalars['Int']['output']>;
  bot: BotBackwardDetails;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  mode: MissionMode;
  status: MissionStatus;
  targetPositionBlockNumber: Scalars['Int']['output'];
  targetPositionKey: Scalars['String']['output'];
  targetPositionLogIndex: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type MissionForwardDetails = {
  __typename?: 'MissionForwardDetails';
  achievePositionBlockNumber?: Maybe<Scalars['Int']['output']>;
  achievePositionKey?: Maybe<Scalars['String']['output']>;
  achievePositionLogIndex?: Maybe<Scalars['Int']['output']>;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  mode: MissionMode;
  status: MissionStatus;
  targetPositionBlockNumber: Scalars['Int']['output'];
  targetPositionKey: Scalars['String']['output'];
  targetPositionLogIndex: Scalars['Int']['output'];
  tasks: Array<TaskForwardDetails>;
  updatedAt: Scalars['Date']['output'];
};

export enum MissionMode {
  Default = 'Default',
  Signal = 'Signal'
}

export type MissionShallowBackwardDetails = {
  __typename?: 'MissionShallowBackwardDetails';
  achievePositionBlockNumber?: Maybe<Scalars['Int']['output']>;
  achievePositionKey?: Maybe<Scalars['String']['output']>;
  achievePositionLogIndex?: Maybe<Scalars['Int']['output']>;
  bot: BotDetails;
  botId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  mode: MissionMode;
  status: MissionStatus;
  targetPositionBlockNumber: Scalars['Int']['output'];
  targetPositionKey: Scalars['String']['output'];
  targetPositionLogIndex: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
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
  allowAuto: User;
  approveSimulationEvaluatorWorker: SimulationEvaluatorWorkerView;
  batchCreateBots: Array<BotBackwardDetails>;
  batchCreateSimulationBots: Array<SimulationBot>;
  buildPnlSnapshotsV2: Scalars['Boolean']['output'];
  cancelOrderAfterTimeout: ContractExecutionResult;
  cancelResearch: SimulationResearch;
  cancelSimulation: Simulation;
  changePassword: Scalars['Boolean']['output'];
  changeUserPermission: User;
  checkLog: Log;
  cleanDB: Scalars['Boolean']['output'];
  cloneMission: Scalars['Boolean']['output'];
  closeMission: Scalars['Boolean']['output'];
  closeTradeMarket: ContractExecutionResult;
  createBot: BotBackwardDetails;
  createPlan: Plan;
  createSLTP: SltpRequest;
  createSimulationPlan: SimulationPlan;
  createSimulationResearch: SimulationResearch;
  decreaseAllowanceToZero: Scalars['Boolean']['output'];
  decreasePositionSize: ContractExecutionResult;
  deleteBot: BotBackwardDetails;
  deletePlan: Scalars['Int']['output'];
  deleteSLTP: SltpRequest;
  deleteSimulation: Scalars['Int']['output'];
  deleteSimulationBot: Scalars['Int']['output'];
  deleteSimulationPlan: Scalars['Int']['output'];
  deleteSimulationResearch: Scalars['Int']['output'];
  depositAsset: Scalars['Boolean']['output'];
  disableContract: Contract;
  dynamicSnapshotBuildV2: Scalars['Boolean']['output'];
  endPlan: Scalars['Boolean']['output'];
  generateNewFollower: Follower;
  getToken: AccessToken;
  ignoreMission: Scalars['Boolean']['output'];
  increaseAllowanceToMax: Scalars['Boolean']['output'];
  increasePositionSize: ContractExecutionResult;
  initializePnlSnapshotV2: Scalars['Boolean']['output'];
  killSubService: Scalars['Boolean']['output'];
  liveBot: Scalars['Boolean']['output'];
  liveContract: Contract;
  makeSafeApp: Scalars['Boolean']['output'];
  openTradeMarket: ContractExecutionResult;
  pauseResearch: SimulationResearch;
  pauseSystem: Scalars['Boolean']['output'];
  playAutoResearch: SimulationResearch;
  playSimulationPlan: SimulationPlan;
  prebuildSimulationEvaluatorWorker: Scalars['String']['output'];
  rejectSimulationEvaluatorWorker: SimulationEvaluatorWorkerView;
  removeRejectedSimulationEvaluatorWorker: Scalars['Boolean']['output'];
  resumeSystem: Scalars['Boolean']['output'];
  startAdaption: Scalars['Boolean']['output'];
  startPlan: Scalars['Boolean']['output'];
  startSubService: Scalars['Boolean']['output'];
  stopBot: Scalars['Boolean']['output'];
  stopSimulationBot: SimulationBot;
  stopTask: Scalars['Boolean']['output'];
  updateLeverage: ContractExecutionResult;
  updateMaxOpenMissions: Scalars['Boolean']['output'];
  updatePlan: Plan;
  updateSimulation: Simulation;
  updateSimulationBot: SimulationBot;
  updateSimulationResearch: SimulationResearch;
  updateSl: ContractExecutionResult;
  updateStrategy: Strategy;
  updateTp: ContractExecutionResult;
  withdrawAllETH: Scalars['Boolean']['output'];
  withdrawAllErc20: Scalars['Boolean']['output'];
  withdrawAsset: Scalars['Boolean']['output'];
  withdrawETHToUser: Scalars['Boolean']['output'];
  withdrawErc20ToUser: Scalars['Boolean']['output'];
  withdrawPositivePnl: ContractExecutionResult;
};


export type MutationAllowAutoArgs = {
  address: Scalars['String']['input'];
  allowAuto: Scalars['Boolean']['input'];
  budget: Scalars['Float']['input'];
  followerContractId: Scalars['Int']['input'];
  ratio: Scalars['Float']['input'];
};


export type MutationApproveSimulationEvaluatorWorkerArgs = {
  workerId: Scalars['String']['input'];
};


export type MutationBatchCreateBotsArgs = {
  input: Array<CreateBotAndStrategyInput>;
};


export type MutationBatchCreateSimulationBotsArgs = {
  inputs: Array<CreateSimulationBotInput>;
};


export type MutationBuildPnlSnapshotsV2Args = {
  dateStr: Scalars['String']['input'];
  isForceBuild: Scalars['Boolean']['input'];
  platform: Platform;
};


export type MutationCancelOrderAfterTimeoutArgs = {
  input: CancelOrderAfterTimeoutInput;
};


export type MutationCancelResearchArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCancelSimulationArgs = {
  id: Scalars['Int']['input'];
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
  manualParams?: InputMaybe<ManualParams>;
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


export type MutationCreateSltpArgs = {
  input: SltpRequestInput;
};


export type MutationCreateSimulationPlanArgs = {
  input: CreateSimulationPlanInput;
};


export type MutationCreateSimulationResearchArgs = {
  input: CreateSimulationResearchInput;
};


export type MutationDecreaseAllowanceToZeroArgs = {
  collateralIndex: Scalars['Int']['input'];
  contractId: Scalars['Int']['input'];
  followerAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDecreasePositionSizeArgs = {
  input: DecreasePositionSizeInput;
};


export type MutationDeleteBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSltpArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSimulationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSimulationBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSimulationPlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSimulationResearchArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDepositAssetArgs = {
  input: AssetInput;
};


export type MutationDisableContractArgs = {
  contractId: Scalars['Int']['input'];
};


export type MutationDynamicSnapshotBuildV2Args = {
  dateStr: Scalars['String']['input'];
  platform: Platform;
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


export type MutationIncreaseAllowanceToMaxArgs = {
  collateralIndex: Scalars['Int']['input'];
  contractId: Scalars['Int']['input'];
  followerAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationIncreasePositionSizeArgs = {
  input: IncreasePositionSizeInput;
};


export type MutationInitializePnlSnapshotV2Args = {
  beginingDate: Scalars['Date']['input'];
  isForceBuild: Scalars['Boolean']['input'];
  platform: Platform;
};


export type MutationKillSubServiceArgs = {
  service: Scalars['String']['input'];
};


export type MutationLiveBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLiveContractArgs = {
  contractId: Scalars['Int']['input'];
  fromBlock?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationMakeSafeAppArgs = {
  password: Scalars['String']['input'];
};


export type MutationOpenTradeMarketArgs = {
  input: OpenTradeInput;
};


export type MutationPauseResearchArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPlayAutoResearchArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPlaySimulationPlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPrebuildSimulationEvaluatorWorkerArgs = {
  endedAt: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  startedAt: Scalars['String']['input'];
  workerId: Scalars['String']['input'];
};


export type MutationRejectSimulationEvaluatorWorkerArgs = {
  workerId: Scalars['String']['input'];
};


export type MutationRemoveRejectedSimulationEvaluatorWorkerArgs = {
  workerId: Scalars['String']['input'];
};


export type MutationResumeSystemArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationStartAdaptionArgs = {
  contractId: Scalars['Int']['input'];
  shouldRestart: Scalars['Boolean']['input'];
};


export type MutationStartPlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationStartSubServiceArgs = {
  service: Scalars['String']['input'];
};


export type MutationStopBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationStopSimulationBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationStopTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateLeverageArgs = {
  input: UpdateLeverageInput;
};


export type MutationUpdateMaxOpenMissionsArgs = {
  maxCount: Scalars['Int']['input'];
};


export type MutationUpdatePlanArgs = {
  updatePlanInput: UpdatePlanInput;
};


export type MutationUpdateSimulationArgs = {
  input: UpdateSimulationInput;
};


export type MutationUpdateSimulationBotArgs = {
  input: UpdateSimulationBotInput;
};


export type MutationUpdateSimulationResearchArgs = {
  input: UpdateSimulationResearchInput;
};


export type MutationUpdateSlArgs = {
  input: UpdateSlInput;
};


export type MutationUpdateStrategyArgs = {
  id: Scalars['Int']['input'];
  input: UpdateStrategyInput;
};


export type MutationUpdateTpArgs = {
  input: UpdateTpInput;
};


export type MutationWithdrawAllEthArgs = {
  input: WithdrawAllInput;
};


export type MutationWithdrawAllErc20Args = {
  input: WithdrawAllInput;
};


export type MutationWithdrawAssetArgs = {
  input: AssetInput;
};


export type MutationWithdrawEthToUserArgs = {
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};


export type MutationWithdrawErc20ToUserArgs = {
  amount: Scalars['Float']['input'];
  collateralIndex: Scalars['Int']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};


export type MutationWithdrawPositivePnlArgs = {
  input: WithdrawPositivePnlInput;
};

export type OpenTradeInput = {
  address: Scalars['String']['input'];
  collateralAmount: Scalars['String']['input'];
  collateralIndex: Scalars['Int']['input'];
  contractId: Scalars['Int']['input'];
  leverage: Scalars['Int']['input'];
  long: Scalars['Boolean']['input'];
  maxSlippageP: Scalars['Int']['input'];
  pairIndex: Scalars['Int']['input'];
  sl: Scalars['String']['input'];
  tp: Scalars['String']['input'];
};

export type PerpTradeHistory = {
  __typename?: 'PerpTradeHistory';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  collateralDeltaUsd: Scalars['Float']['output'];
  collateralInUsd: Scalars['Float']['output'];
  collateralUsdPrice: Scalars['Float']['output'];
  contractId: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  isLong: Scalars['Boolean']['output'];
  leverage: Scalars['Float']['output'];
  leverageDelta: Scalars['Float']['output'];
  operation: PerpTradeHistoryOperation;
  pair: Scalars['String']['output'];
  platform: Platform;
  positionKey: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sizeDeltaUsd: Scalars['Float']['output'];
  sizeInUsd: Scalars['Float']['output'];
  usdBasePnl: Scalars['Float']['output'];
  usdFee: Scalars['Float']['output'];
  usdPnl: Scalars['Float']['output'];
};

export enum PerpTradeHistoryOperation {
  Close = 'CLOSE',
  DecreaseLeverage = 'DECREASE_LEVERAGE',
  DecreaseSize = 'DECREASE_SIZE',
  IncreaseLeverage = 'INCREASE_LEVERAGE',
  IncreaseSize = 'INCREASE_SIZE',
  Open = 'OPEN',
  PnlWithdraw = 'PNL_WITHDRAW'
}

export type PerpTradePosition = {
  __typename?: 'PerpTradePosition';
  histories: Array<PerpTradeHistory>;
};

export type PerpTradePositionsWithSummary = {
  __typename?: 'PerpTradePositionsWithSummary';
  avgCollateral: Scalars['Float']['output'];
  avgDuration: Scalars['Float']['output'];
  avgLeverage: Scalars['Float']['output'];
  avgNegativePnl: Scalars['Float']['output'];
  avgPnl: Scalars['Float']['output'];
  avgPnlPercentageByCollateral: Scalars['Float']['output'];
  avgPnlPercentageBySize: Scalars['Float']['output'];
  avgPositivePnl: Scalars['Float']['output'];
  avgSize: Scalars['Float']['output'];
  maxDuration: Scalars['Float']['output'];
  openedPositions: Scalars['Int']['output'];
  positions: Array<PerpTradePosition>;
  totalPnl: Scalars['Float']['output'];
  totalPositions: Scalars['Int']['output'];
};

export type Plan = {
  __typename?: 'Plan';
  description: Scalars['String']['output'];
  endedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  scheduledEnd: Scalars['Date']['output'];
  scheduledStart: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
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
  endedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  scheduledEnd: Scalars['Date']['output'];
  scheduledStart: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
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

export type PlanSummary = {
  __typename?: 'PlanSummary';
  botCount: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  endedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['Int']['output'];
  scheduledEnd: Scalars['Date']['output'];
  scheduledStart: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: PlanStatus;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type PlanSummaryConnection = {
  __typename?: 'PlanSummaryConnection';
  edges: Array<PlanSummaryEdge>;
  pageInfo: PlanPageInfo;
};

export type PlanSummaryEdge = {
  __typename?: 'PlanSummaryEdge';
  cursor: Scalars['Int']['output'];
  node: PlanSummary;
};

export enum Platform {
  Avnt = 'AVNT',
  Gmx = 'GMX',
  Gns = 'GNS'
}

export type PnlSnapshotV2 = {
  __typename?: 'PnlSnapshotV2';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  dateStr: Scalars['String']['output'];
  platform: Platform;
};

export type PnlSnapshotV2Details = {
  __typename?: 'PnlSnapshotV2Details';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  dateStr: Scalars['String']['output'];
  platform: Platform;
  positionsWithSummary: PerpTradePositionsWithSummary;
};

export type PnlSnapshotV2DetailsPaginatedResponse = {
  __typename?: 'PnlSnapshotV2DetailsPaginatedResponse';
  currentPage: Scalars['Int']['output'];
  items: Array<PnlSnapshotV2Details>;
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PnlSnapshotV2InitializedFlag = {
  __typename?: 'PnlSnapshotV2InitializedFlag';
  dateStr: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isInit: Scalars['Boolean']['output'];
  platform: Platform;
};

export type Query = {
  __typename?: 'Query';
  allLogs: LogsConnection;
  findContract: Contract;
  findStrategy?: Maybe<Strategy>;
  getALLSLTPs: Array<SltpRequest>;
  getActiveBots: Array<BotForwardDetails>;
  getAdaptionStatus: Scalars['String']['output'];
  getAlertTasks: Array<TaskBackwardDetails>;
  getAllContracts: Array<Contract>;
  getAllFollowerDetails: FollowerConnection;
  getAllFollowers: Array<Follower>;
  getAllStrategy: Array<Strategy>;
  getAllUsers: Array<User>;
  getBotsByStatus: BotConnection;
  getGnsPrices: Array<GnsPricingRecord>;
  getLogsSeverityCounts: Array<SeverityCount>;
  getMaxOpenMissions: Scalars['Int']['output'];
  getMicroserviceStatus: Array<MicroserviceStatus>;
  getPerpTradePositions: PerpTradePositionsWithSummary;
  getPlanBotGroups: BotGroupPaginatedResponse;
  getPlanById?: Maybe<Plan>;
  getPlanSummariesByStatus: PlanSummaryConnection;
  getPlansByStatus: PlanConnection;
  getPnlSnapshotV2InitializedFlag: Array<PnlSnapshotV2InitializedFlag>;
  getPnlSnapshotsV2: PnlSnapshotV2DetailsPaginatedResponse;
  getServerTime: ServerTime;
  getSimulationPlanById: SimulationPlanDetails;
  getSimulationPlans: SimulationPlanConnection;
  isPnlSnapshotV2Initialized?: Maybe<PnlSnapshotV2InitializedFlag>;
  isSafeApp: Scalars['Boolean']['output'];
  simulation?: Maybe<Simulation>;
  simulationEvaluatorWorkers: Array<SimulationEvaluatorWorkerView>;
  simulationPlanDetailsBySimulation: Array<SimulationPlanDetails>;
  simulationPlansBySimulation: Array<SimulationPlan>;
  simulationResearch?: Maybe<SimulationResearchDetails>;
  simulationResearches: SimulationResearchConnection;
  simulations: SimulationConnection;
  simulationsByResearch: Array<Simulation>;
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


export type QueryGetGnsPricesArgs = {
  fromDate: Scalars['Date']['input'];
  pairName: Scalars['String']['input'];
  toDate: Scalars['Date']['input'];
};


export type QueryGetPerpTradePositionsArgs = {
  address: Scalars['String']['input'];
  endedAt?: InputMaybe<Scalars['Date']['input']>;
  maxLeverage?: InputMaybe<Scalars['Float']['input']>;
  platform: Platform;
  startedAt?: InputMaybe<Scalars['Date']['input']>;
  stoppedAt?: InputMaybe<Scalars['Date']['input']>;
};


export type QueryGetPlanBotGroupsArgs = {
  page?: Scalars['Int']['input'];
  pageSize?: Scalars['Int']['input'];
  planId: Scalars['Int']['input'];
};


export type QueryGetPlanByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPlanSummariesByStatusArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  status: PlanStatus;
};


export type QueryGetPlansByStatusArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
  status: PlanStatus;
};


export type QueryGetPnlSnapshotV2InitializedFlagArgs = {
  platform: Platform;
};


export type QueryGetPnlSnapshotsV2Args = {
  dateStr: Scalars['String']['input'];
  isDesc: Scalars['Boolean']['input'];
  maxLeverage?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  platform: Platform;
};


export type QueryGetSimulationPlanByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetSimulationPlansArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QueryIsPnlSnapshotV2InitializedArgs = {
  dateStr: Scalars['String']['input'];
  platform: Platform;
};


export type QuerySimulationArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySimulationPlanDetailsBySimulationArgs = {
  simulationId: Scalars['Int']['input'];
};


export type QuerySimulationPlansBySimulationArgs = {
  simulationId: Scalars['Int']['input'];
};


export type QuerySimulationResearchArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySimulationResearchesArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QuerySimulationsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
};


export type QuerySimulationsByResearchArgs = {
  researchId: Scalars['Int']['input'];
};

export type SltpRequest = {
  __typename?: 'SLTPRequest';
  address: Scalars['String']['output'];
  condition: Scalars['String']['output'];
  contractId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  positionKey: Scalars['String']['output'];
};

export type SltpRequestInput = {
  address: Scalars['String']['input'];
  condition: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  positionKey: Scalars['String']['input'];
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

export type Simulation = {
  __typename?: 'Simulation';
  collateral: Array<SimulationValueRange>;
  completedPlans: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  cursor?: Maybe<Scalars['Date']['output']>;
  days: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  direction: BotMode;
  endAt: Scalars['Date']['output'];
  error?: Maybe<Scalars['String']['output']>;
  gapDays: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  leverage: Array<SimulationValueRange>;
  maxDrawdownUsd: Scalars['Float']['output'];
  platform: Platform;
  profitFactor: Scalars['Float']['output'];
  progressMessage?: Maybe<Scalars['String']['output']>;
  progressPercent: Scalars['Float']['output'];
  progressPhase?: Maybe<Scalars['String']['output']>;
  r2: Array<SimulationValueRange>;
  researchId?: Maybe<Scalars['Int']['output']>;
  score: Array<SimulationValueRange>;
  scoreFormular: SimulationScoreFormular;
  selectedLeaderCount: Scalars['Int']['output'];
  size: Array<SimulationValueRange>;
  sizingFormular: SimulationSizingFormular;
  slope: Array<SimulationValueRange>;
  standardCollateralUsd: Scalars['Float']['output'];
  startAt: Scalars['Date']['output'];
  status: SimulationStatus;
  title: Scalars['String']['output'];
  totalCostUsd: Scalars['Float']['output'];
  totalFollowerPnl: Scalars['Float']['output'];
  totalLeaderPnl: Scalars['Float']['output'];
  totalNetPnlUsd: Scalars['Float']['output'];
  totalSimulationPlans: Scalars['Int']['output'];
  trade: Array<SimulationTradeRange>;
  tradeCount: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
  winRate: Scalars['Float']['output'];
};

export type SimulationBot = {
  __typename?: 'SimulationBot';
  avgCollateral: Scalars['Float']['output'];
  avgDuration: Scalars['Float']['output'];
  avgLeverage: Scalars['Float']['output'];
  avgNegativePnl: Scalars['Float']['output'];
  avgPnl: Scalars['Float']['output'];
  avgPnlPercentageByCollateral: Scalars['Float']['output'];
  avgPnlPercentageBySize: Scalars['Float']['output'];
  avgPositivePnl: Scalars['Float']['output'];
  avgSize: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  leaderPlatform: Platform;
  maxCollateral: Scalars['Float']['output'];
  maxDuration: Scalars['Float']['output'];
  maxLeverage: Scalars['Float']['output'];
  minCollateral: Scalars['Float']['output'];
  minLeverage: Scalars['Float']['output'];
  mode: BotMode;
  openedPositions: Scalars['Int']['output'];
  ratio: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
  simulationPlanId: Scalars['Int']['output'];
  startedAt: Scalars['Date']['output'];
  stoppedAt?: Maybe<Scalars['Date']['output']>;
  totalPnl: Scalars['Float']['output'];
  totalPositions: Scalars['Int']['output'];
};

export type SimulationBotCacheState = {
  __typename?: 'SimulationBotCacheState';
  completed: Scalars['Boolean']['output'];
  lastError?: Maybe<Scalars['String']['output']>;
  lastFetchedAt?: Maybe<Scalars['Date']['output']>;
  rebuildRequested: Scalars['Boolean']['output'];
  rebuilding: Scalars['Boolean']['output'];
};

export type SimulationBotDetails = {
  __typename?: 'SimulationBotDetails';
  avgCollateral: Scalars['Float']['output'];
  avgDuration: Scalars['Float']['output'];
  avgLeverage: Scalars['Float']['output'];
  avgNegativePnl: Scalars['Float']['output'];
  avgPnl: Scalars['Float']['output'];
  avgPnlPercentageByCollateral: Scalars['Float']['output'];
  avgPnlPercentageBySize: Scalars['Float']['output'];
  avgPositivePnl: Scalars['Float']['output'];
  avgSize: Scalars['Float']['output'];
  cacheState?: Maybe<SimulationBotCacheState>;
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  leaderPlatform: Platform;
  maxCollateral: Scalars['Float']['output'];
  maxDuration: Scalars['Float']['output'];
  maxLeverage: Scalars['Float']['output'];
  minCollateral: Scalars['Float']['output'];
  minLeverage: Scalars['Float']['output'];
  mode: BotMode;
  openedPositions: Scalars['Int']['output'];
  positions: Array<SimulationTradePosition>;
  ratio: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
  simulationPlanId: Scalars['Int']['output'];
  startedAt: Scalars['Date']['output'];
  stoppedAt?: Maybe<Scalars['Date']['output']>;
  totalPnl: Scalars['Float']['output'];
  totalPositions: Scalars['Int']['output'];
};

export type SimulationConnection = {
  __typename?: 'SimulationConnection';
  edges: Array<SimulationEdge>;
  pageInfo: SimulationPageInfo;
};

export type SimulationEdge = {
  __typename?: 'SimulationEdge';
  cursor: Scalars['Int']['output'];
  node: Simulation;
};

export type SimulationEvaluatorWorkerCacheView = {
  __typename?: 'SimulationEvaluatorWorkerCacheView';
  coveredEndAt?: Maybe<Scalars['Date']['output']>;
  coveredStartAt?: Maybe<Scalars['Date']['output']>;
  lastError?: Maybe<Scalars['String']['output']>;
  platform: Scalars['String']['output'];
  status: Scalars['String']['output'];
};

export type SimulationEvaluatorWorkerPrebuildProgressView = {
  __typename?: 'SimulationEvaluatorWorkerPrebuildProgressView';
  bytes: Scalars['String']['output'];
  message: Scalars['String']['output'];
  percent: Scalars['Float']['output'];
  records: Scalars['String']['output'];
  taskId: Scalars['String']['output'];
  totalRecords: Scalars['String']['output'];
};

export type SimulationEvaluatorWorkerView = {
  __typename?: 'SimulationEvaluatorWorkerView';
  authorizationStatus: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastError?: Maybe<Scalars['String']['output']>;
  lastHeartbeatAt?: Maybe<Scalars['Date']['output']>;
  lastTaskAt?: Maybe<Scalars['Date']['output']>;
  platformCaches: Array<SimulationEvaluatorWorkerCacheView>;
  prebuildProgress?: Maybe<SimulationEvaluatorWorkerPrebuildProgressView>;
  runtimeStatus: Scalars['String']['output'];
};

export type SimulationPageInfo = {
  __typename?: 'SimulationPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type SimulationPlan = {
  __typename?: 'SimulationPlan';
  cursor: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  endAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  openedPositions: Scalars['Int']['output'];
  simulationBots: Array<SimulationBot>;
  simulationId?: Maybe<Scalars['Int']['output']>;
  startAt: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  totalFollowerPnl: Scalars['Float']['output'];
  totalLeaderPnl: Scalars['Float']['output'];
  totalPositions: Scalars['Int']['output'];
};

export type SimulationPlanConnection = {
  __typename?: 'SimulationPlanConnection';
  edges: Array<SimulationPlanEdge>;
  pageInfo: SimulationPlanPageInfo;
};

export type SimulationPlanDetails = {
  __typename?: 'SimulationPlanDetails';
  cursor: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  endAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  openedPositions: Scalars['Int']['output'];
  simulationBots: Array<SimulationBotDetails>;
  simulationId?: Maybe<Scalars['Int']['output']>;
  startAt: Scalars['Date']['output'];
  title: Scalars['String']['output'];
  totalFollowerPnl: Scalars['Float']['output'];
  totalLeaderPnl: Scalars['Float']['output'];
  totalPositions: Scalars['Int']['output'];
};

export type SimulationPlanEdge = {
  __typename?: 'SimulationPlanEdge';
  cursor: Scalars['Int']['output'];
  node: SimulationPlan;
};

export type SimulationPlanPageInfo = {
  __typename?: 'SimulationPlanPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type SimulationResearch = {
  __typename?: 'SimulationResearch';
  collateral: Array<SimulationValueRangeGroup>;
  completedRanges: Scalars['Int']['output'];
  completedSimulations: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  cursor?: Maybe<Scalars['Date']['output']>;
  days: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  direction: BotMode;
  endAt: Scalars['Date']['output'];
  executionFlow: SimulationResearchExecutionFlow;
  finishedAt?: Maybe<Scalars['Date']['output']>;
  gapDays: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastError?: Maybe<Scalars['String']['output']>;
  leverage: Array<SimulationValueRangeGroup>;
  platform: Platform;
  progressMessage?: Maybe<Scalars['String']['output']>;
  progressPercent: Scalars['Float']['output'];
  progressPhase?: Maybe<Scalars['String']['output']>;
  r2: Array<SimulationValueRangeGroup>;
  score: Array<SimulationValueRangeGroup>;
  scoreFormular: SimulationScoreFormular;
  size: Array<SimulationValueRangeGroup>;
  sizingFormular: SimulationSizingFormular;
  slope: Array<SimulationValueRangeGroup>;
  startAt: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: SimulationStatus;
  title: Scalars['String']['output'];
  totalRanges: Scalars['Int']['output'];
  totalSimulations: Scalars['Int']['output'];
  trade: Array<SimulationTradeRangeGroup>;
  updatedAt: Scalars['Date']['output'];
};

export type SimulationResearchConnection = {
  __typename?: 'SimulationResearchConnection';
  edges: Array<SimulationResearchEdge>;
  pageInfo: SimulationResearchPageInfo;
};

export type SimulationResearchDetails = {
  __typename?: 'SimulationResearchDetails';
  collateral: Array<SimulationValueRangeGroup>;
  completedRanges: Scalars['Int']['output'];
  completedSimulations: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  cursor?: Maybe<Scalars['Date']['output']>;
  days: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  direction: BotMode;
  endAt: Scalars['Date']['output'];
  executionFlow: SimulationResearchExecutionFlow;
  finishedAt?: Maybe<Scalars['Date']['output']>;
  gapDays: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lastError?: Maybe<Scalars['String']['output']>;
  leverage: Array<SimulationValueRangeGroup>;
  platform: Platform;
  progressMessage?: Maybe<Scalars['String']['output']>;
  progressPercent: Scalars['Float']['output'];
  progressPhase?: Maybe<Scalars['String']['output']>;
  r2: Array<SimulationValueRangeGroup>;
  score: Array<SimulationValueRangeGroup>;
  scoreFormular: SimulationScoreFormular;
  simulations: Array<Simulation>;
  size: Array<SimulationValueRangeGroup>;
  sizingFormular: SimulationSizingFormular;
  slope: Array<SimulationValueRangeGroup>;
  startAt: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: SimulationStatus;
  title: Scalars['String']['output'];
  totalRanges: Scalars['Int']['output'];
  totalSimulations: Scalars['Int']['output'];
  trade: Array<SimulationTradeRangeGroup>;
  updatedAt: Scalars['Date']['output'];
};

export type SimulationResearchEdge = {
  __typename?: 'SimulationResearchEdge';
  cursor: Scalars['Int']['output'];
  node: SimulationResearch;
};

export enum SimulationResearchExecutionFlow {
  Centralized = 'Centralized',
  DynamicExperimental = 'DynamicExperimental'
}

export type SimulationResearchPageInfo = {
  __typename?: 'SimulationResearchPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export enum SimulationScoreFormular {
  RiskAdjustedCopyScore = 'RiskAdjustedCopyScore'
}

export enum SimulationSizingFormular {
  ScoreScaledCollateralSizing = 'ScoreScaledCollateralSizing'
}

export enum SimulationStatus {
  Cancelled = 'Cancelled',
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Paused = 'Paused',
  Queued = 'Queued',
  Running = 'Running'
}

export type SimulationTradeHistory = {
  __typename?: 'SimulationTradeHistory';
  follower: PerpTradeHistory;
  leader: PerpTradeHistory;
};

export type SimulationTradePosition = {
  __typename?: 'SimulationTradePosition';
  followerPnl: Scalars['Float']['output'];
  histories: Array<SimulationTradeHistory>;
  leaderPnl: Scalars['Float']['output'];
};

export type SimulationTradeRange = {
  __typename?: 'SimulationTradeRange';
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

export type SimulationTradeRangeGroup = {
  __typename?: 'SimulationTradeRangeGroup';
  ranges: Array<SimulationTradeRange>;
};

export type SimulationValueRange = {
  __typename?: 'SimulationValueRange';
  max: Scalars['Float']['output'];
  min: Scalars['Float']['output'];
};

export type SimulationValueRangeGroup = {
  __typename?: 'SimulationValueRangeGroup';
  ranges: Array<SimulationValueRange>;
};

export type Strategy = {
  __typename?: 'Strategy';
  id: Scalars['Int']['output'];
  lifeTime: Scalars['Int']['output'];
  maxCollateral: Scalars['Int']['output'];
  maxLeverage: Scalars['Int']['output'];
  maxOpenMissions: Scalars['Int']['output'];
  minCollateral: Scalars['Int']['output'];
  minLeverage: Scalars['Int']['output'];
  mode: StrategyMode;
  ratio: Scalars['Float']['output'];
  selectedPairs: Scalars['String']['output'];
  slPercentage: Scalars['Float']['output'];
  tpPercentage: Scalars['Float']['output'];
};

export enum StrategyMode {
  Default = 'Default',
  Signal = 'Signal'
}

export type Subscription = {
  __typename?: 'Subscription';
  botCreated: Array<BotBackwardDetails>;
  botUpdated: Array<BotBackwardDetails>;
  missionCreated: Array<MissionBackwardDetails>;
  missionUpdated: Array<MissionBackwardDetails>;
  newLog: Log;
  planCreated: Plan;
  planUpdated: Plan;
  simulationPlanUpdated: SimulationPlan;
  simulationResearchUpdated: SimulationResearch;
  simulationUpdated: Simulation;
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

export type TaskBackwardDetails = {
  __typename?: 'TaskBackwardDetails';
  action: Action;
  actionId: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
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
  createdAt: Scalars['Date']['output'];
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

export type UpdateLeverageInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  newLeverage: Scalars['Int']['input'];
};

export type UpdatePlanInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endedAt?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['Int']['input'];
  scheduledEnd?: InputMaybe<Scalars['Date']['input']>;
  scheduledStart?: InputMaybe<Scalars['Date']['input']>;
  startedAt?: InputMaybe<Scalars['Date']['input']>;
  status: PlanStatus;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateSimulationBotInput = {
  id: Scalars['Int']['input'];
  maxCollateral?: InputMaybe<Scalars['Float']['input']>;
  maxLeverage?: InputMaybe<Scalars['Float']['input']>;
  minCollateral?: InputMaybe<Scalars['Float']['input']>;
  minLeverage?: InputMaybe<Scalars['Float']['input']>;
  mode?: InputMaybe<BotMode>;
  ratio?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateSimulationInput = {
  collateral?: InputMaybe<FloatMinMaxInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<BotMode>;
  id: Scalars['Int']['input'];
  leverage?: InputMaybe<FloatMinMaxInput>;
  r2?: InputMaybe<FloatMinMaxInput>;
  score?: InputMaybe<FloatMinMaxInput>;
  scoreFormular?: InputMaybe<SimulationScoreFormular>;
  selectedLeaderCount?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<FloatMinMaxInput>;
  sizingFormular?: InputMaybe<SimulationSizingFormular>;
  slope?: InputMaybe<FloatMinMaxInput>;
  standardCollateralUsd?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  trade?: InputMaybe<IntMinMaxInput>;
};

export type UpdateSimulationResearchInput = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type UpdateSlInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  newSl: Scalars['String']['input'];
};

export type UpdateStrategyInput = {
  lifeTime: Scalars['Int']['input'];
  maxCollateral: Scalars['Int']['input'];
  maxLeverage: Scalars['Int']['input'];
  maxOpenMissions: Scalars['Int']['input'];
  minCollateral: Scalars['Int']['input'];
  minLeverage: Scalars['Int']['input'];
  mode: StrategyMode;
  ratio: Scalars['Float']['input'];
  selectedPairs: Scalars['String']['input'];
  slPercentage: Scalars['Float']['input'];
  tpPercentage: Scalars['Float']['input'];
};

export type UpdateTpInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  newTp: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  allowAuto: Scalars['Boolean']['output'];
  budget: Scalars['Float']['output'];
  followerContractId: Scalars['Int']['output'];
  permission: UserPermission;
  ratio: Scalars['Float']['output'];
  secondAddress?: Maybe<Scalars['String']['output']>;
};

export enum UserPermission {
  Admin = 'Admin',
  Trader = 'Trader',
  Trial = 'Trial'
}

export enum Version {
  V1 = 'V1',
  V2 = 'V2',
  V9 = 'V9',
  V10 = 'V10'
}

export type WithdrawAllInput = {
  address: Scalars['String']['input'];
  collateralIndex: Scalars['Int']['input'];
  contractId: Scalars['Int']['input'];
};

export type WithdrawPositivePnlInput = {
  address: Scalars['String']['input'];
  amountCollateral: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
};

export type BotDetailsInfoFragment = { __typename?: 'BotDetails', id: number, leaderAddress: string, followerAddress: string, strategyId: number, planId: number, leaderContractId: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus, mode: BotMode, followerContract: (
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

export type BotForwardDetailsInfoFragment = { __typename?: 'BotForwardDetails', id: number, leaderAddress: string, followerAddress: string, strategyId: number, planId: number, leaderContractId: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus, mode: BotMode, followerContract: (
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

export type BotBackwardDetailsInfoFragment = { __typename?: 'BotBackwardDetails', id: number, leaderAddress: string, followerAddress: string, strategyId: number, planId: number, leaderContractId: number, leaderStartedBlock?: number | null, leaderEndedBlock?: number | null, followerContractId: number, followerStartedBlock?: number | null, followerEndedBlock?: number | null, startedAt?: any | null, endedAt?: any | null, status: BotStatus, mode: BotMode, followerContract: (
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

export type ContractInfoFragment = { __typename?: 'Contract', id: number, chainId: number, address: string, backendUrl?: string | null, description: string, status: ContractStatus, fromBlock: number, lastBlockNumber: number, lastLeaderboardBlockNumber: number, platform: Platform, toBlock?: number | null, version: Version } & { ' $fragmentName'?: 'ContractInfoFragment' };

export type GetAllContractsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllContractsQuery = { __typename?: 'Query', getAllContracts: Array<(
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  )> };

export type GetAdaptionStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdaptionStatusQuery = { __typename?: 'Query', getAdaptionStatus: string };

export type DisableContractMutationVariables = Exact<{
  contractId: Scalars['Int']['input'];
}>;


export type DisableContractMutation = { __typename?: 'Mutation', disableContract: (
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  ) };

export type LiveContractMutationVariables = Exact<{
  contractId: Scalars['Int']['input'];
  fromBlock?: InputMaybe<Scalars['Int']['input']>;
}>;


export type LiveContractMutation = { __typename?: 'Mutation', liveContract: (
    { __typename?: 'Contract' }
    & { ' $fragmentRefs'?: { 'ContractInfoFragment': ContractInfoFragment } }
  ) };

export type StartAdaptionMutationVariables = Exact<{
  contractId: Scalars['Int']['input'];
  shouldRestart: Scalars['Boolean']['input'];
}>;


export type StartAdaptionMutation = { __typename?: 'Mutation', startAdaption: boolean };

export type FollowerInfoFragment = { __typename?: 'Follower', userId: string, address: string, accountIndex: number, publicKey: string } & { ' $fragmentName'?: 'FollowerInfoFragment' };

export type FollowerTradeInfoFragment = { __typename?: 'FollowerTrade', address: string, index: number, params: string, mission?: (
    { __typename?: 'MissionForwardDetails' }
    & { ' $fragmentRefs'?: { 'MissionForwardDetailsInfoFragment': MissionForwardDetailsInfoFragment } }
  ) | null } & { ' $fragmentName'?: 'FollowerTradeInfoFragment' };

export type FollowerPendingOrderInfoFragment = { __typename?: 'FollowerPendingOrder', params: string, address: string, index: number } & { ' $fragmentName'?: 'FollowerPendingOrderInfoFragment' };

export type FollowerDetailInfoFragment = { __typename?: 'FollowerDetail', address: string, accountIndex: number, publicKey: string, userId: string, ethBalance?: string | null, contractId: number, collateralBalances?: Array<{ __typename?: 'CollateralBalance', collateralIndex: number, balance?: string | null, allowance?: string | null }> | null, pnlSnapshots: Array<{ __typename?: 'PnlSnapshotV2', accUSDPnl: number, address: string, dateStr: string, platform: Platform }>, trades: Array<(
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

export type GetAllsltPsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllsltPsQuery = { __typename?: 'Query', getALLSLTPs: Array<{ __typename?: 'SLTPRequest', id: number, address: string, contractId: number, positionKey: string, condition: string, createdAt: any }> };

export type GetGnsPricesQueryVariables = Exact<{
  pairName: Scalars['String']['input'];
  fromDate: Scalars['Date']['input'];
  toDate: Scalars['Date']['input'];
}>;


export type GetGnsPricesQuery = { __typename?: 'Query', getGnsPrices: Array<{ __typename?: 'GnsPricingRecord', id: number, pair: string, price: number, date: any }> };

export type CloseTradeMarketMutationVariables = Exact<{
  input: CloseTradeInput;
}>;


export type CloseTradeMarketMutation = { __typename?: 'Mutation', closeTradeMarket: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type OpenTradeMarketMutationVariables = Exact<{
  input: OpenTradeInput;
}>;


export type OpenTradeMarketMutation = { __typename?: 'Mutation', openTradeMarket: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type IncreasePositionSizeMutationVariables = Exact<{
  input: IncreasePositionSizeInput;
}>;


export type IncreasePositionSizeMutation = { __typename?: 'Mutation', increasePositionSize: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type DecreasePositionSizeMutationVariables = Exact<{
  input: DecreasePositionSizeInput;
}>;


export type DecreasePositionSizeMutation = { __typename?: 'Mutation', decreasePositionSize: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type UpdateLeverageMutationVariables = Exact<{
  input: UpdateLeverageInput;
}>;


export type UpdateLeverageMutation = { __typename?: 'Mutation', updateLeverage: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type CancelOrderAfterTimeoutMutationVariables = Exact<{
  input: CancelOrderAfterTimeoutInput;
}>;


export type CancelOrderAfterTimeoutMutation = { __typename?: 'Mutation', cancelOrderAfterTimeout: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type UpdateSlMutationVariables = Exact<{
  input: UpdateSlInput;
}>;


export type UpdateSlMutation = { __typename?: 'Mutation', updateSl: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type UpdateTpMutationVariables = Exact<{
  input: UpdateTpInput;
}>;


export type UpdateTpMutation = { __typename?: 'Mutation', updateTp: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type WithdrawPositivePnlMutationVariables = Exact<{
  input: WithdrawPositivePnlInput;
}>;


export type WithdrawPositivePnlMutation = { __typename?: 'Mutation', withdrawPositivePnl: { __typename?: 'ContractExecutionResult', message: string, success: boolean, address: string, contractId: number, index: number } };

export type GenerateNewFollowerMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateNewFollowerMutation = { __typename?: 'Mutation', generateNewFollower: (
    { __typename?: 'Follower' }
    & { ' $fragmentRefs'?: { 'FollowerInfoFragment': FollowerInfoFragment } }
  ) };

export type WithdrawAllErc20MutationVariables = Exact<{
  input: WithdrawAllInput;
}>;


export type WithdrawAllErc20Mutation = { __typename?: 'Mutation', withdrawAllErc20: boolean };

export type WithdrawAssetMutationVariables = Exact<{
  input: AssetInput;
}>;


export type WithdrawAssetMutation = { __typename?: 'Mutation', withdrawAsset: boolean };

export type DepositAssetMutationVariables = Exact<{
  input: AssetInput;
}>;


export type DepositAssetMutation = { __typename?: 'Mutation', depositAsset: boolean };

export type DecreaseAllowanceToZeroMutationVariables = Exact<{
  contractId: Scalars['Int']['input'];
  followerAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
  collateralIndex: Scalars['Int']['input'];
}>;


export type DecreaseAllowanceToZeroMutation = { __typename?: 'Mutation', decreaseAllowanceToZero: boolean };

export type IncreaseAllowanceToMaxMutationVariables = Exact<{
  contractId: Scalars['Int']['input'];
  followerAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
  collateralIndex: Scalars['Int']['input'];
}>;


export type IncreaseAllowanceToMaxMutation = { __typename?: 'Mutation', increaseAllowanceToMax: boolean };

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

export type WithdrawErc20ToUserMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  collateralIndex: Scalars['Int']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
}>;


export type WithdrawErc20ToUserMutation = { __typename?: 'Mutation', withdrawErc20ToUser: boolean };

export type CreateSltpMutationVariables = Exact<{
  input: SltpRequestInput;
}>;


export type CreateSltpMutation = { __typename?: 'Mutation', createSLTP: { __typename?: 'SLTPRequest', id: number, address: string, contractId: number, positionKey: string, condition: string, createdAt: any } };

export type DeleteSltpMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSltpMutation = { __typename?: 'Mutation', deleteSLTP: { __typename?: 'SLTPRequest', id: number } };

export type PerpTradeHistoryInfoFragment = { __typename?: 'PerpTradeHistory', id: number, address: string, collateralDeltaUsd: number, collateralInUsd: number, isLong: boolean, leverage: number, leverageDelta: number, operation: PerpTradeHistoryOperation, pair: string, positionKey: string, price: number, sizeDeltaUsd: number, sizeInUsd: number, usdPnl: number, usdBasePnl: number, usdFee: number, date: any, contractId: number, chainId: number, platform: Platform, collateralUsdPrice: number } & { ' $fragmentName'?: 'PerpTradeHistoryInfoFragment' };

export type PerpTradePositionInfoFragment = { __typename?: 'PerpTradePosition', histories: Array<(
    { __typename?: 'PerpTradeHistory' }
    & { ' $fragmentRefs'?: { 'PerpTradeHistoryInfoFragment': PerpTradeHistoryInfoFragment } }
  )> } & { ' $fragmentName'?: 'PerpTradePositionInfoFragment' };

export type PerpTradePositionsWithSummaryInfoFragment = { __typename?: 'PerpTradePositionsWithSummary', avgCollateral: number, avgDuration: number, avgLeverage: number, avgNegativePnl: number, avgPnl: number, avgPnlPercentageByCollateral: number, avgPnlPercentageBySize: number, avgPositivePnl: number, avgSize: number, maxDuration: number, openedPositions: number, totalPnl: number, totalPositions: number, positions: Array<(
    { __typename?: 'PerpTradePosition' }
    & { ' $fragmentRefs'?: { 'PerpTradePositionInfoFragment': PerpTradePositionInfoFragment } }
  )> } & { ' $fragmentName'?: 'PerpTradePositionsWithSummaryInfoFragment' };

export type PnlSnapshotV2DetailsInfoFragment = { __typename?: 'PnlSnapshotV2Details', accUSDPnl: number, address: string, dateStr: string, platform: Platform, positionsWithSummary: (
    { __typename?: 'PerpTradePositionsWithSummary' }
    & { ' $fragmentRefs'?: { 'PerpTradePositionsWithSummaryInfoFragment': PerpTradePositionsWithSummaryInfoFragment } }
  ) } & { ' $fragmentName'?: 'PnlSnapshotV2DetailsInfoFragment' };

export type GetPerpTradePositionsQueryVariables = Exact<{
  address: Scalars['String']['input'];
  platform: Platform;
  maxLeverage?: InputMaybe<Scalars['Float']['input']>;
  startedAt?: InputMaybe<Scalars['Date']['input']>;
  stoppedAt?: InputMaybe<Scalars['Date']['input']>;
  endedAt?: InputMaybe<Scalars['Date']['input']>;
}>;


export type GetPerpTradePositionsQuery = { __typename?: 'Query', getPerpTradePositions: (
    { __typename?: 'PerpTradePositionsWithSummary' }
    & { ' $fragmentRefs'?: { 'PerpTradePositionsWithSummaryInfoFragment': PerpTradePositionsWithSummaryInfoFragment } }
  ) };

export type GetPnlSnapshotV2InitializedFlagQueryVariables = Exact<{
  platform: Platform;
}>;


export type GetPnlSnapshotV2InitializedFlagQuery = { __typename?: 'Query', getPnlSnapshotV2InitializedFlag: Array<{ __typename?: 'PnlSnapshotV2InitializedFlag', id: number, dateStr: string, isInit: boolean, platform: Platform }> };

export type GetPnlSnapshotsV2QueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  platform: Platform;
  isDesc: Scalars['Boolean']['input'];
  maxLeverage?: InputMaybe<Scalars['Float']['input']>;
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetPnlSnapshotsV2Query = { __typename?: 'Query', getPnlSnapshotsV2: { __typename?: 'PnlSnapshotV2DetailsPaginatedResponse', total: number, totalPages: number, currentPage: number, items: Array<(
      { __typename?: 'PnlSnapshotV2Details' }
      & { ' $fragmentRefs'?: { 'PnlSnapshotV2DetailsInfoFragment': PnlSnapshotV2DetailsInfoFragment } }
    )> } };

export type IsPnlSnapshotV2InitializedQueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  platform: Platform;
}>;


export type IsPnlSnapshotV2InitializedQuery = { __typename?: 'Query', isPnlSnapshotV2Initialized?: { __typename?: 'PnlSnapshotV2InitializedFlag', id: number, dateStr: string, isInit: boolean, platform: Platform } | null };

export type BuildPnlSnapshotsV2MutationVariables = Exact<{
  dateStr: Scalars['String']['input'];
  isForceBuild: Scalars['Boolean']['input'];
  platform: Platform;
}>;


export type BuildPnlSnapshotsV2Mutation = { __typename?: 'Mutation', buildPnlSnapshotsV2: boolean };

export type DynamicSnapshotBuildV2MutationVariables = Exact<{
  dateStr: Scalars['String']['input'];
  platform: Platform;
}>;


export type DynamicSnapshotBuildV2Mutation = { __typename?: 'Mutation', dynamicSnapshotBuildV2: boolean };

export type InitializePnlSnapshotV2MutationVariables = Exact<{
  beginingDate: Scalars['Date']['input'];
  isForceBuild: Scalars['Boolean']['input'];
  platform: Platform;
}>;


export type InitializePnlSnapshotV2Mutation = { __typename?: 'Mutation', initializePnlSnapshotV2: boolean };

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

export type MissionInfoFragment = { __typename?: 'Mission', id: number, botId: number, targetPositionKey: string, targetPositionBlockNumber: number, targetPositionLogIndex: number, achievePositionKey?: string | null, achievePositionBlockNumber?: number | null, achievePositionLogIndex?: number | null, status: MissionStatus, createdAt: any, updatedAt: any, mode: MissionMode } & { ' $fragmentName'?: 'MissionInfoFragment' };

export type MissionBackwardDetailsInfoFragment = { __typename?: 'MissionBackwardDetails', id: number, botId: number, targetPositionKey: string, targetPositionBlockNumber: number, targetPositionLogIndex: number, achievePositionKey?: string | null, achievePositionBlockNumber?: number | null, achievePositionLogIndex?: number | null, createdAt: any, updatedAt: any, status: MissionStatus, mode: MissionMode, bot: (
    { __typename?: 'BotBackwardDetails' }
    & { ' $fragmentRefs'?: { 'BotBackwardDetailsInfoFragment': BotBackwardDetailsInfoFragment } }
  ) } & { ' $fragmentName'?: 'MissionBackwardDetailsInfoFragment' };

export type MissionForwardDetailsInfoFragment = { __typename?: 'MissionForwardDetails', id: number, botId: number, targetPositionKey: string, targetPositionBlockNumber: number, targetPositionLogIndex: number, achievePositionKey?: string | null, achievePositionBlockNumber?: number | null, achievePositionLogIndex?: number | null, createdAt: any, updatedAt: any, status: MissionStatus, mode: MissionMode, tasks: Array<(
    { __typename?: 'TaskForwardDetails' }
    & { ' $fragmentRefs'?: { 'TaskForwardDetailsInfoFragment': TaskForwardDetailsInfoFragment } }
  )> } & { ' $fragmentName'?: 'MissionForwardDetailsInfoFragment' };

export type GetMaxOpenMissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMaxOpenMissionsQuery = { __typename?: 'Query', getMaxOpenMissions: number };

export type UpdateMaxOpenMissionsMutationVariables = Exact<{
  maxCount: Scalars['Int']['input'];
}>;


export type UpdateMaxOpenMissionsMutation = { __typename?: 'Mutation', updateMaxOpenMissions: boolean };

export type CloneMissionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  manualParams?: InputMaybe<ManualParams>;
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

export type PlanSummaryInfoFragment = { __typename?: 'PlanSummary', id: number, title: string, description: string, status: PlanStatus, scheduledStart: any, scheduledEnd: any, startedAt?: any | null, endedAt?: any | null, userId: string, botCount: number } & { ' $fragmentName'?: 'PlanSummaryInfoFragment' };

export type GetPlanSummariesByStatusQueryVariables = Exact<{
  status: PlanStatus;
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type GetPlanSummariesByStatusQuery = { __typename?: 'Query', getPlanSummariesByStatus: { __typename?: 'PlanSummaryConnection', edges: Array<{ __typename?: 'PlanSummaryEdge', cursor: number, node: (
        { __typename?: 'PlanSummary' }
        & { ' $fragmentRefs'?: { 'PlanSummaryInfoFragment': PlanSummaryInfoFragment } }
      ) }>, pageInfo: { __typename?: 'PlanPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetPlanByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetPlanByIdQuery = { __typename?: 'Query', getPlanById?: (
    { __typename?: 'Plan' }
    & { ' $fragmentRefs'?: { 'PlanInfoFragment': PlanInfoFragment } }
  ) | null };

export type GetPlanBotGroupsQueryVariables = Exact<{
  planId: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
}>;


export type GetPlanBotGroupsQuery = { __typename?: 'Query', getPlanBotGroups: { __typename?: 'BotGroupPaginatedResponse', totalGroups: number, totalPages: number, currentPage: number, items: Array<{ __typename?: 'BotGroup', leaderAddress: string, platform: Platform, hasDefault: boolean, bots: Array<(
        { __typename?: 'BotForwardDetails' }
        & { ' $fragmentRefs'?: { 'BotForwardDetailsInfoFragment': BotForwardDetailsInfoFragment } }
      )> }> } };

export type CreatePlanMutationVariables = Exact<{
  createPlanInput: CreatePlanInput;
}>;


export type CreatePlanMutation = { __typename?: 'Mutation', createPlan: (
    { __typename?: 'Plan' }
    & { ' $fragmentRefs'?: { 'PlanInfoFragment': PlanInfoFragment } }
  ) };

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

export type GetSimulationEvaluatorWorkersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSimulationEvaluatorWorkersQuery = { __typename?: 'Query', simulationEvaluatorWorkers: Array<{ __typename?: 'SimulationEvaluatorWorkerView', id: string, displayName: string, authorizationStatus: string, runtimeStatus: string, lastHeartbeatAt?: any | null, lastTaskAt?: any | null, lastError?: string | null, platformCaches: Array<{ __typename?: 'SimulationEvaluatorWorkerCacheView', platform: string, status: string, coveredStartAt?: any | null, coveredEndAt?: any | null, lastError?: string | null }>, prebuildProgress?: { __typename?: 'SimulationEvaluatorWorkerPrebuildProgressView', taskId: string, message: string, percent: number, records: string, totalRecords: string, bytes: string } | null }> };

export type ApproveSimulationEvaluatorWorkerMutationVariables = Exact<{
  workerId: Scalars['String']['input'];
}>;


export type ApproveSimulationEvaluatorWorkerMutation = { __typename?: 'Mutation', approveSimulationEvaluatorWorker: { __typename?: 'SimulationEvaluatorWorkerView', id: string } };

export type RejectSimulationEvaluatorWorkerMutationVariables = Exact<{
  workerId: Scalars['String']['input'];
}>;


export type RejectSimulationEvaluatorWorkerMutation = { __typename?: 'Mutation', rejectSimulationEvaluatorWorker: { __typename?: 'SimulationEvaluatorWorkerView', id: string } };

export type RemoveRejectedSimulationEvaluatorWorkerMutationVariables = Exact<{
  workerId: Scalars['String']['input'];
}>;


export type RemoveRejectedSimulationEvaluatorWorkerMutation = { __typename?: 'Mutation', removeRejectedSimulationEvaluatorWorker: boolean };

export type PrebuildSimulationEvaluatorWorkerMutationVariables = Exact<{
  workerId: Scalars['String']['input'];
  platform: Scalars['String']['input'];
  startedAt: Scalars['String']['input'];
  endedAt: Scalars['String']['input'];
}>;


export type PrebuildSimulationEvaluatorWorkerMutation = { __typename?: 'Mutation', prebuildSimulationEvaluatorWorker: string };

export type SimulationBotInfoFragment = { __typename?: 'SimulationBot', avgCollateral: number, avgDuration: number, avgLeverage: number, avgNegativePnl: number, avgPnl: number, avgPnlPercentageByCollateral: number, avgPnlPercentageBySize: number, avgPositivePnl: number, avgSize: number, id: number, leaderAddress: string, leaderPlatform: Platform, minCollateral: number, maxCollateral: number, maxDuration: number, mode: BotMode, openedPositions: number, ratio: number, score: number, minLeverage: number, maxLeverage: number, simulationPlanId: number, startedAt: any, stoppedAt?: any | null, totalPnl: number, totalPositions: number } & { ' $fragmentName'?: 'SimulationBotInfoFragment' };

export type SimulationPlanInfoFragment = { __typename?: 'SimulationPlan', cursor: any, description: string, endAt: any, id: number, openedPositions: number, startAt: any, title: string, totalFollowerPnl: number, totalLeaderPnl: number, totalPositions: number, simulationId?: number | null, simulationBots: Array<(
    { __typename?: 'SimulationBot' }
    & { ' $fragmentRefs'?: { 'SimulationBotInfoFragment': SimulationBotInfoFragment } }
  )> } & { ' $fragmentName'?: 'SimulationPlanInfoFragment' };

export type SimulationInfoFragment = { __typename?: 'Simulation', completedPlans: number, createdAt: any, cursor?: any | null, days: number, description: string, direction: BotMode, endAt: any, error?: string | null, gapDays: number, id: number, maxDrawdownUsd: number, platform: Platform, profitFactor: number, progressMessage?: string | null, progressPercent: number, progressPhase?: string | null, researchId?: number | null, scoreFormular: SimulationScoreFormular, selectedLeaderCount: number, sizingFormular: SimulationSizingFormular, standardCollateralUsd: number, startAt: any, status: SimulationStatus, title: string, totalCostUsd: number, totalFollowerPnl: number, totalLeaderPnl: number, totalNetPnlUsd: number, totalSimulationPlans: number, tradeCount: number, updatedAt: any, winRate: number, collateral: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }>, size: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }>, leverage: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }>, r2: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }>, score: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }>, slope: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }>, trade: Array<{ __typename?: 'SimulationTradeRange', max: number, min: number }> } & { ' $fragmentName'?: 'SimulationInfoFragment' };

export type SimulationResearchInfoFragment = { __typename?: 'SimulationResearch', completedSimulations: number, createdAt: any, days: number, description: string, direction: BotMode, executionFlow: SimulationResearchExecutionFlow, endAt: any, gapDays: number, id: number, scoreFormular: SimulationScoreFormular, sizingFormular: SimulationSizingFormular, status: SimulationStatus, cursor?: any | null, progressPhase?: string | null, progressMessage?: string | null, progressPercent: number, totalRanges: number, completedRanges: number, startedAt?: any | null, finishedAt?: any | null, lastError?: string | null, platform: Platform, startAt: any, title: string, totalSimulations: number, updatedAt: any, collateral: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, size: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, leverage: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, score: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, r2: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, slope: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, trade: Array<{ __typename?: 'SimulationTradeRangeGroup', ranges: Array<{ __typename?: 'SimulationTradeRange', max: number, min: number }> }> } & { ' $fragmentName'?: 'SimulationResearchInfoFragment' };

export type SimulationResearchDetailsInfoFragment = { __typename?: 'SimulationResearchDetails', completedSimulations: number, createdAt: any, days: number, description: string, direction: BotMode, executionFlow: SimulationResearchExecutionFlow, endAt: any, gapDays: number, id: number, scoreFormular: SimulationScoreFormular, sizingFormular: SimulationSizingFormular, status: SimulationStatus, cursor?: any | null, progressPhase?: string | null, progressMessage?: string | null, progressPercent: number, totalRanges: number, completedRanges: number, startedAt?: any | null, finishedAt?: any | null, lastError?: string | null, platform: Platform, startAt: any, title: string, totalSimulations: number, updatedAt: any, collateral: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, size: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, leverage: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, score: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, r2: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, slope: Array<{ __typename?: 'SimulationValueRangeGroup', ranges: Array<{ __typename?: 'SimulationValueRange', max: number, min: number }> }>, trade: Array<{ __typename?: 'SimulationTradeRangeGroup', ranges: Array<{ __typename?: 'SimulationTradeRange', max: number, min: number }> }>, simulations: Array<(
    { __typename?: 'Simulation' }
    & { ' $fragmentRefs'?: { 'SimulationInfoFragment': SimulationInfoFragment } }
  )> } & { ' $fragmentName'?: 'SimulationResearchDetailsInfoFragment' };

export type SimulationTradeHistoryInfoFragment = { __typename?: 'SimulationTradeHistory', follower: (
    { __typename?: 'PerpTradeHistory' }
    & { ' $fragmentRefs'?: { 'PerpTradeHistoryInfoFragment': PerpTradeHistoryInfoFragment } }
  ), leader: (
    { __typename?: 'PerpTradeHistory' }
    & { ' $fragmentRefs'?: { 'PerpTradeHistoryInfoFragment': PerpTradeHistoryInfoFragment } }
  ) } & { ' $fragmentName'?: 'SimulationTradeHistoryInfoFragment' };

export type SimulationTradePositionInfoFragment = { __typename?: 'SimulationTradePosition', followerPnl: number, leaderPnl: number, histories: Array<(
    { __typename?: 'SimulationTradeHistory' }
    & { ' $fragmentRefs'?: { 'SimulationTradeHistoryInfoFragment': SimulationTradeHistoryInfoFragment } }
  )> } & { ' $fragmentName'?: 'SimulationTradePositionInfoFragment' };

export type SimulationBotDetailsInfoFragment = { __typename?: 'SimulationBotDetails', avgCollateral: number, avgDuration: number, avgLeverage: number, avgNegativePnl: number, avgPnl: number, avgPnlPercentageByCollateral: number, avgPnlPercentageBySize: number, avgPositivePnl: number, avgSize: number, id: number, leaderAddress: string, leaderPlatform: Platform, minCollateral: number, maxCollateral: number, maxDuration: number, mode: BotMode, openedPositions: number, ratio: number, score: number, simulationPlanId: number, startedAt: any, stoppedAt?: any | null, totalPnl: number, totalPositions: number, minLeverage: number, maxLeverage: number, cacheState?: { __typename?: 'SimulationBotCacheState', completed: boolean, lastError?: string | null, lastFetchedAt?: any | null, rebuildRequested: boolean, rebuilding: boolean } | null, positions: Array<(
    { __typename?: 'SimulationTradePosition' }
    & { ' $fragmentRefs'?: { 'SimulationTradePositionInfoFragment': SimulationTradePositionInfoFragment } }
  )> } & { ' $fragmentName'?: 'SimulationBotDetailsInfoFragment' };

export type SimulationPlanDetailsInfoFragment = { __typename?: 'SimulationPlanDetails', cursor: any, description: string, endAt: any, id: number, openedPositions: number, simulationId?: number | null, startAt: any, title: string, totalFollowerPnl: number, totalLeaderPnl: number, totalPositions: number, simulationBots: Array<(
    { __typename?: 'SimulationBotDetails' }
    & { ' $fragmentRefs'?: { 'SimulationBotDetailsInfoFragment': SimulationBotDetailsInfoFragment } }
  )> } & { ' $fragmentName'?: 'SimulationPlanDetailsInfoFragment' };

export type GetSimulationPlansQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type GetSimulationPlansQuery = { __typename?: 'Query', getSimulationPlans: { __typename?: 'SimulationPlanConnection', edges: Array<{ __typename?: 'SimulationPlanEdge', cursor: number, node: (
        { __typename?: 'SimulationPlan' }
        & { ' $fragmentRefs'?: { 'SimulationPlanInfoFragment': SimulationPlanInfoFragment } }
      ) }>, pageInfo: { __typename?: 'SimulationPlanPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type SimulationsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type SimulationsQuery = { __typename?: 'Query', simulations: { __typename?: 'SimulationConnection', edges: Array<{ __typename?: 'SimulationEdge', cursor: number, node: (
        { __typename?: 'Simulation' }
        & { ' $fragmentRefs'?: { 'SimulationInfoFragment': SimulationInfoFragment } }
      ) }>, pageInfo: { __typename?: 'SimulationPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type SimulationResearchesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['Int']['input']>;
  first: Scalars['Int']['input'];
}>;


export type SimulationResearchesQuery = { __typename?: 'Query', simulationResearches: { __typename?: 'SimulationResearchConnection', edges: Array<{ __typename?: 'SimulationResearchEdge', cursor: number, node: (
        { __typename?: 'SimulationResearch' }
        & { ' $fragmentRefs'?: { 'SimulationResearchInfoFragment': SimulationResearchInfoFragment } }
      ) }>, pageInfo: { __typename?: 'SimulationResearchPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type SimulationQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SimulationQuery = { __typename?: 'Query', simulation?: (
    { __typename?: 'Simulation' }
    & { ' $fragmentRefs'?: { 'SimulationInfoFragment': SimulationInfoFragment } }
  ) | null };

export type SimulationResearchQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type SimulationResearchQuery = { __typename?: 'Query', simulationResearch?: (
    { __typename?: 'SimulationResearchDetails' }
    & { ' $fragmentRefs'?: { 'SimulationResearchDetailsInfoFragment': SimulationResearchDetailsInfoFragment } }
  ) | null };

export type SimulationsByResearchQueryVariables = Exact<{
  researchId: Scalars['Int']['input'];
}>;


export type SimulationsByResearchQuery = { __typename?: 'Query', simulationsByResearch: Array<(
    { __typename?: 'Simulation' }
    & { ' $fragmentRefs'?: { 'SimulationInfoFragment': SimulationInfoFragment } }
  )> };

export type SimulationPlansBySimulationQueryVariables = Exact<{
  simulationId: Scalars['Int']['input'];
}>;


export type SimulationPlansBySimulationQuery = { __typename?: 'Query', simulationPlansBySimulation: Array<(
    { __typename?: 'SimulationPlan' }
    & { ' $fragmentRefs'?: { 'SimulationPlanInfoFragment': SimulationPlanInfoFragment } }
  )> };

export type SimulationPlanDetailsBySimulationQueryVariables = Exact<{
  simulationId: Scalars['Int']['input'];
}>;


export type SimulationPlanDetailsBySimulationQuery = { __typename?: 'Query', simulationPlanDetailsBySimulation: Array<(
    { __typename?: 'SimulationPlanDetails' }
    & { ' $fragmentRefs'?: { 'SimulationPlanDetailsInfoFragment': SimulationPlanDetailsInfoFragment } }
  )> };

export type GetSimulationPlanByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSimulationPlanByIdQuery = { __typename?: 'Query', getSimulationPlanById: (
    { __typename?: 'SimulationPlanDetails' }
    & { ' $fragmentRefs'?: { 'SimulationPlanDetailsInfoFragment': SimulationPlanDetailsInfoFragment } }
  ) };

export type CreateSimulationPlanMutationVariables = Exact<{
  input: CreateSimulationPlanInput;
}>;


export type CreateSimulationPlanMutation = { __typename?: 'Mutation', createSimulationPlan: (
    { __typename?: 'SimulationPlan' }
    & { ' $fragmentRefs'?: { 'SimulationPlanInfoFragment': SimulationPlanInfoFragment } }
  ) };

export type CreateSimulationResearchMutationVariables = Exact<{
  input: CreateSimulationResearchInput;
}>;


export type CreateSimulationResearchMutation = { __typename?: 'Mutation', createSimulationResearch: (
    { __typename?: 'SimulationResearch' }
    & { ' $fragmentRefs'?: { 'SimulationResearchInfoFragment': SimulationResearchInfoFragment } }
  ) };

export type UpdateSimulationResearchMutationVariables = Exact<{
  input: UpdateSimulationResearchInput;
}>;


export type UpdateSimulationResearchMutation = { __typename?: 'Mutation', updateSimulationResearch: (
    { __typename?: 'SimulationResearch' }
    & { ' $fragmentRefs'?: { 'SimulationResearchInfoFragment': SimulationResearchInfoFragment } }
  ) };

export type UpdateSimulationBotMutationVariables = Exact<{
  input: UpdateSimulationBotInput;
}>;


export type UpdateSimulationBotMutation = { __typename?: 'Mutation', updateSimulationBot: (
    { __typename?: 'SimulationBot' }
    & { ' $fragmentRefs'?: { 'SimulationBotInfoFragment': SimulationBotInfoFragment } }
  ) };

export type BatchCreateSimulationBotsMutationVariables = Exact<{
  inputs: Array<CreateSimulationBotInput> | CreateSimulationBotInput;
}>;


export type BatchCreateSimulationBotsMutation = { __typename?: 'Mutation', batchCreateSimulationBots: Array<(
    { __typename?: 'SimulationBot' }
    & { ' $fragmentRefs'?: { 'SimulationBotInfoFragment': SimulationBotInfoFragment } }
  )> };

export type PlaySimulationPlanMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PlaySimulationPlanMutation = { __typename?: 'Mutation', playSimulationPlan: (
    { __typename?: 'SimulationPlan' }
    & { ' $fragmentRefs'?: { 'SimulationPlanInfoFragment': SimulationPlanInfoFragment } }
  ) };

export type CancelSimulationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CancelSimulationMutation = { __typename?: 'Mutation', cancelSimulation: (
    { __typename?: 'Simulation' }
    & { ' $fragmentRefs'?: { 'SimulationInfoFragment': SimulationInfoFragment } }
  ) };

export type PlayAutoResearchMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PlayAutoResearchMutation = { __typename?: 'Mutation', playAutoResearch: (
    { __typename?: 'SimulationResearch' }
    & { ' $fragmentRefs'?: { 'SimulationResearchInfoFragment': SimulationResearchInfoFragment } }
  ) };

export type PauseResearchMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PauseResearchMutation = { __typename?: 'Mutation', pauseResearch: (
    { __typename?: 'SimulationResearch' }
    & { ' $fragmentRefs'?: { 'SimulationResearchInfoFragment': SimulationResearchInfoFragment } }
  ) };

export type CancelResearchMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type CancelResearchMutation = { __typename?: 'Mutation', cancelResearch: (
    { __typename?: 'SimulationResearch' }
    & { ' $fragmentRefs'?: { 'SimulationResearchInfoFragment': SimulationResearchInfoFragment } }
  ) };

export type DeleteSimulationMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSimulationMutation = { __typename?: 'Mutation', deleteSimulation: number };

export type DeleteSimulationResearchMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSimulationResearchMutation = { __typename?: 'Mutation', deleteSimulationResearch: number };

export type DeleteSimulationPlanMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSimulationPlanMutation = { __typename?: 'Mutation', deleteSimulationPlan: number };

export type DeleteSimulationBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSimulationBotMutation = { __typename?: 'Mutation', deleteSimulationBot: number };

export type StopSimulationBotMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type StopSimulationBotMutation = { __typename?: 'Mutation', stopSimulationBot: (
    { __typename?: 'SimulationBot' }
    & { ' $fragmentRefs'?: { 'SimulationBotInfoFragment': SimulationBotInfoFragment } }
  ) };

export type SimulationResearchUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SimulationResearchUpdatedSubscription = { __typename?: 'Subscription', simulationResearchUpdated: (
    { __typename?: 'SimulationResearch' }
    & { ' $fragmentRefs'?: { 'SimulationResearchInfoFragment': SimulationResearchInfoFragment } }
  ) };

export type SimulationUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SimulationUpdatedSubscription = { __typename?: 'Subscription', simulationUpdated: (
    { __typename?: 'Simulation' }
    & { ' $fragmentRefs'?: { 'SimulationInfoFragment': SimulationInfoFragment } }
  ) };

export type SimulationPlanUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SimulationPlanUpdatedSubscription = { __typename?: 'Subscription', simulationPlanUpdated: (
    { __typename?: 'SimulationPlan' }
    & { ' $fragmentRefs'?: { 'SimulationPlanInfoFragment': SimulationPlanInfoFragment } }
  ) };

export type StrategyInfoFragment = { __typename?: 'Strategy', id: number, lifeTime: number, maxCollateral: number, minCollateral: number, maxLeverage: number, minLeverage: number, tpPercentage: number, slPercentage: number, maxOpenMissions: number, selectedPairs: string, mode: StrategyMode, ratio: number } & { ' $fragmentName'?: 'StrategyInfoFragment' };

export type GetAllStrategyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStrategyQuery = { __typename?: 'Query', getAllStrategy: Array<(
    { __typename?: 'Strategy' }
    & { ' $fragmentRefs'?: { 'StrategyInfoFragment': StrategyInfoFragment } }
  )> };

export type UpdateStrategyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateStrategyInput;
}>;


export type UpdateStrategyMutation = { __typename?: 'Mutation', updateStrategy: (
    { __typename?: 'Strategy' }
    & { ' $fragmentRefs'?: { 'StrategyInfoFragment': StrategyInfoFragment } }
  ) };

export type PauseSystemMutationVariables = Exact<{ [key: string]: never; }>;


export type PauseSystemMutation = { __typename?: 'Mutation', pauseSystem: boolean };

export type ResumeSystemMutationVariables = Exact<{
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type ResumeSystemMutation = { __typename?: 'Mutation', resumeSystem: boolean };

export type KillSubServiceMutationVariables = Exact<{
  service: Scalars['String']['input'];
}>;


export type KillSubServiceMutation = { __typename?: 'Mutation', killSubService: boolean };

export type StartSubServiceMutationVariables = Exact<{
  service: Scalars['String']['input'];
}>;


export type StartSubServiceMutation = { __typename?: 'Mutation', startSubService: boolean };

export type GetMicroserviceStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMicroserviceStatusQuery = { __typename?: 'Query', getMicroserviceStatus: Array<{ __typename?: 'MicroserviceStatus', pids: Array<number>, service: string }> };

export type SimulationEvaluatorWorkersQueryVariables = Exact<{ [key: string]: never; }>;


export type SimulationEvaluatorWorkersQuery = { __typename?: 'Query', simulationEvaluatorWorkers: Array<{ __typename?: 'SimulationEvaluatorWorkerView', id: string, authorizationStatus: string, runtimeStatus: string, lastHeartbeatAt?: any | null, lastError?: string | null, platformCaches: Array<{ __typename?: 'SimulationEvaluatorWorkerCacheView', platform: string, status: string, coveredStartAt?: any | null, coveredEndAt?: any | null, lastError?: string | null }>, prebuildProgress?: { __typename?: 'SimulationEvaluatorWorkerPrebuildProgressView', taskId: string, message: string, records: string, bytes: string } | null }> };

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

export type CleanDbMutationVariables = Exact<{ [key: string]: never; }>;


export type CleanDbMutation = { __typename?: 'Mutation', cleanDB: boolean };

export type GetServerTimeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServerTimeQuery = { __typename?: 'Query', getServerTime: { __typename?: 'ServerTime', timestamp: number, timezone: string } };

export type ActionInfoFragment = { __typename?: 'Action', address: string, args: string, blockHash?: string | null, blockNumber: number, contractId?: number | null, createdAt: any, dedupeKey?: string | null, id: number, name: string, orderInBlock: number, origin: string, positionKey: string, status: string, txHash?: string | null } & { ' $fragmentName'?: 'ActionInfoFragment' };

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


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', address: string, secondAddress?: string | null, permission: UserPermission, allowAuto: boolean, budget: number, ratio: number, followerContractId: number }> };

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


export type ChangeUserPermissionMutation = { __typename?: 'Mutation', changeUserPermission: { __typename?: 'User', address: string, secondAddress?: string | null, permission: UserPermission, allowAuto: boolean, budget: number, ratio: number, followerContractId: number } };

export type AllowAutoMutationVariables = Exact<{
  address: Scalars['String']['input'];
  allowAuto: Scalars['Boolean']['input'];
  budget: Scalars['Float']['input'];
  ratio: Scalars['Float']['input'];
  followerContractId: Scalars['Int']['input'];
}>;


export type AllowAutoMutation = { __typename?: 'Mutation', allowAuto: { __typename?: 'User', address: string, secondAddress?: string | null, permission: UserPermission, allowAuto: boolean, budget: number, ratio: number, followerContractId: number } };

export const ContractInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<ContractInfoFragment, unknown>;
export const FollowerInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<FollowerInfoFragment, unknown>;
export const StrategyInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}}]} as unknown as DocumentNode<StrategyInfoFragment, unknown>;
export const BotDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}}]} as unknown as DocumentNode<BotDetailsInfoFragment, unknown>;
export const ActionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}}]} as unknown as DocumentNode<ActionInfoFragment, unknown>;
export const FollowerActionDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}}]} as unknown as DocumentNode<FollowerActionDetailsInfoFragment, unknown>;
export const TaskForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}}]} as unknown as DocumentNode<TaskForwardDetailsInfoFragment, unknown>;
export const MissionForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionForwardDetailsInfoFragment, unknown>;
export const FollowerTradeInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<FollowerTradeInfoFragment, unknown>;
export const FollowerPendingOrderInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<FollowerPendingOrderInfoFragment, unknown>;
export const FollowerDetailInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBalances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"allowance"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"pnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerTradeInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerPendingOrderInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<FollowerDetailInfoFragment, unknown>;
export const PerpTradeHistoryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}}]} as unknown as DocumentNode<PerpTradeHistoryInfoFragment, unknown>;
export const PerpTradePositionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}}]} as unknown as DocumentNode<PerpTradePositionInfoFragment, unknown>;
export const PerpTradePositionsWithSummaryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionsWithSummaryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePositionsWithSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradePositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}}]} as unknown as DocumentNode<PerpTradePositionsWithSummaryInfoFragment, unknown>;
export const PnlSnapshotV2DetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2Details"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"positionsWithSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradePositionsWithSummaryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionsWithSummaryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePositionsWithSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradePositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<PnlSnapshotV2DetailsInfoFragment, unknown>;
export const LogInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<LogInfoFragment, unknown>;
export const MissionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}}]}}]} as unknown as DocumentNode<MissionInfoFragment, unknown>;
export const BotForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<BotForwardDetailsInfoFragment, unknown>;
export const PlanForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<PlanForwardDetailsInfoFragment, unknown>;
export const PlanSummaryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanSummaryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"botCount"}}]}}]} as unknown as DocumentNode<PlanSummaryInfoFragment, unknown>;
export const SimulationBotInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<SimulationBotInfoFragment, unknown>;
export const SimulationPlanInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<SimulationPlanInfoFragment, unknown>;
export const SimulationResearchInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<SimulationResearchInfoFragment, unknown>;
export const SimulationInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}}]} as unknown as DocumentNode<SimulationInfoFragment, unknown>;
export const SimulationResearchDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearchDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"simulations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}}]} as unknown as DocumentNode<SimulationResearchDetailsInfoFragment, unknown>;
export const SimulationTradeHistoryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}}]} as unknown as DocumentNode<SimulationTradeHistoryInfoFragment, unknown>;
export const SimulationTradePositionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}}]} as unknown as DocumentNode<SimulationTradePositionInfoFragment, unknown>;
export const SimulationBotDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"cacheState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"lastFetchedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rebuildRequested"}},{"kind":"Field","name":{"kind":"Name","value":"rebuilding"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradePositionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPnl"}}]}}]} as unknown as DocumentNode<SimulationBotDetailsInfoFragment, unknown>;
export const SimulationPlanDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlanDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"cacheState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"lastFetchedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rebuildRequested"}},{"kind":"Field","name":{"kind":"Name","value":"rebuilding"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradePositionInfo"}}]}}]}}]} as unknown as DocumentNode<SimulationPlanDetailsInfoFragment, unknown>;
export const PlanInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<PlanInfoFragment, unknown>;
export const BotBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<BotBackwardDetailsInfoFragment, unknown>;
export const MissionBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<MissionBackwardDetailsInfoFragment, unknown>;
export const TaskBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskBackwardDetailsInfoFragment, unknown>;
export const GetBotsByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBotsByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BotStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotsByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetBotsByStatusQuery, GetBotsByStatusQueryVariables>;
export const GetActiveBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActiveBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getActiveBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetActiveBotsQuery, GetActiveBotsQueryVariables>;
export const CreateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<CreateBotMutation, CreateBotMutationVariables>;
export const BatchCreateBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"batchCreateBots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotAndStrategyInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchCreateBots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BatchCreateBotsMutation, BatchCreateBotsMutationVariables>;
export const DeleteBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<DeleteBotMutation, DeleteBotMutationVariables>;
export const LiveBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"liveBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<LiveBotMutation, LiveBotMutationVariables>;
export const StopBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StopBotMutation, StopBotMutationVariables>;
export const BotCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"botCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BotCreatedSubscription, BotCreatedSubscriptionVariables>;
export const BotUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"botUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BotUpdatedSubscription, BotUpdatedSubscriptionVariables>;
export const GetAllContractsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<GetAllContractsQuery, GetAllContractsQueryVariables>;
export const GetAdaptionStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAdaptionStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAdaptionStatus"}}]}}]} as unknown as DocumentNode<GetAdaptionStatusQuery, GetAdaptionStatusQueryVariables>;
export const DisableContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"disableContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<DisableContractMutation, DisableContractMutationVariables>;
export const LiveContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"liveContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fromBlock"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<LiveContractMutation, LiveContractMutationVariables>;
export const StartAdaptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startAdaption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shouldRestart"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startAdaption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"shouldRestart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shouldRestart"}}}]}]}}]} as unknown as DocumentNode<StartAdaptionMutation, StartAdaptionMutationVariables>;
export const GetAllFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<GetAllFollowersQuery, GetAllFollowersQueryVariables>;
export const GetAllFollowerDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowerDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowerDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerDetailInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBalances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collateralIndex"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"allowance"}}]}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"pnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerTradeInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerPendingOrderInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllFollowerDetailsQuery, GetAllFollowerDetailsQueryVariables>;
export const GetAllsltPsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getALLSLTPs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getALLSLTPs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetAllsltPsQuery, GetAllsltPsQueryVariables>;
export const GetGnsPricesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGnsPrices"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pairName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"toDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGnsPrices"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pairName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pairName"}}},{"kind":"Argument","name":{"kind":"Name","value":"fromDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"toDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"toDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GetGnsPricesQuery, GetGnsPricesQueryVariables>;
export const CloseTradeMarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"closeTradeMarket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CloseTradeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeTradeMarket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<CloseTradeMarketMutation, CloseTradeMarketMutationVariables>;
export const OpenTradeMarketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"openTradeMarket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OpenTradeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"openTradeMarket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<OpenTradeMarketMutation, OpenTradeMarketMutationVariables>;
export const IncreasePositionSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"increasePositionSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IncreasePositionSizeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"increasePositionSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<IncreasePositionSizeMutation, IncreasePositionSizeMutationVariables>;
export const DecreasePositionSizeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"decreasePositionSize"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DecreasePositionSizeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decreasePositionSize"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<DecreasePositionSizeMutation, DecreasePositionSizeMutationVariables>;
export const UpdateLeverageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateLeverage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateLeverageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateLeverage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<UpdateLeverageMutation, UpdateLeverageMutationVariables>;
export const CancelOrderAfterTimeoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cancelOrderAfterTimeout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CancelOrderAfterTimeoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelOrderAfterTimeout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<CancelOrderAfterTimeoutMutation, CancelOrderAfterTimeoutMutationVariables>;
export const UpdateSlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<UpdateSlMutation, UpdateSlMutationVariables>;
export const UpdateTpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<UpdateTpMutation, UpdateTpMutationVariables>;
export const WithdrawPositivePnlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawPositivePnl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawPositivePnlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawPositivePnl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]} as unknown as DocumentNode<WithdrawPositivePnlMutation, WithdrawPositivePnlMutationVariables>;
export const GenerateNewFollowerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"generateNewFollower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateNewFollower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<GenerateNewFollowerMutation, GenerateNewFollowerMutationVariables>;
export const WithdrawAllErc20Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAllErc20"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAllErc20"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAllErc20Mutation, WithdrawAllErc20MutationVariables>;
export const WithdrawAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAssetMutation, WithdrawAssetMutationVariables>;
export const DepositAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"depositAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depositAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DepositAssetMutation, DepositAssetMutationVariables>;
export const DecreaseAllowanceToZeroDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"decreaseAllowanceToZero"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collateralIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decreaseAllowanceToZero"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"collateralIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collateralIndex"}}}]}]}}]} as unknown as DocumentNode<DecreaseAllowanceToZeroMutation, DecreaseAllowanceToZeroMutationVariables>;
export const IncreaseAllowanceToMaxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"increaseAllowanceToMax"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collateralIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"increaseAllowanceToMax"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"collateralIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collateralIndex"}}}]}]}}]} as unknown as DocumentNode<IncreaseAllowanceToMaxMutation, IncreaseAllowanceToMaxMutationVariables>;
export const WithdrawAllEthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAllETH"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAllETH"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAllEthMutation, WithdrawAllEthMutationVariables>;
export const WithdrawEthToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawETHToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawETHToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<WithdrawEthToUserMutation, WithdrawEthToUserMutationVariables>;
export const WithdrawErc20ToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawErc20ToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collateralIndex"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawErc20ToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"collateralIndex"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collateralIndex"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<WithdrawErc20ToUserMutation, WithdrawErc20ToUserMutationVariables>;
export const CreateSltpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSLTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLTPRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSLTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateSltpMutation, CreateSltpMutationVariables>;
export const DeleteSltpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSLTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSLTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSltpMutation, DeleteSltpMutationVariables>;
export const GetPerpTradePositionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPerpTradePositions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxLeverage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stoppedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endedAt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPerpTradePositions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxLeverage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxLeverage"}}},{"kind":"Argument","name":{"kind":"Name","value":"startedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startedAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"stoppedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stoppedAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"endedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endedAt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradePositionsWithSummaryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionsWithSummaryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePositionsWithSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradePositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<GetPerpTradePositionsQuery, GetPerpTradePositionsQueryVariables>;
export const GetPnlSnapshotV2InitializedFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshotV2InitializedFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshotV2InitializedFlag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"isInit"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]}}]} as unknown as DocumentNode<GetPnlSnapshotV2InitializedFlagQuery, GetPnlSnapshotV2InitializedFlagQueryVariables>;
export const GetPnlSnapshotsV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshotsV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isDesc"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxLeverage"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshotsV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"isDesc"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isDesc"}}},{"kind":"Argument","name":{"kind":"Name","value":"maxLeverage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxLeverage"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradePositionsWithSummaryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradePositionsWithSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradePositionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2Details"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"positionsWithSummary"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradePositionsWithSummaryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]} as unknown as DocumentNode<GetPnlSnapshotsV2Query, GetPnlSnapshotsV2QueryVariables>;
export const IsPnlSnapshotV2InitializedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isPnlSnapshotV2Initialized"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isPnlSnapshotV2Initialized"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"isInit"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]}}]} as unknown as DocumentNode<IsPnlSnapshotV2InitializedQuery, IsPnlSnapshotV2InitializedQueryVariables>;
export const BuildPnlSnapshotsV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"buildPnlSnapshotsV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buildPnlSnapshotsV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"isForceBuild"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}]}]}}]} as unknown as DocumentNode<BuildPnlSnapshotsV2Mutation, BuildPnlSnapshotsV2MutationVariables>;
export const DynamicSnapshotBuildV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"dynamicSnapshotBuildV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dynamicSnapshotBuildV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}]}]}}]} as unknown as DocumentNode<DynamicSnapshotBuildV2Mutation, DynamicSnapshotBuildV2MutationVariables>;
export const InitializePnlSnapshotV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"initializePnlSnapshotV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beginingDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initializePnlSnapshotV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"beginingDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beginingDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"isForceBuild"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isForceBuild"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}]}]}}]} as unknown as DocumentNode<InitializePnlSnapshotV2Mutation, InitializePnlSnapshotV2MutationVariables>;
export const AllLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"severity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LogSeverity"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checked"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"severity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"severity"}}},{"kind":"Argument","name":{"kind":"Name","value":"checked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checked"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<AllLogsQuery, AllLogsQueryVariables>;
export const GetLogsSeverityCountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLogsSeverityCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLogsSeverityCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"counts"}}]}}]}}]} as unknown as DocumentNode<GetLogsSeverityCountsQuery, GetLogsSeverityCountsQueryVariables>;
export const CheckLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"checkLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<CheckLogMutation, CheckLogMutationVariables>;
export const NewLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"newLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checked"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"severity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LogSeverity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"checked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checked"}}},{"kind":"Argument","name":{"kind":"Name","value":"severity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"severity"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"LogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<NewLogSubscription, NewLogSubscriptionVariables>;
export const GetMaxOpenMissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMaxOpenMissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMaxOpenMissions"}}]}}]} as unknown as DocumentNode<GetMaxOpenMissionsQuery, GetMaxOpenMissionsQueryVariables>;
export const UpdateMaxOpenMissionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMaxOpenMissions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"maxCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMaxOpenMissions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"maxCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"maxCount"}}}]}]}}]} as unknown as DocumentNode<UpdateMaxOpenMissionsMutation, UpdateMaxOpenMissionsMutationVariables>;
export const CloneMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cloneMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manualParams"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ManualParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cloneMission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"manualParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manualParams"}}}]}]}}]} as unknown as DocumentNode<CloneMissionMutation, CloneMissionMutationVariables>;
export const CloseMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"closeMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isForce"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"closeMission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"isForce"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isForce"}}}]}]}}]} as unknown as DocumentNode<CloseMissionMutation, CloseMissionMutationVariables>;
export const IgnoreMissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ignoreMission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ignoreMission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<IgnoreMissionMutation, IgnoreMissionMutationVariables>;
export const MissionCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionCreatedSubscription, MissionCreatedSubscriptionVariables>;
export const MissionUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionUpdatedSubscription, MissionUpdatedSubscriptionVariables>;
export const GetPlansByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlansByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlansByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanForwardDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetPlansByStatusQuery, GetPlansByStatusQueryVariables>;
export const GetPlanSummariesByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlanSummariesByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlanSummariesByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanSummaryInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanSummaryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanSummary"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"botCount"}}]}}]} as unknown as DocumentNode<GetPlanSummariesByStatusQuery, GetPlanSummariesByStatusQueryVariables>;
export const GetPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlanById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<GetPlanByIdQuery, GetPlanByIdQueryVariables>;
export const GetPlanBotGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlanBotGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlanBotGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"pageSize"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSize"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"hasDefault"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalGroups"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"currentPage"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetPlanBotGroupsQuery, GetPlanBotGroupsQueryVariables>;
export const CreatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createPlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createPlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<CreatePlanMutation, CreatePlanMutationVariables>;
export const UpdatePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updatePlanInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updatePlanInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<UpdatePlanMutation, UpdatePlanMutationVariables>;
export const DeletePlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeletePlanMutation, DeletePlanMutationVariables>;
export const StartPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StartPlanMutation, StartPlanMutationVariables>;
export const EndPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"endPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<EndPlanMutation, EndPlanMutationVariables>;
export const PlanCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"planCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<PlanCreatedSubscription, PlanCreatedSubscriptionVariables>;
export const PlanUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"planUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"planUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<PlanUpdatedSubscription, PlanUpdatedSubscriptionVariables>;
export const GetSimulationEvaluatorWorkersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSimulationEvaluatorWorkers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationEvaluatorWorkers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"authorizationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"runtimeStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastHeartbeatAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastTaskAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"platformCaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"coveredStartAt"}},{"kind":"Field","name":{"kind":"Name","value":"coveredEndAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prebuildProgress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"records"}},{"kind":"Field","name":{"kind":"Name","value":"totalRecords"}},{"kind":"Field","name":{"kind":"Name","value":"bytes"}}]}}]}}]}}]} as unknown as DocumentNode<GetSimulationEvaluatorWorkersQuery, GetSimulationEvaluatorWorkersQueryVariables>;
export const ApproveSimulationEvaluatorWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"approveSimulationEvaluatorWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveSimulationEvaluatorWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ApproveSimulationEvaluatorWorkerMutation, ApproveSimulationEvaluatorWorkerMutationVariables>;
export const RejectSimulationEvaluatorWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"rejectSimulationEvaluatorWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rejectSimulationEvaluatorWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RejectSimulationEvaluatorWorkerMutation, RejectSimulationEvaluatorWorkerMutationVariables>;
export const RemoveRejectedSimulationEvaluatorWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeRejectedSimulationEvaluatorWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeRejectedSimulationEvaluatorWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}}}]}]}}]} as unknown as DocumentNode<RemoveRejectedSimulationEvaluatorWorkerMutation, RemoveRejectedSimulationEvaluatorWorkerMutationVariables>;
export const PrebuildSimulationEvaluatorWorkerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"prebuildSimulationEvaluatorWorker"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startedAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endedAt"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prebuildSimulationEvaluatorWorker"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"workerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workerId"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"startedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startedAt"}}},{"kind":"Argument","name":{"kind":"Name","value":"endedAt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endedAt"}}}]}]}}]} as unknown as DocumentNode<PrebuildSimulationEvaluatorWorkerMutation, PrebuildSimulationEvaluatorWorkerMutationVariables>;
export const GetSimulationPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSimulationPlans"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSimulationPlans"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationPlanInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}}]} as unknown as DocumentNode<GetSimulationPlansQuery, GetSimulationPlansQueryVariables>;
export const SimulationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}}]} as unknown as DocumentNode<SimulationsQuery, SimulationsQueryVariables>;
export const SimulationResearchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulationResearches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationResearches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<SimulationResearchesQuery, SimulationResearchesQueryVariables>;
export const SimulationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}}]} as unknown as DocumentNode<SimulationQuery, SimulationQueryVariables>;
export const SimulationResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulationResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearchDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"simulations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationInfo"}}]}}]}}]} as unknown as DocumentNode<SimulationResearchQuery, SimulationResearchQueryVariables>;
export const SimulationsByResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulationsByResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"researchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationsByResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"researchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"researchId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}}]} as unknown as DocumentNode<SimulationsByResearchQuery, SimulationsByResearchQueryVariables>;
export const SimulationPlansBySimulationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulationPlansBySimulation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"simulationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationPlansBySimulation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"simulationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"simulationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationPlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}}]} as unknown as DocumentNode<SimulationPlansBySimulationQuery, SimulationPlansBySimulationQueryVariables>;
export const SimulationPlanDetailsBySimulationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulationPlanDetailsBySimulation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"simulationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationPlanDetailsBySimulation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"simulationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"simulationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationPlanDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"cacheState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"lastFetchedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rebuildRequested"}},{"kind":"Field","name":{"kind":"Name","value":"rebuilding"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradePositionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlanDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<SimulationPlanDetailsBySimulationQuery, SimulationPlanDetailsBySimulationQueryVariables>;
export const GetSimulationPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSimulationPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSimulationPlanById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationPlanDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"collateralDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateralInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"isLong"}},{"kind":"Field","name":{"kind":"Name","value":"leverage"}},{"kind":"Field","name":{"kind":"Name","value":"leverageDelta"}},{"kind":"Field","name":{"kind":"Name","value":"operation"}},{"kind":"Field","name":{"kind":"Name","value":"pair"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"sizeDeltaUsd"}},{"kind":"Field","name":{"kind":"Name","value":"sizeInUsd"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdBasePnl"}},{"kind":"Field","name":{"kind":"Name","value":"usdFee"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"collateralUsdPrice"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradeHistory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradeHistoryInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationTradePositionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationTradePosition"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"histories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradeHistoryInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"cacheState"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"lastFetchedAt"}},{"kind":"Field","name":{"kind":"Name","value":"rebuildRequested"}},{"kind":"Field","name":{"kind":"Name","value":"rebuilding"}}]}},{"kind":"Field","name":{"kind":"Name","value":"positions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationTradePositionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlanDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<GetSimulationPlanByIdQuery, GetSimulationPlanByIdQueryVariables>;
export const CreateSimulationPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSimulationPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSimulationPlanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSimulationPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationPlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}}]} as unknown as DocumentNode<CreateSimulationPlanMutation, CreateSimulationPlanMutationVariables>;
export const CreateSimulationResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSimulationResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSimulationResearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSimulationResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateSimulationResearchMutation, CreateSimulationResearchMutationVariables>;
export const UpdateSimulationResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSimulationResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSimulationResearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSimulationResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateSimulationResearchMutation, UpdateSimulationResearchMutationVariables>;
export const UpdateSimulationBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSimulationBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSimulationBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSimulationBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<UpdateSimulationBotMutation, UpdateSimulationBotMutationVariables>;
export const BatchCreateSimulationBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"batchCreateSimulationBots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSimulationBotInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchCreateSimulationBots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inputs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<BatchCreateSimulationBotsMutation, BatchCreateSimulationBotsMutationVariables>;
export const PlaySimulationPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"playSimulationPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playSimulationPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationPlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}}]} as unknown as DocumentNode<PlaySimulationPlanMutation, PlaySimulationPlanMutationVariables>;
export const CancelSimulationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cancelSimulation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelSimulation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}}]} as unknown as DocumentNode<CancelSimulationMutation, CancelSimulationMutationVariables>;
export const PlayAutoResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"playAutoResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playAutoResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PlayAutoResearchMutation, PlayAutoResearchMutationVariables>;
export const PauseResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"pauseResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<PauseResearchMutation, PauseResearchMutationVariables>;
export const CancelResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cancelResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CancelResearchMutation, CancelResearchMutationVariables>;
export const DeleteSimulationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSimulation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSimulation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSimulationMutation, DeleteSimulationMutationVariables>;
export const DeleteSimulationResearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSimulationResearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSimulationResearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSimulationResearchMutation, DeleteSimulationResearchMutationVariables>;
export const DeleteSimulationPlanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSimulationPlan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSimulationPlan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSimulationPlanMutation, DeleteSimulationPlanMutationVariables>;
export const DeleteSimulationBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSimulationBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSimulationBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteSimulationBotMutation, DeleteSimulationBotMutationVariables>;
export const StopSimulationBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopSimulationBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopSimulationBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}}]} as unknown as DocumentNode<StopSimulationBotMutation, StopSimulationBotMutationVariables>;
export const SimulationResearchUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"simulationResearchUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationResearchUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationResearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationResearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationResearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"executionFlow"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"totalRanges"}},{"kind":"Field","name":{"kind":"Name","value":"completedRanges"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulations"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ranges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<SimulationResearchUpdatedSubscription, SimulationResearchUpdatedSubscriptionVariables>;
export const SimulationUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"simulationUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Simulation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completedPlans"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"days"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"direction"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"gapDays"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsd"}},{"kind":"Field","name":{"kind":"Name","value":"collateral"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"size"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leverage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"progressMessage"}},{"kind":"Field","name":{"kind":"Name","value":"progressPercent"}},{"kind":"Field","name":{"kind":"Name","value":"progressPhase"}},{"kind":"Field","name":{"kind":"Name","value":"r2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"researchId"}},{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scoreFormular"}},{"kind":"Field","name":{"kind":"Name","value":"selectedLeaderCount"}},{"kind":"Field","name":{"kind":"Name","value":"sizingFormular"}},{"kind":"Field","name":{"kind":"Name","value":"slope"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"standardCollateralUsd"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalCostUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalNetPnlUsd"}},{"kind":"Field","name":{"kind":"Name","value":"totalSimulationPlans"}},{"kind":"Field","name":{"kind":"Name","value":"tradeCount"}},{"kind":"Field","name":{"kind":"Name","value":"trade"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"min"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}}]}}]} as unknown as DocumentNode<SimulationUpdatedSubscription, SimulationUpdatedSubscriptionVariables>;
export const SimulationPlanUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"simulationPlanUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationPlanUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationPlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationBotInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationBot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"avgCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}},{"kind":"Field","name":{"kind":"Name","value":"avgLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"avgNegativePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageByCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlPercentageBySize"}},{"kind":"Field","name":{"kind":"Name","value":"avgPositivePnl"}},{"kind":"Field","name":{"kind":"Name","value":"avgSize"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"leaderPlatform"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxDuration"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"simulationPlanId"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"stoppedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SimulationPlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SimulationPlan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"endAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowerPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalLeaderPnl"}},{"kind":"Field","name":{"kind":"Name","value":"totalPositions"}},{"kind":"Field","name":{"kind":"Name","value":"simulationId"}},{"kind":"Field","name":{"kind":"Name","value":"simulationBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SimulationBotInfo"}}]}}]}}]} as unknown as DocumentNode<SimulationPlanUpdatedSubscription, SimulationPlanUpdatedSubscriptionVariables>;
export const GetAllStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}}]} as unknown as DocumentNode<GetAllStrategyQuery, GetAllStrategyQueryVariables>;
export const UpdateStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStrategyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}}]} as unknown as DocumentNode<UpdateStrategyMutation, UpdateStrategyMutationVariables>;
export const PauseSystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"pauseSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseSystem"}}]}}]} as unknown as DocumentNode<PauseSystemMutation, PauseSystemMutationVariables>;
export const ResumeSystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resumeSystem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeSystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ResumeSystemMutation, ResumeSystemMutationVariables>;
export const KillSubServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"killSubService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"service"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"killSubService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"service"},"value":{"kind":"Variable","name":{"kind":"Name","value":"service"}}}]}]}}]} as unknown as DocumentNode<KillSubServiceMutation, KillSubServiceMutationVariables>;
export const StartSubServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startSubService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"service"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startSubService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"service"},"value":{"kind":"Variable","name":{"kind":"Name","value":"service"}}}]}]}}]} as unknown as DocumentNode<StartSubServiceMutation, StartSubServiceMutationVariables>;
export const GetMicroserviceStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMicroserviceStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMicroserviceStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pids"}},{"kind":"Field","name":{"kind":"Name","value":"service"}}]}}]}}]} as unknown as DocumentNode<GetMicroserviceStatusQuery, GetMicroserviceStatusQueryVariables>;
export const SimulationEvaluatorWorkersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"simulationEvaluatorWorkers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"simulationEvaluatorWorkers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"authorizationStatus"}},{"kind":"Field","name":{"kind":"Name","value":"runtimeStatus"}},{"kind":"Field","name":{"kind":"Name","value":"lastHeartbeatAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}},{"kind":"Field","name":{"kind":"Name","value":"platformCaches"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"coveredStartAt"}},{"kind":"Field","name":{"kind":"Name","value":"coveredEndAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastError"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prebuildProgress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"records"}},{"kind":"Field","name":{"kind":"Name","value":"bytes"}}]}}]}}]}}]} as unknown as DocumentNode<SimulationEvaluatorWorkersQuery, SimulationEvaluatorWorkersQueryVariables>;
export const MakeSafeAppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"makeSafeApp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeSafeApp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<MakeSafeAppMutation, MakeSafeAppMutationVariables>;
export const ChangePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldPassword"}}}]}]}}]} as unknown as DocumentNode<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const GetSystemStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getSystemStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"systemStatus"}}]}}]} as unknown as DocumentNode<GetSystemStatusQuery, GetSystemStatusQueryVariables>;
export const IsSafeAppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"isSafeApp"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isSafeApp"}}]}}]} as unknown as DocumentNode<IsSafeAppQuery, IsSafeAppQueryVariables>;
export const CleanDbDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"cleanDB"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cleanDB"}}]}}]} as unknown as DocumentNode<CleanDbMutation, CleanDbMutationVariables>;
export const GetServerTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getServerTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getServerTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}}]}}]}}]} as unknown as DocumentNode<GetServerTimeQuery, GetServerTimeQueryVariables>;
export const GetAlertTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAlertTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAlertTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetAlertTasksQuery, GetAlertTasksQueryVariables>;
export const StopTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StopTaskMutation, StopTaskMutationVariables>;
export const TaskCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskCreatedSubscription, TaskCreatedSubscriptionVariables>;
export const TaskUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockHash"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dedupeKey"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"origin"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"tpPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"slPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"maxOpenMissions"}},{"kind":"Field","name":{"kind":"Name","value":"selectedPairs"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskUpdatedSubscription, TaskUpdatedSubscriptionVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"secondAddress"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"singature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"singature"}}},{"kind":"Argument","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}}},{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const ChangeUserPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeUserPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"permission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"secondAddress"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<ChangeUserPermissionMutation, ChangeUserPermissionMutationVariables>;
export const AllowAutoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"allowAuto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowAuto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budget"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerContractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowAuto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowAuto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowAuto"}}},{"kind":"Argument","name":{"kind":"Name","value":"budget"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budget"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerContractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerContractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"secondAddress"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<AllowAutoMutation, AllowAutoMutationVariables>;