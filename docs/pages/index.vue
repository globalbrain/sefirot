<template>
  <div class="Home">
    <div class="container">
      <div class="hero">
        <h1 class="title">Vue Components for Global Brain Design System.</h1>
        <p class="lead">We Shape Our Buildings. Thereafter, They Shape Us.</p>

        <div class="action">
          <SButton tag="nuxt-link" size="large" label="GET STARTED" to="/guide" />
        </div>
      </div>

      <div class="sections">
        <section class="section">
          <h2 class="section-title">What is Sefirot?</h2>

          <p class="section-text">Sefirot is a list of Vue Components for Global Brain Design System. Components are meant to be clean, sophisticated, and scalable.</p>

          <p class="section-text">Note that Sefirot is focused on being used in Global Brain's ecosystem. Hence the design—UI/UX—of components is quite fixed, and customization capability is limited. In exchange for customizability, we can create components that are more robust, dynamic, and clean.</p>

          <p class="section-text">Please feel free to leverage any component within this project. You may customize them however you want, and if maybe, some component might be valuable to you. Any suggestion, request, or questions are welcome.</p>

          <div class="section-action">
            <SButton
              tag="nuxt-link"
              size="large"
              label="SEE DOCUMENTATION"
              to="/guide"
            />
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Contribution</h2>

          <p class="section-text">Sefirot is open-sourced software licensed under the MIT license. If you are interested in contributing to Sefirot, we’ll be really excited. If there’s anything, please open an issue or even send us pull request on GitHub.</p>

          <div class="section-action">
            <SButton
              tag="a"
              size="large"
              :icon="iconGitHub"
              label="SEE ON GITHUB"
              href="https://github.com/globalbrain/sefirot"
              target="_blank"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SButton from '@@/lib/components/buttons/SButton'
import IconGitHub from '@/components/icons/IconGitHub'

export default {
  components: {
    SButton
  },

  data () {
    return {
      iconGitHub: IconGitHub
    }
  },

  head: {
    title: 'Sefirot | We Shape Our Buildings. Thereafter, They Shape Us.'
  }
}
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
  font-size: 24px;

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

.action {
  padding-top: 24px;
  text-align: center;

  @media (min-width: 375px) {
    padding-top: 32px;
  }
}

.sections {
  margin: 0 auto;
  max-width: 512px;
  padding-top: 64px;

  @media (min-width: 375px) {
    padding-top: 96px;
  }

  @media (min-width: 768px) {
    display: flex;
    max-width: 100%;
  }

  @media (min-width: 1056px) {
    padding-top: 128px;
  }
}

.section {
  @media (min-width: 768px) {
    flex-shrink: 0;
    width: 50%;

    &:first-child {
      padding-right: 24px;
    }

    &:last-child {
      padding-left: 24px;
    }
  }

  @media (min-width: 1056px) {
    &:first-child {
      padding-right: 32px;
    }

    &:last-child {
      padding-left: 32px;
    }
  }
}

.section-title {
  padding-bottom: 24px;
  font-size: 24px;

  @media (min-width: 375px) {
    font-size: 32px;
  }
}

.section-text {
  & + & {
    padding-top: 24px;
  }
}

.section-action {
  padding-top: 32px;
}
</style>
