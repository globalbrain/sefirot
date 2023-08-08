<script setup lang="ts">
import { computed } from 'vue'
import { useSlotValue } from '../composables/Utils'
import SDescEmpty from './SDescEmpty.vue'
import SLink from './SLink.vue'

const props = defineProps<{
  value?: string | null
  href?: string
}>()

const slotValue = useSlotValue()

const link = computed(() => {
  if (props.href) {
    return props.href
  }

  return slotValue.value
    ? slotValue.value
    : props.value
})
</script>

<template>
  <div v-if="slotValue || value" class="SDescLink">
    <SLink class="value" :href="link">
      <slot v-if="slotValue" />
      <template v-else>{{ value }}</template>
    </SLink>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.SDescLink {
  border-bottom: 1px dashed var(--c-divider-1);
  padding-bottom: 7px;
}

.value {
  display: block;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--c-info-text);
  transition: color 0.25s;

  &:hover {
    color: var(--c-info-text-dark);
  }
}
</style>
