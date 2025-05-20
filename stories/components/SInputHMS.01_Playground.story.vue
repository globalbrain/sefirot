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
    size: 'small',
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
        title="no-hour"
        v-model="state.noHour"
      />
      <HstCheckbox
        title="no-minute"
        v-model="state.noMinute"
      />
      <HstCheckbox
        title="no-second"
        v-model="state.noSecond"
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
        <SInputHMS
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
          v-model="input"
        />
      </Board>
    </template>
  </Story>
</template>
