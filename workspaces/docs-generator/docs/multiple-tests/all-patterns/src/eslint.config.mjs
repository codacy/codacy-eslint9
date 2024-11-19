import expectType from "eslint-plugin-expect-type/configs/recommended";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config (
  eslint.configs.recommended,
	expectType,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);