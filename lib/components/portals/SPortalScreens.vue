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
      value === null ? this.closeScreen() : this.openScreen()
    },

    $route () {
      this.$store.dispatch('screen/close')
    }
  },

  methods: {
    openScreen () {
      document.body.style.paddingRight = `${this.scrollBarWidth()}px`
      document.body.classList.add('screen-open')
    },

    closeScreen () {
      setTimeout(() => {
        document.body.style.paddingRight = null
        document.body.classList.remove('screen-open')
      }, 300)
    },

    scrollBarWidth () {
      return window.innerWidth - document.documentElement.clientWidth
    }
  }
}
</script>
