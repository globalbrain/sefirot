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
      <ClientOnly>
        <v-date-picker
          v-slot="{ inputProps, inputEvents }"
          :value="value"
          color="blue"
          is-dark
          :masks="{ input: 'YYYY-MM-DD' }"
          :popover="{ placement: 'bottom', visibility: 'click' }"
          @input="emitInput"
        >
          <input
            :id="name"
            class="input"
            type="text"
            placeholder="YYYY-MM-DD"
            v-bind="inputProps"
            v-on="inputEvents"
            @blur="emitBlur"
          >
        </v-date-picker>
      </ClientOnly>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
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
    value: { type: Date, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup (props, context) {
    function emitInput (date: Date | null) {
      context.emit('input', date)
    }

    function emitBlur (e: InputEvent) {
      setTimeout(() => {
        props.validation && props.validation.$touch()
        context.emit('blur', (e.target as HTMLInputElement).value)
      }, 100)
    }

    return {
      emitInput,
      emitBlur
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputDate.has-error {
  .input {
    border-color: var(--c-danger);

    &:focus {
      border-color: var(--c-danger);
    }
  }
}

.container {
  height: 48px;
}

.input {
  display: block;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 11px 16px;
  width: 100%;
  line-height: 24px;
  font-size: 16px;
  background-color: var(--c-white-mute);
  transition: border-color .25s, background-color .25s;

  &::placeholder {
    color: var(--c-text-light-2);
  }

  &:focus {
    border-color: var(--c-black);
    background-color: var(--c-white);
  }
}
</style>
