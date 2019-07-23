<template>
  <div class="SPortalModals">
    <SDialog />
    <SAlert />

    <modal-portal />
  </div>
</template>

<script>
import SDialog from '../dialogs/SDialog'
import SAlert from '../alerts/SAlert'

export default {
  components: {
    SDialog,
    SAlert
  },

  data () {
    return {
      scrollBarWidth: 17
    }
  },

  computed: {
    modalName () {
      return this.$store.state.modal.name
    }
  },

  watch: {
    modalName (newValue, oldValue) {
      if (newValue === null) {
        this.closeModal()

        return
      }

      if (oldValue !== null) {
        this.$modal.replace(newValue)

        return
      }

      this.openModal(newValue)
    },

    $route () {
      this.$store.dispatch('modal/close')
    }
  },

  mounted () {
    this.getScrollBarWidth()
  },

  methods: {
    openModal (name) {
      this.setStyle()

      document.body.classList.add('modal-open')

      this.$modal.push(name)
    },

    closeModal () {
      this.$modal.pop()

      setTimeout(() => {
        this.removeStyle()

        document.body.classList.remove('modal-open')
      }, 300)
    },

    setStyle () {
      if (!document.body.classList.contains('screen-open')) {
        document.body.style.paddingRight = `${this.scrollBarWidth}px`
      }
    },

    removeStyle () {
      if (!document.body.classList.contains('screen-open')) {
        document.body.style.paddingRight = null

        return
      }

      setTimeout(() => {
        document.body.style.paddingRight = `${this.scrollBarWidth}px`
      }, 100)
    },

    getScrollBarWidth () {
      this.scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    }
  }
}
</script>
