<template lang="md">
# Contribution

We're really excited that you are interested in contributing to Sefirot. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

## Where Is Code?

Sefirot source code is managed under GitHub. Please visit following GitHub repository to checkout the code.

<SButton
  tag="a"
  size="large"
  :icon="iconGitHub"
  label="SEE ON GITHUB"
  href="https://github.com/globalbrain/sefirot"
  target="_blank"
/>

## Code Style Guide

Sefirot follows official <a href="https://vuejs.org/v2/style-guide/" target="_blank">Vue Style Guide</a>. But always remember to follow the "Golden Rule" below.

> Every line of code should appear to be written by a single person, no matter the number of contributors.<br>
> &mdash; <cite>@mdo</cite>

## Development

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
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'

export default defineComponent({
  components: {
    SButton,
    IconGitHub
  },

  setup () {
    return {
      iconGitHub: IconGitHub
    }
  },

  head: {
    title: 'Contribution'
  },

  scrollToTop: true
})
</script>
