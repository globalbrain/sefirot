<template>
  <div class="Components">
    <div class="container">
      <SidebarNavigation :contents="contents" />

      <div class="main c-medium">
        <nuxt-child :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SidebarNavigation, { Content } from '@/components/SidebarNavigation.vue'

export default createComponent({
  components: {
    SidebarNavigation
  },

  setup () {
    const contents: Content[] = [
      { label: 'Buttons', path: '/components/buttons' },
      { label: 'Grids', path: '/components/grids' },
      { label: 'Icons', path: '/components/icons' },
      { label: 'Inputs: Checkbox', path: '/components/inputs-checkbox' },
      { label: 'Inputs: Checkboxes', path: '/components/inputs-checkboxes' },
      { label: 'Inputs: Date', path: '/components/inputs-date' },
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
      { label: 'Responsive', path: '/components/responsive' },
      { label: 'Screens', path: '/components/screens' },
      { label: 'Snackbars', path: '/components/snackbars' }
    ]

    return {
      contents
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.Components {
  position: relative;

  @media (min-width: 768px) {
    padding: 16px 0 0;
  }

  @media (min-width: 1056px) {
    padding: 32px 48px 0;
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
