<script setup lang="ts">
import SState, { type Mode, type Size } from 'sefirot/components/SState.vue'

const title = 'Components / SState / 01. Playground'
const docs = '/components/state'

function initState() {
  return {
    size: 'small',
    mode: 'default',
    label: 'State'
  } satisfies {
    size: Size
    mode: Mode
    label: string
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
          mini: 'mini',
          small: 'small',
          medium: 'medium',
          large: 'large'
        }"
      />
      <HstSelect
        v-model="state.mode"
        title="mode"
        :options="{
          default: 'default',
          mute: 'mute',
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
      />
      <HstTextarea
        v-model="state.label"
        title="label"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SState
          :size="state.size"
          :mode="state.mode"
          :label="state.label"
        />
      </Board>
    </template>
  </Story>
</template>
