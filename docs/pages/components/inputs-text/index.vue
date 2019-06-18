<template>
  <PageBase class="ComponentsInputsText u-story">
    <div class="u-story-content">
      <h1>Inputs: Text</h1>
      <p>Text input let users enter and edit single line text.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputText />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SInputText from '@/components/stories/inputs/SInputText'

export default {
  components: {
    PageBase,
    SInputText
  },

  head: {
    title: 'Inputs: Text'
  },

  scrollToTop: true
}
</script>
