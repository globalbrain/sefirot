<template>
  <SInputBase
    class="SInputYMD"
    :class="[size, mode, { disabled }]"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div class="container">
      <input
        v-if="year"
        class="input year"
        type="number"
        :value="value && value.year"
        placeholder="YYYY"
        :disabled="disabled"
        @blur="updateYear"
      >
      <div
        v-if="year && month"
        class="separator"
      />
      <input
        v-if="month"
        class="input month"
        type="number"
        :value="value && value.month"
        placeholder="M"
        :disabled="disabled"
        @blur="updateMonth"
      >
      <div
        v-if="month && date"
        class="separator"
      />
      <input
        v-if="date"
        class="input date"
        type="number"
        :value="value && value.date"
        placeholder="D"
        :disabled="disabled"
        @blur="updateDate"
      >
    </div>

    <template #before-help>
      <slot name="before-help" />
    </template>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { SyntheticInputEvent } from '../types/Utils'
import { Validation } from '../validation/Validation'
import SInputBase from './SInputBase.vue'

export type Size = 'mini'
export type Mode = 'outlined'

export interface Value {
  year?: number
  month?: number
  date?: number
}

export type ValueType = 'year' | 'month' | 'date'

export interface Fields {
  year?: boolean
  month?: boolean
  date?: boolean
}

export default defineComponent({
  components: {
    SInputBase
  },

  props: {
    size: { type: String as PropType<Size>, default: 'mini' },
    mode: { type: String as PropType<Mode>, default: 'outlined' },
    name: { type: String, default: null },
    label: { type: String, default: null },
    note: { type: String, default: null },
    help: { type: String, default: null },
    placeholder: { type: String, default: null },
    year: { type: Boolean, default: true },
    month: { type: Boolean, default: true },
    date: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    value: { type: Object as PropType<Value>, default: null },
    validation: { type: Object as PropType<Validation>, default: null }
  },

  setup(props, { emit }) {
    const touched = {
      year: false,
      month: false,
      date: false
    }

    function updateYear(e: SyntheticInputEvent): void {
      const value = Number(e.target.value)
      update('year', value === 0 ? undefined : value)
    }

    function updateMonth(e: SyntheticInputEvent): void {
      const value = Number(e.target.value)
      update('month', value === 0 ? undefined : value)
    }

    function updateDate(e: SyntheticInputEvent): void {
      const value = Number(e.target.value)
      update('date', value === 0 ? undefined : value)
    }

    function update(type: ValueType, value?: number): void {
      const data = { ...props.value } as Value

      setValue(data, type, value)

      data.year === undefined && data.month === undefined && data.date === undefined
        ? emit('input', null)
        : emit('input', data)

      emitTouch(type)
    }

    function setValue(data: Value, type: ValueType, value?: number): void {
      if (value === undefined) {
        delete data[type]
        return
      }

      data[type] = value
    }

    function emitTouch(type: ValueType): void {
      if (!props.validation || props.validation.$isDirty.value) {
        return
      }

      touched[type] = true

      if (createRequiredTouched().every(v => v)) {
        props.validation.$touch()
      }
    }

    function createRequiredTouched(): void {
      const requiredTouched = [] as boolean[]

      for (const key in touched) {
        if (props[key]) {
          requiredTouched.push(touched[key])
        }
      }

      return requiredTouched
    }

    return {
      updateYear,
      updateMonth,
      updateDate
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputYMD.mini {
  .container {
    padding: 0 4px;
  }

  .input {
    padding: 3px 0;
    text-align: center;
    font-size: 14px;
  }

  .input.year  { width: 48px; }
  .input.month { width: 32px; }
  .input.date  { width: 32px; }

  .separator {
    padding: 3px 0;
    line-height: 24px;
    font-size: 14px;
  }
}

.SInputYMD.outlined {
  .container {
    border: 1px solid var(--input-outlined-border);
    border-radius: 4px;
    transition: border-color .25s;

    &:hover {
      border-color: var(--input-focus-border);
    }
  }
}

.SInputYMD.outlined.disabled {
  .container {
    border-color: var(--input-outlined-border);
    background-color: var(--input-outlined-bg-disabled);
  }
}

.SInputYMD.disabled {
  .container { cursor: not-allowed; }
  .input     { cursor: not-allowed; }
}

.SInputYMD.has-error {
  .container {
    border-color: var(--c-danger);
  }
}

.container {
  display: flex;
}

.input {
  background-color: transparent;
}

.separator::before {
  color: var(--c-text-3);
  content: "/";
}
</style>
