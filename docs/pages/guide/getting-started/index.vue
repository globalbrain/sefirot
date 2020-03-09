<template lang="md">
# Getting Started

This is the instruction to set up Sefirot and running on your project. Remember that by design, Sefirot doesn't ship with pre-built files, so you must compile the code in your project.

## Installation

At first, install Sefirot via npm or yarn.

```bash
# Via NPM.
$ npm install @globalbrain/sefirot

# Via Yarn.
$ yarn add @globalbrain/sefirot
```

Also, Sefirot is written in TypeScript, and uses Composition API. Make sure your build system supports both of them.

To begin using the components, you should directly import them from `lib` directory under the Sefirot package.

```html
<template>
  <div>
    <SButton label="BUTTON" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  }
})
</script>
```

By design, Sefirot doesn't ship with pre-built files, so you must compile the code in your project. Please follow the following instruction to set up your build system.

Sefirot assumes you have your CSS placed at `@/assets/styles` directory. Make sure to copy styles to your project on the same location. To copy CSS files, simply run the following command. The destination directly (`@`) should depend on your project setup.

```bash
$ cp ./node_modules/@globalbrain/sefirot/lib/assets/styles ./assets/
```

To compile Vue Components, you must have appropriate build settings. For example, in [Nuxt.js](https://nuxtjs.org/), you should define the following settings at `nuxt.config.js`. In addition, Sefirot uses postcss plugins, `postcss-nested` and `postcss-custom-properties`. Make sure to define them in your postcss config as well. And the last thing, don't forget to include base bootstrapping global CSS as well.

```ts
const config: Configuration = {
  // ...

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

  // ...
}
```

## Easier Component Import

If you think importing components from `@globalbrain/sefirot/lib` is too long to type, you can set up an alias to reduce the boilerplate. Again, this is an example set up on `nuxt.config.js`.

```ts
const config: Configuration = {
  // ...

  build: {
    // Alias the package path.
    extend (config) {
      if (config.resolve && config.resolve.alias) {
        config.resolve.alias.sefirot = '@globalbrain/sefirot/lib'
      }
    },

    transpile: ['@globalbrain/sefirot'],

    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-custom-properties': {},
      }
    }
  }

  // ...
}
```

With the above setting,  you can import components from `sefirot`.

```html
<template>
  <div>
    <SButton label="BUTTON" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SButton from 'sefirot/components/SButton.vue'

export default defineComponent({
  components: {
    SButton
  }
})
</script>
```
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  head: {
    title: 'Getting Started'
  },

  scrollToTop: true
})
</script>
