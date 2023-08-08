<script setup lang="ts">
import { computed } from 'vue'
import { useSlotValue } from '../composables/Utils'
import { type Day } from '../support/Day'
import SDescEmpty from './SDescEmpty.vue'

const props = defineProps<{
  value?: Day | null
  format?: string
}>()

const slotValue = useSlotValue()

const _value = computed(() => {
  if (slotValue.value) {
    return slotValue.value
  }

  if (props.value) {
    return props.value.format(props.format ?? 'YYYY-MM-DD HH:mm:ss')
  }

  return null
})
</script>

<template>
  <div v-if="_value" class="SDescDay">
    <div class="value">
      {{ _value }}
    </div>
  </div>
  <SDescEmpty v-else />
</template>

<style scoped lang="postcss">
.SDescDay {
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
