<script setup lang="ts">
import { computed } from 'vue'
import { type TableCellAvatarsOption } from '../composables/Table'
import SAvatar from './SAvatar.vue'

const props = withDefaults(defineProps<{
  value?: any
  record?: any
  avatars: TableCellAvatarsOption[] | ((value: any, record: any) => TableCellAvatarsOption[])
  color?: 'neutral' | 'soft' | 'mute'
  avatarCount?: number
  nameCount?: number
}>(), {
  avatarCount: 2,
  nameCount: 2
})

const _avatars = computed(() => {
  return typeof props.avatars === 'function'
    ? props.avatars(props.value, props.record)
    : props.avatars
})

const displayAvatars = computed(() => {
  return _avatars.value.slice(0, props.avatarCount)
})

const displayNames = computed(() => {
  // If the count is 0, treat it as "disabling" the name display.
  if (props.nameCount === 0) {
    return null
  }

  const slicedAvatars = _avatars.value.slice(0, props.nameCount)

  const names = slicedAvatars.map((avatar) => avatar.name).join(', ')

  if (_avatars.value.length > slicedAvatars.length) {
    return `${names}, +${_avatars.value.length - slicedAvatars.length}`
  }

  return names
})
</script>

<template>
  <div class="STableCellAvatars" :class="[color]">
    <div class="container">
      <div v-if="displayAvatars.length" class="avatars">
        <div
          v-for="(avatar, index) in displayAvatars"
          :key="index"
          class="avatar"
          :style="{ zIndex: 100 - index }"
        >
          <div class="avatar-box">
            <SAvatar size="mini" :avatar="avatar.image" :name="avatar.name" />
          </div>
        </div>
        <div v-if="_avatars.length > avatarCount" class="avatar placeholder">
          <div class="avatar-box" />
        </div>
      </div>
      <div v-if="displayNames" class="names">
        {{ displayNames }}
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
}

.avatar.placeholder {
  margin-left: -8px;

  .avatar-box {
    background-color: var(--c-bg-mute-1);
  }
}

.avatar-box {
  border: 2px solid var(--c-bg-elv-3);
  border-radius: 50%;
  width: 28px;
  height: 28px;

  .row:hover & {
    border: 2px solid var(--c-bg-elv-4);
  }
}

.names {
  line-height: 28px;
  font-size: 12px;
}

.STableCellAvatars.soft .names { color: var(--c-text-2); }
.STableCellAvatars.mute .names { color: var(--c-text-3); }
</style>
