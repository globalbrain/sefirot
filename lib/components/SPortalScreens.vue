<template>
  <div class="SPortalScreens">
    <portal-target name="screen" />
  </div>
</template>

<script>
export default {
  computed: {
    screenName() {
      return this.$store.state.screen.name
    }
  },

  watch: {
    screenName(value) {
      value === null ? this.closeScreen() : this.openScreen()
    },

    $route() {
      this.$store.dispatch('screen/close')
    }
  },

  methods: {
    openScreen() {
      document.body.style.paddingRight = `${this.scrollBarWidth()}px`
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
    },

    closeScreen() {
      setTimeout(() => {
        const scrollY = document.body.style.top

        document.body.style.paddingRight = null
        document.body.style.position = null
        document.body.style.top = null

        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }, 300)
    },

    scrollBarWidth() {
      return window.innerWidth - document.documentElement.clientWidth
    }
  }
}
</script>
