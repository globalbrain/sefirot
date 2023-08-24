<script setup lang="ts">
import { computed } from 'vue'
import { isArray } from '../support/Utils'
import SDescEmpty from './SDescEmpty.vue'
import SPill, { type Mode } from './SPill.vue'

export interface Pill {
  mode?: Mode
  label: string
}

const props = defineProps<{
  pill?: Pill | Pill[] | null
}>()

const pills = computed(() => {
  return props.pill
    ? isArray(props.pill) ? props.pill : [props.pill]
    : null
})
</script>

<template>
  <div v-if="pills && pills.length" class="SDescPill">
    <div class="value">
      <div v-for="pill, index in pills" :key="index" class="pill">
        <SPill tag="div" size="mini" :mode="pill.mode" :label="pill.label" />
      </div>
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.value {
  display: flex;
  gap: 4px 6px;
  flex-wrap: wrap;
}

.pill {
  display: flex;
  align-items: center;
  height: 24px;
}
</style>
