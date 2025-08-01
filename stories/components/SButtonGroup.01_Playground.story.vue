<script setup lang="ts">
import SButton, { type Mode, type Size } from 'sefirot/components/SButton.vue'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'

const title = 'Components / SButtonGroup / 01. Playground'
const docs = '/components/button-group'

function initState() {
  return {
    size: 'md' as Size,
    mode: 'mute' as Mode,
    labelA: 'Left',
    labelB: 'Middle',
    labelC: 'Right'
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          xs: 'xs',
          sm: 'sm',
          md: 'md',
          lg: 'lg',
          xl: 'xl'
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
      <Board :title :docs>
        <SButtonGroup>
          <SButton :size="state.size" :mode="state.mode" :label="state.labelA" />
          <SButton :size="state.size" :mode="state.mode" :label="state.labelB" />
          <SButton :size="state.size" :mode="state.mode" :label="state.labelC" />
        </SButtonGroup>
      </Board>
    </template>
  </Story>
</template>
