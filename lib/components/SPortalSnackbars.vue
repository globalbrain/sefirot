<template>
  <transition name="fade">
    <div v-if="hasItem" class="SPortalSnackbars">
      <transition-group name="fade-up">
        <div v-for="item in items" :key="item.id" class="item">
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

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import SSnackbar from './SSnackbar.vue'

export default defineComponent({
  components: {
    SSnackbar
  },

  setup(_props, context) {
    const items = computed(() => context.root.$store.state.snackbars.items)
    const hasItem = computed(() => items.value.length > 0)

    return {
      items,
      hasItem
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SPortalSnackbars {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-snackbar);
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
    padding-top: 8px;
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
