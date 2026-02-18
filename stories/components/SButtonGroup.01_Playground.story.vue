<script setup lang="ts">
import SButton, { type Mode, type Size } from 'sefirot/components/SButton.vue'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'

const title = 'Components / SButtonGroup / 01. Playground'
const docs = '/components/button-group'

function initState() {
  return {
    size: 'md',
    mode: 'mute',
    labelA: 'Left',
    labelB: 'Middle',
    labelC: 'Right'
  } satisfies {
    size: Size
    mode: Mode
    labelA: string
    labelB: string
    labelC: string
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
          xs: 'xs',
          sm: 'sm',
          md: 'md',
          lg: 'lg',
          xl: 'xl'
        }"
      />
      <HstSelect
        v-model="state.mode"
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
      />
      <HstText
        v-model="state.labelA"
        title="label a"
      />
      <HstText
        v-model="state.labelB"
        title="label b"
      />
      <HstText
        v-model="state.labelC"
        title="label c"
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
