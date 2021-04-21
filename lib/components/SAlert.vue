<template>
  <div class="SAlert" :class="[type]">
    <SCard :collapsable="false" :depth="3">
      <div class="container">
        <div class="icon">
          <component :is="icon" class="icon-svg" />
        </div>

        <div class="content">
          <p class="title">{{ title }}</p>
          <p class="text">{{ text }}</p>

          <div class="actions">
            <div v-for="(action, index) in actions" :key="index" class="action">
              <SButton
                size="small"
                :type="action.type"
                :mode="action.mode"
                :icon="action.icon"
                :label="action.label"
                @click="action.callback"
              />
            </div>
          </div>
        </div>
      </div>
    </SCard>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { Action, AlertMode, AlertModes } from '../composables/Alert'
import SIconInfo from './icons/SIconInfo.vue'
import SIconCheckCircle from './icons/SIconCheckCircle.vue'
import SIconWarning from './icons/SIconWarning.vue'
import SIconXCircle from './icons/SIconXCircle.vue'
import SButton from './SButton.vue'
import SCard from './SCard.vue'

export default defineComponent({
  components: {
    SButton,
    SCard
  },

  props: {
    type: { type: String as PropType<AlertMode>, default: AlertModes.Info },
    title: { type: String, default: null },
    text: { type: String, default: null },
    actions: { type: Array as PropType<Action[]>, default: () => [] }
  },

  setup(props) {
    const icon = computed(() => {
      switch (props.type) {
        case AlertModes.Info:
          return SIconInfo
        case AlertModes.Success:
          return SIconCheckCircle
        case AlertModes.Warning:
          return SIconWarning
        case AlertModes.Danger:
          return SIconXCircle
      }
    })

    return {
      icon
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SAlert {
  margin: 64px 16px;
  border-radius: 8px;
  max-width: 512px;

  @media (min-width: 544px) {
    margin: 64px auto;
  }
}

.SAlert.info .icon-svg    { fill: var(--c-info); }
.SAlert.success .icon-svg { fill: var(--c-success); }
.SAlert.warning .icon-svg { fill: var(--c-warning); }
.SAlert.danger .icon-svg  { fill: var(--c-danger); }

.container {
  @media (min-width: 544px) {
    display: flex;
  }
}

.icon {
  padding: 16px 16px 8px;

  @media (min-width: 544px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    padding: 0;
    width: 64px;
    height: 64px;
  }
}

.icon-svg {
  width: 24px;
  height: 24px;
}

.content {
  padding: 0 16px 16px;

  @media (min-width: 544px) {
    flex-grow: 1;
    padding: 20px 24px 20px 0;
  }
}

.title {
  font-size: 16px;
  font-weight: 500;
}

.text {
  font-size: 14px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
}

.action + .action {
  padding-left: 8px;
}
</style>
