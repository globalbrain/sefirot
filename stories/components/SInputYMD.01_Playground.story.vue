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
    size: 'md',
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
        v-model="state.noYear"
        title="no-year"
      />
      <HstCheckbox
        v-model="state.noMonth"
        title="no-month"
      />
      <HstCheckbox
        v-model="state.noDate"
        title="no-date"
      />
      <HstCheckbox
        v-model="state.block"
        title="block"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="disabled"
      />
      <HstCheckbox
        v-model="state.error"
        title="error"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputYMD
          v-model="input"
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
        />
      </Board>
    </template>
  </Story>
</template>
