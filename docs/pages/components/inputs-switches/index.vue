<template>
  <PageBase class="ComponentsInputsSwitches u-story">
    <div class="u-story-content">
      <h1>Inputs: Switches</h1>
      <p>Switches toggle the state of a single setting on or off.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputSwitches />
        <SInputSwitch />
      </section>
    </div>
  </PageBase>
</template>

<script>
import PageBase from '@/components/pages/PageBase'
import SInputSwitches from '@/components/stories/inputs/SInputSwitches'
import SInputSwitch from '@/components/stories/inputs/SInputSwitch'

export default {
  components: {
    PageBase,
    SInputSwitches,
    SInputSwitch
  },

  head: {
    title: 'Inputs: Switches'
  },

  scrollToTop: true
}
</script>
