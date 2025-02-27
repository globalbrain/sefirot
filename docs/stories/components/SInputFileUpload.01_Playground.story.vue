<script setup lang="ts">
import SInputFileUpload from 'sefirot/components/SInputFileUpload.vue'
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

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: null,
    note: null,
    text: undefined,
    placeholder: '1MB max per file.',
    emptyText: null,
    help: null,
    accept: null,
    droppable: true
  } as const
}
</script>

<template>
  <Story :init-state="state">
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
      <HstText
        title="empty-text"
        v-model="state.emptyText"
      />
      <HstText
        title="accept"
        v-model="state.accept"
      />
      <HstCheckbox
        title="droppable"
        v-model="state.droppable"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SInputFileUpload
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
          v-model="data.files"
          :rules="rules"
        />
      </Board>
    </template>
  </Story>
</template>
