<script setup lang="ts">
import SState from 'sefirot/components/SState.vue'

const title = 'Components / SState / 03. Types'
const docs = '/components/state'

const modes = ['default', 'mute', 'neutral', 'info', 'success', 'warning', 'danger'] as const

function state() {
  return {
    size: 'small',
    label: 'State'
  }
}
</script>

<template>
  <Story :init-state="state">
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
      <HstText
        title="label"
        v-model="state.label"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <div class="grid gap-y-32">
          <div class="flex flex-wrap gap-16">
            <SState
              v-for="m in modes"
              :key="m"
              :size="state.size"
              :mode="m"
              :label="state.label"
            />
          </div>
        </div>
      </Board>
    </template>
  </Story>
</template>
