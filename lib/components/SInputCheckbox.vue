<script setup lang="ts">
import { type IconifyIcon } from '@iconify/vue/dist/offline'
import IconCheck from '@iconify-icons/ph/check-bold'
import { computed } from 'vue'
import { type Validatable } from '../composables/Validation'
import SIcon from './SIcon.vue'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = withDefaults(defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  checkIcon?: IconifyIcon
  checkText?: string
  checkColor?: Color
  text?: string
  disabled?: boolean
  value?: boolean
  modelValue?: boolean
  validation?: Validatable
  hideError?: boolean
}>(), {
  value: undefined,
  modelValue: undefined
})

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const classes = computed(() => [
  props.size ?? 'small',
  { disabled: props.disabled }
])

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : false
})

function onClick() {
  if (!props.disabled) {
    emit('update:model-value', !_value.value)
    emit('change', !_value.value)
  }
}
</script>

<template>
  <SInputBase
    class="SInputCheckbox"
    :class="classes"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :check-icon="checkIcon"
    :check-text="checkText"
    :check-color="checkColor"
    :validation="validation"
  >
    <div class="container">
      <div
        class="input"
        :class="{ on: _value }"
        role="button"
        @click="onClick"
        :aria-disabled="disabled"
      >
        <div class="box">
          <div class="check">
            <SIcon :icon="IconCheck" class="check-icon" />
          </div>
        </div>

        <p v-if="text" class="text">{{ text }}</p>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style scoped lang="postcss">
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
      border-color: var(--c-info-light);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-info-light);
    background-color: var(--c-info-light);
  }

  .check {
    opacity: 1;
    transform: scale(1);
  }
}

.box {
  position: relative;
  border: 1px solid var(--c-divider-1);
  border-radius: 4px;
  width: 16px;
  height: 16px;
  background-color: var(--input-bg-color);
  transition: border-color 0.25s, background-color 0.25s;
}

.check {
  position: absolute;
  top: 2px;
  left: 2px;
  display: flex;
  width: 16px;
  height: 16px;
  opacity: 0;
  transform: scale(0);
  transition: opacity .25s, transform .1s;
}

.check-icon {
  width: 10px;
  height: 10px;
  color: var(--c-white);
}

.text {
  margin: 0;
  padding-left: 10px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 400;
}

.SInputCheckbox.disabled {
  .box {
    border-color: var(--input-disabled-border-color);
    background-color: var(--input-disabled-bg-color);

    &:hover                     { border-color: var(--input-disabled-border-color); }
    &:focus:not(:focus-visible) { border-color: var(--input-disabled-border-color); }
  }

  .input { cursor: not-allowed; }
}
</style>
