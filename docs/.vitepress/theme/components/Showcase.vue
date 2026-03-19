<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import { computed } from 'vue'

const props = defineProps<{
  path: string
  story?: string
}>()

const computedPath = computed(() => {
  return `@globalbrain/sefirot/lib${props.path}`
})

const computedStory = computed(() => {
  return `https://${__STORY_HOST__}/story${props.story}`
})
</script>

<template>
  <div class="Showcase">
    <div class="header">
      <p class="path">{{ computedPath }}</p>
      <SButton v-if="story" size="xs" label="View in Histoire" :href="computedStory" />
    </div>

    <div class="main vp-raw">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="postcss">
.Showcase {
  margin: 0 -12px;
  border: 1px solid var(--c-divider);
  border-radius: 12px;
}

@media (min-width: 640px) {
  .Showcase {
    margin: 0;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--c-divider);
  border-radius: 11px 11px 0 0;
  padding: 8px 8px 7px 12px;
  background-color: var(--c-bg-2);
}

.header :deep(.SButton) {
  text-decoration: none;
}

.path {
  margin: 0;
  padding-right: 24px;
  line-height: 24px;
  font-size: 12px;
  font-weight: 400;
  color: var(--c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main {
  border-radius: 0 0 11px 11px;
  padding: 24px;
  background-color: var(--c-bg-1);
}

@media (min-width: 640px) {
  .main {
    padding: 32px;
  }
}
</style>
