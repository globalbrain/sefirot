<script setup lang="ts">
import IconCaretDown from '~icons/ph/caret-down-bold'
import { type DropdownSection } from '../composables/Dropdown'
import { useFlyout } from '../composables/Flyout'
import SDropdown from './SDropdown.vue'

defineProps<{
  label: string
  state?: 'inactive' | 'active' | 'indicate'
  dropdown: DropdownSection[]
}>()

const { container, isOpen, toggle } = useFlyout()
</script>

<template>
  <div class="STableHeaderMenuItem" ref="container">
    <button class="button" :class="[state]" @click="toggle">
      <span class="label">{{ label }}</span>
      <span v-if="state !== 'indicate'" class="caret">
        <IconCaretDown class="caret-svg" />
      </span>
      <span v-else class="indicator">
        <span class="indicator-dot" />
      </span>
    </button>
    <Transition name="fade">
      <div v-if="isOpen" class="dialog">
        <SDropdown :sections="dropdown" />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="postcss">
.STableHeaderMenuItem {
  position: relative;
}

.button {
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  padding: 6px 7px 6px 9px;
  transition: background-color 0.25s;

  &:hover {
    background-color: var(--c-bg-mute-1);
  }
}

.label {
  font-size: 12px;
  color: var(--c-text-2);
  transition: color 0.25s;

  .button:hover & {
    color: var(--c-text-1);
  }

  .button.active &,
  .button.indicate & {
    color: var(--c-text-1);
  }
}

.caret-svg {
  width: 12px;
  height: 12px;
  color: var(--c-text-2);
  transition: color 0.25s;

  .button:hover & {
    color: var(--c-text-1);
  }
}

.indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
}

.indicator-dot {
  display: block;
  border-radius: 6px;
  width: 6px;
  height: 6px;
  background-color: var(--c-fg-info-1);
}

.dialog {
  position: absolute;
  top: 32px;
  right: 0;
  z-index: var(--z-index-dropdown);
  transition: opacity 0.25s, transform 0.25s;
}

.dialog.fade-enter-from,
.dialog.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
