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
    "\n  fragment FollowerInfo on Follower {\n    address\n    accountIndex\n    publicKey\n    ethBalance\n    usdcBalance\n  }\n": types.FollowerInfoFragmentDoc,
    "\n  query getAllFollowers {\n    getAllFollowers {\n      ...FollowerInfo\n    }\n  }\n": types.GetAllFollowersDocument,
    "\n  query getFollowerPrivateKey($input: GetFollowerByAddressInput!) {\n    getFollowerPrivateKey(input: $input)\n  }\n": types.GetFollowerPrivateKeyDocument,
    "\n  mutation generateNewFollower {\n    generateNewFollower {\n      ...FollowerInfo\n    }\n  }\n": types.GenerateNewFollowerDocument,
    "\n  fragment UserInfo on User {\n    address\n    role\n  }\n": types.UserInfoFragmentDoc,
    "\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n": types.GetAllUsersDocument,
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
export function graphql(source: "\n  fragment UserInfo on User {\n    address\n    role\n  }\n"): (typeof documents)["\n  fragment UserInfo on User {\n    address\n    role\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n"): (typeof documents)["\n  query getAllUsers {\n    getAllUsers {\n      ...UserInfo\n    }\n  }\n"];
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