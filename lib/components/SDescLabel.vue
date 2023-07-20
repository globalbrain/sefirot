<script setup lang="ts">
defineProps<{
  value?: string | null
}>()
</script>

<template>
  <div class="SDescLabel">
    <div class="value">
      <slot v-if="$slots.default" />
      <template v-else>{{ value }}</template>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDescLabel {
  display: flex;
  height: 24px;
}

.value {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
