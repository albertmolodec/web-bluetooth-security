module.exports = {
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  rules: {
    'react/prefer-stateless-function': 'off',
    'react/no-danger': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
