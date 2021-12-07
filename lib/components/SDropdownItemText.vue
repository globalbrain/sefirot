<template>
  <div class="SDropdownItemText">
    <p class="text">{{ item.text }}</p>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineProps({
  item: { type: Object as PropType<any>, required: true }
})
</script>

<style lang="postcss" scoped>
.text {
  margin: 0;
  line-height: 16px;
  font-size: 12px;
  font-weight: 500;
}
</style>
