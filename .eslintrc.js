/** @format */

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
  },
  extends: [
    'prettier',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'prettier/standard',
    // 'prettier/react',
  ],
  plugins: ['prettier', 'node'],
  // add your custom rules here
  rules: {
    'node/shebang': 0,
  },
}
