<template>
  <SInputDropdown
    class="SInputday"
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
import day from 'dayjs'
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { TextItem, useSearch, useTextOption } from '../composables/InputDropdown'
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
    year: { type: Number, default: null },
    month: { type: Number, default: null },
    validation: { type: Object, default: null },
    value: { type: [String, Number, Boolean, Array, Object] as PropType<any>, default: null }
  },

  setup(props) {
    const search = useSearch({
      placeholder: 'Search dates',
      missing: 'No dates found.'
    })

    const options = computed(() => {
      const year = props.year ?? 2019
      const month = props.month ?? 1

      const range = day().year(year).month(month - 1).date(1).endOf('month').date()

      const dates: TextItem[] = []

      for (let i = 1; i <= range; i++) {
        dates.push(useTextOption({ value: i, text: i }))
      }

      if (props.nullable) {
        dates.unshift(useTextOption({ value: null, text: 'Select date' }))
      }

      return dates
    })

    return {
      search,
      options
    }
  }
})
</script>
