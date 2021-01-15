<template>
  <div class="SCardFooter" :class="classes">
    <div v-if="actions.length > 0" class="actions">
      <div v-for="(action, index) in computedActions" :key="index" class="action">
        <SAction :action="action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { Size, Sizes, Action } from '../composables/Card'
import SAction from './SAction.vue'

export default defineComponent({
  components: {
    SAction
  },

  props: {
    size: { type: String as PropType<Size>, default: 'compact' },
    actions: { type: Array as PropType<Action[]>, required: true }
  },

  setup(props) {
    const classes = computed(() => [props.size])

    const computedActions = computed(() => {
      return (props.actions ?? []).map(action => ({
        size: props.size === Sizes.Wide ? 'medium' : 'small',
        ...action
      }))
    })

    return {
      classes,
      computedActions
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
