<script setup lang="ts">
import SInputCheckboxes from 'sefirot/components/SInputCheckboxes.vue'
import { ref } from 'vue'

const title = 'Components / SInputCheckboxes / 01. Playground'
const docs = '/components/input-checkboxes'

const input = ref([])

const options = [
  { label: 'Check box 1', value: 1 },
  { label: 'Check box 2', value: 2 },
  { label: 'Check box 3', value: 3 }
]

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    help: 'This is a help text.',
    text: 'Text for the checkbox',
    nullable: true,
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
      <HstText
        title="text"
        v-model="state.text"
      />
      <HstCheckbox
        title="nullable"
        v-model="state.nullable"
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
        <SInputCheckboxes
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :options="options"
          :nullable="state.nullable"
          :disabled="state.disabled"
          v-model="input"
        />
      </Board>
    </template>
  </Story>
</template>
