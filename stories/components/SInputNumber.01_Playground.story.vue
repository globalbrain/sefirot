<script setup lang="ts">
import { logEvent as log } from 'histoire/client'
import SInputNumber from 'sefirot/components/SInputNumber.vue'
import { ref } from 'vue'

const title = 'Components / SInputNumber / 01. Playground'
const docs = '/components/input-number'

const input = ref<number | null>(null)

function initState() {
  return {
    size: 'md',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    placeholder: '123,456,789',
    unitBefore: '',
    unitAfter: '',
    help: 'This is a help text.',
    textColor: 'neutral',
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
        v-model="state.unitBefore"
        title="unit-before"
      />
      <HstText
        v-model="state.unitAfter"
        title="unit-after"
      />
      <HstText
        v-model="state.help"
        title="help"
      />
      <HstSelect
        v-model="state.textColor"
        title="text-color"
        :options="{
          neutral: 'neutral',
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
      />
      <HstSelect
        v-model="state.align"
        title="align"
        :options="{
          left: 'left',
          center: 'center',
          right: 'right'
        }"
      />
      <HstCheckbox
        v-model="state.separator"
        title="separator"
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
        <SInputNumber
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :placeholder="state.placeholder"
          :unit-before="state.unitBefore"
          :unit-after="state.unitAfter"
          :text-color="state.textColor"
          :align="state.align"
          :separator="state.separator"
          :disabled="state.disabled"
          :tabindex="state.tabindex"
          :value="input"
          @update:model-value="onInput"
          @input="(value) => log('input', { value })"
        />
      </Board>
    </template>
  </Story>
</template>
