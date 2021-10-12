<template>
  <nav class="TheHeaderNavBar">
    <ul class="list">
      <li class="item">
        <NuxtLink class="link" to="/guide" @click.native="$emit('close')">Guide</NuxtLink>
      </li>
      <li class="item">
        <NuxtLink class="link" to="/components" @click.native="$emit('close')">Components</NuxtLink>
      </li>
      <li class="item">
        <a class="link" href="https://github.com/globalbrain/sefirot" target="_blank">GitHub</a>
      </li>
    </ul>

    <div class="mode">
      <button class="mode-button" @click="toggleMode">
        <component :is="modeIcon" class="mode-icon" />
      </button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api'
import SIconSun from '@@/lib/components/icons/SIconSun.vue'
import SIconMoon from '@@/lib/components/icons/SIconMoon.vue'

export default defineComponent({
  setup() {
    const context = useContext()

    const modeIcon = computed(() => {
      return context.$colorMode.preference === 'light'
        ? SIconMoon
        : SIconSun
    })

    function toggleMode() {
      context.$colorMode.preference = context.$colorMode.preference === 'light'
        ? 'dark'
        : 'light'
    }

    return {
      modeIcon,
      toggleMode
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheHeaderNavBar {
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;
  padding-left: 32px;
}

.list {
  display: flex;
}

.item {
  & + & {
    padding-left: 24px;
  }
}

.link {
  font-family: var(--font-family-primary);
  font-size: 14px;
  font-weight: 500;
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}

.mode {
  margin-left: 24px;
  border-left: 1px solid var(--c-divider-light);
  padding-left: 16px;
}

.mode-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 24px;
  color: var(--c-text-2);
  transition: color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.mode-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
