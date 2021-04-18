<template lang="md">
# Placeholders: Blank

Placeholders display preloader until the certain component is loaded. For example, when a component is waiting for the response from the external API service.

<StoryPlaceholderBlankShowcase />

## Description

Any element wrapped with `SPlaceholderBlank` will be hidden, and preloader will be shown until you pass the `loaded` prop to the `SPlaceholderBlank` component.

Especially useful when you want to wait for an asynchronous operation to be completed before a component can be rendered, for example, waiting for an external API call.

When `loaded` prop is `true`, it adds `'loaded'` CSS class to the root element. You may use this class to style your child component. The following example shows that the `p` element will do slide up animation when loading is completed.

```html
<template>
  <SPlaceholderBlank class="my-component" :loaded="loaded">
    <p class="text">...</p>
  </SPlaceholderBlank>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api'
import SPlaceholderBlank from '@globalbrain/sefirot/lib/components/SPlaceholderBlank.vue'

export default defineComponent({
  components: {
    SPlaceholderBlank
  },

  setup() {
    const loaded = ref(false)

    onMounted(() => {
      setTimeout(() => { loaded.value = true }, 3000)
    })

    return {
      loaded
    }
  }
})
</script>

<style lang="postcss" scoped>
.my-component.loaded .text {
  transform: translateY(0);
}

.text {
  transform: translateY(-8px);
  transition: transform .5s;
}
</style>
```

## Examples

<StoryPlaceholderBlankEXPositions />

## API

<SpecProps :props="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryPlaceholderBlankShowcase from '@/components/StoryPlaceholderBlankShowcase.vue'
import StoryPlaceholderBlankEXPositions from '@/components/StoryPlaceholderBlankEXPositions.vue'
import SpecProps from '@/components/SpecProps.vue'
import { useProps } from '@/composables/Props'

export default defineComponent({
  components: {
    StoryPlaceholderBlankShowcase,
    StoryPlaceholderBlankEXPositions,
    SpecProps
  },

  scrollToTop: true,

  setup() {
    const props = useProps([
      {
        name: 'loaded',
        type: 'Boolean',
        required: true,
        default: '—',
        description: 'Whether the content is loaded or not.'
      },
      {
        name: 'loaderPosition',
        type: 'String',
        required: false,
        default: "'left'",
        description: "Define where to show preloader against the element. The acceptable values are `'left'`, `'center'`, and `'right'`."
      }
    ])

    return {
      props
    }
  },

  head: {
    title: 'Placeholders: Blank'
  }
})
</script>
