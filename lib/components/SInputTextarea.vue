<template>
  <SInputBase
    class="SInputTextarea"
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
        :class="classes"
        :placeholder="placeholder"
        :value="value"
        :rows="rows"
        @input="emitInput"
        @blur="emitBlur"
      />
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import SInputBase from './SInputBase.vue'

export default defineComponent({
  components: {
    SInputBase
  },

  props: {
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    mode: { type: String, default: 'default' },
    placeholder: { type: String, default: null },
    rows: { type: Number, default: 3 },
    value: { type: [String, Number], default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, context) {
    const classes = computed(() => ({
      default: props.mode === 'default',
      clear: props.mode === 'clear'
    }))

    function emitInput(e: InputEvent): void {
      context.emit('input', (e.target as HTMLInputElement).value)
    }

    function emitBlur(e: InputEvent): void {
      props.validation && props.validation.$touch()
      context.emit('blur', (e.target as HTMLInputElement).value)
    }

    return { classes, emitInput, emitBlur }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

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
  padding: 11px 16px;
  width: 100%;
  min-height: 96px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  background-color: var(--c-white-mute);
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    color: var(--c-gray);
  }

  &:hover {
    border-color: var(--c-gray);
  }

  &:focus {
    border-color: var(--c-black);
    background-color: var(--c-white);
  }
}

.input.clear {
  border-color: transparent;
  padding: 0;
  background-color: transparent;
}
</style>
