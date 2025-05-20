<script setup lang="ts">
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'
import { useData } from 'sefirot/composables/Data'
import { useValidation } from 'sefirot/composables/Validation'
import { maxLength } from 'sefirot/validation/rules'

const title = 'Components / SInputTextarea / 01. Playground'
const docs = '/components/input-textarea'

const { data } = useData({
  text: null as string | null
})

const { validation } = useValidation(data, {
  text: {
    maxLength: maxLength(1000)
  }
})

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    placeholder: 'Placeholder text',
    help: 'This is a help text.',
    rows: 5,
    disabled: false,
    error: false,
    autoResize: 0
  }
}
</script>

<template>
  <Story :title :init-state="state" source="Not available" auto-props-disabled>
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
        title="placeholder"
        v-model="state.placeholder"
      />
      <HstText
        title="help"
        v-model="state.help"
      />
      <HstNumber
        title="rows"
        v-model="state.rows"
      />
      <HstNumber
        title="autoResize"
        v-model="state.autoResize"
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
      <Board :title :docs>
        <SInputTextarea
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :placeholder="state.placeholder"
          :rows="state.rows"
          :auto-resize="state.autoResize"
          :disabled="state.disabled"
          v-model="data.text"
          :validation="validation.text"
        />
      </Board>
    </template>
  </Story>
</template>
