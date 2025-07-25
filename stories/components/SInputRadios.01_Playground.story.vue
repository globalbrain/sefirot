<script setup lang="ts">
import SInputRadios from 'sefirot/components/SInputRadios.vue'
import { ref } from 'vue'

const title = 'Components / SInputRadios / 01. Playground'
const docs = '/components/input-radios'

const value = ref(1)

const options = [
  { label: 'Radio button 1', value: 1 },
  { label: 'Radio button 2', value: 2 },
  { label: 'Radio button 3', value: 3 }
]

function initState() {
  return {
    size: 'md',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    help: 'This is a help text.',
    nullable: false,
    disabled: false,
    error: false
  } as const
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        title="size"
        :options="{
          sm: 'sm',
          md: 'md'
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
      <HstCheckbox
        title="disabled"
        v-model="state.disabled"
      />
      <HstCheckbox
        title="nullable"
        v-model="state.nullable"
      />
      <HstCheckbox
        title="error"
        v-model="state.error"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputRadios
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :nullable="state.nullable"
          :disabled="state.disabled"
          :options
          v-model="value"
        />
      </Board>
    </template>
  </Story>
</template>
