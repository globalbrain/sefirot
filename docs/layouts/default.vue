<template>
  <div class="App">
    <TheHeader />

    <div class="content">
      <Nuxt />
    </div>

    <TheFooter />

    <SPortalModals />
    <SPortalScreens />
    <SPortalSnackbars />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import SPortalModals from '@@/lib/components/SPortalModals.vue'
import SPortalScreens from '@@/lib/components/SPortalScreens.vue'
import SPortalSnackbars from '@@/lib/components/SPortalSnackbars.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'
import { useAnchors } from '@/composables/Anchors'

export default defineComponent({
  components: {
    SPortalModals,
    SPortalScreens,
    SPortalSnackbars,
    TheHeader,
    TheFooter
  },

  setup() {
    useAnchors()
  }
})
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
