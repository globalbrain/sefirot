<template lang="md">
# Icons

Sefirot comes with a handful of icons. All icons are from the famous [Feather](https://feathericons.com/) icons. The difference is that the icon stroke is converted to a path, so use `fill` to control the color of the icons.

All icons can be imported from under `@globalbrain/sefirot/lib/components/icons` directory, with prefixed by `SIcon`. For example, you can import `ArrowUp` icon at `@globalbrain/sefirot/lib/components/icons/SIconArrowUP`.

<StoryIconsShowcase />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryIconsShowcase from '@/components/StoryIconsShowcase.vue'

export default defineComponent({
  components: {
    StoryIconsShowcase
  },

  scrollToTop: true,

  head: {
    title: 'Icons'
  }
})
</script>
