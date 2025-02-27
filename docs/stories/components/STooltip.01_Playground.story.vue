<script setup lang="ts">
import STooltip from 'sefirot/components/STooltip.vue'
import { type Position } from 'sefirot/composables/Tooltip'

const title = 'Components / STooltip / 01. Playground'
const docs = '/components/tooltip'

const options: Record<string, Position> = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left'
}

function state() {
  return {
    position: 'top' as Position,
    text: 'This is a tooltip message.'
  }
}
</script>

<template>
  <Story :init-state="state">
    <template #controls="{ state }">
      <HstSelect
        title="position"
        :options="options"
        v-model="state.position"
      />
      <HstTextarea
        title="text"
        v-model="state.text"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <STooltip :text="state.text" :position="state.position">
          Hover this text.
        </STooltip>
      </Board>
    </template>
  </Story>
</template>
