<script setup lang="ts">
import SInputImage from 'sefirot/components/SInputImage.vue'
import { useData } from 'sefirot/composables/Data'
import { useValidation } from 'sefirot/composables/Validation'
import { maxFileSize } from 'sefirot/validation/rules'

const title = 'Components / SInputImage / 01. Playground'
const docs = '/components/input-image'

const { data } = useData({
  image: null as File | null
})

const { validation } = useValidation(data, {
  image: {
    maxFileSize: maxFileSize('500kb')
  }
})

function state() {
  return {
    size: 'small',
    label: 'Upload photo',
    info: '',
    note: '',
    help: 'JPG or PNG. 500KB max.',
    imageType: 'rectangle',
    imageWidth: '96px',
    imageAspectRatio: '1 / 1',
    selectText: 'Select image',
    removeText: 'Remove image',
    accept: '.jpg,.jpeg,.png',
    nullable: true,
    disabled: false,
    error: false,
    hideError: false
  } as const
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
      <HstSelect
        title="image-type"
        :options="{
          rectangle: 'rectangle',
          circle: 'circle'
        }"
        v-model="state.imageType"
      />
      <HstText
        title="image-width"
        v-model="state.imageWidth"
      />
      <HstText
        title="image-aspect-ratio"
        v-model="state.imageAspectRatio"
      />
      <HstText
        title="select-text"
        v-model="state.selectText"
      />
      <HstText
        title="remove-text"
        v-model="state.removeText"
      />
      <HstText
        title="accept"
        v-model="state.accept"
      />
      <HstCheckbox
        title="nullable"
        v-model="state.nullable"
      />
      <HstCheckbox
        title="disabled"
        v-model="state.disabled"
      />
      <HstCheckbox
        title="error"
        v-model="state.error"
      />
      <HstCheckbox
        title="hide-error"
        v-model="state.hideError"
      />
    </template>

    <template #default="{ state }">
      <Board :title="title" :docs="docs">
        <SInputImage
          class="i"
          :class="{ 'has-error': state.error }"
          :size="state.size"
          :label="state.label"
          :info="state.info"
          :note="state.note"
          :help="state.help"
          :image-type="state.imageType"
          :image-width="state.imageWidth"
          :image-aspect-ratio="state.imageAspectRatio"
          :select-text="state.selectText"
          :remove-text="state.removeText"
          :accept="state.accept"
          :nullable="state.nullable"
          :disabled="state.disabled"
          v-model="data.image"
          :validation="validation.image"
          :hide-error="state.hideError"
        />
      </Board>
    </template>
  </Story>
</template>
