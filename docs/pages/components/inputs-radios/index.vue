<template>
  <div class="ComponentsInputsRadios u-story">
    <div class="u-story-content">
      <h1>Inputs: Radios</h1>
      <p>Radio buttons allow the user to select one option from a set.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputRadios />
      </section>
    </div>
  </div>
</template>

<script>
import SInputRadios from '@/components/stories/inputs/SInputRadios'

export default {
  components: {
    SInputRadios
  },

  head: {
    title: 'Inputs: Radios'
  },

  scrollToTop: true
}
</script>
