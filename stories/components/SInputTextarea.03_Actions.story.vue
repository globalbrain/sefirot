<script setup lang="ts">
import IconLink from '~icons/ph/link-bold'
import IconYouTubeLogo from '~icons/ph/youtube-logo-bold'
import SButton from 'sefirot/components/SButton.vue'
import SInputTextarea, { type Size } from 'sefirot/components/SInputTextarea.vue'
import { useMarkdown } from 'sefirot/composables/Markdown'
import { ref } from 'vue'

const title = 'Components / SInputTextarea / 03. Actions'
const docs = '/components/input-textarea'

const text = ref('')

function initState() {
  return {
    size: 'small',
    label: 'Label',
    info: 'Some helpful information.',
    note: 'Note text',
    placeholder: 'Placeholder text',
    help: 'This is a help text.',
    rows: 5,
    disabled: false,
    error: false
  } satisfies {
    size: Size
    label: string
    info: string
    note: string
    placeholder: string
    help: string
    rows: number
    disabled: boolean
    error: boolean
  }
}

const render = useMarkdown()

function preview() {
  if (!text.value) { return 'Nothing to preview' }
  return render(text.value)
}

function alert(message: string) {
  window.alert(message) // eslint-disable-line no-alert
}
</script>

<template>
  <Story :title :init-state source="Not available" auto-props-disabled>
    <template #controls="{ state }">
      <HstSelect
        v-model="state.size"
        title="size"
        :options="{
          mini: 'mini',
          small: 'small',
          medium: 'medium'
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
        v-model="state.help"
        title="help"
      />
      <HstNumber
        v-model="state.rows"
        title="rows"
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
        <SInputTextarea
          v-model="text"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :placeholder="state.placeholder"
          :rows="state.rows"
          :disabled="state.disabled"
          :preview
        >
          <template #actions>
            <SButton type="text" size="sm" mode="mute" :icon="IconLink" @click="alert('Action link clicked')" />
            <SButton type="text" size="sm" mode="mute" :icon="IconYouTubeLogo" @click="alert('Action YouTube clicked')" />
          </template>
        </SInputTextarea>
      </Board>
    </template>
  </Story>
</template>
