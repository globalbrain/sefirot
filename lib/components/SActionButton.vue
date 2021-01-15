<template>
  <SButton
    class="SActionButton"
    :tag="action.link ? 'nuxt-link' : 'button'"
    :size="action.size"
    :type="action.kind"
    :mode="action.mode"
    :icon="action.icon"
    :label="action.label"
    :to="action.link"
    block
    @click="emitCallback"
  />
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'
import { ButtonAction } from '../composables/Action'
import SButton from './SButton.vue'

export default defineComponent({
  components: {
    SButton
  },

  props: {
    action: { type: Object as PropType<ButtonAction>, required: true }
  },

  setup(props) {
    function emitCallback() {
      props.action.callback && props.action.callback()
    }

    return {
      emitCallback
    }
  }
})
</script>
