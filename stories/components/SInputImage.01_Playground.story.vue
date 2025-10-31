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

function initState() {
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
        v-model="state.help"
        title="help"
      />
      <HstSelect
        v-model="state.imageType"
        title="image-type"
        :options="{
          rectangle: 'rectangle',
          circle: 'circle'
        }"
      />
      <HstText
        v-model="state.imageWidth"
        title="image-width"
      />
      <HstText
        v-model="state.imageAspectRatio"
        title="image-aspect-ratio"
      />
      <HstText
        v-model="state.selectText"
        title="select-text"
      />
      <HstText
        v-model="state.removeText"
        title="remove-text"
      />
      <HstText
        v-model="state.accept"
        title="accept"
      />
      <HstCheckbox
        v-model="state.nullable"
        title="nullable"
      />
      <HstCheckbox
        v-model="state.disabled"
        title="disabled"
      />
      <HstCheckbox
        v-model="state.error"
        title="error"
      />
      <HstCheckbox
        v-model="state.hideError"
        title="hide-error"
      />
    </template>

    <template #default="{ state }">
      <Board :title :docs>
        <SInputImage
          v-model="data.image"
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
          :validation="validation.image"
          :hide-error="state.hideError"
        />
      </Board>
    </template>
  </Story>
</template>
