// @ts-check
import globalbrain from '@globalbrain/eslint-config'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'docs/**/*',
    '!docs/.vitepress/theme/**/*',
    '!docs/.vitepress/config.ts'
  ]),
  await globalbrain({
    rules: {
      'antfu/consistent-list-newline': 'off',
      'no-console': 'warn',
      'no-new-wrappers': 'off', // unicorn/new-for-builtins already handles this
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': 'warn',
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        { registeredComponentsOnly: false }
      ],
      'vue/no-template-shadow': 'off',
      'vue/no-unused-properties': 'warn'
    }
  })
])
