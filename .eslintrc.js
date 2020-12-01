module.exports = {
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'import/named': 'off',
    'no-use-before-define': 'off',
    'no-unreachable-loop': 'off',
    'vue/component-tags-order': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
