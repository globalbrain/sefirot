<template>
  <SInputNumber
    class="SInputYear"
    :size="size"
    :mode="mode"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :placeholder="placeholder"
    :action="action"
    :text="text"
    :text-after="textAfter"
    :disabled="disabled"
    :value="value"
    :validation="validation"
    @action="$emit('action')"
    @input="v => $emit('input', v)"
    @enter="v => $emit('enter', v)"
    @blur="v => $emit('blur', v)"
  />
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import SInputNumber from './SInputNumber.vue'

type Size = 'medium' | 'mini'
type Mode = 'filled' | 'outlined'

interface Action {
  type?: 'button' | 'select'
  icon?: any
  text?: string
  clickable?: boolean
}

export default defineComponent({
  components: {
    SInputNumber
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    mode: { type: String as PropType<Mode>, default: 'filled' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    action: { type: Object as PropType<Action>, default: null },
    text: { type: String, default: null },
    textAfter: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    value: { type: [String, Number], default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  }
})
</script>
