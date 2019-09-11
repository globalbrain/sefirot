<template>
  <SInputBase
    class="SInputSelect"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="box">
      <select class="select" :class="{ 'is-not-selected': isNotSelected }" :id="name" @change="emitChange">
        <option
          v-if="placeholder"
          value=""
          :selected="isNotSelected"
          disabled
        >
          {{ placeholder }}
        </option>

        <option
          v-for="option in options"
          :key="option.value"
          :value="JSON.stringify(option)"
          :selected="isSelectedOption(option)"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="icon" role="button">
        <SIconChevronDown class="icon-svg" />
      </div>
    </div>
  </SInputBase>
</template>

<script>
import Validation from '../../validation/Validation'
import SIconChevronDown from '../icons/SIconChevronDown'
import SInputBase from './SInputBase'

export default {
  components: {
    SIconChevronDown,
    SInputBase
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    options: { type: Array, required: true },
    validation: { type: Object, default: null },
    value: { type: [String, Number, Boolean], default: null }
  },

  computed: {
    isNotSelected () {
      return this.value === undefined || this.value === null || this.value === ''
    }
  },

  methods: {
    isSelectedOption (option) {
      return option.value === this.value
    },

    emitChange (e) {
      Validation.touch(this.validation)

      const option = JSON.parse(e.target.value)

      this.$emit('change', option.value)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputText.has-error {
  .select {
    border-color: var(--c-danger);
  }
}

.box {
  position: relative;
  border: 1px solid transparent;
  border-radius: 2px;
  width: 100%;
  height: 48px;
  background-color: var(--c-white-mute);
  cursor: pointer;
  transition: border-color .25s, background-color .25s;

  &:hover {
    border-color: var(--c-gray);
  }
}

.select {
  position: relative;
  z-index: 20;
  display: block;
  border: 0;
  border-radius: 2px;
  padding: 12px 16px;
  width: 100%;
  line-height: 24px;
  font-size: 16px;

  &.select.is-not-selected {
    color: var(--c-gray);
  }
}

.icon {
  position: absolute;
  z-index: 10;
  top: 18px;
  right: 16px;
}

.icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: var(--c-gray-dark);
}
</style>
