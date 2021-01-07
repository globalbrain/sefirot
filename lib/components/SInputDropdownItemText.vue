<template>
  <div class="SInputDropdownItemText">
    <p class="text">{{ item.text }}</p>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Item } from '../composables/Dropdown'

export default defineComponent({
  props: {
    item: { type: Object as PropType<Item>, required: true }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.text {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
}
</style>
