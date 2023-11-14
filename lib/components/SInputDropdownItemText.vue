<script setup lang="ts">
import IconX from '@iconify-icons/ph/x'
import SIcon from './SIcon.vue'

defineProps<{
  label: string
  value: string | number | boolean
  removable: boolean
  disabled: boolean
}>()

defineEmits<{
  (e: 'remove', value: string | number | boolean): void
}>()
</script>

<template>
  <div class="SInputDropdownItemText" :class="{ disabled, removable }">
    <p class="text">{{ label }}</p>

    <div v-if="!disabled && removable" class="remove" role="button" @click.stop="$emit('remove', value)">
      <div class="remove-box">
        <SIcon :icon="IconX" class="remove-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.SInputDropdownItemText {
  display: flex;
  border: 1px solid var(--c-divider);
  border-radius: 14px;
  padding: 0 12px;
  background-color: var(--c-bg-mute);
}

.SInputDropdownItemText.removable {
  padding: 0 0 0 12px;
}

.SInputDropdownItemText.disabled {
  padding: 0 10px;
  background-color: var(--c-gray-light-4);

  .text {
    color: var(--c-text-2);
  }
}

.dark .SInputDropdownItemText.disabled {
  background-color: var(--c-gray-dark-2);
}

.text {
  margin: 0;
  line-height: 26px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.remove {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
}

.remove-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  color: var(--c-text-2);
  transition: color 0.25s, background-color 0.25s;

  .remove:hover & {
    color: var(--c-text-1);
    background-color: var(--c-gray-light-3)
  }

  .dark .remove:hover & {
    color: var(--c-text-1);
    background-color: var(--c-gray-dark-3)
  }
}

.remove-icon {
  width: 12px;
  height: 12px;
}
</style>
