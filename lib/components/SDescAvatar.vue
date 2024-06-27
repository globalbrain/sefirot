<script setup lang="ts">
import { computed } from 'vue'
import SAvatar from './SAvatar.vue'
import SDescEmpty from './SDescEmpty.vue'

export interface Avatar {
  avatar?: string | null
  name?: string | null
}

const props = withDefaults(defineProps<{
  avatar?: Avatar | Avatar[] | null
  dir?: 'column' | 'row'
}>(), {
  dir: 'column'
})

const _avatar = computed(() => {
  if (!props.avatar) {
    return null
  }

  return Array.isArray(props.avatar) ? props.avatar : [props.avatar]
})
</script>

<template>
  <div v-if="_avatar?.length" class="SDescAvatar" :class="[dir]">
    <div v-for="a, i in _avatar" :key="i" class="value">
      <SAvatar
        size="nano"
        :avatar="a.avatar"
        :name="a.name"
      />
      <span v-if="a.name" class="name">
        {{ a.name }}
      </span>
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.SDescAvatar {
  display: flex;
  flex-wrap: wrap;
}

.SDescAvatar.column {
  flex-direction: column;
  gap: 4px;
}

.SDescAvatar.row {
  flex-direction: row;
  gap: 4px 12px;
}

.value {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
}

.name {
  line-height: 24px;
  font-size: 14px;
}
</style>
