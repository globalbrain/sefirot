<template>
  <div class="SPortalModals">
    <transition name="fade">
      <div v-if="show" class="backdrop" />
    </transition>

    <template v-for="dialog in dialogs">
      <SDialog :key="dialog.name" :name="dialog.name" v-bind="dialog.data" />
    </template>

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

    const active = computed(() => store.state.modal.history.length > 0)
    const current = computed(() => store.state.modal.name)

    const dialogs = computed(() => {
      return store.state.modal.history.filter((h: any) => {
        return h.name.startsWith('dialog')
      })
    })

    watch(active, (value) => { value ? open() : close() })

    watch(current, () => {
      setTimeout(() => { el.value.scrollTo(0, 0) }, 250)
    })

    function open(): void {
      show.value = true
      lock()
    }

    function close(): void {
      show.value = false
      release()
    }

    function lock(): void {
      el.value && disableBodyScroll(el.value, { reserveScrollBarGap: true })
    }

    function release(): void {
      el.value.scrollTo(0, 0)
      el.value && clearAllBodyScrollLocks()
    }

    return {
      el,
      show,
      dialogs
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
