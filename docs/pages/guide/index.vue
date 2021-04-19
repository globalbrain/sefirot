<template>
  <div class="GuideIndex" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware({ redirect }) {
    return redirect('/guide/getting-started')
  },

  head: {
    title: 'Guide'
  }
})
</script>
