<template>
  <header class="SSheetHeader">
    <slot />

    <div v-if="closable" class="close">
      <button class="close-button" @click="close">
        <SIconX class="close-icon" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import SIconX from './icons/SIconX.vue'

defineProps({
  closable: { type: Boolean, default: true }
})

const store = useStore()

function close() {
  store.dispatch('modal/close')
}
</script>

<style lang="postcss" scoped>
.SSheetHeader {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--c-divider-light);
  min-height: 48px;
  background-color: var(--c-bg-soft);
}

.close {
  margin: 0 0 0 auto;
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 47px;
  color: var(--c-text-3);
  transition: color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.close-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
