<template>
  <transition name="fade">
    <div v-if="isActive" class="SPortalModals">
      <transition-group name="fade" :duration="250" appear>
        <SModal
          v-for="(item, index) in items"
          :key="item.id"
          :id="item.id"
          :show="index === items.length - 1"
          :component="item.component"
          :data="item.data"
          @close="id => close(id)"
        />
      </transition-group>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SModal from './SModal.vue'

const route = useRoute()
const store = useStore()

const items = computed(() => store.state.modal.items)
const hasItem = computed(() => items.value.length > 0)

const isActive = ref(false)

let timer: any

watch(hasItem, (value) => {
  clearTimeout(timer)

  value
    ? (isActive.value = true)
    : (timer = setTimeout(() => { isActive.value = false }, 250))
})

watch(route, closeAll)

function close(id?: number) {
  store.dispatch('modal/close', id)
}

function closeAll() {
  store.dispatch('modal/closeAll')
}
</script>

<style scoped lang="postcss">
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

.SPortalModals.fade-enter-from,
.SPortalModals.fade-leave-to {
  opacity: 0;
}
</style>
