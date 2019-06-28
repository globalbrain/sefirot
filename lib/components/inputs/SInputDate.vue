<template>
  <SInputBase
    class="SInputDate"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="container">
      <no-ssr>
        <v-date-picker
          class="input"
          mode="single"
          tint-color="#000000"
          :theme-styles="styles"
          popover-visibility="focus"
          :formats="formats"
          :min-date="minDate"
          :max-date="maxDate"
          :available-dates="availableDates"
          :disabled-dates="disabledDates"
          :value="value"
          @input="emitInput"
        />
      </no-ssr>
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
    minDate: { type: null, default: null },
    maxDate: { type: null, default: null },
    availableDates: { type: Object, default: null },
    disabledDates: { type: Object, default: null },
    value: { type: null, required: true },
    validation: { type: Object, default: null }
  },

  data () {
    return {
      styles: {
        wrapper: {
          borderColor: '#ffffff',
          borderRadius: 0,
          backgroundColor: '#ffffff',
          boxShadow: '0 18px 56px rgba(0, 0, 0, .16), 0 4px 12px rgba(0, 0, 0, .16)'
        },

        header: {
          padding: '16px 16px'
        },

        weekdays: {
          padding: '0 16px'
        },

        weeks: {
          padding: '8px 16px 16px'
        },

        dayPopoverContent: {
          borderRadius: 0,
          fontSize: '12px',
          color: '#ffffff',
          whiteSpace: 'nowrap',
          backgroundColor: '#000000',
          boxShadow: '0 12px 32px rgba(0, 0, 0, .10), 0 2px 6px rgba(0, 0, 0, .08)'
        }
      },

      formats: {
        input: ['YYYY.MM.DD', 'YYYY-MM-DD']
      }
    }
  },

  methods: {
    emitInput (value) {
      this.$emit('input', value)

      Validation.touch(this.validation)
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  height: 48px;
}

.input >>> input {
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
</style>
