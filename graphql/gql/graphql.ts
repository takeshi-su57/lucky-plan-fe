/* eslint-disable */
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
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type AddUserInput = {
  address: Scalars['String']['input'];
};

export type Bot = {
  __typename?: 'Bot';
  contractId: Scalars['Int']['output'];
  endedBlock?: Maybe<Scalars['Int']['output']>;
  followerAddress: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  pausedBlock?: Maybe<Scalars['Int']['output']>;
  startedBlock?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  strategyId: Scalars['Int']['output'];
};

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type ChangeUserRoleInput = {
  address: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Contract = {
  __typename?: 'Contract';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
};

export type CreateBotInput = {
  contractId: Scalars['Int']['input'];
  endedBlock?: InputMaybe<Scalars['Int']['input']>;
  followerAddress: Scalars['String']['input'];
  leaderAddress: Scalars['String']['input'];
  pausedBlock?: InputMaybe<Scalars['Int']['input']>;
  startedBlock?: InputMaybe<Scalars['Int']['input']>;
  status: Scalars['String']['input'];
  strategyId: Scalars['Int']['input'];
};

export type CreateContractInput = {
  address: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  id: Scalars['Int']['input'];
};

export type CreatePositionInput = {
  address: Scalars['String']['input'];
  index: Scalars['Int']['input'];
};

export type CreateStrategyInput = {
  params: Scalars['String']['input'];
  strategyKey: Scalars['String']['input'];
};

export type CreateStrategyMetadataInput = {
  description: Scalars['String']['input'];
  key: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type FindPositionInput = {
  address: Scalars['String']['input'];
  index: Scalars['Int']['input'];
};

export type Follower = {
  __typename?: 'Follower';
  accountIndex: Scalars['Int']['output'];
  address: Scalars['String']['output'];
  publicKey: Scalars['String']['output'];
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
  targetPositionId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  changePassword: Scalars['Boolean']['output'];
  changeRole: User;
  createBot: Bot;
  createContract: Contract;
  createPosition: Position;
  createStrategy: Strategy;
  createStrategyMetadata: StrategyMetadata;
  generateNewFollower: Follower;
  getToken: GetTokenResponse;
  removeBot?: Maybe<Bot>;
  removeContract?: Maybe<Contract>;
  removeStrategy?: Maybe<Strategy>;
  removeStrategyMetadata: StrategyMetadata;
  updateBot?: Maybe<Bot>;
  updateContract?: Maybe<Contract>;
  updateStrategy?: Maybe<Strategy>;
  updateStrategyMetadata: StrategyMetadata;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangeRoleArgs = {
  input: ChangeUserRoleInput;
};


export type MutationCreateBotArgs = {
  input: CreateBotInput;
};


export type MutationCreateContractArgs = {
  input: CreateContractInput;
};


export type MutationCreatePositionArgs = {
  createPositionInput: CreatePositionInput;
};


export type MutationCreateStrategyArgs = {
  input: CreateStrategyInput;
};


export type MutationCreateStrategyMetadataArgs = {
  input: CreateStrategyMetadataInput;
};


export type MutationGetTokenArgs = {
  input: GetTokenInput;
};


export type MutationRemoveBotArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveContractArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveStrategyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveStrategyMetadataArgs = {
  key: Scalars['String']['input'];
};


export type MutationUpdateBotArgs = {
  id: Scalars['Int']['input'];
  input: UpdateBotInput;
};


export type MutationUpdateContractArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContractInput;
};


export type MutationUpdateStrategyArgs = {
  id: Scalars['Int']['input'];
  input: UpdateStrategyInput;
};


export type MutationUpdateStrategyMetadataArgs = {
  input: UpdateStrategyMetadataInput;
  key: Scalars['String']['input'];
};

export type Position = {
  __typename?: 'Position';
  address: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  index: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findActionsByPosition: Array<Action>;
  findAllActions: Array<Action>;
  findAllBots: Array<Bot>;
  findAllContracts: Array<Contract>;
  findAllMissions: Array<Mission>;
  findAllPositions: Array<Position>;
  findAllStrategy: Array<Strategy>;
  findAllStrategyMetadata: Array<StrategyMetadata>;
  findAllTasks: Array<Task>;
  findBot?: Maybe<Bot>;
  findContract?: Maybe<Contract>;
  findMission?: Maybe<Mission>;
  findMissionByBot: Array<Mission>;
  findOne?: Maybe<Action>;
  findPosition?: Maybe<Position>;
  findPositionById?: Maybe<Position>;
  findStrategy?: Maybe<Strategy>;
  findStrategyMetadata: StrategyMetadata;
  findTask?: Maybe<Task>;
  findTasksByMission: Array<Task>;
  getAllFollowers: Array<Follower>;
  getAllLeaders: Array<User>;
  getFollowerByAddress?: Maybe<Follower>;
  getUserByAddress?: Maybe<User>;
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


export type QueryFindMissionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindMissionByBotArgs = {
  botId: Scalars['Int']['input'];
};


export type QueryFindOneArgs = {
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


export type QueryGetFollowerByAddressArgs = {
  input: GetFollowerByAddressInput;
};


export type QueryGetUserByAddressArgs = {
  input: GetUserByAddressInput;
};

export type Strategy = {
  __typename?: 'Strategy';
  id: Scalars['Int']['output'];
  params: Scalars['String']['output'];
  strategyKey: Scalars['String']['output'];
};

export type StrategyMetadata = {
  __typename?: 'StrategyMetadata';
  description: Scalars['String']['output'];
  key: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Task = {
  __typename?: 'Task';
  actionId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  missionId: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateBotInput = {
  endedBlock?: InputMaybe<Scalars['Int']['input']>;
  pausedBlock?: InputMaybe<Scalars['Int']['input']>;
  startedBlock?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContractInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateStrategyInput = {
  params?: InputMaybe<Scalars['String']['input']>;
  strategyKey?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateStrategyMetadataInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  role: Scalars['String']['output'];
};
