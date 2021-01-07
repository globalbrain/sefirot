<template>
  <div class="ComponentsIndex" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware({ redirect }) {
    return redirect('/components/buttons')
  },

  head: {
    title: 'Components'
  }
})
</script>
