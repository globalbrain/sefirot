<template>
  <div class="GuideIndex" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  fetch ({ redirect }) {
    return redirect('/guide/getting-started')
  },

  head: {
    title: 'Guide'
  }
})
</script>
