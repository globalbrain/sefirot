<script setup lang="ts">
import { Comment, Text, computed, useSlots } from 'vue'
import { useDataListState } from '../composables/DataList'

const props = withDefaults(defineProps<{
  dir?: 'row' | 'column'
  maxWidth?: string
  align?: 'left' | 'right'
  tnum?: boolean
  trim?: boolean
}>(), {
  dir: 'row',
  maxWidth: '100%'
})

const {
  labelWidth
} = useDataListState()

const slots = useSlots()

const classes = computed(() => [
  props.dir,
  props.align,
  { tnum: props.tnum },
  { trim: props.trim }
])

const labelStyles = computed(() => ({
  width: props.dir === 'row' ? labelWidth.value : '100%'
}))

const valueStyles = computed(() => ({
  maxWidth: props.maxWidth
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
</script>

<template>
  <div class="SDataListItem" :class="classes">
    <div class="content">
      <div class="label" :style="labelStyles">
        <slot name="label" />
      </div>
      <div v-if="!hasValue" class="empty">
        —
      </div>
      <div v-else-if="hasValue" class="value" :style="valueStyles">
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

.SDataListItem.tnum .value {
  font-feature-settings: "tnum";
}

.SDataListItem.trim {
  .content,
  .value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
