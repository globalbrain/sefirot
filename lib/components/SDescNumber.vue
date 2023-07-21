<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { format } from '../support/Num'
import SDescEmpty from './SDescEmpty.vue'

const props = defineProps<{
  value?: number | null
  separator?: boolean
}>()

const slots = useSlots()

const _value = computed(() => {
  const slotValue = slots.default?.()[0].children

  const v = (typeof slotValue === 'string') ? Number(slotValue) : props.value

  if (v == null) {
    return null
  }

  return props.separator ? format(v) : v
})
</script>

<template>
  <div v-if="_value" class="SDescNumber">
    <div class="value">
      {{ _value }}
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.SDescNumber {
  border-bottom: 1px dashed var(--c-divider-1);
  padding-bottom: 7px;
}

.value {
  line-height: 24px;
  font-size: 14px;
  font-weight: 400;
  font-feature-settings: "tnum";
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
