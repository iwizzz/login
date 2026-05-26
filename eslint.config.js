import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'
import { defineConfig, globalIgnores } from 'eslint/config'

const fsdLayers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']

const allowLayers = (layers) => layers.map((type) => ({ to: { type } }))

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'boundaries/elements': fsdLayers.map((layer) => ({
        type: layer,
        pattern: `src/${layer}/**`,
      })),
      'boundaries/include': ['src/**/*.{ts,tsx}'],
      'boundaries/dependency-nodes': ['import'],
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
      },
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          message:
            'Импорт "{{to.type}}" из "{{from.type}}" нарушает FSD: разрешены только слои ниже.',
          rules: [
            { from: { type: 'app' }, allow: allowLayers(fsdLayers) },
            {
              from: { type: 'pages' },
              allow: allowLayers([
                'pages',
                'widgets',
                'features',
                'entities',
                'shared',
                'app',
              ]),
            },
            {
              from: { type: 'widgets' },
              allow: allowLayers(['widgets', 'features', 'entities', 'shared']),
            },
            {
              from: { type: 'features' },
              allow: allowLayers(['features', 'entities', 'shared']),
            },
            {
              from: { type: 'entities' },
              allow: allowLayers(['entities', 'shared']),
            },
            { from: { type: 'shared' }, allow: allowLayers(['shared']) },
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*', '@/features/*/*/**'],
              message:
                'Используйте публичный API слайса: @/features/<slice>, не внутренние пути.',
            },
            {
              group: ['@/entities/*/*', '@/entities/*/*/**'],
              message:
                'Используйте публичный API слайса: @/entities/<slice>, не внутренние пути.',
            },
            {
              group: ['@/widgets/*/*', '@/widgets/*/*/**'],
              message:
                'Используйте публичный API: @/widgets или @/widgets/<widget>, не внутренние пути.',
            },
            {
              group: ['@/shared/*/*', '@/shared/*/*/**'],
              message:
                'Используйте публичный API сегмента: @/shared/<segment>, не внутренние пути.',
            },
            {
              group: ['@/app/*/*', '@/app/*/*/**'],
              message:
                'Используйте публичный API: @/app/<segment>, не внутренние пути.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/app/store/initAppStore.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: ['src/app/store/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*/*', '@/features/*/*/**'],
              message:
                'Используйте публичный API слайса: @/features/<slice>, не внутренние пути.',
            },
            {
              group: ['@/widgets/*/*', '@/widgets/*/*/**'],
              message:
                'Используйте публичный API: @/widgets или @/widgets/<widget>, не внутренние пути.',
            },
            {
              group: ['@/shared/*/*', '@/shared/*/*/**'],
              message:
                'Используйте публичный API сегмента: @/shared/<segment>, не внутренние пути.',
            },
          ],
        },
      ],
    },
  },
])
