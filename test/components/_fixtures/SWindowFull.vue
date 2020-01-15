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

<script>
import SPortalModals from 'sefirot/components/SPortalModals'
import SWindow from 'sefirot/components/SWindow'

export default {
  components: {
    SPortalModals,
    SWindow
  },

  data () {
    return {
      actions: [
        { type: 'mute', label: 'DISMISS', callback: this.close }
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
