<script setup lang="ts">
import { computed } from 'vue'
import { type Position } from '../composables/Tooltip'
import SFragment from './SFragment.vue'
import STooltip from './STooltip.vue'

export type Size =
  | 'nano'
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'jumbo'
  | 'fill'

const props = defineProps<{
  size?: Size
  avatar?: string | null
  name?: string | null
  tooltip?: boolean | { position?: Position }
}>()

const classes = computed(() => [
  props.size ?? 'medium',
  { 'no-image': !props.avatar }
])

const initial = computed(() => props.name?.charAt(0).toUpperCase())

const tooltipPosition = computed(() => {
  return (props.tooltip && typeof props.tooltip === 'object')
    ? props.tooltip.position || 'top'
    : 'top'
})
</script>

<template>
  <SFragment
    :is="tooltip && name && STooltip"
    :text="name"
    :position="tooltipPosition"
    display="block"
    tag="div"
    trigger-tag="div"
  >
    <div class="SAvatar" :class="classes">
      <img v-if="avatar" class="img" :src="avatar">
      <p v-else-if="initial" class="initial">{{ initial }}</p>
    </div>
  </SFragment>
</template>

<style lang="postcss" scoped>
.SAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--c-bg-elv-1);
  border-radius: 50%;
  overflow: hidden;
}

.img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  overflow: hidden;
}

.initial {
  font-weight: 500;
}

.SAvatar.nano {
  width: 20px;
  height: 20px;
  .initial { font-size: 12px; }
}

.SAvatar.mini {
  width: 24px;
  height: 24px;
  .initial { font-size: 12px; }
}

.SAvatar.small {
  width: 28px;
  height: 28px;
  .initial { font-size: 14px; }
}

.SAvatar.medium {
  width: 32px;
  height: 32px;
  .initial { font-size: 14px; }
}

.SAvatar.large {
  width: 40px;
  height: 40px;
  .initial { font-size: 16px; }
}

.SAvatar.jumbo {
  width: 48px;
  height: 48px;
  .initial { font-size: 16px; }
}

.SAvatar.fill {
  width: 100%;
  aspect-ratio: 1 / 1;
  .initial { font-size: 20px; }
}

.SAvatar.no-image {
  border: 1px solid var(--c-border-mute-1);
}
</style>
