<template>
  <SInputBase
    class="SInputCheckboxes"
    :class="[size]"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="container">
      <div class="row">
        <div v-for="option in options" :key="option.value" class="col">
          <SInputCheckbox
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
import { PropType, defineComponent } from '@vue/composition-api'
import SInputBase from './SInputBase.vue'
import SInputCheckbox from './SInputCheckbox.vue'

type Size = 'mini' | 'small' | 'medium'

export default defineComponent({
  components: {
    SInputBase,
    SInputCheckbox
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    size: { type: String as PropType<Size>, default: 'small' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    options: { type: Array, required: true },
    value: { type: Array, required: true }
  },

  setup(props, { emit }) {
    function isChecked(value: unknown): boolean {
      return props.value.includes(value)
    }

    function handleChange(value: unknown): void {
      const distinct = props.value
        .filter(v => v !== value)
        .concat(props.value.includes(value) ? [] : [value])

      emit('change', distinct)
    }

    return {
      isChecked,
      handleChange
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  display: flex;
}

.row {
  margin: -2px -8px;
}

.col {
  padding: 2px 8px;
}
</style>
