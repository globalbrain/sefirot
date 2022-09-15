<script setup lang="ts">
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  note?: string
  help?: string
  text: string
  hideError?: boolean
  modelValue: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

function emitChange() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <SInputBase
    class="SInputRadio"
    :class="[size ?? 'small']"
    :label="label"
    :note="note"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
  >
    <div class="container">
      <div class="input" :class="{ on: modelValue }" role="button" @click="emitChange">
        <div class="box">
          <div class="check" />
        </div>

        <p class="text">{{ text }}</p>
      </div>
    </div>
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

  &:hover {
    .box {
      border-color: var(--c-info);
    }
  }
}

.input.on {
  .box {
    border-color: var(--c-info);
    box-shadow: var(--shadow-depth-3);
  }

  .check {
    opacity: 1;
    transform: scale(.6);
  }
}

.box {
  position: relative;
  border: 1px solid var(--c-divider);
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background-color: var(--c-bg);
  transition: border-color 0.25s, box-shadow 0.25s;
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
  background-color: var(--c-info);
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
