<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SPill from 'sefirot/components/SPill.vue'

const title = 'Components / SPill / 01. Playground'
const docs = '/components/pill'

function initState() {
  return {
    size: 'small',
    type: 'dimm',
    mode: 'default',
    label: 'Pill',
    clickable: false
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
        v-model="state.type"
        title="type"
        :options="{
          dimm: 'dimm',
          fill: 'fill'
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
      <HstText
        v-model="state.label"
        title="label"
      />
      <HstCheckbox
        v-model="state.clickable"
        title="clickable"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
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
