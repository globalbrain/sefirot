<template>
  <SWindow
    class="StorySWindowMinimalBlank"
    name="story-modals-s-window-minimal-blank"
    :closable="true"
  >
    <p class="text">This is the content for the window.</p>
  </SWindow>
</template>

<script>
import SWindow from '@@/lib/components/windows/SWindow'

export default {
  components: {
    SWindow
  }
}
</script>

<style lang="postcss" scoped>
.text {
  margin: 0;
  text-align: center;
}
</style>
