import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"], // Target TypeScript files
    rules: {
      // Disable or modify the rules causing issues
      "@typescript-eslint/no-explicit-any": "off", // Allow `any` type
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }, // Ignore unused variables starting with `_`
      ],
      "react-hooks/exhaustive-deps": "warn", // Warn about missing dependencies in hooks
      "prefer-const": "warn", // Suggest using `const` where possible
      "@typescript-eslint/no-unused-expressions": "warn", // Warn for unused expressions
    },
  },
];

export default eslintConfig;
