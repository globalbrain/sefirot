<script setup lang="ts">
import IconCaretDown from '~icons/ph/caret-down'
import IconCaretUp from '~icons/ph/caret-up'
import { computed, ref } from 'vue'
import SInputBase, { type Props as BaseProps } from './SInputBase.vue'

export interface Props extends BaseProps {
  placeholder?: string
  options: Option[]
  nullable?: boolean
  disabled?: boolean
  value?: Value
  modelValue?: Value
}

export type Value = any

export interface Option {
  label: string
  value: any
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  'update:model-value': [value: Value]
  'change': [value: Value]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const isFocused = ref(false)

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

const isNotSelected = computed(() => {
  return _value.value == null || _value.value === ''
})

function isSelectedOption(option: Option): boolean {
  return option.value === _value.value
}

function emitChange(e: any): void {
  if (!props.disabled) {
    props.validation?.$touch()

    const input = e.target.value
    const value = props.options[input]?.value ?? null

    emit('update:model-value', value)
    emit('change', value)
  }
}
</script>

<template>
  <SInputBase
    class="SInputSelect"
    :class="classes"
    :size
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :hide-error
    :validation
  >
    <div class="box" :class="{ focus: isFocused }">
      <select
        class="select"
        :class="{ 'is-not-selected': isNotSelected }"
        :disabled
        @focus="isFocused = true"
        @blur="isFocused = false"
        @change="emitChange"
      >
        <option
          v-if="placeholder || nullable"
          class="option"
          value="-1"
          :selected="isNotSelected"
          :disabled="!nullable"
        >
          {{ placeholder || 'Please select' }}
        </option>

        <option
          v-for="option, index in options"
          :key="JSON.stringify(option)"
          :style="{ display: option.disabled ? 'none' : undefined }"
          class="option"
          :value="index"
          :selected="isSelectedOption(option)"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="icon" role="button">
        <IconCaretUp class="icon-svg up" />
        <IconCaretDown class="icon-svg down" />
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
.SInputSelect.sm,
.SInputSelect.mini {
  line-height: 30px;
  font-size: var(--input-font-size, var(--input-mini-font-size));

  .box      { height: 32px; }
  .select   { padding: 0 30px 0 10px; }
  .icon     { top: 5px; right: 8px; }
  .icon-svg { width: 12px; height: 12px; }
}

.SInputSelect.md {
  line-height: 34px;
  font-size: var(--input-font-size, 14px);

  .box      { height: 36px; }
  .select   { padding: 0 30px 0 10px; }
  .icon     { top: 5px; right: 8px; }
  .icon-svg { width: 14px; height: 14px; }
}

.SInputSelect.small {
  line-height: 38px;
  font-size: var(--input-font-size, var(--input-small-font-size));

  .box      { height: 40px; }
  .select   { padding: 0 30px 0 12px; }
  .icon     { top: 7px; right: 10px; }
  .icon-svg { width: 14px; height: 14px; }
}

.SInputSelect.medium {
  line-height: 46px;
  font-size: var(--input-font-size, var(--input-medium-font-size));

  .box      { height: 48px; }
  .select   { padding: 0 44px 0 16px; }
  .icon     { top: 11px; right: 12px; }
  .icon-svg { width: 14px; height: 14px; }
}

.SInputSelect.disabled {
  .box {
    color: var(--input-disabled-value-color);
    background-color: var(--input-disabled-bg-color);
  }

  .box:hover { border-color: var(--input-border-color); }
  .box.focus { border-color: var(--input-border-color); }

  .box:hover .select { cursor: not-allowed; }
}

.SInputSelect.has-error {
  .box { border-color: var(--input-error-border-color); }
}

.box {
  position: relative;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  width: 100%;
  color: var(--input-value-color);
  background-color: var(--input-bg-color);
  cursor: pointer;
  transition: border-color 0.25s, background-color 0.25s;

  &:hover { border-color: var(--input-hover-border-color); }
  &.focus { border-color: var(--input-focus-border-color); }
}

.select {
  position: relative;
  z-index: 20;
  display: block;
  margin: 0;
  border: 0;
  border-radius: 4px;
  width: 100%;
  line-height: inherit;
  font-size: inherit;
  background-color: transparent;
  cursor: pointer;

  &.select.is-not-selected {
    color: var(--input-placeholder-color);
  }
}

.option {
  color: initial;
}

.icon {
  position: absolute;
  z-index: 10;
  color: var(--c-text-2);
  cursor: pointer;
}

.icon-svg.up {
  margin-bottom: -4px;
}
</style>
