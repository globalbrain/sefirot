<script setup lang="ts">
import SInputFileUpload from 'sefirot/components/SInputFileUpload.vue'
import { useData } from 'sefirot/composables/Data'
import { useValidation } from 'sefirot/composables/Validation'
import { maxTotalFileSize } from 'sefirot/validation/rules'

const title = 'Components / SInputFileUpload / 01. Playground'
const docs = '/components/input-file-upload'

const { data } = useData({
  files: [] as File[]
})

const { validation } = useValidation(data, {
  files: {
    maxTotalFileSize: maxTotalFileSize('10MB')
  }
})

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: null,
    note: null,
    text: undefined,
    placeholder: 'Total 10MB max.',
    emptyText: null,
    help: null,
    accept: null
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
          v-model="data.files"
          :validation="validation.files"
        />
      </Board>
    </template>
  </Story>
</template>
