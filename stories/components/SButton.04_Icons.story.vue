<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import IconCheckCircle from '~icons/ph/check-circle-bold'
import IconImageSquare from '~icons/ph/image-square-bold'
import IconMagnifyingGlass from '~icons/ph/magnifying-glass-bold'

const title = 'Components / SButton / 04. Icons'
const docs = '/components/button'

const variants = [
  { title: 'Fill', type: 'fill' },
  { title: 'Outline', type: 'outline' },
  { title: 'Text', type: 'text' }
] as const

const modes = [
  'default',
  'mute',
  'neutral',
  'white',
  'black',
  'info',
  'success',
  'warning',
  'danger'
]

const contentModes = [
  { label: 'null', value: null },
  { label: 'neutral', value: 'neutral' },
  { label: 'mute', value: 'mute' },
  { label: 'white', value: 'white' },
  { label: 'black', value: 'black' },
  { label: 'info', value: 'info' },
  { label: 'success', value: 'success' },
  { label: 'warning', value: 'warning' },
  { label: 'danger', value: 'danger' }
]

const icons = [
  IconCheckCircle,
  IconImageSquare,
  IconMagnifyingGlass
]

function state() {
  return {
    size: 'medium',
    mode: 'default',
    iconMode: null,
    labelMode: null,
    label: 'Button'
  } as const
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
          large: 'large',
          jumbo: 'jumbo'
        }"
        v-model="state.size"
      />
      <HstSelect
        title="mode"
        :options="modes"
        v-model="state.mode"
      />
      <HstSelect
        title="icon-mode"
        :options="contentModes"
        v-model="state.iconMode"
      />
      <HstSelect
        title="label-mode"
        :options="contentModes"
        v-model="state.labelMode"
      />
      <HstText
        title="label"
        v-model="state.label"
      />
      <HstCheckbox
        title="disabled"
        v-model="state.disabled"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <div class="root">
          <div v-for="v in variants" :key="v.type" class="group">
            <div class="title">{{ v.title }}</div>

            <div class="grid">
              <SButton
                v-for="(i, index) in icons"
                :key="index"
                :size="state.size"
                :type="v.type"
                :mode="state.mode"
                :icon="i"
                :icon-mode="state.iconMode"
                :label="state.label"
                :label-mode="state.labelMode"
                :disabled="state.disabled"
              />
            </div>
          </div>
        </div>
      </Board>
    </template>
  </Story>
</template>

<style scoped>
.root {
  display: grid;
  gap: 32px;
}

.group {
  display: grid;
  gap: 12px;
}

.title {
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-2);
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
