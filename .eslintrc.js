module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  rules: {
    // Customize your rules here
    'prettier/prettier': 'error'
  },
  settings: {
    react: { version: 'detect' }
  }
};