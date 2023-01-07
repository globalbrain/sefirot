<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  state?: () => Record<string, any>
  docs?: string
}>()

const href = computed(() => {
  if (!props.docs) {
    return undefined
  }

  if (props.docs.startsWith('/')) {
    return `https://sefirot.globalbrains.com${props.docs}`
  }

  return props.docs
})
</script>

<template>
  <Story
    class="Board"
    :title="title"
    :init-state="state ?? (() => ({}))"
    source="Not available"
    auto-props-disabled
  >
    <template v-if="$slots.controls" #controls="{ state }">
      <slot name="controls" :state="state" />
    </template>

    <template v-if="$slots.default" #default="{ state }">
      <div class="b-root">
        <div class="b-menu">
          <div class="b-title">{{ title }}</div>

          <SButton
            v-if="href"
            class="b-button"
            size="mini"
            mode="mute"
            label="View Documentation"
            :href="href"
          />
        </div>

        <div class="b-page">
          <slot :state="state" />
        </div>
      </div>
    </template>
  </Story>
</template>

<style scoped>
.b-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.b-menu {
  display: grid;
  grid-template-columns: 1fr min-content;
  padding: 12px 12px 12px 32px;
  border-bottom: 4px solid var(--c-bg-elv-1);
  background-color: var(--c-bg-elv-2);
}

.b-title {
  display: flex;
  align-items: center;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
  transform: translateY(1px);
}

.b-page {
  flex-grow: 1;
  padding: 32px;
  background-color: var(--c-bg-elv-2);
}
</style>
