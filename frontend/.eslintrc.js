module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  settings: {
    'import/resolver': {
      jsconfig: {
        config: 'jsconfig.json',
      },
    },
  },
};
