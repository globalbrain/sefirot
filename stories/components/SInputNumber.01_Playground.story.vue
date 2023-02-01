<script setup lang="ts">
import IconCheckCircle from '@iconify-icons/ph/check-circle-bold'
import IconMoney from '@iconify-icons/ph/money-bold'
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
    unitBeforeIcon: false,
    unitBeforeText: '',
    unitAfterIcon: false,
    unitAfterText: '',
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

function updateUnitBefore(value: string | boolean, state: any) {
  if (typeof value === 'string') {
    state.unitBeforeIcon = false
    state.unitBeforeText = value
  } else {
    state.unitBeforeIcon = value
  }
}

function updateUnitAfter(value: string | boolean, state: any) {
  if (typeof value === 'string') {
    state.unitAfterIcon = false
    state.unitAfterText = value
  } else {
    state.unitAfterIcon = value
  }
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
      <HstCheckbox
        title="unit-before (icon)"
        :model-value="state.unitBeforeIcon"
        @update:model-value="updateUnitBefore($event, state)"
      />
      <HstText
        title="unit-before (text)"
        :model-value="state.unitBeforeText"
        @update:model-value="updateUnitBefore($event, state)"
      />
      <HstCheckbox
        title="unit-after (icon)"
        :model-value="state.unitAfterIcon"
        @update:model-value="updateUnitAfter($event, state)"
      />
      <HstText
        title="unit-after (text)"
        :model-value="state.unitAfterText"
        @update:model-value="updateUnitAfter($event, state)"
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
        :unit-before="state.unitBeforeIcon ? IconMoney : state.unitBeforeText ? state.unitBeforeText : null"
        :unit-after="state.unitAfterIcon ? IconCheckCircle : state.unitAfterText ? state.unitAfterText : null"
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
