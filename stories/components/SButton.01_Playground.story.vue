<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SButton from 'sefirot/components/SButton.vue'

const title = 'Components / SButton / 01. Playground'
const docs = '/components/button'

const modes = [
  'default',
  'mute',
  'neutral',
  'white',
  'black',
  'info',
  'success',
  'warning',
  'danger'
]

const sizes = [
  { label: 'mini', value: 'mini' },
  { label: 'small', value: 'small' },
  { label: 'medium', value: 'medium' },
  { label: 'large', value: 'large' },
  { label: 'jumbo', value: 'jumbo' }
]

const contentModes = [
  { label: 'undefined', value: null },
  { label: 'default', value: 'default' },
  { label: 'mute', value: 'mute' },
  { label: 'neutral', value: 'neutral' },
  { label: 'white', value: 'white' },
  { label: 'black', value: 'black' },
  { label: 'info', value: 'info' },
  { label: 'success', value: 'success' },
  { label: 'warning', value: 'warning' },
  { label: 'danger', value: 'danger' }
]

function initState() {
  return {
    size: 'medium',
    type: 'fill',
    mode: 'default',
    labelMode: null,
    label: 'Button',
    count: undefined,
    loading: false,
    disabled: false,
    tooltip: {
      text: '',
      position: 'top',
      trigger: 'both',
      timeout: 0
    }
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="sizes"
        v-model="state.size"
      />
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
      <HstNumber
        title="count"
        v-model="state.count"
      />
      <HstText
        title="tooltip.text"
        v-model="state.tooltip.text"
      />
      <HstSelect
        title="tooltip.position"
        :options="{
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left'
        }"
        v-model="state.tooltip.position"
      />
      <HstSelect
        title="tooltip.trigger"
        :options="{
          both: 'both',
          hover: 'hover',
          focus: 'focus'
        }"
        v-model="state.tooltip.trigger"
      />
      <HstNumber
        title="tooltip.timeout"
        v-model="state.tooltip.timeout"
      />
      <HstCheckbox
        title="loading"
        v-model="state.loading"
      />
      <HstCheckbox
        title="disabled"
        v-model="state.disabled"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SButton
          :size="state.size"
          :type="state.type"
          :mode="state.mode"
          :label="state.label"
          :label-mode="state.labelMode"
          :count="state.count"
          :loading="state.loading"
          :disabled="state.disabled"
          :tooltip="{
            text: state.tooltip.text,
            position: state.tooltip.position,
            trigger: state.tooltip.trigger,
            timeout: state.tooltip.timeout
          }"
          @click="log('click', null)"
        />
      </Board>
    </template>
  </Story>
</template>
