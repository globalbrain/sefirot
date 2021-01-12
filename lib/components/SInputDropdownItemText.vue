<template>
  <div class="SInputDropdownItemText" :class="{ mute }">
    <p class="text">{{ item.text }}</p>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Item } from '../composables/Dropdown'

export default defineComponent({
  props: {
    mute: { type: Boolean, default: false },
    item: { type: Object as PropType<Item>, required: true }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

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
