module.exports = {
  rootDir: '..',
  moduleFileExtensions: [
    'js',
    'ts',
    'vue'
  ],
  moduleNameMapper: {
    '^sefirot/(.*)$': '<rootDir>/lib/$1',
    '^test/(.*)$': '<rootDir>/test/$1'
  },
  testRegex: '/test/.*\\.spec\\.(js|ts)$',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts'
  ],
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.{js,ts,vue}'
  ],
  coverageReporters: [
    'html',
    'json',
    'lcov',
    'text-summary'
  ]
}
