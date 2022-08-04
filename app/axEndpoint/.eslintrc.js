module.exports = exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['@kha-devspace/eslint-config/rules/recommended'],
  overrides: [
    {
      files: ['./**/*.ts'],
      extends: [
        '@kha-devspace/eslint-config/rules/typescript_recommanded',
        '@kha-devspace/eslint-config/rules/naming_convention',
      ],
      parserOptions: {
        project: './**/tsconfig.json',
      },
    },
    {
      files: ['*.config.js'],
      rules: {
        // '@typescript-eslint/no-var-requires': 'off',
        'global-require': 'off',
      },
    },
  ],
}
