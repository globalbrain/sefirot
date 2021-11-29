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
    '^tests/(.*)$': '<rootDir>/tests/$1'
  },
  testRegex: '/tests/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.vue$': 'vue-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.{ts,vue}',
    '!<rootDir>/lib/components/icons/**/*.{ts,vue}'
  ],
  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text-summary'
  ]
}
