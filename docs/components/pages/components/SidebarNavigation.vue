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
            <li class="nav-item" :key="content.path" v-for="content in contents">
              <nuxt-link class="nav-link" :to="content.path" @click.native="delayClose">{{ content.label }}</nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import SIconList from '@@/lib/components/icons/SIconList'
import SIconX from '@@/lib/components/icons/SIconX'
import SButton from '@@/lib/components/buttons/SButton'

export default {
  components: {
    SIconX,
    SButton
  },

  data () {
    return {
      show: false,
      on: false,

      contents: [
        { label: 'Buttons', path: '/components/buttons' },
        { label: 'Grids', path: '/components/grids' },
        { label: 'Inputs: Checkboxes', path: '/components/inputs-checkboxes' },
        { label: 'Inputs: Radios', path: '/components/inputs-radios' },
        { label: 'Inputs: Switches', path: '/components/inputs-switches' },
        { label: 'Inputs: Text', path: '/components/inputs-text' },
        { label: 'Inputs: Textarea', path: '/components/inputs-textarea' },
        { label: 'Modals: Alert', path: '/components/modals-alert' },
        { label: 'Modals: Dialog', path: '/components/modals-dialog' },
        { label: 'Modals: Window', path: '/components/modals-window' },
        { label: 'Screens', path: '/components/screens' },
        { label: 'Snackbars', path: '/components/snackbars' }
      ],

      icon: SIconList
    }
  },

  methods: {
    close () {
      this.on = false

      setTimeout(() => { this.show = false }, 250)
    },

    delayClose () {
      setTimeout(this.close, 300)
    },

    toggle () {
      this.show = !this.show

      setTimeout(() => { this.on = this.show }, 10)
    }
  }
}
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
  padding: 64px 24px;
  background-color: var(--c-white);
  opacity: 0;
  transition: opacity .25s;

  @media (min-width: 375px) {
    padding: 80px 32px;
  }

  @media (min-width: 768px) {
    padding: 80px 48px;
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
  transform: translateY(8px);
  transition: transform .25s;
}

.nav-item {
  padding: 8px 16px;
  width: 192px;
}

.nav-link {
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}
</style>
