import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import cypress from "eslint-plugin-cypress";
import globals from "globals";

export default [
  // 1. Global ignores
  {
    ignores: [
      "dist/",
      "node_modules/",
      ".vercel/",
      ".idea/",
      ".github/",
      "public/service-worker.js",
    ],
  },
  
  // 2. Main configuration for all JS/JSX files
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        // Set the React version explicitly to avoid detection bug
        version: "19.2",
      },
    },
    rules: {
      // Merge rules from recommended configs
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      
      // Custom rule overrides
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": ["warn", {allowConstantExport: true}],
      "react-hooks/exhaustive-deps": "off",
      "react/prop-types": "off",
    },
  },
  
  // 3. Cypress overrides
  {
    files: ["cypress/**/*.{js,jsx,ts,tsx}"],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...globals.cypress,
      },
    },
    rules: {
      ...cypress.configs.recommended.rules,
      "cypress/no-unnecessary-waiting": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
  
  // TODO - usar extends, como extends TS aqui para evitar problemas com palavras reservadas ao TS, como "interface"
];
