<template>
  <div class="SCardHeader" :class="classes">
    <p class="title">{{ title }}</p>

    <div class="actions">
      <div v-if="collapsable" class="action">
        <button class="collapse" @click="$emit('collapse')">
          <SIconChevronDown class="collapse-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import SIconChevronDown from './icons/SIconChevronDown.vue'

type Size = 'compact' | 'wide'

export default defineComponent({
  components: {
    SIconChevronDown
  },

  props: {
    collapsable: { type: Boolean, required: true },
    isCollapsed: { type: Boolean, required: true },
    size: { type: String as PropType<Size>, default: 'compact' },
    title: { type: String, required: true }
  },

  setup (props) {
    const classes = computed(() => [
      props.size, { collapsed: props.isCollapsed }
    ])

    return {
      classes
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
  margin: -4px -8px -4px 0;
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
