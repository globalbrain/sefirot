<template>
  <div class="SSnackbar">
    <button class="close" @click="close">
      <SIconX class="close-icon" />
    </button>

    <p class="content">{{ text }}</p>

    <div v-if="actions" class="actions">
      <div v-for="(action, index) in actions" :key="index" class="action">
        <SButton
          :type="action.type"
          :label="action.label"
          inverse
          @click="handleCallback(action)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { useStore } from 'vuex'
import { Action } from '../store/snackbars'
import SIconX from './icons/SIconX.vue'
import SButton from './SButton.vue'

const props = defineProps({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  actions: { type: Array as PropType<Action[]>, default: null }
})

const store = useStore()

function close() {
  store.dispatch('snackbars/pop', props.id)
}

function handleCallback(action: Action) {
  action.callback()
}
</script>

<style lang="postcss" scoped>
.SSnackbar {
  position: relative;
  border: 1px solid transparent;
  border-radius: 4px;
  width: 100%;
  color: var(--c-text-dark-1);
  background-color: rgba(0, 0, 0, .9);
  box-shadow: var(--shadow-depth-5);
}

.dark .SSnackbar {
  border-color: var(--c-divider-light);
}

.close {
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;

  &:hover {
    .close-icon {
      fill: var(--c-text-dark-1);
    }
  }
}

.close-icon {
  width: 16px;
  height: 16px;
  fill: var(--c-text-dark-2);
  transition: fill .25s;
}

.content {
  position: relative;
  z-index: 10;
  padding: 16px 68px 16px 20px;
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px 8px;
}

.action {
  & + & {
    padding-left: 8px;
  }
}
</style>

