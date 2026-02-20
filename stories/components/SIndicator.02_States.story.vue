<script setup lang="ts">
import SIndicator, { type Mode, type Size } from 'sefirot/components/SIndicator.vue'

const title = 'Components / SIndicator / 02. States'
const docs = '/components/indicator'

const states = [
  'pending',
  'ready',
  'queued',
  'running',
  'completed',
  'failed',
  'aborted'
] as const

function initState() {
  return {
    size: 'medium',
    mode: 'colored'
  } satisfies {
    size: Size
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
        <div class="s-flex s-gap-16">
          <SIndicator
            v-for="s in states"
            :key="s"
            :size="state.size"
            :state="s"
            :mode="state.mode"
          />
        </div>
      </Board>
    </template>
  </Story>
</template>
