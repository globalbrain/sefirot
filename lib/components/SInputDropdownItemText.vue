<template>
  <div class="SInputDropdownItemText" :class="{ mute, disabled }">
    <p class="text">{{ item.text }}</p>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  mute: { type: Boolean, default: false },
  item: { type: Object as PropType<any>, required: true },
  disabled: { type: Boolean, default: false }
})
</script>

<style lang="postcss" scoped>
.SInputDropdownItemText.mute .text {
  color: var(--input-placeholder);
}

.text {
  margin: 0;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 400;
}
</style>
