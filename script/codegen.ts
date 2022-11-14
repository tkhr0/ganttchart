import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/schema.graphql",
  documents: ["src/**/*.tsx", "!src/gql/**/*"],
  generates: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "src/gql/": {
      preset: "client",
      plugins: [],
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "src/gql/introspection.schema.json": {
      plugins: ["introspection"],
    },
  },
  watch: true,
};

export default config;
