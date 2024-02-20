<script setup lang="ts">
import { computed } from 'vue'

export type Size =
  | 'nano'
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'jumbo'
  | 'mega'
  | 'fill'

const props = defineProps<{
  size?: Size
  avatar?: string | null
  name?: string | null
}>()

const classes = computed(() => [
  props.size ?? 'medium',
  { 'no-image': !props.avatar }
])

const initial = computed(() => props.name?.charAt(0).toUpperCase())
</script>

<template>
  <div class="SAvatar" :class="classes">
    <img v-if="avatar" class="img" :src="avatar">
    <p v-else-if="initial" class="initial">{{ initial }}</p>
  </div>
</template>

<style lang="postcss" scoped>
.SAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--c-bg-elv-1);
  overflow: hidden;
}

.img {
  object-fit: cover;
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
