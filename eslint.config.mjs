// @ts-check

import globals from "globals";
import js from "@eslint/js";
import tseslint from 'typescript-eslint';
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: ['dist/**'],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  ...compat.extends("prettier"),
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: prettier,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      parser: tseslint.parser,
      globals: globals.node,
      parserOptions: {
        project: true,
        sourceType: 'module',
        programs: null
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    // disable type-aware linting on JS files
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
  },
  // {
  //   // enable jest rules on test files
  //   files: ['tests/**'],
  //   ...jestPlugin.configs['flat/recommended'],
  // },
];
