<template>
  <div>
    <SPortalModals />

    <SWindow name="s-window-blank" :closable="true">
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
  }
})
</script>
