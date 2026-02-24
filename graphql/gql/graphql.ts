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

export type AccPnlV2 = {
  __typename?: 'AccPnlV2';
  date: Scalars['Date']['output'];
  in: Scalars['Float']['output'];
  inOut: Scalars['Float']['output'];
  out: Scalars['Float']['output'];
  pnl: Scalars['Float']['output'];
  positionCount: Scalars['Int']['output'];
  taskCount: Scalars['Int']['output'];
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String']['output'];
};

export type Action = {
  __typename?: 'Action';
  address: Scalars['String']['output'];
  args: Scalars['String']['output'];
  blockNumber: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  orderInBlock: Scalars['Int']['output'];
  positionKey: Scalars['String']['output'];
};

export type AddUserInput = {
  address: Scalars['String']['input'];
};

export type ApplyParetoStepInput = {
  metrics: Array<Scalars['String']['input']>;
  pipelineId: Scalars['ID']['input'];
};

export type ApplyThresholdStepInput = {
  metricName: Scalars['String']['input'];
  operator: Scalars['String']['input'];
  pipelineId: Scalars['ID']['input'];
  value: Scalars['Float']['input'];
};

export type AssetInput = {
  address: Scalars['String']['input'];
  amount: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  kind: Scalars['String']['input'];
};

export type BacktestComponents = {
  __typename?: 'BacktestComponents';
  exits: Array<ComponentInfo>;
  filters: Array<ComponentInfo>;
  platforms: Array<ComponentInfo>;
  risk: Array<ComponentInfo>;
  signals: Array<ComponentInfo>;
};

export type BacktestResult = {
  __typename?: 'BacktestResult';
  configId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  losingTrades: Scalars['Int']['output'];
  maxDrawdownPercent: Scalars['Float']['output'];
  maxDrawdownUsdt: Scalars['Float']['output'];
  profitFactor?: Maybe<Scalars['Float']['output']>;
  resultFolder: Scalars['String']['output'];
  runDate: Scalars['String']['output'];
  sharpeRatio?: Maybe<Scalars['Float']['output']>;
  strategyConfig: Scalars['JSON']['output'];
  taskId: Scalars['ID']['output'];
  totalPnlPercent: Scalars['Float']['output'];
  totalPnlUsdt: Scalars['Float']['output'];
  totalTrades: Scalars['Int']['output'];
  winRate: Scalars['Float']['output'];
  winningTrades: Scalars['Int']['output'];
};

export type BacktestResultSummary = {
  __typename?: 'BacktestResultSummary';
  configId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  maxDrawdownPercent: Scalars['Float']['output'];
  profitFactor?: Maybe<Scalars['Float']['output']>;
  runDate: Scalars['String']['output'];
  sharpeRatio?: Maybe<Scalars['Float']['output']>;
  totalPnlUsdt: Scalars['Float']['output'];
  totalTrades: Scalars['Int']['output'];
  winRate: Scalars['Float']['output'];
};

export type BacktestTask = {
  __typename?: 'BacktestTask';
  /** Config IDs of Pareto-optimal results (optuna only) */
  bestConfigIds: Array<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  currentConfig?: Maybe<Scalars['String']['output']>;
  /** Current trial number (real-time via heartbeat) */
  currentTrial: Scalars['Int']['output'];
  endDate: Scalars['Date']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interval: Scalars['String']['output'];
  /** Last heartbeat timestamp from optimizer.py */
  lastHeartbeat?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  /** Metrics to optimize (multi-objective) */
  optimizationMetrics: Array<Scalars['String']['output']>;
  optimizationParams: Scalars['JSON']['output'];
  /** PID of running optimizer process */
  optimizerPid?: Maybe<Scalars['Int']['output']>;
  processedConfigs: Scalars['Int']['output'];
  /** Search strategy: grid or optuna */
  searchStrategy: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: BacktestTaskStatus;
  symbol: Scalars['String']['output'];
  templateId?: Maybe<Scalars['ID']['output']>;
  templateSearchId?: Maybe<Scalars['ID']['output']>;
  totalConfigs: Scalars['Int']['output'];
  /** Trial progress phase: sampling | evaluating | completed */
  trialProgress?: Maybe<Scalars['String']['output']>;
  /** Number of Optuna trials */
  trials?: Maybe<Scalars['Int']['output']>;
};

export enum BacktestTaskStatus {
  Await = 'AWAIT',
  Cancelled = 'CANCELLED',
  Done = 'DONE',
  Failed = 'FAILED',
  Processing = 'PROCESSING'
}

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
  leaderCollateralBaseline: Scalars['Int']['output'];
  leaderContract: Contract;
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
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

export type BotCount = {
  __typename?: 'BotCount';
  botCount: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
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
  leaderCollateralBaseline: Scalars['Int']['output'];
  leaderContract: Contract;
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
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
  leaderCollateralBaseline: Scalars['Int']['output'];
  leaderContract: Contract;
  leaderContractId: Scalars['Int']['output'];
  leaderEndedBlock?: Maybe<Scalars['Int']['output']>;
  leaderStartedBlock?: Maybe<Scalars['Int']['output']>;
  missions: Array<MissionForwardDetails>;
  planId: Scalars['Int']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
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

export type ComponentInfo = {
  __typename?: 'ComponentInfo';
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  params: Array<ParamInfo>;
};

export type ConfigureRobustnessInput = {
  minScore: Scalars['Float']['input'];
  pipelineId: Scalars['ID']['input'];
  steps: Scalars['Int']['input'];
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String']['output'];
  backendUrl?: Maybe<Scalars['String']['output']>;
  chainId: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  fromBlock: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isTestnet: Scalars['Boolean']['output'];
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

export type CreateBacktestTaskInput = {
  endDate: Scalars['Date']['input'];
  interval?: Scalars['String']['input'];
  name: Scalars['String']['input'];
  optimizationMetrics?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Dynamic optimization params. Format depends on searchStrategy. */
  optimizationParams: Scalars['JSON']['input'];
  searchStrategy?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['Date']['input'];
  symbol: Scalars['String']['input'];
  trials?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateBotAndStrategyInput = {
  followerAddress?: InputMaybe<Scalars['String']['input']>;
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
  scheduledEnd: Scalars['Date']['input'];
  scheduledStart: Scalars['Date']['input'];
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

export type CreateStrategyTemplateInput = {
  category: StrategyCategory;
  description?: InputMaybe<Scalars['String']['input']>;
  /** Factory configuration - same structure as OptimizationParams */
  factoryConfig: Scalars['JSON']['input'];
  name: Scalars['String']['input'];
};

export type CreateTemplateSearchInput = {
  endDate: Scalars['Date']['input'];
  interval?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  optimizationMetrics?: InputMaybe<Array<Scalars['String']['input']>>;
  searchStrategy?: InputMaybe<Scalars['String']['input']>;
  startDate: Scalars['Date']['input'];
  /** Symbol to run backtest on */
  symbol: Scalars['String']['input'];
  templateId: Scalars['ID']['input'];
  trials?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateValidationPipelineInput = {
  backtestTaskId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type DecreasePositionSizeInput = {
  address: Scalars['String']['input'];
  collateralDelta: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  leverageDelta: Scalars['Int']['input'];
  pairIndex: Scalars['Int']['input'];
};

export type ExpertPnlSnapshotV2Connection = {
  __typename?: 'ExpertPnlSnapshotV2Connection';
  edges: Array<ExpertPnlSnapshotV2Edge>;
  pageInfo: ExpertPnlSnapshotV2PageInfo;
};

export type ExpertPnlSnapshotV2Edge = {
  __typename?: 'ExpertPnlSnapshotV2Edge';
  cursor: Scalars['Int']['output'];
  node: ExpertPnlSnapshotV2Node;
};

export type ExpertPnlSnapshotV2Node = {
  __typename?: 'ExpertPnlSnapshotV2Node';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  avgDuration: Scalars['Float']['output'];
  avgPnlRatio: Scalars['Float']['output'];
  dateStr: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
  maxSize: Scalars['Float']['output'];
  openedPositions: Scalars['Int']['output'];
  platform: Platform;
  ratio: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
};

export type ExpertPnlSnapshotV2PageInfo = {
  __typename?: 'ExpertPnlSnapshotV2PageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type ExportFilter = {
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

export type FinalApprovalInput = {
  approvedCandidateIds: Array<Scalars['ID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
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
  pnlSnapshots: Array<PnlSnapshotV2>;
  publicKey: Scalars['String']['output'];
  trades: Array<FollowerTrade>;
  usdcAllowance?: Maybe<Scalars['String']['output']>;
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
  mission?: Maybe<MissionForwardDetails>;
  params: Scalars['String']['output'];
};

export type GetUserByAddressInput = {
  address: Scalars['String']['input'];
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
  Hook = 'Hook',
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
  addTagToWalletAccount: WalletAccount;
  addToBlacklist: Scalars['Boolean']['output'];
  addToWhitelist: Scalars['Boolean']['output'];
  addWalletAccount: WalletAccount;
  allowAuto: User;
  /** Apply a Pareto selection run with specified metrics */
  applyParetoStep: ValidationPipeline;
  /** Apply a single threshold filter to pipeline candidates */
  applyThresholdStep: ValidationPipeline;
  batchCreateBots: Array<BotBackwardDetails>;
  buildPnlSnapshotsV2: Scalars['Boolean']['output'];
  /** Cancel a running or pending backtest task */
  cancelBacktestTask: BacktestTask;
  cancelOrderAfterTimeout: ContractExecutionResult;
  /** Cancel a template search and its task */
  cancelTemplateSearch: TemplateSearch;
  /** Cancel a validation pipeline */
  cancelValidationPipeline: ValidationPipeline;
  changePassword: Scalars['Boolean']['output'];
  changeUserPermission: User;
  checkLog: Log;
  cloneMission: Scalars['Boolean']['output'];
  closeMission: Scalars['Boolean']['output'];
  closeTradeMarket: ContractExecutionResult;
  /** Complete Pareto step and advance to WFA */
  completeParetoStep: ValidationPipeline;
  /** Complete robustness testing, aggregate results, and advance to final approval */
  completeRobustness: ValidationPipeline;
  /** Complete threshold step and advance to Pareto selection */
  completeThresholdStep: ValidationPipeline;
  /** Approve WFA results, remove failed candidates, and advance to user selection */
  completeWfa: ValidationPipeline;
  /** Configure robustness test parameters before running steps */
  configureRobustness: ValidationPipeline;
  createAutoPlan: Scalars['Boolean']['output'];
  /** Create a new backtest optimization task */
  createBacktestTask: BacktestTask;
  createBot: BotBackwardDetails;
  createPlan: Plan;
  createSLTP: SltpRequest;
  /** Create a new strategy template */
  createStrategyTemplate: StrategyTemplate;
  /** Create a new template search (spawns a BacktestTask) */
  createTemplateSearch: TemplateSearchWithTemplate;
  /** Create a new validation pipeline from a completed backtest task */
  createValidationPipeline: ValidationPipeline;
  decreaseAllowanceToZero: Scalars['Boolean']['output'];
  decreasePositionSize: ContractExecutionResult;
  /** Delete a single backtest result */
  deleteBacktestResult: Scalars['Boolean']['output'];
  /** Delete a backtest task and its results */
  deleteBacktestTask: Scalars['Boolean']['output'];
  deleteBot: BotBackwardDetails;
  deleteCategory: TagCategory;
  deletePlan: Scalars['Int']['output'];
  deleteSLTP: SltpRequest;
  /** Delete a strategy template */
  deleteStrategyTemplate: Scalars['Boolean']['output'];
  deleteTag: Tag;
  /** Delete a template search and its task */
  deleteTemplateSearch: Scalars['Boolean']['output'];
  /** Delete a validation pipeline and all related records */
  deleteValidationPipeline: Scalars['Boolean']['output'];
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
  pauseSystem: Scalars['Boolean']['output'];
  /** Pause a running WFA process. Takes effect after current candidate finishes. */
  pauseWfa: ValidationPipeline;
  performTask: Scalars['Boolean']['output'];
  /** Preview Pareto selection without applying it */
  previewParetoStep: ParetoPreviewResult;
  /** Preview a threshold filter without applying it */
  previewThresholdStep: ThresholdPreviewResult;
  registerTradingSignalLog: TradingSignalLog;
  removeEventLogsFromTradingSignalLog: TradingSignalLog;
  removeFromBlacklist: Scalars['Boolean']['output'];
  removeFromWhitelist: Scalars['Boolean']['output'];
  /** Remove a Pareto step and recalculate */
  removeParetoStep: ValidationPipeline;
  removeTagFromWalletAccount: WalletAccount;
  /** Remove a threshold step and recalculate */
  removeThresholdStep: ValidationPipeline;
  /** Resume or extend an Optuna optimization task */
  resumeBacktestTask: BacktestTask;
  resumeSystem: Scalars['Boolean']['output'];
  /** Resume a paused WFA process. Continues from where it left off. */
  resumeWfa: ValidationPipeline;
  /** Retry a failed backtest task */
  retryBacktestTask: BacktestTask;
  /** Run a single robustness step across all selected candidates */
  runRobustnessStep: Array<RobustnessStepResult>;
  startAdaption: Scalars['Boolean']['output'];
  /** Start global Optuna dashboard (connects to PostgreSQL, shows all studies) */
  startOptunaDashboard: OptunaDashboardStatus;
  startPlan: Scalars['Boolean']['output'];
  startSubService: Scalars['Boolean']['output'];
  /** Start WFA background process. Returns immediately, progress via subscription. */
  startWfa: ValidationPipeline;
  stopBot: Scalars['Boolean']['output'];
  /** Stop the running Optuna dashboard */
  stopOptunaDashboard: Scalars['Boolean']['output'];
  stopTask: Scalars['Boolean']['output'];
  /** Submit final approval of candidates to complete the pipeline */
  submitFinalApproval: ValidationPipeline;
  /** Submit user selection of candidates and advance to robustness */
  submitUserSelection: ValidationPipeline;
  unregisterTradingSignalLog: TradingSignalLog;
  updateLeverage: ContractExecutionResult;
  updateMaxOpenMissions: Scalars['Boolean']['output'];
  updatePlan: Plan;
  updateSl: ContractExecutionResult;
  updateStrategy: Strategy;
  /** Update an existing strategy template */
  updateStrategyTemplate: StrategyTemplate;
  updateTp: ContractExecutionResult;
  upsertCategory: TagCategory;
  upsertTag: Tag;
  withdrawAllETH: Scalars['Boolean']['output'];
  withdrawAllUSDC: Scalars['Boolean']['output'];
  withdrawAsset: Scalars['Boolean']['output'];
  withdrawETHToUser: Scalars['Boolean']['output'];
  withdrawPositivePnl: ContractExecutionResult;
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


export type MutationApplyParetoStepArgs = {
  input: ApplyParetoStepInput;
};


export type MutationApplyThresholdStepArgs = {
  input: ApplyThresholdStepInput;
};


export type MutationBatchCreateBotsArgs = {
  input: Array<CreateBotAndStrategyInput>;
};


export type MutationBuildPnlSnapshotsV2Args = {
  dateStr: Scalars['String']['input'];
  isForceBuild: Scalars['Boolean']['input'];
  platform: Platform;
};


export type MutationCancelBacktestTaskArgs = {
  taskId: Scalars['ID']['input'];
};


export type MutationCancelOrderAfterTimeoutArgs = {
  input: CancelOrderAfterTimeoutInput;
};


export type MutationCancelTemplateSearchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCancelValidationPipelineArgs = {
  id: Scalars['ID']['input'];
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


export type MutationCompleteParetoStepArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type MutationCompleteRobustnessArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type MutationCompleteThresholdStepArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type MutationCompleteWfaArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type MutationConfigureRobustnessArgs = {
  input: ConfigureRobustnessInput;
};


export type MutationCreateBacktestTaskArgs = {
  input: CreateBacktestTaskInput;
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


export type MutationCreateStrategyTemplateArgs = {
  input: CreateStrategyTemplateInput;
};


export type MutationCreateTemplateSearchArgs = {
  input: CreateTemplateSearchInput;
};


export type MutationCreateValidationPipelineArgs = {
  input: CreateValidationPipelineInput;
};


export type MutationDecreaseAllowanceToZeroArgs = {
  contractId: Scalars['Int']['input'];
  followerAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDecreasePositionSizeArgs = {
  input: DecreasePositionSizeInput;
};


export type MutationDeleteBacktestResultArgs = {
  resultId: Scalars['ID']['input'];
};


export type MutationDeleteBacktestTaskArgs = {
  taskId: Scalars['ID']['input'];
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


export type MutationDeleteSltpArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteStrategyTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  tag: Scalars['String']['input'];
};


export type MutationDeleteTemplateSearchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteValidationPipelineArgs = {
  id: Scalars['ID']['input'];
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


export type MutationPauseWfaArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type MutationPerformTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationPreviewParetoStepArgs = {
  input: PreviewParetoStepInput;
};


export type MutationPreviewThresholdStepArgs = {
  input: PreviewThresholdStepInput;
};


export type MutationRegisterTradingSignalLogArgs = {
  address: Scalars['String']['input'];
  platform: Platform;
};


export type MutationRemoveEventLogsFromTradingSignalLogArgs = {
  eventLogIds: Array<Scalars['Int']['input']>;
  signalId: Scalars['Int']['input'];
};


export type MutationRemoveFromBlacklistArgs = {
  address: Scalars['String']['input'];
};


export type MutationRemoveFromWhitelistArgs = {
  address: Scalars['String']['input'];
};


export type MutationRemoveParetoStepArgs = {
  pipelineId: Scalars['ID']['input'];
  stepId: Scalars['ID']['input'];
};


export type MutationRemoveTagFromWalletAccountArgs = {
  input: ChangeUserTagInput;
};


export type MutationRemoveThresholdStepArgs = {
  pipelineId: Scalars['ID']['input'];
  stepId: Scalars['ID']['input'];
};


export type MutationResumeBacktestTaskArgs = {
  additionalTrials?: InputMaybe<Scalars['Int']['input']>;
  taskId: Scalars['ID']['input'];
};


export type MutationResumeSystemArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
};


export type MutationResumeWfaArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type MutationRetryBacktestTaskArgs = {
  taskId: Scalars['ID']['input'];
};


export type MutationRunRobustnessStepArgs = {
  input: RunRobustnessStepInput;
};


export type MutationStartAdaptionArgs = {
  contractId: Scalars['Int']['input'];
  shouldRestart: Scalars['Boolean']['input'];
};


export type MutationStartOptunaDashboardArgs = {
  port?: Scalars['Int']['input'];
};


export type MutationStartPlanArgs = {
  id: Scalars['Int']['input'];
};


export type MutationStartSubServiceArgs = {
  service: Scalars['String']['input'];
};


export type MutationStartWfaArgs = {
  input: StartWfaInput;
};


export type MutationStopBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationStopTaskArgs = {
  id: Scalars['Int']['input'];
};


export type MutationSubmitFinalApprovalArgs = {
  input: FinalApprovalInput;
  pipelineId: Scalars['ID']['input'];
};


export type MutationSubmitUserSelectionArgs = {
  input: UserSelectionInput;
  pipelineId: Scalars['ID']['input'];
};


export type MutationUnregisterTradingSignalLogArgs = {
  signalId: Scalars['Int']['input'];
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


export type MutationUpdateSlArgs = {
  input: UpdateSlInput;
};


export type MutationUpdateStrategyArgs = {
  id: Scalars['Int']['input'];
  input: UpdateStrategyInput;
};


export type MutationUpdateStrategyTemplateArgs = {
  input: UpdateStrategyTemplateInput;
};


export type MutationUpdateTpArgs = {
  input: UpdateTpInput;
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


export type MutationWithdrawAssetArgs = {
  input: AssetInput;
};


export type MutationWithdrawEthToUserArgs = {
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};


export type MutationWithdrawPositivePnlArgs = {
  input: WithdrawPositivePnlInput;
};


export type MutationWithdrawUsdcToUserArgs = {
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
};

export type OpenTradeInput = {
  address: Scalars['String']['input'];
  collateralAmount: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  leverage: Scalars['Int']['input'];
  long: Scalars['Boolean']['input'];
  pairIndex: Scalars['Int']['input'];
  sl: Scalars['String']['input'];
  tp: Scalars['String']['input'];
};

export type OptunaDashboardStatus = {
  __typename?: 'OptunaDashboardStatus';
  running: Scalars['Boolean']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

/** Paginated validation candidates with total count */
export type PaginatedValidationCandidatesResult = {
  __typename?: 'PaginatedValidationCandidatesResult';
  candidates: Array<ValidationCandidateWithResult>;
  totalCount: Scalars['Int']['output'];
};

export type ParamInfo = {
  __typename?: 'ParamInfo';
  default?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  options?: Maybe<Array<SelectOptionInfo>>;
  required: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
};

export type ParetoPreviewResult = {
  __typename?: 'ParetoPreviewResult';
  currentCount: Scalars['Int']['output'];
  dominatedCount: Scalars['Int']['output'];
  optimalCount: Scalars['Int']['output'];
};

export type ParetoStep = {
  __typename?: 'ParetoStep';
  candidatesAfter: Scalars['Int']['output'];
  candidatesBefore: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  metrics: Array<Scalars['String']['output']>;
  pipelineId: Scalars['ID']['output'];
  stepOrder: Scalars['Int']['output'];
};

export enum PerpTradeHistoryOperation {
  Close = 'CLOSE',
  DecreaseLeverage = 'DECREASE_LEVERAGE',
  DecreaseSize = 'DECREASE_SIZE',
  IncreaseLeverage = 'INCREASE_LEVERAGE',
  IncreaseSize = 'INCREASE_SIZE',
  Open = 'OPEN'
}

export type PerpTradeHistoryWithDate = {
  __typename?: 'PerpTradeHistoryWithDate';
  address: Scalars['String']['output'];
  collateralDeltaUsd: Scalars['Float']['output'];
  collateralInUsd: Scalars['Float']['output'];
  date: Scalars['Date']['output'];
  isLong: Scalars['Boolean']['output'];
  leverage: Scalars['Float']['output'];
  leverageDelta: Scalars['Float']['output'];
  operation: PerpTradeHistoryOperation;
  pair: Scalars['String']['output'];
  positionKey: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sizeDeltaUsd: Scalars['Float']['output'];
  sizeInUsd: Scalars['Float']['output'];
  usdPnl: Scalars['Float']['output'];
};

export type PerpTradingEventLog = {
  __typename?: 'PerpTradingEventLog';
  address: Scalars['String']['output'];
  block: Scalars['Int']['output'];
  contractId: Scalars['Int']['output'];
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  jsonLog: Scalars['String']['output'];
  logIndex: Scalars['Int']['output'];
  platform: Platform;
  usdPnl: Scalars['Float']['output'];
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

export enum Platform {
  Avnt = 'AVNT',
  Gmx = 'GMX',
  Gns = 'GNS'
}

export enum PnlSnapshotKind {
  AllTime = 'ALL_TIME',
  Day = 'DAY',
  Month = 'MONTH',
  ThreeMonth = 'THREE_MONTH',
  Week = 'WEEK'
}

export type PnlSnapshotV2 = {
  __typename?: 'PnlSnapshotV2';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  dateStr: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
  platform: Platform;
};

export type PnlSnapshotV2Details = {
  __typename?: 'PnlSnapshotV2Details';
  accUSDPnl: Scalars['Float']['output'];
  address: Scalars['String']['output'];
  dateStr: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  kind: PnlSnapshotKind;
  perpTradingEventLogs: Array<PerpTradingEventLog>;
  platform: Platform;
};

export type PnlSnapshotV2DetailsConnection = {
  __typename?: 'PnlSnapshotV2DetailsConnection';
  edges: Array<PnlSnapshotV2DetailsEdge>;
  pageInfo: PnlSnapshotV2DetailsPageInfo;
};

export type PnlSnapshotV2DetailsEdge = {
  __typename?: 'PnlSnapshotV2DetailsEdge';
  cursor: Scalars['Int']['output'];
  node: PnlSnapshotV2Details;
};

export type PnlSnapshotV2DetailsForPagination = {
  __typename?: 'PnlSnapshotV2DetailsForPagination';
  data: Array<PnlSnapshotV2Details>;
  pageInfo: PnlSnapshotV2DetailsForPaginationApiPageInfo;
};

export type PnlSnapshotV2DetailsForPaginationApiPageInfo = {
  __typename?: 'PnlSnapshotV2DetailsForPaginationAPIPageInfo';
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PnlSnapshotV2DetailsPageInfo = {
  __typename?: 'PnlSnapshotV2DetailsPageInfo';
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type PnlSnapshotV2InitializedFlag = {
  __typename?: 'PnlSnapshotV2InitializedFlag';
  dateStr: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isInit: Scalars['Boolean']['output'];
  platform: Platform;
};

export type PreviewParetoStepInput = {
  metrics: Array<Scalars['String']['input']>;
  pipelineId: Scalars['ID']['input'];
};

export type PreviewThresholdStepInput = {
  metricName: Scalars['String']['input'];
  operator: Scalars['String']['input'];
  pipelineId: Scalars['ID']['input'];
  value: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  allLogs: LogsConnection;
  /** Get available backtest components with their parameters */
  backtestComponents: BacktestComponents;
  /** Get list of result dates for a task */
  backtestResultDates: Array<Scalars['String']['output']>;
  /** Get a specific result file */
  backtestResultFile?: Maybe<ResultFile>;
  /** Get list of result folders for a task and date */
  backtestResultFolders: Array<ResultFolder>;
  /** Get backtest results for a task with sorting and pagination */
  backtestResults: Array<BacktestResult>;
  /** Get a single backtest task by ID */
  backtestTask?: Maybe<BacktestTask>;
  /** Get task count statistics by status */
  backtestTaskStats: TaskStats;
  /** List backtest tasks with optional filtering */
  backtestTasks: Array<BacktestTask>;
  findContract: Contract;
  findStrategy?: Maybe<Strategy>;
  findStrategyMetadata: StrategyMetadata;
  getALLSLTPs: Array<SltpRequest>;
  getActiveBots: Array<BotForwardDetails>;
  getAdaptionStatus: Scalars['String']['output'];
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
  getExpertPnlSnapshotsV2: ExpertPnlSnapshotV2Connection;
  getGnsPrices: Array<GnsPricingRecord>;
  getLogsSeverityCounts: Array<SeverityCount>;
  getMaxOpenMissions: Scalars['Int']['output'];
  getMicroserviceStatus: Array<MicroserviceStatus>;
  getPerpEventLogs: Array<Array<PerpTradingEventLog>>;
  getPlanById?: Maybe<PlanForwardDetails>;
  getPlansByStatus: PlanConnection;
  getPnlSnapshotV2InitializedFlag: Array<PnlSnapshotV2InitializedFlag>;
  getPnlSnapshotsV2: PnlSnapshotV2DetailsConnection;
  getPnlsnpashotsV2ByPagination: PnlSnapshotV2DetailsForPagination;
  getServerTime: ServerTime;
  getTradingSignalLogs: Array<TradingSignalLog>;
  getWalletAccountByAddress: WalletAccount;
  getWhitelist?: Maybe<Array<Scalars['String']['output']>>;
  getWholeCompressedHistoriesV2: WholeCompressedHistoriesV2;
  isPnlSnapshotV2Initialized?: Maybe<PnlSnapshotV2InitializedFlag>;
  isSafeApp: Scalars['Boolean']['output'];
  /** Get current Optuna dashboard status */
  optunaDashboardStatus: OptunaDashboardStatus;
  /** Get all Pareto steps for a pipeline */
  paretoSteps: Array<ParetoStep>;
  /** Get a strategy template by ID */
  strategyTemplate?: Maybe<StrategyTemplate>;
  /** Get a strategy template by name */
  strategyTemplateByName?: Maybe<StrategyTemplate>;
  /** Get a strategy template with usage statistics */
  strategyTemplateWithStats?: Maybe<StrategyTemplateWithStats>;
  /** List strategy templates with optional filtering */
  strategyTemplates: Array<StrategyTemplate>;
  systemStatus: Scalars['Boolean']['output'];
  /** Get the task for a specific template search */
  taskByTemplateSearch?: Maybe<BacktestTask>;
  /** Get all tasks using a specific template */
  tasksByTemplate: Array<BacktestTask>;
  /** Get a template search by ID */
  templateSearch?: Maybe<TemplateSearch>;
  /** Get template search count statistics by status */
  templateSearchStats: TemplateSearchStats;
  /** Get a template search with template and task */
  templateSearchWithTask?: Maybe<TemplateSearchWithTask>;
  /** List template searches with optional filtering */
  templateSearches: Array<TemplateSearchWithTemplate>;
  /** Get all threshold steps for a pipeline */
  thresholdSteps: Array<ThresholdStep>;
  /** Get top performing backtest results */
  topBacktestResults: Array<BacktestResult>;
  /** Get a validation candidate with result details */
  validationCandidate?: Maybe<ValidationCandidateWithResult>;
  /** Get validation candidates by pipeline and optional status */
  validationCandidatesByStatus: PaginatedValidationCandidatesResult;
  /** Get a validation pipeline by ID */
  validationPipeline?: Maybe<ValidationPipeline>;
  /** Get validation pipeline count statistics by status */
  validationPipelineStats: ValidationPipelineStats;
  /** Get a validation pipeline with all its candidates */
  validationPipelineWithCandidates?: Maybe<ValidationPipelineWithCandidates>;
  /** List validation pipelines with optional filtering */
  validationPipelines: Array<ValidationPipeline>;
};


export type QueryAllLogsArgs = {
  after?: InputMaybe<Scalars['Int']['input']>;
  checked: Scalars['Boolean']['input'];
  first: Scalars['Int']['input'];
  severity?: InputMaybe<LogSeverity>;
};


export type QueryBacktestResultDatesArgs = {
  taskId: Scalars['ID']['input'];
};


export type QueryBacktestResultFileArgs = {
  configId: Scalars['String']['input'];
  date: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};


export type QueryBacktestResultFoldersArgs = {
  date: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};


export type QueryBacktestResultsArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  sortBy?: Scalars['String']['input'];
  sortOrder?: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};


export type QueryBacktestTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBacktestTasksArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  status?: InputMaybe<BacktestTaskStatus>;
  symbol?: InputMaybe<Scalars['String']['input']>;
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


export type QueryGetExpertPnlSnapshotsV2Args = {
  after?: InputMaybe<Scalars['Int']['input']>;
  platform: Platform;
};


export type QueryGetGnsPricesArgs = {
  fromDate: Scalars['Date']['input'];
  pairName: Scalars['String']['input'];
  toDate: Scalars['Date']['input'];
};


export type QueryGetPerpEventLogsArgs = {
  addresses: Array<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  platform: Platform;
};


export type QueryGetPlanByIdArgs = {
  id: Scalars['Int']['input'];
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
  after?: InputMaybe<Scalars['Int']['input']>;
  dateStr: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  kind: PnlSnapshotKind;
  platform: Platform;
};


export type QueryGetPnlsnpashotsV2ByPaginationArgs = {
  dateStr: Scalars['String']['input'];
  kind: PnlSnapshotKind;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  platform: Platform;
};


export type QueryGetWalletAccountByAddressArgs = {
  input: GetUserByAddressInput;
};


export type QueryGetWholeCompressedHistoriesV2Args = {
  filterParams: Array<ExportFilter>;
  platform: Platform;
  startDate: Scalars['String']['input'];
};


export type QueryIsPnlSnapshotV2InitializedArgs = {
  dateStr: Scalars['String']['input'];
  platform: Platform;
};


export type QueryParetoStepsArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type QueryStrategyTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStrategyTemplateByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryStrategyTemplateWithStatsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryStrategyTemplatesArgs = {
  category?: InputMaybe<StrategyCategory>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QueryTaskByTemplateSearchArgs = {
  searchId: Scalars['ID']['input'];
};


export type QueryTasksByTemplateArgs = {
  templateId: Scalars['ID']['input'];
};


export type QueryTemplateSearchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTemplateSearchWithTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTemplateSearchesArgs = {
  filter?: InputMaybe<TemplateSearchFilterInput>;
};


export type QueryThresholdStepsArgs = {
  pipelineId: Scalars['ID']['input'];
};


export type QueryTopBacktestResultsArgs = {
  limit?: Scalars['Int']['input'];
  metric?: Scalars['String']['input'];
  taskId: Scalars['ID']['input'];
};


export type QueryValidationCandidateArgs = {
  id: Scalars['ID']['input'];
};


export type QueryValidationCandidatesByStatusArgs = {
  filter: ValidationCandidateFilterInput;
};


export type QueryValidationPipelineArgs = {
  id: Scalars['ID']['input'];
};


export type QueryValidationPipelineWithCandidatesArgs = {
  id: Scalars['ID']['input'];
};


export type QueryValidationPipelinesArgs = {
  filter?: InputMaybe<ValidationPipelineFilterInput>;
};

export type ResultFile = {
  __typename?: 'ResultFile';
  content: Scalars['String']['output'];
  contentType: Scalars['String']['output'];
  isCompressed: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  originalSize: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
};

export type ResultFolder = {
  __typename?: 'ResultFolder';
  configId: Scalars['String']['output'];
  date: Scalars['String']['output'];
  files: Array<Scalars['String']['output']>;
  taskId: Scalars['String']['output'];
};

export type RobustnessStepResult = {
  __typename?: 'RobustnessStepResult';
  candidateId: Scalars['ID']['output'];
  configId: Scalars['String']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  maxDrawdown?: Maybe<Scalars['Float']['output']>;
  sharpeRatio?: Maybe<Scalars['Float']['output']>;
  status: Scalars['String']['output'];
  stepIndex: Scalars['Int']['output'];
  totalPnl?: Maybe<Scalars['Float']['output']>;
};

export type RunRobustnessStepInput = {
  pipelineId: Scalars['ID']['input'];
  stepIndex: Scalars['Int']['input'];
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

export type SelectOptionInfo = {
  __typename?: 'SelectOptionInfo';
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
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

export type StartWfaInput = {
  minConsistency: Scalars['Float']['input'];
  pipelineId: Scalars['ID']['input'];
  trainRatio: Scalars['Float']['input'];
  windows: Scalars['Int']['input'];
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

/** Category of trading strategy */
export enum StrategyCategory {
  Breakout = 'BREAKOUT',
  Custom = 'CUSTOM',
  MeanReversion = 'MEAN_REVERSION',
  Momentum = 'MOMENTUM',
  Scalping = 'SCALPING',
  Swing = 'SWING',
  TrendFollowing = 'TREND_FOLLOWING',
  Volatility = 'VOLATILITY'
}

export type StrategyMetadata = {
  __typename?: 'StrategyMetadata';
  description: Scalars['String']['output'];
  key: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type StrategyTemplate = {
  __typename?: 'StrategyTemplate';
  category: StrategyCategory;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Factory configuration (same structure as OptimizationParams) */
  factoryConfig: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type StrategyTemplateWithStats = {
  __typename?: 'StrategyTemplateWithStats';
  category: StrategyCategory;
  createdAt: Scalars['Date']['output'];
  description?: Maybe<Scalars['String']['output']>;
  /** Factory configuration (same structure as OptimizationParams) */
  factoryConfig: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  /** Total number of searches using this template */
  totalSearches: Scalars['Int']['output'];
  /** Total number of backtest tasks using this template */
  totalTasks: Scalars['Int']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Subscribe to new backtest results */
  backtestResultCreated: BacktestResult;
  /** Subscribe to backtest task progress updates */
  backtestTaskUpdated: BacktestTask;
  botCreated: Array<BotBackwardDetails>;
  botUpdated: Array<BotBackwardDetails>;
  missionCreated: Array<MissionBackwardDetails>;
  missionUpdated: Array<MissionBackwardDetails>;
  newLog: Log;
  planCreated: Plan;
  planUpdated: Plan;
  taskCreated: Array<TaskBackwardDetails>;
  taskUpdated: Array<TaskBackwardDetails>;
  /** Subscribe to template search status updates */
  templateSearchUpdated: TemplateSearch;
  tradingSignalLogUpdated: Array<TradingSignalLogUpdated>;
  /** Subscribe to validation candidate status updates */
  validationCandidateUpdated: ValidationCandidate;
  /** Subscribe to validation pipeline status updates */
  validationPipelineUpdated: ValidationPipeline;
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

export type TaskStats = {
  __typename?: 'TaskStats';
  await: Scalars['Int']['output'];
  done: Scalars['Int']['output'];
  failed: Scalars['Int']['output'];
  processing: Scalars['Int']['output'];
};

export enum TaskStatus {
  Await = 'Await',
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Initiated = 'Initiated',
  Stopped = 'Stopped'
}

export type TemplateSearch = {
  __typename?: 'TemplateSearch';
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  endDate: Scalars['Date']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interval: Scalars['String']['output'];
  name: Scalars['String']['output'];
  searchStrategy: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: TemplateSearchStatus;
  /** Symbol to run backtest on */
  symbol: Scalars['String']['output'];
  templateId: Scalars['ID']['output'];
};

export type TemplateSearchFilterInput = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  status?: InputMaybe<TemplateSearchStatus>;
  templateId?: InputMaybe<Scalars['ID']['input']>;
};

export type TemplateSearchStats = {
  __typename?: 'TemplateSearchStats';
  await: Scalars['Int']['output'];
  cancelled: Scalars['Int']['output'];
  done: Scalars['Int']['output'];
  failed: Scalars['Int']['output'];
  processing: Scalars['Int']['output'];
};

/** Status of a template search */
export enum TemplateSearchStatus {
  Await = 'AWAIT',
  Cancelled = 'CANCELLED',
  Done = 'DONE',
  Failed = 'FAILED',
  Processing = 'PROCESSING'
}

export type TemplateSearchWithTask = {
  __typename?: 'TemplateSearchWithTask';
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  endDate: Scalars['Date']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interval: Scalars['String']['output'];
  name: Scalars['String']['output'];
  searchStrategy: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: TemplateSearchStatus;
  /** Symbol to run backtest on */
  symbol: Scalars['String']['output'];
  task?: Maybe<BacktestTask>;
  template: StrategyTemplate;
  templateId: Scalars['ID']['output'];
};

export type TemplateSearchWithTemplate = {
  __typename?: 'TemplateSearchWithTemplate';
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  endDate: Scalars['Date']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interval: Scalars['String']['output'];
  name: Scalars['String']['output'];
  searchStrategy: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: TemplateSearchStatus;
  /** Symbol to run backtest on */
  symbol: Scalars['String']['output'];
  template: StrategyTemplate;
  templateId: Scalars['ID']['output'];
};

export type TestingReport = {
  __typename?: 'TestingReport';
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

export type ThresholdPreviewResult = {
  __typename?: 'ThresholdPreviewResult';
  currentCount: Scalars['Int']['output'];
  eliminatedCount: Scalars['Int']['output'];
  survivingCount: Scalars['Int']['output'];
};

export type ThresholdStep = {
  __typename?: 'ThresholdStep';
  candidatesAfter: Scalars['Int']['output'];
  candidatesBefore: Scalars['Int']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  metricName: Scalars['String']['output'];
  operator: Scalars['String']['output'];
  pipelineId: Scalars['ID']['output'];
  stepOrder: Scalars['Int']['output'];
  value: Scalars['Float']['output'];
};

export type TotalBotV2 = {
  __typename?: 'TotalBotV2';
  address: Scalars['String']['output'];
  dateStr: Scalars['String']['output'];
  platform: Platform;
};

export type TradingSignalLog = {
  __typename?: 'TradingSignalLog';
  address: Scalars['String']['output'];
  eventLogs: Array<PerpTradingEventLog>;
  id: Scalars['Int']['output'];
  platform: Scalars['String']['output'];
};

export type TradingSignalLogUpdated = {
  __typename?: 'TradingSignalLogUpdated';
  eventLogs: Array<PerpTradingEventLog>;
  id: Scalars['Int']['output'];
};

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

export type UpdateSlInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
  newSl: Scalars['String']['input'];
};

export type UpdateStrategyInput = {
  maxCollateral: Scalars['Int']['input'];
  maxLeverage: Scalars['Int']['input'];
  minCollateral: Scalars['Int']['input'];
  minLeverage: Scalars['Int']['input'];
  params: Scalars['String']['input'];
  ratio: Scalars['Float']['input'];
};

export type UpdateStrategyTemplateInput = {
  category?: InputMaybe<StrategyCategory>;
  description?: InputMaybe<Scalars['String']['input']>;
  factoryConfig?: InputMaybe<Scalars['JSON']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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
};

export enum UserPermission {
  Admin = 'Admin',
  Trader = 'Trader',
  Trial = 'Trial'
}

export type UserSelectionInput = {
  notes?: InputMaybe<Scalars['String']['input']>;
  selectedCandidateIds: Array<Scalars['ID']['input']>;
};

export type ValidationCandidate = {
  __typename?: 'ValidationCandidate';
  configId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  dominatedBy?: Maybe<Array<Scalars['String']['output']>>;
  finalApprovedAt?: Maybe<Scalars['Date']['output']>;
  finalNotes?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paretoRank?: Maybe<Scalars['Int']['output']>;
  pipelineId: Scalars['ID']['output'];
  resultId: Scalars['ID']['output'];
  robustnessPassed?: Maybe<Scalars['Boolean']['output']>;
  robustnessScore?: Maybe<Scalars['Float']['output']>;
  /** Per-step robustness results JSON array */
  robustnessStepResults?: Maybe<Scalars['JSON']['output']>;
  status: ValidationCandidateStatus;
  thresholdPassed?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['Date']['output'];
  userNotes?: Maybe<Scalars['String']['output']>;
  userSelectedAt?: Maybe<Scalars['Date']['output']>;
  wfaConsistency?: Maybe<Scalars['Float']['output']>;
  wfaPassed?: Maybe<Scalars['Boolean']['output']>;
  /** Per-window WFA results JSON array */
  wfaWindowResults?: Maybe<Scalars['JSON']['output']>;
};

export type ValidationCandidateFilterInput = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  pipelineId: Scalars['ID']['input'];
  status?: InputMaybe<ValidationCandidateStatus>;
};

/** Status of a validation candidate */
export enum ValidationCandidateStatus {
  Active = 'ACTIVE',
  FinalApproved = 'FINAL_APPROVED',
  FinalRejected = 'FINAL_REJECTED',
  ParetoDominated = 'PARETO_DOMINATED',
  ParetoOptimal = 'PARETO_OPTIMAL',
  Pending = 'PENDING',
  RobustnessFailed = 'ROBUSTNESS_FAILED',
  RobustnessPassed = 'ROBUSTNESS_PASSED',
  ThresholdEliminated = 'THRESHOLD_ELIMINATED',
  UserRejected = 'USER_REJECTED',
  UserSelected = 'USER_SELECTED',
  WfaFailed = 'WFA_FAILED',
  WfaPassed = 'WFA_PASSED'
}

export type ValidationCandidateWithResult = {
  __typename?: 'ValidationCandidateWithResult';
  configId: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  dominatedBy?: Maybe<Array<Scalars['String']['output']>>;
  finalApprovedAt?: Maybe<Scalars['Date']['output']>;
  finalNotes?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  paretoRank?: Maybe<Scalars['Int']['output']>;
  pipelineId: Scalars['ID']['output'];
  result: BacktestResult;
  resultId: Scalars['ID']['output'];
  robustnessPassed?: Maybe<Scalars['Boolean']['output']>;
  robustnessScore?: Maybe<Scalars['Float']['output']>;
  /** Per-step robustness results JSON array */
  robustnessStepResults?: Maybe<Scalars['JSON']['output']>;
  status: ValidationCandidateStatus;
  thresholdPassed?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['Date']['output'];
  userNotes?: Maybe<Scalars['String']['output']>;
  userSelectedAt?: Maybe<Scalars['Date']['output']>;
  wfaConsistency?: Maybe<Scalars['Float']['output']>;
  wfaPassed?: Maybe<Scalars['Boolean']['output']>;
  /** Per-window WFA results JSON array */
  wfaWindowResults?: Maybe<Scalars['JSON']['output']>;
};

export type ValidationPipeline = {
  __typename?: 'ValidationPipeline';
  backtestTaskId: Scalars['ID']['output'];
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  /** Current step (1-7) */
  currentStep: Scalars['Int']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  finalApproved: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Pareto config: { metrics: string[] } */
  paretoConfig?: Maybe<Scalars['JSON']['output']>;
  paretoOptimal: Scalars['Int']['output'];
  passedRobustness: Scalars['Int']['output'];
  passedThreshold: Scalars['Int']['output'];
  passedWfa: Scalars['Int']['output'];
  /** Number of completed robustness steps */
  robustnessCompletedSteps: Scalars['Int']['output'];
  /** Robustness config: { steps, minScore } */
  robustnessConfig?: Maybe<Scalars['JSON']['output']>;
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: ValidationPipelineStatus;
  totalCandidates: Scalars['Int']['output'];
  userSelected: Scalars['Int']['output'];
  /** Number of completed WFA windows */
  wfaCompletedWindows: Scalars['Int']['output'];
  /** WFA config: { trainRatio, windows, minConsistency } */
  wfaConfig?: Maybe<Scalars['JSON']['output']>;
};

export type ValidationPipelineFilterInput = {
  backtestTaskId?: InputMaybe<Scalars['ID']['input']>;
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
  status?: InputMaybe<ValidationPipelineStatus>;
};

export type ValidationPipelineStats = {
  __typename?: 'ValidationPipelineStats';
  awaitingUser: Scalars['Int']['output'];
  cancelled: Scalars['Int']['output'];
  completed: Scalars['Int']['output'];
  created: Scalars['Int']['output'];
  failed: Scalars['Int']['output'];
  inProgress: Scalars['Int']['output'];
};

/** Status of a validation pipeline */
export enum ValidationPipelineStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Created = 'CREATED',
  Failed = 'FAILED',
  StepFinalApproval = 'STEP_FINAL_APPROVAL',
  StepPareto = 'STEP_PARETO',
  StepRobustness = 'STEP_ROBUSTNESS',
  StepThreshold = 'STEP_THRESHOLD',
  StepUserSelection = 'STEP_USER_SELECTION',
  StepWfa = 'STEP_WFA'
}

export type ValidationPipelineWithCandidates = {
  __typename?: 'ValidationPipelineWithCandidates';
  backtestTaskId: Scalars['ID']['output'];
  candidates: Array<ValidationCandidate>;
  completedAt?: Maybe<Scalars['Date']['output']>;
  createdAt: Scalars['Date']['output'];
  /** Current step (1-7) */
  currentStep: Scalars['Int']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  finalApproved: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  /** Pareto config: { metrics: string[] } */
  paretoConfig?: Maybe<Scalars['JSON']['output']>;
  paretoOptimal: Scalars['Int']['output'];
  passedRobustness: Scalars['Int']['output'];
  passedThreshold: Scalars['Int']['output'];
  passedWfa: Scalars['Int']['output'];
  /** Number of completed robustness steps */
  robustnessCompletedSteps: Scalars['Int']['output'];
  /** Robustness config: { steps, minScore } */
  robustnessConfig?: Maybe<Scalars['JSON']['output']>;
  startedAt?: Maybe<Scalars['Date']['output']>;
  status: ValidationPipelineStatus;
  totalCandidates: Scalars['Int']['output'];
  userSelected: Scalars['Int']['output'];
  /** Number of completed WFA windows */
  wfaCompletedWindows: Scalars['Int']['output'];
  /** WFA config: { trainRatio, windows, minConsistency } */
  wfaConfig?: Maybe<Scalars['JSON']['output']>;
};

export enum Version {
  V1 = 'V1',
  V2 = 'V2',
  V9 = 'V9',
  V10 = 'V10'
}

export type WalletAccount = {
  __typename?: 'WalletAccount';
  address: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  tags: Array<Tag>;
  userId: Scalars['String']['output'];
};

export type WholeCompressedHistoriesV2 = {
  __typename?: 'WholeCompressedHistoriesV2';
  accPnls: Array<AccPnlV2>;
  botCounts: Array<BotCount>;
  maxInvested: Scalars['Float']['output'];
  totalBots: Array<TotalBotV2>;
  uniqueTraders?: Maybe<Array<Scalars['String']['output']>>;
};

export type WithdrawAllInput = {
  address: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
};

export type WithdrawPositivePnlInput = {
  address: Scalars['String']['input'];
  amountCollateral: Scalars['String']['input'];
  contractId: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
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

export type BacktestTaskInfoFragment = { __typename?: 'BacktestTask', id: string, name: string, symbol: string, status: BacktestTaskStatus, totalConfigs: number, processedConfigs: number, currentConfig?: string | null, startDate: any, endDate: any, interval: string, optimizationParams: any, searchStrategy: string, optimizationMetrics: Array<string>, trials?: number | null, bestConfigIds: Array<string>, optimizerPid?: number | null, createdAt: any, startedAt?: any | null, completedAt?: any | null, errorMessage?: string | null, templateId?: string | null, templateSearchId?: string | null } & { ' $fragmentName'?: 'BacktestTaskInfoFragment' };

export type BacktestResultInfoFragment = { __typename?: 'BacktestResult', id: string, taskId: string, configId: string, runDate: string, strategyConfig: any, totalTrades: number, winningTrades: number, losingTrades: number, winRate: number, totalPnlUsdt: number, totalPnlPercent: number, maxDrawdownUsdt: number, maxDrawdownPercent: number, sharpeRatio?: number | null, profitFactor?: number | null, resultFolder: string, createdAt: any } & { ' $fragmentName'?: 'BacktestResultInfoFragment' };

export type BacktestComponentsQueryVariables = Exact<{ [key: string]: never; }>;


export type BacktestComponentsQuery = { __typename?: 'Query', backtestComponents: { __typename?: 'BacktestComponents', signals: Array<{ __typename?: 'ComponentInfo', name: string, description?: string | null, params: Array<{ __typename?: 'ParamInfo', name: string, type: string, required: boolean, default?: string | null, description?: string | null, min?: number | null, max?: number | null, options?: Array<{ __typename?: 'SelectOptionInfo', label: string, value: string }> | null }> }>, filters: Array<{ __typename?: 'ComponentInfo', name: string, description?: string | null, params: Array<{ __typename?: 'ParamInfo', name: string, type: string, required: boolean, default?: string | null, description?: string | null, min?: number | null, max?: number | null, options?: Array<{ __typename?: 'SelectOptionInfo', label: string, value: string }> | null }> }>, risk: Array<{ __typename?: 'ComponentInfo', name: string, description?: string | null, params: Array<{ __typename?: 'ParamInfo', name: string, type: string, required: boolean, default?: string | null, description?: string | null, min?: number | null, max?: number | null, options?: Array<{ __typename?: 'SelectOptionInfo', label: string, value: string }> | null }> }>, exits: Array<{ __typename?: 'ComponentInfo', name: string, description?: string | null, params: Array<{ __typename?: 'ParamInfo', name: string, type: string, required: boolean, default?: string | null, description?: string | null, min?: number | null, max?: number | null, options?: Array<{ __typename?: 'SelectOptionInfo', label: string, value: string }> | null }> }>, platforms: Array<{ __typename?: 'ComponentInfo', name: string, description?: string | null, params: Array<{ __typename?: 'ParamInfo', name: string, type: string, required: boolean, default?: string | null, description?: string | null, min?: number | null, max?: number | null, options?: Array<{ __typename?: 'SelectOptionInfo', label: string, value: string }> | null }> }> } };

export type BacktestTaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BacktestTaskQuery = { __typename?: 'Query', backtestTask?: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) | null };

export type BacktestTasksQueryVariables = Exact<{
  status?: InputMaybe<BacktestTaskStatus>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BacktestTasksQuery = { __typename?: 'Query', backtestTasks: Array<(
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  )> };

export type BacktestTaskStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type BacktestTaskStatsQuery = { __typename?: 'Query', backtestTaskStats: { __typename?: 'TaskStats', await: number, processing: number, done: number, failed: number } };

export type BacktestResultsQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BacktestResultsQuery = { __typename?: 'Query', backtestResults: Array<(
    { __typename?: 'BacktestResult' }
    & { ' $fragmentRefs'?: { 'BacktestResultInfoFragment': BacktestResultInfoFragment } }
  )> };

export type BacktestResultDatesQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type BacktestResultDatesQuery = { __typename?: 'Query', backtestResultDates: Array<string> };

export type BacktestResultFoldersQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
}>;


export type BacktestResultFoldersQuery = { __typename?: 'Query', backtestResultFolders: Array<{ __typename?: 'ResultFolder', taskId: string, date: string, configId: string, files: Array<string> }> };

export type BacktestResultFileQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  configId: Scalars['String']['input'];
  fileName: Scalars['String']['input'];
}>;


export type BacktestResultFileQuery = { __typename?: 'Query', backtestResultFile?: { __typename?: 'ResultFile', name: string, content: string, contentType: string, size: number, originalSize: number, isCompressed: boolean } | null };

export type TopBacktestResultsQueryVariables = Exact<{
  taskId: Scalars['ID']['input'];
  metric?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TopBacktestResultsQuery = { __typename?: 'Query', topBacktestResults: Array<(
    { __typename?: 'BacktestResult' }
    & { ' $fragmentRefs'?: { 'BacktestResultInfoFragment': BacktestResultInfoFragment } }
  )> };

export type OptunaDashboardStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type OptunaDashboardStatusQuery = { __typename?: 'Query', optunaDashboardStatus: { __typename?: 'OptunaDashboardStatus', running: boolean, url?: string | null } };

export type CreateBacktestTaskMutationVariables = Exact<{
  input: CreateBacktestTaskInput;
}>;


export type CreateBacktestTaskMutation = { __typename?: 'Mutation', createBacktestTask: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) };

export type CancelBacktestTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type CancelBacktestTaskMutation = { __typename?: 'Mutation', cancelBacktestTask: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) };

export type DeleteBacktestTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type DeleteBacktestTaskMutation = { __typename?: 'Mutation', deleteBacktestTask: boolean };

export type DeleteBacktestResultMutationVariables = Exact<{
  resultId: Scalars['ID']['input'];
}>;


export type DeleteBacktestResultMutation = { __typename?: 'Mutation', deleteBacktestResult: boolean };

export type RetryBacktestTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
}>;


export type RetryBacktestTaskMutation = { __typename?: 'Mutation', retryBacktestTask: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) };

export type StartOptunaDashboardMutationVariables = Exact<{
  port?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StartOptunaDashboardMutation = { __typename?: 'Mutation', startOptunaDashboard: { __typename?: 'OptunaDashboardStatus', running: boolean, url?: string | null } };

export type ResumeBacktestTaskMutationVariables = Exact<{
  taskId: Scalars['ID']['input'];
  additionalTrials?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ResumeBacktestTaskMutation = { __typename?: 'Mutation', resumeBacktestTask: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) };

export type StopOptunaDashboardMutationVariables = Exact<{ [key: string]: never; }>;


export type StopOptunaDashboardMutation = { __typename?: 'Mutation', stopOptunaDashboard: boolean };

export type BacktestTaskUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BacktestTaskUpdatedSubscription = { __typename?: 'Subscription', backtestTaskUpdated: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) };

export type BacktestResultCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type BacktestResultCreatedSubscription = { __typename?: 'Subscription', backtestResultCreated: (
    { __typename?: 'BacktestResult' }
    & { ' $fragmentRefs'?: { 'BacktestResultInfoFragment': BacktestResultInfoFragment } }
  ) };

export type ContractInfoFragment = { __typename?: 'Contract', id: number, chainId: number, address: string, backendUrl?: string | null, description: string, isTestnet: boolean, status: ContractStatus, fromBlock: number, lastBlockNumber: number, lastLeaderboardBlockNumber: number, platform: Platform, toBlock?: number | null, version: Version } & { ' $fragmentName'?: 'ContractInfoFragment' };

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

export type FollowerDetailInfoFragment = { __typename?: 'FollowerDetail', address: string, accountIndex: number, publicKey: string, userId: string, ethBalance?: string | null, usdcBalance?: string | null, usdcAllowance?: string | null, contractId: number, pnlSnapshots: Array<(
    { __typename?: 'PnlSnapshotV2' }
    & { ' $fragmentRefs'?: { 'PnlSnapshotV2InfoFragment': PnlSnapshotV2InfoFragment } }
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

export type WithdrawAllUsdcMutationVariables = Exact<{
  input: WithdrawAllInput;
}>;


export type WithdrawAllUsdcMutation = { __typename?: 'Mutation', withdrawAllUSDC: boolean };

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
}>;


export type DecreaseAllowanceToZeroMutation = { __typename?: 'Mutation', decreaseAllowanceToZero: boolean };

export type IncreaseAllowanceToMaxMutationVariables = Exact<{
  contractId: Scalars['Int']['input'];
  followerAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
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

export type WithdrawUsdcToUserMutationVariables = Exact<{
  amount: Scalars['Float']['input'];
  contractId: Scalars['Int']['input'];
  password: Scalars['String']['input'];
}>;


export type WithdrawUsdcToUserMutation = { __typename?: 'Mutation', withdrawUSDCToUser: boolean };

export type CreateSltpMutationVariables = Exact<{
  input: SltpRequestInput;
}>;


export type CreateSltpMutation = { __typename?: 'Mutation', createSLTP: { __typename?: 'SLTPRequest', id: number, address: string, contractId: number, positionKey: string, condition: string, createdAt: any } };

export type DeleteSltpMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSltpMutation = { __typename?: 'Mutation', deleteSLTP: { __typename?: 'SLTPRequest', id: number } };

export type PnlSnapshotV2InfoFragment = { __typename?: 'PnlSnapshotV2', accUSDPnl: number, address: string, dateStr: string, id: number, kind: PnlSnapshotKind, platform: Platform } & { ' $fragmentName'?: 'PnlSnapshotV2InfoFragment' };

export type PerpTradingEventLogInfoFragment = { __typename?: 'PerpTradingEventLog', address: string, block: number, contractId: number, date: any, id: number, jsonLog: string, logIndex: number, platform: Platform, usdPnl: number } & { ' $fragmentName'?: 'PerpTradingEventLogInfoFragment' };

export type PnlSnapshotV2DetailsInfoFragment = { __typename?: 'PnlSnapshotV2Details', accUSDPnl: number, address: string, dateStr: string, id: number, kind: PnlSnapshotKind, platform: Platform, perpTradingEventLogs: Array<(
    { __typename?: 'PerpTradingEventLog' }
    & { ' $fragmentRefs'?: { 'PerpTradingEventLogInfoFragment': PerpTradingEventLogInfoFragment } }
  )> } & { ' $fragmentName'?: 'PnlSnapshotV2DetailsInfoFragment' };

export type GetWholeCompressedHistoriesV2QueryVariables = Exact<{
  platform: Platform;
  startDate: Scalars['String']['input'];
  filterParams: Array<ExportFilter> | ExportFilter;
}>;


export type GetWholeCompressedHistoriesV2Query = { __typename?: 'Query', getWholeCompressedHistoriesV2: { __typename?: 'WholeCompressedHistoriesV2', maxInvested: number, uniqueTraders?: Array<string> | null, accPnls: Array<{ __typename?: 'AccPnlV2', date: any, in: number, inOut: number, out: number, pnl: number, positionCount: number, taskCount: number }>, botCounts: Array<{ __typename?: 'BotCount', botCount: number, date: any }>, totalBots: Array<{ __typename?: 'TotalBotV2', address: string, platform: Platform, dateStr: string }> } };

export type GetPerpEventLogsQueryVariables = Exact<{
  addresses: Array<Scalars['String']['input']> | Scalars['String']['input'];
  platform: Platform;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPerpEventLogsQuery = { __typename?: 'Query', getPerpEventLogs: Array<Array<(
    { __typename?: 'PerpTradingEventLog' }
    & { ' $fragmentRefs'?: { 'PerpTradingEventLogInfoFragment': PerpTradingEventLogInfoFragment } }
  )>> };

export type GetPnlSnapshotV2InitializedFlagQueryVariables = Exact<{
  platform: Platform;
}>;


export type GetPnlSnapshotV2InitializedFlagQuery = { __typename?: 'Query', getPnlSnapshotV2InitializedFlag: Array<{ __typename?: 'PnlSnapshotV2InitializedFlag', id: number, dateStr: string, isInit: boolean, platform: Platform }> };

export type GetPnlSnapshotsV2QueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  platform: Platform;
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['Int']['input']>;
  kind: PnlSnapshotKind;
}>;


export type GetPnlSnapshotsV2Query = { __typename?: 'Query', getPnlSnapshotsV2: { __typename?: 'PnlSnapshotV2DetailsConnection', edges: Array<{ __typename?: 'PnlSnapshotV2DetailsEdge', cursor: number, node: (
        { __typename?: 'PnlSnapshotV2Details' }
        & { ' $fragmentRefs'?: { 'PnlSnapshotV2DetailsInfoFragment': PnlSnapshotV2DetailsInfoFragment } }
      ) }>, pageInfo: { __typename?: 'PnlSnapshotV2DetailsPageInfo', endCursor?: number | null, hasNextPage: boolean } } };

export type GetPnlsnpashotsV2ByPaginationQueryVariables = Exact<{
  dateStr: Scalars['String']['input'];
  kind: PnlSnapshotKind;
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
  platform: Platform;
}>;


export type GetPnlsnpashotsV2ByPaginationQuery = { __typename?: 'Query', getPnlsnpashotsV2ByPagination: { __typename?: 'PnlSnapshotV2DetailsForPagination', data: Array<(
      { __typename?: 'PnlSnapshotV2Details' }
      & { ' $fragmentRefs'?: { 'PnlSnapshotV2DetailsInfoFragment': PnlSnapshotV2DetailsInfoFragment } }
    )>, pageInfo: { __typename?: 'PnlSnapshotV2DetailsForPaginationAPIPageInfo', total: number, page: number, totalPages: number } } };

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

export type GetExpertPnlSnapshotsV2QueryVariables = Exact<{
  platform: Platform;
  after?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetExpertPnlSnapshotsV2Query = { __typename?: 'Query', getExpertPnlSnapshotsV2: { __typename?: 'ExpertPnlSnapshotV2Connection', edges: Array<{ __typename?: 'ExpertPnlSnapshotV2Edge', cursor: number, node: { __typename?: 'ExpertPnlSnapshotV2Node', accUSDPnl: number, address: string, platform: Platform, dateStr: string, id: number, kind: PnlSnapshotKind, maxSize: number, ratio: number, score: number, openedPositions: number, avgPnlRatio: number, avgDuration: number } }>, pageInfo: { __typename?: 'ExpertPnlSnapshotV2PageInfo', endCursor?: number | null, hasNextPage: boolean } } };

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

export type UpdateStrategyMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateStrategyInput;
}>;


export type UpdateStrategyMutation = { __typename?: 'Mutation', updateStrategy: (
    { __typename?: 'Strategy' }
    & { ' $fragmentRefs'?: { 'StrategyInfoFragment': StrategyInfoFragment } }
  ) };

export type StrategyTemplateInfoFragment = { __typename?: 'StrategyTemplate', id: string, name: string, description?: string | null, category: StrategyCategory, factoryConfig: any, isActive: boolean, createdAt: any, updatedAt: any } & { ' $fragmentName'?: 'StrategyTemplateInfoFragment' };

export type StrategyTemplateWithStatsInfoFragment = { __typename?: 'StrategyTemplateWithStats', id: string, name: string, description?: string | null, category: StrategyCategory, factoryConfig: any, isActive: boolean, createdAt: any, updatedAt: any, totalSearches: number, totalTasks: number } & { ' $fragmentName'?: 'StrategyTemplateWithStatsInfoFragment' };

export type StrategyTemplateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StrategyTemplateQuery = { __typename?: 'Query', strategyTemplate?: (
    { __typename?: 'StrategyTemplate' }
    & { ' $fragmentRefs'?: { 'StrategyTemplateInfoFragment': StrategyTemplateInfoFragment } }
  ) | null };

export type StrategyTemplatesQueryVariables = Exact<{
  category?: InputMaybe<StrategyCategory>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type StrategyTemplatesQuery = { __typename?: 'Query', strategyTemplates: Array<(
    { __typename?: 'StrategyTemplate' }
    & { ' $fragmentRefs'?: { 'StrategyTemplateInfoFragment': StrategyTemplateInfoFragment } }
  )> };

export type StrategyTemplateWithStatsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StrategyTemplateWithStatsQuery = { __typename?: 'Query', strategyTemplateWithStats?: (
    { __typename?: 'StrategyTemplateWithStats' }
    & { ' $fragmentRefs'?: { 'StrategyTemplateWithStatsInfoFragment': StrategyTemplateWithStatsInfoFragment } }
  ) | null };

export type CreateStrategyTemplateMutationVariables = Exact<{
  input: CreateStrategyTemplateInput;
}>;


export type CreateStrategyTemplateMutation = { __typename?: 'Mutation', createStrategyTemplate: (
    { __typename?: 'StrategyTemplate' }
    & { ' $fragmentRefs'?: { 'StrategyTemplateInfoFragment': StrategyTemplateInfoFragment } }
  ) };

export type UpdateStrategyTemplateMutationVariables = Exact<{
  input: UpdateStrategyTemplateInput;
}>;


export type UpdateStrategyTemplateMutation = { __typename?: 'Mutation', updateStrategyTemplate: (
    { __typename?: 'StrategyTemplate' }
    & { ' $fragmentRefs'?: { 'StrategyTemplateInfoFragment': StrategyTemplateInfoFragment } }
  ) };

export type DeleteStrategyTemplateMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteStrategyTemplateMutation = { __typename?: 'Mutation', deleteStrategyTemplate: boolean };

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

export type ActionInfoFragment = { __typename?: 'Action', id: number, name: string, positionKey: string, address: string, args: string, blockNumber: number, orderInBlock: number, createdAt: any } & { ' $fragmentName'?: 'ActionInfoFragment' };

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

export type TemplateSearchInfoFragment = { __typename?: 'TemplateSearch', id: string, name: string, templateId: string, symbol: string, startDate: any, endDate: any, interval: string, searchStrategy: string, status: TemplateSearchStatus, createdAt: any, startedAt?: any | null, completedAt?: any | null, errorMessage?: string | null } & { ' $fragmentName'?: 'TemplateSearchInfoFragment' };

export type TemplateSearchWithTemplateInfoFragment = { __typename?: 'TemplateSearchWithTemplate', id: string, name: string, templateId: string, symbol: string, startDate: any, endDate: any, interval: string, searchStrategy: string, status: TemplateSearchStatus, createdAt: any, startedAt?: any | null, completedAt?: any | null, errorMessage?: string | null, template: (
    { __typename?: 'StrategyTemplate' }
    & { ' $fragmentRefs'?: { 'StrategyTemplateInfoFragment': StrategyTemplateInfoFragment } }
  ) } & { ' $fragmentName'?: 'TemplateSearchWithTemplateInfoFragment' };

export type TemplateSearchWithTaskInfoFragment = { __typename?: 'TemplateSearchWithTask', id: string, name: string, templateId: string, symbol: string, startDate: any, endDate: any, interval: string, searchStrategy: string, status: TemplateSearchStatus, createdAt: any, startedAt?: any | null, completedAt?: any | null, errorMessage?: string | null, template: (
    { __typename?: 'StrategyTemplate' }
    & { ' $fragmentRefs'?: { 'StrategyTemplateInfoFragment': StrategyTemplateInfoFragment } }
  ), task?: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) | null } & { ' $fragmentName'?: 'TemplateSearchWithTaskInfoFragment' };

export type TemplateSearchQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TemplateSearchQuery = { __typename?: 'Query', templateSearch?: (
    { __typename?: 'TemplateSearch' }
    & { ' $fragmentRefs'?: { 'TemplateSearchInfoFragment': TemplateSearchInfoFragment } }
  ) | null };

export type TemplateSearchWithTaskQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type TemplateSearchWithTaskQuery = { __typename?: 'Query', templateSearchWithTask?: (
    { __typename?: 'TemplateSearchWithTask' }
    & { ' $fragmentRefs'?: { 'TemplateSearchWithTaskInfoFragment': TemplateSearchWithTaskInfoFragment } }
  ) | null };

export type TemplateSearchesQueryVariables = Exact<{
  filter?: InputMaybe<TemplateSearchFilterInput>;
}>;


export type TemplateSearchesQuery = { __typename?: 'Query', templateSearches: Array<(
    { __typename?: 'TemplateSearchWithTemplate' }
    & { ' $fragmentRefs'?: { 'TemplateSearchWithTemplateInfoFragment': TemplateSearchWithTemplateInfoFragment } }
  )> };

export type TemplateSearchStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type TemplateSearchStatsQuery = { __typename?: 'Query', templateSearchStats: { __typename?: 'TemplateSearchStats', await: number, processing: number, done: number, failed: number, cancelled: number } };

export type TaskByTemplateSearchQueryVariables = Exact<{
  searchId: Scalars['ID']['input'];
}>;


export type TaskByTemplateSearchQuery = { __typename?: 'Query', taskByTemplateSearch?: (
    { __typename?: 'BacktestTask' }
    & { ' $fragmentRefs'?: { 'BacktestTaskInfoFragment': BacktestTaskInfoFragment } }
  ) | null };

export type CreateTemplateSearchMutationVariables = Exact<{
  input: CreateTemplateSearchInput;
}>;


export type CreateTemplateSearchMutation = { __typename?: 'Mutation', createTemplateSearch: (
    { __typename?: 'TemplateSearchWithTemplate' }
    & { ' $fragmentRefs'?: { 'TemplateSearchWithTemplateInfoFragment': TemplateSearchWithTemplateInfoFragment } }
  ) };

export type CancelTemplateSearchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelTemplateSearchMutation = { __typename?: 'Mutation', cancelTemplateSearch: (
    { __typename?: 'TemplateSearch' }
    & { ' $fragmentRefs'?: { 'TemplateSearchInfoFragment': TemplateSearchInfoFragment } }
  ) };

export type DeleteTemplateSearchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTemplateSearchMutation = { __typename?: 'Mutation', deleteTemplateSearch: boolean };

export type TemplateSearchUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TemplateSearchUpdatedSubscription = { __typename?: 'Subscription', templateSearchUpdated: (
    { __typename?: 'TemplateSearch' }
    & { ' $fragmentRefs'?: { 'TemplateSearchInfoFragment': TemplateSearchInfoFragment } }
  ) };

export type TradingSignalLogInfoFragment = { __typename?: 'TradingSignalLog', id: number, address: string, platform: string, eventLogs: Array<(
    { __typename?: 'PerpTradingEventLog' }
    & { ' $fragmentRefs'?: { 'PerpTradingEventLogInfoFragment': PerpTradingEventLogInfoFragment } }
  )> } & { ' $fragmentName'?: 'TradingSignalLogInfoFragment' };

export type GetTradingSignalLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTradingSignalLogsQuery = { __typename?: 'Query', getTradingSignalLogs: Array<(
    { __typename?: 'TradingSignalLog' }
    & { ' $fragmentRefs'?: { 'TradingSignalLogInfoFragment': TradingSignalLogInfoFragment } }
  )> };

export type RegisterTradingSignalLogMutationVariables = Exact<{
  address: Scalars['String']['input'];
  platform: Platform;
}>;


export type RegisterTradingSignalLogMutation = { __typename?: 'Mutation', registerTradingSignalLog: (
    { __typename?: 'TradingSignalLog' }
    & { ' $fragmentRefs'?: { 'TradingSignalLogInfoFragment': TradingSignalLogInfoFragment } }
  ) };

export type UnregisterTradingSignalLogMutationVariables = Exact<{
  signalId: Scalars['Int']['input'];
}>;


export type UnregisterTradingSignalLogMutation = { __typename?: 'Mutation', unregisterTradingSignalLog: (
    { __typename?: 'TradingSignalLog' }
    & { ' $fragmentRefs'?: { 'TradingSignalLogInfoFragment': TradingSignalLogInfoFragment } }
  ) };

export type RemoveEventLogsFromTradingSignalLogMutationVariables = Exact<{
  eventLogIds: Array<Scalars['Int']['input']> | Scalars['Int']['input'];
  signalId: Scalars['Int']['input'];
}>;


export type RemoveEventLogsFromTradingSignalLogMutation = { __typename?: 'Mutation', removeEventLogsFromTradingSignalLog: (
    { __typename?: 'TradingSignalLog' }
    & { ' $fragmentRefs'?: { 'TradingSignalLogInfoFragment': TradingSignalLogInfoFragment } }
  ) };

export type TradingSignalLogUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type TradingSignalLogUpdatedSubscription = { __typename?: 'Subscription', tradingSignalLogUpdated: Array<{ __typename?: 'TradingSignalLogUpdated', id: number, eventLogs: Array<(
      { __typename?: 'PerpTradingEventLog' }
      & { ' $fragmentRefs'?: { 'PerpTradingEventLogInfoFragment': PerpTradingEventLogInfoFragment } }
    )> }> };

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

export type ValidationPipelineInfoFragment = { __typename?: 'ValidationPipeline', id: string, name: string, backtestTaskId: string, status: ValidationPipelineStatus, currentStep: number, paretoConfig?: any | null, wfaConfig?: any | null, robustnessConfig?: any | null, wfaCompletedWindows: number, robustnessCompletedSteps: number, totalCandidates: number, passedThreshold: number, paretoOptimal: number, passedWfa: number, userSelected: number, passedRobustness: number, finalApproved: number, createdAt: any, startedAt?: any | null, completedAt?: any | null, errorMessage?: string | null } & { ' $fragmentName'?: 'ValidationPipelineInfoFragment' };

export type ValidationCandidateInfoFragment = { __typename?: 'ValidationCandidate', id: string, pipelineId: string, resultId: string, configId: string, status: ValidationCandidateStatus, thresholdPassed?: boolean | null, paretoRank?: number | null, dominatedBy?: Array<string> | null, wfaConsistency?: number | null, wfaPassed?: boolean | null, wfaWindowResults?: any | null, userSelectedAt?: any | null, userNotes?: string | null, robustnessScore?: number | null, robustnessPassed?: boolean | null, robustnessStepResults?: any | null, finalApprovedAt?: any | null, finalNotes?: string | null, createdAt: any, updatedAt: any } & { ' $fragmentName'?: 'ValidationCandidateInfoFragment' };

export type BacktestResultSummaryFragment = { __typename?: 'BacktestResult', id: string, taskId: string, configId: string, runDate: string, totalTrades: number, winningTrades: number, losingTrades: number, winRate: number, totalPnlUsdt: number, totalPnlPercent: number, maxDrawdownUsdt: number, maxDrawdownPercent: number, sharpeRatio?: number | null, profitFactor?: number | null, strategyConfig: any } & { ' $fragmentName'?: 'BacktestResultSummaryFragment' };

export type ValidationPipelinesQueryVariables = Exact<{
  filter?: InputMaybe<ValidationPipelineFilterInput>;
}>;


export type ValidationPipelinesQuery = { __typename?: 'Query', validationPipelines: Array<(
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  )> };

export type ValidationPipelineQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ValidationPipelineQuery = { __typename?: 'Query', validationPipeline?: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) | null };

export type ValidationPipelineWithCandidatesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ValidationPipelineWithCandidatesQuery = { __typename?: 'Query', validationPipelineWithCandidates?: { __typename?: 'ValidationPipelineWithCandidates', id: string, name: string, backtestTaskId: string, status: ValidationPipelineStatus, currentStep: number, paretoConfig?: any | null, wfaConfig?: any | null, robustnessConfig?: any | null, wfaCompletedWindows: number, robustnessCompletedSteps: number, totalCandidates: number, passedThreshold: number, paretoOptimal: number, passedWfa: number, userSelected: number, passedRobustness: number, finalApproved: number, createdAt: any, startedAt?: any | null, completedAt?: any | null, errorMessage?: string | null, candidates: Array<(
      { __typename?: 'ValidationCandidate' }
      & { ' $fragmentRefs'?: { 'ValidationCandidateInfoFragment': ValidationCandidateInfoFragment } }
    )> } | null };

export type ValidationCandidatesByStatusQueryVariables = Exact<{
  filter: ValidationCandidateFilterInput;
}>;


export type ValidationCandidatesByStatusQuery = { __typename?: 'Query', validationCandidatesByStatus: { __typename?: 'PaginatedValidationCandidatesResult', totalCount: number, candidates: Array<{ __typename?: 'ValidationCandidateWithResult', id: string, pipelineId: string, resultId: string, configId: string, status: ValidationCandidateStatus, thresholdPassed?: boolean | null, paretoRank?: number | null, dominatedBy?: Array<string> | null, wfaConsistency?: number | null, wfaPassed?: boolean | null, wfaWindowResults?: any | null, userSelectedAt?: any | null, userNotes?: string | null, robustnessScore?: number | null, robustnessPassed?: boolean | null, robustnessStepResults?: any | null, finalApprovedAt?: any | null, finalNotes?: string | null, createdAt: any, updatedAt: any, result: (
        { __typename?: 'BacktestResult' }
        & { ' $fragmentRefs'?: { 'BacktestResultSummaryFragment': BacktestResultSummaryFragment } }
      ) }> } };

export type ValidationCandidateQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ValidationCandidateQuery = { __typename?: 'Query', validationCandidate?: { __typename?: 'ValidationCandidateWithResult', id: string, pipelineId: string, resultId: string, configId: string, status: ValidationCandidateStatus, thresholdPassed?: boolean | null, paretoRank?: number | null, dominatedBy?: Array<string> | null, wfaConsistency?: number | null, wfaPassed?: boolean | null, wfaWindowResults?: any | null, userSelectedAt?: any | null, userNotes?: string | null, robustnessScore?: number | null, robustnessPassed?: boolean | null, robustnessStepResults?: any | null, finalApprovedAt?: any | null, finalNotes?: string | null, createdAt: any, updatedAt: any, result: (
      { __typename?: 'BacktestResult' }
      & { ' $fragmentRefs'?: { 'BacktestResultSummaryFragment': BacktestResultSummaryFragment } }
    ) } | null };

export type ValidationPipelineStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ValidationPipelineStatsQuery = { __typename?: 'Query', validationPipelineStats: { __typename?: 'ValidationPipelineStats', created: number, inProgress: number, awaitingUser: number, completed: number, failed: number, cancelled: number } };

export type ThresholdStepsQueryVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type ThresholdStepsQuery = { __typename?: 'Query', thresholdSteps: Array<{ __typename?: 'ThresholdStep', id: string, pipelineId: string, stepOrder: number, metricName: string, operator: string, value: number, candidatesBefore: number, candidatesAfter: number, createdAt: any }> };

export type ParetoStepsQueryVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type ParetoStepsQuery = { __typename?: 'Query', paretoSteps: Array<{ __typename?: 'ParetoStep', id: string, pipelineId: string, stepOrder: number, metrics: Array<string>, candidatesBefore: number, candidatesAfter: number, createdAt: any }> };

export type CreateValidationPipelineMutationVariables = Exact<{
  input: CreateValidationPipelineInput;
}>;


export type CreateValidationPipelineMutation = { __typename?: 'Mutation', createValidationPipeline: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type ApplyThresholdStepMutationVariables = Exact<{
  input: ApplyThresholdStepInput;
}>;


export type ApplyThresholdStepMutation = { __typename?: 'Mutation', applyThresholdStep: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type PreviewThresholdStepMutationVariables = Exact<{
  input: PreviewThresholdStepInput;
}>;


export type PreviewThresholdStepMutation = { __typename?: 'Mutation', previewThresholdStep: { __typename?: 'ThresholdPreviewResult', currentCount: number, survivingCount: number, eliminatedCount: number } };

export type RemoveThresholdStepMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
  stepId: Scalars['ID']['input'];
}>;


export type RemoveThresholdStepMutation = { __typename?: 'Mutation', removeThresholdStep: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type CompleteThresholdStepMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type CompleteThresholdStepMutation = { __typename?: 'Mutation', completeThresholdStep: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type PreviewParetoStepMutationVariables = Exact<{
  input: PreviewParetoStepInput;
}>;


export type PreviewParetoStepMutation = { __typename?: 'Mutation', previewParetoStep: { __typename?: 'ParetoPreviewResult', currentCount: number, optimalCount: number, dominatedCount: number } };

export type ApplyParetoStepMutationVariables = Exact<{
  input: ApplyParetoStepInput;
}>;


export type ApplyParetoStepMutation = { __typename?: 'Mutation', applyParetoStep: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type RemoveParetoStepMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
  stepId: Scalars['ID']['input'];
}>;


export type RemoveParetoStepMutation = { __typename?: 'Mutation', removeParetoStep: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type CompleteParetoStepMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type CompleteParetoStepMutation = { __typename?: 'Mutation', completeParetoStep: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type StartWfaMutationVariables = Exact<{
  input: StartWfaInput;
}>;


export type StartWfaMutation = { __typename?: 'Mutation', startWfa: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type PauseWfaMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type PauseWfaMutation = { __typename?: 'Mutation', pauseWfa: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type ResumeWfaMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type ResumeWfaMutation = { __typename?: 'Mutation', resumeWfa: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type CompleteWfaMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type CompleteWfaMutation = { __typename?: 'Mutation', completeWfa: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type SubmitUserSelectionMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
  input: UserSelectionInput;
}>;


export type SubmitUserSelectionMutation = { __typename?: 'Mutation', submitUserSelection: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type ConfigureRobustnessMutationVariables = Exact<{
  input: ConfigureRobustnessInput;
}>;


export type ConfigureRobustnessMutation = { __typename?: 'Mutation', configureRobustness: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type RunRobustnessStepMutationVariables = Exact<{
  input: RunRobustnessStepInput;
}>;


export type RunRobustnessStepMutation = { __typename?: 'Mutation', runRobustnessStep: Array<{ __typename?: 'RobustnessStepResult', candidateId: string, configId: string, stepIndex: number, sharpeRatio?: number | null, totalPnl?: number | null, maxDrawdown?: number | null, status: string, errorMessage?: string | null }> };

export type CompleteRobustnessMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
}>;


export type CompleteRobustnessMutation = { __typename?: 'Mutation', completeRobustness: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type SubmitFinalApprovalMutationVariables = Exact<{
  pipelineId: Scalars['ID']['input'];
  input: FinalApprovalInput;
}>;


export type SubmitFinalApprovalMutation = { __typename?: 'Mutation', submitFinalApproval: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type CancelValidationPipelineMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelValidationPipelineMutation = { __typename?: 'Mutation', cancelValidationPipeline: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type DeleteValidationPipelineMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteValidationPipelineMutation = { __typename?: 'Mutation', deleteValidationPipeline: boolean };

export type ValidationPipelineUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ValidationPipelineUpdatedSubscription = { __typename?: 'Subscription', validationPipelineUpdated: (
    { __typename?: 'ValidationPipeline' }
    & { ' $fragmentRefs'?: { 'ValidationPipelineInfoFragment': ValidationPipelineInfoFragment } }
  ) };

export type ValidationCandidateUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ValidationCandidateUpdatedSubscription = { __typename?: 'Subscription', validationCandidateUpdated: (
    { __typename?: 'ValidationCandidate' }
    & { ' $fragmentRefs'?: { 'ValidationCandidateInfoFragment': ValidationCandidateInfoFragment } }
  ) };

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

export const ContractInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<ContractInfoFragment, unknown>;
export const FollowerInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<FollowerInfoFragment, unknown>;
export const StrategyInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<StrategyInfoFragment, unknown>;
export const BotDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<BotDetailsInfoFragment, unknown>;
export const BacktestResultInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestResultInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"runDate"}},{"kind":"Field","name":{"kind":"Name","value":"strategyConfig"}},{"kind":"Field","name":{"kind":"Name","value":"totalTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winningTrades"}},{"kind":"Field","name":{"kind":"Name","value":"losingTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlPercent"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownPercent"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"resultFolder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<BacktestResultInfoFragment, unknown>;
export const PnlSnapshotV2InfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2Info"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]} as unknown as DocumentNode<PnlSnapshotV2InfoFragment, unknown>;
export const ActionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<ActionInfoFragment, unknown>;
export const FollowerActionDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<FollowerActionDetailsInfoFragment, unknown>;
export const TaskForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}}]} as unknown as DocumentNode<TaskForwardDetailsInfoFragment, unknown>;
export const MissionForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionForwardDetailsInfoFragment, unknown>;
export const FollowerTradeInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<FollowerTradeInfoFragment, unknown>;
export const FollowerPendingOrderInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<FollowerPendingOrderInfoFragment, unknown>;
export const FollowerDetailInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcAllowance"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"pnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotV2Info"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerTradeInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerPendingOrderInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2Info"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]} as unknown as DocumentNode<FollowerDetailInfoFragment, unknown>;
export const PerpTradingEventLogInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}}]} as unknown as DocumentNode<PerpTradingEventLogInfoFragment, unknown>;
export const PnlSnapshotV2DetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2Details"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"perpTradingEventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}}]} as unknown as DocumentNode<PnlSnapshotV2DetailsInfoFragment, unknown>;
export const LogInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Log"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"checked"}}]}}]} as unknown as DocumentNode<LogInfoFragment, unknown>;
export const MissionInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}}]}}]} as unknown as DocumentNode<MissionInfoFragment, unknown>;
export const BotForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<BotForwardDetailsInfoFragment, unknown>;
export const PlanForwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<PlanForwardDetailsInfoFragment, unknown>;
export const StrategyMetadataInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyMetadataInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<StrategyMetadataInfoFragment, unknown>;
export const StrategyTemplateWithStatsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateWithStatsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplateWithStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalSearches"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}}]}}]} as unknown as DocumentNode<StrategyTemplateWithStatsInfoFragment, unknown>;
export const TagCategoryInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagCategoryInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TagCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<TagCategoryInfoFragment, unknown>;
export const PlanInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<PlanInfoFragment, unknown>;
export const BotBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<BotBackwardDetailsInfoFragment, unknown>;
export const MissionBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<MissionBackwardDetailsInfoFragment, unknown>;
export const TaskBackwardDetailsInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskBackwardDetailsInfoFragment, unknown>;
export const TemplateSearchInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<TemplateSearchInfoFragment, unknown>;
export const StrategyTemplateInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<StrategyTemplateInfoFragment, unknown>;
export const TemplateSearchWithTemplateInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchWithTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearchWithTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<TemplateSearchWithTemplateInfoFragment, unknown>;
export const BacktestTaskInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<BacktestTaskInfoFragment, unknown>;
export const TemplateSearchWithTaskInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchWithTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearchWithTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<TemplateSearchWithTaskInfoFragment, unknown>;
export const TradingSignalLogInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradingSignalLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradingSignalLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}}]} as unknown as DocumentNode<TradingSignalLogInfoFragment, unknown>;
export const ValidationPipelineInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ValidationPipelineInfoFragment, unknown>;
export const ValidationCandidateInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationCandidateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pipelineId"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"thresholdPassed"}},{"kind":"Field","name":{"kind":"Name","value":"paretoRank"}},{"kind":"Field","name":{"kind":"Name","value":"dominatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConsistency"}},{"kind":"Field","name":{"kind":"Name","value":"wfaPassed"}},{"kind":"Field","name":{"kind":"Name","value":"wfaWindowResults"}},{"kind":"Field","name":{"kind":"Name","value":"userSelectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userNotes"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessScore"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessPassed"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessStepResults"}},{"kind":"Field","name":{"kind":"Name","value":"finalApprovedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ValidationCandidateInfoFragment, unknown>;
export const BacktestResultSummaryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestResultSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"runDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winningTrades"}},{"kind":"Field","name":{"kind":"Name","value":"losingTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlPercent"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownPercent"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"strategyConfig"}}]}}]} as unknown as DocumentNode<BacktestResultSummaryFragment, unknown>;
export const TagInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<TagInfoFragment, unknown>;
export const WalletAccountInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]} as unknown as DocumentNode<WalletAccountInfoFragment, unknown>;
export const GetBotsByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getBotsByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BotStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getBotsByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetBotsByStatusQuery, GetBotsByStatusQueryVariables>;
export const GetActiveBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getActiveBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getActiveBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetActiveBotsQuery, GetActiveBotsQueryVariables>;
export const CreateBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<CreateBotMutation, CreateBotMutationVariables>;
export const BatchCreateBotsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"batchCreateBots"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBotAndStrategyInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchCreateBots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BatchCreateBotsMutation, BatchCreateBotsMutationVariables>;
export const DeleteBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<DeleteBotMutation, DeleteBotMutationVariables>;
export const LiveBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"liveBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<LiveBotMutation, LiveBotMutationVariables>;
export const StopBotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopBot"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopBot"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StopBotMutation, StopBotMutationVariables>;
export const BotCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"botCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BotCreatedSubscription, BotCreatedSubscriptionVariables>;
export const BotUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"botUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}}]} as unknown as DocumentNode<BotUpdatedSubscription, BotUpdatedSubscriptionVariables>;
export const BacktestComponentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestComponents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signals"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"params"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"filters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"params"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"risk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"params"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"exits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"params"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"platforms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"params"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"required"}},{"kind":"Field","name":{"kind":"Name","value":"default"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"min"}},{"kind":"Field","name":{"kind":"Name","value":"max"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<BacktestComponentsQuery, BacktestComponentsQueryVariables>;
export const BacktestTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<BacktestTaskQuery, BacktestTaskQueryVariables>;
export const BacktestTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTaskStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"symbol"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<BacktestTasksQuery, BacktestTasksQueryVariables>;
export const BacktestTaskStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestTaskStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestTaskStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"await"}},{"kind":"Field","name":{"kind":"Name","value":"processing"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}}]}}]}}]} as unknown as DocumentNode<BacktestTaskStatsQuery, BacktestTaskStatsQueryVariables>;
export const BacktestResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"sortOrder"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sortOrder"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestResultInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestResultInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"runDate"}},{"kind":"Field","name":{"kind":"Name","value":"strategyConfig"}},{"kind":"Field","name":{"kind":"Name","value":"totalTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winningTrades"}},{"kind":"Field","name":{"kind":"Name","value":"losingTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlPercent"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownPercent"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"resultFolder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<BacktestResultsQuery, BacktestResultsQueryVariables>;
export const BacktestResultDatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestResultDates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestResultDates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}]}]}}]} as unknown as DocumentNode<BacktestResultDatesQuery, BacktestResultDatesQueryVariables>;
export const BacktestResultFoldersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestResultFolders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestResultFolders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"files"}}]}}]}}]} as unknown as DocumentNode<BacktestResultFoldersQuery, BacktestResultFoldersQueryVariables>;
export const BacktestResultFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BacktestResultFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"configId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestResultFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"configId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"configId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fileName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"originalSize"}},{"kind":"Field","name":{"kind":"Name","value":"isCompressed"}}]}}]}}]} as unknown as DocumentNode<BacktestResultFileQuery, BacktestResultFileQueryVariables>;
export const TopBacktestResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TopBacktestResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"metric"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topBacktestResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"metric"},"value":{"kind":"Variable","name":{"kind":"Name","value":"metric"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestResultInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestResultInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"runDate"}},{"kind":"Field","name":{"kind":"Name","value":"strategyConfig"}},{"kind":"Field","name":{"kind":"Name","value":"totalTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winningTrades"}},{"kind":"Field","name":{"kind":"Name","value":"losingTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlPercent"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownPercent"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"resultFolder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<TopBacktestResultsQuery, TopBacktestResultsQueryVariables>;
export const OptunaDashboardStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OptunaDashboardStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"optunaDashboardStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<OptunaDashboardStatusQuery, OptunaDashboardStatusQueryVariables>;
export const CreateBacktestTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBacktestTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBacktestTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBacktestTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<CreateBacktestTaskMutation, CreateBacktestTaskMutationVariables>;
export const CancelBacktestTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelBacktestTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelBacktestTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<CancelBacktestTaskMutation, CancelBacktestTaskMutationVariables>;
export const DeleteBacktestTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBacktestTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBacktestTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}]}]}}]} as unknown as DocumentNode<DeleteBacktestTaskMutation, DeleteBacktestTaskMutationVariables>;
export const DeleteBacktestResultDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBacktestResult"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBacktestResult"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resultId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resultId"}}}]}]}}]} as unknown as DocumentNode<DeleteBacktestResultMutation, DeleteBacktestResultMutationVariables>;
export const RetryBacktestTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetryBacktestTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retryBacktestTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<RetryBacktestTaskMutation, RetryBacktestTaskMutationVariables>;
export const StartOptunaDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartOptunaDashboard"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"port"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startOptunaDashboard"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"port"},"value":{"kind":"Variable","name":{"kind":"Name","value":"port"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"running"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<StartOptunaDashboardMutation, StartOptunaDashboardMutationVariables>;
export const ResumeBacktestTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResumeBacktestTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"additionalTrials"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeBacktestTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"taskId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"taskId"}}},{"kind":"Argument","name":{"kind":"Name","value":"additionalTrials"},"value":{"kind":"Variable","name":{"kind":"Name","value":"additionalTrials"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<ResumeBacktestTaskMutation, ResumeBacktestTaskMutationVariables>;
export const StopOptunaDashboardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StopOptunaDashboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopOptunaDashboard"}}]}}]} as unknown as DocumentNode<StopOptunaDashboardMutation, StopOptunaDashboardMutationVariables>;
export const BacktestTaskUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"BacktestTaskUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestTaskUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<BacktestTaskUpdatedSubscription, BacktestTaskUpdatedSubscriptionVariables>;
export const BacktestResultCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"BacktestResultCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"backtestResultCreated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestResultInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestResultInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"runDate"}},{"kind":"Field","name":{"kind":"Name","value":"strategyConfig"}},{"kind":"Field","name":{"kind":"Name","value":"totalTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winningTrades"}},{"kind":"Field","name":{"kind":"Name","value":"losingTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlPercent"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownPercent"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"resultFolder"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<BacktestResultCreatedSubscription, BacktestResultCreatedSubscriptionVariables>;
export const GetAllContractsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllContracts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<GetAllContractsQuery, GetAllContractsQueryVariables>;
export const GetAdaptionStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAdaptionStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAdaptionStatus"}}]}}]} as unknown as DocumentNode<GetAdaptionStatusQuery, GetAdaptionStatusQueryVariables>;
export const DisableContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"disableContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"disableContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<DisableContractMutation, DisableContractMutationVariables>;
export const LiveContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"liveContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fromBlock"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fromBlock"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<LiveContractMutation, LiveContractMutationVariables>;
export const StartAdaptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startAdaption"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shouldRestart"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startAdaption"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"shouldRestart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shouldRestart"}}}]}]}}]} as unknown as DocumentNode<StartAdaptionMutation, StartAdaptionMutationVariables>;
export const GetAllFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}}]} as unknown as DocumentNode<GetAllFollowersQuery, GetAllFollowersQueryVariables>;
export const GetAllFollowerDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllFollowerDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllFollowerDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerDetailInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2Info"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerTradeInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerTrade"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"params"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerPendingOrderInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerPendingOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerDetailInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerDetail"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"ethBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcBalance"}},{"kind":"Field","name":{"kind":"Name","value":"usdcAllowance"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"pnlSnapshots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotV2Info"}}]}},{"kind":"Field","name":{"kind":"Name","value":"trades"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerTradeInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pendingOrders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerPendingOrderInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllFollowerDetailsQuery, GetAllFollowerDetailsQueryVariables>;
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
export const WithdrawAllUsdcDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAllUSDC"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAllUSDC"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAllUsdcMutation, WithdrawAllUsdcMutationVariables>;
export const WithdrawAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAssetMutation, WithdrawAssetMutationVariables>;
export const DepositAssetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"depositAsset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depositAsset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DepositAssetMutation, DepositAssetMutationVariables>;
export const DecreaseAllowanceToZeroDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"decreaseAllowanceToZero"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decreaseAllowanceToZero"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<DecreaseAllowanceToZeroMutation, DecreaseAllowanceToZeroMutationVariables>;
export const IncreaseAllowanceToMaxDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"increaseAllowanceToMax"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"increaseAllowanceToMax"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<IncreaseAllowanceToMaxMutation, IncreaseAllowanceToMaxMutationVariables>;
export const WithdrawAllEthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawAllETH"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WithdrawAllInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawAllETH"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<WithdrawAllEthMutation, WithdrawAllEthMutationVariables>;
export const WithdrawEthToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawETHToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawETHToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<WithdrawEthToUserMutation, WithdrawEthToUserMutationVariables>;
export const WithdrawUsdcToUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"withdrawUSDCToUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawUSDCToUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}},{"kind":"Argument","name":{"kind":"Name","value":"contractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contractId"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<WithdrawUsdcToUserMutation, WithdrawUsdcToUserMutationVariables>;
export const CreateSltpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSLTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SLTPRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSLTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"condition"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateSltpMutation, CreateSltpMutationVariables>;
export const DeleteSltpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSLTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSLTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSltpMutation, DeleteSltpMutationVariables>;
export const GetWholeCompressedHistoriesV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWholeCompressedHistoriesV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExportFilter"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWholeCompressedHistoriesV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterParams"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterParams"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accPnls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"in"}},{"kind":"Field","name":{"kind":"Name","value":"inOut"}},{"kind":"Field","name":{"kind":"Name","value":"out"}},{"kind":"Field","name":{"kind":"Name","value":"pnl"}},{"kind":"Field","name":{"kind":"Name","value":"positionCount"}},{"kind":"Field","name":{"kind":"Name","value":"taskCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"botCounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"botCount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maxInvested"}},{"kind":"Field","name":{"kind":"Name","value":"uniqueTraders"}},{"kind":"Field","name":{"kind":"Name","value":"totalBots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}}]}}]}}]}}]} as unknown as DocumentNode<GetWholeCompressedHistoriesV2Query, GetWholeCompressedHistoriesV2QueryVariables>;
export const GetPerpEventLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPerpEventLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPerpEventLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"addresses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addresses"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}}]} as unknown as DocumentNode<GetPerpEventLogsQuery, GetPerpEventLogsQueryVariables>;
export const GetPnlSnapshotV2InitializedFlagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshotV2InitializedFlag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshotV2InitializedFlag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"isInit"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]}}]} as unknown as DocumentNode<GetPnlSnapshotV2InitializedFlagQuery, GetPnlSnapshotV2InitializedFlagQueryVariables>;
export const GetPnlSnapshotsV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlSnapshotsV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotKind"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlSnapshotsV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"kind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kind"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2Details"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"perpTradingEventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]} as unknown as DocumentNode<GetPnlSnapshotsV2Query, GetPnlSnapshotsV2QueryVariables>;
export const GetPnlsnpashotsV2ByPaginationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPnlsnpashotsV2ByPagination"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kind"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotKind"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPnlsnpashotsV2ByPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"dateStr"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateStr"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"kind"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kind"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PnlSnapshotV2DetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PnlSnapshotV2Details"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"perpTradingEventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"platform"}}]}}]} as unknown as DocumentNode<GetPnlsnpashotsV2ByPaginationQuery, GetPnlsnpashotsV2ByPaginationQueryVariables>;
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
export const MissionCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionCreatedSubscription, MissionCreatedSubscriptionVariables>;
export const MissionUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"missionUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"missionUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<MissionUpdatedSubscription, MissionUpdatedSubscriptionVariables>;
export const GetPlansByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlansByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlanStatus"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlansByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanForwardDetailsInfo"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetPlansByStatusQuery, GetPlansByStatusQueryVariables>;
export const GetPlanByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPlanById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPlanById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"tasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"missions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionForwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanForwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlanForwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"bots"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotForwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetPlanByIdQuery, GetPlanByIdQueryVariables>;
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
export const GetExpertPnlSnapshotsV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getExpertPnlSnapshotsV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getExpertPnlSnapshotsV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accUSDPnl"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"dateStr"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"maxSize"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"openedPositions"}},{"kind":"Field","name":{"kind":"Name","value":"avgPnlRatio"}},{"kind":"Field","name":{"kind":"Name","value":"avgDuration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetExpertPnlSnapshotsV2Query, GetExpertPnlSnapshotsV2QueryVariables>;
export const GetWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWhitelist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWhitelist"}}]}}]} as unknown as DocumentNode<GetWhitelistQuery, GetWhitelistQueryVariables>;
export const AddToWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addToWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}]}]}}]} as unknown as DocumentNode<AddToWhitelistMutation, AddToWhitelistMutationVariables>;
export const RemoveFromWhitelistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeFromWhitelist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromWhitelist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}]}]}}]} as unknown as DocumentNode<RemoveFromWhitelistMutation, RemoveFromWhitelistMutationVariables>;
export const GetAllStrategyMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllStrategyMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStrategyMetadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyMetadataInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyMetadataInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyMetadata"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GetAllStrategyMetadataQuery, GetAllStrategyMetadataQueryVariables>;
export const GetAllStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllStrategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<GetAllStrategyQuery, GetAllStrategyQueryVariables>;
export const UpdateStrategyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateStrategy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStrategyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStrategy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}}]} as unknown as DocumentNode<UpdateStrategyMutation, UpdateStrategyMutationVariables>;
export const StrategyTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StrategyTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"strategyTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<StrategyTemplateQuery, StrategyTemplateQueryVariables>;
export const StrategyTemplatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StrategyTemplates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyCategory"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"strategyTemplates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"isActive"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isActive"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<StrategyTemplatesQuery, StrategyTemplatesQueryVariables>;
export const StrategyTemplateWithStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StrategyTemplateWithStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"strategyTemplateWithStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateWithStatsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateWithStatsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplateWithStats"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"totalSearches"}},{"kind":"Field","name":{"kind":"Name","value":"totalTasks"}}]}}]} as unknown as DocumentNode<StrategyTemplateWithStatsQuery, StrategyTemplateWithStatsQueryVariables>;
export const CreateStrategyTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStrategyTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStrategyTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStrategyTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<CreateStrategyTemplateMutation, CreateStrategyTemplateMutationVariables>;
export const UpdateStrategyTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStrategyTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStrategyTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStrategyTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<UpdateStrategyTemplateMutation, UpdateStrategyTemplateMutationVariables>;
export const DeleteStrategyTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteStrategyTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteStrategyTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteStrategyTemplateMutation, DeleteStrategyTemplateMutationVariables>;
export const PauseSystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"pauseSystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseSystem"}}]}}]} as unknown as DocumentNode<PauseSystemMutation, PauseSystemMutationVariables>;
export const ResumeSystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"resumeSystem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeSystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<ResumeSystemMutation, ResumeSystemMutationVariables>;
export const KillSubServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"killSubService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"service"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"killSubService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"service"},"value":{"kind":"Variable","name":{"kind":"Name","value":"service"}}}]}]}}]} as unknown as DocumentNode<KillSubServiceMutation, KillSubServiceMutationVariables>;
export const StartSubServiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startSubService"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"service"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startSubService"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"service"},"value":{"kind":"Variable","name":{"kind":"Name","value":"service"}}}]}]}}]} as unknown as DocumentNode<StartSubServiceMutation, StartSubServiceMutationVariables>;
export const GetMicroserviceStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getMicroserviceStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMicroserviceStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pids"}},{"kind":"Field","name":{"kind":"Name","value":"service"}}]}}]}}]} as unknown as DocumentNode<GetMicroserviceStatusQuery, GetMicroserviceStatusQueryVariables>;
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
export const GetAlertTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAlertTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAlertTasks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<GetAlertTasksQuery, GetAlertTasksQueryVariables>;
export const PerformTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"performTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<PerformTaskMutation, PerformTaskMutationVariables>;
export const StopTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"stopTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stopTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<StopTaskMutation, StopTaskMutationVariables>;
export const TaskCreatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskCreated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskCreated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskCreatedSubscription, TaskCreatedSubscriptionVariables>;
export const TaskUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"taskUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ActionInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Action"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"positionKey"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"args"}},{"kind":"Field","name":{"kind":"Name","value":"blockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"orderInBlock"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerActionDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FollowerActionDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContractInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Contract"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"backendUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"isTestnet"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"fromBlock"}},{"kind":"Field","name":{"kind":"Name","value":"lastBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"lastLeaderboardBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"toBlock"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FollowerInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Follower"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"accountIndex"}},{"kind":"Field","name":{"kind":"Name","value":"publicKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Strategy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lifeTime"}},{"kind":"Field","name":{"kind":"Name","value":"maxCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"minCollateral"}},{"kind":"Field","name":{"kind":"Name","value":"maxLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"minLeverage"}},{"kind":"Field","name":{"kind":"Name","value":"collateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"params"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"strategyKey"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlanInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Plan"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BotBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BotBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"leaderAddress"}},{"kind":"Field","name":{"kind":"Name","value":"followerAddress"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"planId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderContractId"}},{"kind":"Field","name":{"kind":"Name","value":"leaderCollateralBaseline"}},{"kind":"Field","name":{"kind":"Name","value":"leaderStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"leaderEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}},{"kind":"Field","name":{"kind":"Name","value":"followerStartedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"followerEndedBlock"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"followerContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"leaderContract"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContractInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"follower"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlanInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MissionBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"botId"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"targetPositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionKey"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionBlockNumber"}},{"kind":"Field","name":{"kind":"Name","value":"achievePositionLogIndex"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"bot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BotBackwardDetailsInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TaskBackwardDetailsInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TaskBackwardDetails"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"missionId"}},{"kind":"Field","name":{"kind":"Name","value":"actionId"}},{"kind":"Field","name":{"kind":"Name","value":"logs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"action"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ActionInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"followerActions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FollowerActionDetailsInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MissionBackwardDetailsInfo"}}]}}]}}]} as unknown as DocumentNode<TaskUpdatedSubscription, TaskUpdatedSubscriptionVariables>;
export const TemplateSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TemplateSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TemplateSearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<TemplateSearchQuery, TemplateSearchQueryVariables>;
export const TemplateSearchWithTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TemplateSearchWithTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateSearchWithTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TemplateSearchWithTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchWithTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearchWithTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}}]} as unknown as DocumentNode<TemplateSearchWithTaskQuery, TemplateSearchWithTaskQueryVariables>;
export const TemplateSearchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TemplateSearches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearchFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateSearches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TemplateSearchWithTemplateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchWithTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearchWithTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}}]}}]} as unknown as DocumentNode<TemplateSearchesQuery, TemplateSearchesQueryVariables>;
export const TemplateSearchStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TemplateSearchStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateSearchStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"await"}},{"kind":"Field","name":{"kind":"Name","value":"processing"}},{"kind":"Field","name":{"kind":"Name","value":"done"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled"}}]}}]}}]} as unknown as DocumentNode<TemplateSearchStatsQuery, TemplateSearchStatsQueryVariables>;
export const TaskByTemplateSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TaskByTemplateSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskByTemplateSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestTaskInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestTaskInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestTask"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"processedConfigs"}},{"kind":"Field","name":{"kind":"Name","value":"currentConfig"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationParams"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"optimizationMetrics"}},{"kind":"Field","name":{"kind":"Name","value":"trials"}},{"kind":"Field","name":{"kind":"Name","value":"bestConfigIds"}},{"kind":"Field","name":{"kind":"Name","value":"optimizerPid"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"templateSearchId"}}]}}]} as unknown as DocumentNode<TaskByTemplateSearchQuery, TaskByTemplateSearchQueryVariables>;
export const CreateTemplateSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTemplateSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTemplateSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTemplateSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TemplateSearchWithTemplateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StrategyTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StrategyTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"factoryConfig"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchWithTemplateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearchWithTemplate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"template"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StrategyTemplateInfo"}}]}}]}}]} as unknown as DocumentNode<CreateTemplateSearchMutation, CreateTemplateSearchMutationVariables>;
export const CancelTemplateSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelTemplateSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelTemplateSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TemplateSearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<CancelTemplateSearchMutation, CancelTemplateSearchMutationVariables>;
export const DeleteTemplateSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTemplateSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTemplateSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTemplateSearchMutation, DeleteTemplateSearchMutationVariables>;
export const TemplateSearchUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"TemplateSearchUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"templateSearchUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TemplateSearchInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TemplateSearchInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TemplateSearch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"templateId"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"searchStrategy"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<TemplateSearchUpdatedSubscription, TemplateSearchUpdatedSubscriptionVariables>;
export const GetTradingSignalLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getTradingSignalLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTradingSignalLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradingSignalLogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradingSignalLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradingSignalLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}}]}}]} as unknown as DocumentNode<GetTradingSignalLogsQuery, GetTradingSignalLogsQueryVariables>;
export const RegisterTradingSignalLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"registerTradingSignalLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"platform"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Platform"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerTradingSignalLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"platform"},"value":{"kind":"Variable","name":{"kind":"Name","value":"platform"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradingSignalLogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradingSignalLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradingSignalLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}}]}}]} as unknown as DocumentNode<RegisterTradingSignalLogMutation, RegisterTradingSignalLogMutationVariables>;
export const UnregisterTradingSignalLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unregisterTradingSignalLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signalId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unregisterTradingSignalLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signalId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signalId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradingSignalLogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradingSignalLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradingSignalLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}}]}}]} as unknown as DocumentNode<UnregisterTradingSignalLogMutation, UnregisterTradingSignalLogMutationVariables>;
export const RemoveEventLogsFromTradingSignalLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeEventLogsFromTradingSignalLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventLogIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signalId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEventLogsFromTradingSignalLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventLogIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventLogIds"}}},{"kind":"Argument","name":{"kind":"Name","value":"signalId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signalId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TradingSignalLogInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TradingSignalLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TradingSignalLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}}]}}]} as unknown as DocumentNode<RemoveEventLogsFromTradingSignalLogMutation, RemoveEventLogsFromTradingSignalLogMutationVariables>;
export const TradingSignalLogUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"tradingSignalLogUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tradingSignalLogUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerpTradingEventLogInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerpTradingEventLogInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PerpTradingEventLog"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"block"}},{"kind":"Field","name":{"kind":"Name","value":"contractId"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jsonLog"}},{"kind":"Field","name":{"kind":"Name","value":"logIndex"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"usdPnl"}}]}}]} as unknown as DocumentNode<TradingSignalLogUpdatedSubscription, TradingSignalLogUpdatedSubscriptionVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"singature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"singature"}}},{"kind":"Argument","name":{"kind":"Name","value":"timestamp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timestamp"}}},{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const ChangeUserPermissionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeUserPermission"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"permission"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserPermission"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"permission"},"value":{"kind":"Variable","name":{"kind":"Name","value":"permission"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<ChangeUserPermissionMutation, ChangeUserPermissionMutationVariables>;
export const AllowAutoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"allowAuto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"allowAuto"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"budget"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"followerContractId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allowAuto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"allowAuto"},"value":{"kind":"Variable","name":{"kind":"Name","value":"allowAuto"}}},{"kind":"Argument","name":{"kind":"Name","value":"budget"},"value":{"kind":"Variable","name":{"kind":"Name","value":"budget"}}},{"kind":"Argument","name":{"kind":"Name","value":"ratio"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ratio"}}},{"kind":"Argument","name":{"kind":"Name","value":"followerContractId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"followerContractId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"permission"}},{"kind":"Field","name":{"kind":"Name","value":"allowAuto"}},{"kind":"Field","name":{"kind":"Name","value":"budget"}},{"kind":"Field","name":{"kind":"Name","value":"ratio"}},{"kind":"Field","name":{"kind":"Name","value":"followerContractId"}}]}}]}}]} as unknown as DocumentNode<AllowAutoMutation, AllowAutoMutationVariables>;
export const ValidationPipelinesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidationPipelines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipelineFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationPipelines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ValidationPipelinesQuery, ValidationPipelinesQueryVariables>;
export const ValidationPipelineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidationPipeline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationPipeline"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ValidationPipelineQuery, ValidationPipelineQueryVariables>;
export const ValidationPipelineWithCandidatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidationPipelineWithCandidates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationPipelineWithCandidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationCandidateInfo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationCandidateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pipelineId"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"thresholdPassed"}},{"kind":"Field","name":{"kind":"Name","value":"paretoRank"}},{"kind":"Field","name":{"kind":"Name","value":"dominatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConsistency"}},{"kind":"Field","name":{"kind":"Name","value":"wfaPassed"}},{"kind":"Field","name":{"kind":"Name","value":"wfaWindowResults"}},{"kind":"Field","name":{"kind":"Name","value":"userSelectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userNotes"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessScore"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessPassed"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessStepResults"}},{"kind":"Field","name":{"kind":"Name","value":"finalApprovedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ValidationPipelineWithCandidatesQuery, ValidationPipelineWithCandidatesQueryVariables>;
export const ValidationCandidatesByStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidationCandidatesByStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationCandidateFilterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationCandidatesByStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"candidates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pipelineId"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"thresholdPassed"}},{"kind":"Field","name":{"kind":"Name","value":"paretoRank"}},{"kind":"Field","name":{"kind":"Name","value":"dominatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConsistency"}},{"kind":"Field","name":{"kind":"Name","value":"wfaPassed"}},{"kind":"Field","name":{"kind":"Name","value":"wfaWindowResults"}},{"kind":"Field","name":{"kind":"Name","value":"userSelectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userNotes"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessScore"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessPassed"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessStepResults"}},{"kind":"Field","name":{"kind":"Name","value":"finalApprovedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestResultSummary"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestResultSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"runDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winningTrades"}},{"kind":"Field","name":{"kind":"Name","value":"losingTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlPercent"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownPercent"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"strategyConfig"}}]}}]} as unknown as DocumentNode<ValidationCandidatesByStatusQuery, ValidationCandidatesByStatusQueryVariables>;
export const ValidationCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidationCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pipelineId"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"thresholdPassed"}},{"kind":"Field","name":{"kind":"Name","value":"paretoRank"}},{"kind":"Field","name":{"kind":"Name","value":"dominatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConsistency"}},{"kind":"Field","name":{"kind":"Name","value":"wfaPassed"}},{"kind":"Field","name":{"kind":"Name","value":"wfaWindowResults"}},{"kind":"Field","name":{"kind":"Name","value":"userSelectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userNotes"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessScore"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessPassed"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessStepResults"}},{"kind":"Field","name":{"kind":"Name","value":"finalApprovedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BacktestResultSummary"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BacktestResultSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BacktestResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"runDate"}},{"kind":"Field","name":{"kind":"Name","value":"totalTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winningTrades"}},{"kind":"Field","name":{"kind":"Name","value":"losingTrades"}},{"kind":"Field","name":{"kind":"Name","value":"winRate"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnlPercent"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownUsdt"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdownPercent"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"profitFactor"}},{"kind":"Field","name":{"kind":"Name","value":"strategyConfig"}}]}}]} as unknown as DocumentNode<ValidationCandidateQuery, ValidationCandidateQueryVariables>;
export const ValidationPipelineStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidationPipelineStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationPipelineStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"inProgress"}},{"kind":"Field","name":{"kind":"Name","value":"awaitingUser"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"failed"}},{"kind":"Field","name":{"kind":"Name","value":"cancelled"}}]}}]}}]} as unknown as DocumentNode<ValidationPipelineStatsQuery, ValidationPipelineStatsQueryVariables>;
export const ThresholdStepsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ThresholdSteps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"thresholdSteps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pipelineId"}},{"kind":"Field","name":{"kind":"Name","value":"stepOrder"}},{"kind":"Field","name":{"kind":"Name","value":"metricName"}},{"kind":"Field","name":{"kind":"Name","value":"operator"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesBefore"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesAfter"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ThresholdStepsQuery, ThresholdStepsQueryVariables>;
export const ParetoStepsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ParetoSteps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paretoSteps"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pipelineId"}},{"kind":"Field","name":{"kind":"Name","value":"stepOrder"}},{"kind":"Field","name":{"kind":"Name","value":"metrics"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesBefore"}},{"kind":"Field","name":{"kind":"Name","value":"candidatesAfter"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ParetoStepsQuery, ParetoStepsQueryVariables>;
export const CreateValidationPipelineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateValidationPipeline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateValidationPipelineInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createValidationPipeline"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<CreateValidationPipelineMutation, CreateValidationPipelineMutationVariables>;
export const ApplyThresholdStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyThresholdStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApplyThresholdStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyThresholdStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ApplyThresholdStepMutation, ApplyThresholdStepMutationVariables>;
export const PreviewThresholdStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PreviewThresholdStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreviewThresholdStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"previewThresholdStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentCount"}},{"kind":"Field","name":{"kind":"Name","value":"survivingCount"}},{"kind":"Field","name":{"kind":"Name","value":"eliminatedCount"}}]}}]}}]} as unknown as DocumentNode<PreviewThresholdStepMutation, PreviewThresholdStepMutationVariables>;
export const RemoveThresholdStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveThresholdStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stepId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeThresholdStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}},{"kind":"Argument","name":{"kind":"Name","value":"stepId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stepId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<RemoveThresholdStepMutation, RemoveThresholdStepMutationVariables>;
export const CompleteThresholdStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteThresholdStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeThresholdStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<CompleteThresholdStepMutation, CompleteThresholdStepMutationVariables>;
export const PreviewParetoStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PreviewParetoStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PreviewParetoStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"previewParetoStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentCount"}},{"kind":"Field","name":{"kind":"Name","value":"optimalCount"}},{"kind":"Field","name":{"kind":"Name","value":"dominatedCount"}}]}}]}}]} as unknown as DocumentNode<PreviewParetoStepMutation, PreviewParetoStepMutationVariables>;
export const ApplyParetoStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyParetoStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApplyParetoStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyParetoStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ApplyParetoStepMutation, ApplyParetoStepMutationVariables>;
export const RemoveParetoStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveParetoStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stepId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeParetoStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}},{"kind":"Argument","name":{"kind":"Name","value":"stepId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stepId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<RemoveParetoStepMutation, RemoveParetoStepMutationVariables>;
export const CompleteParetoStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteParetoStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeParetoStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<CompleteParetoStepMutation, CompleteParetoStepMutationVariables>;
export const StartWfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartWfa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartWfaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startWfa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<StartWfaMutation, StartWfaMutationVariables>;
export const PauseWfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PauseWfa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseWfa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<PauseWfaMutation, PauseWfaMutationVariables>;
export const ResumeWfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResumeWfa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeWfa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ResumeWfaMutation, ResumeWfaMutationVariables>;
export const CompleteWfaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteWfa"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeWfa"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<CompleteWfaMutation, CompleteWfaMutationVariables>;
export const SubmitUserSelectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitUserSelection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSelectionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitUserSelection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<SubmitUserSelectionMutation, SubmitUserSelectionMutationVariables>;
export const ConfigureRobustnessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfigureRobustness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfigureRobustnessInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configureRobustness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ConfigureRobustnessMutation, ConfigureRobustnessMutationVariables>;
export const RunRobustnessStepDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RunRobustnessStep"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RunRobustnessStepInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"runRobustnessStep"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidateId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"stepIndex"}},{"kind":"Field","name":{"kind":"Name","value":"sharpeRatio"}},{"kind":"Field","name":{"kind":"Name","value":"totalPnl"}},{"kind":"Field","name":{"kind":"Name","value":"maxDrawdown"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]}}]} as unknown as DocumentNode<RunRobustnessStepMutation, RunRobustnessStepMutationVariables>;
export const CompleteRobustnessDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteRobustness"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeRobustness"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<CompleteRobustnessMutation, CompleteRobustnessMutationVariables>;
export const SubmitFinalApprovalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitFinalApproval"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FinalApprovalInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitFinalApproval"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pipelineId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pipelineId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<SubmitFinalApprovalMutation, SubmitFinalApprovalMutationVariables>;
export const CancelValidationPipelineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelValidationPipeline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelValidationPipeline"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<CancelValidationPipelineMutation, CancelValidationPipelineMutationVariables>;
export const DeleteValidationPipelineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteValidationPipeline"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteValidationPipeline"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteValidationPipelineMutation, DeleteValidationPipelineMutationVariables>;
export const ValidationPipelineUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ValidationPipelineUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationPipelineUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationPipelineInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationPipelineInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationPipeline"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"backtestTaskId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStep"}},{"kind":"Field","name":{"kind":"Name","value":"paretoConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConfig"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessConfig"}},{"kind":"Field","name":{"kind":"Name","value":"wfaCompletedWindows"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessCompletedSteps"}},{"kind":"Field","name":{"kind":"Name","value":"totalCandidates"}},{"kind":"Field","name":{"kind":"Name","value":"passedThreshold"}},{"kind":"Field","name":{"kind":"Name","value":"paretoOptimal"}},{"kind":"Field","name":{"kind":"Name","value":"passedWfa"}},{"kind":"Field","name":{"kind":"Name","value":"userSelected"}},{"kind":"Field","name":{"kind":"Name","value":"passedRobustness"}},{"kind":"Field","name":{"kind":"Name","value":"finalApproved"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}}]}}]} as unknown as DocumentNode<ValidationPipelineUpdatedSubscription, ValidationPipelineUpdatedSubscriptionVariables>;
export const ValidationCandidateUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"ValidationCandidateUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validationCandidateUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationCandidateInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationCandidateInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationCandidate"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"pipelineId"}},{"kind":"Field","name":{"kind":"Name","value":"resultId"}},{"kind":"Field","name":{"kind":"Name","value":"configId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"thresholdPassed"}},{"kind":"Field","name":{"kind":"Name","value":"paretoRank"}},{"kind":"Field","name":{"kind":"Name","value":"dominatedBy"}},{"kind":"Field","name":{"kind":"Name","value":"wfaConsistency"}},{"kind":"Field","name":{"kind":"Name","value":"wfaPassed"}},{"kind":"Field","name":{"kind":"Name","value":"wfaWindowResults"}},{"kind":"Field","name":{"kind":"Name","value":"userSelectedAt"}},{"kind":"Field","name":{"kind":"Name","value":"userNotes"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessScore"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessPassed"}},{"kind":"Field","name":{"kind":"Name","value":"robustnessStepResults"}},{"kind":"Field","name":{"kind":"Name","value":"finalApprovedAt"}},{"kind":"Field","name":{"kind":"Name","value":"finalNotes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ValidationCandidateUpdatedSubscription, ValidationCandidateUpdatedSubscriptionVariables>;
export const GetAllWalletAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllWalletAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllWalletAccounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<GetAllWalletAccountsQuery, GetAllWalletAccountsQueryVariables>;
export const AddWalletAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addWalletAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addWalletAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<AddWalletAccountMutation, AddWalletAccountMutationVariables>;
export const AddTagToWalletAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTagToWalletAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeUserTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTagToWalletAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<AddTagToWalletAccountMutation, AddTagToWalletAccountMutationVariables>;
export const RemoveTagFromWalletAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeTagFromWalletAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeUserTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTagFromWalletAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WalletAccountInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"categoryId"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WalletAccountInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WalletAccount"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagInfo"}}]}}]}}]} as unknown as DocumentNode<RemoveTagFromWalletAccountMutation, RemoveTagFromWalletAccountMutationVariables>;