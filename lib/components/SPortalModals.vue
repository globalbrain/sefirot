<template>
  <transition name="fade">
    <div v-if="isActive" class="SPortalModals">
      <SModal
        v-for="(item, index) in items"
        :key="index"
        :uid="item.uid"
        :show="index === items.length - 1"
        :component="item.component"
        :data="item.data"
        :width="item.options && item.options.width"
        :closable="item.options && item.options.closable"
        @close="uid => close(uid)"
      />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@vue/composition-api'
import { useRoute } from '../composables/Router'
import { useStore } from '../composables/Store'
import SModal from './SModal.vue'

export default defineComponent({
  components: {
    SModal
  },

  setup() {
    const route = useRoute()
    const store = useStore()

    const items = computed(() => store.state.modal.items)
    const hasItem = computed(() => items.value.length > 0)

    const isActive = ref(false)

    watch(hasItem, (value) => {
      value
        ? (isActive.value = true)
        : setTimeout(() => { isActive.value = false }, 250)
    })

    watch(route, closeAll)

    function close(uid: number) {
      store.dispatch('modal/close', uid)
    }

    function closeAll() {
      store.dispatch('modal/closeAll')
    }

    return {
      items,
      hasItem,
      isActive,
      close
    }
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
