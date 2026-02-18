<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SInputSelect, { type Size } from 'sefirot/components/SInputSelect.vue'
import { ref } from 'vue'

const title = 'Components / SInputSelect / 01. Playground'
const docs = '/components/input-select'

const input = ref<number | null>(null)

const options = [
  { label: 'First option', value: 1 },
  { label: 'Second option', value: 2 },
  { label: 'Third option', value: 3 }
]

function initState() {
  return {
    size: 'md',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    placeholder: 'Please select',
    help: 'This is a help text.',
    nullable: false,
    disabled: false,
    error: false,
    tabindex: 0
  } satisfies {
    size: Size
    label: string
    info: string
    note: string
    placeholder: string
    help: string
    nullable: boolean
    disabled: boolean
    error: boolean
    tabindex: -1 | 0 | number
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
      <HstCheckbox
        v-model="state.nullable"
        title="nullable"
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
        <SInputSelect
          v-model="input"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :placeholder="state.placeholder"
          :options
          :nullable="state.nullable"
          :disabled="state.disabled"
          :tabindex="state.tabindex"
          @update:model-value="(value) => log('update:model-value', { value })"
          @change="(value) => log('change', { value })"
        />
      </Board>
    </template>
  </Story>
</template>
