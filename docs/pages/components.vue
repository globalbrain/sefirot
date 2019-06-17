<template>
  <div class="Components">
    <div class="container">
      <nav class="nav">
        <p class="nav-title">Components</p>

        <ul class="nav-list">
          <li class="nav-item" :key="content.path" v-for="content in contents">
            <nuxt-link class="nav-link" :to="content.path">{{ content.label }}</nuxt-link>
          </li>
        </ul>
      </nav>

      <div class="main">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contents: [
        { label: 'Buttons', path: '/components/buttons' },
        { label: 'Inputs: Checkboxes', path: '/components/inputs-checkboxes' },
        { label: 'Inputs: Radios', path: '/components/inputs-radios' },
        { label: 'Inputs: Switches', path: '/components/inputs-switches' },
        { label: 'Inputs: Text', path: '/components/inputs-text' },
        { label: 'Inputs: Textarea', path: '/components/inputs-textarea' },
        { label: 'Modals: Alert', path: '/components/modals-alert' },
        { label: 'Modals: Dialog', path: '/components/modals-dialog' },
        { label: 'Snackbars', path: '/components/snackbars' },
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  display: flex;
  margin: 0 auto;
  width: 960px;
}

.nav {
  padding: 8px 48px 192px 0;
  flex-shrink: 0;
  width: 240px;
}

.nav-title {
  padding-bottom: 16px;
  color: var(--c-gray);
}

.nav-item {
  & + & {
    padding-top: 8px;
  }
}

.nav-link {
  transition: color .25s;

  &:hover,
  &.nuxt-link-active {
    color: var(--c-gray);
  }
}

.main {
  width: 720px;
}
</style>

