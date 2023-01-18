<script setup lang="ts">
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  note?: string
  info?: string
  help?: string
  text: string
  modelValue: boolean
  validation?: Validatable
  hideError?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void
  (e: 'change', value: boolean): void
}>()

function onClick() {
  emit('update:model-value', !props.modelValue)
  emit('change', !props.modelValue)
}
</script>

<template>
  <SInputBase
    class="SInputRadio"
    :class="[size ?? 'small']"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :validation="validation"
    :hide-error="hideError"
  >
    <div class="container">
      <div class="input" :class="{ on: props.modelValue }" role="button" @click="onClick">
        <div class="box">
          <div class="check" />
        </div>

        <p class="text">{{ text }}</p>
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
      border-color: var(--c-info-light);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-info-light);
  }

  .check {
    opacity: 1;
    transform: scale(0.6);
  }
}

.box {
  position: relative;
  border: 1px solid var(--c-divider-1);
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
  background-color: var(--c-info-bg);
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.25s, transform 0.1s;
}

.text {
  margin: 0;
  padding-left: 10px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}
</style>
