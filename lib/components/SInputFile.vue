<script setup lang="ts">
import { type Component, computed, ref } from 'vue'
import { type Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'
export type Color = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

const props = defineProps<{
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  text?: string
  placeholder?: string
  accept?: string
  multiple?: boolean
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  value?: File | File[] | null
  modelValue?: File | File[] | null
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  'update:model-value': [file: File | File[] | null]
  'change': [file: File | File[] | null]
}>()

const _value = computed(() => {
  return props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined ? props.value : null
})

const input = ref<HTMLInputElement | null>(null)

const classes = computed(() => [props.size ?? 'small'])

const fileName = computed(() => Array.isArray(_value.value)
  ? _value.value.map((file) => file.name).join(', ')
  : _value.value?.name ?? ''
)

function open() {
  input.value!.click()
}

function onChange(e: Event) {
  const file = props.multiple
    ? Array.from((e.target as HTMLInputElement).files ?? [])
    : ((e.target as HTMLInputElement).files ?? [])[0]

  emit('update:model-value', file ?? null)
  emit('change', file ?? null)

  file && props.validation?.$touch()
}
</script>

<template>
  <SInputBase
    class="SInputFile"
    :class="classes"
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
    <input
      ref="input"
      class="input"
      type="file"
      :accept
      :multiple
      @change="onChange"
    >

    <div class="box" role="button" @click="open">
      <div class="action">
        <button class="button">
          {{ text ?? 'Choose File' }}
        </button>
      </div>

      <div class="text">
        <p v-if="fileName" class="file-name">{{ fileName }}</p>
        <p v-else-if="placeholder" class="placeholder">{{ placeholder }}</p>
      </div>
    </div>
    <template v-if="$slots.info" #info><slot name="info" /></template>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputFile.mini {
  .action {
    padding: 3px 8px 3px 3px;
  }

  .button {
    padding: 0 8px;
    line-height: 22px;
    font-size: 12px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 30px;
    font-size: var(--input-font-size, var(--input-mini-font-size));
    font-weight: 400;
  }
}

.SInputFile.small {
  .action {
    padding: 5px 8px 5px 5px;
  }

  .button {
    padding: 0 8px;
    line-height: 26px;
    font-size: 12px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 38px;
    font-size: var(--input-font-size, var(--input-small-font-size));
    font-weight: 400;
  }
}

.SInputFile.medium {
  .action {
    padding: 7px 8px 7px 7px;
  }

  .button {
    padding: 0 12px;
    line-height: 30px;
    font-size: 13px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 46px;
    font-size: var(--input-font-size, var(--input-medium-font-size));
    font-weight: 400;
  }
}

.SInputFile.has-error {
  .box,
  .box:hover {
    border-color: var(--input-error-border-color);
  }
}

.input {
  display: none;
}

.box {
  display: flex;
  border: 1px solid var(--input-border-color);
  border-radius: 6px;
  background-color: var(--input-bg-color);
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: var(--input-hover-border-color);
  }

  &:hover .button {
    border-color: var(--c-border-mute-2);
    background-color: var(--c-bg-mute-2);
  }
}

.action {
  flex-shrink: 0;
}

.button {
  border: 1px solid var(--c-border-mute-1);
  border-radius: 3px;
  color: var(--c-text-1);
  background-color: var(--c-bg-mute-1);
  transition: border-color 0.25s, background-color 0.25s;
}

.text {
  flex-grow: 1;
  font-weight: 500;
  overflow: hidden;
}

.file-name,
.placeholder {
  margin: 0;
  padding-right: 12px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.placeholder {
  font-weight: 500;
  color: var(--input-placeholder-color)
}
</style>
