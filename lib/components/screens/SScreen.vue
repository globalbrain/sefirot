<template>
  <portal to="screen">
    <transition name="screen">
      <div class="SScreen" v-if="show">
        <div class="header" v-if="title">
          <p class="header-title">{{ title }}</p>
        </div>

        <div class="content">
          <slot />
        </div>
      </div>
    </transition>
  </portal>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    title: { type: String, default: null }
  },

  computed: {
    screenName () {
      return this.$store.state.screen.name
    },

    show () {
      return this.name === this.screenName
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SScreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: var(--c-white);
  transition: opacity .25s;
  overflow: hidden;
  overflow-y: scroll;
}

.SScreen.screen-enter,
.SScreen.screen-leave-to {
  opacity: 0;

  .header {
    opacity: 0;
    transform: translateY(8px);
  }
}

.header {
  padding: 64px 64px 0;
  transition: opacity .25s, transform .25s;
}

.header-title {
  text-align: center;
  font-size: 20px;
}
</style>
