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

function initState() {
  return {
    size: 'md',
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
        v-model="state.placeholder"
        title="placeholder"
      />
      <HstText
        v-model="state.help"
        title="help"
      />
      <HstNumber
        v-model="state.rows"
        title="rows"
      />
      <HstNumber
        v-model="state.autoResize"
        title="autoResize"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="disabled"
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
        <SInputTextarea
          v-model="data.text"
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
          :validation="validation.text"
        />
      </Board>
    </template>
  </Story>
</template>
