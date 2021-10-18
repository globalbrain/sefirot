<template>
  <div class="Components">
    <SidebarNavigation :contents="contents" />

    <div class="container">
      <div class="main c-medium">
        <NuxtChild :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SidebarNavigation from '@/components/SidebarNavigation.vue'
import { useContent } from '@/composables/Content'

export default defineComponent({
  components: {
    SidebarNavigation
  },

  setup() {
    const contents = useContent([
      { label: 'Buttons', path: '/components/buttons' },
      { label: 'Button Group', path: '/components/button-group' },
      { label: 'Grids', path: '/components/grids' },
      { label: 'Icons', path: '/components/icons' },
      { label: 'Inputs: Checkbox', path: '/components/inputs-checkbox' },
      { label: 'Inputs: Checkboxes', path: '/components/inputs-checkboxes' },
      { label: 'Inputs: Date', path: '/components/inputs-date' },
      { label: 'Inputs: Dropdown', path: '/components/inputs-dropdown' },
      { label: 'Inputs: Number', path: '/components/inputs-number' },
      { label: 'Inputs: Radios', path: '/components/inputs-radios' },
      { label: 'Inputs: Select', path: '/components/inputs-select' },
      { label: 'Inputs: Switch', path: '/components/inputs-switch' },
      { label: 'Inputs: Switches', path: '/components/inputs-switches' },
      { label: 'Inputs: Text', path: '/components/inputs-text' },
      { label: 'Inputs: Textarea', path: '/components/inputs-textarea' },
      { label: 'Inputs: YMD', path: '/components/inputs-ymd' },
      { label: 'Markdown', path: '/components/markdown' },
      { label: 'Modals: Alert', path: '/components/modals-alert' },
      { label: 'Modals: Dialog', path: '/components/modals-dialog' },
      { label: 'Modals: Sheet', path: '/components/modals-sheet' },
      { label: 'Placeholders: Blank', path: '/components/placeholders-blank' },
      { label: 'Placeholders: Image', path: '/components/placeholders-image' },
      { label: 'Responsive', path: '/components/responsive' },
      { label: 'Screens', path: '/components/screens' },
      { label: 'Snackbars', path: '/components/snackbars' },
      { label: 'Steps', path: '/components/steps' },
      { label: 'Tooltips', path: '/components/tooltips' }
    ])

    return {
      contents
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.container {
  margin: 0 auto;
  width: 100%;

  @media (min-width: 1056px) {
    padding-left: 240px;
  }
}

.main {
  flex-shrink: 0;
  margin: 0 auto;
  padding: 32px 24px 192px;
  max-width: 816px;

  @media (min-width: 375px) {
    padding: 32px 32px 192px;
  }

  @media (min-width: 768px) {
    padding: 48px 48px 192px;
  }

  @media (min-width: 1056px) {
    padding: 48px 32px 128px;
    width: 100%;
    max-width: 784px;
  }
}
</style>
