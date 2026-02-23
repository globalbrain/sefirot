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

function initState() {
  return {
    position: 'top',
    text: 'This is a tooltip message.'
  } satisfies {
    position: Position
    text: string
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.position"
        title="position"
        :options
      />
      <HstTextarea
        v-model="state.text"
        title="text"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <STooltip :text="state.text" :position="state.position">
          Hover this text.
        </STooltip>
      </Board>
    </template>
  </Story>
</template>
