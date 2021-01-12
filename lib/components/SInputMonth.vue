<template>
  <SInputDropdown
    class="SInputMonth"
    :size="size"
    :mode="mode"
    :name="name"
    :label="label"
    :note="note"
    :placeholder="placeholder"
    :help="help"
    :search="search"
    :nullable="nullable"
    :options="options"
    :close-on-click="closeOnClick"
    :validation="validation"
    :value="value"
    @change="v => $emit('change', v)"
  />
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { useSearch, useTextOption } from '../composables/InputDropdown'
import SInputDropdown from './SInputDropdown.vue'

type Size = 'mini' | 'medium'
type Mode = 'filled' | 'outlined'

export default defineComponent({
  components: {
    SInputDropdown
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    mode: { type: String as PropType<Mode>, default: 'filled' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    nullable: { type: Boolean, default: true },
    closeOnClick: { type: Boolean, default: true },
    validation: { type: Object, default: null },
    value: { type: [String, Number, Boolean, Array, Object] as PropType<any>, default: null }
  },

  setup(props) {
    const search = useSearch({
      placeholder: 'Search months',
      missing: 'No months found.'
    })

    const options = [
      useTextOption({ value: 1, text: 'January' }),
      useTextOption({ value: 2, text: 'February' }),
      useTextOption({ value: 3, text: 'March' }),
      useTextOption({ value: 4, text: 'April' }),
      useTextOption({ value: 5, text: 'May' }),
      useTextOption({ value: 6, text: 'June' }),
      useTextOption({ value: 7, text: 'July' }),
      useTextOption({ value: 8, text: 'August' }),
      useTextOption({ value: 9, text: 'September' }),
      useTextOption({ value: 10, text: 'October' }),
      useTextOption({ value: 11, text: 'November' }),
      useTextOption({ value: 12, text: 'December' })
    ]

    if (props.nullable) {
      options.unshift(useTextOption({ value: null, text: 'Select month' }))
    }

    return {
      search,
      options
    }
  }
})
</script>
