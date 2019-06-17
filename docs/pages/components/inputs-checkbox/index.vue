<template>
  <div class="ComponentsInputsCheckbox u-story">
    <div class="u-story-content">
      <h1>Inputs: Checkboxes</h1>
      <p>Checkboxes allow the user to select one or more items from a set. Checkboxes can be used to turn an option on or off.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputCheckbox />
      </section>
    </div>
  </div>
</template>

<script>
import SInputCheckbox from '@/components/stories/inputs/SInputCheckbox'

export default {
  components: {
    SInputCheckbox
  },

  head: {
    title: 'Inputs: Checkboxes'
  },

  scrollToTop: true
}
</script>
