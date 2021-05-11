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
      <ClientOnly>
        <v-date-picker
          v-slot="{ inputValue, inputEvents }"
          :value="value"
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
            :value="inputValue"
            autocomplete="off"
            v-on="inputEvents"
            @blur="emitBlur"
          >
        </v-date-picker>
      </ClientOnly>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { SyntheticInputEvent } from '../types/Utils'
import { Validation } from '../validation/Validation'
import SInputBase from './SInputBase.vue'

type Size = 'medium' | 'mini'
type Mode = 'filled' | 'outlined'

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
    placeholder: { type: String, default: 'YYYY-MM-DD' },
    value: { type: String, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, { emit }) {
    const classes = computed(() => [props.size, props.mode])

    function emitInput(date: string | null) {
      emit('input', date)
    }

    function emitBlur(e: SyntheticInputEvent) {
      setTimeout(() => {
        props.validation && props.validation.$touch()
        emit('blur', e.target.value)
      }, 100)
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

    &:focus {
      border-color: var(--input-focus-border);
      background-color: var(--input-focus-bg);
    }
  }
}

.SInputDate.outlined {
  .input {
    border-color: var(--input-outlined-border);

    &:focus {
      border-color: var(--input-focus-border);
      background-color: var(--input-focus-bg);
    }
  }
}

.SInputDate >>> .vc-popover-content-wrapper {
  z-index: var(--z-index-popover);
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
