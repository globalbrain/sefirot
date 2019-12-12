<template>
  <article class="StoryBase">
    <h1 class="title" v-if="title">{{ title }}</h1>

    <div class="component">
      <slot />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    title: { type: String, default: null }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.StoryBase {
  margin: 48px -12px 0;
  border: 1px solid var(--c-divider-light);
  border-radius: 2px 2px 0 0;
  border-bottom: 0;

  @media (min-width: 375px) {
    margin: 48px -16px 0;
  }

  @media (min-width: 768px) {
    margin: 48px -24px 0;
  }
}

.title {
  margin: 0;
  padding: 24px 12px 0;
  line-height: 24px;
  font-size: 16px;
  color: var(--c-gray);

  @media (min-width: 375px) {
    padding: 24px 16px 0;
  }

  @media (min-width: 768px) {
    padding: 32px 24px 0;
  }
}

.component {
  padding: 24px 12px;

  @media (min-width: 375px) {
    padding: 24px 16px;
  }

  @media (min-width: 768px) {
    padding: 32px 24px;
  }
}
</style>
