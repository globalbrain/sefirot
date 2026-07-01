<script setup lang="ts">
import SInputImage, { type ImageType, type Size } from '../../../components/SInputImage.vue'
import { useTrans } from '../../../composables/Lang'
import { type Validatable } from '../../../composables/Validation'

export interface Props {
  label?: string
  help?: string
  accept?: string
  imageType?: ImageType
  size?: Size
  disabled?: boolean
  validation?: Validatable
}

withDefaults(defineProps<Props>(), {
  imageType: 'circle',
  size: 'small'
})

// The model is the raw `File` the user just picked, the existing image URL
// (a string), or `null` when there is no image / it was removed. `SInputImage`
// renders a preview from any of these via `useImageSrcFromFile`.
const model = defineModel<File | string | null>()

const { t } = useTrans({
  en: { select: 'Select image', remove: 'Remove image' },
  ja: { select: '画像を選択', remove: '画像を削除' }
})
</script>

<template>
  <SInputImage
    v-model="model"
    class="LensInputAvatar"
    :label
    :help
    :accept
    :image-type
    :size
    :disabled
    :select-text="t.select"
    :remove-text="t.remove"
    :validation
  />
</template>
