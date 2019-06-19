<template>
  <div class="SPortalScreens">
    <portal-target name="screen" />
  </div>
</template>

<script>
export default {
  computed: {
    screenName () {
      return this.$store.state.screen.name
    }
  },

  watch: {
    screenName (value) {
      if (value === null) {
        this.closeScreen()

        return
      }

      this.openScreen()
    },

    $route () {
      this.$store.dispatch('screen/close')
    }
  },

  methods: {
    openScreen () {
      const body = document.getElementsByTagName('body')[0]

      body.classList.add('screen-open')
    },

    closeScreen () {
      const body = document.getElementsByTagName('body')[0]

      setTimeout(() => {
        body.classList.remove('screen-open')
      }, 300)
    }
  }
}
</script>
