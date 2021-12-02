<template>
  <article class="SSheet" :class="[size ?? 'medium']">
    <slot :close="close" />
  </article>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'

defineProps<{
  size?: 'small' | 'medium' | 'large'
}>()

const store = useStore()

function close() {
  store.dispatch('modal/close')
}
</script>

<style lang="postcss" scoped>
.SSheet {
  margin: 0 auto;
  border: 1px solid var(--c-divider-light);
  border-radius: 8px;
  background-color: var(--c-bg);
  box-shadow: var(--shadow-depth-3);
  overflow: hidden;
}

.SSheet.small  { max-width: 392px; }
.SSheet.medium { max-width: 512px; }
.SSheet.large  { max-width: 768px; }
</style>
