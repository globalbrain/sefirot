<template>
  <SWindow
    class="StorySWindowMinimal"
    name="story-modals-s-window-minimal"
    title="The title for the window."
    :actions="actions"
  >
    <p class="text">This is the content for the window.</p>
  </SWindow>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SWindow from '@@/lib/components/SWindow.vue'
import { useStore } from '@@/lib/composables/Store'

export default defineComponent({
  components: {
    SWindow
  },

  setup() {
    const store = useStore()

    const actions = [
      { type: 'mute', label: 'DISMISS', callback: close },
      { type: 'primary', label: 'CLOSE WINDOW', callback: close }
    ]

    function close(): void {
      store.dispatch('window/close')
    }

    return {
      actions,
      close
    }
  }
})
</script>

<style lang="postcss" scoped>
.text {
  margin: 0;
  text-align: center;
}
</style>
