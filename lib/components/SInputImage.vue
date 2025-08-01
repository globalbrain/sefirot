<script setup lang="ts">
import IconImage from '~icons/ph/image-bold'
import { type Component, computed, ref } from 'vue'
import { useImageSrcFromFile } from '../composables/Image'
import { type Validatable } from '../composables/Validation'
import SButton from './SButton.vue'
import SInputBase, { type Color as CheckColor } from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type { CheckColor }
export type ImageType = 'rectangle' | 'circle'

const props = withDefaults(defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: CheckColor
  imageType?: ImageType
  imageWidth?: string
  imageAspectRatio?: string
  selectText?: string
  removeText?: string
  accept?: string
  nullable?: boolean
  disabled?: boolean
  value?: File | string | null
  modelValue?: File | string | null
  hideError?: boolean
  validation?: Validatable
}>(), {
  size: 'small',
  imageType: 'rectangle',
  imageWidth: '96px',
  imageAspectRatio: '1 / 1',
  selectText: 'Select image',
  removeText: 'Remove image',
  nullable: true
})

const emit = defineEmits<{
  'update:model-value': [file: File | null]
  'change': [file: File | null]
}>()

const fileInput = ref<HTMLInputElement | null>(null)

const _value = computed(() => {
  return (props.modelValue !== undefined)
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const { src: imageSrc } = useImageSrcFromFile(_value)

function openFileSelect() {
  fileInput.value!.click()
}

function onFileSelect(e: Event) {
  const file = ((e.target as HTMLInputElement).files ?? [])[0]

  emit('update:model-value', file ?? null)
  emit('change', file ?? null)

  file && props.validation?.$touch()
}

function onFileDelete() {
  fileInput.value!.value = ''

  emit('update:model-value', null)
  emit('change', null)
}
</script>

<template>
  <SInputBase
    class="SInputImage"
    :class="[size]"
    :label
    :note
    :info
    :check-icon
    :check-text
    :check-color
    :hide-error
    :validation
  >
    <template #default>
      <input
        ref="fileInput"
        class="file-input"
        type="file"
        :accept
        @change="onFileSelect"
      >

      <div class="container">
        <div class="image" :class="[imageType]">
          <div v-if="imageSrc" class="image-fill">
            <img class="image-fill-src" :src="imageSrc">
          </div>
          <div v-else class="image-empty">
            <div class="image-empty-inner">
              <IconImage class="image-empty-icon" />
            </div>
          </div>
        </div>
        <div class="control">
          <div class="actions">
            <SButton
              size="small"
              :label="selectText"
              :disabled
              @click="openFileSelect"
            />
            <SButton
              v-if="nullable && imageSrc"
              size="small"
              mode="danger"
              :label="removeText"
              :disabled
              @click="onFileDelete"
            />
          </div>
          <p v-if="help" class="help">
            {{ help }}
          </p>
        </div>
      </div>
    </template>

    <template v-if="$slots.info" #info>
      <slot name="info" />
    </template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.file-input {
  display: none;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 4px;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: center;
    gap: 24px;
  }
}

.image {
  display: flex;
  flex-shrink: 0;
  width: var(--input-image-width, v-bind(imageWidth));
  aspect-ratio: v-bind(imageAspectRatio);
  overflow: hidden;
}

.image-fill {
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-fill-src {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-empty {
  display: flex;
  border: 1px solid var(--c-border-mute-1);
  padding: 8px;
  width: 100%;
  height: 100%;
}

.image-empty-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed var(--c-border-mute-1);
  width: 100%;
  height: 100%;
}

.image-empty-icon {
  width: 24px;
  height: 24px;
  color: var(--c-text-3);
}

.control {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.actions {
  display: flex;
  gap: 8px;
}

.help {
  margin: 0;
  line-height: 20px;
  font-size: 12px;
  color: var(--c-text-2);
}

.image.rectangle .image-fill,
.image.rectangle .image-empty {
  border-radius: 6px;
}

.image.rectangle .image-empty-inner {
  border-radius: 3px;
}

.image.circle .image-fill,
.image.circle .image-empty,
.image.circle .image-empty-inner {
  border-radius: 50%;
}
</style>
