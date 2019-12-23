<template>
  <div class="App">
    <TheHeader />

    <div class="content">
      <nuxt />
    </div>

    <TheFooter />

    <SPortalSnackbars />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import SPortalSnackbars from '@@/lib/components/SPortalSnackbars.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheHeader from '@/components/TheHeader.vue'

export default createComponent({
  components: {
    SPortalSnackbars,
    TheHeader,
    TheFooter
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
