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
    <div class="container">
      <div
        v-if="action"
        class="action"
        :class="{ clickable: !!action.clickable }"
        :role="action.clickable ? 'button' : null"
        @click="action.clickable && $emit('action')"
      >
        <component :is="action.icon" v-if="action.icon" class="action-icon" />
        <p v-if="action.text" class="action-text">{{ action.text }}</p>
        <div v-if="action.type === 'select'" class="action-select">
          <SIconChevronUp class="action-select-icon up" />
          <SIconChevronDown class="action-select-icon down" />
        </div>
      </div>

      <div class="box">
        <input
          :id="name"
          ref="inputEl"
          class="input"
          :class="{ 'has-icon': icon, 'is-clearable': clearable }"
          :style="inputStyles"
          :type="type"
          :step="step"
          :placeholder="placeholder"
          :value="value"
          @input="emitInput"
          @blur="emitBlur"
          @keypress.enter="emitEnter"
        >

        <div v-if="icon" class="icon" role="button" @click="focus">
          <component :is="icon" class="icon-svg" />
        </div>

        <p v-if="text" ref="textEl" class="text" role="button" @click="focus">
          {{ text }}
        </p>

        <p v-if="textAfter" ref="textAfterEl" class="text-after" role="button" @click="focus">
          {{ textAfter }}
        </p>

        <button v-if="clearable" class="clear" :class="{ show: showClearButton }" @click="emitClear">
          <SIconX class="clear-svg" />
        </button>
      </div>
    </div>

    <template #before-help>
      <slot name="before-help" />
    </template>
  </SInputBase>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  PropType
} from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import { SyntheticInputEvent } from '../types/Utils'
import SIconChevronUp from './icons/SIconChevronUp.vue'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SIconX from './icons/SIconX.vue'
import SInputBase from './SInputBase.vue'

export type Size = 'medium' | 'mini'
export type Mode = 'filled' | 'outlined'

interface Action {
  type?: 'button' | 'select'
  icon?: any
  text?: string
  clickable?: boolean
}

export default defineComponent({
  components: {
    SIconChevronUp,
    SIconChevronDown,
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
    action: { type: Object as PropType<Action>, default: null },
    icon: { type: Object, default: null },
    text: { type: String, default: null },
    textAfter: { type: String, default: null },
    step: { type: Number, default: 1 },
    clearable: { type: Boolean, default: false },
    value: { type: [String, Number], default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, { emit }) {
    const inputEl = ref<HTMLElement | null>(null)
    const textEl = ref<HTMLElement | null>(null)
    const textAfterEl = ref<HTMLElement | null>(null)

    const classes = computed(() => ({
      medium: props.size === 'medium',
      mini: props.size === 'mini',
      filled: props.mode === 'filled',
      outlined: props.mode === 'outlined'
    }))

    const inputStyles = reactive({
      paddingRight: '',
      paddingLeft: ''
    })

    const showClearButton = computed(() => {
      return props.value !== null && props.value !== ''
    })

    onMounted(() => {
      setTextPadding()
      watch(() => props.text, () => setTextPadding())
      watch(() => props.textAfter, () => setTextPadding())
    })

    function focus() {
      inputEl.value && inputEl.value.focus()
    }

    function blur() {
      inputEl.value && inputEl.value.blur()
    }

    function emitInput(e: SyntheticInputEvent) {
      emit('input', getValue(e.target.value))
    }

    function emitBlur(e: SyntheticInputEvent) {
      props.validation && props.validation.$touch()
      emit('blur', getValue(e.target.value))
    }

    function emitEnter(e: SyntheticInputEvent) {
      blur()
      emit('enter', getValue(e.target.value))
    }

    function getValue(value: string): string | number | null {
      if (props.type !== 'number') {
        return value
      }

      return value === '' ? null : Number(value)
    }

    function emitClear() {
      emit('clear')
    }

    function setTextPadding(): void {
      textEl.value && setLeadingTextPadding()
      textAfterEl.value && setTrailingTextPadding()
    }

    function setLeadingTextPadding(): void {
      inputStyles.paddingLeft = `${textEl.value!.offsetWidth}px`
    }

    function setTrailingTextPadding(): void {
      inputStyles.paddingRight = `${textAfterEl.value!.offsetWidth}px`
    }

    return {
      inputEl,
      textEl,
      textAfterEl,
      classes,
      inputStyles,
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
  .action {
    padding: 3px 10px;
    line-height: 24px;
  }

  .action-icon {
    width: 14px;
    height: 14px;
  }

  .action-icon + .action-text,
  .action-icon + .action-select,
  .action-text + .action-select {
    margin-left: 6px;
  }

  .action-text {
    font-size: 14px;
  }

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

  .text {
    padding: 0 8px 0 12px;
    line-height: 32px;
    font-size: 14px;
  }

  .text-after {
    padding: 0 12px 0 8px;
    line-height: 32px;
    font-size: 14px;
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
  .action {
    padding: 11px 12px;
    line-height: 24px;
  }

  .action-icon {
    width: 16px;
    height: 16px;
  }

  .action-icon + .action-text,
  .action-icon + .action-select,
  .action-text + .action-select {
    margin-left: 8px;
  }

  .action-text {
    font-size: 14px;
  }

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

  .text {
    padding: 0 8px 0 16px;
    line-height: 48px;
  }

  .text-after {
    padding: 0 16px 0 8px;
    line-height: 48px;
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
  .action {
    background-color: var(--input-action-filled-bg);

    &.clickable:hover  { background-color: var(--input-action-filled-bg-hover); }
    &.clickable:active { background-color: var(--input-action-filled-bg-focus); }
  }

  .input {
    background-color: var(--input-filled-bg);

    &:focus {
      border-color: var(--input-focus-border);
      background-color: var(--input-focus-bg);
    }
  }
}

.SInputText.outlined {
  .action {
    border-color: var(--input-action-outlined-border);
    background-color: var(--input-action-outlined-bg);

    &.clickable:hover  { background-color: var(--input-action-outlined-bg-hover); }
    &.clickable:active { background-color: var(--input-action-outlined-bg-focus); }
  }

  .input {
    border-color: var(--input-outlined-border);

    &:focus {
      border-color: var(--input-focus-border);
      background-color: var(--input-focus-bg);
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

.container {
  display: flex;
}

.action {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border: 1px solid transparent;
  border-right: 0;
  border-radius: 4px 0 0 4px;
  color: var(--c-text-2);
  transition: background-color .25s;
}

.action.clickable {
  color: var(--c-text-1);
}

.action.clickable:active {
  transition: background-color .1s;
}

.action + .box .input {
  border-radius: 0 4px 4px 0;
  border-left-color: var(--c-divider);
}

.action-icon {
  fill: currentColor;
}

.action-text {
  margin: 0;
  font-weight: 500;
}

.action-select-icon {
  width: 13px;
  height: 13px;
  fill: var(--input-placeholder);
}

.action-select-icon.up {
  margin-bottom: -4px;
}

.box {
  position: relative;
  display: flex;
  flex-grow: 1;

  &:hover .input {
    border-color: var(--input-focus-border);
  }
}

.input {
  display: block;
  border: 1px solid transparent;
  border-radius: 4px;
  color: var(--input-text);
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    color: var(--input-placeholder);
  }
}

.icon {
  position: absolute;
  cursor: text;
}

.icon-svg {
  display: block;
  fill: var(--input-placeholder);
}

.text,
.text-after {
  position: absolute;
  top: 0;
  margin: 0;
  color: var(--input-text);
  cursor: text;
}

.text {
  left: 0;
  color: var(--input-text);
}

.text-after {
  right: 0;
  color: var(--input-placeholder);
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
  fill: var(--input-placeholder);
  transition: fill .25s;
}
</style>
