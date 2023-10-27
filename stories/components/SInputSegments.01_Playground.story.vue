<script setup lang="ts">
import SInputSegments from 'sefirot/components/SInputSegments.vue'
import { ref } from 'vue'

const title = 'Components / SInputSegments / 01. Playground'
const docs = '/components/input-segments'

const options = [
  { label: 'Table', value: 'table' } as const,
  { label: 'List', value: 'list' } as const,
  { label: 'Board', value: 'board' } as const,
  { label: 'Card', value: 'card' } as const
]

const value = ref('table')

function state() {
  return {
    size: 'small',
    label: 'Project view',
    info: '',
    note: '',
    help: 'This changes the view for all users.',
    block: false,
    disabled: false,
    error: false
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
          medium: 'medium'
        }"
        v-model="state.size"
      />
      <HstText
        title="label"
        v-model="state.label"
      />
      <HstText
        title="info"
        v-model="state.info"
      />
      <HstText
        title="note"
        v-model="state.note"
      />
      <HstText
        title="help"
        v-model="state.help"
      />
      <HstCheckbox
        title="block"
        v-model="state.block"
      />
      <HstCheckbox
        title="disabled"
        v-model="state.disabled"
      />
      <HstCheckbox
        title="error"
        v-model="state.error"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SInputSegments
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :options="options"
          :block="state.block"
          :disabled="state.disabled"
          v-model="value"
        />
      </Board>
    </template>
  </Story>
</template>
