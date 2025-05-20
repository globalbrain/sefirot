<script setup lang="ts">
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'
import { useMarkdown } from 'sefirot/composables/Markdown'
import { ref } from 'vue'

const title = 'Components / SInputTextarea / 02. Preview'
const docs = '/components/input-textarea'

const text = ref('')

function initState() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    placeholder: 'Placeholder text',
    help: 'This is a help text.',
    rows: 5,
    disabled: false,
    error: false
  }
}

const render = useMarkdown()

function preview() {
  if (!text.value) { return 'Nothing to preview' }
  return render(text.value, false)
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
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
          :disabled="state.disabled"
          v-model="text"
          :preview
        />
      </Board>
    </template>
  </Story>
</template>
