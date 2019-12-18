<template>
  <div class="Home">
    <div class="container">
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

      <div class="description">
        <div class="column">
          <p class="text">Sefirot is a list of Vue Components for Global Brain Design System. Components are meant to be clean, sophisticated, and scalable.</p>

          <p class="text">Note that Sefirot is focused on being used in Global Brain's ecosystem. Hence the design—UI/UX—of components is quite fixed, and customization capability is limited. In exchange for customizability, we can create components that are more robust, dynamic, and clean.</p>
        </div>

        <div class="column">
          <p class="text">Please feel free to leverage any component within this project. You may customize them however you want, and if maybe, some component might be valuable to you. Any suggestion, request, or questions are welcome.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SButton from '@@/lib/components/SButton.vue'
import IconGitHub from '@/components/icons/IconGitHub.vue'

export default createComponent({
  components: {
    SButton
  },

  setup () {
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
  padding: 16px 24px 128px;

  @media (min-width: 375px) {
    padding: 32px 32px 128px;
  }

  @media (min-width: 768px) {
    padding: 48px 48px 192px;
  }

  @media (min-width: 1056px) {
    padding: 56px 48px 192px;
  }
}

.container {
  margin: 0 auto;
  max-width: 960px;
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
  width: 224px;

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

.description {
  margin: 0 auto;
  padding-top: 48px;
  max-width: 512px;

  @media (min-width: 768px) {
    padding-top: 64px;
  }
}

.column {
  & + & {
    padding-top: 24px;
  }
}

.text {
  & + & {
    padding-top: 24px;
  }
}
</style>
