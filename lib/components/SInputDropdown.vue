<template>
  <SInputBase
    class="SInputDropdown"
    :class="classes"
    :name="name"
    :label="label"
    :note="note"
    :help="help"
    :validation="validation"
  >
    <div ref="container" class="SInputDropdown-container">
      <div class="SInputDropdown-box" role="button" @click="handleOpen">
        <div class="SInputDropdown-box-content">
          <SInputDropdownItem v-if="hasSelected" :item="selected" @remove="handleCallback" />
          <span v-else class="SInputDropdown-box-placeholder">{{ placeholder }}</span>
        </div>

        <div class="SInputDropdown-box-icon">
          <SIconChevronUp class="SInputDropdown-box-icon-svg up" />
          <SIconChevronDown class="SInputDropdown-box-icon-svg down" />
        </div>
      </div>

      <div v-if="isOpen" class="SInputDropdown-dropdown">
        <SDropdown :options="dropdownOptions" @close="close" />
      </div>
    </div>
  </SInputBase>
</template>

<script lang="ts">
import { PropType, defineComponent, computed, nextTick } from '@vue/composition-api'
import { isNullish, isArray, isEqual } from '../support/Util'
import { useMenu } from '../composables/Menu'
import { Search, Item, useDropdown } from '../composables/Dropdown'
import SIconChevronUp from './icons/SIconChevronUp.vue'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SDropdown from './SDropdown.vue'
import SInputBase from './SInputBase.vue'
import SInputDropdownItem from './SInputDropdownItem.vue'

type Size = 'mini' | 'medium'
type Mode = 'filled' | 'outlined'

export default defineComponent({
  components: {
    SIconChevronUp,
    SIconChevronDown,
    SDropdown,
    SInputBase,
    SInputDropdownItem
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
    search: { type: Object as PropType<Search>, default: null },
    nullable: { type: Boolean, default: true },
    options: { type: Array as PropType<Item[]>, required: true },
    closeOnClick: { type: Boolean, default: false },
    validation: { type: Object, default: null },
    value: { type: [String, Number, Boolean, Array, Object] as PropType<string | number | boolean | unknown[]>, default: null }
  },

  setup(props, { emit }) {
    const { container, isOpen, open, close } = useMenu()

    const classes = computed(() => [props.size, props.mode])

    const dropdownOptions = useDropdown({
      search: props.search,
      items: computed(() => props.options),
      closeOnClick: props.closeOnClick,
      selected: computed(() => props.value),
      callback: handleCallback
    })

    const selected = computed(() => {
      return isArray(props.value)
        ? props.options.filter(o => (props.value as unknown[]).includes(o.value))
        : props.options.find(o => isEqual(o.value, props.value))
    })

    const hasSelected = computed(() => {
      return isArray(selected.value)
        ? selected.value.length > 0
        : !isNullish(selected.value) && selected.value.value !== ''
    })

    async function handleOpen(): Promise<void> {
      open()

      await nextTick()

      const el = document.querySelector<HTMLInputElement>('.SInputDropdown .SDropdown .search .SInputText input')

      el && el.focus()
    }

    function handleCallback(item: Item): void {
      props.validation && props.validation.$touch()

      isArray(props.value) ? handleArray(item.value) : handlePrimitive(item.value)
    }

    function handlePrimitive(value: unknown): void {
      if (!isEqual(props.value, value)) {
        emit('change', value)

        return
      }

      if (props.nullable) {
        emit('change', null)
      }
    }

    function handleArray(value: unknown[]): void {
      const difference = getDifference(props.value as unknown[], value)

      if (!props.nullable && difference.length === 0) {
        return
      }

      emit('change', difference)
    }

    function getDifference(source: unknown[], value: unknown[]): unknown[] {
      return source
        .filter(item => !isEqual(item, value))
        .concat(source.includes(value) ? [] : [value])
    }

    return {
      classes,
      container,
      isOpen,
      close,
      dropdownOptions,
      selected,
      hasSelected,
      handleOpen,
      handleCallback
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SInputDropdown.mini {
  .SInputDropdown-box {
    min-height: 32px;
  }

  .SInputDropdown-box-content {
    padding: 3px 30px 3px 12px;
    line-height: 24px;
    font-size: 14px;
  }

  .SInputDropdown-box-icon {
    top: 3px;
    right: 8px;
  }
}

.SInputDropdown.medium {
  .SInputDropdown-box {
    height: 48px;
  }

  .SInputDropdown-box-content {
    padding: 11px 44px 11px 16px;
    line-height: 24px;
    font-size: 16px;
  }

  .SInputDropdown-box-icon {
    top: 11px;
    right: 12px;
  }
}

.SInputDropdown.filled {
  .SInputDropdown-box {
    background-color: var(--input-filled-bg);

    &:hover {
      border-color: var(--input-focus-border);
    }
  }
}

.SInputDropdown.outlined {
  .SInputDropdown-box {
    border-color: var(--input-outlined-border);

    &:hover {
      border-color: var(--input-focus-border);
    }
  }
}

.SInputSelect.has-error {
  .select {
    border-color: var(--c-danger);
  }
}

.SInputDropdown-container {
  position: relative;
}

.SInputDropdown-box {
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  color: var(--input-text);
  cursor: pointer;
  transition: border-color .25s, background-color .25s;
}

.SInputDropdown-box-placeholder {
  color: var(--input-placeholder);
}

.SInputDropdown-box-icon {
  position: absolute;
  z-index: 10;
  cursor: pointer;
}

.SInputDropdown-box-icon-svg {
  display: block;
  width: 14px;
  height: 14px;
  fill: var(--input-placeholder);
}

.SInputDropdown-box-icon-svg.up {
  margin-bottom: -4px;
}

.SInputDropdown-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  z-index: var(--z-index-dropdown);
}
</style>
