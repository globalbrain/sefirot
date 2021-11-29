module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
    'jest/globals': true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],

  plugins: ['jest'],

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  rules: {
    'no-unused-vars': 'off',
    'vue/attributes-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
