<template>
  <div class="SSheet" :class="[size ?? 'medium']" @click="closeIfClosable">
    <article class="box" @click.stop>
      <div v-if="closable !== false" class="close">
        <button class="close-button" @click="$emit('close')">
          <SIconX class="close-icon" />
        </button>
      </div>

      <slot :close="() => emit('close')" />
    </article>
  </div>
</template>

<script setup lang="ts">
import SIconX from './icons/SIconX.vue'

const props = defineProps<{
  size?: 'small' | 'medium' | 'large'
  closable?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function closeIfClosable() {
  if (props.closable !== false) {
    emit('close')
  }
}
</script>

<style scoped lang="postcss">
.SSheet {
  padding: 16px 16px 96px;
  min-height: 100vh;

  @media (min-width: 512px) {
    padding: 32px 24px 96px;
  }

  @media (min-width: 768px) {
    padding: 48px 32px 128px;
  }
}

.SSheet.small .box  { max-width: 392px; }
.SSheet.medium .box { max-width: 512px; }
.SSheet.large .box  { max-width: 768px; }

.box {
  position: relative;
  margin: 0 auto;
  border: 1px solid var(--c-divider-light);
  border-radius: 8px;
  background-color: var(--c-bg);
  box-shadow: var(--shadow-depth-3);
}

.close {
  position: absolute;
  top: 10px;
  right: 4px;
  z-index: 10;

  @media (min-width: 512px) {
    top: 14px;
    right: 12px;
  }
}

.close-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  color: var(--c-text-3);
  transition: color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.close-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
