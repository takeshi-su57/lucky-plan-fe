import { readFileSync } from "node:fs";

import graphqlEslint from "@graphql-eslint/eslint-plugin";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import nextVitals from "eslint-config-next/core-web-vitals";

const schemaSdl = readFileSync(new URL("./schema.graphql", import.meta.url), "utf8");

const config = [
  {
    ignores: [".npm-cache/**", "graphql/gql/**"],
  },
  ...nextVitals,
  {
    plugins: {
      "@tanstack/query": tanstackQuery,
    },
    rules: {
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/no-rest-destructuring": "warn",
      "@tanstack/query/stable-query-client": "error",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/set-state-in-effect": "off",
      "no-unused-vars": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    files: ["**/*.graphql"],
    languageOptions: {
      parser: graphqlEslint.parser,
      parserOptions: {
        schemaSdl,
      },
    },
    plugins: {
      "@graphql-eslint": graphqlEslint,
    },
    rules: {
      "@graphql-eslint/known-type-names": "error",
    },
  },
];

export default config;
