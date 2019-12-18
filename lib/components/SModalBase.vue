<template>
  <portal to="modal">
    <transition name="fade" mode="out-in" appear>
      <VueSimplebar class="SModalBase" :key="id" @click.native="close" v-if="show">
        <div class="content">
          <slot />
        </div>
      </VueSimplebar>
    </transition>
  </portal>
</template>

<script>
import VueSimplebar from 'simplebar-vue'

export default {
  components: {
    VueSimplebar
  },

  props: {
    name: { type: String, required: true },
    closable: { type: Boolean, default: true }
  },

  computed: {
    id () {
      return this.$store.state.modal.id
    },

    show () {
      return this.name === this.$store.state.modal.name
    }
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
  z-index: var(--z-index-modal);
  height: 100%;
  transition: all .25s;
}

.SModalBase.fade-enter-active .content,
.SModalBase.fade-leave-active .content {
  transition: opacity .25s, transform .25s;
}

.SModalBase.fade-enter .content {
  opacity: 0;
  transform: translateY(8px);
}

.SModalBase.fade-leave-to .content {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
