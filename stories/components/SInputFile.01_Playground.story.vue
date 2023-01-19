<script setup lang="ts">
import SInputFile from 'sefirot/components/SInputFile.vue'
import { ref } from 'vue'

const input = ref(null)

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    text: 'Choose File',
    placeholder: 'No file chosen',
    help: 'This is a help text.',
    error: false
  } as const
}
</script>

<template>
  <Board
    title="Components / SInputFile / 01. Playground"
    :state="state"
    docs="components/input-file"
  >
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
      <HstText
        title="placeholder"
        v-model="state.placeholder"
      />
      <HstCheckbox
        title="error"
        v-model="state.error"
      />
    </template>

    <template #default="{ state }">
      <SInputFile
        :class="{ 'has-error': state.error }"
        :size="state.size"
        :label="state.label"
        :info="state.info"
        :note="state.note"
        :help="state.help"
        :text="state.text"
        :placeholder="state.placeholder"
        v-model="input"
      />
    </template>
  </Board>
</template>
