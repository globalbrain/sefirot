const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const { prompt } = require('enquirer')
const execa = require('execa')
const semver = require('semver')
const currentVersion = require('../package.json').version

const versionIncrements = [
  'patch',
  'minor',
  'major'
]

const tags = [
  'latest',
  'next'
]

const inc = (i) => semver.inc(currentVersion, i)
const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts })
const step = (msg) => console.log(chalk.cyan(msg))

async function main() {
  let targetVersion

  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: versionIncrements.map((i) => `${i} (${inc(i)})`).concat(['custom'])
  })

  if (release === 'custom') {
    targetVersion = (await prompt({
      type: 'input',
      name: 'version',
      message: 'Input custom version',
      initial: currentVersion
    })).version
  } else {
    targetVersion = release.match(/\((.*)\)/)[1]
  }

  if (!semver.valid(targetVersion)) {
    throw new Error(`Invalid target version: ${targetVersion}`)
  }

  const { tag } = await prompt({
    type: 'select',
    name: 'tag',
    message: 'Select tag type',
    choices: tags
  })

  const { yes: tagOk } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion} with the "${tag}" tag. Confirm?`
  })

  if (!tagOk) {
    return
  }

  // Run tests before release.
  step('\nRunning tests...')
  await run('pnpm', ['run', 'test:fail'])

  // Update the package version.
  step('\nUpdating the package version...')
  updatePackage(targetVersion)

  // Generate the changelog.
  step('\nGenerating the changelog...')
  await run('pnpm', ['run', 'changelog'])

  const { yes: changelogOk } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: 'Changelog generated. Does it look good?'
  })

  if (!changelogOk) {
    return
  }

  // Commit changes to the Git.
  step('\nCommitting changes...')
  await run('git', ['add', '-A'])
  await run('git', ['commit', '-m', `release: v${targetVersion}`])

  // Publish the package.
  step('\nPublishing the package...')
  await run('pnpm', [
    'publish', '--tag', tag, '--ignore-scripts', '--no-git-checks'
  ])

  // Push to GitHub.
  step('\nPushing to GitHub...')
  await run('git', ['tag', `v${targetVersion}`])
  await run('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await run('git', ['push'])
}

function updatePackage(version) {
  const pkgPath = path.resolve(path.resolve(__dirname, '..'), 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

  pkg.version = version

  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)
}

main().catch((err) => console.error(err))
