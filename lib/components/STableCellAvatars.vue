<script setup lang="ts">
import { computed } from 'vue'
import { type TableCellAvatarsOption } from '../composables/Table'
import { type Position } from '../composables/Tooltip'
import SAvatar from './SAvatar.vue'

const props = withDefaults(defineProps<{
  avatars: TableCellAvatarsOption[]
  color?: 'neutral' | 'soft' | 'mute'
  avatarCount?: number
  nameCount?: number
  tooltip?: boolean | { position?: Position }
}>(), {
  avatarCount: 2,
  nameCount: 2
})

const avatarDiff = computed(() => {
  return props.avatars.length - props.avatarCount
})

const displayAvatars = computed(() => {
  return props.avatars.slice(0, props.avatarCount)
})

const nameDiff = computed(() => {
  return props.avatars.length - props.nameCount
})

const displayNames = computed(() => {
  // If the count is 0, treat it as "disabling" the name display.
  if (props.nameCount === 0) {
    return null
  }

  const slicedAvatars = props.avatars.slice(0, props.nameCount)
  const names = slicedAvatars.map((avatar) => avatar.name).join(', ')

  if (nameDiff.value > 0) {
    return `${names}, ...`
  }

  return names
})
</script>

<template>
  <div class="STableCellAvatars" :class="[color]">
    <div class="container">
      <div v-if="displayAvatars.length" class="avatars">
        <div v-for="(avatar, i) in displayAvatars" :key="i" class="avatar">
          <div class="avatar-box">
            <SAvatar size="mini" :avatar="avatar.image" :name="avatar.name" :tooltip />
          </div>
        </div>
        <div v-if="avatarDiff > 0" class="avatar">
          <div class="avatar-box placeholder" :class="{ small: avatarDiff >= 10 }">
            +{{ avatarDiff }}
          </div>
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--c-bg-elv-3);
  border-radius: 50%;
  width: 28px;
  height: 28px;

  .row:hover & {
    border: 2px solid var(--c-bg-elv-4);
  }

  &.placeholder {
    font-size: 10px;
    font-weight: 500;
    color: var(--c-text-2);
    background-color: var(--c-bg-mute-1);
  }

  &.placeholder.small {
    font-size: 9px;
  }
}

.names {
  line-height: 28px;
  font-size: 12px;
}

.STableCellAvatars.soft .names { color: var(--c-text-2); }
.STableCellAvatars.mute .names { color: var(--c-text-3); }
</style>
