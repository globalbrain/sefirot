<script setup lang="ts">
import { provideCardState } from '../composables/Card'

export type Size = 'small' | 'medium' | 'large'

defineProps<{
  size?: Size
}>()

const { isCollapsed } = provideCardState()
</script>

<template>
  <div class="SCard" :class="[size, { collapsed: isCollapsed }]">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.SCard {
  display: grid;
  gap: 1px;
  border: 1px solid var(--c-divider-2);
  border-radius: 6px;
  background-color: var(--c-gutter);
}

.SCard.collapsed {
  height: 48px;
  overflow: hidden;
}

.SModal > .SCard {
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
}

.SModal.fade-enter-from > .SCard,
.SModal.fade-leave-to > .SCard {
  opacity: 0;
  transform: translateY(8px);
}
</style>
