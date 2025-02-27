<script setup lang="ts">
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

function state() {
  return {
    mode: 'default',
    label: 'Pill',
    clickable: false
  }
}

function log(...args: any[]) {
  // eslint-disable-next-line no-console
  console.log(...args)
}
</script>

<template>
  <Story :init-state="state">
    <template #controls="{ state }">
      <HstSelect
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
        v-model="state.mode"
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
