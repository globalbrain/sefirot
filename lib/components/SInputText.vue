<template>
  <SInputBase
    class="SInputText"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="box">
      <input
        :id="name"
        ref="input"
        class="input"
        :class="{ 'has-icon': icon, 'is-clearable': clearable }"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="emitInput"
        @blur="emitBlur"
        @keypress.enter="emitEnter"
      >

      <div v-if="icon" class="icon" role="button" @click="focus">
        <component :is="icon" class="icon-svg" />
      </div>

      <button v-if="clearable" class="clear" :class="{ show: showClearButton }" @click="emitClear">
        <SIconX class="clear-svg" />
      </button>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import SIconX from './icons/SIconX.vue'
import SInputBase from './SInputBase.vue'

type Size = 'medium' | 'mini'
type Mode = 'filled' | 'outlined'

export default defineComponent({
  components: {
    SIconX,
    SInputBase
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    mode: { type: String as PropType<Mode>, default: 'filled' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: null },
    icon: { type: Object, default: null },
    clearable: { type: Boolean, default: false },
    value: { type: [String, Number], default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup (props, context) {
    const input = ref<HTMLElement | null>(null)

    const classes = computed(() => ({
      medium: props.size === 'medium',
      mini: props.size === 'mini',
      filled: props.mode === 'filled',
      outlined: props.mode === 'outlined'
    }))

    const showClearButton = computed(() => {
      return props.value !== null && props.value !== ''
    })

    function focus () {
      (input.value as HTMLElement).focus()
    }

    function blur () {
      (input.value as HTMLElement).blur()
    }

    function emitInput (e: InputEvent) {
      context.emit('input', (e.target as HTMLInputElement).value)
    }

    function emitBlur (e: InputEvent) {
      props.validation && props.validation.$touch()
      context.emit('blur', (e.target as HTMLInputElement).value)
    }

    function emitEnter (e: InputEvent) {
      blur()
      context.emit('enter', (e.target as HTMLInputElement).value)
    }

    function emitClear () {
      context.emit('clear')
    }

    return {
      input,
      classes,
      showClearButton,
      focus,
      blur,
      emitInput,
      emitBlur,
      emitEnter,
      emitClear
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputText.mini {
  .input {
    padding: 3px 12px;
    width: 100%;
    line-height: 24px;
    font-size: 14px;

    &.has-icon {
      padding-left: 30px;
    }

    &.is-clearable {
      padding-right: 40px;
    }
  }

  .icon {
    top: 9px;
    left: 10px;
  }

  .icon-svg {
    width: 14px;
    height: 14px;
  }

  .clear {
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;
  }

  .clear-svg {
    width: 10px;
    height: 10px;
  }
}

.SInputText.medium {
  .input {
    padding: 11px 16px;
    width: 100%;
    line-height: 24px;
    font-size: 16px;

    &.has-icon {
      padding-left: 36px;
    }

    &.is-clearable {
      padding-right: 40px;
    }
  }

  .icon {
    top: 16px;
    left: 12px;
  }

  .icon-svg {
    width: 16px;
    height: 16px;
  }

  .clear {
    top: 4px;
    right: 4px;
    width: 40px;
    height: 40px;
  }

  .clear-svg {
    width: 10px;
    height: 10px;
  }
}

.SInputText.filled {
  .input {
    background-color: var(--input-text-filled-bg);

    &:focus {
      border-color: var(--input-text-focus-border);
      background-color: var(--input-text-focus-bg);
    }
  }
}

.SInputText.outlined {
  .input {
    border-color: var(--input-text-outlined-border);

    &:focus {
      border-color: var(--input-text-focus-border);
      background-color: var(--input-text-focus-bg);
    }
  }
}

.SInputText.has-error {
  .input {
    border-color: var(--c-danger);

    &:hover,
    &:focus {
      border-color: var(--c-danger);
    }
  }
}

.box {
  position: relative;

  &:hover .input {
    border-color: var(--input-text-focus-border);
  }
}

.input {
  display: block;
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--input-text);
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    color: var(--input-text-placeholder);
  }
}

.icon {
  position: absolute;
  cursor: text;
}

.icon-svg {
  display: block;
  fill: var(--input-text-placeholder);
}

.clear {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity .25s;

  &:hover .clear-svg {
    fill: var(--input-text);
  }

  &.show {
    opacity: 1;
  }
}

.clear-svg {
  display: block;
  fill: var(--input-text-placeholder);
  transition: fill .25s;
}
</style>
