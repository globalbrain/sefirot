<script setup lang="ts">
import { type TableHeaderAction } from '../composables/Table'
import SButton from './SButton.vue'

withDefaults(defineProps<TableHeaderAction>(), {
  show: true,
  mode: 'default',
  labelMode: 'neutral'
})
</script>

<template>
  <div v-if="show" class="STableHeaderActionItem">
    <SButton
      size="mini"
      :mode="mode"
      :label="label"
      :label-mode="labelMode"
      @click="onClick"
    />
  </div>
</template>

<style scoped lang="postcss">
.STableHeaderActionItem {
  padding: 10px 0;
}
</style>
