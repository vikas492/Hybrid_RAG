import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
      globals: { document: "readonly", window: "readonly", crypto: "readonly", File: "readonly", FormData: "readonly", HTMLElement: "readonly", HTMLButtonElement: "readonly", HTMLDivElement: "readonly", HTMLInputElement: "readonly", HTMLLabelElement: "readonly", URL: "readonly" },
    },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: { ...reactHooks.configs.recommended.rules, "no-undef": "off", "no-unused-vars": "off", "react-refresh/only-export-components": ["warn", { allowConstantExport: true }] },
  },
];
