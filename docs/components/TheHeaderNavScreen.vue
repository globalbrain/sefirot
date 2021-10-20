<template>
  <div class="TheHeaderNavScreen" :class="classes">
    <div class="container">
      <ul class="list">
        <li class="item">
          <NuxtLink class="link" to="/guide" @click.native="$emit('close')">Guide</NuxtLink>
        </li>
        <li class="item">
          <NuxtLink class="link" to="/components" @click.native="$emit('close')">Components</NuxtLink>
        </li>
      </ul>

      <div class="appearance" role="button" @click.stop="toggleMode">
        <p class="appearance-text">Appearance</p>
        <div class="appearance-switch">
          <div class="appearance-switch-check">
            <div class="appearance-switch-icon">
              <SIconSun class="appearance-switch-svg is-sun" />
              <SIconMoon class="appearance-switch-svg is-moon" />
            </div>
          </div>
        </div>
      </div>

      <ul class="social">
        <li class="social-item">
          <a class="social-link" href="https://github.com/globalbrain/sefirot" target="_blank" rel="noopener noreferrer">
            <IconGitHub class="social-icon" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, useContext } from '@nuxtjs/composition-api'
import SIconSun from '@@/lib/components/icons/SIconSun.vue'
import SIconMoon from '@@/lib/components/icons/SIconMoon.vue'
import IconGitHub from './icons/IconGitHub.vue'

export default defineComponent({
  components: {
    SIconSun,
    SIconMoon,
    IconGitHub
  },

  props: {
    open: { type: Boolean, required: true }
  },

  setup(props) {
    const context = useContext()

    const active = ref(false)
    const on = ref(false)

    const classes = computed(() => {
      return {
        active: active.value,
        on: on.value
      }
    })

    watch(() => props.open, (value) => {
      value ? show() : hide()
    })

    function show(): void {
      active.value = true
      setTimeout(() => { on.value = true }, 50)
    }

    function hide(): void {
      on.value = false
      setTimeout(() => { active.value = false }, 250)
    }

    function toggleMode() {
      context.$colorMode.preference = context.$colorMode.preference === 'light'
        ? 'dark'
        : 'light'
    }

    return {
      active,
      on,
      classes,
      toggleMode
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheHeaderNavScreen {
  position: fixed;
  top: 57px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-header);
  display: none;
  padding: 24px 0 96px;
  width: 100%;
  opacity: 0;
  background-color: var(--c-bg);
  transition: opacity .25s;
}

.TheHeaderNavScreen.active {
  display: block;

  @media (min-width: 512px) {
    display: none;
  }
}

.TheHeaderNavScreen.on {
  opacity: 1;

  .search,
  .socials,
  .copyright {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  margin: 0 auto;
  max-width: 288px;
}

.link {
  display: block;
  border-bottom: 1px solid var(--c-divider-light);
  padding: 12px 0 11px;
  font-size: 14px;
  font-weight: 500;
  transition: color .25s;

  &:hover {
    color: var(--c-text-2);
  }
}

.appearance {
  display: flex;
  align-items: center;
  border-radius: 8px;
  margin-top: 24px;
  padding: 12px 16px 11px 16px;
  background-color: var(--c-bg-soft);
  transition: background-color .25s;
}

.appearance-text {
  flex-grow: 1;
  font-size: 12px;
  font-weight: 500;
  color: var(--c-text-2);
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

.social {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.social-link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  color: var(--c-text-2);
  transition: color .25s;

  &:hover {
    color: var(--c-text-1);
  }
}

.social-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
</style>
