module.exports = {
  extends: '@globalbrain',

  ignorePatterns: [
    'docs/.vitepress/cache/**/*'
  ],

  rules: {
    'vue/no-template-shadow': 'off'
  }
}
