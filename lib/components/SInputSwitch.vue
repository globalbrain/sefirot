<template>
  <SInputBase
    class="SInputSwitch"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="SInputSwitch-container">
      <div class="SInputSwitch-input" :class="{ on: modelValue }" role="button" @click="emitChange">
        <p v-if="text" class="SInputSwitch-text" :class="[textMode]">{{ text }}</p>

        <div class="SInputSwitch-box">
          <div class="SInputSwitch-check" />
        </div>

        <p v-if="textAfter" class="SInputSwitch-text after" :class="[textMode]">{{ textAfter }}</p>
      </div>
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small'
type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type TextMode = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  mode: { type: String as PropType<Mode>, default: 'neutral' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  note: { type: String, default: null },
  text: { type: String, default: null },
  textAfter: { type: String, default: null },
  textMode: { type: String as PropType<TextMode>, default: 'neutral' },
  disabled: { type: Boolean, default: false },
  help: { type: String, default: null },
  modelValue: { type: Boolean, required: true }
})

const emit = defineEmits(['update:modelValue'])

const classes = computed(() => ({
  mini: props.size === 'mini',
  small: props.size === 'small',
  neutral: props.mode === 'neutral',
  info: props.mode === 'info',
  success: props.mode === 'success',
  warning: props.mode === 'warning',
  danger: props.mode === 'danger',
  disabled: props.disabled
}))

function emitChange(): void {
  !props.disabled && emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="postcss" scoped>
.SInputSwitch.mini {
  .SInputSwitch-box {
    margin: 1px 0 0;
    border-radius: 9px;
    width: 36px;
    height: 18px;
  }

  .SInputSwitch-check {
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    transition: background-color .25s, transform .25s;
  }
}

.SInputSwitch.small {
  .SInputSwitch-box {
    margin: -1px 0 -1px;
    border-radius: 11px;
    width: 40px;
    height: 22px;
  }

  .SInputSwitch-check {
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    transition: background-color .25s, transform .25s;
  }
}

.SInputSwitch.neutral .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-black);
  background-color: var(--c-black);
}

.SInputSwitch.info .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-info);
  background-color: var(--c-info);
}

.SInputSwitch.success .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-success);
  background-color: var(--c-success);
}

.SInputSwitch.warning .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-warning);
  background-color: var(--c-warning);
}

.SInputSwitch.danger .SInputSwitch-input.on .SInputSwitch-box {
  border-color: var(--c-danger);
  background-color: var(--c-danger);
}

.SInputSwitch.disabled .SInputSwitch-input {
  .SInputSwitch-box {
    cursor: not-allowed;
    opacity: .6;
  }

  &:hover .SInputSwitch-box { border-color: var(--c-gray); }
}

.SInputSwitch.disabled .SInputSwitch-input.on {
  &:hover .SInputSwitch-box { border-color: transparent; }
}

.SInputSwitch-container {
  display: flex;
}

.SInputSwitch-input {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;

  &:hover {
    .SInputSwitch-box   { border-color: var(--c-black); }
    .SInputSwitch-check { background-color: var(--c-black); }
  }
}

.SInputSwitch-input.on .SInputSwitch-check {
  background-color: var(--c-white);
  transform: translateX(18px);
}

.SInputSwitch-text {
  flex-grow: 1;
  margin: 0;
  padding-right: 16px;
  line-height: 20px;
  font-size: 14px;
}

.SInputSwitch-text.mute {
  color: var(--c-text-light-2);
  font-weight: 500;
}

.SInputSwitch-text.info    { color: var(--c-info); }
.SInputSwitch-text.success { color: var(--c-success); }
.SInputSwitch-text.warning { color: var(--c-warning); }
.SInputSwitch-text.danger  { color: var(--c-danger); }
.SInputSwitch-text.after {
  padding-left: 12px;
}

.SInputSwitch-box {
  position: relative;
  flex-shrink: 0;
  border: 1px solid var(--c-gray);
  background-color: var(--c-white-mute);
  transition: border-color .25s, background-color .25s, box-shadow .25s;
}

.SInputSwitch-check {
  position: absolute;
  border-radius: 50%;
  background-color: var(--c-black);
  transition: background-color .25s, transform .25s;
}
</style>
