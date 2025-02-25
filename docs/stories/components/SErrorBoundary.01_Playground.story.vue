<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SErrorBoundary from 'sefirot/components/SErrorBoundary.vue'
import Comp from './_ErrorBoundaryDefaultSlot.vue'

const title = 'Components / SErrorBoundary / 01. Playground'
const docs = '/components/error-boundary'
</script>

<template>
  <Board :title="title" :docs="docs">
    <SErrorBoundary>
      <template #default>
        <Comp />
      </template>
      <template #error="{ error, clearError }">
        <div class="flex flex-col gap-12">
          <div class="flex flex-col gap-4">
            <div>Error slot content shown here</div>
            <div>{{ error }}</div>
          </div>
          <div>
            <SButton size="small" label="Clear error" @click="clearError()" />
          </div>
        </div>
      </template>
    </SErrorBoundary>
  </Board>
</template>
