<script setup lang="ts">
import SInputHMS from 'sefirot/components/SInputHMS.vue'
import { ref } from 'vue'

const title = 'Components / SInputHMS / 01. Playground'
const docs = '/components/input-hms'

const input = ref({
  hour: null,
  minute: null,
  second: null
})

function initState() {
  return {
    size: 'md',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note',
    help: 'This is a help text.',
    noHour: false,
    noMinute: false,
    noSecond: false,
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
        v-model="state.noHour"
        title="no-hour"
      />
      <HstCheckbox
        v-model="state.noMinute"
        title="no-minute"
      />
      <HstCheckbox
        v-model="state.noSecond"
        title="no-second"
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
        <SInputHMS
          v-model="input"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :no-hour="state.noHour"
          :no-minute="state.noMinute"
          :no-second="state.noSecond"
          :disabled="state.disabled"
        />
      </Board>
    </template>
  </Story>
</template>
