# Sefirot

[![npm version](https://img.shields.io/npm/v/@globalbrain/sefirot?logo=npm&label=npm)](https://www.npmjs.com/package/@globalbrain/sefirot)
[![CI](https://img.shields.io/github/actions/workflow/status/globalbrain/sefirot/ci.yml?branch=main&logo=github&label=CI)](https://github.com/globalbrain/sefirot/actions/workflows/ci.yml)
[![docs](https://img.shields.io/badge/docs-sefirot.globalbrains.com-5c73e7)](https://sefirot.globalbrains.com/)
[![license](https://img.shields.io/github/license/globalbrain/sefirot?label=license)](LICENSE.md)

Sefirot is a collection of Vue Components for Global Brain Design System. Components are meant to be clean, sophisticated, and scalable.

Sefirot is focused on being used within Global Brain's ecosystem. Hence, the design—UI/UX—of components is relatively fixed, and customization capability is limited. In exchange for customizability, we can create components that are more robust, dynamic, and clean.

Feel free to leverage any component within this project. You may customize components how you see fit, and perhaps some features may be valuable to you. Any suggestions, requests, or questions are welcome.

## Documentation

You can check out the documentation for Sefirot at https://sefirot.globalbrains.com.

## Contribution

We're really excited that you are interested in contributing to Sefirot. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

### Code style guide

Sefirot follows the official [Vue Style Guide](https://v3.vuejs.org/style-guide/). But always remember to follow the "Golden Rule"&hellip;

> Every line of code should appear to be written by a single person, no matter the number of contributors.
> &mdash; <cite>@mdo</cite>

### Development

```bash
$ pnpm story
```

Serve Histoire at http://localhost:4010.

```bash
$ pnpm docs
```

Serve documentation website at http://localhost:4011.

```bash
$ pnpm lint
```

Lint files using a rule of Standard JS.

```bash
$ pnpm test
```

Run the tests.

```bash
$ pnpm test:coverage
```

Output test coverage in `coverage` directory.

```bash
$ pnpm check
```

Run the type check, lint, tests and [publint](https://publint.dev) together — the same set CI runs.

### Release

Releases are automated. [release-please](https://github.com/googleapis/release-please) keeps a release PR open against `main`, built from the conventional commit history; merging it bumps `package.json`, updates `CHANGELOG.md`, tags `v<version>` and publishes the GitHub release. That release then publishes `@globalbrain/sefirot` to npm from CI through [trusted publishing](https://docs.npmjs.com/trusted-publishers/) with provenance, once the `npm` environment is approved. Do not bump the version or edit the changelog by hand.

## License

Sefirot is open-sourced software licensed under the [MIT license](LICENSE.md).
