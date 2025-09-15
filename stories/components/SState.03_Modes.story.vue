<script setup lang="ts">
import SState from 'sefirot/components/SState.vue'

const title = 'Components / SState / 03. Types'
const docs = '/components/state'

const modes = ['default', 'mute', 'neutral', 'info', 'success', 'warning', 'danger'] as const

function initState() {
  return {
    size: 'small',
    label: 'State'
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
          mini: 'mini',
          small: 'small',
          medium: 'medium',
          large: 'large'
        }"
      />
      <HstText
        v-model="state.label"
        title="label"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
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
