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
      <HstCheckbox
        v-model="state.disabled"
        title="disabled"
      />
      <HstCheckbox
        v-model="state.nullable"
        title="nullable"
      />
      <HstCheckbox
        v-model="state.error"
        title="error"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputRadios
          v-model="value"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :nullable="state.nullable"
          :disabled="state.disabled"
          :options
        />
      </Board>
    </template>
  </Story>
</template>
