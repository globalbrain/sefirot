<template>
  <div class="SPortalModals">
    <transition name="fade">
      <div v-if="show" class="backdrop" />
    </transition>

    <SDialog />
    <SAlert />

    <div ref="el" class="modal-content" :class="{ show }">
      <portal-target name="modal" multiple />
    </div>
  </div>
</template>

<script lang="ts">
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { useStore } from '../composables/Store'
import SDialog from './SDialog.vue'
import SAlert from './SAlert.vue'

export default defineComponent({
  components: {
    SDialog,
    SAlert
  },

  setup() {
    const store = useStore()

    const el = ref<any>(null)

    const show = ref(false)

    const name = computed(() => store.state.modal.name)

    watch(name, (value, oldValue) => {
      if (value === null) {
        return close()
      }

      oldValue === null && open()
    })

    function open(): void {
      show.value = true
      lock()
    }

    function close(): void {
      setTimeout(() => {
        show.value = false
        release()
      }, 250)
    }

    function lock(): void {
      el.value && disableBodyScroll(el.value, { reserveScrollBarGap: true })
    }

    function release(): void {
      el.value && clearAllBodyScrollLocks()
    }

    return {
      el,
      show
    }
  },

  watch: {
    $route() {
      this.$store.dispatch('modal/close')
    }
  }
})
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

.modal-content {
  display: none;
}

.modal-content.show {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-modal);
  display: block;
  height: 100%;
  overflow-y: auto;
  transition: all .25s;
}
</style>
