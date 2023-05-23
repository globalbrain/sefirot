<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
  open: boolean
  closable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  closable: true
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

const el = ref<any>(null)

function onClick(e: MouseEvent) {
  if (!props.closable) {
    return
  }

  if (e.button === 0 && e.target === el.value) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="#sefirot-modals">
    <Transition name="fade">
      <div v-if="open" class="SModal" ref="el" @mousedown="onClick">
        <slot />
      </div>
    </Transition>
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
  transition: opacity 0.5s;
  overflow: hidden;
  overflow-y: auto;
}

.SModal.fade-enter-from,
.SModal.fade-leave-to {
  opacity: 0;
}
</style>
