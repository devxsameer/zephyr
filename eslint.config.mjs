import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, prettier: prettierPlugin },
    extends: ["js/recommended"],
    ignores: ["dist/**", "node_modules/**", "build/**", "coverage/**"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  eslintConfigPrettier,
]);
