<script setup lang="ts">
import { type Mode, type Type } from './SButton.vue'
import SButton from './SButton.vue'

defineProps<{
  type?: Type
  mode?: Mode
  label: string
  loading?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <div class="SSheetFooterAction">
    <SButton
      size="medium"
      :type="type"
      :mode="mode"
      :label="label"
      :loading="loading"
      block
      @click="$emit('click')"
    />
  </div>
</template>

<style scoped lang="postcss">
.SSheetFooterAction {
  min-width: 88px;
}
</style>
