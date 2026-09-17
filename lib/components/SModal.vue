<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLayout } from '../composables/Layout'
import { useModalFocus } from '../composables/ModalFocus'
import { provideOverlays, useOverlays } from '../composables/Overlays'
import { useViewport } from '../composables/Viewport'

export interface Props {
  open: boolean
  closable?: boolean
  managed?: boolean
  ariaLabel?: string
  ariaLabelledby?: string
  ariaDescribedby?: string
  initialFocus?: string
}

const props = withDefaults(defineProps<Props>(), {
  closable: true,
  managed: undefined
})

const emit = defineEmits<{
  close: []
}>()

const el = ref<HTMLElement | null>(null)
const layout = useLayout()
const overlays = useOverlays()
const managed = computed(() => props.managed ?? overlays.value)
provideOverlays(managed)
const viewport = useViewport()
const bounds = computed(() => managed.value
  ? ({
      top: `${viewport.value.top}px`,
      left: `${viewport.value.left}px`,
      width: `${viewport.value.width}px`,
      height: `${viewport.value.height}px`
    })
  : undefined)

useModalFocus(computed(() => managed.value ? el.value : null), {
  initialFocus: () => props.initialFocus,
  closable: () => props.closable,
  close: () => emit('close')
})

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
      <div
        v-if="open"
        ref="el"
        class="SModal"
        :class="{ managed }"
        :data-layout="managed ? layout : undefined"
        :style="bounds"
        :role="managed ? 'dialog' : undefined"
        :aria-modal="managed ? true : undefined"
        :aria-label
        :aria-labelledby
        :aria-describedby
        :tabindex="managed ? -1 : undefined"
        @mousedown="onClick"
      >
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
.SModal.managed { overscroll-behavior: contain; }

.SModal.managed :deep(> .SCard) {
  min-width: 0;
  max-width: calc(100% - 24px);
  overflow-wrap: anywhere;
  overflow-x: auto;

  &.small { max-width: min(512px, calc(100% - 24px)); }
  &.medium { max-width: min(640px, calc(100% - 24px)); }
  &.large { max-width: min(768px, calc(100% - 24px)); }
  &.xlarge { max-width: min(960px, calc(100% - 24px)); }
  &.xxlarge { max-width: min(1152px, calc(100% - 24px)); }
}

.SModal.managed[data-layout="mobile"] :deep(> .SCard) {
  margin: max(12px, env(safe-area-inset-top)) auto max(48px, env(safe-area-inset-bottom));
}
</style>
