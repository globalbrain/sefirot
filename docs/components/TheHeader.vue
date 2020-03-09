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
import { defineComponent, ref } from '@vue/composition-api'
import TheHeaderNavScreen from './TheHeaderNavScreen.vue'
import TheHeaderNavBar from './TheHeaderNavBar.vue'
import IconSefirotH from '@/components/icons/IconSefirotH.vue'
import IconHamburger from '@/components/icons/IconHamburger.vue'

export default defineComponent({
  components: {
    IconSefirotH,
    IconHamburger,
    TheHeaderNavScreen,
    TheHeaderNavBar
  },

  setup () {
    const isOpen = ref(false)

    function toggle (): void {
      isOpen.value = !isOpen.value
    }

    function close (): void {
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
  position: relative;
  z-index: var(--z-index-header);
  padding: 0 0 0 24px;

  @media (min-width: 375px) {
    padding: 0 8px 0 32px;
  }

  @media (min-width: 512px) {
    padding: 0 32px;
  }

  @media (min-width: 768px) {
    padding: 0 48px;
  }
}

.container {
  position: relative;
  z-index: var(--z-index-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 960px;
}

.logo-link {
  display: flex;
  align-items: center;
  width: 102px;
  height: 96px;

  &:hover .logo-icon {
    fill: var(--c-gray);
  }
}

.logo-icon {
  display: block;
  width: 102px;
  height: 32px;
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
