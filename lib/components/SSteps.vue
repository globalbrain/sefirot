<template>
  <div class="SSteps">
    <SStep
      v-for="(step, index) in steps"
      :key="index"
      class="item"
      :style="{ width }"
      :bar-left="getBarLeftMode(index)"
      :bar-right="getBarRightMode(index)"
      v-bind="step"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { Step, BarMode } from '../composables/Step'
import SStep from './SStep.vue'

const props = defineProps({
  steps: { type: Array as PropType<Step[]>, required: true }
})

const width = computed(() => {
  return `calc(100% / ${props.steps.length})`
})

function getBarLeftMode(index: number): BarMode | null {
  if (index === 0) {
    return null
  }

  const current = props.steps[index]
  const prev = props.steps[index - 1]

  return isActive(prev) && isActive(current) ? 'active' : 'mute'
}

function getBarRightMode(index: number): BarMode | null {
  if (index === props.steps.length - 1) {
    return null
  }

  const current = props.steps[index]
  const next = props.steps[index + 1]

  return isActive(current) && isActive(next) ? 'active' : 'mute'
}

function isActive(step: Step): boolean {
  return step.status === 'active' || step.status === 'done'
}
</script>

<style lang="postcss" scoped>
.SSteps {
  display: flex;
}
</style>
