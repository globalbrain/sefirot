<template>
  <div class="ComponentsInputsCheckbox u-story">
    <div class="u-story-content">
      <h1>Inputs: Checkbox</h1>
      <p>Checkbox let users toggle an item on and off.</p>

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
    title: 'Inputs: Checkbox'
  },

  scrollToTop: true
}
</script>
