<script setup lang="ts">
import SErrorBoundary from 'sefirot/components/SErrorBoundary.vue'
import Comp from './_ErrorBoundaryDefaultSlot.vue'

const title = 'Components / SErrorBoundary / 01. Playground'
</script>

<template>
  <Story :title="title" source="Not available" auto-props-disabled>
    <Board :title="title">
      <SErrorBoundary>
        <template #default>
          <Comp />
        </template>
        <template #error="{ error, clearError }">
          <div>Error slot</div>
          <div>{{ error }}</div>
          <button @click="clearError">Clear error</button>
        </template>
      </SErrorBoundary>
    </Board>
  </Story>
</template>
