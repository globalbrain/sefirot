<template>
  <div class="SHeader" :class="[size]">
    <div class="primary">
      <p v-if="title" class="title">{{ title }}</p>
    </div>

    <div class="actions">
      <div v-for="(action, index) in computedActions" :key="index" class="action">
        <SAction :action="action" />
      </div>

      <slot name="after-actions" />
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { Size, Search, Action } from '../composables/Header'
import SAction from './SAction.vue'

export default defineComponent({
  components: {
    SAction
  },

  props: {
    size: { type: String as PropType<Size>, default: 'medium' },
    title: { type: String, default: null },
    search: { type: Object as PropType<Search>, default: null },
    actions: { type: Array as PropType<Action[]>, default: () => [] }
  },

  setup(props) {
    const computedActions = computed(() => {
      return (props.actions ?? []).map(action => ({
        size: 'small',
        ...action
      }))
    })

    return {
      computedActions
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SHeader {
  display: flex;
  flex-shrink: 0;
}

.SHeader.small {
  .title {
    line-height: 32px;
    font-size: 14px;
  }

  .actions { margin: 0 -2px; }
  .action  { padding: 0 2px; }
}

.SHeader.medium {
  .title {
    line-height: 32px;
    font-size: 16px;
  }

  .actions { margin: 0 -4px; }
  .action  { padding: 0 4px; }
}

.primary {
  flex-grow: 1;
}

.title {
  font-weight: 500;
}

.actions {
  display: flex;
}
</style>
