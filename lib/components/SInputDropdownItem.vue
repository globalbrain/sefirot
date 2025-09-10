<script setup lang="ts">
import IconX from '~icons/ph/x'
import SAvatar from './SAvatar.vue'
import { type Size } from './SInputBase.vue'

export type { Size }

export type Item = ItemText | ItemAvatar

export interface ItemBase {
  type?: 'text' | 'avatar'
  value: any
}

export interface ItemText extends ItemBase {
  type?: 'text'
  label: string
}

export interface ItemAvatar extends ItemBase {
  type: 'avatar'
  label: string
  image?: string | null
}

defineProps<{
  item: Item | Item[]
  size: Size
  removable: boolean
  disabled: boolean
}>()

defineEmits<{
  remove: [value: any]
}>()
</script>

<template>
  <div class="SInputDropdownItem" :class="[size, { disabled }]">
    <div v-if="Array.isArray(item)" class="many">
      <template v-for="(item, i) in item" :key="i">
        <div v-if="item.type === undefined || item.type === 'text'" class="many-text">
          <div class="many-text-value">{{ item.label }}</div>
          <button
            v-if="removable"
            class="many-text-close"
            @click.stop="$emit('remove', item.value)"
          >
            <IconX class="many-text-close-icon" />
          </button>
        </div>
        <div v-else-if="item.type === 'avatar'" class="many-avatar">
          <div class="many-avatar-body">
            <div class="many-avatar-image"><SAvatar size="fill" :avatar="item.image" /></div>
            <div class="many-avatar-name">{{ item.label }}</div>
          </div>
          <button
            v-if="removable"
            class="many-avatar-close"
            @click.stop="$emit('remove', item.value)"
          >
            <IconX class="many-avatar-close-icon" />
          </button>
        </div>
      </template>
    </div>
    <div v-else class="one">
      <div v-if="item.type === undefined || item.type === 'text'" class="one-text">
        <div class="one-text-value">{{ item.label }}</div>
      </div>
      <div v-else-if="item.type === 'avatar'" class="one-avatar">
        <div class="one-avatar-image"><SAvatar size="fill" :avatar="item.image" /></div>
        <div class="one-avatar-name">{{ item.label }}</div>
      </div>
      <button v-if="removable" class="one-close" @click.stop="$emit('remove', item.value)">
        <IconX class="one-close-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SInputDropdownItem {
  flex-grow: 1;
  width: 100%;
}

.many {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.many-text {
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--c-divider);
  border-radius: 12px;
  padding: 0 10px;
  height: 24px;

  &:has(.many-text-close) {
    padding-right: 4px;
  }
}

.many-text-value {
  line-height: 20px;
  font-size: 12px;
  font-weight: 400;
}

.many-text-close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  color: var(--c-text-2);

  &:hover {
    color: var(--c-text-1);
  }
}

.many-text-close-icon {
  width: 14px;
  height: 14px;
}

.many-avatar {
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--c-divider);
  border-radius: 12px;
  padding: 1px 8px 1px 1px;
  height: 24px;

  &:has(.many-avatar-close) {
    gap: 6px;
    padding-right: 4px;
  }
}

.many-avatar-body {
  display: flex;
  align-items: center;
  gap: 6px;
}

.many-avatar-image {
  width: 20px;
  height: 20px;
}

.many-avatar-name {
  line-height: 20px;
  font-size: 12px;
  font-weight: 400;
}

.many-avatar-close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  color: var(--c-text-2);

  &:hover {
    color: var(--c-text-1);
  }
}

.many-avatar-close-icon {
  width: 14px;
  height: 14px;
}

.one {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.one-text {
  flex-grow: 1;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.one-text-value {
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.one-avatar {
  display: flex;
  align-items: center;
  flex-grow: 1;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.one-avatar-image {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.one-avatar-name {
  flex-grow: 1;
  max-width: 100%;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.one-close {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  color: var(--c-text-2);
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.one-close-icon {
  width: 16px;
  height: 16px;
}

.SInputDropdownItem.sm,
.SInputDropdownItem.mini {
  .many {
    padding: 3px 0 3px 3px;
  }

  .one-text {
    padding-left: 10px;
  }

  .one-text-value {
    font-size: var(--input-font-size, var(--input-mini-font-size));
  }

  .one-avatar {
    gap: 6px;
    padding-left: 7px;
  }
}

.SInputDropdownItem.md {
  .many {
    padding: 5px 0 5px 4px;
  }

  .one-text {
    padding-left: 12px;
  }

  .one-text-value {
    font-size: var(--input-font-size, 14px);
  }

  .one-avatar {
    gap: 8px;
    padding-left: 10px;
  }
}

.SInputDropdownItem.small {
  .many {
    padding: 7px 0 7px 7px;
  }

  .one-text {
    padding-left: 12px;
  }

  .one-text-value {
    font-size: var(--input-font-size, var(--input-small-font-size));
  }

  .one-avatar {
    gap: 8px;
    padding-left: 10px;
  }
}

.SInputDropdownItem.medium {
  .many {
    padding: 11px 0 11px 11px;
  }

  .one-text {
    padding-left: 16px;
  }

  .one-text-value {
    font-size: var(--input-font-size, var(--input-medium-font-size));
  }

  .one-avatar {
    gap: 8px;
    padding-left: 12px;
  }
}
</style>
