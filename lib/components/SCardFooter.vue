<template>
  <div class="SCardFooter" :class="classes">
    <div v-if="actions.length > 0" class="actions">
      <div v-for="action in actions" :key="action.label" class="action">
        <SCardFooterAction :size="size" :action="action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { Action } from '../composables/Card'
import SCardFooterAction from './SCardFooterAction.vue'

type Size = 'compact' | 'wide'

export default defineComponent({
  components: {
    SCardFooterAction
  },

  props: {
    size: { type: String as PropType<Size>, default: 'compact' },
    actions: { type: Array as PropType<Action[]>, required: true }
  },

  setup (props) {
    const classes = computed(() => [props.size])

    return {
      classes
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SCardFooter {
  border-top: 1px solid var(--c-divider-light);
  padding-top: 12px;
  padding-bottom: 11px;
  background-color: var(--card-bg-mute);
}

.SCardFooter.compact {
  padding-right: 16px;
  padding-left: 16px;
}

.SCardFooter.wide {
  padding-right: 24px;
  padding-left: 24px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.action {
  min-width: 96px;
}

.action + .action {
  margin-left: 16px;
}
</style>
