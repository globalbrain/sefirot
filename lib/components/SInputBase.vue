<script setup lang="ts">
import IconQuestion from '~icons/ph/question'
import { type Component, computed, unref, useSlots } from 'vue'
import { type Validatable } from '../composables/Validation'
import STooltip from './STooltip.vue'

type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  validation?: Validatable
  hideError?: boolean
}>()

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
      <span class="label-text">{{ label }}</span>

      <STooltip v-if="hasInfo" :text="info" trigger="focus" @click.prevent>
        <div class="label-info">
          <IconQuestion class="label-info-icon" />
        </div>
        <template v-if="$slots.info" #text><slot name="info" /></template>
      </STooltip>

      <span class="label-note" :class="{ 'has-info': hasInfo }">{{ note }}</span>

      <span v-if="checkIcon || checkText" class="check" :class="checkColor || 'neutral'">
        <component v-if="checkIcon" :is="checkIcon" class="check-icon" />
        <span v-if="checkText" class="check-text">{{ checkText }}</span>
      </span>
    </label>

    <slot :has-error="error?.has" />

    <div class="help">
      <slot name="before-help" />
      <p v-if="error?.show" class="help-error">{{ error.msg }}</p>
      <p v-if="help" class="help-text">{{ help }}</p>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SInputBase.mini {
  .label           { padding-bottom: 4px; min-height: 24px; }
  .label-text      { font-size: var(--input-label-font-size, var(--input-mini-label-font-size)); }
  .label-info      { margin-top: 0; margin-bottom: 0; width: 20px; height: 20px; }
  .label-info-icon { width: 14px; height: 14px; }
  .label-note      { padding-top: 0; line-height: 20px; }
  .check           { padding-top: 0; line-height: 20px; }
}

.SInputBase.small {
  .label      { padding-bottom: 6px; min-height: 26px; }
  .label-text { font-size: var(--input-label-font-size, var(--input-small-label-font-size)); }
}

.SInputBase.medium {
  .label      { padding-bottom: 6px; min-height: 26px; }
  .label-text { font-size: var(--input-label-font-size, var(--input-medium-label-font-size)); }
}

.SInputBase.has-error {
  .label-text {
    color: var(--input-error-text-color);
  }
}

.label {
  display: flex;
  align-items: flex-start;
  width: 100%;
  line-height: 20px;
  cursor: pointer;
  transition: color 0.25s;
}

.label-text {
  font-weight: 500;
  color: var(--input-label-color);
  transition: color 0.25s;
}

:deep(.STooltip) {
  .label-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    margin-top: -2px;
    margin-left: 2px;
    margin-bottom: -2px;
    width: 24px;
    height: 24px;
  }

  .label-info-icon {
    width: 16px;
    height: 16px;
    color: var(--c-text-2);
    transition: color 0.25s;
  }

  &:hover, &:focus, &:focus-within {
    .label-info-icon {
      color: var(--c-text-info-1);
    }
  }

  .content {
    vertical-align: middle;
  }
}

.label-note {
  display: inline-block;
  flex-shrink: 0;
  margin-left: 8px;
  padding-top: 1px;
  line-height: 19px;
  font-size: 12px;
  font-weight: 400;
  color: var(--c-text-2);

  &.has-info {
    margin-left: 4px;
  }
}

.help {
  position: relative;
}

.help-error {
  width: 100%;
  max-width: 65ch;
  margin: 0;
  padding: 6px 0 0 0;
  line-height: 18px;
  font-size: 12px;
  font-weight: 400;
  color: var(--input-error-text-color);
  transition: opacity 0.25s, transform 0.25s;
}

.help-text {
  max-width: 65ch;
  margin: 0;
  padding: 6px 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 400;
  color: var(--c-text-2);
}

.help-error + .help-text,
.help-text + .help-error,
.help-text + .help-text {
  padding: 0;
}

.check {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  padding-top: 1px;
  padding-left: 8px;
  line-height: 19px;
  font-size: 12px;

  &.neutral { color: var(--c-text-1); }
  &.mute    { color: var(--c-text-2); }
  &.info    { color: var(--c-text-info-1); }
  &.success { color: var(--c-text-success-1); }
  &.warning { color: var(--c-text-warning-1); }
  &.danger  { color: var(--c-text-danger-1); }
}

.check-icon {
  width: 14px;
  height: 14px;
}

.check-icon.SSpinner {
  margin: -4px;
  width: 24px;
  height: 24px;
}
</style>
