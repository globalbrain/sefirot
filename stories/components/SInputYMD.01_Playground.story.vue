<script setup lang="ts">
import SInputYMD from 'sefirot/components/SInputYMD.vue'
import { ref } from 'vue'

const title = 'Components / SInputYMD / 01. Playground'
const docs = '/components/input-ymd'

const input = ref({
  year: null,
  month: null,
  date: null
})

function initState() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note',
    help: 'This is a help text.',
    noYear: false,
    noMonth: false,
    noDate: false,
    block: false,
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
        title="help"
        v-model="state.help"
      />
      <HstCheckbox
        title="no-year"
        v-model="state.noYear"
      />
      <HstCheckbox
        title="no-month"
        v-model="state.noMonth"
      />
      <HstCheckbox
        title="no-date"
        v-model="state.noDate"
      />
      <HstCheckbox
        title="block"
        v-model="state.block"
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
        <SInputYMD
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :no-year="state.noYear"
          :no-month="state.noMonth"
          :no-date="state.noDate"
          :block="state.block"
          :disabled="state.disabled"
          v-model="input"
        />
      </Board>
    </template>
  </Story>
</template>
