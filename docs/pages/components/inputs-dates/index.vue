<template>
  <PageBase class="ComponentsInputsDates u-story">
    <div class="u-story-content">
      <h1>Inputs: Date</h1>
      <p>Dates input let users enter and edit year, month, and date.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputDate />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SInputDate from '@/components/stories/inputs/SInputDate'

export default {
  components: {
    PageBase,
    SInputDate
  },

  head: {
    title: 'Inputs: Dates'
  },

  scrollToTop: true
}
</script>
