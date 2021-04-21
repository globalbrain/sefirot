<template>
  <transition name="fade" :duration="250" appear>
    <div class="SModal" @click="closeIfClosable">
      <transition name="fade">
        <div v-show="show" class="SModal-content" :style="contentStyles" >
          <component
            :if="resolvedComponent"
            :is="resolvedComponent"
            v-bind="data"
            @close="close"
          />
        </div>
      </transition>
    </div>
  </transition>
<!--     <template v-if="mount">
      <transition name="fade" mode="out-in" appear>
        <div v-show="show" :key="name" class="SModalBase" :class="{ first }" @click="close">
          <slot />
        </div>
      </transition>
    </template> -->
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from '@vue/composition-api'
import { SyntheticMouseEvent } from '../types/Utils'
import { useStore } from '../composables/Store'

export default defineComponent({
  props: {
    component: null,
    data: { type: Object, default: () => ({}) },
    show: { type: Boolean, required: true },
    width: { type: String, default: 'auto' },
    closable: { type: Boolean, default: true }
    // name: { type: String, required: true },
    // closable: { type: Boolean, default: true }
  },

  setup(props, { emit }) {
    const contentStyles = computed(() => ({
      maxWidth: props.width
    }))

    const resolvedComponent = ref(null)

    props.component instanceof Function
      ? props.component().then(module => { resolvedComponent.value = module.default })
      : (resolvedComponent.value = props.component)

    function close() {
      emit('close')
    }

    function closeIfClosable(e: SyntheticMouseEvent): void {
      if (props.closable) {
        if (!isDescendant(e.target)) {
          emit('close')
        }
      }
    }

    function isDescendant(el: Element): boolean {
      if (el.classList && el.classList.contains('SModal')) {
        return false
      }

      const parent = document.getElementsByClassName('SModal-content')[0]

      return parent && parent.contains(el)
    }

    return {
      contentStyles,
      resolvedComponent,
      close,
      closeIfClosable
    }

    // const store = useStore()

    // const first = computed(() => store.state.modal.first)
    // const mount = computed(() => store.state.modal.history.some(h => h.name === props.name))
    // const show = computed(() => props.name === store.state.modal.name)

    // function close(e: SyntheticMouseEvent): void {
    //   if (props.closable) {
    //     if (!isDescendant(e.target)) {
    //       store.dispatch('modal/close')
    //     }
    //   }
    // }

    // function isDescendant(el: Element): boolean {
    //   if (el.classList && el.classList.contains('SModalBase')) {
    //     return false
    //   }

    //   const parent = document.getElementsByClassName('modal-content')[0]

    //   if (parent && parent.contains(el)) {
    //     return true
    //   }

    //   return false
    // }

    // return {
    //   first,
    //   mount,
    //   show,
    //   close
    // }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SModal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  padding: 32px 16px 96px;
  overflow: hidden;
  overflow-y: auto;

  @media (min-width: 768px) {
    padding: 48px 24px 96px;
  }
}

.SModal.fade-enter-active .SModal-content,
.SModal.fade-leave-active .SModal-content,
.SModal-content.fade-enter-active,
.SModal-content.fade-leave-active {
  transition: opacity .25s, transform .25s;
}

.SModal.fade-enter-active .SModal-content,
.SModal-content.fade-enter-active {
  transition-delay: .15s;
}

.SModal.fade-enter .SModal-content,
.SModal-content.fade-enter {
  opacity: 0;
  transform: translateY(8px);
}

.SModal.fade-leave-to .SModal-content,
.SModal-content.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.SModal-content {
  margin: 0 auto;
  transition: opacity .25s, transform .25s;
}
</style>
