<script setup lang="ts">
import SState from 'sefirot/components/SState.vue'

const title = 'Components / SState / 02. Sizes'
const docs = '/components/state'

const variants = [
  { title: 'Mini', size: 'mini' },
  { title: 'Small', size: 'small' },
  { title: 'Medium', size: 'medium' },
  { title: 'Large', size: 'large' }
] as const

function state() {
  return {
    mode: 'default',
    label: 'State'
  }
}
</script>

<template>
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
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
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <div class="grid gap-y-32">
          <div v-for="v in variants" :key="v.size" class="grid gap-y-12">
            <div class="leading-24 text-14 font-500 text-c-2">
              {{ v.title }}
            </div>
            <div class="flex flex-wrap gap-16">
              <SState
                :size="v.size"
                :mode="state.mode"
                :label="state.label"
              />
            </div>
          </div>
        </div>
      </Board>
    </template>
  </Story>
</template>
