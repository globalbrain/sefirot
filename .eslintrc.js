module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],

  parser: 'vue-eslint-parser',

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  plugins: ['import', '@typescript-eslint'],

  globals: {
    describe: true,
    expect: true,
    it: true
  },

  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'pathGroups': [
        {
          'pattern': 'sefirot/**',
          'group': 'parent',
          'position': 'before'
        },
        {
          'pattern': 'test/**',
          'group': 'parent',
          'position': 'before'
        }
      ],
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': false
      }
    }],
    'no-unused-vars': 'off',
    'vue/attributes-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
