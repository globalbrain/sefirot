<template>
  <div class="ComponentsInputsText u-story">
    <div class="u-story-content">
      <h1>Inputs: Text</h1>
      <p>Text input let users enter and edit single line text.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputText />
      </section>
    </div>
  </div>
</template>

<script>
import SInputText from '@/components/stories/inputs/SInputText'

export default {
  components: {
    SInputText
  },

  head: {
    title: 'Inputs: Text'
  },

  scrollToTop: true
}
</script>
