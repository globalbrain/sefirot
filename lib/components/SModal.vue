<script setup lang="ts">
defineProps<{
  open: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="#sefirot-modals">
    <transition name="fade">
      <div v-if="open" class="SModal" @click="$emit('close')">
        <slot />
      </div>
    </transition>
  </Teleport>
</template>

<style scoped lang="postcss">
.SModal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-backdrop);
  background-color: rgba(0, 0, 0, .8);
  transition: opacity 0.25s;
  overflow: hidden;
  overflow-y: auto;
}

.SModal.fade-enter-from,
.SModal.fade-leave-to {
  opacity: 0;
}
</style>
