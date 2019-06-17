<template>
  <div class="SPortalModals">
    <SDialog />

    <modal-portal />
  </div>
</template>

<script>
import SDialog from '../dialogs/SDialog'

export default {
  components: {
    SDialog
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

  methods: {
    openModal (name) {
      const body = document.getElementsByTagName('body')[0]

      body.classList.add('modal-open')

      this.$modal.push(name)
    },

    closeModal () {
      const body = document.getElementsByTagName('body')[0]

      this.$modal.pop()

      setTimeout(() => {
        body.classList.remove('modal-open')
      }, 300)
    }
  }
}
</script>
