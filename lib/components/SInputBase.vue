<script setup lang="ts">
import IconQuestion from '@iconify-icons/ph/question'
import { computed, unref } from 'vue'
import { Validatable } from '../composables/Validation'
import SIcon from './SIcon.vue'
import STooltip from './STooltip.vue'

const props = defineProps<{
  name?: string
  label?: string
  note?: string
  info?: string
  help?: string
  hideError?: boolean
  validation?: Validatable
}>()

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
      <STooltip v-if="info" :text="info">
        {{ label }} <SIcon class="info-icon" :icon="IconQuestion" />
        <template v-if="$slots.info" #text><slot name="info" /></template>
      </STooltip>
      <template v-else>{{ label }}</template>
      <span class="note">{{ note }}</span>
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
  .label {
    padding-bottom: 6px;
    font-size: 12px;
  }
}

.SInputBase.small {
  .label {
    padding-bottom: 8px;
    font-size: 14px;
  }
}

.SInputBase.medium {
  .label {
    padding-bottom: 8px;
    font-size: 14px;
  }
}

.SInputBase.has-error {
  .label {
    color: var(--input-error-text-color);
  }
}

.label {
  display: block;
  width: 100%;
  line-height: 16px;
  font-weight: 500;
  color: var(--input-label-color);
  cursor: pointer;
  transition: color 0.25s;
}

.info-icon {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -0.1em;
  color: var(--c-text-2);
}

.note {
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
</style>
