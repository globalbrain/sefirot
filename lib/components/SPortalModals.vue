<template>
  <div class="SPortalModals">
    <transition name="fade">
      <div v-if="showBackdrop" class="backdrop" />
    </transition>

    <SDialog />
    <SAlert />

    <portal-target name="modal" multiple />
  </div>
</template>

<script>
import SDialog from './SDialog'
import SAlert from './SAlert'

export default {
  components: {
    SDialog,
    SAlert
  },

  computed: {
    modalName () {
      return this.$store.state.modal.name
    },

    showBackdrop () {
      return this.modalName !== null
    }
  },

  watch: {
    modalName (newValue, oldValue) {
      if (newValue === null) {
        return this.closeScreen()
      }

      oldValue === null && this.openScreen()
    },

    $route () {
      this.$store.dispatch('modal/close')
    }
  },

  methods: {
    openScreen () {
      document.body.style.paddingRight = `${this.scrollBarWidth()}px`
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = 'fixed'
    },

    closeScreen () {
      setTimeout(() => {
        const scrollY = document.body.style.top

        document.body.style.paddingRight = null
        document.body.style.position = null
        document.body.style.top = null

        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }, 300)
    },

    scrollBarWidth () {
      return window.innerWidth - document.documentElement.clientWidth
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-backdrop);
  background-color: rgba(0, 0, 0, .8);
  opacity: 1;
}

.backdrop.fade-enter-active,
.backdrop.fade-leave-active {
  transition: opacity .25s;
}

.backdrop.fade-enter,
.backdrop.fade-leave-active {
  opacity: 0;
}
</style>
