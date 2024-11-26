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
  contractId: Scalars['Int']['output'];
  endedBlock?: Maybe<Scalars['Int']['output']>;
  followerAddress: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  leaderAddress: Scalars['String']['output'];
  pausedBlock?: Maybe<Scalars['Int']['output']>;
  startedBlock?: Maybe<Scalars['Int']['output']>;
  status: BotStatus;
  strategyId: Scalars['Int']['output'];
};

export type BotDetails = {
  __typename?: 'BotDetails';
  contract: Contract;
  contractId: Scalars['Int']['output'];
  endedBlock?: Maybe<Scalars['Int']['output']>;
  follower: Follower;
  followerAddress: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  leader: User;
  leaderAddress: Scalars['String']['output'];
  pausedBlock?: Maybe<Scalars['Int']['output']>;
  startedBlock?: Maybe<Scalars['Int']['output']>;
  status: BotStatus;
  strategy: Strategy;
  strategyId: Scalars['Int']['output'];
};

export enum BotStatus {
  Created = 'Created',
  Dead = 'Dead',
  Finish = 'Finish',
  Live = 'Live'
}

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
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
};

export type CreateBotInput = {
  contractId: Scalars['Int']['input'];
  followerAddress: Scalars['String']['input'];
  leaderAddress: Scalars['String']['input'];
  strategyId: Scalars['Int']['input'];
};

export type CreateContractInput = {
  address: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  description: Scalars['String']['input'];
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

export enum MissionStatus {
  Closed = 'Closed',
  Opened = 'Opened'
}

export type Mutation = {
  __typename?: 'Mutation';
  addUser: User;
  changePassword: Scalars['Boolean']['output'];
  changeUserRole: User;
  createBot: Bot;
  createContract: Contract;
  createStrategy: Strategy;
  createStrategyMetadata: StrategyMetadata;
  generateNewFollower: Follower;
  getToken: GetTokenResponse;
  removeStrategy?: Maybe<Strategy>;
  removeStrategyMetadata: StrategyMetadata;
  updateStrategy?: Maybe<Strategy>;
  updateStrategyMetadata: StrategyMetadata;
};


export type MutationAddUserArgs = {
  input: AddUserInput;
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationChangeUserRoleArgs = {
  input: ChangeUserRoleInput;
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


export type MutationCreateStrategyMetadataArgs = {
  input: CreateStrategyMetadataInput;
};


export type MutationGetTokenArgs = {
  input: GetTokenInput;
};


export type MutationRemoveStrategyArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveStrategyMetadataArgs = {
  key: Scalars['String']['input'];
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

export type PositionInfo = {
  __typename?: 'PositionInfo';
  address: Scalars['String']['output'];
  index: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAction?: Maybe<Action>;
  findActionsByPosition: Array<Action>;
  findAllActions: Array<Action>;
  findAllBots: Array<Bot>;
  findAllContracts: Array<Contract>;
  findAllFollowerActions: Array<FollowerAction>;
  findAllMissions: Array<Mission>;
  findAllPositions: Array<Position>;
  findAllStrategy: Array<Strategy>;
  findAllStrategyMetadata: Array<StrategyMetadata>;
  findAllTasks: Array<Task>;
  findBot: BotDetails;
  findContract: Contract;
  findFollowerAction?: Maybe<FollowerActionDetails>;
  findMission?: Maybe<Mission>;
  findMissionByBot: Array<Mission>;
  findPosition?: Maybe<Position>;
  findPositionById?: Maybe<Position>;
  findStrategy?: Maybe<Strategy>;
  findStrategyMetadata: StrategyMetadata;
  findTask?: Maybe<Task>;
  findTasksByMission: Array<Task>;
  getAllFollowers: Array<Follower>;
  getAllLeaders: Array<User>;
  getAllUsers: Array<User>;
  getFollowerByAddress?: Maybe<Follower>;
  getUserByAddress?: Maybe<User>;
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


export type QueryFindMissionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindMissionByBotArgs = {
  botId: Scalars['Int']['input'];
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
  logs: Array<Scalars['String']['output']>;
  missionId: Scalars['Int']['output'];
  status: TaskStatus;
};

export enum TaskStatus {
  Await = 'Await',
  Completed = 'Completed',
  Created = 'Created',
  Failed = 'Failed',
  Initiated = 'Initiated'
}

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
  role: UserRole;
};

export enum UserRole {
  Leader = 'Leader',
  User = 'User'
}

export type UserInfoFragment = { __typename?: 'User', address: string, role: UserRole } & { ' $fragmentName'?: 'UserInfoFragment' };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserInfoFragment': UserInfoFragment } }
  )> };

export type ChangeUserRoleMutationVariables = Exact<{
  input: ChangeUserRoleInput;
}>;


export type ChangeUserRoleMutation = { __typename?: 'Mutation', changeUserRole: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserInfoFragment': UserInfoFragment } }
  ) };

export type AddUserMutationVariables = Exact<{
  input: AddUserInput;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserInfoFragment': UserInfoFragment } }
  ) };

export const UserInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UserInfoFragment, unknown>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const ChangeUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"changeUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChangeUserRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changeUserRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<ChangeUserRoleMutation, ChangeUserRoleMutationVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserInfo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;