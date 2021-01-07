<template>
  <portal to="modal">
    <transition name="fade" mode="out-in" appear>
      <div v-if="show" :key="id" class="SModalBase" @click="close">
        <slot />
      </div>
    </transition>
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

    const id = computed(() => store.state.modal.id)
    const show = computed(() => props.name === store.state.modal.name)

    function close(): void {
      props.closable && store.dispatch('modal/close')
    }

    return {
      id,
      show,
      close
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SModalBase {
  transition: all .25s;
}

.SModalBase.fade-enter-active,
.SModalBase.fade-leave-active {
  transition: opacity .25s, transform .25s;
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
