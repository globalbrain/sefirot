<script setup lang="ts">
import { type Component, computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase, { type Color, type Size } from './SInputBase.vue'

export type { Color, Size }

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  text?: string
  disabled?: boolean
  modelValue: boolean
  validation?: Validatable
  hideError?: boolean
}>()

const emit = defineEmits<{
  'update:model-value': [value: boolean]
  'change': [value: boolean]
}>()

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

function onClick() {
  if (!props.disabled) {
    emit('update:model-value', !props.modelValue)
    emit('change', !props.modelValue)
  }
}
</script>

<template>
  <SInputBase
    class="SInputRadio"
    :class="classes"
    :size
    :name
    :label
    :note
    :info
    :help
    :check-icon
    :check-text
    :check-color
    :validation
    :hide-error
  >
    <div class="container">
      <div
        class="input"
        :class="{ on: props.modelValue }"
        role="button"
        :aria-disabled="disabled"
        @click="onClick"
      >
        <div class="box">
          <div class="check" />
        </div>

        <p v-if="text" class="text">{{ text }}</p>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.container {
  display: flex;
}

.input {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  cursor: pointer;

  &:hover {
    .box {
      border-color: var(--c-border-info-1);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-fg-info-1);
  }

  .check {
    opacity: 1;
    transform: scale(0.6);
  }
}

.box {
  position: relative;
  border: 1px solid var(--c-border-mute-1);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s;
}

.check {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 100%;
  background-color: var(--c-fg-info-1);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.25s, transform 0.1s;
}

.text {
  margin: 0;
  padding-left: 10px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
}

.SInputRadio.md {
  .input {
    height: 36px;
  }
}

.SInputRadio.disabled {
  .input {
    cursor: not-allowed;
  }

  .input .box {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);

    &:hover                     { border-color: var(--input-disabled-border-color); }
    &:focus:not(:focus-visible) { border-color: var(--input-disabled-border-color); }
  }

  .input.on .box {
    border-color: var(--c-border-info-1);
  }

  .check {
    background-color: var(--c-blue-9);
  }
}
</style>
