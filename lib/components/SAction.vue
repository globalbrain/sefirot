<template>
  <component :is="component" :action="action" />
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from '@vue/composition-api'
import { Action, Types } from '../composables/Action'
import SActionButton from './SActionButton.vue'
import SActionPill from './SActionPill.vue'
import SActionAvatar from './SActionAvatar.vue'

export default defineComponent({
  props: {
    action: { type: Object as PropType<Action>, required: true }
  },

  setup(props) {
    const component = computed(() => {
      switch (props.action.type) {
        case Types.Button:
          return SActionButton
        case Types.Pill:
          return SActionPill
        case Types.Avatar:
          return SActionAvatar
      }
    })

    return {
      component
    }
  }
})
</script>
