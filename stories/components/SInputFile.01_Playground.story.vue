<script setup lang="ts">
import SInputFile from 'sefirot/components/SInputFile.vue'
import { ref } from 'vue'

const title = 'Components / SInputFile / 01. Playground'
const docs = '/components/input-file'

const input = ref(null)

function initState() {
  return {
    size: 'md',
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
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          sm: 'sm',
          md: 'md'
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
      <Board :title :docs>
        <SInputFile
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :text="state.text"
          multiple
          :placeholder="state.placeholder"
          v-model="input"
        />
      </Board>
    </template>
  </Story>
</template>
