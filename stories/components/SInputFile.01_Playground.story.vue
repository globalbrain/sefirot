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
      <HstText
        v-model="state.text"
        title="text"
      />
      <HstText
        v-model="state.placeholder"
        title="placeholder"
      />
      <HstCheckbox
        v-model="state.error"
        title="error"
      />
      <HstSelect
        v-model="state.tabindex"
        title="tabindex"
        :options="[0, -1]"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputFile
          v-model="input"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :text="state.text"
          multiple
          :placeholder="state.placeholder"
          :tabindex="state.tabindex"
        />
      </Board>
    </template>
  </Story>
</template>
