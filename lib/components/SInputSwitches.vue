<template>
  <SInputBase
    class="SInputSwitches"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="SInputSwitches-container">
      <div class="SInputSwitches-row">
        <div v-for="option in options" :key="option.value" class="SInputSwitches-col">
          <SInputSwitch
            :size="size"
            :mode="mode"
            :text="option.label"
            :value="isChecked(option.value)"
            @change="handleChange(option.value)"
          />
        </div>
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import SInputBase from './SInputBase.vue'
import SInputSwitch from './SInputSwitch.vue'

type Size = 'mini' | 'small'
type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

interface Option {
  label: string
  value: any
}

export default defineComponent({
  components: {
    SInputBase,
    SInputSwitch
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    size: { type: String as PropType<Size>, default: 'small' },
    mode: { type: String as PropType<Mode>, default: 'neutral' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    options: { type: Array as PropType<Option[]>, required: true },
    value: { type: Array as PropType<any[]>, required: true }
  },

  setup(props, { emit }) {
    const classes = computed(() => [
      props.size,
      props.mode
    ])

    function isChecked(value: any): boolean {
      return props.value.includes(value)
    }

    function handleChange(value: any): void {
      const difference = props.value
        .filter(v => v !== value)
        .concat(props.value.includes(value) ? [] : [value])

      emit('change', difference)
    }

    return {
      classes,
      isChecked,
      handleChange
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputSwitches.mini {
  .SInputSwitches-row { margin: -2px -8px; }
  .SInputSwitches-col { padding: 2px 8px; }
}

.SInputSwitches.small {
  .SInputSwitches-row { margin: -4px -8px; }
  .SInputSwitches-col { padding: 4px 8px; }
}

.SInputSwitches-container {
  display: flex;
}

.SInputSwitches-row {
  width: 100%;
}
</style>
