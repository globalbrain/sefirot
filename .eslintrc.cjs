module.exports = {
  extends: '@globalbrain',

  ignorePatterns: [
    'docs/**/*',
    '!docs/.vitepress/theme/**/*',
    '!docs/.vitepress/config.ts'
  ],

  rules: {
    'vue/no-template-shadow': 'off',
    'no-console': 'warn',
    'unused-imports/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}
