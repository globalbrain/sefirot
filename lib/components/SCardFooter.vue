<template>
  <div class="SCardFooter" :class="classes">
    <div v-if="unwrappedActions.length > 0" class="actions">
      <div v-for="(action, index) in unwrappedActions" :key="index" class="action">
        <SButton
          size="small"
          :type="action.type"
          :mode="action.mode"
          :icon="action.icon"
          :label="action.label"
          block
          @click="action.callback ? action.callback() : () => {}"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from '@vue/composition-api'
import { Refish, get } from '../composables/Utils'
import { Action } from '../composables/Card'
import SButton from './SButton.vue'

export default defineComponent({
  components: {
    SButton
  },

  props: {
    actions: { type: [Object, Array] as PropType<Refish<Action[]>>, required: true },
    round: { type: Number, default: 8 }
  },

  setup(props) {
    const classes = computed(() => [
      `round-${props.round}`
    ])

    const unwrappedActions = computed(() => get(props.actions))

    return {
      classes,
      unwrappedActions
    }
  }
})
</script>

<style lang="postcss" scoped>
@import "@/assets/styles/variables";

.SCardFooter {
  border-top: 1px solid var(--c-divider-light);
  padding: 16px 16px 15px;
  background-color: var(--card-bg);
}

.SCardFooter.round-4 { border-radius: 0 0 4px 4px; }
.SCardFooter.round-8 { border-radius: 0 0 8px 8px; }

.actions {
  display: flex;
  justify-content: flex-end;
}

.action {
  min-width: 96px;
}

.action + .action {
  margin-left: 8px;
}
</style>
