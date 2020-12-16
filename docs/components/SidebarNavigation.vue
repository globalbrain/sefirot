<template>
  <div class="SideBarNavigation" :class="{ show, on }">
    <div class="container">
      <div class="action">
        <div class="button">
          <SButton label="MENU" type="text" :icon="icon" @click="toggle" />
        </div>

        <button class="close" @click="close">
          <SIconX class="close-icon" />
        </button>
      </div>

      <nav class="nav">
        <div class="nav-container">
          <ul class="nav-list">
            <li v-for="content in contents" :key="content.path" class="nav-item">
              <nuxt-link class="nav-link" :to="content.path" @click.native="delayClose">{{ content.label }}</nuxt-link>
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
import SButton from '@@/lib/components/SButton.vue'

export interface Content {
  label: string
  path: string
}

export default defineComponent({
  components: {
    SIconX,
    SButton
  },

  props: {
    contents: { type: Array as PropType<Content[]>, required: true }
  },

  setup () {
    const show = ref(false)
    const on = ref(false)

    function toggle (): void {
      show.value ? close() : open()
    }

    function open (): void {
      show.value = true
      setTimeout(() => { on.value = true }, 50)
    }

    function close (): void {
      on.value = false
      setTimeout(() => { show.value = false }, 250)
    }

    function delayClose (): void {
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

.SideBarNavigation {
  flex-shrink: 0;
  border-bottom: 1px solid var(--c-divider);
  padding: 4px 24px;
  width: 100%;
  background-color: var(--c-bg);

  @media (min-width: 375px) {
    padding: 4px 32px;
  }

  @media (min-width: 768px) {
    padding: 4px 32px;
  }

  @media (min-width: 1056px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: var(--z-index-sidebar);
    border-right: 1px solid var(--c-divider);
    border-bottom: 0;
    margin: 0;
    padding: 65px 0 0;
    width: 240px;
    overflow: hidden;
    overflow-y: auto;
  }
}

.SideBarNavigation.show {
  .nav { display: block; }
}

.SideBarNavigation.show.on {
  .close    { opacity: 1; }
  .nav      { opacity: 1; }
  .nav-list { transform: translateY(0); }
}

.container {
  margin: 0 auto;
}

.action {
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -12px;

  @media (min-width: 1056px) {
    display: none;
  }
}

.close {
  opacity: 0;
  transition: opacity .25s;
}

.close-icon {
  width: 12px;
  height: 12px;
  fill: var(--c-black);
  transform: translateY(1px);
  transition: fill .25s, opacity .25s;

  &:hover {
    fill: var(--c-gray);
  }
}

.nav {
  position: fixed;
  top: 114px;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: none;
  width: 100%;
  padding: 24px 24px 48px;
  background-color: var(--c-bg);
  opacity: 0;
  transition: opacity .25s;
  overflow: hidden;
  overflow-y: auto;

  @media (min-width: 375px) {
    padding: 24px 32px 96px;
  }

  @media (min-width: 768px) {
    padding: 24px 32px 96px;
  }

  @media (min-width: 1056px) {
    position: static;
    display: block;
    padding: 24px 24px 160px 32px;
    opacity: 1;
  }
}

.nav-container {
  margin: 0 auto;
  width: 100%;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px -16px;
  transform: translateY(4px);
  transition: transform .25s;

  @media (min-width: 768px) {
    margin: -4px -16px;
  }
}

.nav-item {
  padding: 8px 16px;
  width: 192px;

  @media (min-width: 768px) {
    padding: 4px 16px;
  }
}

.nav-link {
  font-size: 16px;
  font-weight: 400;
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-text-2);
  }

  @media (min-width: 768px) {
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
