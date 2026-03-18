<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  docs?: string
}>()

const href = computed(() => {
  if (!props.docs) {
    return undefined
  }

  if (props.docs.startsWith('/')) {
    return `https://${__DOCS_HOST__}${props.docs}`
  }

  return props.docs
})
</script>

<template>
  <div class="Board">
    <div class="b-root">
      <div class="b-menu">
        <div class="b-title">{{ title }}</div>

        <SButton
          v-if="href"
          class="b-button"
          size="mini"
          label="View Documentation"
          :href
        />
      </div>

      <div class="b-page">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.b-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  background-color: var(--c-bg-1);
}

.b-menu {
  display: grid;
  grid-template-columns: minmax(0, 1fr) min-content;
  gap: 24px;
  padding: 12px 16px 11px;
  border-bottom: 1px solid var(--c-border);
}

.b-title {
  line-height: 28px;
  font-size: 12px;
  color: var(--c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(1px);
}

.b-page {
  flex-grow: 1;
  padding: 32px;
}
</style>
