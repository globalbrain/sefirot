<template>
  <SInputText
    class="SInputYear"
    :size="size"
    :mode="mode"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :type="type"
    :placeholder="placeholder"
    :action="action"
    :icon="icon"
    :text="text"
    :text-after="textAfter"
    :clearable="clearable"
    :value="value"
    :validation="validation"
    @action="$emit('action')"
    @input="v => $emit('input', !isNaN(v) ? Number(v) : null)"
    @enter="v => $emit('enter', !isNaN(v) ? Number(v) : null)"
    @blur="v => $emit('blur', !isNaN(v) ? Number(v) : null)"
  />
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { Validation } from '../validation/Validation'
import SInputText from './SInputText.vue'

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
    SInputText
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    mode: { type: String as PropType<Mode>, default: 'filled' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: null },
    action: { type: Object as PropType<Action>, default: null },
    icon: { type: Object, default: null },
    text: { type: String, default: null },
    textAfter: { type: String, default: null },
    clearable: { type: Boolean, default: false },
    value: { type: [String, Number], default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  }
})
</script>
