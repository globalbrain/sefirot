<script setup lang="ts">
import IconX from '@iconify-icons/ph/x'
import SAvatar from './SAvatar.vue'
import SIcon from './SIcon.vue'

defineProps<{
  label: string
  image?: string | null
  value: string | number | boolean
  removable: boolean
  disabled: boolean
}>()

defineEmits<{
  (e: 'remove', value: string | number | boolean): void
}>()
</script>

<template>
  <div class="SInputDropdownItemAvatar" :class="{ disabled, removable }">
    <div class="user">
      <div class="avatar">
        <SAvatar size="nano" :avatar="image" :name="label" />
      </div>
      <p class="name">{{ label }}</p>
    </div>

    <div v-if="!disabled && removable" class="remove" role="button" @click="$emit('remove', value)">
      <div class="remove-box">
        <SIcon :icon="IconX" class="remove-icon" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.SInputDropdownItemAvatar {
  display: flex;
  border: 1px solid var(--c-divider);
  border-radius: 14px;
  padding: 0 12px 0 0;
  background-color: var(--c-bg-mute);
}

.SInputDropdownItemAvatar.removable {
  padding: 0;
}

.SInputDropdownItemUserAvatar.disabled {
  padding: 0 10px 0 0;
  background-color: var(--c-gray-light-4);
}

.user {
  display: flex;
}

.avatar {
  padding: 3px 0 0 3px;
}

.name {
  margin: 0 0 0 8px;
  line-height: 26px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.remove {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2px;
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
