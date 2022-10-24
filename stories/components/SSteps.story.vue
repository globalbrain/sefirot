<script setup lang="ts">
import SSteps from 'sefirot/components/SSteps.vue'
import { Step } from 'sefirot/composables/Step'

const steps: Step[] = [
  { status: 'done', text: 'Create account' },
  { status: 'done', text: 'Profile' },
  { status: 'active', text: 'Theme' },
  { status: 'upcoming', text: 'Preview' },
  { status: 'upcoming', text: 'Final check' }
]
</script>

<template>
  <Story title="Components/SSteps">
    <SSteps :steps="steps" />
  </Story>
</template>

<docs lang="md">
# SSteps
</docs>
