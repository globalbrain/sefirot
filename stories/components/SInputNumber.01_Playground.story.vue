<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import { ref } from 'vue'

const input = ref<number | null>(null)

function state() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    placeholder: '123,456,789',
    help: 'This is a help text.',
    align: 'left',
    separator: true,
    disabled: false,
    error: false
  } as const
}

function onInput(value: number | null) {
  log('update:model-value', { value })
  input.value = value
}
</script>

<template>
  <Board
    title="Components / SInputNumber / 01. Playground"
    :state="state"
    docs="components/input-number"
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
      <HstSelect
        title="align"
        :options="{
          left: 'left',
          center: 'center',
          right: 'right'
        }"
        v-model="state.align"
      />
      <HstCheckbox
        title="separator"
        v-model="state.separator"
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
      <SInputNumber
        :class="{ 'has-error': state.error }"
        :size="state.size"
        :label="state.label"
        :info="state.info"
        :note="state.note"
        :help="state.help"
        :placeholder="state.placeholder"
        :align="state.align"
        :separator="state.separator"
        :disabled="state.disabled"
        :value="input"
        @update:model-value="onInput"
        @input="(value) => log('input', { value })"
      />
    </template>
  </Board>
</template>
