<script setup lang="ts">
import { computed } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

const props = defineProps<{
  size?: Size
  name?: string
  label?: string
  note?: string
  info?: string
  text?: string
  help?: string
  disabled?: boolean
  modelValue: boolean
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const classes = computed(() => [
  [props.size ?? 'small'],
  { disabled: props.disabled }
])

function emitChange(): void {
  !props.disabled && emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <SInputBase
    class="SInputSwitch"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :info="info"
    :help="help"
    :hide-error="hideError"
  >
    <div class="container">
      <div class="input" :class="{ on: modelValue }" role="button" @click="emitChange">
        <p v-if="text" class="text">{{ text }}</p>

        <div class="box">
          <div class="check" />
        </div>
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
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 32px;

  &:hover {
    .box { border-color: var(--c-info); }
  }
}

.input.on .box {
  border-color: var(--c-info-lighter);
  background-color: var(--c-info);
}

.input.on .check {
  background-color: var(--c-white);
  transform: translateX(18px);
}

.text {
  flex-grow: 1;
  margin: 0;
  padding-right: 16px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}

.box {
  position: relative;
  flex-shrink: 0;
  border: 1px solid var(--c-divider);
  border-radius: 11px;
  width: 40px;
  height: 22px;
  background-color: var(--c-bg-elv-down);
  transition: border-color 0.25s, background-color 0.25s, box-shadow 0.25s;
}

.check {
  position: absolute;
  border-radius: 50%;
  background-color: var(--c-black);
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  transition: background-color .25s, transform .25s;

  .dark & {
    background-color: var(--c-white);
  }
}
</style>
