<script setup lang="ts">
import SInputCheckboxes, { type Size } from 'sefirot/components/SInputCheckboxes.vue'
import { ref } from 'vue'

const title = 'Components / SInputCheckboxes / 01. Playground'
const docs = '/components/input-checkboxes'

const input = ref([])

const options = [
  { label: 'Check box 1', value: 1 },
  { label: 'Check box 2', value: 2 },
  { label: 'Check box 3', value: 3 }
]

function initState() {
  return {
    size: 'md',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    help: 'This is a help text.',
    text: 'Text for the checkbox',
    nullable: true,
    disabled: false,
    error: false
  } satisfies {
    size: Size
    label: string
    info: string
    note: string
    help: string
    text: string
    nullable: boolean
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
          md: 'md',
          medium: 'medium'
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
      <HstText
        v-model="state.text"
        title="text"
      />
      <HstCheckbox
        v-model="state.nullable"
        title="nullable"
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
        <SInputCheckboxes
          v-model="input"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :options
          :nullable="state.nullable"
          :disabled="state.disabled"
        />
      </Board>
    </template>
  </Story>
</template>
