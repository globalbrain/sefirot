<script setup lang="ts">
import { computed } from 'vue'
import { type TableCellAvatarsOption } from '../composables/Table'
import SAvatar from './SAvatar.vue'

const props = defineProps<{
  value?: any
  record?: any
  avatars: TableCellAvatarsOption[] | ((value: any, record: any) => TableCellAvatarsOption[])
  color?: 'neutral' | 'soft' | 'mute'
}>()

const _avatars = computed(() => {
  return typeof props.avatars === 'function'
    ? props.avatars(props.value, props.record)
    : props.avatars
})

const displayAvatars = computed(() => {
  return _avatars.value.slice(0, 3)
})

const names = computed(() => {
  if (_avatars.value.length === 0) {
    return null
  }

  if (_avatars.value.length === 1) {
    return _avatars.value[0].name
  }

  if (_avatars.value.length === 2) {
    return `${_avatars.value[0].name}, ${_avatars.value[1].name}`
  }

  return `${_avatars.value[0].name}, ${_avatars.value[1].name} +${_avatars.value.length - 2}`
})
</script>

<template>
  <div class="STableCellAvatars" :class="[color]">
    <div class="container">
      <div class="avatars">
        <div v-for="(avatar, index) in displayAvatars" :key="index" class="avatar">
          <div class="avatar-box">
            <SAvatar size="mini" :avatar="avatar.image" :name="avatar.name" />
          </div>
        </div>
      </div>
      <div class="names">
        {{ names }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.STableCellAvatars {
  min-height: 40px;
}

.container {
  display: flex;
  gap: 16px;
  padding: 6px 16px 6px 12px;
}

.avatars {
  display: flex;
}

.avatar {
  position: relative;
  width: 20px;

  &:nth-child(1) { z-index: 30; }
  &:nth-child(2) { z-index: 20; }
  &:nth-child(3) { z-index: 10; }
}

.avatar-box {
  border: 2px solid var(--c-bg-elv-up);
  border-radius: 50%;
  width: 28px;

  .row:hover & {
    border: 2px solid var(--c-bg-elv);
  }
}

.names {
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;

  .STableCellAvatars.soft & { color: var(--c-text-2); }
  .STableCellAvatars.mute & { color: var(--c-text-3); }
}
</style>
