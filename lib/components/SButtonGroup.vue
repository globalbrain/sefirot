<template>
  <div class="SButtonGroup" :class="classes">
    <button
      v-for="item in items"
      :key="item.value"
      class="button"
      :class="getButtonClasses(item)"
      @click="handleClick(item.value)"
    >
      <span class="content">
        {{ item.label }}
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'

interface ButtonGroupItem {
  label: string
  value: string
  mode: Mode
}

type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type Size = 'mini' | 'small' | 'medium' | 'large' | 'jumbo'

export default defineComponent({
  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    items: { type: Array as PropType<ButtonGroupItem[]>, required: true },
    size: { type: String as PropType<Size>, default: 'medium' },
    value: { type: String, default: null }
  },

  setup(props, { emit }) {
    const classes = computed(() => [props.size])

    function getButtonClasses(button: ButtonGroupItem) {
      return [
        { active: button.value === props.value },
        button.mode ?? 'neutral'
      ]
    }

    function handleClick(value: string) {
      emit('change', value)
    }

    return {
      classes,
      getButtonClasses,
      handleClick
    }
  }
})
</script>

<style lang="postcss" scoped>
.SButtonGroup {
  display: flex;
  border: 1px solid var(--c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.SButtonGroup.mini {
  height: 28px;

  .button {
    padding: 0 8px;
    height: 28px;
    font-size: 12px;
    font-weight: 500;
  }
}

.SButtonGroup.small {
  height: 32px;

  .button {
    padding: 0 10px;
    height: 32px;
    font-size: 12px;
    font-weight: 500;
  }
}

.SButtonGroup.medium {
  height: 40px;

  .button {
    padding: 0 12px;
    height: 40px;
    font-size: 13px;
    font-weight: 500;
  }
}

.SButtonGroup.large {
  height: 48px;

  .button {
    padding: 0 14px;
    height: 48px;
    font-size: 14px;
    font-weight: 500;
  }
}

.SButtonGroup.jumbo {
  height: 64px;

  .button {
    padding: 0 24px;
    height: 64px;
    font-size: 14px;
    font-weight: 500;
  }
}

.button {
  border-left: 1px solid transparent;
  letter-spacing: .4px;
  color: var(--c-text-2);
  white-space: nowrap;
  transition: color .25s, background-color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.button:not(:first-child) {
  border-left: 1px solid var(--c-divider);
}

.button.active {
  color: var(--c-text-dark-1);
}

.button.neutral.active { background-color: var(--c-black); }
.button.info.active    { background-color: var(--c-info); }
.button.success.active { background-color: var(--c-success); }
.button.warning.active { background-color: var(--c-warning); }
.button.danger.active  { background-color: var(--c-danger); }

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
