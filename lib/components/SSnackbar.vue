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
          @click="action.callback"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, PropType } from '@vue/composition-api'
import { Action } from '../store/snackbars'
import SIconX from './icons/SIconX.vue'
import SButton from './SButton.vue'

export default createComponent({
  components: {
    SIconX,
    SButton
  },

  props: {
    id: { type: Number, required: true },
    text: { type: String, required: true },
    actions: { type: Array as PropType<Action[]>, default: null }
  },

  setup (props, context) {
    function close (): void {
      context.root.$store.dispatch('snackbars/pop', props.id)
    }

    return {
      close
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SSnackbar {
  position: relative;
  border-radius: 4px;
  width: 100%;
  color: var(--c-text-dark-1);
  background-color: rgba(0, 0, 0, .9);
  box-shadow: var(--shadow-depth-5);
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
  width: 12px;
  height: 12px;
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
