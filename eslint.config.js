import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginCypress from 'eslint-plugin-cypress';

export default [
  js.configs.recommended,
  
  {
    ignores: [
      'dist',
      'node_modules',
      '.vercel',
      '.idea',
      '.github',
      'public/service-worker.js'
    ],
  },
  
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {jsx: true},
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {version: 'detect'},
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        {allowConstantExport: true},
      ],
    },
  },
  
  {
    files: [
      'cypress/**/*.js',
      'cypress/**/*.jsx',
      'cypress/**/*.ts',
      'cypress/**/*.tsx',
    ],
    plugins: {
      cypress: pluginCypress,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    ...pluginCypress.configs.recommended,
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
    },
  },
];
