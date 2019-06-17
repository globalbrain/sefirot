<template>
  <div class="App">
    <TheHeader />

    <div class="content">
      <nuxt />
    </div>

    <TheFooter />

    <SPortalModals />
    <SPortalSnackbars />
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader'
import TheFooter from '@/components/layouts/TheFooter'
import SPortalModals from '@@/lib/components/portals/SPortalModals'
import SPortalSnackbars from '@@/lib/components/portals/SPortalSnackbars'

export default {
  components: {
    TheHeader,
    TheFooter,
    SPortalModals,
    SPortalSnackbars
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.App {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
}
</style>
