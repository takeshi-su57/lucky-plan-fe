import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "graphql/schema.gql",
  documents: ["app/**/!(*.d).{ts,tsx}"],
  ignoreNoDocuments: true,
  generates: {
    "./graphql/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },
    },
  },
  watch: true,
};
export default config;
