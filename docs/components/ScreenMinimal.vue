<template>
  <SScreen name="story-screens-s-screen-minimal" title="The screen title.">
    <div class="container">
      <p class="text">This is the screen content.</p>

      <SButton label="CLOSE SCREEN" @click="close" />
    </div>
  </SScreen>
</template>

<script>
import SButton from '@@/lib/components/SButton'
import SScreen from '@@/lib/components/SScreen'

export default {
  components: {
    SButton,
    SScreen
  },

  methods: {
    close () {
      this.$store.dispatch('screen/close')
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.screen-enter .container,
.screen-leave-to .container {
  opacity: 0;
  transform: translateY(8px);
}

.container {
  margin: 0 24px;
  text-align: center;
  transition: opacity .25s, transform .25s;
  transition-delay: .1s;
}

.text {
  padding: 96px 64px 32px;
}
</style>
