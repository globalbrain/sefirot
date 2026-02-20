<script setup lang="ts">
import SInputSegments, { type Size } from 'sefirot/components/SInputSegments.vue'
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

function initState() {
  return {
    size: 'md',
    label: 'Project view',
    info: '',
    note: '',
    help: 'This changes the view for all users.',
    block: false,
    disabled: false,
    error: false
  } satisfies {
    size: Size
    label: string
    info: string
    note: string
    help: string
    block: boolean
    disabled: boolean
    error: boolean
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
          sm: 'sm',
          md: 'md'
        }"
      />
      <HstText
        v-model="state.label"
        title="label"
      />
      <HstText
        v-model="state.info"
        title="info"
      />
      <HstText
        v-model="state.note"
        title="note"
      />
      <HstText
        v-model="state.help"
        title="help"
      />
      <HstCheckbox
        v-model="state.block"
        title="block"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="disabled"
      />
      <HstCheckbox
        v-model="state.error"
        title="error"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputSegments
          v-model="value"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :options
          :block="state.block"
          :disabled="state.disabled"
        />
      </Board>
    </template>
  </Story>
</template>
