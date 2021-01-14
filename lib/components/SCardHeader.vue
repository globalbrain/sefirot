<template>
  <div class="SCardHeader" :class="classes">
    <p class="title">{{ title }}</p>

    <div class="actions">
      <div v-for="(action, index) in actions" :key="index" class="action">
        <SButton
          size="small"
          :type="action.type"
          :mode="action.mode"
          :icon="actionIcon(action)"
          :label="action.label"
          @click="action.callback"
        />
      </div>

      <div v-if="collapsable" class="action">
        <button class="collapse" @click="$emit('collapse')">
          <SIconChevronDown class="collapse-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { Action } from '../composables/Card'
import SIconEdit3 from './icons/SIconEdit3.vue'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SButton from './SButton.vue'

type Size = 'compact' | 'wide'

export default defineComponent({
  components: {
    SIconChevronDown,
    SButton
  },

  props: {
    collapsable: { type: Boolean, required: true },
    isCollapsed: { type: Boolean, required: true },
    size: { type: String as PropType<Size>, default: 'compact' },
    title: { type: String, required: true },
    actions: { type: Array as PropType<Action[]>, required: true }
  },

  setup(props) {
    const classes = computed(() => [
      props.size, { collapsed: props.isCollapsed }
    ])

    function actionIcon(action: Action): any {
      switch (action.icon) {
        case 'edit':
          return SIconEdit3
        default:
          return null
      }
    }

    return {
      classes,
      actionIcon
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SCardHeader {
  display: flex;
  padding-top: 12px;
  padding-bottom: 11px;
  border-bottom: 1px solid var(--c-divider-light);
}

.SCardHeader.compact {
  padding-right: 16px;
  padding-left: 16px;
}

.SCardHeader.wide {
  padding-right: 24px;
  padding-left: 24px;
}

.SCardHeader.collapsed {
  border-bottom-color: transparent;
}

.SCardHeader.collapsed .collapse {
  transform: rotate(0);
}

.SCardHeader.collapsed .collapse-icon {
  transform: translateY(1px);
}

.title {
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
}

.actions {
  display: flex;
  margin: -4px -10px -4px -2px;
}

.action {
  padding: 0 2px;
}

.action >>> .SButton .label,
.action >>> .SButton .icon {
  transform: translateY(1px);
}

.collapse {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  color: var(--c-text-3);
  transform: rotate(180deg);

  &:hover {
    color: var(--c-text-2);
    background-color: var(--c-bg-mute);
  }
}

.collapse-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
