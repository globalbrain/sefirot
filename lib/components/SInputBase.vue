<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import IconQuestion from '@iconify-icons/ph/question'
import { type DefineComponent, computed, unref, useSlots } from 'vue'
import { type Validatable } from '../composables/Validation'
import SIcon from './SIcon.vue'
import STooltip from './STooltip.vue'

type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  name?: string
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: IconifyIcon | DefineComponent
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
        <SIcon class="label-info" :icon="IconQuestion" />
        <template v-if="$slots.info" #text><slot name="info" /></template>
      </STooltip>

      <span class="label-note">{{ note }}</span>

      <span v-if="checkIcon || checkText" class="check" :class="checkColor || 'neutral'">
        <SIcon v-if="checkIcon" class="check-icon" :icon="checkIcon" />
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

<style scoped lang="postcss">
.SInputBase.mini {
  .label      { padding-bottom: 6px; height: 22px; }
  .label-text { font-size: var(--input-label-font-size, var(--input-mini-label-font-size)); }
  .label-info { width: 14px; height: 14px; }
}

.SInputBase.small {
  .label      { padding-bottom: 8px; height: 24px; }
  .label-text { font-size: var(--input-label-font-size, var(--input-small-label-font-size)); }
}

.SInputBase.medium {
  .label      { padding-bottom: 8px; height: 24px; }
  .label-text { font-size: var(--input-label-font-size, var(--input-medium-label-font-size)); }
}

.SInputBase.has-error {
  .label-text {
    color: var(--input-error-text-color);
  }
}

.label {
  display: flex;
  align-items: baseline;
  width: 100%;
  line-height: 16px;
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
    display: inline-block;
    margin-left: 4px;
    width: 16px;
    height: 16px;
    color: var(--c-text-2);
    transition: color 0.25s;
  }

  &:hover, &:focus, &:focus-within {
    .label-info {
      color: var(--c-info-text);
    }
  }

  .content {
    vertical-align: middle;
  }
}

.label-note {
  display: inline-block;
  margin-left: 8px;
  font-size: 12px;
  font-weight: 400;
  color: var(--c-text-2);
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
  padding: 4px 0 0;
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
  align-items: center;
  gap: 4px;
  margin-left: auto;
  line-height: 16px;
  font-size: 12px;

  &.neutral { color: var(--c-text-1); }
  &.mute    { color: var(--c-text-2); }
  &.info    { color: var(--c-info-text); }
  &.success { color: var(--c-success-text); }
  &.warning { color: var(--c-warning-text); }
  &.danger  { color: var(--c-danger-text); }
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
