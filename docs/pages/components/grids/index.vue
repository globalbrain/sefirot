<template>
  <PageBase class="ComponentsGrids u-story">
    <div class="u-story-content">
      <h1>Grids</h1>
      <p>Grids displays sets of data.</p>

      <section>
        <h2>Vue Component</h2>

        <SGrid />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SGrid from '@/components/stories/grids/SGrid'

export default {
  components: {
    PageBase,
    SGrid
  },

  head: {
    title: 'Grids'
  },

  scrollToTop: true
}
</script>
