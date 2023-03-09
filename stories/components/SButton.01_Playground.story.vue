<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SButton from 'sefirot/components/SButton.vue'

const title = 'Components / SButton / 01. Playground'
const docs = '/components/button'

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
      <Board :title="title" :docs="docs">
        <SButton
          :type="state.type"
          :mode="state.mode"
          :label="state.label"
          :loading="state.loading"
          @click="log('click', null)"
        />
      </Board>
    </template>
  </Story>
</template>
