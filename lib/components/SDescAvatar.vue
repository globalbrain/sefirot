<script setup lang="ts">
import SAvatar from './SAvatar.vue'
import SDescEmpty from './SDescEmpty.vue'

export interface Avatar {
  avatar?: string | null
  name?: string | null
}

defineProps<{
  avatar?: Avatar | null
}>()
</script>

<template>
  <div v-if="avatar" class="SDescAvatar">
    <div class="value">
      <SAvatar
        size="nano"
        :avatar="avatar.avatar"
        :name="avatar.name"
      />
      <span v-if="avatar.name" class="name">
        {{ avatar.name }}
      </span>
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
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
