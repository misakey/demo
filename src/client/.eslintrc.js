module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:import/recommended',
    // 'airbnb',
    // 'airbnb/hooks',
    // 'plugin:json/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['src'],
        // extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
