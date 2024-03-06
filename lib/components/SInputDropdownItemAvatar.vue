<script setup lang="ts">
import IconX from '@iconify-icons/ph/x-bold'
import SAvatar from './SAvatar.vue'
import SIcon from './SIcon.vue'

export type Size = 'mini' | 'small' | 'medium'

defineProps<{
  size: Size
  label: string
  image?: string | null
  value: any
  removable: boolean
  disabled: boolean
}>()

defineEmits<{
  (e: 'remove', value: any): void
}>()

const avatarSizeDict = {
  mini: 'nano',
  small: 'mini',
  medium: 'mini'
} as const
</script>

<template>
  <div class="SInputDropdownItemAvatar" :class="[size, { disabled, removable }]">
    <div class="user">
      <div class="avatar">
        <SAvatar :size="avatarSizeDict[size]" :avatar="image" :name="label" />
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
  align-items: center;
  border: 1px solid var(--c-border-mute-1);
  background-color: var(--c-bg-mute-1);
}

.user {
  display: flex;
  align-items: center;
}

.avatar {
  display: flex;
  align-items: center;
}

.name {
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
    background-color: var(--c-bg-mute-2)
  }
}

.SInputDropdownItemAvatar.mini {
  gap: 2px;
  border-radius: 12px;
  padding: 0 8px 0 0;
  height: 24px;

  .avatar {
    padding: 0 0 0 1px;
  }

  .name {
    margin-left: 6px;
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

.SInputDropdownItemAvatar.small {
  border-radius: 14px;
  padding: 0 12px 0 0;
  height: 28px;

  .avatar {
    padding: 0 0 0 1px;
  }

  .name {
    margin-left: 6px;
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

.SInputDropdownItemAvatar.medium {
  border-radius: 16px;
  padding: 0 12px 0 0;
  height: 32px;

  .avatar {
    padding: 0 0 0 4px;
  }

  .name {
    margin-left: 6px;
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
