<template>
  <div>
    <SPortalModals />

    <SWindow
      name="s-window-full"
      title="The title for the window."
      lead="The lead text"
      :actions="actions"
    >
      <p>This is the content for the window.</p>
    </SWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SPortalModals from 'sefirot/components/SPortalModals.vue'
import SWindow from 'sefirot/components/SWindow.vue'

export default defineComponent({
  components: {
    SPortalModals,
    SWindow
  },

  data() {
    return {
      actions: [
        { type: 'mute', label: 'DISMISS', callback: (this as any).close }
      ]
    }
  },

  methods: {
    close() {
      this.$store.dispatch('window/close')
    }
  }
})
</script>
