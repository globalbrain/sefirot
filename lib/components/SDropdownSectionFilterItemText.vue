<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="SDropdownSectionFilterItemText">
    {{ label }}
  </span>
</template>

<style scoped lang="postcss">
.SDropdownSectionFilterItemText {
  padding-left: 8px;
  line-height: 32px;
  font-size: 12px;
  font-weight: 500;
}
</style>
