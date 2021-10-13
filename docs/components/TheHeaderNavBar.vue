<template>
  <nav class="TheHeaderNavBar">
    <ul class="list">
      <li class="item">
        <NuxtLink class="link" to="/guide" @click.native="$emit('close')">Guide</NuxtLink>
      </li>
      <li class="item">
        <NuxtLink class="link" to="/components" @click.native="$emit('close')">Components</NuxtLink>
      </li>
    </ul>

    <div class="mode">
      <div class="appearance" role="button" @click.stop="toggleMode">
        <div class="appearance-switch">
          <div class="appearance-switch-check">
            <div class="appearance-switch-icon">
              <SIconSun class="appearance-switch-svg is-sun" />
              <SIconMoon class="appearance-switch-svg is-moon" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="links">
      <div class="link-item">
        <a class="link-link" href="https://github.com/globalbrain/sefirot" target="_blank" rel="noopener noreferrer">
          <IconGitHub class="link-icon" />
        </a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'
import SIconSun from '@@/lib/components/icons/SIconSun.vue'
import SIconMoon from '@@/lib/components/icons/SIconMoon.vue'
import IconGitHub from './icons/IconGitHub.vue'

export default defineComponent({
  components: {
    SIconSun,
    SIconMoon,
    IconGitHub
  },

  setup() {
    const context = useContext()

    function toggleMode() {
      context.$colorMode.preference = context.$colorMode.preference === 'light'
        ? 'dark'
        : 'light'
    }

    return {
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
  padding-right: 20px;
  padding-left: 32px;
  transform: translateY(1px);
}

.list {
  display: flex;
}

.item {
  & + & {
    padding-left: 16px;
  }
}

.link {
  font-size: 13px;
  font-weight: 500;
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}

.mode {
  margin-left: 20px;
  border-left: 1px solid var(--c-divider-light);
  padding-top: 2px;
  padding-left: 20px;
}

.appearance {
  display: flex;
  align-items: center;
  transition: border-color .5s;
}

.appearance-text {
  flex-grow: 1;
  font-size: 12px;
  font-weight: 500;
}

.appearance-switch {
  position: relative;
  border-radius: 11px;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--c-divider);
  background-color: var(--c-bg-mute);
  transition: border-color .25s, background-color .25s;
}

.appearance-switch:hover {
  border-color: var(--c-gray);
}

.appearance-switch-check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--c-white);
  box-shadow: var(--vt-shadow-1);
  transition: background-color .25s, transform .25s;
}

.dark-mode .appearance-switch-check {
  background-color: var(--c-black);
  transform: translateX(18px);
}

.appearance-switch-icon {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.appearance-switch-svg {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: var(--c-text-2);
}

.dark-mode .appearance-switch-svg {
  fill: var(--c-text-1);
  transition: opacity .25s;
}

.appearance-switch-svg.is-sun  { opacity: 1; }
.appearance-switch-svg.is-moon { opacity: 0; }

.dark-mode .appearance-switch-svg.is-sun  { opacity: 0; }
.dark-mode .appearance-switch-svg.is-moon { opacity: 1; }

.links {
  margin-left: 20px;
  border-left: 1px solid var(--c-divider-light);
  padding-top: 1px;
  padding-left: 20px;
}

.link-link {
  color: var(--c-text-2);
  transition: color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.link-icon {
  width: 22px;
  height: 22px;
  fill: currentColor;
}
</style>
