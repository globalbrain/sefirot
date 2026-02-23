<script setup lang="ts">
import SInputFileUpload, { type Size } from 'sefirot/components/SInputFileUpload.vue'
import { useData } from 'sefirot/composables/Data'
import { maxFileSize } from 'sefirot/validation/rules'

const title = 'Components / SInputFileUpload / 01. Playground'
const docs = '/components/input-file-upload'

const { data } = useData({
  files: [] as File[]
})

const rules = {
  maxFileSize: maxFileSize('1MB')
}

function initState() {
  return {
    size: 'small',
    label: 'Label',
    info: undefined,
    note: undefined,
    text: undefined,
    placeholder: '1MB max per file.',
    emptyText: undefined,
    help: undefined,
    accept: undefined,
    droppable: true
  } satisfies {
    size: Size
    label: string
    info?: string
    note?: string
    text?: string
    placeholder: string
    emptyText?: string
    help?: string
    accept?: string
    droppable: boolean
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
          mini: 'mini',
          small: 'small',
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
      <HstText
        v-model="state.placeholder"
        title="placeholder"
      />
      <HstText
        v-model="state.emptyText"
        title="empty-text"
      />
      <HstText
        v-model="state.accept"
        title="accept"
      />
      <HstCheckbox
        v-model="state.droppable"
        title="droppable"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputFileUpload
          v-model="data.files"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :text="state.text"
          :placeholder="state.placeholder"
          :empty-text="state.emptyText"
          :accept="state.accept"
          :droppable="state.droppable"
          :rules
        />
      </Board>
    </template>
  </Story>
</template>
