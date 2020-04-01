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
import { defineComponent, ref, PropType } from '@vue/composition-api'
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
  padding: 0 24px;

  @media (min-width: 375px) {
    padding: 0 32px;
  }

  @media (min-width: 768px) {
    padding: 0 48px;
  }

  @media (min-width: 1056px) {
    padding: 0 48px 0 0;
    width: 240px;
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
  max-width: 720px;
}

.action {
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: -16px;

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
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: none;
  width: 100%;
  height: 100%;
  padding: 64px 24px 96px;
  background-color: var(--c-white);
  opacity: 0;
  transition: opacity .25s;

  @media (min-width: 375px) {
    padding: 64px 32px 96px;
  }

  @media (min-width: 768px) {
    padding: 80px 48px 96px;
  }

  @media (min-width: 1056px) {
    position: static;
    display: block;
    padding: 0;
    opacity: 1;
  }
}

.nav-container {
  margin: 0 auto;
  width: 100%;
  max-width: 720px;
}

.nav-list {
  display: flex;
  flex-wrap: wrap;
  margin: -8px -16px;
  transform: translateY(4px);
  transition: transform .25s;
}

.nav-item {
  padding: 8px 16px;
  width: 192px;
}

.nav-link {
  font-family: var(--font-family-primary);
  font-weight: 500;
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}
</style>
