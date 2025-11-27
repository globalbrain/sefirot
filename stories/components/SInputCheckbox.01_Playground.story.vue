<script setup lang="ts">
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'
import { ref } from 'vue'

const title = 'Components / SInputCheckbox / 01. Playground'
const docs = '/components/input-checkbox'

const value = ref(false)

function initState() {
  return {
    size: 'md',
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
      <HstCheckbox
        v-model="state.disabled"
        title="disabled"
      />
      <HstCheckbox
        v-model="state.error"
        title="error"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputCheckbox
          v-model="value"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :text="state.text"
          :disabled="state.disabled"
        />
      </Board>
    </template>
  </Story>
</template>
