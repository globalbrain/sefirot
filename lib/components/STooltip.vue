<script setup lang="ts">
import { onClickOutside, onKeyStroke, useElementHover, useFocusWithin } from '@vueuse/core'
import { computed, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { type Position, useTooltip } from '../composables/Tooltip'

const props = withDefaults(defineProps<{
  tag?: string
  triggerTag?: string
  text?: string
  position?: Position
  display?: 'inline' | 'inline-block' | 'block'
  trigger?: 'hover' | 'focus' | 'both'
  timeout?: number
  tabindex?: number
}>(), {
  tag: 'span',
  triggerTag: 'span',
  position: 'top',
  trigger: 'hover'
})

const root = shallowRef<HTMLElement | null>(null)
const content = shallowRef<HTMLElement | null>(null)
const trigger = shallowRef<HTMLElement | null>(null)

const rootClasses = computed(() => [
  props.display,
  props.tabindex && props.tabindex > -1 && 'focusable'
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
  root,
  trigger,
  content,
  computed(() => props.position),
  timeoutId
)

const isRootHovered = useElementHover(root, { delayLeave: 100 })
const isContentHovered = useElementHover(content, { delayLeave: 100 })
const { focused: isRootFocused } = useFocusWithin(root)
const { focused: isContentFocused } = useFocusWithin(content)
const ignore = ref(false)

watch(
  [isRootHovered, isContentHovered, isRootFocused, isContentFocused],
  ([rootHover, contentHover, rootFocus, contentFocus]) => {
    if (ignore.value) { return }
    if (
      (props.trigger === 'hover' && (rootHover || contentHover))
      || (props.trigger === 'focus' && (rootFocus || contentHover || contentFocus))
      || (props.trigger === 'both' && (rootHover || contentHover || rootFocus || contentFocus))
    ) {
      show()

      if (rootFocus && props.timeout) {
        timeoutId.value = window.setTimeout(hide, props.timeout)
      }
    } else {
      hide()
    }
  }
)

const cleanups = [
  onKeyStroke('Escape', (e) => {
    if (
      on.value
      && props.trigger !== 'hover'
      && (isRootFocused.value || isContentHovered.value || isContentFocused.value)
    ) {
      e.preventDefault()
      e.stopPropagation()
      ignore.value = true
      hide()
      setTimeout(() => { ignore.value = false })
    }
  }),
  onClickOutside(root, hide, { ignore: [content] }),
  () => timeoutId.value != null && window.clearTimeout(timeoutId.value)
]

onBeforeUnmount(() => {
  cleanups.forEach((cleanup) => cleanup())
})
</script>

<template>
  <component ref="root" :is="tag" class="STooltip" :class="rootClasses" :tabindex="tabindex">
    <component :is="triggerTag" class="trigger" ref="trigger">
      <slot />
    </component>

    <Teleport to="#sefirot-modals">
      <Transition name="fade">
        <span v-show="on" class="container" :class="containerClasses" ref="content">
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

  &.inline {
    &        { display: inline; }
    .trigger { display: inline; }
  }

  &.inline-block {
    &        { display: inline-block; }
    .trigger { display: inline-block; }
  }

  &.block {
    &        { display: block; }
    .trigger { display: block; }
  }
}

.trigger {
  white-space: nowrap;
}

.container {
  position: absolute;
  z-index: var(--z-index-tooltip);
  display: block;
  transition: opacity 0.25s;
  padding: 8px;
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
  padding: 8px 12px;
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
