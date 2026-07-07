<script setup lang="ts">
import { Comment, Text, computed, useSlots } from 'vue'
import { useDataListState } from '../composables/DataList'

const props = withDefaults(defineProps<{
  dir?: 'row' | 'column'
  maxWidth?: string
  align?: 'left' | 'right'
  preWrap?: boolean
  lineClamp?: string | number
  tnum?: boolean
  valueAction?: boolean
}>(), {
  dir: 'row',
  maxWidth: '100%'
})

const emit = defineEmits<{
  'click:value': [event: MouseEvent]
}>()

const { labelWidth } = useDataListState()

const slots = useSlots()

const classes = computed(() => [
  props.dir,
  props.align,
  { 'pre-wrap': props.preWrap },
  { 'line-clamp': !!props.lineClamp },
  { tnum: props.tnum }
])

const labelStyles = computed(() => ({
  width: props.dir === 'row' ? labelWidth.value : '100%'
}))

const valueStyles = computed(() => ({
  'max-width': props.maxWidth,
  '-webkit-line-clamp': props.lineClamp
}))

const hasValue = computed(() => hasSlotContent('value'))

function hasSlotContent(name = 'default'): boolean {
  return !!slots[name]?.().some((s) => {
    if (s.type === Comment) {
      return false
    }
    if (s.type === Text && typeof s.children === 'string') {
      return !!s.children.trim()
    }
    return true
  })
}

function onValueClick(event: MouseEvent): void {
  if (!props.valueAction || isInteractiveClick(event)) {
    return
  }

  emit('click:value', event)
}

// Whether the click landed on interactive content (a link, button, input, …)
// inside the cell, which handles the click itself. The `closest()` match is
// bounded to the cell (`currentTarget`): an interactive *ancestor* of the
// whole list — a tabindexed scroll container, say — must not swallow every
// cell click.
function isInteractiveClick(event: MouseEvent): boolean {
  const cell = event.currentTarget
  const target = event.target

  if (!(cell instanceof HTMLElement) || !(target instanceof HTMLElement)) {
    return false
  }

  const interactive = target.closest([
    'a',
    'button',
    'input',
    'textarea',
    'select',
    '[contenteditable="true"]',
    '[role="button"]',
    '[role="link"]',
    '[role="checkbox"]',
    '[role="radio"]',
    '[role="switch"]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(','))

  return !!interactive && cell.contains(interactive)
}
</script>

<template>
  <div class="SDataListItem" :class="classes">
    <div class="content">
      <div class="label" :style="labelStyles">
        <slot name="label" />
      </div>
      <div v-if="!hasValue" class="empty" :class="{ action: valueAction }" @click="onValueClick">
        —
      </div>
      <div v-else-if="hasValue" class="value" :class="{ action: valueAction }" :style="valueStyles" @click="onValueClick">
        <slot name="value" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SDataListItem {
  width: 100%;
  max-width: 100%;
}

.content {
  display: flex;
  padding: 10px 0;
  min-height: 48px;
}

.label {
  flex-shrink: 0;
  padding: 2px 0;
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-2);
}

.empty {
  flex-grow: 1;
  padding: 2px 0;
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-3);
}

.value {
  flex-grow: 1;
  padding: 2px 0;
  line-height: 24px;
  font-size: 14px;
  color: var(--c-text-1);
}

.empty.action,
.value.action {
  cursor: pointer;
}

.SDataListItem.row .content {
  flex-direction: row;
}

.SDataListItem.column .content {
  flex-direction: column;
}

.SDataListItem.left .value {
  text-align: left;
}

.SDataListItem.right .value {
  text-align: right;
}

.SDataListItem.pre-wrap .value {
  white-space: pre-wrap;
}

.SDataListItem.line-clamp .value {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.SDataListItem.tnum .value {
  font-feature-settings: "tnum";
}
</style>
