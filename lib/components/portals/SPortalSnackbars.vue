<template>
  <transition name="fade">
    <div class="SPortalSnackbars" v-if="hasItem">
      <transition-group name="fade-up">
        <div class="item" :key="item.id" v-for="item in items">
          <SSnackbar
            :id="item.id"
            :text="item.text"
            :actions="item.actions"
          />
        </div>
      </transition-group>
    </div>
  </transition>
</template>

<script>
import SSnackbar from '../snackbars/SSnackbar'

export default {
  components: {
    SSnackbar
  },

  computed: {
    items () {
      return this.$store.state.snackbars.items
    },

    hasItem () {
      return this.items.length > 0
    }
  }
}
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SPortalSnackbars {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 16px;
  width: 100%;
  max-width: 560px;
  transition: opacity .25s, transform .25s;

  @media (min-width: 768px) {
    padding: 24px;
  }
}

.SPortalSnackbars.fade-enter {
  opacity: 0;
  transform: translateY(48px);
}

.SPortalSnackbars.fade-leave-to {
  opacity: 0;
}

.item {
  width: 100%;
  max-width: 512px;
  transition: opacity .25s, transform .25s;

  & + & {
    padding-top: 12px;
  }
}

.item.fade-up-leave-active {
  position: absolute;
}

.item.fade-up-enter,
.item.fade-up-leave-to {
  opacity: 0;
}

.item.fade-up-enter {
  transform: translateY(48px);
}
</style>
