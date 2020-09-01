<template lang="md">
# Snackbars

Snackbars provide brief messages about app processes at the bottom of the screen.

<StorySnackbarShowcase />

## Description

The Snakbars are controlled by Vuex. To be able to use Snackbars, you must set up Vuex and Portal component for the Snakbars.

First, let's register the Sefirot Vuex plugin. Here we have an example of installing the plugin in Nuxt.js.

```js
import { Plugin } from 'vuex'
import Sefirot from '@globalbrain/sefirot/lib/store/Sefirot'

export const plugins: Plugin<State>[] = [Sefirot]
```

Next, register the portal component to the top-level component. Probably this could be your layout file.

```html
<template>
  <div class="App">
    <nuxt />

    <SPortalSnackbars />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SPortalSnackbars from '@globalbrain/lib/components/SPortalSnackbars.vue'

export default defineComponent({
  components: {
    SPortalSnackbars
  }
})
</script>
```

Now you're ready to go. You may use Snackbar via `snackbars/push` action.

```js
store.dispatch('snackbars/push', {
  text: 'This is the snackbar message.'
})
```

## Controlling the Timeout

By default, a Snackbar will disappear after 10sec. You can control this timing by passing in `timeout` option to the action. The value is in ms.

```js
store.dispatch('snackbars/push', {
  text: 'This is the snackbar message.',
  timeout: 5000 // <- Disappear after 5sec.
})
```

## Snackbar with Actions

The Snackbar can also have action buttons. You can pass actions through `actions` property when dispatching the Vuex Action.

```js
store.dispatch('snackbars/push', {
  text: 'This is the snackbar message.',
  actions: [
    { type: 'mute', label: 'MUTE ACTION', callback: () => {} },
    { type: 'text', label: 'ACTION', callback: () => {} }
  ]
})
```

Actions will take 3 arguments.

- `type: string` – The type of the button. You can pass the same types as the SButton component takes.
- `label: string` – The label for the button. Again, it's the same as SButton options.
- `callback: Function` – The callback function that should be called when a user clicks the button.
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StorySnackbarShowcase from '@/components/StorySnackbarShowcase.vue'

export default defineComponent({
  components: {
    StorySnackbarShowcase
  },

  head: {
    title: 'Snackbars'
  },

  scrollToTop: true
})
</script>
