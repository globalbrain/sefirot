<template>
  <SInputText
    class="SInputNumber"
    :size="size"
    :mode="mode"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    type="number"
    :placeholder="placeholder"
    :text="text"
    :text-after="textAfter"
    :validation="validation"
    :value="value"
    @input="emitInput"
    @blur="emitBlur"
    @enter="emitEnter"
  >
    <template #after-input>
      <p v-if="separatorHelp" class="separator-help help-text">
        {{ valueWithSeparator }}
      </p>
    </template>
  </SInputText>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  PropType
} from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import SInputText, { Size, Mode } from './SInputText.vue'

export default defineComponent({
  components: {
    SInputText
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    mode: { type: String as PropType<Mode>, default: 'filled' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    text: { type: String, default: null },
    textAfter: { type: String, default: null },
    separatorHelp: { type: Boolean, default: false },
    value: { type: Number, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, context) {
    const valueWithSeparator = computed(() => {
      return props.value?.toLocaleString() ?? 0
    })

    function emitInput(value: number): void {
      context.emit('input', value)
    }

    function emitBlur(value: number): void {
      props.validation && props.validation.$touch()
      context.emit('blur', value)
    }

    function emitEnter(value: number): void {
      context.emit('enter', value)
    }

    return {
      valueWithSeparator,
      emitInput,
      emitBlur,
      emitEnter
    }
  }
})
</script>
