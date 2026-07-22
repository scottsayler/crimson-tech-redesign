import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Google Apps Script entry points (doGet/doPost) and editor helpers are
  // invoked by the Apps Script runtime, not by module imports.
  {
    files: ["google-apps-script/**/*.{js,gs}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern:
            "^(doGet|doPost|setupSheet|testNotificationEmail)$",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
