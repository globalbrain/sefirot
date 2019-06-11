<template>
  <div class="ComponentsButtons u-story">
    <div class="u-story-content">
      <h1>Buttons</h1>
      <p>Buttons allow users to take actions, and make choices, with a single tap.</p>

      <section>
        <h2>Vue Component</h2>

        <SButton />
      </section>
    </div>
  </div>
</template>

<script>
import SButton from '@/components/stories/buttons/SButton'

export default {
  components: {
    SButton
  },

  head: {
    title: 'Buttons'
  },

  scrollToTop: true
}
</script>
