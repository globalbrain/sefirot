<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SButton from 'sefirot/components/SButton.vue'

const title = 'Components / SButton / 01. Playground'
const docs = '/components/button'

const modes = [
  'neutral',
  'mute',
  'white',
  'black',
  'info',
  'success',
  'warning',
  'danger'
]

const contentModes = [
  { label: 'null', value: null },
  { label: 'neutral', value: 'neutral' },
  { label: 'mute', value: 'mute' },
  { label: 'white', value: 'white' },
  { label: 'black', value: 'black' },
  { label: 'info', value: 'info' },
  { label: 'success', value: 'success' },
  { label: 'warning', value: 'warning' },
  { label: 'danger', value: 'danger' }
]

function state() {
  return {
    type: 'fill',
    mode: 'neutral',
    labelMode: null,
    label: 'Button',
    loading: false
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="type"
        :options="{
          fill: 'fill',
          outline: 'outline',
          text: 'text'
        }"
        v-model="state.type"
      />
      <HstSelect
        title="mode"
        :options="modes"
        v-model="state.mode"
      />
      <HstSelect
        title="label-mode"
        :options="contentModes"
        v-model="state.labelMode"
      />
      <HstText
        title="label"
        v-model="state.label"
      />
      <HstCheckbox
        title="loading"
        v-model="state.loading"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SButton
          :type="state.type"
          :mode="state.mode"
          :label="state.label"
          :label-mode="state.labelMode"
          :loading="state.loading"
          @click="log('click', null)"
        />
      </Board>
    </template>
  </Story>
</template>
