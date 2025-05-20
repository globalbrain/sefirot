module.exports = {
  extends: '@globalbrain',

  ignorePatterns: [
    'docs/**/*',
    '!docs/.vitepress/theme/**/*',
    '!docs/.vitepress/config.ts'
  ],

  rules: {
    'vue/no-template-shadow': 'off',
    'vue/v-bind-style': ['error', 'shorthand', { sameNameShorthand: 'always' }],
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': 'warn'
  }
}
