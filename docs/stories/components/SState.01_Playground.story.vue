<script setup lang="ts">
import SState from 'sefirot/components/SState.vue'

const title = 'Components / SState / 01. Playground'
const docs = '/components/state'

function state() {
  return {
    size: 'small',
    mode: 'default',
    label: 'State'
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium',
          large: 'large'
        }"
        v-model="state.size"
      />
      <HstSelect
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
        v-model="state.mode"
      />
      <HstTextarea
        title="label"
        v-model="state.label"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SState
          :size="state.size"
          :mode="state.mode"
          :label="state.label"
        />
      </Board>
    </template>
  </Story>
</template>
