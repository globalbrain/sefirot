<script setup lang="ts">
import { computed } from 'vue'
import { useSlotValue } from '../composables/Utils'
import { format } from '../support/Num'
import SDescEmpty from './SDescEmpty.vue'

const props = defineProps<{
  value?: number | null
  leadUnit?: string
  trailUnit?: string
  separator?: boolean
}>()

const slotValue = useSlotValue()

const _value = computed(() => {
  const sv = slotValue.value

  const v = sv ? Number(sv) : props.value

  if (v == null) {
    return null
  }

  return props.separator ? format(v) : v
})
</script>

<template>
  <div v-if="_value" class="SDescNumber">
    <div v-if="leadUnit" class="lead-unit">
      {{ leadUnit }}
    </div>
    <div class="value">
      {{ _value }}
    </div>
    <div v-if="trailUnit" class="trail-unit">
      {{ trailUnit }}
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.SDescNumber {
  display: flex;
  align-items: center;
  gap: 4px;
}

.value,
.lead-unit,
.trail-unit {
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
}

.value {
  flex-grow: 1;
  font-feature-settings: "tnum";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lead-unit,
.trail-unit {
  flex-shrink: 0;
  color: var(--c-text-2);
}
</style>
