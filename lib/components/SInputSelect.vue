<template>
  <SInputBase
    class="SInputSelect"
    :class="classes"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage ?? true"
    :validation="validation"
  >
    <div class="box" :class="{ focus: isFocused }">
      <select
        class="select"
        :class="{ 'is-not-selected': isNotSelected }"
        :disabled="disabled"
        @focus="focus"
        @blur="blur"
        @change="emitChange"
      >
        <option
          v-if="placeholder || nullable"
          :value="JSON.stringify({ value: null })"
          :selected="isNotSelected"
          :disabled="!nullable"
        >
          {{ placeholder || 'Please select' }}
        </option>

        <option
          v-for="(option, index) in options"
          :key="index"
          :style="{ display: option.disabled ? 'none' : undefined }"
          :value="JSON.stringify(option)"
          :selected="isSelectedOption(option)"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="icon" role="button">
        <SIconChevronUp class="icon-svg up" />
        <SIconChevronDown class="icon-svg down" />
      </div>
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SIconChevronUp from './icons/SIconChevronUp.vue'

type Size = 'mini' | 'small' | 'medium'

interface Option {
  label: string
  value: boolean | number | string
  disabled?: boolean
}

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  placeholder: { type: String, default: null },
  options: { type: Array as PropType<Option[]>, required: true },
  disabled: { type: Boolean, default: false },
  nullable: { type: Boolean, default: false },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: [String, Number, Boolean] as PropType<string | number | boolean | null>, default: null },
  validation: { type: Object as PropType<Validatable>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled ?? false }
])

const isNotSelected = computed(() => {
  return props.modelValue === undefined || props.modelValue === null || props.modelValue === ''
})

function isSelectedOption(option: Option): boolean {
  return option.value === props.modelValue
}

function focus() {
  isFocused.value = true
}

function blur() {
  isFocused.value = false
}

function emitChange(e: any): void {
  props.validation?.$touch()

  const option = JSON.parse(e.target.value)

  emit('update:modelValue', option.value)
}
</script>

<style scoped lang="postcss">
.SInputSelect.mini {
  .box {
    height: 32px;
  }

  .select {
    padding: 3px 30px 3px 12px;
    line-height: 24px;
    font-size: 14px;
  }

  .icon {
    top: 3px;
    right: 8px;
  }
}

.SInputSelect.small {
  .box {
    height: 40px;
  }

  .select {
    padding: 7px 30px 5px 12px;
    line-height: 24px;
    font-size: 16px;
  }

  .icon {
    top: 7px;
    right: 10px;
  }
}

.SInputSelect.medium {
  .box {
    height: 48px;
  }

  .select {
    padding: 11px 44px 11px 16px;
    line-height: 24px;
    font-size: 16px;
  }

  .icon {
    top: 11px;
    right: 12px;
  }
}

.SInputSelect.disabled {
  .box {
    background-color: var(--c-bg-mute);
  }

  .box:hover .select {
    cursor: not-allowed;
  }
}

.SInputSelect.has-error {
  .box {
    border-color: var(--c-danger);
  }

  .select {
    border-color: var(--c-danger);
  }
}

.box {
  position: relative;
  border: 1px solid var(--input-border);
  border-radius: 4px;
  width: 100%;
  color: var(--input-text);
  cursor: pointer;
  transition: border-color .25s, background-color .25s;

  &:hover,
  &.focus {
    border-color: var(--input-border);
  }

  &:focus:not(:focus-visible) {
    border-color: var(--input-border);
    outline: 0;
  }
}

.select {
  position: relative;
  z-index: 20;
  display: block;
  border: 0;
  border-radius: 4px;
  width: 100%;
  background-color: transparent;
  cursor: pointer;

  &.select.is-not-selected {
    color: var(--input-placeholder);
    font-weight: 500;
  }
}

.icon {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}

.icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: var(--input-placeholder);
}

.icon-svg.up {
  margin-bottom: -4px;
}
</style>
