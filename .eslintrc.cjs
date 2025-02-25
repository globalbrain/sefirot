module.exports = {
  extends: '@globalbrain',

  ignorePatterns: [
    'docs/**/*',
    '!docs/**/',
    '!docs/**/*.ts',
    '!docs/**/*.vue'
  ],

  rules: {
    'vue/no-template-shadow': 'off',
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': 'warn'
  }
}
