<template>
  <article class="StoryBase">
    <h1 v-if="title" class="title">{{ title }}</h1>

    <div class="component">
      <slot />
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: { type: String, default: null }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.StoryBase {
  margin-top: 32px;
  margin-right: -24px;
  margin-left: -24px;
  border-top: 1px solid var(--c-divider-light);
  border-radius: 0;
  border-bottom: 0;

  @media (min-width: 375px) {
    margin-right: -32px;
    margin-left: -32px;
  }

  @media (min-width: 768px) {
    margin-right: -24px;
    margin-left: -24px;
    border-right: 1px solid var(--c-divider-light);
    border-left: 1px solid var(--c-divider-light);
    border-radius: 4px 4px 0 0;
  }
}

.title {
  margin: 0;
  padding: 12px 24px 0;
  line-height: 24px;
  font-family: var(--font-family-base);
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-light-2);

  @media (min-width: 375px) {
    padding: 16px 32px 0;
  }

  @media (min-width: 768px) {
    padding: 24px 24px 0;
  }
}

.component {
  padding: 24px;

  @media (min-width: 375px) {
    padding: 24px 32px;
  }

  @media (min-width: 768px) {
    padding: 32px 24px;
  }
}
</style>
