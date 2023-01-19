<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SInputSelect from 'sefirot/components/SInputSelect.vue'
import { ref } from 'vue'

const input = ref<number | null>(null)

const options = [
  { label: 'First option', value: 1 },
  { label: 'Second option', value: 2 },
  { label: 'Third option', value: 3 }
]

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    placeholder: 'Please select',
    help: 'This is a help text.',
    nullable: false,
    disabled: false,
    error: false
  } as const
}
</script>

<template>
  <Board
    title="Components / SInputSelect / 01. Playground"
    :state="state"
    docs="components/input-select"
  >
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
      <HstCheckbox
        title="nullable"
        v-model="state.nullable"
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
      <SInputSelect
        :class="{ 'has-error': state.error }"
        :size="state.size"
        :label="state.label"
        :info="state.info"
        :note="state.note"
        :help="state.help"
        :placeholder="state.placeholder"
        :options="options"
        :nullable="state.nullable"
        :disabled="state.disabled"
        v-model="input"
        @update:model-value="(value) => log('update:model-value', { value })"
        @change="(value) => log('change', { value })"
      />
    </template>
  </Board>
</template>
