<template>
  <div class="Home">
    <div class="container">
      <h1 class="title">Sefirot</h1>

      <div class="actions">
        <div class="action">
          <SButton
            tag="nuxt-link"
            type="secondary"
            :icon="iconFile"
            label="DOCS"
            to="/guide"
            rounded
            block
          />
        </div>
        <div class="action">
          <SButton
            class="github-button"
            tag="a"
            type="secondary"
            :icon="iconGitHub"
            label="GITHUB"
            href="https://github.com/globalbrain/sefirot"
            target="_blank"
            rounded
            block
          />
        </div>
      </div>

      <div class="body">
        <p class="text">Sefirot is a collection of Vue Components for Global Brain Design System. Components are meant to be clean, sophisticated, and scalable.</p>

        <p class="text">Sefirot is focused on being used within Global Brain's ecosystem. Hence, the design—UI/UX—of components is relatively fixed, and customization capability is limited. In exchange for customizability, we can create components that are more robust, dynamic, and clean.</p>

        <p class="text">Feel free to leverage any component within this project. You may customize components how you see fit, and perhaps some features may be valuable to you. Any suggestions, requests, or questions are welcome.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import SIconFileText from '@@/lib/components/icons/SIconFileText.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    return {
      iconFile: SIconFileText,
      iconGitHub: IconGitHub
    }
  },

  head: {
    title: 'Sefirot | We Shape Our Buildings. Thereafter, They Shape Us.'
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.Home {
  padding: 48px 24px 96px;

  @media (min-width: 768px) {
    padding: 64px 24px 128px;
  }
}

.container {
  margin: 0 auto;
  max-width: 592px;
}

.hero {
  margin: 0 auto;
}

.title {
  line-height: 56px;
  font-family: var(--font-family-primary);
  font-size: 48px;
  font-weight: 500;
}

.actions {
  display: flex;
  padding-top: 16px;
  transform: translateX(-4px);
}

.action {
  flex-shrink: 0;

  & + & {
    padding-left: 12px;
  }
}

.body {
  padding-top: 20px;
}

.text {
  line-height: 28px;
}

.text + .text {
  padding-top: 16px;
}
</style>
