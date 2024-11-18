import { eslintPluginExpectType } from 'eslint-plugin-expect-type';

export default [
    {
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: process.cwd(),
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            'expect-type': eslintPluginExpectType,
        },
    },
];