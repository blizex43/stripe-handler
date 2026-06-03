import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
const prettier = eslintPluginPrettier;
export default defineConfig([
	globalIgnores(["dist", "package.json", "package-lock.json", "tsconfig.json", "eslint.config.mts"]),
{ 
	files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
	plugins: { js, prettier }, 
	extends: ["js/recommended"], 
	languageOptions: {
		globals: globals.node,
		parser: tseslint.parser,
		ecmaVersion: 2018,
		sourceType: "module",
		parserOptions: {
				project: "./tsconfig.json",
				jsx: true,
				useJSXTextNode: true,
			}, 
		}, 
	rules: {
		"prettier/prettier": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-require-imports": "off",
		"prefer-const": "warn",
	} 
},
  tseslint.configs.recommended,
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
]);
