<template>
  <div class="SCardHeader" :class="classes">
    <div class="title">
      <p v-if="title" class="title-text">{{ title }}</p>
    </div>

    <div class="actions">
      <template v-if="actions.length > 0">
        <template v-for="(action, index) in actions">
          <SToolTip :key="index" :text="action.disabled">
            <component
              :is="action.link ? 'router-link' : 'button'"
              class="action"
              :class="[action.mode || 'neutral', { disabled: action.disabled }]"
              :to="action.link"
              @click="action.callback && !action.disabled ? action.callback() : () => {}"
            >
              <component :is="getIcon(action.icon, !!action.disabled)" class="action-icon" />
            </component>
          </SToolTip>
        </template>
      </template>

      <div v-if="collapsable" class="action action-collapse">
        <button class="collapse" @click="$emit('collapse')">
          <SIconChevronDown class="collapse-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { Action, ActionIconType, Mode } from '../composables/Card'
import SToolTip from './STooltip.vue'
import SIconX from './icons/SIconX.vue'
import SIconPlus from './icons/SIconPlus.vue'
import SIconEdit3 from './icons/SIconEdit3.vue'
import SIconTrash2 from './icons/SIconTrash2.vue'
import SIconChevronDown from './icons/SIconChevronDown.vue'

export default defineComponent({
  components: {
    SIconChevronDown,
    SToolTip
  },

  props: {
    isCollapsed: { type: Boolean, required: true },
    title: { type: String, default: null },
    actions: { type: Array as PropType<Action[]>, default: () => [] },
    mode: { type: String as PropType<Mode>, default: 'neutral' },
    round: { type: Number, default: 8 },
    collapsable: { type: Boolean, required: true }
  },

  setup(props) {
    const classes = computed(() => [
      { collapsed: props.isCollapsed },
      props.mode,
      `round-${props.round}`
    ])

    function getIcon(icon: ActionIconType | object, disabled: boolean) {
      if (typeof icon === 'object') { return icon }
      if (icon === 'plus') {
        return disabled ? SIconX : SIconPlus
      }
      if (icon === 'edit-3') {
        return disabled ? SIconX : SIconEdit3
      }
      if (icon === 'trash-2') {
        return disabled ? SIconX : SIconTrash2
      }
    }

    return {
      classes,
      getIcon
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SCardHeader {
  display: flex;
  padding: 8px 8px 7px 16px;
  border-bottom: 1px solid var(--c-divider-light);
  background-color: var(--card-bg-mute);
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

.SCardHeader.round-0 { border-radius: none; }
.SCardHeader.round-4 { border-radius: 4px 4px 0 0; }
.SCardHeader.round-8 { border-radius: 8px 8px 0 0; }

.title {
  flex-grow: 1;
}

.title-text {
  line-height: 32px;
  font-size: 14px;
  font-weight: 500;
}

.actions {
  display: flex;
}

.action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  color: var(--c-text-2);
  transition: color .25s, background-color .25s;

  &:hover {
    background-color: var(--c-gray-light-4);
  }
}

.action.neutral:hover { color: var(--c-text-1); }
.action.info:hover    { color: var(--c-info); }
.action.success:hover { color: var(--c-success); }
.action.warning:hover { color: var(--c-warning); }
.action.danger:hover  { color: var(--c-danger); }

.action.disabled:hover {
  color: var(--c-text-2);
  background-color: transparent;
  cursor: not-allowed;
}

.action-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
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
  transition: color .25s, background-color .25s;

  &:hover {
    color: var(--c-text-2);
    background-color: var(--c-gray-light-4);
  }
}

.collapse-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
