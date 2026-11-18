import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', '.react-router', '.wrangler', 'assets-src']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Exports de módulos de ruta de React Router (no rompen fast refresh)
      'react-refresh/only-export-components': [
        'error',
        { allowExportNames: ['meta', 'links', 'headers', 'handle', 'Layout', 'ErrorBoundary', 'HydrateFallback'] },
      ],
    },
  },
  {
    // Scripts de build y configuración corren en Node
    files: ['scripts/**', '*.config.js', 'api/**'],
    languageOptions: { globals: globals.node },
  },
])
