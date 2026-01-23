<script setup lang="ts">
import { useSnackbars } from '../stores/Snackbars'
import SSnackbar from './SSnackbar.vue'

const snackbars = useSnackbars()
</script>

<template>
  <Transition name="fade">
    <div v-if="snackbars.items.length" class="SSnackbars">
      <TransitionGroup name="fade-up">
        <div v-for="item in snackbars.items" :key="item.id" class="item">
          <SSnackbar
            :id="item.id"
            :mode="item.mode"
            :text="item.text"
            :actions="item.actions"
          />
        </div>
      </TransitionGroup>
    </div>
  </Transition>
</template>

<style lang="postcss" scoped>
.SSnackbars {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-snackbar);
  padding: 16px;
  width: 100%;
  max-width: 560px;
  transition: opacity 0.25s, transform 0.25s;

  @media (min-width: 768px) {
    padding: 24px;
  }
}

.SSnackbars.fade-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.SSnackbars.fade-leave-to {
  opacity: 0;
}

.item {
  width: 100%;
  max-width: 512px;
  transition: opacity 0.25s, transform 0.25s;

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
  transform: translateY(24px);
}
</style>
