<template>
  <div class="ComponentsIndex" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  fetch ({ redirect }) {
    return redirect('/components/buttons')
  },

  head: {
    title: 'Components'
  }
})
</script>
