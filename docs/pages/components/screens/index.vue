<template>
  <PageBase class="ComponentsScreens u-story">
    <div class="u-story-content">
      <h1>Screens</h1>
      <p>Screens is full screen modal like component.</p>

      <section>
        <h2>Vue Component</h2>

        <SScreen />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SScreen from '@/components/stories/screens/SScreen'

export default {
  components: {
    PageBase,
    SScreen
  },

  head: {
    title: 'Screens'
  },

  scrollToTop: true
}
</script>
