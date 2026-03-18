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
</script>

<template>
  <Teleport to="#sefirot-modals">
    <Transition name="fade">
      <div v-if="open" ref="el" class="SModal" @mousedown="onClick">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.SModal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-backdrop);
  background-color: rgba(0, 0, 0, 0.8);
  transition: opacity 0.25s;
  overflow: hidden;
  overflow-y: auto;
}

.SModal.fade-enter-from,
.SModal.fade-leave-to {
  opacity: 0;
}

.SModal :deep(> .SCard) {
  margin: 12px 12px 128px;
  box-shadow: var(--shadow-depth-3);
  transition: opacity 0.25s, transform 0.25s;

  @media (min-width: 512px) {
    margin: 24px 24px 128px;
  }

  @media (min-width: 768px) {
    margin: 48px 48px 128px;
  }

  &.small {
    @media (min-width: 560px) {
      margin: 24px auto 128px;
      max-width: 512px;
    }

    @media (min-width: 768px) {
      margin: 48px auto 128px;
    }
  }

  &.medium {
    @media (min-width: 736px) {
      margin: 48px auto 128px;
      max-width: 640px;
    }
  }

  &.large {
    @media (min-width: 864px) {
      margin: 48px auto 128px;
      max-width: 768px;
    }
  }

  &.xlarge {
    @media (min-width: 1056px) {
      margin: 48px auto 128px;
      max-width: 960px;
    }
  }

  &.xxlarge {
    @media (min-width: 1248px) {
      margin: 48px auto 128px;
      max-width: 1152px;
    }
  }
}

.SModal.fade-enter-from :deep(> .SCard),
.SModal.fade-leave-to :deep(> .SCard) {
  opacity: 0;
  transform: translateY(8px);
}
</style>
