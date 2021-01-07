<template>
  <div class="TheHeader">
    <TheHeaderNavScreen :open="isOpen" @close="close" />

    <div class="container">
      <div class="logo">
        <nuxt-link class="logo-link" to="/" @click.native="close">
          <IconSefirotH class="logo-icon" />
        </nuxt-link>
      </div>

      <div class="hamburger">
        <IconHamburger color="black" :active="isOpen" @click="toggle" />
      </div>

      <div class="nav">
        <TheHeaderNavBar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import IconSefirotH from '@/components/icons/IconSefirotH.vue'
import IconHamburger from '@/components/icons/IconHamburger.vue'
import TheHeaderNavScreen from './TheHeaderNavScreen.vue'
import TheHeaderNavBar from './TheHeaderNavBar.vue'

export default defineComponent({
  components: {
    IconSefirotH,
    IconHamburger,
    TheHeaderNavScreen,
    TheHeaderNavBar
  },

  setup() {
    const isOpen = ref(false)

    function toggle(): void {
      isOpen.value = !isOpen.value
    }

    function close(): void {
      setTimeout(() => { isOpen.value = false }, 150)
    }

    return {
      isOpen,
      toggle,
      close
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.TheHeader {
  position: sticky;
  top: 0;
  left: 0;
  z-index: var(--z-index-header);
  border-bottom: 1px solid var(--c-divider-light);
  padding: 0 0 0 24px;
  width: 100%;
  background-color: var(--c-bg);

  @media (min-width: 375px) {
    padding: 0 8px 0 32px;
  }

  @media (min-width: 512px) {
    padding: 0 32px;
  }
}

.container {
  position: relative;
  z-index: var(--z-index-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  width: 90px;
  height: 64px;

  &:hover .logo-icon {
    fill: var(--c-gray);
  }
}

.logo-icon {
  display: block;
  width: 90px;
  height: 28px;
  fill: var(--c-black);
  transition: fill .25s;
}

.hamburger {
  @media (min-width: 512px) {
    display: none;
  }
}

.nav {
  display: none;
  justify-content: flex-end;
  flex-grow: 1;
  width: 100%;

  @media (min-width: 512px) {
    display: flex;
  }
}
</style>
