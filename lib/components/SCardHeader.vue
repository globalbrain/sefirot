<template>
  <div class="SCardHeader" :class="classes">
    <SHeader
      size="small"
      :title="title"
      :search="search"
      :actions="actions"
    >
      <template #after-actions>
        <div v-if="collapsable" class="action action-collapse">
          <button class="collapse" @click="$emit('collapse')">
            <SIconChevronDown class="collapse-icon" />
          </button>
        </div>
      </template>
    </SHeader>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { Size, Search, Action } from '../composables/Card'
import SIconChevronDown from './icons/SIconChevronDown.vue'
import SHeader from './SHeader.vue'

export default defineComponent({
  components: {
    SIconChevronDown,
    SHeader
  },

  props: {
    isCollapsed: { type: Boolean, required: true },
    size: { type: String as PropType<Size>, default: 'compact' },
    title: { type: String, default: null },
    search: { type: Object as PropType<Search>, default: null },
    actions: { type: Array as PropType<Action[]>, default: () => [] },
    collapsable: { type: Boolean, required: true }
  },

  setup(props) {
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
  padding-top: 8px;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--c-divider-light);
}

.SCardHeader.compact {
  padding-right: 8px;
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

.action-collapse {
  padding-left: 4px;
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

.SCardHeader >>> .SHeader .SButton .icon,
.SCardHeader >>> .SHeader .SButton .label {
  transform: translateY(1px);
}
</style>
