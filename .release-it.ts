import { type Config } from 'release-it'

export default {
  git: {
    commitMessage: 'release: v${version}',
    tagName: 'v${version}'
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    // @ts-expect-error broken types
    releaseNotes(context: { changelog: string }) {
      return context.changelog.split('\n').slice(1).join('\n').trim()
    }
  },
  npm: {
    // The registry publish happens in CI via npm trusted publishing (OIDC) —
    // see .github/workflows/release.yml. release-it only bumps the version,
    // tags, and creates the GitHub release that triggers it.
    publish: false
  },
  plugins: {
    '@release-it/conventional-changelog': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
      ignoreRecommendedBump: true
    }
  },
  hooks: {
    'before:init': 'pnpm check:fail'
  }
} satisfies Config
