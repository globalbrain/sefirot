<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="SDropdownSectionFilterItemText">
    <span class="text">{{ label }}</span>
  </span>
</template>

<style scoped lang="postcss">
.SDropdownSectionFilterItemText {
  display: inline-block;
  padding: 6px 0;
  line-height: 20px;
}

.text {
  display: inline-block;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
}
</style>
