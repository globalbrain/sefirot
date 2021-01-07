<template>
  <SInputBase
    class="SInputSwitches"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
  >
    <div class="container">
      <div class="row">
        <div v-for="option in options" :key="option.value" class="col">
          <SInputSwitch
            :text="option.label"
            :value="isChecked(option.value)"
            @change="handleChange(option.value)"
          />
        </div>
      </div>
    </div>
  </SInputBase>
</template>

<script>
import SInputBase from './SInputBase'
import SInputSwitch from './SInputSwitch'

export default {
  components: {
    SInputBase,
    SInputSwitch
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
    options: { type: Array, required: true },
    value: { type: Array, required: true }
  },

  methods: {
    isChecked(value) {
      return this.value.includes(value)
    },

    handleChange(value) {
      const difference = this.value
        .filter(v => v !== value)
        .concat(this.value.includes(value) ? [] : [value])

      this.$emit('change', difference)
    }
  }
}
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
  width: 208px;
}
</style>
