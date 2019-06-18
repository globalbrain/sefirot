<template>
  <PageBase class="ComponentsInputsTextarea u-story">
    <div class="u-story-content">
      <h1>Inputs: Textarea</h1>
      <p>Textarea input let users enter and edit multi line text.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputTextarea />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SInputTextarea from '@/components/stories/inputs/SInputTextarea'

export default {
  components: {
    PageBase,
    SInputTextarea
  },

  head: {
    title: 'Inputs: Textarea'
  },

  scrollToTop: true
}
</script>
