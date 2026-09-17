<script setup lang="ts">
import { computed, inject } from 'vue'
import { useResponsive } from '../composables/Layout'
import { useSlotValue } from '../composables/Utils'
import SDescEmpty from './SDescEmpty.vue'
import SLink from './SLink.vue'

const wrap = inject('sefirot-desc-wrap', useResponsive(() => ({ desktop: false, mobile: true })))

const props = defineProps<{
  value?: string | null
  href?: string
}>()

const slotValue = useSlotValue()

const link = computed(() => {
  if (props.href) { return props.href }
  return slotValue.value ? slotValue.value : props.value
})
</script>

<template>
  <div v-if="slotValue || value" class="SDescLink" :class="{ wrap }">
    <SLink class="value" :href="link">
      <slot v-if="slotValue" />
      <template v-else>{{ value }}</template>
    </SLink>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.value {
  display: block;
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--c-text-info-1);
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-info-2);
  }
}
.SDescLink.wrap {
  min-width: 0;
  overflow-wrap: anywhere;
}

.SDescLink.wrap .value {
  white-space: normal;
  overflow-wrap: anywhere;
}
</style>
