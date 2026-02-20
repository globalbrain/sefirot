<script setup lang="ts">
import SInputSwitch, { type ActiveColor, type Size } from 'sefirot/components/SInputSwitch.vue'
import { ref } from 'vue'

const title = 'Components / SInputSwitch / 01. Playground'
const docs = '/components/input-switch'

const on = ref(false)

function initState() {
  return {
    size: 'md',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    help: 'This is a help text.',
    text: 'Text for the switch',
    color: 'info',
    disabled: false,
    error: false
  } satisfies {
    size: Size
    label: string
    info: string
    note: string
    help: string
    text: string
    color: ActiveColor
    disabled: boolean
    error: boolean
  }
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
      <HstText
        v-model="state.text"
        title="text"
      />
      <HstSelect
        v-model="state.color"
        title="color"
        :options="{
          info: 'info',
          success: 'success',
          warning: 'warning',
          danger: 'danger'
        }"
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
        <div class="max-w-192">
          <SInputSwitch
            v-model="on"
            :class="{ 'has-error': state.error }"
            :size="state.size"
            :label="state.label"
            :info="state.info"
            :note="state.note"
            :text="state.text"
            :color="state.color"
            :help="state.help"
            :disabled="state.disabled"
          />
        </div>
      </Board>
    </template>
  </Story>
</template>
