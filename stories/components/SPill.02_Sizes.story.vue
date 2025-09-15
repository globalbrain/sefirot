<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SPill from 'sefirot/components/SPill.vue'

const title = 'Components / SPill / 02. Sizes'
const docs = '/components/pill'

const variants = [
  { title: 'Mini', size: 'mini' },
  { title: 'Small', size: 'small' },
  { title: 'Medium', size: 'medium' },
  { title: 'Large', size: 'large' }
] as const

const types = ['dimm', 'fill'] as const

function initState() {
  return {
    mode: 'default',
    label: 'Pill',
    clickable: false
  }
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.mode"
        title="mode"
        :options="{
          default: 'default',
          mute: 'mute',
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
      />
      <HstText
        v-model="state.label"
        title="label"
      />
      <HstCheckbox
        v-model="state.clickable"
        title="clickable"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <div class="grid gap-y-32">
          <div v-for="v in variants" :key="v.size" class="grid gap-y-12">
            <div class="leading-24 text-14 font-500 text-c-2">
              {{ v.title }}
            </div>
            <div class="flex flex-wrap gap-16">
              <SPill
                v-for="t in types"
                :key="t"
                :size="v.size"
                :type="t"
                :mode="state.mode"
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
