<template>
  <div class="GuideIndex" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  fetch ({ redirect }) {
    return redirect('/guide/getting-started')
  },

  head: {
    title: 'Guide'
  }
})
</script>
