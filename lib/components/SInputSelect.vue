<template>
  <SInputBase
    class="SInputSelect"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="box">
      <select
        class="select"
        :class="{ 'is-not-selected': isNotSelected }"
        :id="name"
        @change="emitChange"
      >
        <option
          v-if="placeholder"
          value=""
          :selected="isNotSelected"
          disabled
        >
          {{ placeholder }}
        </option>

        <option
          v-for="option in options"
          :key="option.value"
          :value="JSON.stringify(option)"
          :selected="isSelectedOption(option)"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="icon" role="button">
        <SIconChevronDown class="icon-svg" />
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from '@vue/composition-api'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SInputBase from './SInputBase.vue'

interface Option {
  label: string
  value: boolean | number | string
}

export default defineComponent({
  components: {
    SIconChevronDown,
    SInputBase
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
    placeholder: { type: String, default: null },
    options: { type: Array as PropType<Option[]>, required: true },
    validation: { type: Object, default: null },
    value: { type: [String, Number, Boolean], default: null }
  },

  setup (props, context) {
    const isNotSelected = computed(() => {
      return props.value === undefined || props.value === null || props.value === ''
    })

    function isSelectedOption (option: Option): boolean {
      return option.value === props.value
    }

    function emitChange (e: Event): void {
      props.validation && props.validation.$touch()

      const option = JSON.parse((e.target as HTMLInputElement).value)

      context.emit('change', option.value)
    }

    return {
      isNotSelected,
      isSelectedOption,
      emitChange
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputText.has-error {
  .select {
    border-color: var(--c-danger);
  }
}

.box {
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  height: 48px;
  background-color: var(--c-white-mute);
  cursor: pointer;
  transition: border-color .25s, background-color .25s;

  &:hover {
    border-color: var(--c-gray);
  }
}

.select {
  position: relative;
  z-index: 20;
  display: block;
  border: 0;
  border-radius: 4px;
  padding: 11px 16px;
  width: 100%;
  line-height: 24px;
  font-size: 16px;
  background-color: transparent;
  cursor: pointer;

  &.select.is-not-selected {
    color: var(--c-text-light-2);
  }
}

.icon {
  position: absolute;
  z-index: 10;
  top: 16px;
  right: 16px;
  cursor: pointer;
}

.icon-svg {
  display: block;
  width: 16px;
  height: 16px;
  fill: var(--c-gray-dark-1);
}
</style>
