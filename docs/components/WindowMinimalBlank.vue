<template>
  <SWindow
    class="StorySWindowMinimalBlank"
    name="story-modals-s-window-minimal-blank"
    :closable="true"
  >
    <p class="text">This is the content for the window.</p>
  </SWindow>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SWindow from '@@/lib/components/SWindow.vue'

export default defineComponent({
  components: {
    SWindow
  }
})
</script>

<style lang="postcss" scoped>
.text {
  margin: 0;
  text-align: center;
}
</style>
