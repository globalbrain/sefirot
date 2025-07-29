import type { Config } from 'release-it'

export default {
  git: {
    commitMessage: 'release: v${version}',
    tagName: 'v${version}',
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    // @ts-ignore broken types
    releaseNotes(context: { changelog: string }) {
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
  }
} satisfies Config
