// @ts-check

import globals from "globals";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
//import prettier from 'eslint-config-prettier';

export default tseslint.config(
    {
      // Config with just ignores is the replacement for `.eslintignore`
      ignores: ['dist/**'],
    },
    // prettier,
    eslint.configs.recommended,
    {
      files: ['**/*.ts'],
      languageOptions: {
        parser: tseslint.parser,
        globals: globals.node,
        parserOptions: {
          project: true,
          sourceType: 'module',
          programs: null,
        },
      },
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
      },
    },
    {
      // Disable type-aware linting on JS files
      files: ['**/*.js'],
      ...tseslint.configs.disableTypeChecked,
    },
    // {
    //   // Enable Jest rules on test files
    //   files: ['tests/**'],
    //   ...jestPlugin.configs['flat/recommended'],
    // },
);
