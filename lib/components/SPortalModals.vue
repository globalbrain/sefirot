<template>
  <transition name="fade">
    <div v-if="isActive" class="SPortalModals">
      <SModal
        v-for="(item, index) in items"
        :key="index"
        :show="index === items.length - 1"
        :component="item.component"
        :data="item.data"
        :width="item.options && item.options.width"
        :closable="item.options && item.options.closable"
        @close="close"
      />

  <!--     <template v-for="dialog in dialogs">
        <SDialog :key="dialog.name" :name="dialog.name" v-bind="dialog.data" />
      </template>

      <template v-for="alert in alerts">
        <SAlert :key="alert.name" :name="alert.name" v-bind="alert.data" />
      </template>

      <div ref="el" class="modal-content" :class="{ show }">
        <portal-target name="modal" multiple />
      </div> -->
    </div>
  </transition>
</template>

<script lang="ts">
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { useStore } from '../composables/Store'
// import { useRoute } from '../composables/Router'
import SModal from './SModal.vue'
// import SDialog from './SDialog.vue'
// import SAlert from './SAlert.vue'

export default defineComponent({
  components: {
    SModal
    // SDialog,
    // SAlert
  },

  setup() {
    const store = useStore()

    const items = computed(() => store.state.modal.items)
    const hasItem = computed(() => items.value.length > 0)

    const isActive = ref(false)

    watch(hasItem, (value) => {
      value
        ? (isActive.value = true)
        : setTimeout(() => { isActive.value = false }, 250)
    })

    function close() {
      store.dispatch('modal/close')
    }

    return {
      items,
      hasItem,
      isActive,
      close
    }

    // const route = useRoute()

    // const el = ref<Element | null>(null)

    // const show = ref(false)

    // const active = computed(() => store.state.modal.history.length > 0)
    // const current = computed(() => store.state.modal.name)

    // const dialogs = computed(() => {
    //   return store.state.modal.history.filter(h => h.name.startsWith('dialog'))
    // })

    // const alerts = computed(() => {
    //   return store.state.modal.history.filter(h => h.name.startsWith('alert'))
    // })

    // watch(active, (value) => { value ? open() : close() })

    // watch(current, () => {
    //   setTimeout(() => { el.value && el.value.scrollTo(0, 0) }, 250)
    // })

    // watch(route, () => { store.dispatch('modal/close') })

    // function open(): void {
    //   show.value = true
    //   lock()
    // }

    // function close(): void {
    //   show.value = false
    //   release()
    // }

    // function lock(): void {
    //   el.value && disableBodyScroll(el.value, { reserveScrollBarGap: true })
    // }

    // function release(): void {
    //   el.value && el.value.scrollTo(0, 0)
    //   clearAllBodyScrollLocks()
    // }

    // return {
    //   el,
    //   show,
    //   dialogs,
    //   alerts
    // }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SPortalModals {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-backdrop);
  background-color: rgba(0, 0, 0, .8);
}

.SPortalModals.fade-enter-active,
.SPortalModals.fade-leave-active {
  transition: opacity .25s;
}

.SPortalModals.fade-enter,
.SPortalModals.fade-leave-active {
  opacity: 0;
}
</style>
