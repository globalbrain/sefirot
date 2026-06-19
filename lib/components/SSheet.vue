<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { ref } from 'vue'

export interface Props {
  open: boolean
  closable?: boolean
  position?: 'right' | 'left'
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  closable: true,
  position: 'right',
  width: '480px'
})

const emit = defineEmits<{
  close: []
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

onKeyStroke('Escape', () => {
  if (props.open && props.closable) {
    emit('close')
  }
})
</script>

<template>
  <Teleport to="#sefirot-modals">
    <Transition name="s-sheet">
      <div
        v-if="open"
        ref="el"
        class="SSheet"
        :class="[`pos-${position}`]"
        @mousedown="onClick"
      >
        <div class="panel" :style="{ width }">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.SSheet {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-sheet);
  display: flex;
  padding: 8px;
  transition: opacity 0.25s;
}

.SSheet.pos-right { justify-content: flex-end; }
.SSheet.pos-left { justify-content: flex-start; }

.SSheet.s-sheet-enter-from,
.SSheet.s-sheet-leave-to {
  opacity: 0;
}

.panel {
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 16px);
  height: 100%;
  border: 1px solid var(--c-divider);
  border-radius: 12px;
  background-color: var(--c-bg-1);
  box-shadow: var(--shadow-depth-3);
  transition: transform 0.25s, opacity 0.25s;
  overflow: hidden;
}

.SSheet.pos-right.s-sheet-enter-from .panel,
.SSheet.pos-right.s-sheet-leave-to .panel {
  opacity: 0;
  transform: translateX(16px);
}

.SSheet.pos-left.s-sheet-enter-from .panel,
.SSheet.pos-left.s-sheet-leave-to .panel {
  opacity: 0;
  transform: translateX(-16px);
}
</style>
