<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { computed, ref, shallowRef } from 'vue'
import { type Position, useTooltip } from '../composables/Tooltip'

const props = withDefaults(defineProps<{
  tag?: string
  text?: string
  position?: Position
  display?: 'inline' | 'inline-block' | 'block'
  trigger?: 'hover' | 'focus' | 'both'
  timeout?: number
  tabindex?: number
}>(), {
  tag: 'span',
  position: 'top',
  trigger: 'hover'
})

const el = shallowRef<HTMLElement | null>(null)
const tip = shallowRef<HTMLElement | null>(null)
const content = shallowRef<HTMLElement | null>(null)

const rootClasses = computed(() => [
  props.display,
  props.tabindex && (props.tabindex > -1) && 'focusable'
])

const containerClasses = computed(() => [props.position])

const timeoutId = ref<number | null>(null)

const tabindex = computed(() => {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    return props.tabindex ?? 0
  }
  return -1
})

const { on, show, hide } = useTooltip(
  el,
  content,
  tip,
  computed(() => props.position),
  timeoutId
)

onKeyStroke('Escape', (e) => {
  if (on.value && el.value?.matches(':focus-within')) {
    e.preventDefault()
    e.stopPropagation()
    hide()
  }
})

function onMouseEnter() {
  if (props.trigger === 'hover' || props.trigger === 'both') {
    show()
  }
}

function onMouseLeave() {
  if (
    props.trigger === 'hover'
    || (props.trigger === 'both' && !el.value?.matches(':focus-within'))
  ) {
    hide()
  }
}

function onFocus() {
  if (props.trigger === 'focus' || props.trigger === 'both') {
    show()
    if (props.timeout) {
      timeoutId.value = setTimeout(hide, props.timeout) as any
    }
  }
}

function onBlur() {
  if (
    props.trigger === 'focus'
    || (props.trigger === 'both' && !el.value?.matches(':hover'))
  ) {
    hide()
  }
}
</script>

<template>
  <component
    ref="el"
    :is="tag"
    class="STooltip"
    :class="rootClasses"
    :tabindex="tabindex"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @focusin="onFocus"
    @focusout="onBlur"
  >
    <span class="content" ref="content">
      <slot />
    </span>

    <Teleport to="#sefirot-modals">
      <Transition name="fade">
        <span v-show="on" class="container" :class="containerClasses" ref="tip">
          <span v-if="$slots.text" class="tip"><slot name="text" /></span>
          <span v-else-if="text" class="tip" v-html="text" />
        </span>
      </Transition>
    </Teleport>
  </component>
</template>

<style scoped lang="postcss">
.STooltip {
  position: relative;

  &:focus {
    outline: none;
  }

  &.focusable {
    cursor: pointer;
  }

  &.inline       { display: inline; }
  &.inline-block { display: inline-block; }
  &.block        { display: block; }
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
  &.left .tip   { transform: translateX(8px); }
}

.tip {
  display: block;
  border: 1px solid var(--tooltip-border-color);
  border-radius: 6px;
  padding: 10px 12px;
  width: max-content;
  max-width: var(--tooltip-max-width);
  line-height: 20px;
  font-size: 12px;
  color: var(--tooltip-text-color);
  background-color: var(--tooltip-bg-color);
  transition: transform 0.25s;
}

.tip :deep(a) {
  color: var(--c-text-info-1);

  &:hover {
    color: var(--c-text-info-2);
  }
}
</style>
