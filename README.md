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

Note that Sefirot is focused on being used in Global Brain's ecosystem. Hence the design—UI/UX—of components is quite fixed, and customization capability is limited. In exchange for customizability, we can create components that are more robust, dynamic, and clean.

That's being said, feel free to leverage any component within this project. You may customize them however you want, and if maybe, some component might be valuable to you. Any suggestion, request, or questions are welcome.

## Documentation

You can check out the documentation for Sefirot at https://sefirot.globalbrains.com.

## Getting Started

At first, install Sefirot via npm or yarn.

```bash
# Via NPM.
$ npm install @globalbrain/sefirot

# Via Yarn.
$ yarn add @globalbrain/sefirot
```

To begin using the components, you should directly import them from `lib` directory under the Sefirot package.

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

By design, Sefirot doesn't ship with pre-built files, so you must compile the code in your project. Please follow the following instruction to set up your build system.

Sefirot assumes you have your CSS placed at `@/assets/styles` directory. Make sure to copy styles to your project on the same location. To copy CSS files, simply run the following command. The destination directly (`@`) should depend on your project setup.

```bash
$ cp ./node_modules/@globalbrain/sefirot/lib/assets/styles ./assets/
```

To compile Vue Components, you must have appropriate build settings. For example, in [Nuxt.js](https://nuxtjs.org/), you should define the following settings at `nuxt.config.js`. In addition, Sefirot uses postcss plugins, `postcss-nested` and `postcss-css-variables`. Make sure to define them in your postcss config as well. And the last thing, don't forget to include base bootstrapping global CSS as well.

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
  },

  css: ['@/assets/styles/bootstrap']

  // ...
}
```

## Easier Component Import

If you think importing components from `@globalbrain/sefirot/lib` is too long to type, you can set up an alias to reduce the boilerplate. Again, this is an example set up on `nuxt.config.js`.

```js
export default {
  // ...

  build: {
    // Alias the package path.
    extend (config) {
      config.resolve.alias['sefirot'] = '@globalbrain/sefirot/lib'
    },

    transpile: ['@globalbrain/sefirot'],

    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-css-variables': {},
      }
    },

    extractCSS: process.env.NODE_ENV === 'production'
  }

  // ...
}
```

With the above setting,  you can import components from `sefirot`.

```vue
<template>
  <div>
    <SButton label="BUTTON" />
  </div>
</template>

<script>
import SButton from 'sefirot/components/buttons/SButton'

export default {
  components: {
    SButton
  }
}
</script>
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
$ npm run coverage
```

Generate test coverage in `coverage` directory.

## License

Sefirot is open-sourced software licensed under the [MIT license](LICENSE.md).
