import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/v1/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations'],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        flattenGeneratedTypes: true,
        flattenGeneratedTypesIncludeFragments: true
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
