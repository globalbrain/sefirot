<template>
  <PageBase class="ComponentsInputsRadios u-story">
    <div class="u-story-content">
      <h1>Inputs: Radios</h1>
      <p>Radio buttons allow the user to select one option from a set.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputRadios />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SInputRadios from '@/components/stories/inputs/SInputRadios'

export default {
  components: {
    PageBase,
    SInputRadios
  },

  head: {
    title: 'Inputs: Radios'
  },

  scrollToTop: true
}
</script>
