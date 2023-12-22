<script setup lang="ts">
import { computed } from 'vue'
import { useCardBlockSize } from '../composables/Card'

export type Size = 'small' | 'medium' | 'large' | 'xlarge'

const props = defineProps<{
  size?: Size
}>()

const cardSize = useCardBlockSize()

const classes = computed(() => [
  props.size ?? cardSize.value,
  cardSize.value ? `card-size-${cardSize.value}` : null
])
</script>

<template>
  <div class="SControl" :class="classes">
    <div class="left">
      <slot />
      <slot name="left" />
    </div>
    <div v-if="$slots.right" class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.SControl {
  display: flex;
  align-items: center;
}

.left {
  flex-grow: 1;
}

.right {
  flex-shrink: 0;
}

.SControl.xsmall {
  height: 28px;
}

.SControl.small {
  height: 32px;
}

.SControl.card-size-xsmall { margin: -4px; }
.SControl.card-size-small  { margin: -4px; }
</style>
