<template>
  <SInputBase
    class="SInputFile"
    :class="classes"
    :label="label"
    :note="note"
    :help="help"
    :error-message="errorMessage"
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
          {{ text }}
        </button>
      </div>

      <div class="text">
        <p v-if="fileName" class="file-name">{{ fileName }}</p>
        <p v-else-if="placeholder" class="placeholder">{{ placeholder }}</p>
      </div>
    </div>
  </SInputBase>
</template>

<script setup lang="ts">
import { PropType, ref, computed } from 'vue'
import { Validation } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'small' },
  label: { type: String, default: null },
  note: { type: String, default: null },
  text: { type: String, default: 'Choose File' },
  help: { type: String, default: null },
  placeholder: { type: String, default: null },
  errorMessage: { type: Boolean, default: true },
  modelValue: { type: File, default: null },
  validation: { type: Object as PropType<Validation>, default: null }
})

const emit = defineEmits(['update:modelValue'])

const input = ref<HTMLInputElement | null>(null)

const classes = computed(() => [props.size])

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
  border: 1px solid var(--input-border);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color .25s;

  &:hover {
    border-color: var(--input-focus-border);

    .button {
      background-color: var(--c-gray-light-4);
    }
  }
}

.dark-mode .box {
  &:hover {
    .button {
      background-color: var(--c-gray-dark-3);
    }
  }
}

.action {
  flex-shrink: 0;
}

.button {
  border: 1px solid var(--c-divider-light);
  border-radius: 4px;
  color: var(--c-text-1);
  background-color: var(--c-white-mute);
  transition: background-color .25s;
}

.dark .button {
  background-color: var(--c-black-mute);
  transition: background-color .25s;
}

.text {
  flex-grow: 1;
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
  color: var(--input-placeholder);
}
</style>
