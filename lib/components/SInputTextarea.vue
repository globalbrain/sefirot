<template>
  <SInputBase
    class="SInputTextarea"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="container">
      <textarea
        :id="name"
        class="input"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        :rows="rows"
        @input="emitInput"
        @blur="emitBlur"
      />
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { SyntheticInputEvent } from '../types/Utils'
import { Validation } from '../validation/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'medium' | 'mini'
type Mode = 'filled' | 'outlined' | 'clear'

export default defineComponent({
  components: {
    SInputBase
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    mode: { type: String as PropType<Mode>, default: 'filled' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    rows: { type: Number, default: 3 },
    value: { type: [String, Number], default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, { emit }) {
    const classes = computed(() => [
      props.size,
      props.mode,
      {
        disabled: props.disabled
      }
    ])

    function emitInput(e: SyntheticInputEvent): void {
      emit('input', e.target.value)
    }

    function emitBlur(e: SyntheticInputEvent): void {
      props.validation && props.validation.$touch()
      emit('blur', e.target.value)
    }

    return {
      classes,
      emitInput,
      emitBlur
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputTextarea.mini {
  .input {
    padding: 6px 12px;
    width: 100%;
    min-height: 80px;
    line-height: 20px;
    font-size: 14px;
  }
}

.SInputTextarea.medium {
  .input {
    padding: 11px 16px;
    width: 100%;
    min-height: 96px;
    line-height: 24px;
    font-size: 16px;
  }
}

.SInputTextarea.filled {
  .input {
    background-color: var(--input-filled-bg);

    &:focus {
      border-color: var(--input-focus-border);
      background-color: var(--input-focus-bg);
    }
  }

  &.disabled .input {
    background-color: var(--input-filled-bg-disabled);
  }
}

.SInputTextarea.outlined {
  .input {
    border-color: var(--input-outlined-border);

    &:hover {
      border-color: var(--input-focus-border);
    }

    &:focus {
      border-color: var(--input-focus-border);
      background-color: var(--input-focus-bg);
    }
  }

  &.disabled .input:hover {
    border-color: var(--input-outlined-border);
  }

  &.disabled .input {
    background-color: var(--input-outlined-bg-disabled);
  }
}

.SInputTextarea.clear {
  .input {
    padding: 0;
  }

  &.disabled .input {
    background-color: var(--input-clear-bg-disabled);
  }
}

.SInputTextarea.disabled {
  .input:hover {
    cursor: not-allowed;
    border-color: transparent;
  }
}

.SInputTextarea.has-error {
  .input {
    border-color: var(--c-danger);

    &:focus {
      border-color: var(--c-danger);
    }
  }
}

.input {
  display: block;
  flex-grow: 1;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  font-weight: 400;
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    color: var(--input-placeholder);
  }
}
</style>
