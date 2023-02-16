<script setup lang="ts">
import SAvatar from './SAvatar.vue'

defineProps<{
  label: string
  image?: string | null
}>()
</script>

<template>
  <span class="SDropdownSectionFilterItemAvatar">
    <div class="avatar">
      <SAvatar size="nano" :avatar="image" :name="label" />
    </div>
    <span class="name">{{ label }}</span>
  </span>
</template>

<style scoped lang="postcss">
.SDropdownSectionFilterItemAvatar {
  display: flex;
  align-items: center;
  padding-right: 16px;
  min-height: 32px;
}

.avatar {
  flex-shrink: 0;
}

.name {
  display: inline-block;
  padding-left: 8px;
  font-size: 12px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
