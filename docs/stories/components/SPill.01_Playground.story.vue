<script setup lang="ts">
import SPill from 'sefirot/components/SPill.vue'

const title = 'Components / SPill / 01. Playground'
const docs = '/components/pill'

function state() {
  return {
    size: 'small',
    type: 'dimm',
    mode: 'default',
    label: 'Pill',
    clickable: false
  }
}

function log(...args: any[]) {
  // eslint-disable-next-line no-console
  console.log(...args)
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
        title="type"
        :options="{
          dimm: 'dimm',
          fill: 'fill'
        }"
        v-model="state.type"
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
      <HstText
        title="label"
        v-model="state.label"
      />
      <HstCheckbox
        title="clickable"
        v-model="state.clickable"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SPill
          :size="state.size"
          :type="state.type"
          :mode="state.mode"
          :label="state.label"
          :clickable="state.clickable"
          @click="log('click', null)"
        />
      </Board>
    </template>
  </Story>
</template>
