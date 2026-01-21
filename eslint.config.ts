import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['./app/**/*.{ts,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  eslintReact.configs['recommended-typescript'],
  globalIgnores(['!.storybook'], 'Include Storybook Directory'),
  storybook.configs['flat/recommended'],
  prettierPlugin,
]);
