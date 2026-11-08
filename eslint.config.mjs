import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["node_modules/**", "js/md5.js", "LAMPAPI/**"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: { ...globals.browser, md5: "readonly" }
    },
    rules: {
      "no-unused-vars": ["error", { "vars": "local" }]
    }
  }
];