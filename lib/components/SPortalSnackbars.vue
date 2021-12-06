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

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import SSnackbar from './SSnackbar.vue'

const store = useStore()

const items = computed(() => store.state.snackbars.items)
const hasItem = computed(() => items.value.length > 0)
</script>

<style lang="postcss" scoped>
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

.SPortalSnackbars.fade-enter-from {
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

.item.fade-up-enter-from,
.item.fade-up-leave-to {
  opacity: 0;
}

.item.fade-up-enter-from {
  transform: translateY(48px);
}
</style>
