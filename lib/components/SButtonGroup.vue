<script setup lang="ts">
import { computed } from 'vue'
import SIcon from './SIcon.vue'

export interface ButtonGroupItem {
  label?: string
  icon?: any
  value: string | number
  disabled?: boolean
  mode?: Mode
}

export type Mode = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
export type Size = 'mini' | 'small' | 'medium' | 'large' | 'jumbo'

const props = withDefaults(defineProps<{
  items: ButtonGroupItem[]
  size?: Size
  beforeText?: string | number | null
  afterText?: string | number | null
  modelValue?: string | number | null
}>(), {
  size: 'medium',
  beforeText: null,
  afterText: null,
  modelValue: null
})

const emit = defineEmits<{
  (e: 'click', value: string | number): void
  (e: 'update:modelValue', value: string | number): void
}>()

const classes = computed(() => [props.size])

function getButtonClasses(button: ButtonGroupItem) {
  return [
    { active: button.value === props.modelValue },
    button.mode ?? 'neutral'
  ]
}

function handleClick(value: string | number) {
  emit('click', value)
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="SButtonGroup" :class="classes">
    <p v-if="props.beforeText !== null" class="text">
      <span class="content">{{ props.beforeText }}</span>
    </p>
    <button
      v-for="item in items"
      :key="item.value"
      class="button"
      :class="getButtonClasses(item)"
      :disabled="!!item.disabled"
      @click="handleClick(item.value)"
    >
      <span v-if="item.icon" class="icon">
        <SIcon :icon="item.icon" class="icon-svg" />
      </span>
      <span v-else-if="item.label" class="content">
        {{ item.label }}
      </span>
    </button>
    <p v-if="props.afterText !== null" class="text">
      <span class="content">{{ props.afterText }}</span>
    </p>
  </div>
</template>

<style lang="postcss" scoped>
.SButtonGroup {
  display: flex;
  width: fit-content;
  border: 1px solid var(--c-divider);
  border-radius: 4px;
  overflow: hidden;
}

.SButtonGroup.mini {
  height: 28px;

  .text,
  .button {
    padding: 0 8px;
    height: 26px;
    font-size: 12px;
    font-weight: 500;
  }
}

.SButtonGroup.small {
  height: 32px;

  .text,
  .button {
    padding: 0 10px;
    height: 30px;
    font-size: 12px;
    font-weight: 500;
  }
}

.SButtonGroup.medium {
  height: 40px;

  .text,
  .button {
    padding: 0 12px;
    height: 38px;
    font-size: 13px;
    font-weight: 500;
  }
}

.SButtonGroup.large {
  height: 48px;

  .text,
  .button {
    padding: 0 14px;
    height: 46px;
    font-size: 14px;
    font-weight: 500;
  }
}

.SButtonGroup.jumbo {
  height: 64px;

  .text,
  .button {
    padding: 0 24px;
    height: 62px;
    font-size: 14px;
    font-weight: 500;
  }
}

.text,
.button {
  border-left: 1px solid transparent;
  letter-spacing: .4px;
  color: var(--c-text-2);
  white-space: nowrap;
}

.button {
  transition: color .25s, background-color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.text:not(:first-child),
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
