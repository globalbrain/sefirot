<template>
  <div class="Components">
    <div class="container">
      <SidebarNavigation :contents="contents" />

      <div class="main u-medium">
        <nuxt-child :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarNavigation from '@/components/layouts/SidebarNavigation'

export default {
  components: {
    SidebarNavigation
  },

  data () {
    return {
      contents: [
        { label: 'Buttons', path: '/components/buttons' },
        { label: 'Grids', path: '/components/grids' },
        { label: 'Inputs: Checkbox', path: '/components/inputs-checkbox' },
        { label: 'Inputs: Checkboxes', path: '/components/inputs-checkboxes' },
        { label: 'Inputs: Dates', path: '/components/inputs-dates' },
        { label: 'Inputs: Radios', path: '/components/inputs-radios' },
        { label: 'Inputs: Select', path: '/components/inputs-select' },
        { label: 'Inputs: Switch', path: '/components/inputs-switch' },
        { label: 'Inputs: Switches', path: '/components/inputs-switches' },
        { label: 'Inputs: Text', path: '/components/inputs-text' },
        { label: 'Inputs: Textarea', path: '/components/inputs-textarea' },
        { label: 'Modals: Alert', path: '/components/modals-alert' },
        { label: 'Modals: Dialog', path: '/components/modals-dialog' },
        { label: 'Modals: Window', path: '/components/modals-window' },
        { label: 'Placeholders: Blank', path: '/components/placeholders-blank' },
        { label: 'Placeholders: Image', path: '/components/placeholders-image' },
        { label: 'Screens', path: '/components/screens' },
        { label: 'Snackbars', path: '/components/snackbars' }
      ]
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.Components {
  position: relative;

  @media (min-width: 768px) {
    padding: 16px 0 0;
  }

  @media (min-width: 1056px) {
    padding: 0 48px 0;
  }
}

.container {
  margin: 0 auto;
  width: 100%;
  max-width: 960px;

  @media (min-width: 1056px) {
    display: flex;
  }
}

.main {
  flex-shrink: 0;
  margin: 0 auto;
  padding: 16px 24px 192px;
  max-width: 816px;

  @media (min-width: 375px) {
    padding: 16px 32px 192px;
  }

  @media (min-width: 768px) {
    padding: 16px 48px 192px;
  }

  @media (min-width: 1056px) {
    padding: 0 0 128px;
    width: 720px;
    max-width: 720px;
  }
}
</style>

