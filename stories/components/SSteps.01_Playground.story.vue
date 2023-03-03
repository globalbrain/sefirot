<script setup lang="ts">
import SSteps from 'sefirot/components/SSteps.vue'
import type { Step } from 'sefirot/composables/Step'

const steps: Step[] = [
  { status: 'done', text: 'Create account' },
  { status: 'done', text: 'Profile' },
  { status: 'active', text: 'Theme' },
  { status: 'upcoming', text: 'Preview' },
  { status: 'upcoming', text: 'Final check' }
]
</script>

<template>
  <Board
    title="Components / SSteps / 01. Playground"
  >
    <SSteps :steps="steps" />
  </Board>
</template>
