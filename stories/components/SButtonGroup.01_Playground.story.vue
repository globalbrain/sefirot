<script setup lang="ts">
import SButton, { Mode, Size } from 'sefirot/components/SButton.vue'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'

function state() {
  return {
    size: 'medium' as Size,
    mode: 'mute' as Mode,
    labelA: 'Left',
    labelB: 'Middle',
    labelC: 'Right'
  }
}
</script>

<template>
  <Board
    title="Components / SButtonGroup / 01. Playground"
    docs="/components/button-group"
    :state="state"
  >
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium',
          large: 'large',
          jumbo: 'jumbo'
        }"
        v-model="state.size"
      />
      <HstSelect
        title="mode"
        :options="{
          neutral: 'neutral',
          mute: 'mute',
          white: 'white',
          black: 'black',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
        v-model="state.mode"
      />
      <HstText
        title="label a"
        v-model="state.labelA"
      />
      <HstText
        title="label b"
        v-model="state.labelB"
      />
      <HstText
        title="label c"
        v-model="state.labelC"
      />
    </template>
    <template #default="{ state }">
      <SButtonGroup>
        <SButton :size="state.size" :mode="state.mode" :label="state.labelA" />
        <SButton :size="state.size" :mode="state.mode" :label="state.labelB" />
        <SButton :size="state.size" :mode="state.mode" :label="state.labelC" />
      </SButtonGroup>
    </template>
  </Board>
</template>
