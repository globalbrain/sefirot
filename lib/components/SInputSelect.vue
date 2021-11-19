<template>
  <SInputBase
    class="SInputSelect"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
    :error-message="errorMessage"
  >
    <div class="box" :class="{ focus: isFocused }">
      <select
        :id="name"
        class="select"
        :class="{ 'is-not-selected': isNotSelected }"
        :disabled="disabled"
        @focus="focus"
        @blur="blur"
        @change="emitChange"
      >
        <option
          v-if="placeholder || nullable"
          :value="JSON.stringify({ value: null })"
          :selected="isNotSelected"
          :disabled="!nullable"
        >
          {{ placeholder || 'Please select' }}
        </option>

        <option
          v-for="option in options"
          :key="option.value"
          :style="{ display: option.disabled ? 'none' : null }"
          :value="JSON.stringify(option)"
          :selected="isSelectedOption(option)"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="icon" role="button">
        <SIconChevronUp class="icon-svg up" />
        <SIconChevronDown class="icon-svg down" />
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent, ref, computed } from '@vue/composition-api'
import { SyntheticInputEvent } from '../types/Utils'
import SIconChevronUp from './icons/SIconChevronUp.vue'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SInputBase from './SInputBase.vue'

type Size = 'mini' | 'small' | 'medium'
type Mode = 'outlined' | 'filled'

interface Option {
  label: string
  value: boolean | number | string
  disabled?: boolean
}

export default defineComponent({
  components: {
    SIconChevronUp,
    SIconChevronDown,
    SInputBase
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    size: { type: String as PropType<Size>, default: 'small' },
    mode: { type: String as PropType<Mode>, default: 'outlined' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    options: { type: Array as PropType<Option[]>, required: true },
    nullable: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    errorMessage: { type: Boolean, default: true },
    value: { type: [String, Number, Boolean], default: null },
    validation: { type: Object, default: null }
  },

  setup(props, { emit }) {
    const isFocused = ref(false)

    const classes = computed(() => [
      props.size,
      props.mode,
      { disabled: props.disabled }
    ])

    const isNotSelected = computed(() => {
      return props.value === undefined || props.value === null || props.value === ''
    })

    function isSelectedOption(option: Option): boolean {
      return option.value === props.value
    }

    function focus() {
      isFocused.value = true
    }

    function blur() {
      isFocused.value = false
    }

    function emitChange(e: SyntheticInputEvent): void {
      props.validation?.$touch()

      const option = JSON.parse(e.target.value)

      emit('change', option.value)
    }

    return {
      isFocused,
      classes,
      isNotSelected,
      isSelectedOption,
      focus,
      blur,
      emitChange
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputSelect.mini {
  .box {
    height: 32px;
  }

  .select {
    padding: 3px 30px 3px 12px;
    line-height: 24px;
    font-size: 14px;
  }

  .icon {
    top: 3px;
    right: 8px;
  }
}

.SInputSelect.small {
  .box {
    height: 40px;
  }

  .select {
    padding: 7px 30px 5px 12px;
    line-height: 24px;
    font-size: 16px;
  }

  .icon {
    top: 7px;
    right: 10px;
  }
}

.SInputSelect.medium {
  .box {
    height: 48px;
  }

  .select {
    padding: 11px 44px 11px 16px;
    line-height: 24px;
    font-size: 16px;
  }

  .icon {
    top: 11px;
    right: 12px;
  }
}

.SInputSelect.filled {
  .box {
    background-color: var(--input-filled-bg);

    &:hover,
    &.focus {
      border-color: var(--input-focus-border);
    }
  }

  &.disabled .box:hover {
    border-color: transparent;
  }

  &.disabled .select {
    background-color: var(--input-filled-bg-disabled);
    opacity: 1;
  }
}

.SInputSelect.outlined {
  &.has-error {
    .box {
      border-color: var(--c-danger);
    }
  }

  .box {
    border-color: var(--input-outlined-border);

    &:hover,
    &.focus {
      border-color: var(--input-focus-border);
    }

    &:focus:not(:focus-visible) {
      border-color: var(--input-focus-border);
      outline: 0;
    }
  }

  &.disabled .box:hover {
    border-color: var(--input-outlined-border);
  }

  &.disabled .select {
    background-color: var(--input-outlined-bg-disabled);
    opacity: 1;
  }
}

.SInputSelect.disabled {
  .box:hover .select {
    cursor: not-allowed;
  }
}

.SInputSelect.has-error {
  .select {
    border-color: var(--c-danger);
  }
}

.box {
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  color: var(--input-text);
  cursor: pointer;
  transition: border-color .25s, background-color .25s;
}

.select {
  position: relative;
  z-index: 20;
  display: block;
  border: 0;
  border-radius: 4px;
  width: 100%;
  background-color: transparent;
  cursor: pointer;

  &.select.is-not-selected {
    color: var(--input-placeholder);
  }
}

.icon {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}

.icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: var(--input-placeholder);
}

.icon-svg.up {
  margin-bottom: -4px;
}
</style>
