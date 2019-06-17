<template>
  <div class="ComponentsInputsSwitches u-story">
    <div class="u-story-content">
      <h1>Inputs: Switches</h1>
      <p>Switches toggle the state of a single setting on or off.</p>

      <section>
        <h2>Vue Component</h2>

        <SInputSwitches />
        <SInputSwitch />
      </section>
    </div>
  </div>
</template>

<script>
import SInputSwitches from '@/components/stories/inputs/SInputSwitches'
import SInputSwitch from '@/components/stories/inputs/SInputSwitch'

export default {
  components: {
    SInputSwitches,
    SInputSwitch
  },

  head: {
    title: 'Inputs: Switches'
  },

  scrollToTop: true
}
</script>
