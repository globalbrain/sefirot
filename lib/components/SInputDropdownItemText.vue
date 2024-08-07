<script setup lang="ts">
import IconX from '~icons/ph/x-bold'

export type Size = 'mini' | 'small' | 'medium'

defineProps<{
  size: Size
  label: string
  value: any
  removable: boolean
  disabled: boolean
}>()

defineEmits<{
  (e: 'remove', value: any): void
}>()
</script>

<template>
  <div class="SInputDropdownItemText" :class="[size, { disabled, removable }]">
    <p class="text">{{ label }}</p>

    <div v-if="!disabled && removable" class="remove" role="button" @click.stop="$emit('remove', value)">
      <div class="remove-box">
        <IconX class="remove-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.SInputDropdownItemText {
  display: flex;
  align-items: center;
  border: 1px solid var(--c-border-mute-1);
  background-color: var(--c-bg-mute-1);
}

.text {
  margin: 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.remove {
  display: flex;
  justify-content: center;
  align-items: center;
}

.remove-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: var(--c-text-2);
  transition: color 0.25s, background-color 0.25s;

  .remove:hover & {
    color: var(--c-text-1);
    background-color: var(--c-bg-mute-3);
  }
}

.SInputDropdownItemText.mini {
  gap: 2px;
  border-radius: 12px;
  padding: 0 8px;
  height: 24px;

  &.removable {
    padding: 0 0 0 8px;
  }

  &.disabled {
    padding: 0 10px;
  }

  .remove {
    width: 23px;
    height: 23px;
  }

  .remove-box {
    width: 20px;
    height: 20px;
  }

  .remove-icon {
    width: 12px;
    height: 12px;
  }
}

.SInputDropdownItemText.small {
  border-radius: 14px;
  padding: 0 12px;
  height: 28px;

  &.removable {
    padding: 0 0 0 12px;
  }

  &.disabled {
    padding: 0 12px;
  }

  .remove {
    width: 26px;
    height: 26px;
  }

  .remove-box {
    width: 20px;
    height: 20px;
  }

  .remove-icon {
    width: 12px;
    height: 12px;
  }
}

.SInputDropdownItemText.medium {
  border-radius: 16px;
  padding: 0 12px;
  height: 32px;

  &.removable {
    padding: 0 0 0 12px;
  }

  &.disabled {
    padding: 0 12px;
  }

  .remove {
    width: 26px;
    height: 26px;
  }

  .remove-box {
    width: 20px;
    height: 20px;
  }

  .remove-icon {
    width: 12px;
    height: 12px;
  }
}
</style>
