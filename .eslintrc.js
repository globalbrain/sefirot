module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  globals: {
    'describe': true,
    'expect': true,
    'jest': true,
    'test': true
  },
  rules: {
    'vue/attributes-order': 'off',
    'vue/component-name-in-template-casing': ['warn', 'PascalCase', {
      ignores: [
        'component', 'no-ssr', 'nuxt', 'nuxt-child', 'nuxt-link', 'transition',
        'transition-group',
      ]
    }],
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
