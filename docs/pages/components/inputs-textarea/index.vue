<template>
  <div class="ComponentsInputsTextarea u-story">
    <div class="u-story-content">
      <h1>Inputs: Textarea</h1>
      <p>Textarea input let users enter and edit multi line text.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputTextarea />
      </section>
    </div>
  </div>
</template>

<script>
import SInputTextarea from '@/components/stories/inputs/SInputTextarea'

export default {
  components: {
    SInputTextarea
  },

  head: {
    title: 'Inputs: Textarea'
  },

  scrollToTop: true
}
</script>
