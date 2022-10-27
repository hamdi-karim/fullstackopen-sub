module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
    indent: ['error', 2],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
  },
};
