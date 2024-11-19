<script setup lang="ts">
import { useLinkifyIt } from 'sefirot/composables/Markdown'
import { computed } from 'vue'
import { useHasSlotContent } from '../composables/Utils'
import SDescEmpty from './SDescEmpty.vue'

const props = defineProps<{
  value?: string | null
  lineClamp?: string | number
  preWrap?: boolean
  linkify?: boolean
}>()

const classes = computed(() => [
  { 'line-clamp': !!props.lineClamp },
  { 'pre-wrap': props.preWrap }
])

const hasSlot = useHasSlotContent()

const lineClamp = computed(() => props.lineClamp ?? 'none')

const linkifyIt = useLinkifyIt()

const _value = computed(() => {
  if (props.linkify) {
    return linkifyIt(props.value ?? '')
  }
  return props.value
})
</script>

<template>
  <div v-if="hasSlot || _value" class="SDescText" :class="classes">
    <div class="value" v-if="hasSlot">
      <slot />
    </div>
    <div class="value" v-else v-html="_value" />
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.value {
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;

  .SDescText.line-clamp & {
    display: -webkit-box;
    -webkit-line-clamp: v-bind(lineClamp);
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .SDescText.pre-wrap & {
    white-space: pre-wrap;
  }
}

.value :deep(p + p) {
  margin-top: 12px;
}

.value :deep(a) {
  color: var(--c-text-info-1);
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-info-2);
  }
}
</style>
