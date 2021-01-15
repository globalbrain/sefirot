<template>
  <portal to="modal">
    <template v-if="mount">
      <transition name="fade" mode="out-in" appear>
        <div v-show="show" :key="name" class="SModalBase" :class="{ first }" @click="close">
          <slot />
        </div>
      </transition>
    </template>
  </portal>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useStore } from '../composables/Store'

export default defineComponent({
  props: {
    name: { type: String, required: true },
    closable: { type: Boolean, default: true }
  },

  setup(props) {
    const store = useStore()

    const first = computed(() => store.state.modal.first)
    const mount = computed(() => store.state.modal.history.some((h: any) => h.name === props.name))
    const show = computed(() => props.name === store.state.modal.name)

    function close(): void {
      props.closable && store.dispatch('modal/close')
    }

    return {
      first,
      mount,
      show,
      close
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SModalBase {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  min-height: 100vh;
  transition: all .25s;
}

.SModalBase.fade-enter-active,
.SModalBase.fade-leave-active {
  transition: opacity .25s, transform .25s;
}

.SModalBase.fade-enter-active {
  transition-delay: .25s;
}

.SModalBase.first.fade-enter-active {
  transition-delay: 0s;
}

.SModalBase.fade-enter {
  opacity: 0;
  transform: translateY(8px);
}

.SModalBase.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
