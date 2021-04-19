<template lang="md">
# Contribution

We're really excited that you are interested in contributing to Sefirot. Before submitting your contribution though, please make sure to take a moment and read through the following guidelines.

## Where Is The Code?

Sefirot source code is publicly available on GitHub.

<SButton
  tag="a"
  size="large"
  :icon="iconGitHub"
  label="SEE ON GITHUB"
  href="https://github.com/globalbrain/sefirot"
  target="_blank"
/>

## Code Style Guide

Sefirot follows the official <a href="https://vuejs.org/v2/style-guide/" target="_blank">Vue Style Guide</a>. But always remember to follow the "Golden Rule"&hellip;

> Every line of code should appear to be written by a single person, no matter the number of contributors.<br>
> &mdash; <cite>@mdo</cite>

## Development

```bash
$ yarn serve
```

Serve documentation website at http://localhost:3000.

```bash
$ yarn lint
```

Lint files using a rule of Standard JS.

```bash
$ yarn test
```

Run the tests.

```bash
$ yarn coverage
```

Output test coverage in `coverage` directory.

## License

Sefirot is open-sourced software licensed under the [MIT License](https://raw.githubusercontent.com/globalbrain/sefirot/master/LICENSE.md).
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'

export default defineComponent({
  components: {
    SButton,
    IconGitHub
  },

  scrollToTop: true,

  setup() {
    return {
      iconGitHub: IconGitHub
    }
  },

  head: {
    title: 'Contribution'
  }
})
</script>
