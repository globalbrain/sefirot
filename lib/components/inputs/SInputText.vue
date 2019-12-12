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
      <div class="box">
        <input
          class="input"
          :class="{ 'has-icon': icon, 'is-clearable': clearable }"
          :id="name"
          :type="type"
          :placeholder="placeholder"
          :value="value"
          ref="input"
          @input="emitInput"
          @blur="emitBlur"
          @keypress.enter="emitEnter"
        >

        <div class="icon" role="button" @click="focus" v-if="icon">
          <component :is="icon" class="icon-svg" />
        </div>

        <button class="clear" :class="{ show: showClearButton }" @click="clear" v-if="clearable">
          <SIconX class="clear-svg" />
        </button>
      </div>

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
import SIconX from '../icons/SIconX'
import SButton from '../buttons/SButton'
import SInputBase from './SInputBase'

export default {
  components: {
    SIconX,
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
    icon: { type: Object, default: null },
    clearable: { type: Boolean, default: false },
    validation: { type: Object, default: null },
    value: { type: [String, Number], default: null },
    actions: { type: Array, default: null }
  },

  computed: {
    showClearButton () {
      return this.value != null && this.value !== ''
    }
  },

  methods: {
    focus () {
      this.$refs.input.focus()
    },

    blur () {
      this.$refs.input.blur()
    },

    emitInput (e) {
      this.$emit('input', e.target.value)
    },

    emitBlur (e) {
      Validation.touch(this.validation)

      this.$emit('blur', e.target.value)
    },

    emitEnter (e) {
      this.blur()

      this.$emit('enter', e.target.value)
    },

    clear () {
      this.$emit('clear')
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

.box {
  position: relative;
  flex-grow: 1;

  &:hover .input {
    border-color: var(--c-gray);
  }
}

.input {
  display: block;
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

  &:focus {
    border-color: var(--c-black) !important;
    background-color: var(--c-white);
  }

  &.has-icon {
    padding-left: 40px;
  }

  &.is-clearable {
    padding-right: 40px;
  }
}

.icon {
  position: absolute;
  top: 16px;
  left: 16px;
  cursor: text;
}

.icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: var(--c-gray-dark-1);
}

.clear {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  transition: opacity .25s;

  &:hover .clear-svg {
    fill: var(--c-gray);
  }

  &.show {
    opacity: 1;
  }
}

.clear-svg {
  display: block;
  width: 12px;
  height: 12px;
  fill: var(--c-black);
  transition: fill .25s;
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
