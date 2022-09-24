<script setup lang="ts">
import { ref, computed } from 'vue'
import { Validatable } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini' | 'small' | 'medium'

const props = defineProps<{
  size?: Size
  label?: string
  text?: string
  note?: string
  help?: string
  placeholder?: string
  modelValue: File | null
  hideError?: boolean
  validation?: Validatable
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', file: File | null): void
}>()

const input = ref<HTMLInputElement | null>(null)

const classes = computed(() => [props.size ?? 'small'])

const fileName = computed(() => {
  return props.modelValue ? props.modelValue.name : null
})

function open(): void {
  input.value!.click()
}

function handleChange(e: Event): void {
  const file = (e.target as any).files[0]

  emit('update:modelValue', file ?? null)

  file && props.validation?.$touch()
}
</script>

<template>
  <SInputBase
    class="SInputFile"
    :class="classes"
    :label="label"
    :note="note"
    :help="help"
    :hide-error="hideError"
    :validation="validation"
  >
    <input
      ref="input"
      class="input"
      type="file"
      @change="handleChange"
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
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputFile.mini {
  .action {
    padding: 2px 8px 2px 2px;
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
    font-size: 12px;
    font-weight: 500;
  }
}

.SInputFile.small {
  .action {
    padding: 5px 8px 5px 5px;
  }

  .button {
    padding: 0 8px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 38px;
    font-size: 14px;
  }

  .placeholder {
    font-weight: 500;
  }
}

.SInputFile.medium {
  .action {
    padding: 7px 8px 7px 7px;
  }

  .button {
    padding: 0 12px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 500;
  }

  .file-name,
  .placeholder {
    line-height: 46px;
    font-size: 14px;
  }

  .placeholder {
    font-weight: 500;
  }
}

.SInputFile.has-error {
  .box,
  .box:hover {
    border-color: var(--c-danger);
  }
}

.input {
  display: none;
}

.box {
  display: flex;
  border: 1px solid var(--c-divider);
  border-radius: 4px;
  background-color: var(--c-bg);
  cursor: pointer;
  transition: border-color .25s;

  &:hover {
    border-color: var(--c-black);

    .button {
      background-color: var(--c-bg-soft);
    }
  }

  .dark &:hover {
    border-color: var(--c-gray);
  }
}

.action {
  flex-shrink: 0;
}

.button {
  border: 1px solid var(--c-divider-light);
  border-radius: 4px;
  color: var(--c-text-1);
  background-color: var(--c-bg-mute);
  transition: background-color .25s;
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

.file-name,
.placeholder {
  color: var(--c-text-2);
}
</style>
