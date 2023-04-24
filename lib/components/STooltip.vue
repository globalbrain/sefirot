<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { computed, ref, shallowRef } from 'vue'
import type { Position } from '../composables/Tooltip'
import { useTooltip } from '../composables/Tooltip'
import SMarkdown from './SMarkdown.vue'

const props = withDefaults(
  defineProps<{
    tag?: string
    text?: string
    position?: Position
    trigger?: 'hover' | 'focus' | 'both'
    timeout?: number
    tabindex?: number
  }>(), { trigger: 'hover' }
)

const el = shallowRef<HTMLElement | null>(null)
const tip = shallowRef<HTMLElement | null>(null)
const content = shallowRef<HTMLElement | null>(null)
const classes = computed(() => [props.position ?? 'top'])
const timeoutId = ref<number | null>(null)

const { on, show, hide } = useTooltip(
  el,
  content,
  tip,
  computed(() => props.position ?? 'top'),
  timeoutId
)

onKeyStroke('Escape', (e) => {
  if (on.value && el.value?.matches(':focus-within')) {
    e.preventDefault()
    e.stopPropagation()
    hide()
  }
})

const onMouseEnter = () => {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    show()
  }
}

const onMouseLeave = () => {
  if (
    props.trigger === 'hover'
    || (props.trigger === 'both' && !el.value?.matches(':focus-within'))
  ) {
    hide()
  }
}

const onFocus = () => {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    show()
    if (props.timeout) {
      timeoutId.value = setTimeout(hide, props.timeout) as any
    }
  }
}

const onBlur = () => {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    hide()
  }
}
</script>

<template>
  <component
    ref="el"
    :is="tag ?? 'span'"
    class="STooltip"
    :tabindex="tabindex ?? 0"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onFocus"
    @focusout="onBlur"
  >
    <span class="content" ref="content">
      <slot />
    </span>

    <transition name="fade">
      <span v-show="on" class="container" :class="classes" ref="tip">
        <span v-if="$slots.text" class="tip"><slot name="text" /></span>
        <SMarkdown v-else-if="text" tag="span" class="tip" :content="text" inline />
      </span>
    </transition>
  </component>
</template>

<style scoped lang="postcss">
.STooltip {
  position: relative;

  &:focus {
    outline: none;
  }
}

.content {
  white-space: nowrap;
}

.container {
  position: absolute;
  z-index: var(--z-index-tooltip);
  display: block;
  transition: opacity 0.25s;
}

.container.fade-enter-from,
.container.fade-leave-to {
  opacity: 0;
  &.top .tip    { transform: translateY(8px); }
  &.right .tip  { transform: translateX(-8px); }
  &.bottom .tip { transform: translateY(-8px); }
  &.left  .tip  { transform: translateX(8px); }
}

.container.top {
  top: 0;
  left: 50%;
  padding-bottom: 8px;
  transform: translate(-50%, -100%);
}

.container.right {
  top: 50%;
  left: 100%;
  transform: translate(8px, -50%);
}

.container.bottom {
  bottom: 0;
  left: 50%;
  padding-top: 8px;
  transform: translate(-50%, 100%);
}

.container.left {
  top: 50%;
  right: 100%;
  transform: translate(-8px, -50%);
}

.tip {
  display: block;
  border: 1px solid var(--tooltip-border-color);
  border-radius: 6px;
  padding: 12px;
  width: max-content;
  max-width: var(--tooltip-max-width);
  line-height: 18px;
  font-size: 12px;
  font-weight: 500;
  color: var(--tooltip-text-color);
  background-color: var(--tooltip-bg-color);
  transition: transform 0.25s;
}

.tip :deep(a) {
  color: var(--c-info-text);

  &:hover {
    color: var(--c-info-text-dark);
  }
}
</style>
