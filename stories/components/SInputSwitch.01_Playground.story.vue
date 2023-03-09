<script setup lang="ts">
import type { ActiveColor, Size } from 'sefirot/components/SInputSwitch.vue'
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'
import { ref } from 'vue'

const title = 'Components / SInputSwitch / 01. Playground'
const docs = '/components/input-switch'

const on = ref(false)

function state() {
  return {
    size: 'small' as Size,
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    help: 'This is a help text.',
    text: 'Text for the switch',
    color: 'info' as ActiveColor,
    disabled: false,
    error: false
  }
}
</script>

<template>
  <Story :title="title" :init-state="state" source="Not available" auto-props-disabled>
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
      <HstText
        title="text"
        v-model="state.text"
      />
      <HstSelect
        title="color"
        :options="{
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
        v-model="state.color"
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
      <Board :title="title" :docs="docs">
        <div class="max-w-192">
          <SInputSwitch
            :class="{ 'has-error': state.error }"
            :size="state.size"
            :label="state.label"
            :info="state.info"
            :note="state.note"
            :text="state.text"
            :color="state.color"
            :help="state.help"
            :disabled="state.disabled"
            v-model="on"
          />
        </div>
      </Board>
    </template>
  </Story>
</template>
