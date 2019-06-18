<template>
  <modal
    :name="name"
    :disable-backdrop="true"
    @before-open="$emit('before-open')"
    @opened="$emit('opened')"
    @before-close="$emit('before-close')"
    @closed="$emit('closed')"
  >
    <div class="SModalBase" @click="close">
      <slot />
    </div>
  </modal>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    closable: { type: Boolean, default: true }
  },

  methods: {
    close () {
      this.closable && this.$store.dispatch('modal/close')
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SModalBase {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-backdrop);
  height: 100%;
  overflow: auto;
}
</style>
