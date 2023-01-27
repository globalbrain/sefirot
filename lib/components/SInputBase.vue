<script setup lang="ts">
import IconQuestion from '@iconify-icons/ph/question'
import { IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent, computed, unref, useSlots } from 'vue'
import { Validatable } from '../composables/Validation'
import SIcon from './SIcon.vue'
import STooltip from './STooltip.vue'

const props = defineProps<{
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  hideError?: boolean
  validation?: Validatable
  checkIcon?: IconifyIcon | DefineComponent
  checkText?: string
  checkColor?: Color
}>()

type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const slots = useSlots()

const hasInfo = computed(() => {
  return slots.info || props.info
})

const error = computed(() => {
  if (!props.validation) {
    return null
  }

  const errorMsg = getErrorMsg(props.validation)
  const hasError = isDirtyAndInvalid(props.validation)
  const showError = !props.hideError && hasError && errorMsg

  return {
    has: hasError,
    show: showError,
    msg: errorMsg
  }
})

function isDirtyAndInvalid(validation: Validatable) {
  return validation.$dirty && validation.$invalid
}

function getErrorMsg(validation: Validatable) {
  const errors = validation.$errors

  return errors.length > 0 ? unref(errors[0].$message) : null
}
</script>

<template>
  <div class="SInputBase" :class="{ 'has-error': error?.has }">
    <label v-if="label" class="label" :for="name">
      <STooltip v-if="hasInfo" :text="info">
        <div class="label-text">
          <span class="label-text-value">{{ label }}</span>
          <SIcon class="label-text-info" :icon="IconQuestion" />
        </div>
        <template v-if="$slots.info" #text><slot name="info" /></template>
      </STooltip>
      <div v-else class="label-text">
        <span class="label-text-value">{{ label }}</span>
      </div>

      <span class="label-note">{{ note }}</span>

      <span v-if="checkIcon || checkText" class="check" :class="checkColor || 'neutral'">
        <SIcon v-if="checkIcon" :icon="checkIcon"/>
        <span v-if="checkText" class="check-text">{{ checkText }}</span>
      </span>
    </label>

    <slot />

    <div class="help">
      <slot name="before-help" />
      <p v-if="error?.show" class="help-error">{{ error.msg }}</p>
      <p v-if="help" class="help-text">{{ help }}</p>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.SInputBase.mini {
  .label            { padding-bottom: 6px; }
  .label-text-value { font-size: 12px; }
  .label-text-info  { width: 14px; height: 14px; }
}

.SInputBase.small {
  .label              { padding-bottom: 8px; }
  .label-text-value   { font-size: 14px; }
  .label-note, .check { transform: translateY(1px); }
}

.SInputBase.medium {
  .label              { padding-bottom: 8px; }
  .label-text-value   { font-size: 14px; }
  .label-note, .check { transform: translateY(1px); }
}

.SInputBase.has-error {
  .label-text-value {
    color: var(--input-error-text-color);
  }
}

.label {
  display: flex;
  align-items: center;
  width: 100%;
  line-height: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.25s;
}

.label-text {
  display: flex;
  align-items: center;
  gap: 4px;
}

.label-text-value {
  color: var(--input-label-color);
}

.label-text-info {
  width: 16px;
  height: 16px;
  color: var(--c-text-2);
  transition: color 0.25s;

  .label-text:hover & {
    color: var(--c-info-text);
  }
}

.label-note {
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.help {
  position: relative;
}

.help-error {
  width: 100%;
  margin: 0;
  padding: 6px 0 0 0;
  line-height: 18px;
  font-size: 12px;
  font-weight: 500;
  color: var(--input-error-text-color);
  transition: opacity 0.25s, transform 0.25s;
}

.help-text {
  margin: 0;
  padding: 4px 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
}

.help-error + .help-text,
.help-text + .help-error,
.help-text + .help-text {
  padding: 0;
}

.check {
  margin-left: auto;
  display: inline-flex;
  gap: 4px;
  font-size: 16px;

  &.neutral { color: var(--c-neutral-1); }
  &.mute    { color: var(--c-text-2); }
  &.info    { color: var(--c-info-light); }
  &.success { color: var(--c-success-light); }
  &.warning { color: var(--c-warning-light); }
  &.danger  { color: var(--c-danger-light); }

  &-text {
    font-size: 12px;
  }
}
</style>
