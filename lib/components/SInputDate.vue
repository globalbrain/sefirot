<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import { PropType, computed } from 'vue'
import { Validation } from '../composables/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'medium' | 'mini'
type Mode = 'filled' | 'outlined'

const props = defineProps({
  size: { type: String as PropType<Size>, default: 'medium' },
  mode: { type: String as PropType<Mode>, default: 'filled' },
  name: { type: String, default: null },
  label: { type: String, default: null },
  note: { type: String, default: null },
  help: { type: String, default: null },
  placeholder: { type: String, default: 'YYYY-MM-DD' },
  disabled: { type: Boolean, default: false },
  modelValue: { type: String, default: null },
  validation: { type: Object as PropType<Validation>, default: null }
})

const emit = defineEmits(['update:modelValue', 'blur'])

const classes = computed(() => [
  props.size,
  props.mode,
  {
    disabled: props.disabled
  }
])

function emitInput(date: string | null) {
  emit('update:modelValue', date)
}

function emitBlur(e: FocusEvent) {
  setTimeout(() => {
    props.validation && props.validation.$touch()

    emit('blur', (e.target as HTMLInputElement).value)
  }, 100)
}
</script>

<template>
  <SInputBase
    class="SInputDate"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="container">
      <DatePicker
        v-slot="{ inputValue, inputEvents }"
        :value="modelValue"
        color="blue"
        is-dark
        :masks="{ input: 'YYYY-MM-DD' }"
        :model-config="{ type: 'string', mask: 'YYYY-MM-DD' }"
        :popover="{ placement: 'bottom', visibility: 'click' }"
        @input="emitInput"
      >
        <input
          :id="name"
          class="input"
          type="text"
          :placeholder="placeholder"
          :disabled="disabled"
          :value="inputValue"
          autocomplete="off"
          v-on="inputEvents"
          @blur="emitBlur"
        >
      </DatePicker>
    </div>
  </SInputBase>
</template>

<style lang="postcss" scoped>
.SInputDate.mini {
  .input {
    padding: 3px 12px;
    width: 100%;
    line-height: 24px;
    font-size: 14px;
  }

  .container {
    height: 32px;
  }
}

.SInputDate.medium {
  .input {
    padding: 11px 16px;
    width: 100%;
    line-height: 24px;
    font-size: 16px;
  }

  .container {
    height: 48px;
  }
}

.SInputDate.has-error {
  .input {
    border-color: var(--c-danger);

    &:focus {
      border-color: var(--c-danger);
    }
  }
}

.SInputDate.filled {
  .input {
    background-color: var(--input-filled-bg);

    &:hover {
      border-color: var(--input-focus-border);
    }

    &:focus {
      border-color: var(--input-focus-border);
      background-color: var(--input-filled-bg-focus);
    }
  }

  &.disabled .input {
    background-color: var(--input-filled-bg-disabled);
  }
}

.SInputDate.outlined {
  .input {
    border-color: var(--input-outlined-border);
    background-color: transparent;

    &:hover {
      border-color: var(--input-focus-border);
    }

    &:focus {
      border-color: var(--input-focus-border);
    }
  }

  &.disabled .input:hover {
    border-color: var(--input-outlined-border);
  }

  &.disabled .input {
    background-color: var(--input-outlined-bg-disabled);
  }
}

.SInputDate.disabled {
  .input:hover {
    cursor: not-allowed;
    border-color: transparent;
  }
}

.input {
  display: block;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  color: var(--input-text);
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    color: var(--input-placeholder);
  }
}
</style>
