<script setup lang="ts">
import SIndicator from 'sefirot/components/SIndicator.vue'

const title = 'Components / SIndicator / 01. Playground'
const docs = '/components/indicator'

function initState() {
  return {
    size: 'medium',
    state: 'pending',
    mode: 'colored'
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          nano: 'nano',
          mini: 'mini',
          small: 'small',
          medium: 'medium',
          large: 'large',
          jumbo: 'jumbo'
        }"
        v-model="state.size"
      />
      <HstSelect
        title="state"
        :options="{
          pending: 'pending',
          ready: 'ready',
          queued: 'queued',
          running: 'running',
          completed: 'completed',
          failed: 'failed',
          aborted: 'aborted'
        }"
        v-model="state.state"
      />
      <HstSelect
        title="mode"
        :options="{
          colored: 'colored',
          monochrome: 'monochrome'
        }"
        v-model="state.mode"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SIndicator
          :size="state.size"
          :state="state.state"
          :mode="state.mode"
        />
      </Board>
    </template>
  </Story>
</template>
