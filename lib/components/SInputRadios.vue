<template>
  <SInputBase
    class="SInputRadios"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="container">
      <div class="row">
        <div v-for="option in options" :key="option.value" class="col">
          <SInputRadio
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
import { defineComponent } from '@vue/composition-api'
import SInputBase from './SInputBase.vue'
import SInputRadio from './SInputRadio.vue'

export default defineComponent({
  components: {
    SInputBase,
    SInputRadio
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    nullable: { type: Boolean, default: true },
    options: { type: Array, required: true },
    value: { type: [String, Number, Boolean], default: null }
  },

  setup(props, { emit }) {
    function isChecked(value: unknown): boolean {
      return value === props.value
    }

    function handleChange(value: unknown): void {
      if (value !== props.value) {
        emit('change', value)

        return
      }

      if (props.nullable) {
        emit('change', null)
      }
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
