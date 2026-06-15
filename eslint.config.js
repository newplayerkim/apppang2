import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'eslint.config.js'] },
  ...compat.extends('airbnb', 'airbnb-typescript', 'airbnb/hooks'),
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/prefer-default-export': 'off',
      'react/react-in-jsx-scope': 'off', // React 17+
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      'import/no-extraneous-dependencies': [
        'error',
        { devDependencies: ['vite.config.ts', 'eslint.config.js'] }
      ],
      // 리팩토링 시 아래 규칙들 활성화
      '@typescript-eslint/no-unused-vars': 'off',           // 원래: ['warn']
      '@typescript-eslint/no-explicit-any': 'off',          // 원래: 'error'
      '@typescript-eslint/no-unsafe-assignment': 'off',     // 원래: 'error'
      '@typescript-eslint/no-unsafe-member-access': 'off',  // 원래: 'error'
      '@typescript-eslint/no-unsafe-call': 'off',           // 원래: 'error'
      '@typescript-eslint/no-unsafe-return': 'off',         // 원래: 'error'
      '@typescript-eslint/no-unsafe-argument': 'off',       // 원래: 'error'
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 원래: 'error'
    },
  },
  prettierPlugin,
);
