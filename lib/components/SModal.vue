<template>
  <transition name="fade" :duration="250" appear>
    <div ref="el" class="SModal" @click="closeIfClosable">
      <transition name="fade">
        <div v-show="show" class="SModal-content" :style="contentStyles">
          <component
            :is="resolvedComponent"
            :if="resolvedComponent"
            v-bind="data"
            @close="close"
          />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { defineComponent, ref, computed, onMounted, onUnmounted } from '@vue/composition-api'
import { SyntheticMouseEvent } from '../types/Utils'

export default defineComponent({
  props: {
    component: { type: [Object, Function], default: () => ({}) },
    data: { type: Object, default: () => ({}) },
    uid: { type: Number, default: null },
    show: { type: Boolean, required: true },
    width: { type: String, default: 'auto' },
    closable: { type: Boolean, default: true }
  },

  setup(props, { emit }) {
    const el = ref<Element | null>(null)
    const resolvedComponent = ref<any>(null)

    props.component instanceof Function
      ? props.component().then((module: any) => { resolvedComponent.value = module.default })
      : (resolvedComponent.value = props.component)

    const contentStyles = computed(() => ({
      maxWidth: props.width
    }))

    onMounted(lock)
    onUnmounted(release)

    function close() {
      emit('close', props.uid)
    }

    function closeIfClosable(e: SyntheticMouseEvent): void {
      if (props.closable) {
        if (!isDescendant(e.target)) {
          close()
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

    function lock(): void {
      disableBodyScroll(el.value!, { reserveScrollBarGap: true })
    }

    function release(): void {
      enableBodyScroll(el.value!)
    }

    return {
      el,
      contentStyles,
      resolvedComponent,
      close,
      closeIfClosable
    }
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
