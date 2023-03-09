<script setup lang="ts">
import STooltip from 'sefirot/components/STooltip.vue'

const title = 'Components / STooltip / 01. Playground'
const docs = '/components/tooltip'

function state() {
  return {
    position: 'top',
    text: 'This is a tooltip message.'
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="position"
        :options="{
          top: 'top',
          right: 'right',
          bottom: 'bottom',
          left: 'left'
        }"
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
