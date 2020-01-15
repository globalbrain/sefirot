<template>
  <div>
    <SPortalModals />

    <SWindow name="s-window-blank" :closable="true">
      <p>This is the content for the window.</p>
    </SWindow>
  </div>
</template>

<script>
import SPortalModals from 'sefirot/components/SPortalModals'
import SWindow from 'sefirot/components/SWindow'

export default {
  components: {
    SPortalModals,
    SWindow
  }
}
</script>
