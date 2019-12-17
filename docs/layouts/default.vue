<template>
  <div class="App">
    <TheHeader />

    <div class="content">
      <nuxt />
    </div>

    <TheFooter />

    <SPortalModals />
    <SPortalScreens />
    <SPortalSnackbars />
  </div>
</template>

<script>
import HandlesValidationError from '@@/lib/mixins/HandlesValidationError'
import SPortalModals from '@@/lib/components/portals/SPortalModals'
import SPortalScreens from '@@/lib/components/portals/SPortalScreens'
import SPortalSnackbars from '@@/lib/components/portals/SPortalSnackbars'
import TheFooter from '@/components/layouts/TheFooter'
import TheHeader from '@/components/layouts/TheHeader'

export default {
  components: {
    TheHeader,
    TheFooter,
    SPortalModals,
    SPortalScreens,
    SPortalSnackbars
  },

  mixins: [HandlesValidationError()]
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
