<script setup lang="ts">
import STooltip from 'sefirot/components/STooltip.vue'

function state() {
  return {
    position: 'top',
    text: 'This is a tooltip message.'
  }
}
</script>

<template>
  <Board
    title="Components / STooltip / 01. Playground"
    :state="state"
    docs="/components/tooltip"
  >
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
      <STooltip :text="state.text" :position="state.position">
        Hover this text.
      </STooltip>
    </template>
  </Board>
</template>
