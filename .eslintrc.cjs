module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.config.*js'],
      },
    ],
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        groups: [
          ['builtin', 'external'],
          ['index', 'sibling', 'parent', 'internal'],
        ],
        'newlines-between': 'always',
      },
    ],
    'no-console': 'off',
    'prettier/prettier': 'error',
  },
  env: {
    browser: true,
  },
};
