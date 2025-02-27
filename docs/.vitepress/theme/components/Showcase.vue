<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

defineProps<{
  path: string
  story?: string
}>()
</script>

<template>
  <div class="Showcase">
    <div class="header">
      <p class="path">@globalbrain/sefirot/lib{{ path }}</p>
      <a v-if="story" class="button" :href="`/stories/${story}`">
        <SButton size="mini" mode="mute" label="View in Playground" tag="span" />
      </a>
    </div>

    <div class="main vp-raw">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.Showcase {
  margin: 0 -12px;
  border: 1px solid var(--c-divider);
  border-radius: 6px;
}

@media (min-width: 640px) {
  .Showcase {
    margin: 0;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--c-divider);
  border-radius: 6px 6px 0 0;
  padding: 12px 12px 12px 16px;
  background-color: var(--c-bg-elv-4);
}

.path {
  margin: 0;
  padding-right: 24px;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
  transform: translateY(1px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.main {
  border-radius: 0 0 6px 6px;
  padding: 24px;
  background-color: var(--c-bg-elv-2);
}

@media (min-width: 640px) {
  .main {
    padding: 32px;
  }
}
</style>
