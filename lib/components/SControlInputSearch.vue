<script setup lang="ts">
import IconMagnifyingGlass from '~icons/ph/magnifying-glass-bold'
import { computed } from 'vue'
import { useControlSize } from '../composables/Control'
import { useTrans } from '../composables/Lang'
import { type Validatable } from '../composables/Validation'
import SInputText, { type Align, type TextColor } from './SInputText.vue'

const props = defineProps<{
  placeholder?: string
  unitAfter?: any
  textColor?: TextColor | ((value: string | null) => TextColor)
  align?: Align
  disabled?: boolean
  value?: string | null
  modelValue?: string | null
  displayValue?: string | null
  validation?: Validatable
}>()

defineEmits<{
  'update:model-value': [value: string | null]
  'input': [value: string | null]
  'blur': [value: string | null]
  'enter': [value: string | null]
}>()

const { t } = useTrans({
  en: { placeholder: 'Search items' },
  ja: { placeholder: '検索する' }
})

const size = useControlSize()

const sizeDict = {
  small: 'mini',
  medium: 'small'
} as const

const _value = computed(() => {
  return props.modelValue ?? props.value ?? null
})
</script>

<template>
  <div class="SControlInputSearch">
    <SInputText
      :size="sizeDict[size]"
      type="search"
      :placeholder="placeholder ?? t.placeholder"
      :unit-before="IconMagnifyingGlass"
      :model-value="_value"
      :validation
      hide-error
      @update:model-value="$emit('update:model-value', $event)"
      @input="$emit('input', $event)"
      @blur="$emit('blur', $event)"
      @enter="$emit('enter', $event)"
    />
  </div>
</template>

<style scoped lang="postcss">
.SControlInputSearch {
  flex-grow: 1;
  flex-shrink: 0;
}
</style>
