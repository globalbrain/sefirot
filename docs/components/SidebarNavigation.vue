<template>
  <div class="SidebarNavigation" :class="{ show, on }">
    <div class="container">
      <div class="action">
        <button class="button" @click="toggle">
          <SIconList class="button-icon" /> Menu
        </button>

        <button class="close" @click="close">
          <SIconX class="close-icon" />
        </button>
      </div>

      <nav class="nav">
        <div class="nav-container">
          <ul class="nav-list">
            <li v-for="content in contents" :key="content.path" class="nav-item">
              <NuxtLink class="nav-link" :to="content.path" @click.native="delayClose">{{ content.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from '@nuxtjs/composition-api'
import SIconList from '@@/lib/components/icons/SIconList.vue'
import SIconX from '@@/lib/components/icons/SIconX.vue'
import { Content } from '@/composables/Content'

export default defineComponent({
  components: {
    SIconX,
    SIconList
  },

  props: {
    contents: { type: Array as PropType<Content[]>, required: true }
  },

  setup() {
    const show = ref(false)
    const on = ref(false)

    function toggle(): void {
      show.value ? close() : open()
    }

    function open(): void {
      show.value = true
      setTimeout(() => { on.value = true }, 50)
    }

    function close(): void {
      on.value = false
      setTimeout(() => { show.value = false }, 50)
    }

    function delayClose(): void {
      setTimeout(close, 300)
    }

    return {
      show,
      on,
      icon: SIconList,
      toggle,
      open,
      close,
      delayClose
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SidebarNavigation {
  flex-shrink: 0;
  border-bottom: 1px solid var(--c-divider-light);
  padding: 5px 24px 2px;
  width: 100%;
  background-color: var(--c-bg);
  transition: background-color .5s;

  @media (min-width: 1056px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: var(--z-index-sidebar);
    border-bottom: 0;
    margin: 0;
    padding: 57px 0 0;
    width: 240px;
    overflow: hidden;
    overflow-y: auto;
  }
}

.SidebarNavigation.show {
  .nav { transform: translateX(0); }
}

.SidebarNavigation.show.on {
  .close    { opacity: 1; }
  .nav      { opacity: 1; }
  .nav-list { transform: translateY(0); }
}

.container {
  margin: 0 auto;
  height: 100%;
}

.action {
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1056px) {
    display: none;
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 40px;
  font-size: 13px;
  font-weight: 500;
  color: var(--c-text-1);
  transition: color .25s;

  &:hover {
    color: var(--c-text-2);
  }
}

.button-icon {
  margin-top: -2px;
  margin-right: 8px;
  width: 15px;
  height: 15px;
  fill: currentColor;
}

.close {
  opacity: 0;
  transition: opacity .25s;
}

.close-icon {
  margin-top: -4px;
  width: 16px;
  height: 16px;
  fill: var(--c-text-1);
  transform: translateY(1px);
  transition: fill .25s, opacity .25s;

  &:hover {
    fill: var(--c-text-2);
  }
}

.nav {
  position: fixed;
  top: 56px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  max-width: 288px;
  border-right: 1px solid var(--c-divider-light);
  padding: 16px 24px 96px;
  background-color: var(--c-bg);
  opacity: 1;
  box-shadow: var(--shadow-depth-3);
  transform: translateX(-100%);
  overflow: hidden;
  overflow-y: auto;
  transition: background-color .5s, opacity .25s, transform .25s;

  @media (min-width: 1056px) {
    position: static;
    display: block;
    height: 100%;
    opacity: 1;
    box-shadow: none;
    transform: translateX(0);
  }
}

.nav-container {
  margin: 0 auto;
  width: 100%;
}

.nav-link {
  display: block;
  line-height: 32px;
  font-size: 13px;
  font-weight: 500;
  color: var(--c-text-2);
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-text-1);
  }
}
</style>
