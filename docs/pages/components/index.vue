<template>
  <div class="ComponentsIndex" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  fetch ({ redirect }) {
    return redirect('/components/buttons')
  },

  head: {
    title: 'Components'
  }
})
</script>
