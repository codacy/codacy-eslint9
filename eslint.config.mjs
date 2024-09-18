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
      },
    },
    {

      files: ['**/*.js'],
      ...tseslint.configs.disableTypeChecked,
    },

);