<script setup lang="ts">
import SIndicator, { type Mode, type Size, type State } from 'sefirot/components/SIndicator.vue'

const title = 'Components / SIndicator / 01. Playground'
const docs = '/components/indicator'

function initState() {
  return {
    size: 'medium',
    state: 'pending',
    mode: 'colored'
  } satisfies {
    size: Size
    state: State
    mode: Mode
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.size"
        title="size"
        :options="{
          nano: 'nano',
          mini: 'mini',
          small: 'small',
          medium: 'medium',
          large: 'large',
          jumbo: 'jumbo'
        }"
      />
      <HstSelect
        v-model="state.state"
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
      />
      <HstSelect
        v-model="state.mode"
        title="mode"
        :options="{
          colored: 'colored',
          monochrome: 'monochrome'
        }"
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
