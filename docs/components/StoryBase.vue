<template>
  <article ref="el" class="StoryBase" :class="{ open: isOpen }">
    <div class="header">
      <h1 class="title">{{ title }}</h1>

      <div v-if="canToggle" class="action">
        <button class="button" @click="toggle">
          <SIconCode class="icon" />
        </button>
      </div>
    </div>

    <div class="component">
      <slot />
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import SIconCode from '@@/lib/components/icons/SIconCode.vue'

export default defineComponent({
  components: {
    SIconCode
  },

  props: {
    title: { type: String, default: null }
  },

  setup() {
    const el = ref<HTMLElement>()
    const isOpen = ref(false)

    const sibling = computed(() => el.value && el.value.nextElementSibling)
    const canToggle = computed(() => !!sibling.value)

    function toggle(): void {
      isOpen.value = !isOpen.value

      if (sibling.value) {
        const style = isOpen.value ? 'block' : 'none'

        sibling.value.setAttribute('style', `display: ${style};`)
      }
    }

    return {
      el,
      isOpen,
      toggle,
      canToggle
    }
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
  border-bottom: 1px solid var(--c-divider-light);

  @media (min-width: 375px) {
    margin-right: -32px;
    margin-left: -32px;
  }

  @media (min-width: 768px) {
    margin-right: -24px;
    margin-left: -24px;
    border-right: 1px solid var(--c-divider-light);
    border-left: 1px solid var(--c-divider-light);
    border-radius: 8px;
  }
}

.StoryBase.open {
  border-bottom: 0;

  @media (min-width: 768px) {
    border-radius: 4px 4px 0 0;
  }
}

.header {
  display: flex;
  border-bottom: 1px solid var(--c-divider-light);
  padding: 0 8px 0 24px;
  background-color: var(--c-white-soft);

  @media (min-width: 375px) {
    padding: 4px 12px 4px 32px;
  }

  @media (min-width: 768px) {
    border-radius: 8px 8px 0 0;
    padding: 4px 4px 4px 24px;
  }
}

.title {
  flex-grow: 1;
  margin: 0;
  padding: 8px 0;
  line-height: 24px;
  font-family: var(--font-family-base);
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-light-2);
}

.action {
  flex-shrink: 0;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  color: var(--c-text-2);
  transition: color .25s, background-color .25s;

  &:hover {
    color: var(--c-info);
    background-color: var(--c-white-mute);
  }
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
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
