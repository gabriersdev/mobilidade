module.exports = {
  // Define que este é o arquivo de configuração principal
  root: true,
  
  // Define o ambiente (substitui o globals do flat config)
  env: {
    browser: true,
    es2020: true,
    node: true,
    "cypress/globals": true // Habilita globals do Cypress automaticamente
  },
  
  // Extensões de regras prontas (substitui o js.configs.recommended)
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  
  // Arquivos e pastas a serem ignorados
  ignorePatterns: [
    'dist',
    'node_modules',
    '.vercel',
    '.idea',
    '.github',
    'public/service-worker.js'
  ],
  
  // Configurações do Parser (como o código é lido)
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  // Plugins utilizados (apenas os nomes como strings)
  plugins: [
    'react',
    'react-hooks',
    'react-refresh',
    'cypress',
    'import'
  ],
  
  // Configurações adicionais
  settings: {
    react: {
      version: 'detect',
    },
  },
  
  // Regras globais do projeto
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'react-hooks/exhaustive-deps': 'off',
  },
  
  // Configurações específicas para arquivos do Cypress (Overrides)
  overrides: [
    {
      files: [
        'cypress/**/*.js',
        'cypress/**/*.jsx',
        'cypress/**/*.ts',
        'cypress/**/*.tsx',
      ],
      extends: ['plugin:cypress/recommended'],
      rules: {
        'cypress/no-unnecessary-waiting': 'off',
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
