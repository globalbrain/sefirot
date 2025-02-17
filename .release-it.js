module.exports = {
  git: {
    commitMessage: 'release: v${version}',
    tagName: 'v${version}'
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    releaseNotes(context) {
      return context.changelog.split('\n').slice(1).join('\n').trim()
    }
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
      ignoreRecommendedBump: true
    }
  },
  hooks: {
    'before:init': 'pnpm test:fail'
  },
  npm: {
    tag: 'latest-3'
  }
}
