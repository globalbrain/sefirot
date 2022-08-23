<template>
  <div class="SDialog" :class="{ 'load-only': isLoadOnly }">
    <p v-if="title" class="title">{{ title }}</p>
    <p v-if="text" class="text">{{ text }}</p>

    <div v-if="isTypeLoading" class="load">
      <div class="load-icon">
        <SIconPreloader class="load-svg" />
      </div>
    </div>

    <div v-if="actions.length > 0" class="actions">
      <div v-for="(action, index) in actions" :key="index" class="action">
        <SButton
          size="small"
          :type="getActionType(action.type)"
          :label="action.label"
          @click="action.callback"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { Action } from '../store/dialog'
import SButton from './SButton.vue'
import SIconPreloader from './icons/SIconPreloader.vue'

const props = defineProps({
  type: { type: String as PropType<'confirm' | 'loading'>, default: 'confirm' },
  title: { type: String, default: null },
  text: { type: String, default: null },
  actions: { type: Array as PropType<Action[]>, default: () => [] }
})

const isTypeLoading = computed(() => props.type === 'loading')
const isLoadOnly = computed(() => isTypeLoading.value && !props.title && !props.text)

function getActionType(value?: 'text' | 'mute'): 'text' | 'mute' {
  return value !== 'mute' ? 'text' : 'mute'
}
</script>

<style lang="postcss" scoped>
.SDialog {
  margin: 96px 16px;
  border: 1px solid var(--c-divider-light);
  border-radius: 8px;
  padding: 16px 16px 8px;
  max-width: 392px;
  background-color: var(--c-bg);
  box-shadow: var(--shadow-depth-3);

  @media (min-width: 424px) {
    margin: 64px auto;
    padding: 24px 24px 16px;
  }
}

.SDialog.load-only {
  margin: 128px auto;
  padding: 0;
  width: 80px;
  height: 80px;

  .load {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 80px;
    height: 80px;
  }

  .load-svg {
    transform: translate(0);
  }

  @media (min-width: 424px) {
    margin: 128px auto;
  }
}

.title {
  line-height: 28px;
  font-size: 16px;
  font-weight: 500;
}

.text {
  line-height: 20px;
  font-size: 14px;
}

.load {
  margin-top: 2px;
  transform: translateY(1px);
}

.load-svg {
  width: 48px;
  height: 48px;
  transform: translate(-10px, 2px);

  @media (min-width: 424px) {
    transform: translate(-12px, 6px);
  }
}

.progress {
  padding-top: 14px;
  padding-bottom: 8px;

  @media (min-width: 424px) {
    padding-top: 16px;
    padding-bottom: 4px;
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin: 0 -8px;
  padding-top: 12px;

  @media (min-width: 424px) {
    margin: 0 -10px;
  }
}

.action {
  @media (min-width: 424px) {
    padding: 0 4px;
  }
}
</style>
