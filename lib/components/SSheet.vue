<script setup lang="ts">
import SIconX from 'sefirot/components/icons/SIconX.vue'

defineProps<{
  size?: 'small' | 'medium' | 'large'
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <FMount class="SSheet" :class="[size ?? 'medium']" @click.stop>
    <button class="close" @click="$emit('close')">
      <SIconX class="icon" />
    </button>

    <slot />
  </FMount>
</template>

<style scoped lang="postcss">
.SSheet {
  position: relative;
  border: 1px solid var(--c-divider-light);
  border-radius: 16px;
  background-color: var(--c-bg);
  transition: opacity 0.25s, transform 0.25s;

  .dark & {
    background-color: var(--c-bg-mute);
  }

  .SModal & {
    margin: 96px auto;
    box-shadow: var(--shadow-depth-5);

    .dark & {
      background-color: var(--c-bg-soft);
    }
  }
}

.SSheet.small  { max-width: 512px; }
.SSheet.medium { max-width: 768px; }
.SSheet.large  { max-width: 1024px; }

.SSheet.mount {
  opacity: 0;
  transform: translateY(8px);
}

.close {
  position: absolute;
  top: 4px;
  right: 4px;
  display: none;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  color: var(--c-text-3);
  transition: color 0.25s;

  &:hover {
    color: var(--c-text-1);
  }

  .SModal & {
    display: flex;
  }
}

.icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
</style>
