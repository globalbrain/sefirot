<script setup lang="ts">
import IconX from '@iconify-icons/ph/x'
import SIcon from './SIcon.vue'
import SMount from './SMount.vue'

export interface Props {
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
  closable: true
})

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <SMount class="SSheet" :class="[size]">
    <button v-if="closable ?? true" class="close" @click="$emit('close')">
      <SIcon :icon="IconX" class="icon" />
    </button>

    <slot />
  </SMount>
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
}
</style>
