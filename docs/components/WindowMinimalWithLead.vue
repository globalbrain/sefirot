<template>
  <SWindow
    class="StorySWindowMinimalWithLead"
    name="story-modals-s-window-minimal-with-lead"
    title="The title for the window."
    lead="This is the lead text."
    :actions="actions"
  >
    <p class="text">This is the content for the window.</p>
  </SWindow>
</template>

<script>
import SWindow from '@@/lib/components/SWindow'

export default {
  components: {
    SWindow
  },

  data () {
    return {
      actions: [
        { type: 'mute', label: 'DISMISS', callback: this.close },
        { type: 'primary', label: 'CLOSE WINDOW', callback: this.close }
      ]
    }
  },

  methods: {
    close () {
      this.$store.dispatch('window/close')
    }
  }
}
</script>

<style lang="postcss" scoped>
.text {
  margin: 0;
  text-align: center;
}
</style>
