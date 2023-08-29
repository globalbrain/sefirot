<script setup lang="ts">
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { ref } from 'vue'

const title = 'Components / SInputCheckbox / 01. Playground'
const docs = '/components/input-checkbox'

const value = ref(false)

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    help: 'This is a help text.',
    text: 'Text for the checkbox',
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
        <SInputCheckbox
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :text="state.text"
          :disabled="state.disabled"
          v-model="value"
        />
      </Board>
    </template>
  </Story>
</template>
