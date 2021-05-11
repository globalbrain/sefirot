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
    :action="action"
    :step="step"
    :validation="validation"
    :value="value"
    @input="emitInput"
    @blur="emitBlur"
    @enter="emitEnter"
    @action="$emit('action')"
  >
    <template #before-help>
      <p v-if="helpFormat" class="help-text">
        {{ valueWithSeparator }}
      </p>
    </template>
  </SInputText>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'
import { isNullish } from '../support/Util'
import { Validation } from '../validation/Validation'
import SInputText, { Size, Mode, Action } from './SInputText.vue'

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
    action: { type: Object as PropType<Action>, default: null },
    step: { type: Number, default: 1 },
    helpFormat: { type: Boolean, default: false },
    value: { type: Number, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, { emit }) {
    const valueWithSeparator = computed(() => {
      if (isNullish(props.value)) {
        return '0'
      }

      return props.value >= 100000000000000000000
        ? 'The number is too big'
        : props.value.toLocaleString()
    })

    function emitInput(value: number): void {
      emit('input', value)
    }

    function emitBlur(value: number): void {
      emit('blur', value)
    }

    function emitEnter(value: number): void {
      emit('enter', value)
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

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputNumber-help-format {
  margin: 0;
  padding: 6px 0 0;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--input-help);
}
</style>
