<script setup lang="ts">
import IconCaretDown from '@iconify-icons/ph/caret-down'
import { useElementBounding, useWindowSize } from '@vueuse/core'
import { DropdownSection } from 'sefirot/composables/Dropdown'
import { useFlyout } from 'sefirot/composables/Flyout'
import { computed, ref, unref } from 'vue'
import SDropdown from './SDropdown.vue'
import SIcon, { SIconProps } from './SIcon.vue'

const props = withDefaults(defineProps<{
  unclickable?: boolean
  label?: string | SIconProps['icon']
  dropdown?: DropdownSection[]
  dropdowpPosition?: 'top' | 'bottom'
  noDropdownArrow?: boolean
  disabled?: boolean
}>(), {
  unclickable: false,
  dropdown: () => [],
  noDropdownArrow: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const isTypeText = computed(() => props.unclickable)
const isTypeButton = computed(() => !props.unclickable && !props.dropdown.length)
const isTypeDropdown = computed(() => !props.unclickable && !!props.dropdown.length)

const selectedOptionLabel = computed(() => {
  for (const section of props.dropdown) {
    if (section.type === 'filter') {
      for (const { label, value } of unref(section.options)) {
        if (unref(section.selected) === value) {
          return label
        }
      }
    }
  }

  return ''
})

const isFocused = ref(false)

const { container, isOpen, open } = useFlyout()
const { top, bottom } = useElementBounding(container)
const { height } = useWindowSize()
const pos = ref<'top' | 'bottom'>('bottom')

function handleFocus() {
  if (isTypeText.value || props.disabled) {
    return
  }

  isFocused.value = true
}

function handleBlur() {
  if (isTypeText.value || props.disabled) {
    return
  }

  isFocused.value = false
}

function handleClickButton() {
  if (isTypeText.value || props.disabled) {
    return
  }

  emit('click')

  if (isTypeDropdown.value) {
    pos.value = getPosition()
    open()
  }
}

function getPosition() {
  if (props.dropdowpPosition) {
    return props.dropdowpPosition
  }

  const dialogHeight = 400

  // If the space top of the input is not enough to show dialog, just show
  // the dialo at the bottom of the input.
  if (top.value < dialogHeight) {
    return 'bottom'
  }

  // Else show dialog depending on the space bottom of the input.
  return bottom.value + dialogHeight <= height.value ? 'bottom' : 'top'
}
</script>

<template>
  <div
    class="SInputAddon"
    :class="{
      text: isTypeText,
      button: isTypeButton,
      dropdown: isTypeDropdown,
      focused: isFocused,
      disabled: props.disabled
    }"
    ref="container"
    @click.stop
  >
    <component
      :is="isTypeText ? 'div' : 'button'"
      :disabled="isTypeText ? null : props.disabled"
      @focus="handleFocus"
      @blur="handleBlur"
      @click="handleClickButton"
      class="addon-inner"
    >
      <div class="addon-label">
        <SIcon v-if="typeof props.label !== 'string' && props.label" :icon="props.label" class="addon-icon-svg" />
        <span v-else>{{ props.label || selectedOptionLabel }}</span>
      </div>
      <div v-if="isTypeDropdown && !props.noDropdownArrow" class="addon-icon">
        <SIcon :icon="IconCaretDown" class="addon-icon-svg down" />
      </div>
    </component>
    <div v-if="isTypeDropdown && dropdown && isOpen" class="addon-dropdown" :class="pos">
      <SDropdown :sections="dropdown" />
    </div>
  </div>
</template>
