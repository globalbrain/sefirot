<template>
  <SInputBase
    class="SInputText"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="container">
      <input
        class="input"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        @input="emitInput"
        @blur="emitBlur"
      >

      <div class="actions" v-if="actions">
        <div class="action" :key="action.label" v-for="action in actions">
          <SButton
            :type="action.type"
            size="large"
            :label="action.label"
            @click="action.callback"
          />
        </div>
      </div>
    </div>
  </SInputBase>
</template>

<script>
import Validation from '../../validation/Validation'
import SButton from '../buttons/SButton'
import SInputBase from './SInputBase'

export default {
  components: {
    SButton,
    SInputBase
  },

  props: {
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: null },
    value: { type: [String, Number], default: null },
    validation: { type: Object, default: null },
    actions: { type: Array, default: null }
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

.container {
  display: flex;
}

.input {
  display: block;
  flex-grow: 1;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 11px 16px;
  width: 100%;
  line-height: 24px;
  font-size: 16px;
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

.actions {
  display: flex;
  padding-left: 8px;
}

.action {
  & + & {
    padding-left: 8px;
  }
}
</style>
