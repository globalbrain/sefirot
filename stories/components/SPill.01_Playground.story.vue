<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SPill from 'sefirot/components/SPill.vue'

function state() {
  return {
    size: 'small',
    type: 'dimm',
    mode: 'neutral',
    label: 'Pill',
    clickable: false
  }
}
</script>

<template>
  <Board
    title="Components / SPill / 01. Playground"
    :state="state"
    docs="/components/pill"
  >
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
          neutral: 'neutral',
          mute: 'mute',
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
      <SPill
        :size="state.size"
        :type="state.type"
        :mode="state.mode"
        :label="state.label"
        :clickable="state.clickable"
        @click="log('click', null)"
      />
    </template>
  </Board>
</template>
