import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['./src/app/store/initAppStore.ts'],
    rules: {
      'fsd/no-public-api-sidestep': 'off',
    },
  },
  {
    files: ['./src/pages/**'],
    rules: {
      'fsd/forbidden-imports': 'off',
    },
  },
  {
    files: [
      './src/app/layouts/**/model/**',
      './src/shared/styles/**',
    ],
    rules: {
      'fsd/no-reserved-folder-names': 'off',
    },
  },
])
