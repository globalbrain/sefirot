<p align="center">
  <img width="128" src="https://github.com/globalbrain/sefirot/raw/master/logo-sefirot.png" alt="Sefirot">
</p>

<h1 align="center">Sefirot</h1>

<p align="center">
  <a href="https://travis-ci.org/globalbrain/sefirot">
      <img src="https://travis-ci.org/globalbrain/sefirot.svg?branch=master" alt="Travis CI">
  </a>
  <a href="https://codecov.io/gh/globalbrain/sefirot">
      <img src="https://codecov.io/gh/globalbrain/sefirot/branch/master/graph/badge.svg" alt="codecov">
  </a>
  <a href="https://github.com/globalbrain/sefirot/blob/master/LICENSE.md">
      <img src="https://img.shields.io/npm/l/@globalbrain/sefirot.svg" alt="License">
  </a>
</p>

This repository contains Vue Components for Global Brain Design System. Components are meant to be clean, sophisticated, and scalable.

The project is currently heavily under development and may drastically change while in progress.

## Getting Started

Install Sefirot via npm or yarn.

```bash
$ npm install @globalbrain/sefirot

$ yarn add @globalbrain/sefirot
```

Now you may import components under `lib` directly and use them in your Vue Component.

```vue
<template>
  <div>
    <SButton label="BUTTON" />
  </div>
</template>

<script>
import SButton from '@globalbrain/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  }
}
</script>
```

When compiling your project, don't forget to transpile the code. For example, in Nuxt, you should define the following settings at `nuxt.config.js`.

```js
export default {
  // ...

  build: {
    transpile: ['@globalbrain/sefirot']
  }

  // ...
}
```

Also, Sefirot assumes you have your CSS variables defined at `@/assets/styles/variables`. Make sure to copy styles to your project on the same location. In addition, Sefirot uses postcss plugins, `postcss-nested` and `postcss-css-variables`. Make sure to define them in your postcss config. Again for Nuxt, you should define:

```js
export default {
  // ...

  build: {
    transpile: ['@globalbrain/sefirot'],

    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-css-variables': {},
      }
    }
  }

  // ...
}
```

## Contribution

We're really excited that you are interested in contributing to Sefirot. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

### Code style guide

Sefirot follows official [Vue Style Guide](https://vuejs.org/v2/style-guide/). But always remember to follow the "Golden Rule" below.

> Every line of code should appear to be written by a single person, no matter the number of contributors.  
> &mdash; <cite>@mdo</cite>

### Development

```bash
$ npm run serve
```

Serve documentation website at http://localhost:3000.

```bash
$ npm run lint
```

Lint files using a rule of Standard JS.

```bash
$ npm run test
```

Run the test.

```bash
$ npm run test:watch
```

Run the test in watch mode.

```bash
$ npm run test:coverage
```

Generate test coverage in `coverage` directory.

## License

Sefirot is open-sourced software licensed under the [MIT license](LICENSE.md).
