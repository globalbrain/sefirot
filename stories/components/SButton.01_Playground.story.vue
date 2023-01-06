<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SButton from 'sefirot/components/SButton.vue'

function state() {
  return {
    type: 'fill',
    mode: 'neutral',
    label: 'Button',
    loading: false
  }
}
</script>

<template>
  <Board
    title="Components / SButton / 01. Playground"
    :state="state"
    docs="/components/button"
  >
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
        :options="{
          neutral: 'neutral',
          mute: 'mute'
        }"
        v-model="state.mode"
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
      <SButton
        :type="state.type"
        :mode="state.mode"
        :label="state.label"
        :loading="state.loading"
        @click="log('click', null)"
      />
    </template>
  </Board>
</template>
