<template>
  <div>
    <SPortalModals />

    <SWindow name="s-window-blank" :closable="true">
      <p>This is the content for the window.</p>
    </SWindow>
  </div>
</template>

<script>
import SPortalModals from '@/components/portals/SPortalModals'
import SWindow from '@/components/windows/SWindow'

export default {
  components: {
    SPortalModals,
    SWindow
  }
}
</script>
