<template>
  <div class="Home">
    <div class="mx-auto max-w-960">
      <div class="hero">
        <h1 class="title">Vue Components for Global Brain Design System.</h1>
        <p class="lead">We Shape Our Buildings. Thereafter, They Shape Us.</p>

        <div class="actions">
          <div class="action">
            <SButton
              tag="nuxt-link"
              size="large"
              label="GET STARTED"
              to="/guide"
              block
            />
          </div>
          <div class="action">
            <SButton
              class="github-button"
              tag="a"
              size="large"
              :icon="iconGitHub"
              label="SEE ON GITHUB"
              href="https://github.com/globalbrain/sefirot"
              target="_blank"
              block
            />
          </div>
        </div>
      </div>

      <div class="body mx-auto max-w-512">
        <p>Sefirot is a list of Vue Components for Global Brain Design System. Components are meant to be clean, sophisticated, and scalable.</p>

        <p class="pt-24">Note that Sefirot is focused on being used in Global Brain's ecosystem. Hence the design—UI/UX—of components is quite fixed, and customization capability is limited. In exchange for customizability, we can create components that are more robust, dynamic, and clean.</p>

        <p class="pt-24">Please feel free to leverage any component within this project. You may customize them however you want, and if maybe, some component might be valuable to you. Any suggestion, request, or questions are welcome.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'

export default defineComponent({
  components: {
    SButton
  },

  setup() {
    return {
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
  padding: 96px 24px 96px;

  @media (min-width: 375px) {
    padding: 96px 32px 128px;
  }

  @media (min-width: 768px) {
    padding: 96px 48px 128px;
  }
}

.hero {
  margin: 0 auto;
  max-width: 448px;

  @media (min-width: 768px) {
    max-width: 720px;
  }
}

.title {
  line-height: 32px;
  text-align: center;
  font-family: var(--font-family-primary);
  font-size: 24px;
  font-weight: 500;

  @media (min-width: 375px) {
    line-height: 40px;
    font-size: 32px;
  }

  @media (min-width: 768px) {
    line-height: 56px;
    font-size: 48px;
  }
}

.lead {
  padding-top: 8px;
  text-align: center;
  font-family: var(--font-family-primary);
  font-weight: 500;

  @media (min-width: 375px) {
    line-height: 28px;
    font-size: 20px;
  }

  @media (min-width: 768px) {
    padding-top: 16px;
    line-height: 32px;
    font-size: 24px;
  }
}

.actions {
  padding-top: 24px;

  @media (min-width: 512px) {
    display: flex;
    margin: 0 auto;
    max-width: 460px;
  }

  @media (min-width: 768px) {
    padding-top: 32px;
  }
}

.action {
  margin: 0 auto;
  width: 100%;

  & + & {
    padding-top: 12px;
  }

  @media (min-width: 512px) {
    & + & {
      padding-top: 0;
      padding-left: 12px;
    }
  }
}

.github-button >>> .label {
  padding-left: 12px !important;
}

.github-button >>> .icon-svg {
  width: 20px !important;
  height: 20px !important;
}

.body {
  padding-top: 48px;

  @media (min-width: 768px) {
    padding-top: 64px;
  }
}
</style>
