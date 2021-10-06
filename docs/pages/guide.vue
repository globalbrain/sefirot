<template>
  <div class="Guide">
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
import { useContent } from '../composables/Content'
import SidebarNavigation from '@/components/SidebarNavigation.vue'

export default defineComponent({
  components: {
    SidebarNavigation
  },

  setup() {
    const contents = useContent([
      { label: 'Getting Started', path: '/guide/getting-started' },
      { label: 'Contribution', path: '/guide/contribution' }
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
