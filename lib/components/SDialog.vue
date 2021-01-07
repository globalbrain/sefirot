<template>
  <SModalBase name="dialog" :closable="false">
    <div class="SDialog" :class="{ 'load-only': isLoadOnly }">
      <p v-if="data.title" class="title">{{ data.title }}</p>
      <p v-if="data.text" class="text">{{ data.text }}</p>

      <div v-if="isTypeLoading" class="load">
        <div class="load-icon">
          <SIconPreloaderDark class="load-svg" />
        </div>
      </div>

      <div v-if="isTypeProgress" class="progress">
        <SProgressBar :now="data.progress.now" :max="data.progress.max" />
      </div>

      <div v-if="hasActions" class="actions">
        <div v-for="(action, index) in data.actions" :key="index" class="action">
          <SButton
            size="small"
            :type="getActionType(action.type)"
            :label="action.label"
            @click="action.callback"
          />
        </div>
      </div>
    </div>
  </SModalBase>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { useStore } from '../composables/Store'
import SIconPreloaderDark from './icons/SIconPreloaderDark.vue'
import SButton from './SButton.vue'
import SProgressBar from './SProgressBar.vue'
import SModalBase from './SModalBase.vue'

export default defineComponent({
  components: {
    SIconPreloaderDark,
    SButton,
    SProgressBar,
    SModalBase
  },

  setup() {
    const store = useStore()

    const data = computed(() => store.state.modal.data)

    const hasActions = computed(() => {
      const actions = data.value.actions

      return actions ? actions.length > 0 : false
    })

    const isTypeLoading = computed(() => data.value.type === 'loading')
    const isTypeProgress = computed(() => data.value.type === 'progress')
    const isLoadOnly = computed(() => isTypeLoading.value && !data.value.title && !data.value.text)

    function getActionType(value?: string): string {
      return value !== 'mute' ? 'text' : 'mute'
    }

    return {
      data,
      hasActions,
      isTypeLoading,
      isTypeProgress,
      isLoadOnly,
      getActionType
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SDialog {
  margin: 96px 16px;
  border-radius: 8px;
  padding: 16px 16px 8px;
  max-width: 392px;
  background-color: var(--modal-content-bg);
  box-shadow: var(--shadow-depth-5);

  @media (min-width: 424px) {
    margin: 128px auto;
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
    margin: 160px auto;
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
