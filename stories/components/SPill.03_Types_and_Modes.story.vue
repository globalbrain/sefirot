<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SPill from 'sefirot/components/SPill.vue'

const title = 'Components / SPill / 03. Types and Modes'
const docs = '/components/pill'

const variants = [
  { title: 'Dimm', type: 'dimm' },
  { title: 'Fill', type: 'fill' }
] as const

const modes = ['default', 'mute', 'neutral', 'info', 'success', 'warning', 'danger'] as const

function state() {
  return {
    size: 'small',
    label: 'Pill',
    clickable: false
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
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
      <HstCheckbox
        title="clickable"
        v-model="state.clickable"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <div class="grid gap-y-32">
          <div v-for="v in variants" :key="v.type" class="grid gap-y-12">
            <div class="leading-24 text-14 font-500 text-c-2">
              {{ v.title }}
            </div>
            <div class="flex flex-wrap gap-16">
              <SPill
                v-for="m in modes"
                :key="m"
                :size="state.size"
                :type="v.type"
                :mode="m"
                :label="state.label"
                :clickable="state.clickable"
                @click="log('click', null)"
              />
            </div>
          </div>
        </div>
      </Board>
    </template>
  </Story>
</template>
