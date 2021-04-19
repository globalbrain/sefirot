<template lang="md">
# Getting Started

These are the instructions to get Sefirot set-up and running in your project. Remember that Sefirot doesn't ship with pre-built files by design, so you must compile the code in your project.

## Installation

Sefirot can be installed in your project by running the following command:

With npm:

```bash
$ npm install @globalbrain/sefirot
```

Or with Yarn:

```bash
$ yarn add @globalbrain/sefirot
```

Sefirot is written in TypeScript and uses the Composition API. Ensure your build system is capable of supporting both.

## Using Components

To begin using the components, you should import them directly from `@globalbrain/sefirot/lib/components`.

```vue
<template>
  <div>
    <SButton label="BUTTON" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  }
})
</script>
```

Sefirot doesn't ship with pre-built files by design, so you must compile the code in your project. Please follow the instructions below to configure your build system appropriately.

## Build Configuration

Sefirot assumes you have your CSS placed in the `@/assets/styles` directory. Make sure to copy Sefirot styles to your project to the exact location.

To copy CSS files, run the following command:

```bash
$ cp ./node_modules/@globalbrain/sefirot/lib/assets/styles ./assets/
```

Sefirot uses postcss, and requires some plugins to work – namely [postcss-nested](https://github.com/postcss/postcss-nested) and [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties). Ensure these are installed and included in your build config.

For example, using [Nuxt.js](https://nuxtjs.org/), you should have in place the following config options:

```ts
// nuxt.config.ts
{
  build: {
    transpile: ['@globalbrain/sefirot'],

    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-custom-properties': {},
      }
    }
  },

  css: ['@/assets/styles/bootstrap']
}
```

## Shorten Import Statements

Writing lengthy import statements can be considered counter-productive. To reduce boilerplate and lengthy import statements, you can set up a Webpack alias.

For example, you can configure an alias to go from this:

```ts
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
```

To this:

```ts
import SButton from 'sefirot/components/SButton.vue'
```

For example, using Nuxt.js, you can configure an alias by extending the Webpack config:

```ts
// nuxt.config.ts
{
  build: {
    extend(config) {
      if (config.resolve?.alias) {
        config.resolve.alias.sefirot = '@globalbrain/sefirot/lib'
      }
    }
  }
}
```
