<script setup lang="ts">
import SDescEmpty from './SDescEmpty.vue'
import SState, { type Mode } from './SState.vue'

export interface State {
  mode?: Mode
  label: string
}

defineProps<{
  state?: State | null
}>()
</script>

<template>
  <div v-if="state" class="SDescState">
    <div class="value">
      <SState as="div" size="mini" :mode="state.mode" :label="state.label" />
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.value {
  display: flex;
  align-items: center;
  height: 24px;
}
</style>
