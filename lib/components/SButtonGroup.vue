<template>
  <div class="SButtonGroup" :class="classes">
    <button
      v-for="button in buttons"
      :key="button.value"
      class="button"
      :class="getButtonClasses(button)"
      @click="handleClick(button.value)"
    >
      <span class="content">
        {{ button.label }}
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/composition-api'

interface ButtonGroupsItem {
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
    buttons: { type: Array as PropType<ButtonGroupsItem[]>, required: true },
    size: { type: String as PropType<Size>, default: 'medium' },
    value: { type: String, default: null }
  },

  setup(props, { emit }) {
    const classes = computed(() => ({
      mini: props.size === 'mini',
      small: props.size === 'small',
      medium: props.size === 'medium',
      large: props.size === 'large',
      jumbo: props.size === 'jumbo'
    }))

    function getButtonClasses(button: ButtonGroupsItem) {
      return {
        active: button.value === props.value,
        neutral: button.mode == null || button.mode === 'neutral',
        info: button.mode === 'info',
        success: button.mode === 'success',
        warning: button.mode === 'warning',
        danger: button.mode === 'danger'
      }
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
  color: #ffffff;
  border: 1px solid var(--input-outlined-border);
  border-radius: 4px;

  .button {
    flex: 1 1 auto;
    color: var(--c-text-2);
    font-size: 12px;
    transition: color .25s, background-color .25s;
  }

  .button:first-child { border-radius: 4px 0 0 4px; }
  .button:last-child { border-radius: 0 4px 4px 0; }

  .button:not(:first-child) {
    border-left: 1px solid var(--input-outlined-border);
  }

  .button.active {
    color: var(--button-primary-text);
  }

  .neutral.button.active { background-color: var(--button-primary-bg); }
  .info.button.active { background-color: var(--c-info); }
  .success.button.active { background-color: var(--c-success); }
  .warning.button.active { background-color: var(--c-warning); }
  .danger.button.active { background-color: var(--c-danger); }
}

.content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.SButtonGroup.mini {
  .button {
    height: 28px;
    font-size: 12px;
    padding: 0 8px;
  }
}

.SButtonGroup.small {
  .button {
    height: 32px;
    font-size: 12px;
    padding: 0 10px;
  }
}

.SButtonGroup.medium {
  .button {
    height: 40px;
    font-size: 13px;
    padding: 0 12px;
  }
}

.SButtonGroup.large {
  .button {
    height: 48px;
    font-size: 14px;
    padding: 0 14px;
  }
}

.SButtonGroup.jumbo {
  .button {
    height: 64px;
    font-size: 14px;
    padding: 0 24px;
  }
}
</style>
