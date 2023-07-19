<script setup lang="ts">
import { computed, useSlots } from 'vue'
import SDescEmpty from './SDescEmpty.vue'
import SLink from './SLink.vue'

const props = defineProps<{
  value?: string | null
  href?: string
}>()

const slots = useSlots()

const link = computed(() => {
  if (props.href) {
    return props.href
  }

  const slotValue = slots.default?.()[0].children

  if (typeof slotValue === 'string') {
    return slotValue
  }

  return props.value
})
</script>

<template>
  <div v-if="$slots.default || value" class="SDescLink">
    <SLink class="value" :href="link">
      <slot v-if="$slots.default" />
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
