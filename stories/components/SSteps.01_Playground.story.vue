<script setup lang="ts">
import SSteps from 'sefirot/components/SSteps.vue'
import { type Step } from 'sefirot/composables/Step'

const title = 'Components / SPill / 03. Types and Modes'

const steps: Step[] = [
  { status: 'done', text: 'Create account' },
  { status: 'done', text: 'Profile' },
  { status: 'active', text: 'Theme' },
  { status: 'upcoming', text: 'Preview' },
  { status: 'upcoming', text: 'Final check' }
]
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <SSteps :steps="steps" />
    </Board>
  </Story>
</template>
