module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    '@typescript-eslint/no-redeclare': ['error'],
    'import/named': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': 'off',
    'no-use-before-define': 'off',
    'no-unreachable-loop': 'off',
    'no-redeclare': 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'vue/component-tags-order': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
