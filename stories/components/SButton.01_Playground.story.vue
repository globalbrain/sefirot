<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SButton, { type Mode, type Size, type Type } from 'sefirot/components/SButton.vue'

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
  { label: 'xs', value: 'xs' },
  { label: 'sm', value: 'sm' },
  { label: 'md', value: 'md' },
  { label: 'lg', value: 'lg' },
  { label: 'xl', value: 'xl' }
]

const contentModes = [
  { label: 'undefined', value: undefined },
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
    size: 'md',
    type: 'fill',
    mode: 'default',
    labelMode: undefined,
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
  } satisfies {
    size: Size
    type: Type
    mode: Mode
    labelMode?: Mode
    label: string
    count?: number
    loading: boolean
    disabled: boolean
    tooltip: {
      text: string
      position: 'top' | 'right' | 'bottom' | 'left'
      trigger: 'hover' | 'focus' | 'both'
      timeout: number
    }
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.size"
        title="size"
        :options="sizes"
      />
      <HstSelect
        v-model="state.type"
        title="type"
        :options="{
          fill: 'fill',
          outline: 'outline',
          text: 'text'
        }"
      />
      <HstSelect
        v-model="state.mode"
        title="mode"
        :options="modes"
      />
      <HstSelect
        v-model="state.labelMode"
        title="label-mode"
        :options="contentModes"
      />
      <HstText
        v-model="state.label"
        title="label"
      />
      <HstNumber
        v-model="state.count"
        title="count"
      />
      <HstText
        v-model="state.tooltip.text"
        title="tooltip.text"
      />
      <HstSelect
        v-model="state.tooltip.position"
        title="tooltip.position"
        :options="{
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left'
        }"
      />
      <HstSelect
        v-model="state.tooltip.trigger"
        title="tooltip.trigger"
        :options="{
          both: 'both',
          hover: 'hover',
          focus: 'focus'
        }"
      />
      <HstNumber
        v-model="state.tooltip.timeout"
        title="tooltip.timeout"
      />
      <HstCheckbox
        v-model="state.loading"
        title="loading"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="disabled"
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
