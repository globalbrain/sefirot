<script setup lang="ts">
import SAvatar from './SAvatar.vue'

defineProps<{
  label: string
  image?: string | null
}>()
</script>

<template>
  <span class="SDropdownSectionFilterItemAvatar">
    <SAvatar size="nano" :avatar="image" :name="label" />
    <span class="name">{{ label }}</span>
  </span>
</template>

<style scoped lang="postcss">
.SDropdownSectionFilterItemAvatar {
  display: inline-flex;
  align-items: center;
  padding-left: 8px;
  min-height: 32px;
}

.name {
  display: inline-block;
  padding-left: 8px;
  font-size: 12px;
  font-weight: 500;
}
</style>
