<script setup lang="ts">
import { computed } from 'vue'
import SAvatar from './SAvatar.vue'

export type Size = 'mini' | 'small' | 'medium' | 'large' | 'jumbo'

const props = withDefaults(defineProps<{
  size?: Size
  avatars: { image?: string; name?: string }[]
  avatarCount?: number
}>(), {
  size: 'medium',
  avatarCount: 2
})

const avatars = computed(() => {
  return props.avatarCount < 1 ? props.avatars : props.avatars.slice(0, props.avatarCount)
})

const count = computed(() => {
  return props.avatarCount < 1 ? 0 : Math.max(0, props.avatars.length - props.avatarCount)
})
</script>

<template>
  <div class="SAvatarStack" :class="size">
    <SAvatar
      v-for="(avatar, index) in avatars"
      :key="index"
      :size="size"
      :avatar="avatar.image"
      :name="avatar.name"
    />
    <div v-if="count" class="more">+{{ count }}</div>
  </div>
</template>

<style scoped lang="postcss">
.SAvatarStack {
  display: flex;

  > * {
    border: 2px solid var(--c-bg-elv-2);
    flex-shrink: 0;
  }

  &.mini > *:not(:last-child)   { margin-right: -6px }
  &.small > *:not(:last-child)  { margin-right: -7px }
  &.medium > *:not(:last-child) { margin-right: -8px }
  &.large > *:not(:last-child)  { margin-right: -10px }
  &.jumbo > *:not(:last-child)  { margin-right: -12px }
}

.more {
  aspect-ratio: 1;
  font-feature-settings: 'tnum';
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--c-bg-mute-1);
  border-radius: 50%;
  line-height: 1;

  .mini &   { font-size: 10px }
  .small &  { font-size: 11px }
  .medium & { font-size: 12px }
  .large &  { font-size: 14px }
  .jumbo &  { font-size: 16px }
}
</style>
