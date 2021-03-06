module.exports = {
  globals: {
    'vue-jest': {
      babelConfig: false
    }
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'vue'
  ],
  moduleNameMapper: {
    '^lodash-es/(.*)$': 'lodash/$1',
    '^sefirot/(.*)$': '<rootDir>/lib/$1',
    '^test/(.*)$': '<rootDir>/test/$1'
  },
  testRegex: '/test/.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '.*\\.vue$': 'vue-jest'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts'
  ],
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.{ts,vue}'
  ],
  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text-summary'
  ]
}
