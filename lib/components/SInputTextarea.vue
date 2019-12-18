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
        class="input"
        :class="classes"
        :id="name"
        :placeholder="placeholder"
        :value="value"
        :rows="rows"
        @input="emitInput"
        @blur="emitBlur"
      />
    </div>
  </SInputBase>
</template>

<script>
import Validation from '../../validation/Validation'
import SInputBase from './SInputBase'

export default {
  components: {
    SInputBase
  },

  props: {
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    type: { type: String, default: 'text' },
    mode: { type: String, default: 'default' },
    placeholder: { type: String, default: null },
    rows: { type: Number, default: 3 },
    value: { type: [String, Number], default: null },
    validation: { type: Object, default: null }
  },

  computed: {
    classes () {
      return {
        default: this.mode === 'default',
        clear: this.mode === 'clear'
      }
    }
  },

  methods: {
    emitInput (e) {
      this.$emit('input', e.target.value)
    },

    emitBlur (e) {
      Validation.touch(this.validation)

      this.$emit('blur', e.target.value)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputText.has-error {
  .input {
    border-color: var(--c-danger);
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
