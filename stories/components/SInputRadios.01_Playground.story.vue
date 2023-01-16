<script setup lang="ts">
import SInputRadios from 'sefirot/components/SInputRadios.vue'
import { ref } from 'vue'

const value = ref(1)

const options = [
  { label: 'Radio button 1', value: 1 },
  { label: 'Radio button 2', value: 2 },
  { label: 'Radio button 3', value: 3 }
]

function state() {
  return {
    size: 'small',
    label: 'Label',
    note: 'Note text',
    help: 'This is a help text.',
    nullable: false,
    disabled: false,
    error: false
  } as const
}
</script>

<template>
  <Board
    title="Components / SInputRadios / 01. Playground"
    :state="state"
    docs="components/input-radios"
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
        title="note"
        v-model="state.note"
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
        title="error"
        v-model="state.error"
      />
    </template>

    <template #default="{ state }">
      <SInputRadios
        :class="{ 'has-error': state.error }"
        :size="state.size"
        :label="state.label"
        :note="state.note"
        :help="state.help"
        :nullable="state.nullable"
        :options="options"
        v-model="value"
      />
    </template>
  </Board>
</template>
