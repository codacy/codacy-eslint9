import prettier from "eslint-plugin-prettier";

import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

export default [
  ...compat.extends("prettier"),
  {
    plugins: {
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": ["error", {
      "trailingComma": "none",
      "tabWidth": 4,
      "semi": true,
      "singleQuote": true
    }],
    },
  },
];