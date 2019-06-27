<template>
  <div class="Components">
    <div class="container">
      <SidebarNavigation />

      <div class="main">
        <nuxt-child :key="$route.path" />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarNavigation from '@/components/pages/components/SidebarNavigation'

export default {
  components: {
    SidebarNavigation
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
    padding: 0;
    width: 720px;
    max-width: 720px;
  }
}
</style>

