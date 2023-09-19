<script setup lang="ts">
import { type TableAction } from '../composables/Table'
import SButton from './SButton.vue'

withDefaults(defineProps<TableAction>(), {
  show: true,
  mode: 'mute',
  labelMode: 'neutral'
})
</script>

<template>
  <template v-if="show">
    <div class="STableHeaderActionItem">
      <SButton
        size="mini"
        :mode="mode"
        :label="label"
        :label-mode="labelMode"
        @click="onClick"
      />
    </div>
  </template>
</template>

<style scoped lang="postcss">
.STableHeaderActionItem {
  padding: 10px 0;
}
</style>
