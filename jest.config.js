module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'js',
    'ts',
    'vue'
  ],
  moduleNameMapper: {
    '^sefirot/(.*)$': '<rootDir>/lib/$1',
    '^tests/(.*)$': '<rootDir>/tests/$1',
    '^lodash-es/(.*)$': 'lodash/$1'
  },
  testRegex: '/tests/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.{ts,vue}',
    '!<rootDir>/lib/mixins/**/*.ts',
    '!<rootDir>/lib/components/icons/**/*.{ts,vue}',
    '!<rootDir>/lib/store/Sefirot.ts',
    '!<rootDir>/lib/support/Time.ts',
    '!<rootDir>/lib/validation/rules/**/*.ts'
  ],
  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text-summary'
  ]
}
