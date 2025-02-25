<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

defineProps<{
  title: string
  docs?: string
}>()
</script>

<template>
  <div class="Board">
    <div class="b-root">
      <div class="b-menu">
        <div class="b-title">{{ title }}</div>

        <SButton
          v-if="docs"
          class="b-button"
          size="mini"
          mode="mute"
          label="View Documentation"
          :href="docs"
          tag="a"
        />
      </div>

      <div class="b-page">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.b-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.b-menu {
  display: grid;
  grid-template-columns: minmax(0, 1fr) min-content;
  gap: 24px;
  padding: 12px 16px;
  border-bottom: 4px solid var(--c-bg-elv-1);
  background-color: var(--c-bg-elv-2);
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
  background-color: var(--c-bg-elv-2);
}
</style>
